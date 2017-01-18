using System.Collections.Generic;
using System.IO;
using System.Linq;
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
            appBundle.IncludeDirectory("~/app/common/services", "*.js");
            appBundle.IncludeDirectory("~/app/common/entities", "*.js");
            IncludeDirectoryWithExclusion(appBundle, "~/app", "*.js", true, true, "common/*");
            //appBundle.Transforms.Add(new HashCacheTransform());
            bundles.Add(appBundle);

            //BundleTable.EnableOptimizations = true;
        }
        
        // based on http://stackoverflow.com/questions/13990622/asp-net-mvc-exclude-css-file-from-bundle/36080620#36080620
        private static Bundle IncludeDirectoryWithExclusion(
            Bundle bundle, 
            string directoryVirtualPath, 
            string searchPattern,
            bool includeSubDirectories,
            bool ignoreTopDirectory, 
            params string[] excludePatterns
        ) {
            var folderPath = HttpContext.Current.Server.MapPath(directoryVirtualPath);

            var searchOption = includeSubDirectories
                                ? SearchOption.AllDirectories
                                : SearchOption.TopDirectoryOnly;

            var excludedFiles = GetFilesToExclude(folderPath, searchOption, ignoreTopDirectory, excludePatterns);
            var resultFiles = Directory
                .GetFiles(folderPath, searchPattern, searchOption)
                .Where(file => !excludedFiles.Contains(file) && !file.Contains(".min."));

            foreach (string resultFile in resultFiles) {
                bundle.Include(directoryVirtualPath + resultFile.Replace(folderPath, "")
                        .Replace("\\", "/"));
            }

            return bundle;
        }

        private static HashSet<string> GetFilesToExclude(
            string path, 
            SearchOption searchOption, 
            bool ignoreTopDirectory, 
            params string[] excludePatterns
        ) {
            var result = new HashSet<string>();

            foreach (string pattern in excludePatterns) {
                result.UnionWith(Directory.GetFiles(path, pattern, searchOption));
            }

            if (ignoreTopDirectory) {
                result.UnionWith(Directory.GetFiles(path, "*", SearchOption.TopDirectoryOnly));
            }

            return result;
        }

    }
}
