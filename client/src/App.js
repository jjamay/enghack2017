import React, { Component } from 'react';
import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';
import axios from 'axios';
import 'whatwg-fetch';

class App extends Component {
  state = {
    selectedFoods: [],
    newEvent : {
      location: "rch",
      roomNumber: "202",
      startingTime: new Date(),
      servingSize: 30,
      foodType: "Pizza"
    }
  }

  addFood = (food) => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
  }

  addEvent = () => {
    // fetch('/api/addEvent', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     location: "rch",
    //     roomNumber: "202",
    //     startingTime: new Date(),
    //     servingSize: 30,
    //     foodType: "Pizza"
    //   })
    // }).then((response) => {
    //   console.log(response);
    // });
    axios.post('/api/addEvent', {
        location: "e5",
        roomNumber: "6008",
        startingTime: (new Date()).getTime()-100000000,
        servingSize: 30,
        foodType: "Pizza"
    }).then((response) => {
        console.log(response);
    });


  }

  upvote = () => {
    axios.post('/api/upvote', {
        id:"59298222cd57fa1988fc8c3b"
    }).then((response) => {
        console.log(response);
    });
  }

  render() {
    const { selectedFoods } = this.state;

    return (
      <div className='App'>
        <div className='ui text container'>
          <SelectedFoods
            foods={selectedFoods}
            onFoodClick={this.removeFoodItem}
          />
          <FoodSearch
            onFoodClick={this.addFood}
          />

          <button onClick = {this.addEvent}>Create Event</button>
          <button onClick = {this.upvote}>Upvote</button>
        </div>
      </div>
    );
  }
}

export default App;
