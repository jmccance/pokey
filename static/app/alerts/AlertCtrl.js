define(function () {
  var AlertCtrl = function ($scope, pokeyService) {
    $scope.alerts = [];

    // Clear alerts on location change.
    $scope.$on('$locationChangeSuccess', function () {
      $scope.alerts = [];
    });

    $scope.closeAlert = function (index) {
      $scope.alerts.splice(index, 1);
    };

    // Display an alert when an error event is fired.
    pokeyService.on('error', function (message) {
      console.log('error', message);
      $scope.$apply(function () {
        $scope.alerts.push({
          type: 'danger',
          message: message
        });
      });
    });
  };

  return AlertCtrl;
});
