import 'babel-polyfill'
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import serializeJavascript from 'serialize-javascript'
import routes from './src/routes'
import App from './src/App'
import IndexHtml from './public/index.html'

const PORT = process.env.PORT || 8000

const server = express()
server.use(express.static('build/public'))

server.listen(PORT, () => console.log(`Server started and running at ${PORT}`))

server.get('/', async (req, res) => {
	const { page } = req.query
	const pageNum = page ? Number(page) : 1
	if (Number.isNaN(pageNum) || pageNum < 1) {
		res.status(400).send('Invalid page number')
	}
	const currentRoute = routes.find(route => matchPath(req.url, route))
	const { requestInitialData } = currentRoute.component
	const data = await requestInitialData(pageNum - 1)
	const context = { initialData: data }
	const serializedData = serializeJavascript(data)
	const content = ReactDOMServer.renderToString(
		<StaticRouter location={req.url} context={context}>
			<App />
		</StaticRouter>
	)
	const contentWithInitialData = `<div id="root">
	${content}
	</div>
	<script>window.__initialData__=${serializedData}</script>
	<script src="client-bundle.js" defer></script>
	`
	const html = IndexHtml.replace(
		'<div id="root"></div>',
		contentWithInitialData
	)
	res.send(html)
})

server.get('*', (req, res) => {
	res.status(404).send('Not found')
})
