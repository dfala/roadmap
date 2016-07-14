var Routes = {},
    List     = require('../models/ListModel.js'),
    Task     = require('../models/TaskModel.js'),
    User     = require('../models/UserModel.js'),
    Timeline = require('../models/TimelineModel.js');

module.exports = function (app) {
  app.get('/', Routes.index);
};

Routes.index = function (req, res) {
  res.render('index');
};
