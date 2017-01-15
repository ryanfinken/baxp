using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BA.WebApi.Models;

namespace BA.WebApi.Controllers
{
    [RoutePrefix("api/projects")]
    public class ProjectsController : ApiController
    {
        [Route("")]
        public HttpResponseMessage Get() {            
            return Request.CreateResponse(HttpStatusCode.OK, WebApiApplication.projects);
        }

        [Route("{id}")]
        [HttpPut]
        public HttpResponseMessage UpdateProject(int id, [FromBody]Project project) {
            var index = WebApiApplication.projects.FindIndex(x => x.ProjectId == project.ProjectId);

            if (index < 0) {
                return Request.CreateResponse(HttpStatusCode.NotFound);

            } else { 
                project.LastModifiedDateTime = DateTimeOffset.UtcNow;
                WebApiApplication.projects[index] = project;

                return Request.CreateResponse(HttpStatusCode.OK, project);
            }
        }
    }
}
