import React from 'react'
import TopNav from './TopNav'
import Footer from './Footer'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class'
import AddEventContainer from '../containers/AddEventContainer'
import { fetchEventsIfNeeded, setVisibilityFilter, toggleAddButton } from '../actions'
import VisibleEventList from '../containers/VisibleEventList'
import { Grid, Row, Col } from 'react-bootstrap'
import { filters } from '../containers/VisibleEventList'

const App = createReactClass({
  componentDidMount: function() {
    this.props.dispatch(fetchEventsIfNeeded())
    this.props.dispatch(toggleAddButton())
  },

  render: function() {
    return (
      <div>
        <TopNav />
        <Grid>
          <Row>
            <Col xs={12} md={8}>
              <AddEventContainer />
              <VisibleEventList />
              <Footer />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
})

export default connect()(App)
