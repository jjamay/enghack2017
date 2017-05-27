const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const app = express();

const campusBuildings = [
  "Accelerator Centre",
  "Applied Health Science",
  "Arts Lecture Hall",
  "Bauer Warehouse",
  "B.C. Matthews Hall",
  "Biology 1",
  "Biology 2",
  "Bright Starts Co-operative Early Learning Centre",
  "Brubacher House",
  "Carl A. Pollock Hall",
  "Central Services Building",
  "Centre for Environmental and Information Technology",
  "Chemistry 2",
  "Columbia Icefield",
  "Columbia Lake Village",
  "Columbia Lake Village North",
  "Columbia Greenhouses",
  "Commissary",
  "Conrad Grebel University College",
  "Dana Porter Library",
  "Davis Centre",
  "Digital Media Stratford",
  "Douglas Wright Engineering Building",
  "Earth Sciences & Chemistry",
  "East Campus Hall",
  "Energy Research Centre",
  "Engineering 2",
  "Engineering 3",
  "Engineering 5",
  "Engineering 6",
  "Environment 1",
  "Environment 2",
  "Environment 3",
  "Federation Hall",
  "General Services Complex",
  "Graduate House",
  "Hagey Hall",
  "Health Services",
  "Hildegard Marsden Nursery",
  "Huntsville Summit Centre",
  "Ira G. Needles Hall",
  "J.G. Hagey Hall of the Humanities",
  "J.R. Coutts Engineering Lecture Hall",
  "Mathematics & Computer Building",
  "Mathematics 3",
  "Mike & Ophelia Lazaridis Quantum-Nano Centr",
  "Minota Hagey Residence",
  "Modern Languages",
  "Needles Hall",
  "Optometry",
  "Physical Activities Complex",
  "Physics",
  "Porter Library",
  "Psychology, Anthropology, Sociology(PAS)",
  "Renison University College",
  "Ron Eydt Village",
  "Science Teaching Complex",
  "South Campus Hall",
  "St. Paul’s University College",
  "Student Life Centre",
  "Student Village 1",
  "Tatham Centre",
  "Toby Jenkins Applied Health Research Building",
  "University Club",
  "University of Waterloo Place",
  "William Lyon Mackenzie King Village"
];

app.set('port', (process.env.PORT || 3001));

mongoose.connect('mongodb://minxhe:123456@ds155811.mlab.com:55811/enghack2017', function(err){
  if(err){
    console.log("not connected to the database: "+err);
  }else{
    console.log("successfully connected to MongoDb");
  }
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client'));
}

var EventSchema = new Schema({
  location: { type: String, required: true},
  roomNumber: { type: String, required: true},
  startingTime: { type: Date, required: true},
  endingTime: { type: Date, required: false},
  servingSize: { type: Number },
  foodType: { type: String, required: true},

  //if an event is 2 hours passed its starting time it will be marked as expired and will be deleted upon next user call
  expiringTime: { type: Date, required: true},
  state: {
    upcoming: { type: Boolean, required: true, default: true},
    ongoing: { type: Boolean, required: true, default: false},
    expired: { type: Boolean, required: true, default: false}
  }

});

var freeEvent = mongoose.model('freeEvent', EventSchema);

app.get('/api/campusBuildings', (req, res) => {
  res.send(campusBuildings);
});

app.post('/api/addEvent', (req, res) => {
  console.log("got the add event request");
  var currentTime = new Date();

  if(currentTime.getTime() - req.startingTime.getTime() >= 7200000){
    res.json({"success": false, "msg": "The event started 2 hours ago. It's most likely expired"});
  }else{
    var newEvent = new freeEvent();

    if(currentTime.getTime() - req.startingTime.getTime() < 7200000 && currentTime.getTime() - req.startingTime.getTime() >= 0){
      newEvent.state.ongoing = true;
      newEvent.state.upcoming = false;
    }else{
      newEvent.state.ongoing = false;
      newEvent.state.upcoming = true;
    }

    newEvent.location = req.body.location;
    newEvent.roomNumber = req.body.roomNumber;
    newEvent.startingTime = req.body.startingTime;
    newEvent.foodType = req.body.foodType;
    newEvent.servingSize = "25";

    if(req.body.endingTime !== undefined && req.body.endingTime !== null){
      if(req.body.endingTime.getTime() - req.body.startingTime.getTime() < 7200000){
        newEvent.endingTime = req.body.endingTime;
        newEvent.expiringTime = req.body.endingTime;
      }else{
        //if the endingTime is 2 hours away from the starting time
        newEvent.endingTime = new Date(req.body.startingTime.getTime() + 7200000);
        newEvent.expiringTime = new Date(req.body.startingTime.getTime() + 7200000);
      }

    }else{
      //set the expiringTime 2 hours from the starting time
      newEvent.expiringTime = new Date(req.body.startingTime.getTime() + 7200000);
    }

    newEvent.save((err) => {
      if(err){
        console.log("Error when saving the model");
        res.json({success: false});
      }else{
        console.log("successfully saved the model");
        res.json({success: true});
      }
    });


  }
});

app.get('/api/getEvents', (req, res) => {
  var currentTime = new Date();
  freeEvent.find({}, (err, events) => {
    if(err){
      throw err;
    }else {
      //see if the event has expired
      events.forEach((event) => {
        //check if the event has expired
        if(currentTime.getTime() - event.expiringTime.getTime() >= 0){
          event.state.upcoming = false;
          event.state.ongoing = false;
          event.state.expired = true;
          //if the event has expired more than 2 hours, delete it
          if(currentTime.getTime() - event.expiringTime.getTime() >= 7200000){
            freeEvent.remove({ _id: event.id }, (err) => {
              if(err) throw err;
            });
          }
        }
      });

      //events expired within 2 hours will be sent
      res.json(JSON.stringify(events));
    }
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
