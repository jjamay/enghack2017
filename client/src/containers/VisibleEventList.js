import { connect } from 'react-redux'
import { fetchEventsIfNeeded, invalidateEvents } from '../actions'
import EventList from '../components/EventList'

export const filters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

const getVisibleEvents = (events = [], isFetching, filter) => {
  if (events.length === 0) {
    return isFetching ? "Loading" : "No events"
  }
  switch (filter) {
    case filters.SHOW_ALL:
      return events
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => {
  const {
    isFetching,
    lastUpdated,
    visibilityFilter,
    items: events
  } = state.events || {
    isFetching: true,
    visibilityFilter: filters.SHOW_ALL,
    items: []
  }
  return {
    events: getVisibleEvents(events, isFetching, visibilityFilter),
    isFetching,
    lastUpdated
  }
}

const mapDispatchToProps = dispatch => ({
  onEventClick: () => {},
  onRefreshClick: (e) => {
    e.preventDefault()
    dispatch(invalidateEvents())
    dispatch(fetchEventsIfNeeded())
  }
})

const VisibleEventList = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventList)

export default VisibleEventList
