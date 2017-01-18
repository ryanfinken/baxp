logsRouteConfig.$inject = [
    '$routeProvider',
    'appConfigProvider'
];

function logsRouteConfig(
    $routeProvider: angular.route.IRouteProvider,
    appConfigProvider: App.Services.IAppConfigService
) {
    $routeProvider
        .when('/logs', {
            controller: 'logsController',
            controllerAs: 'vm',
            templateUrl: appConfigProvider.baseAppUrl + 'app/logs/logs.html',
        });
}

angular
    .module('app')
    .config(logsRouteConfig);