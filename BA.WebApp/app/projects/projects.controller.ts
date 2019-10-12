module App.Projects {
    export class ProjectsController implements angular.IController {
        public static $inject = [
            '$log',
            'projectsService'
        ];

        public projects: Entities.Project[] = [];

        public busyPromise: ng.IPromise<any>;
        public loadPromise: ng.IPromise<Entities.Project[]>;
        public savePromise: ng.IPromise<Entities.Project>;

        constructor(
            private $log: ng.ILogService,
            private projectsService: IProjectsService) { }

        public $onInit(): void {
            this.$log.info('ProjectsController > $onInit');

            this.loadProjects();
        }

        public addDayClick(project: Entities.Project) {
            project.ActualCompletionDate.add(1, 'day');

            this.saveProject(project);
        }

        public resetProjectDates() {
            this.busyPromise = this.projectsService.reset();

            this.busyPromise.then(() => {
                this.loadProjects();
            });
        }

        public subtractDayClick(project: Entities.Project) {
            project.ActualCompletionDate.add(-1, 'day');

            this.saveProject(project);
        }

        private loadProjects() {
            this.loadPromise = this.projectsService.getProjects();

            this.loadPromise.then((projects) => {
                this.projects = projects;
            });
        }

        private saveProject(project: Entities.Project) {
            this.$log.info('ProjectsController > saveProject', project);

            this.savePromise = this.projectsService.saveProject(project);

            this.savePromise.then((p) => {
                this.loadProjects();
            });
        }
    }
}

angular
    .module('app')
    .controller('projectsController', App.Projects.ProjectsController);
