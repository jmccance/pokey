require.config({
  baseUrl: '../app',
  paths: {
    angular: '../lib/angular/angular.min',
    angularBootstrap: '../lib/angular-bootstrap/ui-bootstrap-tpls.min',
    angularRoute: '../lib/angular-route/angular-route.min',
    angularCookies: '../lib/angular-cookies/angular-cookies.min',
    bean: '../lib/bean/bean.min',
    bootstrap: '../lib/bootstrap/dist/js/bootstrap.min',
    highcharts: 'http://code.highcharts.com/highcharts',
    jquery: '../lib/jquery/jquery.min',
    socketio: '../lib/socket.io-client/dist/socket.io.min',
    underscore: '../lib/underscore/underscore-min'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    angularBootstrap: ['angular'],
    angularCookies: ['angular'],
    angularRoute: ['angular'],
    bean: {
      exports: 'bean'
    },
    bootstrap: {
      deps: ['jquery']
    },
    highcharts: {
      deps: ['jquery'],
      exports: 'Highcharts'
    },
    socketio: {
      exports: 'io'
    },
    underscore: {
      exports: '_'
    }
  }
});
