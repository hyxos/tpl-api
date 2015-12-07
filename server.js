var express = require('express');
var app = express();
var port = process.env.PORT || 8080;


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/book'); // connect to our database
var Book = require('./app/models/book');
// routes will go here

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);


app.get('/api/books/', function(req, res) {
  var query = {};

  // ex: /books?branch=North+York+Central+Library
  if (req.query.branch) {
    query.branch = req.query.branch
  }

  if (req.query.title) {
    query.title = req.query.title
  }

  if (req.query.author) {
    query.author = req.query.author;
  }

  Book.find(query).exec(function (err, res) {
      console.log(res);
  });

  // Book.findOne({ 'title' : req.query.title}, 'title author', function (err, book) {
  //   if (err) return handleError(err);
  //   console.log(book.title + book.author) // Space Ghost is a talk show host.
  // })  
});

//var query = Person.findOne({ 'title': 'Ghost' });

//Kitten.find({ name: /^Fluff/ }, callback);


