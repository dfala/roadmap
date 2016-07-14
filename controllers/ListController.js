var listCtrl = module.exports = {},
    List       = require('../models/ListModel');

listCtrl.create = function (req, res) {
  var newList = new List(req.body);
  newList.save(function (err, result) {
    if (err) return res.status(500).send(err);
    res.json(result);
  })
};
