require.config({
  paths: {
    angular: '../lib/angular/angular',
    angularRoute: '../lib/angular-route/angular-route',
    bootstrap: '../lib/bootstrap/dist/js/bootstrap',
    highcharts: 'http://code.highcharts.com/highcharts',
    jquery: '../lib/jquery/jquery'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angularRoute': ['angular'],
    'bootstrap': {
      deps: ['jquery']
    },
    'highcharts': {
      deps: ['jquery']
    }
  }
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
  'angular',
  'app',
  'bootstrap'
], function(
    angular,
    app) {
  'use strict';
  angular.element(document.getElementsByTagName('html')[0]);

  angular.element().ready(function() {
    angular.resumeBootstrap([app.name]);
  });
});
