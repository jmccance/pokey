define([
  'angular',
  'socketio',

  'dialogs/RegistrationDialog',
  'lobby/LobbyCtrl',
  'room/RoomCtrl',
  'services/PokeyService',

  // Mix-ins
  'angularBootstrap',
  'angularCookies',
  'angularRoute'
], function (
    angular,
    socketio,
    RegistrationDialog,
    LobbyCtrl,
    RoomCtrl,
    PokeyService
    ) {
  'use strict';

  var pokeyApp = angular.module('pokeyApp', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap'
  ]);

  pokeyApp
      .config(['$routeProvider',
        function ($routeProvider) {
          $routeProvider.
              when('/', {
                templateUrl: 'app/lobby/lobby.html',
                controller: 'LobbyCtrl'
              }).
              when('/room/:roomId', {
                templateUrl: 'app/room/room.html',
                controller: 'RoomCtrl'
              });
        }])

      .controller('LobbyCtrl', LobbyCtrl)
      .controller('RoomCtrl', RoomCtrl)

      .factory('sessionId', [
          '$cookies',
          function($cookies) {
            return $cookies['pokey.session'];
          }
      ])

      .factory('socket', function() {
        return socketio.connect();
      })

      .service('pokeyService', [
        '$cookies',
        'sessionId',
        'socket',
        PokeyService
      ])

      .service('registrationDialog', [
        '$modal',
        'pokeyService',
        RegistrationDialog
      ]);

  return pokeyApp;
});
