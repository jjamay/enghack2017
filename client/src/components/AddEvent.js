import React from 'react'
import { FormGroup, FormControl, Button } from 'react-bootstrap'

const AddEvent = ({ active, onButtonClick, onFormSubmit }) => {
  let form
  let text
  if (active) {
    let location
    let roomNumber
    let foodType
    let startingTime
    let endingTime
    let servingSize

    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!location.value.trim() || !roomNumber.value.trim() || !foodType.value.trim() || !startingTime.value.trim()) {
            return
          }
          onFormSubmit(location.value, roomNumber.value, foodType.value, startingTime.value, endingTime.value, servingSize.value)
          location.value = ''
          roomNumber.value = ''
          foodType.value = ''
          startingTime.value = ''
          endingTime.value = ''
          servingSize.value = ''}}
        >
          <FormGroup controlId="formBasicText">
            <FormControl
              type="text"
              inputRef={node => {
                location = node
              }}
              placeholder="Building"
            />
            <FormControl
              type="text"
              inputRef={node => {
                roomNumber = node
              }}
              placeholder="Room #"
            />
            <FormControl
              type="text"
              inputRef={node => {
                foodType = node
              }}
              placeholder="Food Type"
            />
            <FormControl
              type="text"
              inputRef={node => {
                startingTime = node
              }}
              placeholder="Starting Time"
            />
            <FormControl
              type="text"
              input={node => {
                endingTime = node
              }}
              placeholder="Ending Time"
            />
            <FormControl
              type="text"
              input={node => {
                servingSize = node
              }}
              placeholder="Serving Size"
            />
          </FormGroup>
          <Button type="submit">Submit Event</Button>
        </form>
        <Button onClick={onButtonClick}>Cancel</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button onClick={onButtonClick}>Add Event</Button>
      </div>
    )
  }
}

export default AddEvent