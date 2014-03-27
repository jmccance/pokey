define([
  // External dependencies
  'angular',
  'socketio',

  // Internal dependencies
  'api/PokeyService',
  'registrationDialog/RegistrationDialog',
  'room/RoomCtrl',

  // Mix-ins
  'angularBootstrap',
  'angularCookies',
  'angularRoute',
  'alerts/Alerts',
  'lobby/Lobby',
  'navbar/NavBar'
], function (
    angular,
    socketio,
    PokeyService,
    RegistrationDialog,
    RoomCtrl
    ) {
  'use strict';

  var pokeyApp = angular.module('pokeyApp', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'pokey.alerts.Alerts',
    'pokey.lobby.Lobby',
    'pokey.navbar.NavBar'
  ]);

  pokeyApp
      .config(['$routeProvider',
        function ($routeProvider) {
          $routeProvider.
              when('/room/:roomId', {
                templateUrl: 'app/room/room.html',
                controller: 'RoomCtrl'
              });
        }])

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
