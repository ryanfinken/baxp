module App.DateEntries {
    export class LogsController {
        public static $inject = [
            '$log',
            'appConfig'
        ];

        public logLink: string;

        constructor(
            private $log: ng.ILogService,
            private appConfig: App.Services.IAppConfigService) {
            this.init();
        }

        private init() {
            this.$log.info('LogsController > init');
            this.logLink = (this.appConfig.webApiUrl + 'files/logs/webapi.log').replace('/api/files', '/files');
        }
    }
}

angular
    .module('app')
    .controller('logsController', App.DateEntries.LogsController);