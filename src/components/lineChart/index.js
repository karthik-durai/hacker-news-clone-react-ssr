import React from 'react'
import PropTypes from 'prop-types'
import { LineChart } from 'react-chartkick'
import 'chart.js'
import './styles.css'

function Chart({ plotData = [] }) {
	return (
		<LineChart
			data={plotData}
			discrete
			xtitle="ID"
			ytitle="Votes"
			curve={false}
			messages={{ empty: 'No data' }}
		/>
	)
}

Chart.propTypes = {
	plotData: PropTypes.arrayOf(PropTypes.array).isRequired,
}

export default Chart
