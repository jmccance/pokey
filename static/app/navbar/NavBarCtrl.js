define(function () {
  'use strict';

  return function ($scope, registrationDialog) {
    $scope.changeName = function () {
      registrationDialog.show();
    };
  };
});
