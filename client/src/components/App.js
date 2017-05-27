import React from 'react'
import TopNav from './TopNav'
import Footer from './Footer'
import AddEvent from '../containers/AddEvent'
import VisibleEventList from '../containers/VisibleEventList'
import { Grid, Row, Col } from 'react-bootstrap'

const App = () => (
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

export default App
