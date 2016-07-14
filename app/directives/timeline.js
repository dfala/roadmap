angular.module('Roadmap')

.directive('timeline', [function () {
  return {
    restrict: 'A',
    scope: {
      lists: '='
    },
    link: function (scope, elem, attrs) {
      var tasks = [];
      scope.lists.forEach(function (list) {
        list.tasks.forEach(function (task) {
          if (task.start) return tasks.push(task);
        })
      });

      console.log(tasks);

      var container = document.getElementById('visualization');

      // Create a DataSet (allows two way data-binding)
      var items = new vis.DataSet(tasks);

      // Configuration for the Timeline
      var options = {};

      // Create a Timeline
      var timeline = new vis.Timeline(container, items, options);
    }
  }
}]);
