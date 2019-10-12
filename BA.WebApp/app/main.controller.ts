module App {
    export class MainController implements angular.IController {
        public static $inject = [
            '$scope',
            '$location',
            '$log'
        ];

        constructor(
            private $scope: ng.IScope,
            private $location: ng.ILocationService,
            private $log: ng.ILogService
        ) { }

        public $onInit(): void {
            this.$log.info('MainController > $onInit');
        }
    }
}

angular
    .module('app')
    .controller("mainController", App.MainController);
