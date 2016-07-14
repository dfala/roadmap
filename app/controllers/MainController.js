angular.module('Roadmap')

.controller('MainController', ['$scope', 'apiService', '$timeout', function ($scope, apiService, $timeout) {

  $scope.init = function (lists) {
    console.warn(lists);
    $scope.lists = lists;
  };

  $scope.createTask = function (task, listId, listIndex) {
    apiService.createTask(task, listId)
    .then(function (response) {
      $scope.newTask = '';
      $scope.lists[listIndex].tasks.push(response.data);
    })
    .catch(function (err) {
      console.error(err)
    });
  };


  $scope.createList = function (list) {
    apiService.createList(list)
    .then(function (response) {
      $scope.lists.push(response.data);
    })
    .catch(function (err) {
      console.error(err)
    });
  };

  $scope.enableNewList = function () {
    $scope.newListEnabled = true;
    $timeout(function () {
      $('#new-list').focus();
    })
  };

}]);
