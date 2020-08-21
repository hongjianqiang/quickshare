import template from './template.html'
import compiler from './compiler'

interface IFile {
  name: string,
  isDir: boolean,
  isFile: boolean,
  size: number,
  atimeMs: number,
  mtimeMs: number,
  birthtimeMs: number
}

interface IData {
  title: string,
  files: IFile[]
}

export default function (data: IData): string {
  const html = compiler(template, data)

  return html
}
