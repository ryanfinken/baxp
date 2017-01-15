var App;
(function (App) {
    var Entities;
    (function (Entities) {
        var Project = (function () {
            function Project(data) {
                this.populateEntity(data);
            }
            Project.prototype.populateEntity = function (data) {
                if (!!data) {
                    this.ProjectId = data.ProjectId;
                    this.Name = data.Name;
                    this.LastModifiedDateTime = moment(data.LastModifiedDateTime);
                    this.EstimatedCompletionYear = data.EstimatedCompletionYear;
                    this.EstimatedStartDate = moment(data.EstimatedStartDate);
                    this.ActualCompletionDate = moment(data.ActualCompletionDate);
                    this.ActualStartDate = moment(data.ActualStartDate);
                }
            };
            return Project;
        }());
        Entities.Project = Project;
    })(Entities = App.Entities || (App.Entities = {}));
})(App || (App = {}));
