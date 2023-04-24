const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js', // replace this with the entry point of your application
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // replace this with the output directory of your application
    },
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "buffer": require.resolve("buffer/"),
            "util": require.resolve("util/"),
            "stream": require.resolve("stream-browserify")
        }
    },
};