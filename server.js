import 'babel-polyfill'
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import routes from './src/routes'
import App from './src/App'
import IndexHtml from './public/index.html'

const PORT = process.env.PORT || 8000

const server = express()
server.use(express.static('build/public'))

server.listen(PORT, () => console.log(`Server started and running at ${PORT}`))

function getHTML(content, initialData) {
	return `<html>
		<head>
		</head>
		<body>
			<div id="root">${content}</div>
			<script src="client-bundle.js"></script>
			<script>window.__initialData__ = ${JSON.stringify(initialData)}</script>
		</body>
	</html>`
}

server.get('/', async (req, res) => {
	const { page } = req.query
	const pageNum = page ? page - 1 : 0
	const currentRoute = routes.find(route => matchPath(req.url, route))
	const { requestInitialData } = currentRoute.component
	const data = await requestInitialData(pageNum)
	const context = { initialData: data }
	const content = ReactDOMServer.renderToString(
		<StaticRouter location={req.url} context={context}>
			<App />
		</StaticRouter>
	)
	res.send(getHTML(content, data))
})

server.get('*', (req, res) => {
	res.send('Not found')
})
