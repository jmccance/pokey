define([
  'underscore'
], function (_) {
 var ErrorCtrl = function ($scope, pokeyService) {
   $scope.errors = [];

   // Clear errors on location change.
   $scope.$on('$locationChangeSuccess', function () {
      $scope.errors = [];
   });

   // Display an alert when an error event is fired.
   pokeyService.on('error', function (message) {
    console.log('error', message);
    $scope.$apply(function () {
       $scope.errors.push({message: message});
    });
   });
 };

 return ErrorCtrl;
});