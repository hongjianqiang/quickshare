#!/usr/bin/env node

const package = require('./package.json');
const commander = require('commander');

const cmd = commander
    .version(package.version)
    .option('-p, --port [PORT]', 'Specify alternate port [default: 2020]')
    .option('-d, --dir [DIR]', 'Specify alternative directory [default:current directory]')
    .parse(process.argv);

if (process.argv.slice(2).length === 0) {
    cmd.outputHelp();
    process.exit();
} else {
    require('./lib/httpshare.min.js');
}
