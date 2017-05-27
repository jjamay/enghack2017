import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'

const Event = ({ onClick, event }) => (
  <Panel header={`${event.location} ${event.roomNumber}`} onClick={onClick}>
    Start Time: {event.startingTime}
    End Time: {event.endingTime}
    Serving Size: {event.servingSize}
    Food: {event.foodType}
  </Panel>
)

Event.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Event
