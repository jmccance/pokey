define(function () {
  var ErrorCtrl = function ($scope, pokeyService) {
    $scope.errors = [];

    // Clear errors on location change.
    $scope.$on('$locationChangeSuccess', function () {
      $scope.errors = [];
    });

    $scope.closeAlert = function (index) {
      $scope.errors.splice(index, 1);
    };

    // Display an alert when an error event is fired.
    pokeyService.on('error', function (message) {
      console.log('error', message);
      $scope.$apply(function () {
        $scope.errors.push({
          type: 'danger',
          message: message
        });
      });
    });
  };

  return ErrorCtrl;
});
