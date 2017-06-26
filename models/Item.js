var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  homepage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
