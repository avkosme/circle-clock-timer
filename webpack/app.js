module.exports = {
    entry: [
        './components/app.js'
    ],

    output: {
        path: __dirname + './../public/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    }
};