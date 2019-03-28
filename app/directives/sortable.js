angular.module('Roadmap')

.directive('sortable', ['apiService', function (apiService) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      $.getScript("/scripts/jquery-ui.min.js", function(){
        $('.connectedSortable').sortable({
          tolerance: 'touch',
          placeholder: "placeholder",
          connectWith: ".connectedSortable",
          start: function (e, ui) {
            var elemHeight = $(ui.item[0]).outerHeight();
            ui.placeholder.css("height", elemHeight);
            ui.item.addClass('selected');
          },
          stop: function (e, ui) {
            ui.item.removeClass('selected');
            // var tasks = $('.sortable');
            // tasks = Array.prototype.slice.call(tasks);
            //
            // var ids = tasks.map(function (task) {
            //   return task.id.substring(5);
            // })
            //
            // reorderTasks(ids);
            $('.sortable').removeClass('grabbing');
          },
          receive: function (e, ui) {

            var taskGroups = $(".task-group");
            taskGroups = Array.prototype.slice.call(taskGroups);


            var data = taskGroups.map(function (taskGroup) {
              var listId = taskGroup.id.substring(5);
              var items = $(taskGroup).find('.sortable');
              items = Array.prototype.slice.call(items);

              var taskIds = items.map(function (item) {
                return item.id.substring(5);
              });

              return {
                listId: listId,
                taskIds: taskIds,
              };
            })

            reorderTasks(data);
          },
        });
      });

      function reorderTasks (data) {
        console.log(data);
        apiService.reorderTasks(data)
        .then(function (response) {
          console.warn(response.data);
        })
        .catch(function (err) {
          console.error(err);
          alertify.error('There was an error re-ordering your tasks...')
        })
      }
    }
  }
}]);
