define([
  // External dependencies
  'angular',
  'socketio',

  // Internal dependencies
  'api/PokeyService',
  'registrationDialog/RegistrationDialog',
  'lobby/LobbyCtrl',
  'room/RoomCtrl',

  // Mix-ins
  'angularBootstrap',
  'angularCookies',
  'angularRoute',
  'alerts/Alerts',
  'navbar/NavBar'
], function (
    angular,
    socketio,
    PokeyService,
    RegistrationDialog,
    LobbyCtrl,
    RoomCtrl
    ) {
  'use strict';

  var pokeyApp = angular.module('pokeyApp', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'pokey.alerts.Alerts',
    'pokey.navbar.NavBar'
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

      .controller('LobbyCtrl', [
        '$location',
        '$scope',
        'pokeyService',
        'registrationDialog',
        LobbyCtrl
      ])

      .controller('RoomCtrl', [
        '$routeParams',
        '$scope',
        'pokeyService',
        'registrationDialog',
        RoomCtrl
      ])

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
