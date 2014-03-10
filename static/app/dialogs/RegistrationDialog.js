define(function () {
  var RegistrationCtrl = function($scope, $modalInstance, pokeyService) {
    $scope.username = '';

    $scope.register = function () {
      console.log($scope);

      // TODO Figure out why $scope.username isn't updating correctly.
      pokeyService.register($scope.username);
      $modalInstance.close();
    };
  };

  var RegistrationDialog = function($modal, pokeyService) {
    this.$modal = $modal;
    this.pokeyService = pokeyService;
  };

  RegistrationDialog.prototype.show = function(fn) {
    fn || (fn = function () {});

    var self = this;
    this.$modal
        .open({
          templateUrl: 'views/registrationDialog.html',
          controller: RegistrationCtrl,
          resolve: {
            pokeyService: function () { return self.pokeyService; }
          }
        })
        .result.then(function () {
          fn();
        });
  };

  return RegistrationDialog;
});
