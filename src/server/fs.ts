import fs from 'fs'

// Tests a user's permissions for the file or directory specified by path.
function access (constants: number) {
  return function (path: fs.PathLike): Promise<boolean> {
    return new Promise(resolve => {
      fs.access(path, constants, err => err ? resolve(false) : resolve(true))
    })
  }
}

// Check if the file exists in the current directory.
export const exists = access(fs.constants.F_OK)

// Check if the file is readable.
export const readable = access(fs.constants.R_OK)

// Check if the file is writable.
export const writable = access(fs.constants.W_OK)

// Provides information about a file.
export function stat (path: fs.PathLike): Promise<fs.Stats|false> {
  return new Promise(resolve => {
    readable(path).then(read => {
      if (read) {
        fs.stat(path, (err, stats) => err ? resolve(false) : resolve(stats))
      } else {
        resolve(false)
      }
    })
  })
}

// Check if the path is a file system directory.
export const isDir = async (path: fs.PathLike) => {
  const stats = await stat(path)
  return stats ? stats.isDirectory() : stats
}

// Check if the path is a file.
export const isFile = async (path: fs.PathLike) => {
  const stats = await stat(path)
  return stats ? stats.isFile() : stats
}

// Reads the contents of a directory.
export function readdir (path: fs.PathLike): Promise<string[]|false> {
  return new Promise(resolve => {
    readable(path).then(read => {
      if (read) {
        fs.readdir(path, (err, files) => err ? resolve(false) : resolve(files))
      } else {
        resolve(false)
      }
    })
  })
}

export const readFile = (path: fs.PathLike) => {
  return new Promise(resolve => {
    fs.readFile(path, 'utf8', (err, data) => {
      err ? resolve(false) : resolve(data)
    })
  })
}

export default fs
