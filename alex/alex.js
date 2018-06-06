var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', 'alexandroService',

    function ($scope, $timeout, $http, $q, ngDialog, alexandroService) {
        var vm = this;

    }
]);

Alex_APP.service('alexandroService', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {
    var srv = this;

}]);

Alex_APP.directive('sashaDirective1', [function () {
    return {
        link: function (scope, element, attr) {

        }
    }
}]);


Alex_APP.filter('myalexFilter1', [function () {

    return function (input) {
        input = input || '';

        return input;
    };
}]);