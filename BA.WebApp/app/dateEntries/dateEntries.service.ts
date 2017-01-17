module App.DateEntries {
    export interface IDateEntriesService {
        getDateEntries(): ng.IPromise<Entities.DateEntry[]>;
        getDateEntry(id: number): ng.IPromise<Entities.DateEntry>;
        reset(): ng.IPromise<any>;
        saveDateEntry(dateEntry: Entities.DateEntry): ng.IPromise<Entities.DateEntry>;
        saveDateEntryIso(dateEntry: Entities.DateEntry): ng.IPromise<Entities.DateEntry>;
    }

    export class DateEntriesService implements IDateEntriesService {
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

        public getDateEntries(): ng.IPromise<Entities.DateEntry[]> {
            let url = this.appConfig.webApiUrl + 'dateEntries';

            return this.$http.get(url)
                .then(r => {
                    let dateEntries: Entities.DateEntry[];
                    let items: any = r.data;

                    if (!!items) {
                        dateEntries = _.map(items, (item) => new Entities.DateEntry(item));
                    }

                    return dateEntries;
                });
        }

        public getDateEntry(id: number): ng.IPromise<Entities.DateEntry> {
            let url = this.appConfig.webApiUrl + 'dateEntries/' + id;

            return this.$http.get(url)
                .then(r => {
                    let dateEntry = new Entities.DateEntry(r.data);
                    return dateEntry;
                });
        }

        public reset(): ng.IPromise<any> {
            let url = this.appConfig.webApiUrl + 'dateEntries/reset';

            return this.$http.put(url, null);
        }

        public saveDateEntry(dateEntry: Entities.DateEntry): ng.IPromise<Entities.DateEntry> {
            let url = this.appConfig.webApiUrl + 'dateEntries/' + dateEntry.DateEntryId;

            return this.$http.put(url, dateEntry)
                .then(r => {
                    var result = new Entities.DateEntry(r.data);
                    return result;
                });
        }

        public saveDateEntryIso(dateEntry: Entities.DateEntry): ng.IPromise<Entities.DateEntry> {
            let url = this.appConfig.webApiUrl + 'dateEntries/' + dateEntry.DateEntryId;

            var data = {
                DateEntryId: dateEntry.DateEntryId,
                FlatDate: dateEntry.FlatDateIso
            }

            return this.$http.put(url, data)
                .then(r => {
                    var result = new Entities.DateEntry(r.data);
                    return result;
                });
        }
    }
}

angular
    .module('app')
    .service('dateEntriesService', App.DateEntries.DateEntriesService);