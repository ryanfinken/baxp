appRouteConfig.$inject = [
    '$routeProvider',
    'appConfigProvider'
];

function appRouteConfig(
    $routeProvider: angular.route.IRouteProvider,
    appConfigProvider: App.Services.IAppConfigService
) {
    $routeProvider.when('/home', {
        templateUrl: appConfigProvider.baseAppUrl + 'app/index.html',
    });

    $routeProvider.otherwise({
        redirectTo: function () {
            return '/home';
        }
    });
}

angular
    .module('app')
    .config(appRouteConfig);