const webpack = require("webpack");
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.base.config.js');
// Generate client-side html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Define a base html template
const HtmlWebpackTemplatePlugin = require('html-webpack-template');

module.exports = Merge(CommonConfig, {
	devtool: "source-map",
	output: {
		filename: "[name].js",
		chunkFilename: "[name].js",
	},
	plugins: [
		// Set environment variables
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development')
			}
		}),

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
				'collapseWhitespace': false, // Set to false for DEV
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

		// Hash chunks
		new webpack.NamedModulesPlugin()
	]
})