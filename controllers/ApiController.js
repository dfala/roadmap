// Controllers
var TaskController    =   require('./TaskController'),
    ListController    =   require('./ListController');

module.exports = function (app, passport) {
  app.post('/api/task', TaskController.create);
  app.put('/api/task/:taskId', TaskController.update);
  app.post('/api/list', ListController.create);
}
