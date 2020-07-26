import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { LineChart, StoryCard } from '../components'
import fetchStories from '../network'
import './styles.css'

function Index({ staticContext = {}, history }) {
	const { initialData = {} } = staticContext
	const { hits = [] } = initialData
	const [pageNumber, setPageNumber] = useState(0)
	const [maxPages, setMaxPages] = useState(1)
	const [stories, setStories] = useState(hits || [])
	const [filteredStories, setFilteredStories] = useState(hits || [])
	const [buttonsEnabledState, setButtonsEnabledState] = useState({
		Prev: false,
		Next: false,
	})
	const [plotData, setPlotData] = useState([])

	const getStoriesList = async pageNum => {
		try {
			const response = await fetchStories(pageNum)
			const { data } = response
			const { nbPages, page, hits: storyList } = data
			setPageNumber(page)
			setMaxPages(nbPages)
			setStories(storyList)
		} catch (e) {
			setStories([])
		}
	}

	const getPlotData = storiesList => {
		return storiesList.map(story => [story.objectID, story.vote])
	}

	const appendVoteData = (storyList, userFavData) => {
		return storyList.map(story => {
			if (userFavData[story.objectID]) {
				return { ...story, vote: userFavData[story.objectID].vote || 0 }
			}
			return { ...story, vote: 0 }
		})
	}

	const removeHiddenStories = (storyList, userFavData) => {
		return storyList.filter(story => {
			return !userFavData[story.objectID] || !userFavData[story.objectID].hidden
		})
	}

	const getUserFavoritesData = () => {
		return JSON.parse(localStorage.getItem('userFavoritesData'))
	}

	useEffect(() => {
		const { __initialData__ } = window
		const { nbPages, page, hits: storyList } = __initialData__
		setPageNumber(page)
		setMaxPages(nbPages)
		setStories(storyList)
	}, [])

	useEffect(() => {
		const userFavoritesData = localStorage.getItem('userFavoritesData')
		if (!userFavoritesData) {
			localStorage.setItem('userFavoritesData', JSON.stringify({}))
		}
	}, [])

	useEffect(() => {
		setButtonsEnabledState({
			Prev: pageNumber > 0,
			Next: pageNumber < maxPages - 1,
		})
	}, [pageNumber, maxPages])

	useEffect(() => {
		const userFavoritesData = JSON.parse(
			localStorage.getItem('userFavoritesData')
		)
		const filteredStoriesNew = appendVoteData(
			removeHiddenStories(stories, userFavoritesData),
			userFavoritesData
		)
		setFilteredStories(filteredStoriesNew)
	}, [stories])

	useEffect(() => {
		setPlotData(getPlotData(filteredStories))
	}, [filteredStories])

	const onButtonClick = direction => {
		const numToAdd = direction === 'Prev' ? -1 : 1
		const newPageNumber = pageNumber + numToAdd
		setPageNumber(newPageNumber)
		getStoriesList(newPageNumber)
		history.push(`/?page=${newPageNumber + 1}`)
	}

	const onHideClick = data => {
		const userFavoritesData = getUserFavoritesData()
		const storyData = userFavoritesData[data.objectID] || {}
		storyData.hidden = true
		userFavoritesData[data.objectID] = storyData
		localStorage.setItem('userFavoritesData', JSON.stringify(userFavoritesData))
		const filteredStoriesNew = appendVoteData(
			removeHiddenStories(stories, userFavoritesData),
			userFavoritesData
		)
		setFilteredStories(filteredStoriesNew)
	}

	const onVoteClick = data => {
		const userFavoritesData = getUserFavoritesData()
		const storyData = userFavoritesData[data.objectID] || {}
		if (storyData.vote) {
			storyData.vote += 1
		} else {
			storyData.vote = 1
		}
		userFavoritesData[data.objectID] = storyData
		localStorage.setItem('userFavoritesData', JSON.stringify(userFavoritesData))
		const filteredStoriesNew = appendVoteData(
			removeHiddenStories(stories, userFavoritesData),
			userFavoritesData
		)
		setFilteredStories(filteredStoriesNew)
	}

	return (
		<div>
			<div>
				{filteredStories.map(story => (
					<StoryCard
						key={story.objectID}
						data={story}
						onHideClick={() => onHideClick(story)}
						onVoteClick={() => onVoteClick(story)}
					/>
				))}
			</div>
			<div>
				<button
					type="button"
					onClick={() => onButtonClick('Prev')}
					disabled={!buttonsEnabledState.Prev}>
					Prev
				</button>
				<button
					type="button"
					onClick={() => onButtonClick('Next')}
					disabled={!buttonsEnabledState.Next}>
					Next
				</button>
			</div>
			<LineChart plotData={plotData} />
		</div>
	)
}

Index.requestInitialData = async pageNum => {
	try {
		const { data } = await fetchStories(pageNum)
		return data
	} catch {
		return []
	}
}

Index.propTypes = {
	staticContext: PropTypes.objectOf(PropTypes.object).isRequired,
	history: PropTypes.objectOf(PropTypes.object).isRequired,
}

export default Index
