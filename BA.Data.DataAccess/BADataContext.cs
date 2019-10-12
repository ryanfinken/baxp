using System.Data.Entity;
using BA.Data.DataAccess.EntityConfigurations;
using BA.Data.Entities;

namespace BA.Data.DataAccess {
    public class BADataContext : DbContext {
        public virtual DbSet<DateEntry> DateEntries { get; set; }
        public virtual DbSet<Project> Projects { get; set; }

        public BADataContext() : base("name=BADataContext") {
            Database.SetInitializer<BADataContext>(new BADataContextInitializer());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            modelBuilder.Configurations.Add(new DateEntryMap());
            modelBuilder.Configurations.Add(new ProjectMap());
        }
    }

    internal class BADataContextInitializer : IDatabaseInitializer<BADataContext> {
        public void InitializeDatabase(BADataContext context) {
            if (context.Database.Exists()) {
                if (!context.Database.CompatibleWithModel(true)) {
                    context.Database.Delete();
                }
            }
            context.Database.Create();
        }
    }
}
