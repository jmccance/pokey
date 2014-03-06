require.config({
  paths: {
    angular: '../lib/angular/angular',
    angularBootstrapTemplates: '../lib/angular-bootstrap/ui-bootstrap-tpls',
    angularBootstrap: '../lib/angular-bootstrap/ui-bootstrap',
    angularRoute: '../lib/angular-route/angular-route',
    angularCookies: '../lib/angular-cookies/angular-cookies',
    bootstrap: '../lib/bootstrap/dist/js/bootstrap',
    highcharts: 'http://code.highcharts.com/highcharts',
    jquery: '../lib/jquery/jquery',
    socketio: '../lib/socket.io-client/dist/socket.io'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angularBootstrapTemplates': ['angular'],
    'angularBootstrap': ['angular', 'angularBootstrapTemplates'],
    'angularCookies': ['angular'],
    'angularRoute': ['angular'],
    'bootstrap': {
      deps: ['jquery']
    },
    'highcharts': {
      deps: ['jquery']
    },
    'socketio': {
      exports: 'io'
    }
  }
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
  'angular',
  'app',

  // Mixins
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
