const path = require('path');
const paths = require('./sdg-build/paths.json'); // config object for shorthand paths
const webpack = require('webpack');
const scripts = require('./sdg-build/scripts.json');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// is environment production
const isProd = process.env.NODE_ENV === 'production';

const config = {
	entry: scripts,
	output: {
		filename: '[name].js',
		path: path.join(__dirname, paths.pub)
	},
	module: {
		rules: [
			{
				test: /\.(js|vue)$/, // include .js and .vue files
				// loader: 'eslint-loader',
				exclude: '/node_modules/', // exclude any and all files in the node_modules folder
				enforce: 'pre'
			},
			{
				test: /\.js$/,
				exclude: '/node_modules/', // exclude any and all files in the node_modules folder
				use: 'babel-loader'
			},
			{
				test: /node_modules\/flickity/,
				loader: 'imports-loader?define=>undefined'
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this necessary.
						'scss': [
							'vue-style-loader',
							'css-loader',
							'sass-loader'
						],
						'sass': [
							'vue-style-loader',
							'css-loader',
							'sass-loader?indentedSyntax'
						]
					}
					// other vue-loader options go here
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	optimization: {},
	plugins: [
		new FriendlyErrorsWebpackPlugin(),
		new VueLoaderPlugin()
	]
};

// production settings
if (isProd) {

	// optimization
	config.optimization.minimizer = [
		new UglifyJSPlugin()
	];

	// plugins
	config.plugins = (config.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	]);
}

module.exports = config;