import axios from 'axios'

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
export const TOGGLE_ADD_BUTTON = 'TOGGLE_ADD_BUTTON'

let nextEventId = 0
export const addEvent = (location, roomNumber, foodType, startingTime, endingTime, servingSize) => ({
  type: ADD_EVENT,
  id: nextEventId++,
  event: {
    location,
    roomNumber,
    foodType,
    startingTime,
    endingTime,
    servingSize
  }
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
  return {
    type: RECEIVE_EVENTS,
    items: json.data,
    receivedAt: Date.now()
  }
}

export const toggleAddButton = () => ({
  type: TOGGLE_ADD_BUTTON
})

export const invalidateEvents = () => ({
  type: INVALIDATE_EVENTS
})

const fetchEvents = () => dispatch => {
  dispatch(requestEvents())
  return axios.get(eGET_EVENTS)
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
