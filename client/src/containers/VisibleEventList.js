import { connect } from 'react-redux'
import { fetchEventsIfNeeded, invalidateEvents } from '../actions'
import EventList from '../components/EventList'

export const filters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

const getVisibleEvents = (items = [], isFetching, filter) => {
  if (items.length === 0) {
    return isFetching ? "Loading" : "No events"
  }
  switch (filter) {
    case filters.SHOW_ALL:
      return items
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => {
  const {
    isFetching,
    lastUpdated,
    items
  } = state.events || {
    isFetching: true,
    items: []
  }
  const visibilityFilter = state.visibilityFilter
  return {
    events: [...getVisibleEvents(items, isFetching, visibilityFilter)],
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
