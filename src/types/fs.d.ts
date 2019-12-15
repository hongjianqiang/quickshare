/// <reference types="node" />
import fs from 'fs';
export declare function exists(path: fs.PathLike): Promise<boolean>;
export declare function stat(path: fs.PathLike): Promise<fs.Stats>;
export declare function readdir(path: fs.PathLike): Promise<string[]>;
