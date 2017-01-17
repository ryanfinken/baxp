using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using BA.Data.DataAccess;
using BA.WebApi.Models;

namespace BA.WebApi.Controllers {
    [RoutePrefix("api/projects")]
    public class ProjectsController : ApiController {
        private readonly BADataContext dataContext;

        public ProjectsController() {
            this.dataContext = new BADataContext();
        }

        [Route("")]
        [HttpGet]
        public HttpResponseMessage Get() {
            var projects = this.dataContext.Projects.OrderBy(x => x.ProjectId).Select(Mapper.Map<Models.Project>);
            return Request.CreateResponse(HttpStatusCode.OK, projects);
        }

        [Route("{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateProject(int id, [FromBody]Project project) {
            var entity = this.dataContext.Projects.FirstOrDefault(x => x.ProjectId == project.ProjectId);

            if (entity == null) {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else {
                entity.Name = project.Name;
                entity.EstimatedStartDate = project.EstimatedStartDate;
                entity.EstimatedCompletionYear = project.EstimatedCompletionYear;
                entity.ActualStartDate = project.ActualStartDate;
                entity.ActualCompletionDate = project.ActualCompletionDate;
                entity.LastModifiedDateTime = DateTimeOffset.UtcNow;

                this.dataContext.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, project);
            }
        }

        [Route("reset")]
        [HttpGet]
        public HttpResponseMessage Reset() {
            var projects = new List<Data.Entities.Project>();

            projects.Add(new Data.Entities.Project() {
                ProjectId = 1,
                Name = "Project 1",
                EstimatedStartDate = new DateTime(2016, 1, 1),
                ActualStartDate = new DateTime(2016, 1, 10),
                EstimatedCompletionYear = 2016,
                ActualCompletionDate = new DateTime(2016, 2, 1),
                LastModifiedDateTime = DateTimeOffset.UtcNow.AddMonths(-10).AddHours(3)
            });

            projects.Add(new Data.Entities.Project() {
                ProjectId = 2,
                Name = "Project 2",
                EstimatedStartDate = new DateTime(2016, 3, 4),
                ActualStartDate = new DateTime(2016, 3, 1),
                EstimatedCompletionYear = 2016,
                ActualCompletionDate = new DateTime(2016, 4, 1),
                LastModifiedDateTime = DateTimeOffset.UtcNow.AddMonths(-9).AddDays(-6).AddHours(9).AddMinutes(12)
            });

            foreach (var project in projects) {
                var entity = this.dataContext.Projects.FirstOrDefault(x => x.ProjectId == project.ProjectId);

                if (entity == null) {
                    entity = new Data.Entities.Project();
                    this.dataContext.Projects.Add(entity);
                }

                entity.Name = project.Name;
                entity.EstimatedStartDate = project.EstimatedStartDate;
                entity.EstimatedCompletionYear = project.EstimatedCompletionYear;
                entity.ActualStartDate = project.ActualStartDate;
                entity.ActualCompletionDate = project.ActualCompletionDate;
                entity.LastModifiedDateTime = project.LastModifiedDateTime;
            }

            this.dataContext.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
