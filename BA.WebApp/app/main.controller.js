var App;
(function (App) {
    'use strict';
    var MainController = (function () {
        function MainController($scope, $location, $log) {
            this.$scope = $scope;
            this.$location = $location;
            this.$log = $log;
            this.init();
        }
        MainController.prototype.init = function () {
            this.$log.info('MainController > init');
        };
        MainController.$inject = [
            '$scope',
            '$location',
            '$log'
        ];
        return MainController;
    }());
    App.MainController = MainController;
})(App || (App = {}));
angular
    .module('app')
    .controller("mainController", App.MainController);
