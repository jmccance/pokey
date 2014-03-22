define([
  'angular',
  'socketio',

  'errors/ErrorCtrl',
  'dialogs/RegistrationDialog',
  'lobby/LobbyCtrl',
  'navbar/NavBarCtrl',
  'room/RoomCtrl',

  'services/PokeyService',

  // Mix-ins
  'angularBootstrap',
  'angularCookies',
  'angularRoute'
], function (
    angular,
    socketio,
    ErrorCtrl,
    ErrorAlert,
    RegistrationDialog,
    LobbyCtrl,
    NavBarCtrl,
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

      .controller('ErrorCtrl', [
        '$scope',
        'pokeyService',
        ErrorCtrl
      ])
      .controller('LobbyCtrl', LobbyCtrl)
      .controller('RoomCtrl', RoomCtrl)
      .controller('NavBarCtrl', NavBarCtrl)

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
