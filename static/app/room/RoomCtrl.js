define([
  'underscore',

  // Mix-ins
  'services/EstimateHistogram'
], function (
    _,
    EstimateHistogram
    ) {
  'use strict';

  return [
    '$scope',
    '$routeParams',
    'pokeyService',
    'registrationDialog',
    function (
        $scope,
        $routeParams,
        pokeyService,
        registrationDialog
        ) {
      var roomId = $routeParams.roomId,
          histogram = new EstimateHistogram($('[data-node-name="chart"]'));;

      $scope.estimate = {};

      pokeyService.on('roomUpdated', function (room) {
        $scope.$apply(function () {
          $scope.room = room;
        });

        if (room.isRevealed) {
          histogram.update(room);
        } else {
          histogram.clear();
        }
      });

      if (!pokeyService.isRegistered()) {
        pokeyService.on('registered', function () {
          $scope.user = pokeyService.getUser();
          pokeyService.joinRoom(roomId);
        });

        if (pokeyService.isUsernameCached()) {
          pokeyService.register();
        } else {
          registrationDialog.show();
        }
      } else {
        pokeyService.joinRoom(roomId);
      }

      /**
       * Submit the current estimate.
       */
      $scope.submitEstimate = function () {
        pokeyService.submitEstimate($scope.estimate);
      };

      /**
       * Reveals the estimates and renders the chart.
       */
      $scope.revealEstimates = function () {
        pokeyService.showEstimates();
      };

      /**
       * Clear existing estimates. Must be the room owner in order to do so.
       */
      $scope.clearEstimates = function () {
        pokeyService.clearEstimates();
      };

      // TODO Buttons do not display for owner when navigating from lobby.
      $scope.isOwner = function () {
        return $scope.room
            && $scope.room.owner
            && $scope.user
            && $scope.user.id === $scope.room.owner.id;
      };
    }
  ];
});
