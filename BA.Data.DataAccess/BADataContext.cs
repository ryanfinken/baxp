using System.Data.Entity;
using BA.Data.DataAccess.EntityConfigurations;
using BA.Data.Entities;

namespace BA.Data.DataAccess {
    public class BADataContext : DbContext {
        public virtual DbSet<Project> Projects { get; set; }

        public BADataContext() : base("name=BADataContext") {
            Database.SetInitializer<BADataContext>(null);
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            modelBuilder.Configurations.Add(new ProjectMap());
        }
    }
}
