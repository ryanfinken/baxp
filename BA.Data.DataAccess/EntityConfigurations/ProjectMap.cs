using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BA.Data.Entities;

namespace BA.Data.DataAccess.EntityConfigurations {
    public class ProjectMap : EntityTypeConfiguration<Project> {
        public ProjectMap() {
            this.HasKey(t => t.ProjectId);

            this.ToTable("Projects", "dbo");
        }
    }
}
