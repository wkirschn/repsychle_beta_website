const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/dry.js',
    output: {
        path: path.resolve(__dirname, 'public/javascripts'),
        filename: 'bundle.js'
    },
    watch: true
}