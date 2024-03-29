// Controllers
var TaskController    =   require('./TaskController'),
    ListController    =   require('./ListController'),
    ProjectController =   require('./ProjectController');

module.exports = function (app) {
  app.post('/api/task', TaskController.create);
  app.put('/api/task/:taskId', TaskController.update);
  app.delete('/api/task/:taskId', TaskController.delete);
  app.put('/api/tasks/reorder-in-list', TaskController.reorderTasksInList);
  app.put('/api/tasks/reorder', TaskController.reorderTasks);
  app.post('/api/list', ListController.create);
  app.delete('/api/list/:listId', ListController.delete);
  app.post('/api/project', ProjectController.create);
  app.put('/api/project/rename/:projectId', ProjectController.rename);
}
