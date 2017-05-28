import { TOGGLE_ADD_BUTTON } from '../actions/'

const addActive = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_ADD_BUTTON:
      console.log(state)
      return !state
    default:
      return state
  }
}

export default addActive
