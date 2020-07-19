import React from 'react'
import PropTypes from 'prop-types'
import { LineChart } from 'react-chartkick'
import 'chart.js'

function Chart({ plotData = [] }) {
	return (
		<div
			style={{
				width: '100%',
				height: '300px',
			}}>
			<LineChart
				data={plotData}
				discrete
				xtitle="ID"
				ytitle="Votes"
				curve={false}
				messages={{ empty: 'No data' }}
			/>
		</div>
	)
}

Chart.propTypes = {
	plotData: PropTypes.arrayOf(PropTypes.array).isRequired,
}

export default Chart
