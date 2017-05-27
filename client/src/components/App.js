import React from 'react'
import TopNav from './TopNav'
import Footer from './Footer'
import AddFood from '../containers/AddFood'
import VisibleFoodList from '../containers/VisibleFoodList'
import { Grid, Row, Col } from 'react-bootstrap'

const App = () => (
  <div>
    <TopNav />
    <Grid>
      <Row>
        <Col xs={12} md={8}>
          <AddFood />
          <VisibleFoodList />
          <Footer />
        </Col>
      </Row>
    </Grid>
  </div>
)

export default App
