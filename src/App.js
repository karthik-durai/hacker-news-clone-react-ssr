import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import routes from './routes'

function App() {
	return (
		<Switch>
			{routes.map(route => (
				<Route key={route.path} path={route.path} component={route.component} />
			))}
		</Switch>
	)
}

export default App
