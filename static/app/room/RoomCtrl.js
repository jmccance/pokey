define([
  // Mix-ins
  'highcharts'
], function () {
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
      var roomId = $routeParams.roomId;
      $scope.estimate = {};

      pokeyService.on('roomUpdated', function (room) {
        $scope.$apply(function () {
          $scope.room = room;
        });
      });

      if (!pokeyService.isRegistered()) {
        pokeyService.on('registered', function () {
          pokeyService.joinRoom(roomId);
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

        // TODO Implement an EstimationChart abstraction layer.
        // 1. update(data) - Takes a collection of estimates and updates the chart from them.
        // 2. clear() - Clears the chart, perhaps hiding it as well
        // 3. A constructor to handle naming the chart and its axes and specifying the range of
        //    series.
        $('[data-node-name="chart"]').highcharts({
          chart: {
            type: 'column'
          },
          title: {
            text: null
          },
          legend: {
            enabled: false
          },
          xAxis: {
            categories: ['1h', '2h', '3h', '4h', '5h', '6h']
          },
          yAxis: {
            title: {
              text: '# of votes'
            }
          },
          series: [
            {
              data: [0, 2, 1, 4, 3, 2]
            }
          ]
        });
      };

      /**
       * Clear existing estimates. Must be the room owner in order to do so.
       */
      $scope.clearEstimates = function () {
        pokeyService.clearEstimates();
      };
    }
  ];
});
