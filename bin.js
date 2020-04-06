#!/usr/bin/env node

const package = require('./package.json');
const commander = require('commander');

commander
    .name('quickshare')
    .version(package.version)
    .option('-p, --port [PORT]', 'Specify alternate port [default: 2020]')
    .option('-d, --dir [DIR]', 'Specify alternative directory [default:current directory]')
    .parse(process.argv);

require('./lib/httpshare.min.js');
