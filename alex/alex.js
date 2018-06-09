var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', 'alexandroService', 'grishanyaFactory',

    function ($scope, $timeout, $http, $q, ngDialog, alexandroService, grishanyaFactory) {
        var vm = this;

        vm.myResponseInformations = [];

        alexandroService.giveMeTheFuckingData().then(function (response) {
            vm.myResponseInformations = response;
        }).catch(function (error) {
            console.log('error: ' + error.status);
        });

    }
]);

Alex_APP.service('alexandroService', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {
    var srv = this;

    srv.giveMeTheFuckingData = function () {
        var deferred = $q.defer();

        $timeout(function () {
            var fuckingData = [3, 4, 5, 4, 5, 2, 3, 1, 4, 8, 0, 1, 2, 4, 7, 9, 0, 2, 4, 5, 11, 34, 7, 9, 0, 5, 1, 2, 9, 44, 2, 1, 42, 121, 34343, 12, 8, 9, 0, 3, 4];
            deferred.resolve(fuckingData);
        }, 1000);

        return deferred.promise;
    };

}]);

Alex_APP.factory('grishanyaFactory', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {

    var myFactoryFn = function (someArgument) {
        var srv = this;
    };

    return myFactoryFn;
}]);

Alex_APP.directive('sashaDirective', ['alexandroService', function (alexandroService) {
    return {
        link: function (scope, element, attr) {
            var extendeElem = $(element);
        }
    }
}]);

Alex_APP.filter('myFilter', ['alexandroService', '$sce', function (alexandroService, $sce) {
    return function (input) {
        var positiveArr = input.filter(function (number) {
            return number > 0;
        });

        return positiveArr;
    };
}]);