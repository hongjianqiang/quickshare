import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import http from 'http';
import { getMime } from './mime-types';
import { exists, stat } from './fs';
import compiler from './compiler';

const PORT = 2020;
const HOST = '0.0.0.0';
const CHARSET = 'UTF-8';

function handleDirs (req: http.IncomingMessage, res: http.ServerResponse, absPathname: string) {
    console.log(compiler);
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
    const href = `http://${req.headers.host}${req.url}:${PORT}`;
    const url = new URL(href);
    const pathname = decodeURIComponent(url.pathname.replace(/\.\.\//g, ''));
    const absPathname = path.join(__dirname, pathname);

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
    const href = decodeURIComponent(`http://${req.headers.host}${req.url}:${PORT}`);

    console.log(req.method, href);

    handleStatic(req, res);
}

http.createServer(requestListener).listen(PORT, HOST, () => {
    console.clear();
    console.log(`\n> Listening at http://${HOST}:${PORT}/\n`);
});
