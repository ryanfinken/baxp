module App.Projects {
    export interface IProjectsService {
        getProjects(): ng.IPromise<Entities.Project[]>;
        reset(): ng.IPromise<any>;
        saveProject(project: Entities.Project): ng.IPromise<Entities.Project>;
    }

    export class ProjectsService implements IProjectsService {
        public static $inject: string[] = [
            '$http',
            '$q',
            'appConfig'
        ];

        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private appConfig: App.Services.IAppConfigService
        ) { }

        public getProjects(): ng.IPromise<Entities.Project[]> {
            let url = this.appConfig.webApiUrl + 'projects';

            return this.$http.get(url)
                .then(r => {
                    let projects: Entities.Project[];
                    let items: any = r.data;

                    if (!!items) {
                        projects = _.map(items, (item) => new Entities.Project(item));
                    }

                    return projects;
                });
        }

        public reset(): ng.IPromise<any> {
            let url = this.appConfig.webApiUrl + 'projects/reset';

            return this.$http.put(url, null);
        }

        public saveProject(project: Entities.Project): ng.IPromise<Entities.Project> {
            let url = this.appConfig.webApiUrl + 'projects/' + project.ProjectId;

            return this.$http.put(url, project)
                .then(r => {
                    var result = new Entities.Project(r.data);
                    return result;
                });
        }
    }
}

angular
    .module('app')
    .service('projectsService', App.Projects.ProjectsService);