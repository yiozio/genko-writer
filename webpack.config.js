const path = require('path');

const DEVELOPMENT = 'development';

module.exports = (env, argv) => ({
    mode: argv.mode ? argv.mode : DEVELOPMENT,
    entry: {genko: './src/index.tsx'},
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: ['ts-loader']
        }]
    },
    devtool: !argv.mode || argv.mode === DEVELOPMENT ? 'source-map' : undefined,
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        path: path.resolve('./public/dist'),
        filename: '[name].js'
    },
    stats: {
        children: false
    }
})
