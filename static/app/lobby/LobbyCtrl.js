define([], function () {
  'use strict';

  return [
    '$cookies',
    '$location',
    '$scope',
    'sessionId',
    'socket',
    function (
        $cookies,
        $location,
        $scope,
        sessionId,
        socket
        ) {
      $scope.room = '';
      $scope.name = '';

      $scope.joinRoom = function () {
        socket.emit('register', {
          sessionId: $cookies['pokey.session'],
          name: $scope.name
        });

        socket.on('roomUpdated')
        $location.path('/room/' + $scope.room);
      };
    }
  ];
});
