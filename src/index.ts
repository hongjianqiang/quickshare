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

async function handleUpload (req: http.IncomingMessage, res: http.ServerResponse) {
    const href = `http://${req.headers.host}${req.url}`;
    const url = new URL(href);
    const pathname = decodeURIComponent(url.pathname.replace(/\.\.\//g, ''));

    let i = 0;

    do {
        const pathObject = path.parse(path.join(ROOT, pathname));

        delete pathObject.base;

        pathObject.name = i ? `${pathObject.name} (${i})` : pathObject.name;

        const base = pathObject.name + pathObject.ext;
        const absPathname = path.format(pathObject);

        if (await exists(absPathname)) {
            i++;
            continue;
        } else {
            const fileStream = fs.createWriteStream(absPathname, { flags: 'w' });

            // 将请求体发送到文件
            req.pipe(fileStream);

            // 当请求完成时，所有数据都写入磁盘
            fileStream.on('close', () => {
                res.end(base);
            });

            // 在 I/O 错误的情况下，完成请求
            fileStream.on('error', (err) => {
                console.error(err);
                res.writeHead(500);
                res.end(base);
            });

            break;
        }
    } while (true);
}

function requestListener (req: http.IncomingMessage, res: http.ServerResponse): void {
    const href = decodeURIComponent(`http://${req.headers.host}${req.url}`);
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
    const method = req.method;

    console.log(method, href, 'FROM', clientIP);

    if (method === 'GET') {
        handleStatic(req, res);
    } else if (method === 'POST') {
        handleUpload(req, res);
    }
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
