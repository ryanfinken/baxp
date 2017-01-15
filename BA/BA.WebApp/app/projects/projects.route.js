projectsRouteConfig.$inject = [
    '$routeProvider',
    'appConfigProvider'
];
function projectsRouteConfig($routeProvider, appConfigProvider) {
    $routeProvider
        .when('/projects', {
        controller: 'projectsController',
        controllerAs: 'vm',
        templateUrl: appConfigProvider.baseAppUrl + 'app/projects/projects.html',
    });
}
angular
    .module('app')
    .config(projectsRouteConfig);
