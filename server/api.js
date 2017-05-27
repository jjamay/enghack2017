const freeEvent = require('./models/event');

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

module.exports = (router) => {
  router.get('/campusBuildings', (req, res) => {
    res.send(campusBuildings);
  });

  router.post('/addEvent', (req, res) => {
    console.log("got the add event request");
    var currentTime = new Date();
    console.log(req.body);
    var startingTime = new Date(req.body.startingTime);
    if(currentTime.getTime() - startingTime.getTime() >= 7200000){
      res.json({"success": false, "msg": "The event started 2 hours ago. It's most likely expired"});
    }else{
      var newEvent = new freeEvent();

      if(currentTime.getTime() - startingTime.getTime() < 7200000 && currentTime.getTime() - startingTime.getTime() >= 0){
        newEvent.state.ongoing = true;
        newEvent.state.upcoming = false;
      }else{
        newEvent.state.ongoing = false;
        newEvent.state.upcoming = true;
      }

      newEvent.location = req.body.location;
      newEvent.roomNumber = req.body.roomNumber;
      newEvent.startingTime = startingTime;
      newEvent.foodType = req.body.foodType;
      newEvent.servingSize = req.body.servingSize != undefined ? req.body.servingSize : null;

      if(req.body.endingTime !== undefined && req.body.endingTime !== null){
        var endingTime = new Date(req.body.endingTime);
        if(endingTime.getTime() - startingTime.getTime() < 7200000){
          newEvent.endingTime = endingTime;
          newEvent.expiringTime = endingTime;
        }else{
          //if the endingTime is 2 hours away from the starting time
          newEvent.endingTime = new Date(startingTime.getTime() + 7200000);
          newEvent.expiringTime = new Date(startingTime.getTime() + 7200000);
        }

      }else{
        //set the expiringTime 2 hours from the starting time
        newEvent.expiringTime = new Date(startingTime.getTime() + 7200000);
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

  router.get('/getEvents', (req, res) => {
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

  router.post('/upvote', (req, res) => {
    console.log(req.body);

    var id = req.body.id;

    freeEvent.findOne({ _id: id}, (err, event) => {
      console.log("found by id");
      if(err) throw err;
      event.upvotes = event.upvotes+1;
      event.save((err)=>{
        if(err) throw err;
        else{
          res.json({success: true});
        }
      })
    });
  });

  router.post('/downvote', (req, res) => {
    var id = req.body.id;

    freeEvent.findOne({ _id: id}, (err, event) => {
      console.log("found by id");
      if(err) throw err;
      event.downvotes = event.downvotes+1;
      event.save((err)=>{
        if(err) throw err;
        else{
          res.json({success: true});
        }
      })
    });
  });

  return router;
}
