var controller = module.exports = {},
    Task       = require('../models/TaskModel');

controller.createTask = function (req, res) {
  var newTask = new Task(req.body);
  newTask.save(function (err, result) {
    if (err) return res.status(500).send(err);
    res.json(result);
  })
};
