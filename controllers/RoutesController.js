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
  const PROJECTID = req.params.projectId;

  Promise.all([getLists(), getProject()])
  .then(results => {
    res.render('project', {
      lists: results[0],
      project: results[1],
    });
  })
  .catch(err => {
    console.log('ERROR on Routes.project: ', err);
    return res.render('project', {
      lists: [],
      project: [],
    });
  });

  function getLists () {
    return List.find({project: PROJECTID}).populate('tasks').exec();
  };

  function getProject() {
    return Project.findById(PROJECTID);
  };
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
