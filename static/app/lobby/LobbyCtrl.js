define([], function () {
  'use strict';

  return [
      '$scope',
      '$location',
      function ($scope, $location) {
        $scope.room = '';
        $scope.name = '';

        $scope.joinRoom = function () {
          $location.path("/room/" + $scope.room);
        };
      }
  ];
});