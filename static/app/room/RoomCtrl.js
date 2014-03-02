define([
    // Mix-ins
    'highcharts'
], function () {
  'use strict';

  return [
    '$scope',
    '$routeParams',
    function ($scope, $routeParams) {
      $scope.roomName = $routeParams.roomName;

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
       * Reveals the estimates and renders the chart.
       */
      $scope.reveal = function () {
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
              text: 'Fruit eaten'
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

      };
    }
  ];
});