angular.module('Roadmap')

.directive('timeline', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    scope: {
      lists: '='
    },
    link: function (scope, elem, attrs) {
      var colors = ['blue', 'orange', 'purple'];
      var tasks = [];
      scope.lists.forEach(function (list, listIndex) {
        // if (listIndex === 1) return;
        // if (listIndex !== 0) return;
        list.tasks.forEach(function (task) {
          if (task.start) {
            task.className = colors[listIndex];
            task.nestedGroup = list._id;
            return tasks.push(task);
          }
        })
      });

      var container = document.getElementById('visualization');

      // Create a DataSet (allows two way data-binding)
      var items = new vis.DataSet(tasks);

      // Configuration for the Timeline
      var options = {
        max: new Date(2017,11,31),
        min: new Date(2017,0,1),
        zoomMax: 31556952000,
        zoomMin: 1209600000
      };

      // Create a Timeline
      var timeline = new vis.Timeline(container, items, options);
      timeline.on('click', function (data) {
        var itemId = data.item;
        if (!itemId) return;

        $rootScope.$emit('timeline task clicked', timeline.itemsData._data[itemId]);
      });

      $rootScope.$on('task updated', function (e, data) {
        tasks = tasks.map(function (task) {
          if (task._id === data._id) return data;
          return task;
        }).filter(function (task) {
          if (task.start) return true;
          return false;
        });

        items = new vis.DataSet(tasks);

        timeline.destroy();
        timeline = new vis.Timeline(container, items, options);
      })
    }
  }
}]);
