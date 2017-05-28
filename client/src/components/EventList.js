import React from 'react'
import PropTypes from 'prop-types'
import Event from './Event'
import { Button } from 'react-bootstrap'

const EventList = ({ events, isFetching, lastUpdated, onEventClick, onRefreshClick }) => (
  <div>
    <div>
      {lastUpdated &&
        <span>
          Last updated at {new Date(lastUpdated).toLocaleString()}
        </span>
      }
      {!isFetching && 
        <Button onClick={e => onRefreshClick(e)}>Refresh</Button>
      }
    </div>
      {events.map((event) =>
      <Event key={event._id}
          onClick={() => onEventClick(event._id)}
          event={event}
        / >
      )}
  </div>
)

export default EventList
