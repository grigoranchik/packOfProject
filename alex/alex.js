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
                    isElementSelected: false,
                    isElementHighlighted: false
                });
            });

        }).catch(function (error) {
            console.log('error: ' + error.status);
        });

        $scope.myMouseEnter = function (value) {
            _.forEach(vm.myResponseInformations, function (elem, index) {
                elem.isElementHighlighted = value.elementIntValue === elem.elementIntValue;
            })
        };

        $scope.myMouseLeave = function (value) {
            _.forEach(vm.myResponseInformations, function (elem, index) {
                elem.isElementHighlighted = false;
            })
        };

        $scope.delNumber = function (index, value) {
            var isYes = confirm("удалить " + value.elementIntValue + '?');
            if (isYes == true) {
                vm.myResponseInformations.splice(index, 1);
            }
        };

        vm.changeMainCheckbox = function (confirmed) {
            _.forEach(vm.myResponseInformations, function (elem, index) {
                elem.isElementSelected = confirmed;
            })
        };

        $scope.$watch(function () {
            return vm.myResponseInformations;
        }, function () {
            console.info("Array changed.");
            vm.myResultOfCheckbox = 0;
            _.forEach(vm.myResponseInformations, function (elem, index) {
                if (elem.isElementSelected == true) {
                    vm.myResultOfCheckbox += elem.elementIntValue;
                }
            })
        }, true);

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
