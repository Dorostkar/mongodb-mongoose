const express = require('express');
var mongoose = require('mongoose');

const app = express();
const port = 3001;
mongoose.connect('mongodb://localhost/school');
const movieSchema = {
  id: Number,
  url: String,
  name: String,
  season: Number,
  number: Number,
  airdate: String,
  airtime: String,
  airstamp: String,
  runtime: Number,
  image: {
    medium:String,
    original:String
  },
  summery:String,
  _link:{
    self:{
      href:String
    }
  }

};

var Movie = mongoose.model('Movies', movieSchema);

app.get('/', function(req, res) {
  res.send('This is working :)');

});
//cerate 2 Root
//1 return all got episode
//2 return season by number
app.get('/episodes', function(req, res) {

  Movie.find(function(err, movies) {
    if (err) {
      return res.send('Error happend here');
    }
    res.send(movies);
  });
});
  app.get('/seasons/:id', function(req, res) {

   Movie.find({'season':req.params.id},function(err, result) {
      if (err) {
        // return res.send('Error happend here');
        return handleError(err);
      }
       res.send(result);

    });

});

app.listen(port, function() {
  console.log('I am listening on ' + port);
});
