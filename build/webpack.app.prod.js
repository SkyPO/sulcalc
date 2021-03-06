"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");

const cloneDeep = require("lodash/cloneDeep");

const {version} = require("../package.json");
const baseConfig = require("./webpack.app.config");
const {css, javascript} = require("./dependencies");

const config = cloneDeep(baseConfig);

config.module = Object.assign({rules: []}, config.module);
config.module.rules.push({
    test: /\.vue$/,
    loader: "vue-loader",
    options: {
        loaders: {
            css: ExtractTextPlugin.extract({
                use: {
                    loader: "css-loader",
                    options: {minimize: true}
                },
                fallback: "vue-style-loader"
            })
        }
    }
});

config.plugins = config.plugins || [];
config.plugins.push(
    new webpack.LoaderOptionsPlugin({
        forceEnv: "webpack",
        minimize: true
    }),
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
        "process.libVersion": JSON.stringify(version)
    }),
    new ExtractTextPlugin("style.css"),
    new BabiliPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: ["setdex", "sulcalc", "db"]
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "../app/index.hbs"),
        cdn: true,
        css,
        javascript
    })
);

config.externals = Object.assign({}, config.externals, {
    "vue": "Vue",
    "vue-i18n": "VueI18n",
    "vue-multiselect": "VueMultiselect"
});

module.exports = config;
