var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', '$rootScope',

    function ($scope, $timeout, $http, $q, ngDialog, $rootScope) {
        var vm = this;
        vm.mass = new Array(4);
        var index = 1;
        for (var i = 0; i < 4; i++) {
            vm.mass[i] = new Array(4);
        }
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                vm.mass[i][j] = {
                    staticIndex: index,
                    dynamicIndex: index,
                    property: false
                };
                index++;
            }
        }
        vm.mass[3][3].property = true;
        vm.mass[3][3].dynamicIndex = '';

        $scope.$on('myCustomEventChangeColor', function (event, value) {
            //debugger;

            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {

                    if (vm.mass[i][j].property == true) {
                        //debugger;
                        vm.mass[i][j].property = false;
                    }

                    if (vm.mass[i][j].dynamicIndex == value.to.dynamicIndex) {
                        //debugger;
                        vm.mass[i][j].property = true;
                    }
                }
            }

            var from = Object.assign({}, value.from);
            var to = Object.assign({}, value.to);

            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {

                    if (vm.mass[i][j].dynamicIndex == from.dynamicIndex) {
                        //debugger;
                        vm.mass[i][j].dynamicIndex = to.dynamicIndex;
                        //midgardFrom = vm.mass[i][j].index;
                    } else{
                        if(vm.mass[i][j].dynamicIndex == to.dynamicIndex){
                            //debugger;
                            vm.mass[i][j].dynamicIndex = from.dynamicIndex;
                        }
                    }
                }
            }

            $timeout(function () {
                $scope.$apply();
            })

        });

    }
]);

Alex_APP.directive('emitDirective', ['$rootScope', function ($rootScope) {
    return {
        scope: {
            info: "=emitDirective"
        },
        link: function (scope, element, attr) {
            var extendeElem = $(element);
            //var info = JSON.parse(attr['emitDirective']); //extendeElem.fadeOut
            var info = scope.info;

            extendeElem.click(function () {
                if (info.property != true) {
                    //debugger;
                    $rootScope.$broadcast('myCustomEvent', {
                        someProp: info
                    });
                }
            });

            $rootScope.$on('myCustomEvent', function (event, value) {

                if (info.property == true) {
                    //debugger;
                    var str = info.staticIndex - value.someProp.staticIndex;

                    if (str == 1 || str == -1 || str == 4 || str == -4) {
                        console.log('access');
                        $rootScope.$broadcast('myCustomEventChangeColor', {
                            from: info,
                            to: value.someProp
                        });
                    } else {
                        console.log('no access');
                    }
                }
            });


        }
    }
}]);

