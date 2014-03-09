define([], function () {
  'use strict';

  return [
    '$location',
    '$scope',
    'pokeyService',
    function (
        $location,
        $scope,
        pokeyService
        ) {
      $scope.username = '';

      // Handle user registration
      $scope.register = function () {
        pokeyService.register($scope.username);
      };

      // Handle room creation
      $scope.createRoom = function () {
        pokeyService.createRoom();
      };
    }
  ];
});
