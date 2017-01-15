using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace BA.WebApp.Helpers {
    public class ConfigurationHelper {
        public static string WebApiUrl { get { return ConfigurationManager.AppSettings["api:WebApiUrl"]; } }
    }
}