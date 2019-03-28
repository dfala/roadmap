angular.module('Roadmap')

.controller('DashboardController', ['$scope', 'apiService', '$timeout', '$rootScope',
function ($scope, apiService, $timeout, $rootScope) {

  $scope.init = function (projects) {
    $scope.projects = projects;
  };

  $scope.createNewProject = function () {
    apiService.createNewProject()
    .then(function (response) {
      console.log(response.data);
      window.location.href = "/project/" + response.data._id;
    })
    .catch(function (err) {
      console.error(err);
      alertify.error('There was a problem with your request...')
    })
  };

}]);
