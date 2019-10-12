module App.DateEntries {
    export class DateEntryController implements angular.IController {
        public static $inject = [
            '$filter',
            '$log',
            'appConfig',
            'dateEntriesService'
        ];

        public defaultFilterFormat: string;
        public defaultMomentFormat: string;
        public filterFormat: string;
        public inputDate: string;
        public logLink: string;
        public momentDate: moment.Moment;
        public momentFormat: string;
        public momentUtcDate: moment.Moment;
        public sendDate: string;
        public serverDate: string;

        public busyPromise: ng.IPromise<any>;
        public loadPromise: ng.IPromise<Entities.DateEntry>;
        public savePromise: ng.IPromise<Entities.DateEntry>;

        private dateEntryId: number;

        constructor(
            private $filter: ng.IFilterService,
            private $log: ng.ILogService,
            private appConfig: App.Services.IAppConfigService,
            private dateEntriesService: IDateEntriesService) { }

        public $onInit(): void {
            this.$log.info('DateEntriesController > $onInit');

            this.logLink = (this.appConfig.webApiUrl + 'files/logs/webapi.log').replace('/api/files', '/files');

            this.defaultFilterFormat = 'short';
            this.defaultMomentFormat = 'LLLL';

            this.dateEntryId = 1;
            this.loadDateEntry();
        }

        public applyInputDate() {
            this.momentDate = moment(this.inputDate);
            this.momentUtcDate = moment.utc(this.inputDate);
            this.sendDate = this.momentDate.toISOString();
        }

        public formatFilter(momentDate: moment.Moment) {
            if (!momentDate) {
                return null;
            }
            return this.$filter('date')(momentDate.toDate(), this.filterFormat || 'short');
        }

        public formatMoment(momentDate: moment.Moment) {
            if (!momentDate) {
                return null;
            }
            return momentDate.format(this.momentFormat || 'LLLL');
        }

        public resetDateEntries() {
            this.busyPromise = this.dateEntriesService.reset();

            this.busyPromise.then(() => {
                this.loadDateEntry();
            });
        }

        public sendToDateToServer() {
            let dateEntry = new Entities.DateEntry();
            dateEntry.DateEntryId = this.dateEntryId,
                dateEntry.FlatDateIso = this.sendDate;

            this.saveDateEntry(dateEntry);
        }

        private loadDateEntry() {
            this.loadPromise = this.dateEntriesService.getDateEntry(this.dateEntryId);

            this.loadPromise.then((dateEntry) => {
                this.inputDate = dateEntry.FlatDateIso;
                this.applyInputDate();
            });
        }

        private saveDateEntry(dateEntry: Entities.DateEntry) {
            this.$log.info('DateEntriesController > saveDateEntry', dateEntry);

            this.savePromise = this.dateEntriesService.saveDateEntryIso(dateEntry);

            this.savePromise.then((dateEntry) => {
                this.serverDate = dateEntry.FlatDateIso;
                this.loadDateEntry();
            });
        }
    }
}

angular
    .module('app')
    .controller('dateEntryController', App.DateEntries.DateEntryController);
