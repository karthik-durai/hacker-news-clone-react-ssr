import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import './styles.css'
import upvoteArrowIcon from '../../../public/upvote-arrow.svg'

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
		<div className="storycard">
			<p className="story-commentscount">
				<span className="value-label">Comments:</span>
				<span>{data.num_comments}</span>
			</p>
			<p className="story-votescount">
				<span className="value-label">Votes:</span>
				<span>{data.vote}</span>
			</p>
			<button
				className="cta-btn story-voteCTA"
				type="button"
				onClick={e => {
					e.preventDefault()
					onVoteClick()
				}}>
				<img src={upvoteArrowIcon} alt="upvote-icon" />
			</button>
			<a
				href={data.url}
				target="_blank"
				rel="noreferrer"
				className="storycard-title">
				<p>{data.title}</p>
			</a>
			<a
				href={data.url}
				target="_blank"
				rel="noreferrer"
				className="storycard-url">
				<p>({getHostName(data.url)})</p>
			</a>
			<p className="storycard-author">
				<span className="value-label">Author:</span>
				<span>{data.author}</span>
			</p>
			<p className="storycard-time">
				<span className="value-label">Posted:</span>
				<span>{getRelativeTime(data.created_at)}</span>
			</p>
			<button
				className="cta-btn storycard-hideCTA"
				type="button"
				onClick={e => {
					e.preventDefault()
					onHideClick()
				}}>
				[Hide]
			</button>
		</div>
	)
}

StoryCard.propTypes = {
	data: PropTypes.objectOf(PropTypes.object).isRequired,
	onHideClick: PropTypes.func.isRequired,
	onVoteClick: PropTypes.func.isRequired,
}

export default StoryCard
