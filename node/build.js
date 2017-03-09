var path = require('path');
var webpack = require('webpack');

var config = {
    context: path.join(__dirname, '../app'),        // Папка со скриптами для бандла (рабочая папка)

    entry: {
        app: './bootstrap.ts',
        common: './vendors.ts'
    },

    output: {
        path: path.join(__dirname, '../app/bundled'),       // Папка с выходными файлами
        filename: '[name].js'
    },

    devtool: "#inline-source-map",

    plugins: [
        //new webpack.NoEmitOnErrorsPlugin(),
        //new webpack.optimize.UglifyJsPlugin(),        // Минификация
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        })
    ],

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader'],
                exclude: '/node_modules/'
            }
        ]
    }
};
var compiler = webpack(config);
compiler.run(function (err, stats) {
    if (err)
        console.log('ERROR');
    //console.log(stats.toJson());        // Убеждаемся, что всё работает
    console.log('Compiled');
});