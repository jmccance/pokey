define([
  'jquery',

  // Mixins
  'highcharts'
], function ($) {
  'use strict';

  var EstimateHistogram = function ($el) {
    this.$el = $el;
  };

  /**
   * @param {Room} room
   */
  EstimateHistogram.prototype.show = function (room) {
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

    this.$el
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
  };

  EstimateHistogram.prototype.hide = function () {
    this.$el.hide();
  };

  return EstimateHistogram;
});
