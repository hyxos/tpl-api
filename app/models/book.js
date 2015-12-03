var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var BookSchema = new Schema({
  name: String
})

module.exports = mongoose.model('Book', BookSchema);
