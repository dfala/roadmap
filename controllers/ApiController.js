// Controllers
var TaskController    =   require('./TaskController'),
    ListController    =   require('./ListController'),
    ProjectController =   require('./ProjectController');

module.exports = function (app) {
  app.post('/api/task', TaskController.create);
  app.put('/api/task/:taskId', TaskController.update);
  app.delete('/api/task/:taskId', TaskController.delete);
  app.put('/api/tasks/reorder', TaskController.reorderTasks);
  app.post('/api/list', ListController.create);
  app.post('/api/project', ProjectController.create);
}
