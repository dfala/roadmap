angular.module('Roadmap')

.directive('sortable-tasks', ['$timeout', 'apiService', function ($timeout, apiService) {
  return {
    restrict: 'A',
    // scope: {},
    link: function (scope, elem, attrs) {
      console.log('hello');

      $timeout(function () {
        console.log('hello');
      }, 1000);

      $.getScript("/scripts/jquery-ui.min.js", function(){
        $('#tasks').sortable({
          tolerance: 'touch',
          stop: function (e) {
            var tasks = $('.sortable');
            tasks = Array.prototype.slice.call(tasks);

            var ids = tasks.map(function (idea) {
              return idea.id.substring(5);
            })

            reorderTasks(ids);
            $('.sortable').removeClass('grabbing');
          }
        });
      });

      function reorderTasks (ids) {
        apiService.reorderTasks(ids)
        .then(function (response) {
          // console.warn(response.data);
        })
        .catch(function (err) {
          console.error(err);
          alertify.error('There was an error re-ordering your tasks...')
        })
      }

    }
  }
}]);
