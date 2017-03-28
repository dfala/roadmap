angular.module('Roadmap')

.controller('MainController', ['$scope', 'apiService', '$timeout', '$rootScope',
function ($scope, apiService, $timeout, $rootScope) {

  $scope.init = function (lists) {
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

  $scope.activateTask = function (task) {
    $scope.modalOpen = true;
    task.start = new Date(task.start);
    task.end = new Date(task.end);
    $scope.active = task;
  };

  $scope.closeModal = function () {
    $scope.modalOpen = false;
  };

  $scope.toggleEditMode = function () {
    $scope.editMode = !$scope.editMode;
  };

  $scope.updateActive = function (task) {
    $scope.editMode = false;

    apiService.updateActive(task)
    .then(function (response) {
      $rootScope.$emit('task updated', response.data)
      alertify.success('Successfully updated your story.');
    })
    .catch(function (err) {
      console.error(err);
      alertify.error('Ooops! There was an error.');
    });
  };

}]);
