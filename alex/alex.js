var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', 'alexandroService', 'grishanyaFactory',

    function ($scope, $timeout, $http, $q, ngDialog, alexandroService, grishanyaFactory) {
        var vm = this;

        vm.grishDay = "na";
        vm.functionFromController = function (arg1) {
            return alexandroService.someUsefulFunction(arg1);
        };
    }
]);

Alex_APP.service('alexandroService', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {
    var srv = this;

    srv.someUsefulFunction = function (input) {
        if (!input) {
            return "#.##";
        }
        return Math.round(input * 100) / 100;
    };
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
            var extendeElem = $(element);
            extendeElem.css('color', attr['divColorArg']);
            //extendeElem.fadeOut(parseInt(attr['divTimeArg']));
        }
    }
}]);

Alex_APP.filter('lineBreakFilter', ['alexandroService', '$sce', function (alexandroService, $sce) {
    return function (input) {
        var myInput = input.replace(/(\r\n|\n|\r)/gm, '<br />');
        return $sce.trustAsHtml(myInput);
    };
}]);