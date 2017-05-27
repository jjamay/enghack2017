let nextFoodId = 0
export const addFood = (text) => ({
  type: 'ADD_FOOD',
  id: nextFoodId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})