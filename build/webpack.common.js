const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/, loader: 'ts-loader'
        }]
    },
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: 'httpshare.min.js'
    }
};