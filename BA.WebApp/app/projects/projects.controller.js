var App;
(function (App) {
    var Projects;
    (function (Projects) {
        var ProjectsController = (function () {
            function ProjectsController($log, projectsService) {
                this.$log = $log;
                this.projectsService = projectsService;
                this.projects = [];
                this.init();
            }
            ProjectsController.prototype.updateProjectClick = function (project) {
                project.ActualCompletionDate.add(1, 'day');
                this.saveProject(project);
            };
            ProjectsController.prototype.init = function () {
                this.$log.info('ProjectsController > init');
                this.loadProjects();
            };
            ProjectsController.prototype.loadProjects = function () {
                var _this = this;
                this.loadPromise = this.projectsService.getProjects();
                this.loadPromise.then(function (projects) {
                    _this.projects = projects;
                });
            };
            ProjectsController.prototype.saveProject = function (project) {
                var _this = this;
                this.savePromise = this.projectsService.saveProject(project);
                this.savePromise.then(function (p) {
                    _this.loadProjects();
                });
            };
            ProjectsController.$inject = [
                '$log',
                'projectsService'
            ];
            return ProjectsController;
        }());
        Projects.ProjectsController = ProjectsController;
    })(Projects = App.Projects || (App.Projects = {}));
})(App || (App = {}));
angular
    .module('app')
    .controller('projectsController', App.Projects.ProjectsController);
