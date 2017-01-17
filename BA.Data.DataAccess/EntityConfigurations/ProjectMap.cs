using System.Data.Entity.ModelConfiguration;
using BA.Data.Entities;

namespace BA.Data.DataAccess.EntityConfigurations {
    public class ProjectMap : EntityTypeConfiguration<Project> {
        public ProjectMap() {
            this.HasKey(t => t.ProjectId);

            this.ToTable("Projects", "dbo");
        }
    }
}
