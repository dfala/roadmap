angular.module('Roadmap')

.controller('ProjectController', ['$scope', 'apiService', '$timeout', '$rootScope',
function ($scope, apiService, $timeout, $rootScope) {

  $scope.init = function (lists, project) {
    $scope.lists = lists;
    $scope.colors = ['blue', 'orange', 'purple', 'green', 'blue', 'orange', 'purple', 'green', 'blue', 'orange', 'purple', 'green'];
    $scope.project = project;
    if (localStorage.auth) $scope.auth = true;
  };

  $scope.authenticate = function (passport) {
    if (passport == 'password') {
      $scope.auth = true;
      localStorage.auth = true;
      alertify.success('Welcome!');
    } else {
      alertify.error('HAHAHA! You got it wrong!');
    }
  };

  $scope.logOut = function () {
    delete localStorage.auth;
    window.location.reload();
  };

  $scope.renameProject = function () {
    alertify.prompt("Rename your project:", function (val, ev) {
      apiService.renameProject($scope.project._id, val)
      .then(function (result) {
        $scope.project.name = val;
      })
      .catch(function (err) {
        console.error(err);
        alertify.error('There was a problem with your request...')
      })
    })
  };

  $scope.createTask = function (task, listId, listIndex) {
    var taskPriority = $scope.lists[listIndex].tasks.length;

    apiService.createTask(task, listId, taskPriority)
    .then(function (response) {
      $scope.newTask = '';
      $scope.lists[listIndex].tasks.push(response.data);
      $scope.editMode = true;
    })
    .catch(function (err) {
      console.error(err)
    });
  };


  $scope.createList = function (list) {
    apiService.createList(list, $scope.project._id)
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
    if (task.date) task.start = new Date(task.start);
    if (task.end) task.end = new Date(task.end);
    $scope.active = task;
  };

  $scope.closeModal = function () {
    $scope.modalOpen = false;
    $scope.editMode = false;
  };

  $scope.toggleEditMode = function () {
    $scope.editMode = !$scope.editMode;
  };

  $scope.updateActive = function (task) {
    $scope.editMode = false;

    apiService.updateActive(task)
    .then(function (response) {
      $scope.lists = $scope.lists.map(function (list) {
        list.tasks = list.tasks.map(function (item) {
          if (item._id === task._id) return response.data;
          return item;
        })
        return list;
      })
      $rootScope.$emit('task updated', $scope.lists);
      alertify.success('Successfully updated your task');
    })
    .catch(function (err) {
      console.error(err);
      alertify.error('Ooops! There was an error.');
    });
  };

  $scope.deleteTask = function (task) {
    alertify.confirm("Are you sure you want to delete this task?", function () {
      apiService.deleteTask(task._id)
      .then(function (response) {
        alertify.log('Task successfully removed');
        $scope.lists = $scope.lists.map(function (list) {
          list.tasks = list.tasks.filter(function (item) {
            if (item._id === task._id) return false;
            return true;
          })
          return list;
        })
        $rootScope.$emit('task updated', $scope.lists);
        $scope.closeModal();
      })
      .catch(function (err) {
        console.error(err);
        alertify.error('There was a problem with your request.');
      })
    });
  };

  $rootScope.$on('timeline task clicked', function(e, task) {
    $scope.activateTask(task);
    $scope.$digest();
  });

  $rootScope.$on('close modal', function (e, task) {
    $scope.closeModal();
    $scope.$digest();
  })

}]);
