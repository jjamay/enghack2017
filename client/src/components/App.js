import React from 'react'
import TopNav from './TopNav'
import Footer from './Footer'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class'
import AddEvent from '../containers/AddEvent'
import { fetchEventsIfNeeded } from '../actions'
import VisibleEventList from '../containers/VisibleEventList'
import { Grid, Row, Col } from 'react-bootstrap'

const App = createReactClass({
  componentDidMount: function() {
    this.props.dispatch(fetchEventsIfNeeded())
  },

  render: function() {
    return (
      <div>
        <TopNav />
        <Grid>
          <Row>
            <Col xs={12} md={8}>
              <AddEvent />
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
