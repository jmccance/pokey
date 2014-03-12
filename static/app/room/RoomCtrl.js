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

      // TODO Implement correct workflow.
      // 1. Register user if not already registered.
      // 2. After registration, join room.
      // 3. Once the room is received, set up a listener for room updates.

      if (!pokeyService.isRegistered()) {
        pokeyService.on('registered', function () {
          pokeyService.joinRoom(roomId);
        });
        
        registrationDialog.show();
      }

      $scope.users = [
        {
          name: 'John',
          estimate: 2
        },
        {
          name: 'Jakob',
          estimate: 3
        },
        {
          name: 'Jingle',
          estimate: 5
        }
      ];

      /**
       * Submit the current estimate.
       */
      $scope.estimate = function () {
        console.log('Submitting estimate');
        pokeyService.submitEstimate({});
      };

      /**
       * Reveals the estimates and renders the chart.
       */
      $scope.reveal = function () {
        console.log('Revealing estimates');
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
      $scope.clear = function () {
        pokeyService.clearEstimates();
      };
    }
  ];
});
