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

.directive('lineBreak', ['$timeout', '$rootScope', function ($timeout, $rootScope) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      $timeout(function () {
        $(this).keydown( function(e) {
          if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
          }

          // scope.active.content = scope.active.content.replace( /\r?\n/gi, '' )
          // scope.$digest();
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
        scope.newTaskEnabled = true;
        $timeout(function () {
          $(elem).find('input')[0].focus();
        }, 0);
      };
    }
  }
}]);
