var Exports    = module.exports = {},
    Project    = require('../models/ProjectModel'),
    Task       = require('../models/TaskModel'),
    List       = require('../models/ListModel');


Exports.create = function (req, res) {
  var newProject = new Project(req.body);
  newProject.save(function (err, result) {
    if (err) return res.status(500).send(err);
    return res.json(result);
  })
};


Exports.rename = function (req, res) {
  Project.findById(req.params.projectId, function (err, project) {
    if (err) return res.status(404).send(err);
    project.name = req.body.name;

    project.save(function (err, result) {
      if (err) return res.status(500).send(err);
      return res.json(result);
    })
  })
};


Exports.delete = function (req, res) {
  // remove lists
  // remove tasks
  // remove project

  // Project.find({ "_id": req.params.projectId }).remove( function (err, result) {
  //   if (err) return res.status(400).send(err);
  //   return res.json(result);
  // });
};
