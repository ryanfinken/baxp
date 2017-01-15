using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using BA.WebApi.Models;

namespace BA.WebApi {
    public class WebApiApplication : System.Web.HttpApplication {
        public static List<Project> projects = LoadInMemoryProjects();

        protected void Application_Start() {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        private static List<Project> LoadInMemoryProjects() {
            var projects = new List<Project>();

            projects.Add(new Project() {
                ProjectId = 1,
                Name = "Project 1",
                EstimatedStartDate = new DateTime(2016, 1, 1),
                ActualStartDate = new DateTime(2016, 1, 10),
                EstimatedCompletionYear = 2016,
                ActualCompletionDate = new DateTime(2016, 2, 1),
                LastModifiedDateTime = DateTimeOffset.UtcNow.AddMonths(-10).AddHours(3)
            });

            projects.Add(new Project() {
                ProjectId = 2,
                Name = "Project 2",
                EstimatedStartDate = new DateTime(2016, 3, 4),
                ActualStartDate = new DateTime(2016, 3, 1),
                EstimatedCompletionYear = 2016,
                ActualCompletionDate = new DateTime(2016, 4, 1),
                LastModifiedDateTime = DateTimeOffset.UtcNow.AddMonths(-9).AddDays(-6).AddHours(9).AddMinutes(12)
            });

            projects.Add(new Project() {
                ProjectId = 3,
                Name = "Project 3",
                EstimatedStartDate = new DateTime(2016, 10, 1),
                ActualStartDate = new DateTime(2016, 10, 1),
                EstimatedCompletionYear = 2016,
                ActualCompletionDate = new DateTime(2016, 10, 10),
                LastModifiedDateTime = DateTimeOffset.UtcNow.AddMonths(-3).AddDays(7).AddHours(10).AddMinutes(37)
            });

            return projects;
        }
    }
}
