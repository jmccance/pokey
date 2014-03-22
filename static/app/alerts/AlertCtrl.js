define(function () {
  'use strict';

  var AlertCtrl = function ($scope, alertService) {
    console.log('alertService', alertService);
    $scope.alerts = alertService.getAlerts();

    // Clear alerts on location change.
    $scope.$on('$locationChangeSuccess', function () {
      $scope.alerts = [];
    });

    alertService.on('update', function () {
      $scope.$apply(function () {
        $scope.alerts = alertService.getAlerts();
      });
    });

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };
  };

  return AlertCtrl;
});
