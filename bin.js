#!/usr/bin/env node

const config = require('./package.json')
const commander = require('commander')

commander
  .name('quickshare')
  .version(config.version)
  .option('-p, --port [PORT]', 'Specify alternate port [default: 2020]')
  .option('-d, --dir [DIR]', 'Specify alternative directory [default: current directory]')
  .parse(process.argv)

require(`./dist/${config.name}.js`)
