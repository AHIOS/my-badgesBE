const mongoose = require('mongoose');
var User = require("../../models/User");
var Item = require("../../models/Item");



exports.getItems = (req, res) => {
  Item.find(function (err, items) {
      if (err) return next(err);
      res.json(items);
    });
};

exports.getItem = (req, res) => {
  var query = req.params.shortname;
  Item.findOne({ 'shortname': query }, function (err, item) {
  if (err)
    return handleError(err);
  if (item) {
    console.log(item);
    res.status(200).json({
      err:false,
      item: item
    });
  }else{
    res.status(200).json({
      err:false,
      item: {}
    });
  }
  });
};

exports.postItem = (req, res) => {
  var newItem = new Item({
    name: req.body.name,
    homepage: req.body.homepage,
    description: req.body.description,
    shortname: req.body.shortname,
    image: req.body.image,
    categories: req.body.categories,
    professions: req.body.professions
  });

  newItem.save(function(err) {
    if (err) {
      return res.json({success: false, msg: 'Save item failed.', error: err.message});
    }
    res.json({success: true, msg: 'Successful created new item.', item: newItem});
  });
};

exports.putItem = (req, res) => {
  res.status(200).json({
    err:false,
    data:"fake put item"
  });
};

exports.deleteItem = (req, res) => {
  res.status(200).json({
    err:false,
    data:"fake delete item"
  });
};
