const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

movieSchema = {
  name: String,
  age:Number
}

var Movie = mongoose.model('Movie', movieSchema);

var movie = new Movie({ name: 'Tim',age:15 });
Movie.find(function(err,docs){
  console.log(docs);
});
movie.save(function (err, doc) {
  if (err) {
    console.log(err);
  } else {
    console.log(doc);
  }
});
