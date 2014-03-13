define([
  'underscore',

  // Mix-ins
  'highcharts'
], function (_) {
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

        if (room.isRevealed) {
          var tally = _.chain(room.members)
              .countBy(function (member) {
                if (!_.isUndefined(member.estimate)) {
                  return member.estimate.hours;
                }
              })
              .omit(undefined)
              .value();

          var categories = [];
          var data = [];

          for (var i = 1; i <= 12; ++i) {
            categories.push(i + 'h');
            data.push(tally[i] ? tally[i] : 0);
          }

          // TODO Implement an EstimationChart abstraction layer.
          // 1. update(data) - Takes a collection of estimates and updates the chart from them.
          // 2. clear() - Clears the chart, perhaps hiding it as well
          // 3. A constructor to handle naming the chart and its axes and specifying the range of
          //    series.
          $('[data-node-name="chart"]')
              .show()
              .highcharts({
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
//              categories: ['1h', '2h', '3h', '4h', '5h', '6h']
              categories: categories
            },
            yAxis: {
              title: {
                text: '# of votes'
              },
              tickInterval: 1
            },
            series: [
              {
                data: data
              }
            ]
          });
        } else {
          $('[data-node-name="chart"]').hide();
        }
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
