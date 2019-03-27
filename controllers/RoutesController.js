var Routes = {},
    List     = require('../models/ListModel.js'),
    Task     = require('../models/TaskModel.js'),
    User     = require('../models/UserModel.js'),
    Project  = require('../models/ProjectModel.js'),
    Timeline = require('../models/TimelineModel.js');

module.exports = function (app) {
  app.get('/', Routes.dashboard);
  app.get('/project/:projectId', Routes.project);
};

Routes.project = function (req, res) {
  List.find({project: req.params.projectId})
  .populate('tasks')
  .exec(function (err, result) {
    if (err) {
      console.log('ERROR: ', err);
      return res.render('project', {
        lists: result,
        projectId: req.params.projectId,
      });
    } else {
      res.render('project', {
        lists: result,
        projectId: req.params.projectId,
      });
    }
  });
};

Routes.dashboard = function (req, res) {
  Project.find({})
  .then(function (result) {
    return res.render('dashboard', {projects: result});
  })
  .catch(function (err) {
    console.log('ERROR: ', err);
    return res.render('dashboard', {projects: []});
  })
};
