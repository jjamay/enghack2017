import SET_VISIBILITY_FILTER from '../actions/'
import { filters } from '../containers/VisibleEventList'

const visibilityFilter = (state = filters.SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
