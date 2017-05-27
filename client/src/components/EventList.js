import React from 'react'
import PropTypes from 'prop-types'
import Event from './Event'
import { Button } from 'react-bootstrap'

const EventList = ({ items, isFetching, lastUpdated, onEventClick, onRefreshClick }) => (
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
    
    {items[0]}
  </div>
)

export default EventList
