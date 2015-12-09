'use strict'

var express = require('express');
var router = express.Router();
import Book from './db'

router.get('/',function (req, res) {
    res.send("Hello World");
});

router.get('/books',function(req,res) {

  .post(function (req, res) {
    var book = new Book();
    console.log(req.body.title);
    book.title = req.body.title;
    book.save(function (err) {
      if (err) res.send(err);
      res.json({ message: 'Book created!' });
    });
  })

  .get(function (req, res) {
    var query = {};
    if (req.query.branch) query.branch = req.query.branch; // books?branch=North+York+Central+Library
    if (req.query.title) query.title = req.query.title;

    Book.find(query).exec(function (err, books) {
      if (err) res.send(err);
      res.json(books);
    });
  })

  // on routes that end in /books/:book_id
  router.route('/books/:book_id')

  .get(function (req, res) {
    Book.findById(req.params.Book_id, function (err, Book) {
      if (err) res.send(err);
      res.json(Book);
    });
  })

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

  .delete(function (req, res) {
    Book.remove({ _id: req.params.book_id}, function (err, book) {
      if (err) res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });
}

module.exports = router;