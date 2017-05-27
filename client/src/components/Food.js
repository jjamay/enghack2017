import React from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'

const Food = ({ onClick, text }) => (
  <Panel onClick={onClick}>
    {text}
  </Panel>
)

Food.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Food
