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
        vm.sec = '0';

        vm.startGame = function () {
            var helpMass = [];
            var getFuckOutReturn = false;
            var index = 0;
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    helpMass[index] = vm.mass[i][j].dynamicIndex;
                    index++;
                }
            }
            var standartMass = Object.assign({}, helpMass);
            vm.yaMolodets = function () {
                var index = 0;
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        //debugger;
                        vm.mass[i][j].dynamicIndex = standartMass[index];
                        if (standartMass[index] == "") {
                            //debugger;
                            vm.mass[i][j].property = true;
                        } else {
                            vm.mass[i][j].property = false;
                        }
                        index++;
                    }
                }
                getFuckOutReturn = true;
                return;
            }

            helpMass.sort(function () {
                return 0.5 - Math.random()
            });
            //debugger;
            index = 0;
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    vm.mass[i][j].dynamicIndex = helpMass[index];
                    if (helpMass[index] == "") {
                        vm.mass[i][j].property = true;
                    } else {
                        vm.mass[i][j].property = false;
                    }
                    //debugger;
                    index++;

                }
            }
            $rootScope.$broadcast('beginGame', {});

            $scope.$watch(function () {
                return vm.mass;
            }, function (prev, next) {
                if (prev != next) {
                    var index = 0;
                    var myBool = true;
                    for (var i = 0; i < 4; i++) {
                        for (var j = 0; j < 4; j++) {
                            if (vm.mass[i][j].dynamicIndex != standartMass[index]) {
                                myBool = false;
                            }
                            index++;
                        }
                    }
                    if (myBool == true) {
                        //debugger;
                        //myBool = false;
                        alert('я молодец! ' + 'мое время:' + $scope.sec);
                        $rootScope.$broadcast('stopGame', {});
                    }
                }
            }, true);


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
                        } else {
                            if (vm.mass[i][j].dynamicIndex == to.dynamicIndex) {
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

            $scope.$watch(function () {
                return getFuckOutReturn;
            }, function () {
                if (getFuckOutReturn == true) {
                    debugger;
                    return;
                }
            }, true);

        }
    }]);

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

            extendeElem.keydown(function (event) {
                //debugger;
                var marc;
                switch (event.keyCode) {
                    case 37:  //LEFT
                    {
                        marc = info.staticIndex - 1;
                        break;
                    }
                    case 38: //UP
                    {
                        marc = info.staticIndex - 4;
                        break;
                    }
                    case 39:  //RIGHT
                    {
                        marc = info.staticIndex + 1;
                        break;
                    }
                    case 40:  //DOWN
                    {
                        marc = info.staticIndex + 4;
                        break;
                    }
                }
                if ((marc >= 1) && (marc <= 16)) {
                    //debugger;
                    $rootScope.$broadcast('myCustomEventKeydown', {
                        someProp: marc,
                        whoSay: info
                    });
                }
            });

            $rootScope.$on('myCustomEventKeydown', function (event, value) {
                if (info.staticIndex == value.someProp) {
                    debugger;
                    extendeElem.focus();
                    $rootScope.$broadcast('myCustomEventChangeColor', {
                        from: value.whoSay,
                        to: info
                    });
                }

            });

            $rootScope.$on('beginGame', function (event, value) {
                if (info.dynamicIndex == '') {
                    debugger;
                    $(element).focus();

                }
            });

            $rootScope.$on('myCustomEvent', function (event, value) {

                if (info.property == true) {
                    //debugger;
                    var str = info.staticIndex - value.someProp.staticIndex;

                    if (str == 1 || str == -1 || str == 4 || str == -4) {
                        console.log('access');
                        //debugger;
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

