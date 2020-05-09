var Exports    = module.exports = {},
    Task       = require('../models/TaskModel'),
    List       = require('../models/ListModel');

Exports.create = function (req, res) {
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


Exports.update = function (req, res) {
  Task.findById(req.params.taskId, function (err, task) {
    if (err) return res.status(404).send(err);

    task.content      = req.body.content;
    task.description  = req.body.description;
    task.links        = req.body.links;

    if (new Date(req.body.start) > new Date(1990,00,01)) task.start = req.body.start;
    if (new Date(req.body.end) > new Date(1990,00,01)) task.end = req.body.end;

    task.save(function (err, result) {
      if (err) return res.status(500).send(err);
      return res.json(result);
    })
  })
};

Exports.delete = function (req, res) {
  Task.find({ "_id": req.params.taskId }).remove( function (err, result) {
    if (err) return res.status(400).send(err);
    return res.json(result);
  });
};

Exports.reorderTasks = function (req, res) {
  // for each item in array
    // update tasks in list
    // update task
      // update list_id
      // update task prority

  Promise.all(req.body.data.map(function (list) {
    return Promise.all([updateTasksInList(list), udpateTasks(list)])
  }))
  .then(result => res.json(result))
  .catch(err => {
    console.log('Error on reorderTasks: ', err);
    return res.status(500).send(err)
  });

  function updateTasksInList (list) {
    return List.update({
      _id: list.listId
    }, {
      $set: {
        tasks: list.taskIds
      }
    })
  };

  function udpateTasks (list) {
    return Promise.all(list.taskIds.map((taskId, index) => {
      return Task.update({
        _id: taskId
      }, {
        list_id: list.listId,
        priority: index
      })
    }))
  };
};

Exports.reorderTasksInList = function (req, res) {
  Promise.all(req.body.orderedIds.map(function (taskId, index) {
    return Task.update({
      _id: taskId
    }, {
      priority: index
    })
  }))
  .then(result => res.json(result))
  .catch(err => {
    console.log('Error on reorderTasks: ', err);
    return res.status(500).send(err);
  })
};
