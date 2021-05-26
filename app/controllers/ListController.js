angular.module('Roadmap')

.controller('ListController', ['$scope', 'apiService', '$timeout', '$rootScope',
function ($scope, apiService, $timeout, $rootScope) {

  $scope.toggleDisplayListOptions = function () {
    $scope.displayListOptions = !$scope.displayListOptions;
  };

  $scope.confirmDelete = function (list) {
    alertify.confirm("Are you sure you want to delete this list and all its tasks? This cannot be undone.", function () {
      apiService.deleteList(list._id)
      .then(function (response) {
        alertify.log('The list has been successfully deleted');
        $timeout(function () {
          window.location.reload();
        }, (1200));
      })
      .catch(function (err) {
        console.error(err);
        alertify.error('There was a problem with your request.');
      })
    });
  };

}]);
