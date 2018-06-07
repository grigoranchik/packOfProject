var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', 'alexandroService', 'grishanyaFactory',

    function ($scope, $timeout, $http, $q, ngDialog, alexandroService, grishanyaFactory) {
        var vm = this;

        console.info("alexCtrl created.")
    }
]);

Alex_APP.service('alexandroService', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {
    var srv = this;

    console.info("alexandroService created.")
}]);

Alex_APP.factory('grishanyaFactory', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {

    var myFactoryFn = function (someArgument) {
        var srv = this;

        console.info("grishanyaFactory created: " + someArgument)
    };

    return myFactoryFn;
}]);

Alex_APP.directive('sashaDirective1', [function () {
    return {
        link: function (scope, element, attr) {

        }
    }
}]);

Alex_APP.filter('myalexFilter1', [function () {
    return function (input) {

        return input;
    };
}]);


Alex_APP.filter('lineBreakFilter', ['alexandroService', '$sce', function (alexandroService, $sce) {
    return function (input) {
        var myInput = input.replace(/(\r\n|\n|\r)/gm, '<br />');
        return $sce.trustAsHtml(myInput);
    };
}]);