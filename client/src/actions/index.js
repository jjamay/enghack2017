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

export const receiveEvents = (json) => {
  console.log(json)
  console.log(typeof json + " L33")
  var result = Object.keys(json).map(function(e) {
  return ;
});
return {
  type: RECEIVE_EVENTS,
  items: json,
  receivedAt: Date.now()
}
}

export const invalidateEvents = () => ({
  type: INVALIDATE_EVENTS
})

const fetchEvents = () => dispatch => {
  dispatch(requestEvents())
  return fetch(eGET_EVENTS)
    .then(json => dispatch(receiveEvents(json)))
}

const shouldFetchEvents = (state) => {
  const events = state.items
  if (!events) {
    return true
  }
  if (events.isFetching) {
    return false
  }
  return events.didInvalidate
}

export const fetchEventsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchEvents(getState())) {
    return dispatch(fetchEvents())
  }
}
