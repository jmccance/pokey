define([
  'underscore'
], function (_) {
 var ErrorCtrl = function ($scope, pokeyService) {
   $scope.errors = [];
   pokeyService.on('error', function (message) {
    console.log('error', message);
    $scope.$apply(function () {
       $scope.errors.push({message: message});
    });
   });
 };

 return ErrorCtrl;
});