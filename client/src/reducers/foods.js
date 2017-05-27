const food = (state, action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_FOOD':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const foods = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      return [
        ...state,
        food(undefined, action)
      ]
    case 'TOGGLE_FOOD':
      return state.map(t =>
        food(t, action)
      )
    default:
      return state
  }
}

export default foods
