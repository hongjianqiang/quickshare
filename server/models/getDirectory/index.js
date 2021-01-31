import path from 'path'
import { BASE_DIR } from '../../config'
import { readdir, stat } from '../../modules/file-system'

async function getFileInfo (networkDir, filename) {
  const absPathname = path.join(BASE_DIR, networkDir, filename)
  const stats = await stat(absPathname)
  const result = {
    baseDir: BASE_DIR,
    networkDir,
    filename,
    isDir: stats.isDirectory(),
    isFile: stats.isFile(),
    size: stats.isFile() ? stats.size : null,
    lastModifiedDate: stats.mtime,
    createdDate: stats.birthtime,
  }

  return result
}

export default function ({ res, query }) {
  const { pathname } = query
  const absPathname = path.join(BASE_DIR, pathname);
  
  readdir(absPathname)
    .then(async lists => {
      return await Promise.all(lists.map(filename => getFileInfo(pathname, filename)))
    })
    .then(lists => {
      const sorted = []
      const compare = (s1, s2) => s1.filename > s2.filename ? 1 : 0
      
      sorted.push(lists.filter(f => f.isDir === true))
      sorted.push(lists.filter(f => f.isDir === false))
      
      sorted[0].sort(compare)
      sorted[1].sort(compare)

      res.end(JSON.stringify(sorted.flat(Infinity)))
    })
}
