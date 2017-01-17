module App.Projects {
    export class ProjectsController {
        public static $inject = [
            '$log',
            'projectsService'
        ];

        public projects: Entities.Project[] = [];
        public loadPromise: ng.IPromise<Entities.Project[]>;
        public savePromise: ng.IPromise<Entities.Project>;
        
        constructor(
            private $log: ng.ILogService,
            private projectsService: IProjectsService) {
            this.init();
        }

        public updateProjectClick(project: Entities.Project) {
            project.ActualCompletionDate.add(1, 'day');

            this.saveProject(project);
        }

        private init() {
            this.$log.info('ProjectsController > init');

            this.loadProjects();
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