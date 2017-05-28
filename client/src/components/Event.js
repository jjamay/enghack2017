import React from 'react'
import PropTypes from 'prop-types'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import moment from 'moment'

const Event = ({ event, onClick }) => (
  <Panel header={`${event.location} ${event.roomNumber}`} onClick={onClick}>
    <ListGroup fill>
      <ListGroupItem>Start Time: {moment(event.startingTime).format('MMMM Do, h:mm a')}</ListGroupItem>
      <ListGroupItem>End Time: {moment(event.endingTime).format('MMMM Do, h:mm a')}</ListGroupItem>
      <ListGroupItem>Serving Size: {event.servingSize}</ListGroupItem>
      <ListGroupItem>Food: {event.foodType}</ListGroupItem>
    </ListGroup>
  </Panel>
)

// Event.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default Event
