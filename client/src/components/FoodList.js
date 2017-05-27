import React from 'react'
import PropTypes from 'prop-types'
import Food from './Food'

const FoodList = ({ foods, onFoodClick }) => (
  <div>
    {foods.map(food =>
      <Food
        key={food.id}
        {...food}
        onClick={() => onFoodClick(food.id)}
      />
    )}
  </div>
)

FoodList.propTypes = {
  foods: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onFoodClick: PropTypes.func.isRequired
}

export default FoodList
