import fs from 'fs';

export function exists (path: fs.PathLike): Promise<boolean> {
    return new Promise((resolve) => {
        resolve(fs.existsSync(path));
    });
}

export function stat (path: fs.PathLike): Promise<fs.Stats> {
    return new Promise((resolve) => {
        resolve(fs.statSync(path));
    });
}
