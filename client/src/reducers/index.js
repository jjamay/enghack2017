import { combineReducers } from 'redux'
import foods from './foods'
import visibilityFilter from './visibilityFilter'

const foodApp = combineReducers({
  foods,
  visibilityFilter
})

export default foodApp
