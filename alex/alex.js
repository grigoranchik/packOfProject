var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', 'alexandroService', '$rootScope',

    function ($scope, $timeout, $http, $q, ngDialog, alexandroService, $rootScope) {
        var vm = this;

        vm.myResponseInformations = [];
        vm.myResultOfCheckbox = 0;

        alexandroService.giveMeTheFuckingData().then(function (response) {
            _.forEach(response, function (val, index) {
                vm.myResponseInformations.push({
                    elementIntValue: val,
                    isElementSelected: false
                });
            });

        }).catch(function (error) {
            console.log('error: ' + error.status);
        });

        vm.changeMainCheckbox = function (confirmed) {
            _.forEach(vm.myResponseInformations, function (elem, index) {
                elem.isElementSelected = confirmed;
            })
        };

        $scope.$watch(function () {
            return vm.myResponseInformations;
        }, function () {

            vm.myResultOfCheckbox = 0;
            _.forEach(vm.myResponseInformations, function (elem, index) {
                if (elem.isElementSelected == true) {
                    vm.myResultOfCheckbox += elem.elementIntValue;
                }
            })
        }, true);

        vm.delNumber = function(index){
            vm.myResponseInformations.splice(index, 1);
        };
    }
]);

Alex_APP.controller('yacheykaController', ['$scope', '$timeout', '$rootScope',
    function ($scope, $timeout, $rootScope) {
        var vm = this;

    }
]);

Alex_APP.service('alexandroService', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {
    var srv = this;

    srv.giveMeTheFuckingData = function () {
        var deferred = $q.defer();

        $timeout(function () {
            var fuckingData = [3, 4, 5, 4, 5, 2, 3, 1, 4, 8, 0, 1, 2, 4, 7, 9, 0, 2, 4, 5, 11, 34, 7, 9, 0, 5, 1, 2, 9, 44, 2, 1, 42, 121, 34343, 12, 8, 9, 0, 3, 4];
            deferred.resolve(fuckingData);
        }, 100);

        return deferred.promise;
    };

}]);

Alex_APP.directive('directiveFromSomeRepeat', ['alexandroService', '$rootScope', function (alexandroService, $rootScope) {
    return {
        link: function (scope, element, attr) {

            var thisElementValue = parseInt(attr['directiveFromSomeRepeat']);
            var myCSS;


            scope.myMouseEnter = function (value) {
                $rootScope.$broadcast('myCustomEvent', {
                    someProp: value.elementIntValue
                });
            };

            scope.myMouseLeave = function (value) {
                $rootScope.$broadcast('myCustomEventBackChange', {
                    someProp: value.elementIntValue
                });
            };

            $rootScope.$on('myCustomEvent', function (event, value) {

                if (thisElementValue == value.someProp) {
                    //scope.myColor = 'red';
                    myCSS = $(element).css('background-color');
                    $(element).css('background-color', 'green');
                }
            });
            $rootScope.$on('myCustomEventBackChange', function (event, value) {

                if (thisElementValue == value.someProp) {
                    $(element).css('background-color', myCSS);
                }
            });

        }
    }
}]);

Alex_APP.filter('myFilter', ['alexandroService', '$sce', '$rootScope', function (alexandroService, $sce, $rootScope) {
    return function (input) {

        var positiveArr = input.filter(function (number) {
            return number.elementIntValue > 0;
        });

        return positiveArr;
    };
}]);
