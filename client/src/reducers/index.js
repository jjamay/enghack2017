import { combineReducers } from 'redux'
import events from './events'
import visibilityFilter from './visibilityFilter'
import addEvent from './addEvent'

const eventApp = combineReducers({
  events,
  visibilityFilter,
  addEvent
})

export default eventApp
