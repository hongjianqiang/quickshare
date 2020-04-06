import path from 'path';
import { URL } from 'url';
import http from 'http';
import { LOCALHOSTS, HOST, PORT, CHARSET, ROOT } from './config';
import template from './template.html';
import { getMime } from './mime-types';
import fs, { exists, stat, readdir } from './fs';
import compiler from './compiler';

async function handleDirs (req: http.IncomingMessage, res: http.ServerResponse, absPathname: string) {
    const files = await readdir(absPathname);
    const pathname = absPathname.split(ROOT).join('');

    let list:any[] = [];

    list = files.map(async file => {
        try {
            const filePath = path.join(absPathname, file);
            const fileStat = await stat(filePath);
            const isDir = fileStat.isDirectory();

            return isDir ? file + '/' : file;
        } catch (e) {
            return '';
        }
    });

    list = await Promise.all(list);
    list = list.filter(file => file !== '');

    const folders = pathname.split(path.sep).filter(folder => folder !== '');
    const paths = folders.map((folder, i, folders) => {
        return '/' + folders.slice(0, i + 1).join('/') + '/';
    }).map(path => ({
        href: path,
        name: path.split('/').slice(-2).join('')
    }));

    const len = paths.length;
    const title = (paths[len - 1] && paths[len - 1].name.slice(0)) || '/';

    const html = compiler(template, {
        title,
        paths,
        list
    });

    res.writeHead(200, { 'Content-Type': `${getMime('html')};charset=${CHARSET}` });
    res.end(html);
}

function handleFiles (req: http.IncomingMessage, res: http.ServerResponse, absPathname: string) {
    const ext = path.extname(absPathname).slice(1) || 'unknow';
    const contentType = `${getMime(ext)};charset=${CHARSET}`;
    const stream = fs.createReadStream(absPathname);

    res.writeHead(200, { 'Content-Type': contentType });

    stream.on('error', () => {
        res.writeHead(500, { 'Content-Type': `${getMime('html')};charset=${CHARSET}` });
        res.end('<h1>500 Server Error</h1>');
    });

    stream.pipe(res);
}

async function handleStatic (req: http.IncomingMessage, res: http.ServerResponse) {
    const href = `http://${req.headers.host}${req.url}`;
    const url = new URL(href);
    const pathname = decodeURIComponent(url.pathname.replace(/\.\.\//g, ''));
    const absPathname = path.join(ROOT, pathname);

    if (await exists(absPathname)) {
        if ((await stat(absPathname)).isDirectory()) {
            handleDirs(req, res, absPathname);
        } else if ((await stat(absPathname)).isFile()) {
            handleFiles(req, res, absPathname);
        }
    } else {
        res.writeHead(404, { 'Content-Type': `${getMime('html')};charset=${CHARSET}` });
        res.end('<h1>404 Not Found</h1>');
    }
}

function requestListener (req: http.IncomingMessage, res: http.ServerResponse): void {
    const href = decodeURIComponent(`http://${req.headers.host}${req.url}`);
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;

    console.log(req.method, href, 'FROM', clientIP);

    handleStatic(req, res);
}

http.createServer(requestListener).listen(PORT, HOST, () => {
    console.clear();
    console.log('=================================================\n');
    console.log('You can now view this app in the browser.\n');

    for (const localhost of LOCALHOSTS) {
        if (localhost === '127.0.0.1') {
            console.log(`  Local:            http://${localhost}:${PORT}\n`);
        } else {
            console.log(`  On Your Network:  http://${localhost}:${PORT}\n`);
        }
    }

    console.log('The service is running.\n');
    console.log('=================================================\n');
});
