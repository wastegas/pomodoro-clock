const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let config = {
	entry: './src/index.js',
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
