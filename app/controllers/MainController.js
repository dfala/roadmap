angular.module('Roadmap')

.controller('MainController', ['$scope', 'apiService', function ($scope, apiService) {
  $scope.createTask = function (task) {
    apiService.createTask(task)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (err) {
      console.error(err)
    });
  };
}]);
