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
          histogram = null;

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
          histogram = new EstimateHistogram($('[data-node-name="chart"]'));
        });

        registrationDialog.show();
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

      $scope.isOwner = function () {
        return $scope.user.id === $scope.room.owner.id;
      };
    }
  ];
});
