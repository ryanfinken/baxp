using System.Web;
using System.Web.Optimization;

namespace BA.WebApp {
    public class BundleConfig {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles) {
            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //          "~/Content/bootstrap.css",
            //          "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-resource.js",
                "~/Scripts/angular-sanitize.js",
                "~/Scripts/angular-busy.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js"));

            bundles.Add(new ScriptBundle("~/bundles/misc").Include(
                "~/Scripts/lodash.js",
                "~/Scripts/moment.js"));

            var appBundle = new ScriptBundle("~/bundles/app").Include(
                "~/app/app.js",
                "~/app/app.route.js",
                "~/app/main.controller.js"
            );
            appBundle.IncludeDirectory("~/app/entities", "*.js");
            appBundle.IncludeDirectory("~/app/services", "*.js");
            appBundle.IncludeDirectory("~/app/dateEntries", "*.js");
            appBundle.IncludeDirectory("~/app/logs", "*.js");
            appBundle.IncludeDirectory("~/app/projects", "*.js");
            //appBundle.Transforms.Add(new HashCacheTransform());
            bundles.Add(appBundle);

            //BundleTable.EnableOptimizations = true;
        }
    }
}
