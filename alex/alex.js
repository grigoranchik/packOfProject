var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', 'alexandroService', '$rootScope',

    function ($scope, $timeout, $http, $q, ngDialog, alexandroService, $rootScope) {
        var vm = this;

        vm.myResponseInformations = [];

        alexandroService.giveMeTheFuckingData().then(function (response) {
            vm.myResponseInformations = response;
        }).catch(function (error) {
            console.log('error: ' + error.status);
        });

        vm.myResultOfCheckbox = 0;

        vm.myChangeOfCheckbox = function (value, confirmed) {

            if (confirmed == true) {
                vm.myResultOfCheckbox += value;
            } else {
                if (confirmed == false) {
                    vm.myResultOfCheckbox -= value;
                }
            }
        };

        vm.valueAllCheckbox;
        vm.summOfAllCheckbox;
        $rootScope.$on('myEventOfMassChechbox', function (event, value) {
            vm.summOfAllCheckbox = value.someProp;
        });

        vm.changeMainCheckbox = function (confirmed) {
            vm.valueAllCheckbox = confirmed;
            if (confirmed == true) {
                vm.myResultOfCheckbox = vm.summOfAllCheckbox;
            } else {
                if (confirmed == false) {
                    vm.myResultOfCheckbox = 0;
                }

            }

        }
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
                    someProp: value
                });
            };

            scope.myMouseLeave = function (value) {
                $rootScope.$broadcast('myCustomEventBackChange', {
                    someProp: value
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
                    //scope.myColor = 'black';
                }
            });

        }
    }
}]);

Alex_APP.filter('myFilter', ['alexandroService', '$sce', '$rootScope', function (alexandroService, $sce, $rootScope) {
    return function (input) {
        var positiveArr = input.filter(function (number) {
            return number > 0;
        });

        var summMassElem = 0;
        positiveArr.forEach(function (item, i, arr) {
            summMassElem += item;
        });

        $rootScope.$broadcast('myEventOfMassChechbox', {
            someProp: summMassElem
        });

        return positiveArr;
    };
}]);
