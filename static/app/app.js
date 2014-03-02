define([
  'angular',
  'lobby/LobbyCtrl',
  'room/RoomCtrl',

  // Mix-ins
  'angularRoute'
], function (angular, LobbyCtrl, RoomCtrl) {

  'use strict';

  var pokeyApp = angular.module('pokeyApp', ['ngRoute']);

  pokeyApp
      .config(['$routeProvider',
        function ($routeProvider) {
          $routeProvider.
              when('/', {
                templateUrl: 'views/lobby.html',
                controller: 'LobbyCtrl'
              }).
              when('/room/:roomName', {
                templateUrl: 'views/room.html',
                controller: 'RoomCtrl'
              });
        }])

      .controller('LobbyCtrl', LobbyCtrl)
      .controller('RoomCtrl', RoomCtrl);

  return pokeyApp;
});
