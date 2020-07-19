import axios from 'axios'

const networkInstance = axios.create({
	baseURL: 'http://hn.algolia.com/api/v1/',
	timeout: 10000,
})

function fetchStories(page = 0) {
	const url = `/search?tags=front_page&page=${page}`
	return networkInstance.get(url)
}

export default fetchStories
