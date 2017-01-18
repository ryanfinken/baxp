module App.Entities {
    export class Project {
        public ProjectId: number;
        public Name: string;
        public LastModifiedDateTime: moment.Moment;
        public EstimatedCompletionYear: number;
        public ActualCompletionDate: moment.Moment;
        public ActualStartDate: moment.Moment;
        public EstimatedStartDate: moment.Moment;

        constructor(data?: any) {
            this.populateEntity(data);
        }

        public populateEntity(data: any) {
            if (!!data) {
                this.ProjectId = data.ProjectId;
                this.Name = data.Name;
                this.LastModifiedDateTime = moment(data.LastModifiedDateTime);
                this.EstimatedCompletionYear = data.EstimatedCompletionYear;
                this.EstimatedStartDate = moment(data.EstimatedStartDate);
                this.ActualCompletionDate = moment(data.ActualCompletionDate);
                this.ActualStartDate = moment(data.ActualStartDate);
            }
        }
    }
}