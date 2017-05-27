const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
// var mongoose = require('mongoose');

const app = express();

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

app.get('/api/food', (req, res) => {

  res.json([]);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
