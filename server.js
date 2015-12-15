'use strict'

// call the packages we need
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bp = require('body-parser')

// configure app
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('dev')); // log requests to the console
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

mongoose.connect('mongodb://localhost/book'); // connect to our database

var Book = require('./app/models/book');

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' }); 
});

// on routes that end in /books
router.route('/books')
// create a book
.post(function (req, res) {
  var book = new Book(); // create a new instance of the Book model
  console.log(req.body.title);
  book.title = req.body.title; // set the books name (comes from the request)
  book.save(function (err) {
    if (err) res.send(err);
    res.json({ message: 'Book created!' });
  });
})

// get all the books
.get(function (req, res) {
  Book.find(function (err, books) {
    if (err) res.send(err);
    res.json(books);
  });
})

// on routes that end in /books/:book_id
router.route('/books/:book_id')
// get the Book with that id
.get(function (req, res) {
  Book.findById(req.params.Book_id, function (err, Book) {
    if (err) res.send(err);
    res.json(Book);
  });
})

// update the Book with this id
.put(function (req, res) {
  Book.findById(req.params.Book_id, function (err, Book) {
    if (err) res.send(err);
    Book.name = req.body.name;
    Book.save(function (err) {
      if (err) res.send(err);
      res.json({ message: 'Book updated!' });
    });
  });
})

// delete the Book with this id
.delete(function (req, res) {
  Book.remove({ _id: req.params.book_id}, function (err, book) {
    if (err) res.send(err);
    res.json({ message: 'Successfully deleted' });
  });
});


// register routes and start server
app.use('/api', router);
app.listen(3000);
console.log('Magic happens on port 3000');