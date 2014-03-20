define([
  'underscore',
  'services/EstimateHistogram'
], function (
    _,
    EstimateHistogram
    ) {
  'use strict';

  return [
    '$routeParams',
    '$scope',
    'pokeyService',
    'registrationDialog',
    function (
        $routeParams,
        $scope,
        pokeyService,
        registrationDialog
        ) {
      var roomId = $routeParams.roomId,
          histogram = new EstimateHistogram($('[data-node-name="chart"]'));

      $scope.estimate = {};
      $scope.user = pokeyService.getUser();
      $scope.isOwner = false;

      pokeyService.on('roomUpdated', function (room) {
        $scope.$apply(function () {
          $scope.room = room;
          $scope.isOwner = room.owner.id === $scope.user.id;
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
        var estimate = $scope.estimate;
        // If the estimate is valid, post it. Otherwise, rely on browser-based validation.
        // TODO Client-side domain objects to handle validation like this.
        if (_.isNumber(estimate.hours) ||
            (!_.isUndefined(estimate.comment) && /.*\S.*/.test(estimate.comment))) {
          pokeyService.submitEstimate($scope.estimate);
          $scope.estimate = {};
        }
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
        $scope.estimate.hours = null;
        $scope.estimate.comment = null;
        pokeyService.clearEstimates();
      };

      $scope.isOwner = function () {
        return $scope.room &&
            $scope.room.owner &&
            $scope.user &&
            $scope.user.id === $scope.room.owner.id;
      };
    }
  ];
});
