// Controllers
var TaskController    =   require('./TaskController'),
    ListController    =   require('./ListController');

module.exports = function (app) {
  app.post('/api/task', TaskController.create);
  app.put('/api/task/:taskId', TaskController.update);
  app.delete('/api/task/:taskId', TaskController.delete);
  app.post('/api/list', ListController.create);
}
