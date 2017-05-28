import { connect } from 'react-redux'
import { addEvent, toggleAddButton } from '../actions'
import AddEvent from '../components/AddEvent'

const mapStateToProps = state => ({
  active: state.addEvent
})

const mapDispatchToProps = (dispatch) => ({
  onButtonClick: () => {
    dispatch(toggleAddButton())
  },
  onFormSubmit: (location, roomNumber, foodType, startingTime, endingTime, servingSize) => {
    dispatch(addEvent(location, roomNumber, foodType, startingTime, endingTime, servingSize))
    dispatch(toggleAddButton())
  }
})

const AddEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEvent)

export default AddEventContainer
