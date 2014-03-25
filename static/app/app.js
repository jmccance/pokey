define([
  // External dependencies
  'angular',
  'socketio',

  // Internal dependencies
  'alerts/AlertCtrl',
  'alerts/AlertService',
  'api/PokeyService',
  'registrationDialog/RegistrationDialog',
  'lobby/LobbyCtrl',
  'room/RoomCtrl',

  // Mix-ins
  'angularBootstrap',
  'angularCookies',
  'angularRoute',
  'navbar/NavBar'
], function (
    angular,
    socketio,
    AlertCtrl,
    AlertService,
    PokeyService,
    RegistrationDialog,
    LobbyCtrl,
    NavBarCtrl,
    RoomCtrl
    ) {
  'use strict';

  var pokeyApp = angular.module('pokeyApp', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
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

      .controller('AlertCtrl', [
        '$scope',
        'alertService',
        'socket',
        AlertCtrl
      ])

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

      .service('alertService', [
        '$rootScope',
        'pokeyService',
        AlertService
      ])

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
