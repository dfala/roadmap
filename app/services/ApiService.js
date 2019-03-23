angular.module('Roadmap')

.factory('apiService', ['$http', function ($http) {
  var service = {};

  service.createTask = function (task, listId, taskPriority) {
    var data = {
      list_id: listId,
      content: task,
      priority: taskPriority
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
  };

  service.reorderTasks = function (ids, listId) {
    return $http.put('/api/tasks/reorder', {
      orderedIds: ids,
      listId: listId
    })
  };

  return service;
}]);
