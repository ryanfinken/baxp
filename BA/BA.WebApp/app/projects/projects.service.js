var App;
(function (App) {
    var Projects;
    (function (Projects) {
        var ProjectsService = (function () {
            function ProjectsService($http, $q, appConfig) {
                this.$http = $http;
                this.$q = $q;
                this.appConfig = appConfig;
            }
            ProjectsService.prototype.getProjects = function () {
                var url = this.appConfig.webApiUrl + 'projects';
                return this.$http.get(url)
                    .then(function (r) {
                    var projects;
                    var items = r.data;
                    if (!!items) {
                        projects = _.map(items, function (item) { return new App.Entities.Project(item); });
                    }
                    return projects;
                });
            };
            ProjectsService.prototype.saveProject = function (project) {
                var url = this.appConfig.webApiUrl + 'projects/' + project.ProjectId;
                return this.$http.put(url, project)
                    .then(function (r) {
                    var result = new App.Entities.Project(r.data);
                    return result;
                });
            };
            ProjectsService.$inject = [
                '$http',
                '$q',
                'appConfig'
            ];
            return ProjectsService;
        }());
        Projects.ProjectsService = ProjectsService;
    })(Projects = App.Projects || (App.Projects = {}));
})(App || (App = {}));
angular
    .module('app')
    .service('projectsService', App.Projects.ProjectsService);
