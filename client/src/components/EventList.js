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
    {typeof events === 'string'
    ? events 
    : events.map(event =>
      <Event
        key={event.id}
        event={event}
        onClick={() => onEventClick(event.id)}
      />
    )}
  </div>
)

export default EventList
