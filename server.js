const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const router = express.Router();
const routes = require('./server/api.js')(router);
const mongoose = require('mongoose');

const app = express();

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api',routes);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client'));
}

mongoose.connect('mongodb://minxhe:123456@ds155811.mlab.com:55811/enghack2017', function(err){
  if(err){
    console.log("not connected to the database: "+err);
  }else{
    console.log("successfully connected to MongoDb");
  }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
