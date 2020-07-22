import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './styles.css'

dayjs.extend(relativeTime)

function StoryCard({ data, onHideClick, onVoteClick }) {
	const getHostName = url => {
		return url
			? url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0]
			: ''
	}

	const getRelativeTime = time => {
		return dayjs().to(dayjs(time))
	}

	return (
		<a href={data.url} target="_blank" rel="noreferrer">
			<div>
				<p className="title">{data.title}</p>
				<p>Votes: {data.vote}</p>
				<p>URL: {getHostName(data.url)}</p>
				<p>Author: {data.author}</p>
				<p>Posted: {getRelativeTime(data.created_at)}</p>
				<div>
					<button
						type="button"
						onClick={e => {
							e.preventDefault()
							onVoteClick()
						}}>
						Vote
					</button>
					<button
						type="button"
						onClick={e => {
							e.preventDefault()
							onHideClick()
						}}>
						Hide
					</button>
				</div>
			</div>
		</a>
	)
}

StoryCard.propTypes = {
	data: PropTypes.objectOf(PropTypes.object).isRequired,
	onHideClick: PropTypes.func.isRequired,
	onVoteClick: PropTypes.func.isRequired,
}

export default StoryCard
