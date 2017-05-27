import React from 'react'
import { connect } from 'react-redux'
import { addFood } from '../actions'
import { FormGroup, ControlLabel, FormControl, InputGroup, Button } from 'react-bootstrap'

let AddFood = ({ dispatch }) => {
  let name

  return (
    <div>
      <form>
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
              <Button 
                type="submit"
                onClick={() => {
                  if (!name.value.trim()) {
                    return
                  }
                  dispatch(addFood(name.value))
                  name.value = ''
                }}
              >Add Food</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    </div>
  )
}
AddFood = connect()(AddFood)

export default AddFood
