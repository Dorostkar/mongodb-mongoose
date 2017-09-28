const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = 3000;
const CONNECTION_LOCATION = 'mongodb://localhost/school';

mongoose.connect(CONNECTION_LOCATION, { useMongoClient: true });

const episodeSchema = {
  id: Number,
  url: String,
  name: String,
  season: Number,
  number: Number,
  airdate: String,
  airtime: String,
  airstamp: String,
  runtime: Number,
  image: Object,
  summary: String,
  _links: Object
}

var Movies = mongoose.model('movies', episodeSchema);

/*
  Test route
 */
app.get('/', function(req, res) {
  res.send('This is working :)');
})

/*
  GET episodes
 */
app.get('/episodes', function(req, res) {
  const query = req.query;
  Movies.find(query, function(err, episodes){
    if(err){
      return res.send('Error happened here');
    }
    res.send(episodes);
  });
})

/*
  GET an episode
 */
app.get('/episodes/:episodeId', function(req, res) {
  const episodeId = req.params.episodeId;
  if(episodeId) {
    Movies.findOne({id: episodeId}, function(err, episode){
      if(err){
        return res.send('Error happened here');
      }
      return res.send(episode);
    });
  }
})

app.listen(PORT, function(){
  console.log('I am listening on '+PORT);
})
