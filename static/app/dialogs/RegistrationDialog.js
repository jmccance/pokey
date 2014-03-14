define(function () {
  var RegistrationCtrl = function($scope, $modalInstance, pokeyService) {
    // Create a "sub-scope" of sorts since this is a "subcontroller". I don't pretend to understand
    // quite what's going on here.
    // See: http://stackoverflow.com/questions/18716113/scope-issue-in-angularjs-using-angularui-bootstrap-modal
    $scope.dialog = {};
    var user = pokeyService.getUser();
    $scope.dialog.username = user ? user.name : '';

    $scope.register = function () {
      pokeyService.one('registered', function() {
        $modalInstance.close();
      });
      pokeyService.register($scope.dialog.username);
    };
  };

  var RegistrationDialog = function($modal, pokeyService) {
    this.$modal = $modal;
    this.pokeyService = pokeyService;
  };

  RegistrationDialog.prototype.show = function() {
    var self = this;
    this.$modal
        .open({
          templateUrl: 'app/dialogs/registrationDialog.html',
          controller: RegistrationCtrl,
          resolve: {
            pokeyService: function () { return self.pokeyService; }
          }
        });
  };

  return RegistrationDialog;
});
