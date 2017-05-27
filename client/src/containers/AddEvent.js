import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../actions'
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap'

let AddEvent = ({ dispatch }) => {
  let name

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!name.value.trim()) {
          return
        }
        dispatch(addEvent(name.value))
        name.value = ''}}
      >
        <FormGroup controlId="formBasicText">
          <InputGroup>
            <FormControl
              type="text"
              inputRef={node => {
                name = node
              }}
              placeholder="What kind of food?"
            />
            <FormControl.Feedback />
            <InputGroup.Button>
              <Button type="submit">Add Event</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    </div>
  )
}
AddEvent = connect()(AddEvent)

export default AddEvent
