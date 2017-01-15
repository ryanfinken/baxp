﻿module App.Services {
    'use strict';

    export interface IAppConfigService {
        baseAppUrl: string,
        webApiUrl: string
    }

    export class AppConfigService implements IAppConfigService, ng.IServiceProvider {
        public static $inject = [
            'baseAppUrl',
            'webApiUrl'
        ];

        constructor(
            public baseAppUrl: string,
            public webApiUrl: string
        ) {
            if (!_.endsWith(this.baseAppUrl + '', '/')) { this.baseAppUrl = this.baseAppUrl + '/'; }
            if (!_.endsWith(this.webApiUrl + '', '/')) { this.webApiUrl = this.webApiUrl + '/'; }
        }

        public $get(): IAppConfigService {
            return {
                baseAppUrl: this.baseAppUrl,
                webApiUrl: this.webApiUrl
            };
        }
    }
}

angular
    .module('app')
    .provider('appConfig', App.Services.AppConfigService)
    .config((appConfigProvider: App.Services.AppConfigService) => { });