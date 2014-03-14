define(function () {
  return [
    '$scope',
    'registrationDialog',
    function (
        $scope,
        registrationDialog
        ) {
      $scope.changeName = function () {
        registrationDialog.show();
      };
    }
  ];
});
