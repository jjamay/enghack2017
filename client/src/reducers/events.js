import { ADD_EVENT, INVALIDATE_EVENTS, REQUEST_EVENTS, RECEIVE_EVENTS } from '../actions'

const event = (state, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        location: action.event.location,
        roomNumber: action.event.roomNumber,
        foodType: action.event.foodType,
        startingTime: action.event.startingTime,
        endingTime: action.event.endingTime,
        servingSize: action.event.servingSize
      }
    default:
      return state
  }
}

const events = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_EVENTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_EVENTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_EVENTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.items,
        lastUpdated: action.receivedAt
      }
    case ADD_EVENT:
      return [
        ...state,
        event(undefined, action)
      ]
    default:
      return state
  }
}

export default events
