angular.module('Roadmap')

.factory('apiService', ['$http', function ($http) {
  var service = {};

  service.createTask = function (task) {
    return $http.post('/api/task', {title: task})
  };

  return service;
}]);
