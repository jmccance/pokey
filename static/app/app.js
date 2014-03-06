define([
  'angular',
  'socketio',

  'lobby/LobbyCtrl',
  'room/RoomCtrl',

  // Mix-ins
  'angularBootstrap',
  'angularCookies',
  'angularRoute'
], function (
    angular,
    socketio,
    LobbyCtrl,
    RoomCtrl
    ) {
  'use strict';

  var pokeyApp = angular.module('pokeyApp', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'ui.bootstrap.tpls'
  ]);

  pokeyApp
      .config(['$routeProvider',
        function ($routeProvider) {
          $routeProvider.
              when('/', {
                templateUrl: 'views/lobby.html',
                controller: 'LobbyCtrl'
              }).
              when('/room/:roomId', {
                templateUrl: 'views/room.html',
                controller: 'RoomCtrl'
              });
        }])

      .controller('LobbyCtrl', LobbyCtrl)
      .controller('RoomCtrl', RoomCtrl)

      .factory('socket', function() {
        return socketio.connect();
      })

      .factory('sessionId', function($cookies) {
        return $cookies['pokey.session'];
      });

  return pokeyApp;
});
