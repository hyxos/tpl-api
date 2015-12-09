var express = require('express'),
  router = express.Router(),
  Book = require ('../../db/config')

router.get('/', (req, res) => res.send('in api'))

router.get('/books', (req,res) => {
  .get((req, res) => {
    var query = {}
    // TODO: QUERYING e.g: books?branch=North+York+Central+Library
    if (req.query.branch) query.branch = req.query.branch
    if (req.query.title) query.title = req.query.title
    Book.find(query).exec((err, books) => res.json(books))
  })
}

module.exports = router;
