angular.module('Roadmap')

.directive('sortable', ['apiService', function (apiService) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      $.getScript("/scripts/jquery-ui.min.js", function(){
        $(elem).sortable({
          tolerance: 'touch',
          placeholder: "placeholder",
          start: function (e, ui) {
            var elemHeight = $(ui.item[0]).outerHeight();
            ui.placeholder.css("height", elemHeight);
            ui.item.addClass('selected');
          },
          stop: function (e, ui) {
            ui.item.removeClass('selected');
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
        apiService.reorderTasks(ids, scope.list._id)
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
