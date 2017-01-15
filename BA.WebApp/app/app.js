var App;
(function (App) {
    'use strict';
    var appModuleName = 'app';
    var app = angular.module(appModuleName, [
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'cgBusy'
    ]);
    app.run([
        '$http',
        '$location',
        '$rootScope',
        function ($http, $location, $rootScope) { }
    ])
        .config([
        '$provide',
        '$logProvider',
        'appConfigProvider',
        function ($provide, $logProvider, appConfigProvider) {
            // Specify HTML5 mode (using the History APIs) or HashBang syntax.
            // $locationProvider.html5Mode(true);
            // $locationProvider.html5Mode(false).hashPrefix('!');
        }
    ]);
})(App || (App = {}));
