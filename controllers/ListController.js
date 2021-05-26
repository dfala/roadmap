var Exports         = module.exports = {},
    TaskController  = require('./TaskController'),
    List            = require('../models/ListModel'),
    Task            = require('../models/TaskModel');

Exports.create = function (req, res) {
  var newList = new List(req.body);
  newList.save(function (err, result) {
    if (err) return res.status(500).send(err);
    res.json(result);
  })
};

Exports.delete = function (req, res) {
  let listId = req.params.listId;

  Task.find({
    list_id: listId
  })
  .then(results => {
    return Promise.all(results.map(task => {
      return TaskController.executeDeleteTask(task._id)
    }))
  })
  .then(deletedResults => {
    return List.find({ "_id": listId }).remove();
  })
  .then(deletedListResults => {
    return res.json(deletedListResults)
  })
  .catch(err => res.status(500).send(err))
};
