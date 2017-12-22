var distFolderPath = "dist",
    devFolderPath = "dev",
    webpack = require('webpack'),
    packageJson = require("./package.json"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    Path = require('path'),
    sections = getSections();

module.exports = sections.map(function (section) {

    var entry = {};
    entry[section] = ["./src/js/" + section + ".js"];

    return {

        debug: isProduction(false, true),

        devtool: isProduction('source-map', 'eval'),

        entry: entry,

        output: getOutput(),

        resolve: {
            root: Path.resolve(__dirname),
            alias: {
                'bootstrap-table': Path.join(__dirname, 'node_modules/bootstrap-table/dist/bootstrap-table.js'),
                'handlebars': Path.join(__dirname, 'node_modules/handlebars/dist/handlebars.js'),
                'jquery': Path.join(__dirname, 'node_modules/jquery/dist/jquery'),
                'typeahead.js': Path.join(__dirname, 'node_modules/typeahead.js/dist/typeahead.bundle.js'),
                'historyjs': Path.join(__dirname, 'node_modules/historyjs/scripts/compressed/history.js'),
                //'bootstrap-table-locale': Path.join(__dirname, 'node_modules/bootstrap-table/dist/bootstrap-table-locale-all.min')
                'fenix-ui-bridge': Path.join(__dirname, 'node_modules/fenix-ui-bridge/src/js/index.js'),
                // 'fenix-ui-reports': Path.join(__dirname, 'node_modules/fenix-ui-reports/src/js/index.js')
                //'fenix-ui-chart-creator': Path.join(__dirname, 'node_modules/fenix-ui-chart-creator/src/js/index.js')
                //'fenix-ui-filter': Path.join(__dirname, 'node_modules/fenix-ui-filter/src/js/index.js')
                //'fenix-ui-dashboard': Path.join(__dirname, 'node_modules/fenix-ui-dashboard/src/js/index.js')
                //'fenix-ui-reports': Path.join(__dirname, 'node_modules/fenix-ui-reports/src/js/index.js')
            }
        },

        module: {
            loaders: [
                isProduction(
                    {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
                    {test: /\.css$/, loader: "style-loader!css-loader"}
                ),
                {test: /\.hbs$/, loader: "handlebars-loader"},
                {test: /\.json/, loader: "json-loader"},
                {test: /\.png$/, loader: "url-loader?limit=100000"},
                {test: /\.jpg$/, loader: "file-loader?name=[name].[ext]&limit=100000"},
                {test: /\.svg/, loader: "file-loader?name=[name].[ext]&limit=100000"},
                {test: /\.gif/, loader: "file-loader?name=[name].[ext]&limit=100000"},

                //Bootstrap loader
                {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},
                {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
                {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
                {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream"},
                {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"}
            ]
        },

        plugins: clearArray([
            new webpack.ProvidePlugin({$: "jquery", jQuery: "jquery"}),
            isProduction(new CleanWebpackPlugin([distFolderPath]), undefined),
            isProduction(new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false},
                output: {comments: false}
            })),
            isProduction(new ExtractTextPlugin(section + "/" + packageJson.name + "." + section + '.min.css')),
            isDevelop(new HtmlWebpackPlugin({
                inject: "body",
                chunks: [section],
                template: devFolderPath + "/" + section + ".template.html"
            })),
            isDemo(new HtmlWebpackPlugin({
                inject: "body",
                chunks: [section],
                template: devFolderPath + "/" + section + ".template.html"
            }))
        ])
    }
});

function getOutput() {

    var output;

    switch (getEnvironment()) {
        case "production" :
            output = {
                path: Path.join(__dirname, distFolderPath),
                publicPath: 'http://fenixrepo.fao.org/wiews/',
                filename: "[name]/" + packageJson.name + '.[name].min.js',
                chunkFilename: "[name]/" + 'chunk-[id].' + packageJson.name + '.[name].min.js'
            };
            break;
        case "develop" :
            output = {
                path: Path.join(__dirname, devFolderPath),
                filename: "[name].js"
            };
            break;
        case "demo" :
            output = {
                path: Path.join(__dirname, devFolderPath),
                filename: "[name].js"
            };
            break;
        default :
            output = {
                path: Path.join(__dirname, distFolderPath),
                filename: "index.js"
            };
            break;
    }

    return output;
}

// utils

function clearArray(array) {

    var result = [];

    array.forEach(function (s) {
        s ? result.push(s) : null;
    });

    return result;

}

function isProduction(valid, invalid) {

    return isEnvironment('production') ? valid : invalid;
}

function isDevelop(valid, invalid) {

    return isEnvironment('develop') ? valid : invalid;
}

function isDemo(valid, invalid) {

    return isEnvironment('demo') ? valid : invalid;
}

function isEnvironment(env) {
    return getEnvironment() === env;
}

function getEnvironment() {
    return process.env.NODE_ENV;
}

// sections

function getSections() {
    return (typeof process.env.SECTIONS != "undefined") ? process.env.SECTIONS.split(",") : undefined;
}