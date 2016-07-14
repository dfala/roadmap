var taskCtrl   = module.exports = {},
    Task       = require('../models/TaskModel'),
    List       = require('../models/ListModel');

taskCtrl.create = function (req, res) {
  var newTask = new Task(req.body);
  newTask.save(function (err, result) {
    if (err) return res.status(500).send(err);

    List.findByIdAndUpdate(
      req.body.list_id,
      {$push: {"tasks": result._id}},
      {safe: true, upsert: true, new : true},
      function(err, model) {
        if (err) return res.status(500).send(err);
        return res.json(result);
      }
    );
  })
};
