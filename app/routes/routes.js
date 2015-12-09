var express = require('express');
var router = express.Router();
var Book = require '../../db/config'

router.get('/', (req, res) => res.send("Hello World"))

router.get('/books', (req,res) => {
  .post((req, res) => {
    var book = new Book()
    book.title = req.body.title
    book.save(() => res.json({ message: 'Book created!' }))
  })

  .get((req, res) => {
    var query = {}
    // TODO: QUERYING e.g: books?branch=North+York+Central+Library
    if (req.query.branch) query.branch = req.query.branch
    if (req.query.title) query.title = req.query.title
    Book.find(query).exec((err, books) => res.json(books))
  })
  // on routes that end in /books/:book_id
  router.route('/books/:book_id')
  .get((req, res) => {
    Book.findById(req.params.Book_id, (err, Book) => {
      if (err) res.send(err)
      res.json(Book)
    })
  })
  .put((req, res) => {
    Book.findById(req.params.Book_id, (err, Book) => {
      Book.name = req.body.name
      Book.save(() => res.json({ message: 'Book updated!' }))
    })
  })
  .delete((req, res) => {
    Book.remove({ _id: req.params.book_id}, (err, book) => res.json({ message: 'Successfully deleted' })
  })
}

module.exports = router;
