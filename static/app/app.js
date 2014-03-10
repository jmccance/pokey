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

      .factory('pokeyService', [
        '$cookies',
        'socket',
        function(
            $cookies,
            socket
            ) {
          return new PokeyService(socket, $cookies['pokey.session']);
        }])

      .factory('registrationDialog', [
        '$modal',
        'pokeyService',
        function(
            $modal,
            pokeyService
            ) {
          return new RegistrationDialog($modal, pokeyService);
        }]);

  return pokeyApp;
});
