define([], function () {
  'use strict';

  return [
    '$location',
    '$scope',
    'sessionId',
    'socket',
    function (
        $location,
        $scope,
        sessionId,
        socket
        ) {
      $scope.username = '';

      // Handle user registration
      $scope.register = function () {
        socket.emit('register', {
          sessionId: sessionId,
          name: $scope.username
        });
      };

      socket.on('registered', function (resp) {
        $scope.$apply(function () {
          $scope.username = resp.name;
        });
      });

      // Handle room creation
      $scope.createRoom = function () {
        socket.emit('createRoom');
      }

      socket.on('roomCreated', function (room) {
        console.log(room)
      });
    }
  ];
});
