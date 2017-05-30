const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let config = {
	entry: ['bootstrap-loader','./src/index.js'],
	output: {
		path: path.resolve(__dirname, './public'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: ExtractTextWebpackPlugin.extract({
					use: ['css-loader','sass-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'url-loader?limit=10000',
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: 'file-loader'
			},
			{
				test: /bootstrap-sass\/assets\/javascripts\//,
				use: 'imports-loader?jQuery=jquery'
			},
		]
	},
	plugins: [
		new ExtractTextWebpackPlugin('style.css'),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: 'jquery'
		})
	],
	devServer: {
		contentBase: path.resolve(__dirname, './public'),
		historyApiFallback: true,
		inline: true,
		open: true
	},
	devtool: 'eval-source-map'
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglyfiJsPlugin()
	);

}
