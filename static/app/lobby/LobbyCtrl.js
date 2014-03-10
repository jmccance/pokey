define([], function () {
  'use strict';

  return [
    '$location',
    '$scope',
    'pokeyService',
    'registrationDialog',
    function (
        $location,
        $scope,
        pokeyService,
        registrationDialog
        ) {
      registrationDialog.show();

      // Handle room creation
      $scope.createRoom = function () {
        pokeyService.createRoom();
      };
    }
  ];
});
