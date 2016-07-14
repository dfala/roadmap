// Controllers
var TaskController    =   require('./TaskController');

module.exports = function (app, passport) {
  app.post('/api/task', TaskController.createTask);
}
