define(function () {
  var RegistrationCtrl = function($scope, $modalInstance, pokeyService) {
    // Create a "sub-scope" of sorts since this is a "subcontroller". I don't pretend to understand
    // quite what's going on here.
    // See: http://stackoverflow.com/questions/18716113/scope-issue-in-angularjs-using-angularui-bootstrap-modal
    $scope.dialog = {};

    $scope.register = function () {
      pokeyService.register($scope.dialog.username);
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
