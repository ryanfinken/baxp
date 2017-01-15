appRouteConfig.$inject = [
    '$routeProvider',
    'appConfigProvider'
];
function appRouteConfig($routeProvider, appConfigProvider) {
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
