module App.Entities {
    export class DateEntry {
        public DateEntryId: number;
        public FlatDate: moment.Moment;
        public FlatDateIso?: string;

        constructor(data?: any) {
            this.populateEntity(data);
        }

        public populateEntity(data: any) {
            if (!!data) {
                this.DateEntryId = data.DateEntryId;
                this.FlatDate = moment(data.FlatDate);
                this.FlatDateIso = data.FlatDate;
            }
        }
    }
}