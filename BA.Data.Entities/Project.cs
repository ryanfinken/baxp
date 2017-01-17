using System;

namespace BA.Data.Entities {
    public class Project {
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public DateTime EstimatedStartDate { get; set; }
        public int EstimatedCompletionYear { get; set; }
        public DateTime? ActualStartDate { get; set; }
        public DateTime? ActualCompletionDate { get; set; }
        public DateTimeOffset? LastModifiedDateTime { get; set; }
    }
}
