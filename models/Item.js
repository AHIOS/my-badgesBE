var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: { type: String,
    required: true },
  description: { type: String,
    required: true },
  homepage: { type: String,
    required: true },
  shortname: { type: String,
    unique: true,
    validate: [/[a-zA-Z0-9]/, 'shortname should only have letters and numbers'] },
  image: { type: String,
    unique: true,
    required: true },
  categories: [{ type: String,
    enum: ['platform','framework', 'CSS framework', 'CSS preprocessor', 'JS framework', "template engine", "build tool"] }],
  professions: [{ type: String,
    enum: ['front-end developer','back-end developer', 'mobile developer', 'graphic designer'] }],
  modified: { type: Date,
    default: Date.now }
});


const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
