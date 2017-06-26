exports.getItems = (req, res) => {
  res.status(200).json({
    err:false,
    data:"API Service Working fine!",
    items:[]
  });
};

exports.getItem = (req, res) => {
  res.status(200).json({
    err:false,
    data:"fake get single item"
  });
};

exports.postItem = (req, res) => {
  res.status(200).json({
    err:false,
    data:"fake post item"
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
