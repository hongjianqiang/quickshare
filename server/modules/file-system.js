import fs from 'fs';

export function exists (path) {
  return new Promise((resolve) => {
    fs.access(path, fs.constants.R_OK, (err) => {
      err ? resolve(false) : resolve(true);
    });
  });
}

export function stat (path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) reject(err);
      resolve(stats);
    });
  });
}

export function readdir (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
}

export default fs;
