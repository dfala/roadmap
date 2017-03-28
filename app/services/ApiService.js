angular.module('Roadmap')

.factory('apiService', ['$http', function ($http) {
  var service = {};

  service.createTask = function (task, listId) {
    var data = {
      list_id: listId,
      title: task
    };

    return $http.post('/api/task', data)
  };

  service.createList = function (list) {
    return $http.post('/api/list', {title: list})
  };

  service.updateActive = function (task) {
    return $http.put('/api/task/' + task._id, task);
  };

  return service;
}]);
