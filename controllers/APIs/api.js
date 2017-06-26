/**
 * GET /
 * Api page.
 */
exports.index = (req, res) => {
  res.status(200).json({
    err:false,
    data:"API Service Working fine!"
  });
};

const itemController = require('./item');

exports.getItems = itemController.getItems;
exports.getItem = itemController.getItem;
exports.postItem = itemController.postItem;
exports.putItem = itemController.putItem;
exports.deleteItem = itemController.deleteItem;
