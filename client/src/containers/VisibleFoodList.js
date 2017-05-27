import { connect } from 'react-redux'
import { toggleFood } from '../actions'
import FoodList from '../components/FoodList'

const getVisibleFoods = (foods, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return foods
    case 'SHOW_COMPLETED':
      return foods.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return foods.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => ({
  foods: getVisibleFoods(state.foods, state.visibilityFilter)
})

const mapDispatchToProps = {
  onFoodClick: toggleFood
}

const VisibleFoodList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodList)

export default VisibleFoodList
