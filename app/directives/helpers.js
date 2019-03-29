angular.module('Roadmap')

.directive('esc', ['$timeout', '$rootScope', function ($timeout, $rootScope) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      $timeout(function () {
        $(document).keyup(function(e) {
          if (e.keyCode === 27) {
            $rootScope.$broadcast('close modal');
          }
        });
      }, 0);
    }
  }
}])

.directive('toggle', ['$timeout', '$rootScope', function ($timeout, $rootScope) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      scope.toggleShowNewTask = function () {
        scope.newListEnabled = true;
        $timeout(function () {
          $(elem).find('input')[0].focus();
        }, 0);
      };
    }
  }
}]);
