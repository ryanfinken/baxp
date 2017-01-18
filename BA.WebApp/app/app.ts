namespace App {
    'use strict';

    let appModuleName: string = 'app';

    let app: ng.IModule = angular.module(appModuleName, [
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ui.bootstrap',
        'cgBusy'
    ]);

    app.run([
        '$http',
        '$location',
        '$log',
        '$rootScope',
        'appConfig',
        function (
            $http: ng.IHttpService,
            $location: ng.ILocationService,
            $log: ng.ILogService,
            $rootScope: ng.IRootScopeService,
            appConfig: App.Services.IAppConfigService
        ): void { 
            $log.info('App > run');
            $log.info('Current API: ' + appConfig.webApiUrl);
        }
    ])
    .config([
        '$provide',
        '$logProvider',
        'appConfigProvider',
        function (
            $provide: any,
            $logProvider: ng.ILogProvider,
            appConfigProvider: App.Services.IAppConfigService
        ): void {
            // Specify HTML5 mode (using the History APIs) or HashBang syntax.
            // $locationProvider.html5Mode(true);
            // $locationProvider.html5Mode(false).hashPrefix('!');
        }
    ]);
}