define(function () {
  var RegistrationCtrl = function($scope, $modalInstance, pokeyService, callback) {
    $scope.username = '';

    $scope.register = function () {
      console.log($scope);
      pokeyService.register($scope.username);
      $modalInstance.close();
      callback();
    };
  };

  var RegistrationDialog = function($modal, pokeyService) {
    this.$modal = $modal;
    this.pokeyService = pokeyService;
  };

  RegistrationDialog.prototype.show = function(fn) {
    var self = this;
    this.$modal
        .open({
          templateUrl: 'views/registrationDialog.html',
          controller: RegistrationCtrl,
          resolve: {
            pokeyService: function () { return self.pokeyService; },
            callback: function() { return fn; }
          }
        });
  };

  return RegistrationDialog;
});
