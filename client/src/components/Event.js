import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'

const Event = ({ onClick, item }) => (
  <Panel header={`${item.location} ${item.roomNumber}`} onClick={onClick}>
    Start Time: {item.startingTime}
    End Time: {item.endingTime}
    Serving Size: {item.servingSize}
    Food: {item.foodType}
  </Panel>
)

Event.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Event
