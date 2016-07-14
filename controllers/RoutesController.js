var Routes = {},
    List     = require('../models/ListModel.js'),
    Task     = require('../models/TaskModel.js'),
    User     = require('../models/UserModel.js'),
    Timeline = require('../models/TimelineModel.js');

module.exports = function (app) {
  app.get('/', Routes.index);
};

Routes.index = function (req, res) {
  List.find({})
  .populate('tasks')
  .exec(function (err, result) {
    if (err) return res.status(500).send(err);
    res.render('index', {lists: result});
  });
};
