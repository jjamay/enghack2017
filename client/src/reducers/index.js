import { combineReducers } from 'redux'
import events from './events'
import visibilityFilter from './visibilityFilter'

const eventApp = combineReducers({
  events,
  visibilityFilter
})

export default eventApp
