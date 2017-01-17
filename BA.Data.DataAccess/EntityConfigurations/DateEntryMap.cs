using System.Data.Entity.ModelConfiguration;
using BA.Data.Entities;

namespace BA.Data.DataAccess.EntityConfigurations {
    public class DateEntryMap : EntityTypeConfiguration<DateEntry> {
        public DateEntryMap() {
            this.HasKey(t => t.DateEntryId);

            this.ToTable("DateEntries", "dbo");
        }
    }
}
