using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using BA.Data.DataAccess;
using BA.WebApi.Models;
using Common.Logging;

namespace BA.WebApi.Controllers {
    [RoutePrefix("api/dateEntries")]
    public class DateEntriesController : ApiController {
        private readonly BADataContext dataContext;
        private readonly ILog logger;

        public DateEntriesController() {
            this.dataContext = new BADataContext();
            this.logger = LogManager.GetLogger<DateEntriesController>();
        }

        [Route("")]
        [HttpGet]
        public HttpResponseMessage GetDateEntries() {
            var dateEntries = this.dataContext.DateEntries.OrderBy(x => x.DateEntryId).Select(Mapper.Map<Models.DateEntry>);
            return Request.CreateResponse(HttpStatusCode.OK, dateEntries);
        }

        [Route("{id:int}")]
        [HttpGet]
        public HttpResponseMessage GetDateEntry(int id) {
            var dateEntry = Mapper.Map<Models.DateEntry>(this.dataContext.DateEntries.Find(id));
            return Request.CreateResponse(HttpStatusCode.OK, dateEntry);
        }

        [Route("{id:int}")]
        [HttpPut]
        public HttpResponseMessage UpdateDateEntry(int id, [FromBody]DateEntry dateEntry) {
            this.logger.DebugFormat(
                "DateEntryId: {0}; FlatDate: {1}",
                dateEntry.DateEntryId,
                dateEntry.FlatDate);

            var entity = this.dataContext.DateEntries.Find(dateEntry.DateEntryId);

            if (entity == null) {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else {
                entity.FlatDate = dateEntry.FlatDate;

                this.dataContext.SaveChanges();
                
                var result = Mapper.Map<Models.DateEntry>(this.dataContext.DateEntries.Find(dateEntry.DateEntryId));
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
        }

        [Route("reset")]
        [HttpPut]
        public HttpResponseMessage ResetEntities() {
            var dateEntries = new List<Data.Entities.DateEntry>();

            dateEntries.Add(new Data.Entities.DateEntry() {
                DateEntryId = 1,
                FlatDate = new DateTime(2016, 8, 1)
            });

            foreach (var dateEntry in dateEntries) {
                var entity = this.dataContext.DateEntries.FirstOrDefault(x => x.DateEntryId == dateEntry.DateEntryId);

                if (entity == null) {
                    entity = new Data.Entities.DateEntry();
                    entity.DateEntryId = dateEntry.DateEntryId;
                    this.dataContext.DateEntries.Add(entity);
                }
                
                entity.FlatDate = dateEntry.FlatDate;
            }

            this.dataContext.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
