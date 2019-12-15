export function getMime (ext:string):string {
    const mime:any = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        ico: 'image/x-icon',
        gif: 'image/gif',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        json: 'application/json',
        pdf: 'application/pdf',
        png: 'image/png',
        svg: 'image/svg+xml',
        tiff: 'image/tiff',
        txt: 'text/plain',
        ts: 'text/plain',
        tsx: 'text/plain',
        xml: 'text/xml'
    };

    return mime[ext] || 'application/octet-stream';
};
