﻿module App {
    'use strict';

    export class MainController {
        public static $inject = [
            '$scope',
            '$location',
            '$log'
        ];

        constructor(
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private $log: ng.ILogService
        ) {
            this.init();
        }

        private init(): void {
            this.$log.info('MainController > init');
        }
    }
}

angular
    .module('app')
    .controller("mainController", App.MainController);