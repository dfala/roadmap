angular.module('Roadmap')

.directive('timeline', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    scope: {
      lists: '='
    },
    link: function (scope, elem, attrs) {

      // init
      var timeline;
      createTimeline(scope.lists);

      // if timeline nees update
      $rootScope.$on('task updated', function (e, lists) {
        timeline.destroy(lists);
        createTimeline(lists);
      });

      // paint timeline
      function createTimeline (lists) {
        var colors = ['blue', 'orange', 'purple', 'green', 'blue', 'orange', 'purple', 'green', 'blue', 'orange', 'purple', 'green', 'blue', 'orange', 'purple', 'green'];
        var groups = lists.map(function (list) {
          return {
            id: list._id,
            content: list.title
          }
        });

        var tasks = [];
        lists.forEach(function (list, listIndex) {
          // if (listIndex === 1) return;
          // if (listIndex !== 0) return;
          list.tasks.forEach(function (task) {
            if (task.start) {
              task.className = colors[listIndex];
              task.id = task._id;
              task.title = task.content;
              task.group = list._id;
              // task.editable.updateTime = true;
              return tasks.push(task);
            }
          })
        });

        var container = document.getElementById('visualization');

        // Create a DataSet (allows two way data-binding)
        var items = new vis.DataSet(tasks);

        // This crap doesn't work
        var oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        var oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearFromNow.getFullYear() - 1);

        var endOfYear = new Date(new Date().getFullYear(), 11, 31);

        // Configuration for the Timeline
        var options = {
          max: (oneYearFromNow >= endOfYear) ? oneYearFromNow : endOfYear,
          min: oneYearAgo,
          zoomMax: 31556952000,
          zoomMin: 1209600000
        };

        // Create a Timeline
        timeline = new vis.Timeline(container, items, groups, options);
        timeline.on('click', function (data) {
          var itemId = data.item;
          if (!itemId) return;

          $rootScope.$emit('timeline task clicked', timeline.itemsData._data[itemId]);
        });
      };
    }
  }
}]);
