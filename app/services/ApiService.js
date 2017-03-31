angular.module('Roadmap')

.factory('apiService', ['$http', function ($http) {
  var service = {};

  service.createTask = function (task, listId) {
    var data = {
      list_id: listId,
      content: task
    };

    return $http.post('/api/task', data)
  };

  service.createList = function (list) {
    return $http.post('/api/list', {title: list})
  };

  service.updateActive = function (task) {
    return $http.put('/api/task/' + task._id, task);
  };

  service.deleteTask = function (taskId) {
    return $http.delete('/api/task/' + taskId);
  }

  return service;
}]);
