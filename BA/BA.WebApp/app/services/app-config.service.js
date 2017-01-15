var App;
(function (App) {
    var Services;
    (function (Services) {
        'use strict';
        var AppConfigService = (function () {
            function AppConfigService(baseAppUrl, webApiUrl) {
                this.baseAppUrl = baseAppUrl;
                this.webApiUrl = webApiUrl;
                if (!_.endsWith(this.baseAppUrl + '', '/')) {
                    this.baseAppUrl = this.baseAppUrl + '/';
                }
                if (!_.endsWith(this.webApiUrl + '', '/')) {
                    this.webApiUrl = this.webApiUrl + '/';
                }
            }
            AppConfigService.prototype.$get = function () {
                return {
                    baseAppUrl: this.baseAppUrl,
                    webApiUrl: this.webApiUrl
                };
            };
            AppConfigService.$inject = [
                'baseAppUrl',
                'webApiUrl'
            ];
            return AppConfigService;
        }());
        Services.AppConfigService = AppConfigService;
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
angular
    .module('app')
    .provider('appConfig', App.Services.AppConfigService)
    .config(function (appConfigProvider) { });
