using AutoMapper;

namespace BA.WebApi {
    public static class MapperConfig {
        public static void Configure() {
            Mapper.Initialize(cfg => {
                cfg.AddProfile<DefaultProfile>();
            });

            Mapper.AssertConfigurationIsValid();
        }
    }

    public class DefaultProfile: Profile {
        protected override void Configure() {
            this.CreateMap<Data.Entities.DateEntry, Models.DateEntry>();
            this.CreateMap<Data.Entities.Project, Models.Project>();
        }
    }
}