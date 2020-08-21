/**
 * HTML模板编译器
 */
export default function (html:string, options:object): string {
  const re = /<%([^%>]+)?%>/g
  const reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g

  let code = 'var r=[];\n'
  let cursor = 0

  function add (line:string, js?:boolean) {
    js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n')
      : (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '')
    return add
  }

  let match = re.exec(html)
  while (match) {
    add(html.slice(cursor, match.index))(match[1], true)
    cursor = match.index + match[0].length
    match = re.exec(html)
  }
  add(html.substr(cursor, html.length - cursor))
  code += 'return r.join("");'

  // eslint-disable-next-line no-new-func
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(options)
}
