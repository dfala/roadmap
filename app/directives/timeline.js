angular.module('Roadmap')

.directive('timeline', ['$rootScope', function ($rootScope) {
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

      var container = document.getElementById('visualization');

      // Create a DataSet (allows two way data-binding)
      var items = new vis.DataSet(tasks);

      // Configuration for the Timeline
      var options = {};

      // Create a Timeline
      var timeline = new vis.Timeline(container, items, options);

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
