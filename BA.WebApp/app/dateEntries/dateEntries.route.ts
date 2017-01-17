dateEntriesRouteConfig.$inject = [
    '$routeProvider',
    'appConfigProvider'
];

function dateEntriesRouteConfig(
    $routeProvider: angular.route.IRouteProvider,
    appConfigProvider: App.Services.IAppConfigService
) {
    $routeProvider
        .when('/dateEntries', {
            controller: 'dateEntryController',
            controllerAs: 'vm',
            templateUrl: appConfigProvider.baseAppUrl + 'app/dateEntries/dateEntry.html',
        });
}

angular
    .module('app')
    .config(dateEntriesRouteConfig);