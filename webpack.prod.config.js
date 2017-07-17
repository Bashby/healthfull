const webpack = require("webpack");
const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.base.config.js');
// Generate client-side html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Define a base html template
const HtmlWebpackTemplatePlugin = require('html-webpack-template');
// Generate favicons for multiple devices
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// Set some paths
const BASE_PATH = path.resolve(__dirname, 'app');
const IMAGE_PATH = path.resolve(BASE_PATH, 'images');

module.exports = Merge(CommonConfig, {
	output: {
		filename: "[name].[chunkhash].js",
		chunkFilename:'[name].[chunkhash].js',
	},
	plugins: [
		// Set environment variables
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),

		// Uglify for production
		new webpack.optimize.UglifyJsPlugin(),
		
		// Build Index.html
		new HtmlWebpackPlugin({
			inject: false,
			template: HtmlWebpackTemplatePlugin,
			inlineManifestWebpackName: 'webpackManifest',
			title: 'Healthfull App',
			appMountId: "application",
			mobile: true,
			meta: [
				{
					name: 'description',
					content: 'Plan your meals, build a shopping list, and watch your calories. Healthfull, control your health and well-being.'
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1"
				}
			],
			minify: {
				'collapseWhitespace': true, // Set to true for PROD
				'preserveLineBreaks': true,
			},
			links: [
				"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
			],
			scripts: [
				"https://unpkg.com/react@15/dist/react.min.js",
				"https://unpkg.com/react-dom@15/dist/react-dom.min.js",
				"https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.30.8/react-bootstrap.min.js",
			],
		}),

		// Generate fav-icons for all targeted platforms
		new FaviconsWebpackPlugin({
			logo: path.resolve(IMAGE_PATH, 'favicon.png'),
			prefix: 'favicons-[hash]/',
			title: 'app-favicon',
			persistentCache: true,
			emitStats: false,
			inject: true,
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: false,
				yandex: false,
				windows: false
			}
		}),

		// Hash chunks (be less performant but more accurate in production)
		new webpack.HashedModuleIdsPlugin(),
	]
})