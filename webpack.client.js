const path = require('path')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'client-bundle.js',
		path: path.resolve(__dirname, 'build/public'),
		publicPath: '/build/public',
	},
	module: {
		rules: [
			{
				test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: 'file-loader',
				options: {
					name: '/media/[name].[ext]',
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
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
				],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
		],
	},
}
