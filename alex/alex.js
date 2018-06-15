var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', '$rootScope', 'myServis',

    function ($scope, $timeout, $http, $q, ngDialog, $rootScope, myServis) {
        var vm = this;
        vm.mass;
        vm.dimensionOfTheGame = 4;
        vm.newDimension = function () {
            myServis.initialize(vm.dimensionOfTheGame);
        }

        vm.newDimension();

        vm.newDimension = function (param) {
            var result = confirm('Вы действительно хотите поменять размерность?');
            if (rasult == true) {

            }
        }


    }]);

/*Alex_APP.directive('emitDirective', ['$rootScope', function ($rootScope) {
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

            /!*scope.nextStep = function(whoHave, whoWant){
                if (whoHave.property != whoWant.property) {
                    //debugger;
                    var str = whoHave.staticIndex - whoWant.staticIndex;

                    if (str == 1 || str == -1 || str == 4 || str == -4) {
                        console.log('access');
                        //debugger;
                        $rootScope.$broadcast('myCustomEventChangeColor', {
                            from: whoHave,
                            to: whoWant
                        });

                    } else {
                        console.log('no access');
                    }
                }
            }*!/

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
                    //debugger;
                    extendeElem.focus();
                    $rootScope.$broadcast('myCustomEventChangeColor', {
                        from: value.whoSay,
                        to: info
                    });
                }

            });

            $rootScope.$on('beginGame', function (event, value) {
                if (info.dynamicIndex == '') {
                    //debugger;
                    $(element).focus();

                }
            });
        }
    }
}]);*/

