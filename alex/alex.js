var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', 'alexandroService', 'grishanyaFactory',

    function ($scope, $timeout, $http, $q, ngDialog, alexandroService, grishanyaFactory) {
        var vm = this;


        vm.functionFromController = function (arg1, arg2) {
            return alexandroService.someUsefulFunction(arg1 + arg2);
        };

        console.info("alexCtrl created " + alexandroService.someUsefulFunction("grisha"));
    }
]);

Alex_APP.service('alexandroService', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {
    var srv = this;

    srv.someUsefulFunction = function (coolArg) {
        return "her-" + coolArg;
    };

    console.info("alexandroService created.")
}]);

Alex_APP.factory('grishanyaFactory', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {

    var myFactoryFn = function (someArgument) {
        var srv = this;

        console.info("grishanyaFactory created: " + someArgument)
    };

    return myFactoryFn;
}]);

Alex_APP.directive('sashaDirective', ['alexandroService', function (alexandroService) {
    return {
        link: function (scope, element, attr) {
            console.info("sashaDirective " + alexandroService.someUsefulFunction(attr['myCoolDirectiveArg1']));
        }
    }
}]);

Alex_APP.filter('myalexFilter1', ['alexandroService', function (alexandroService) {
    return function (input) {
        if (!input) {
            return "0.00";
        }
        return Math.round(input * 100) / 100
    };
}]);