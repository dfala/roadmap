// Controllers
var TaskController    =   require('./TaskController'),
    ListController    =   require('./ListController');

module.exports = function (app, passport) {
  app.post('/api/task', TaskController.create);
  app.post('/api/list', ListController.create);
}
