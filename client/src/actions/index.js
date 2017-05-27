import fetch from 'isomorphic-fetch'

// api endpoints
const eGET_EVENTS = '/api/getEvents'
const ePOST_EVENT = '/api/postEvent'

// actions
export const ADD_EVENT = 'ADD_EVENT'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export const POST_EVENTS = 'POST_EVENTS'
export const INVALIDATE_EVENTS = 'INVALIDATE_EVENTS'

let nextEventId = 0
export const addEvent = (text) => ({
  type: ADD_EVENT,
  id: nextEventId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const requestEvents = () => ({
  type: REQUEST_EVENTS
})

export const receiveEvents = (json) => ({
  type: RECEIVE_EVENTS,
  events: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

export const invalidateEvents = () => ({
  type: INVALIDATE_EVENTS
})

const fetchEvents = () => dispatch => {
  dispatch(requestEvents())
  return fetch(eGET_EVENTS)
    .then(response => response.json())
    .then(json => dispatch(receiveEvents(json)))
}

const shouldFetchPosts = (state) => {
  const events = state.events
  if (!events) {
    return true
  }
  if (events.isFetching) {
    return false
  }
  return events.didInvalidate
}

export const fetchEventsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchEvents())
  }
}
