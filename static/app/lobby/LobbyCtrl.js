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
      // TODO Workflow
      // After a successful room creation, redirect to that room. (Arriving at the room will
      // handle joining it.)

      registrationDialog.show();

      // Handle room creation
      $scope.createRoom = function () {
        pokeyService.createRoom();
      };
    }
  ];
});
