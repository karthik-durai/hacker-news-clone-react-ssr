const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
	target: 'node',
	entry: './server.js',
	output: {
		filename: 'server-bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build',
	},
	module: {
		rules: [
			{
				test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: 'file-loader',
				options: {
					name: 'public/media/[name].[ext]',
					publicPath: url => url.replace(/public/, ''),
				},
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/',
				options: {
					presets: ['@babel/react'],
				},
			},
			{
				test: /\.css$/,
				use: [{ loader: 'css-loader', options: { importLoaders: 1 } }],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
		],
	},
	externals: [webpackNodeExternals()],
}
