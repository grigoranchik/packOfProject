Alex_APP.service('myServis', ['$timeout', '$q', '$http', '$rootScope', function ($timeout, $q, $http, $rootScope) {

    var srv = this;
    srv.dimensionOfTheGame;
    srv.standartMass = [];
    srv.helpMass = [];
    srv.mass;

   /* $timeout(function () {
        $scope.$apply();
    })*/

    srv.initialize = function (param) {
        srv.dimensionOfTheGame = param;
        srv.mass = new Array(param);

        var index = 1;
        for (var i = 0; i < param; i++) {
            srv.mass[i] = new Array(param);
        }
        for (var i = 0; i < param; i++) {
            for (var j = 0; j < param; j++) {
                srv.mass[i][j] = {
                    staticIndex: index,
                    dynamicIndex: index,
                    property: false
                };
                index++;
            }
        }
        srv.mass[param][param].property = true;
        srv.mass[param][param].dynamicIndex = '';
        console.log('создан массив объектов:', srv.mass);
    };

    srv.nextStepFunc = function (main, next) { //main, next <-> srv.mass[i][j].staticIndex
        var index = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                //debugger;
                if (vm.mass[i][j].staticIndex == main.staticIndex) {
                    //debugger;
                    vm.mass[i][j].property = false;
                    vm.mass[i][j].dynamicIndex = next.dynamicIndex;
                }
                if (vm.mass[i][j].staticIndex == next.staticIndex) {
                    //debugger;
                    vm.mass[i][j].property = true;
                    vm.mass[i][j].dynamicIndex = main.dynamicIndex;
                }
            }
        }
    }

    srv.makeStandartAndHelpMass = function () {
        var index = 0;
        for (var i = 0; i < srv.dimensionOfTheGame; i++) {
            for (var j = 0; j < srv.dimensionOfTheGame; j++) {
                srv.standartMass[index] = vm.mass[i][j].dynamicIndex;
                srv.helpMass[index] = vm.mass[i][j].dynamicIndex;
                index++;
            }
        }

    }

    srv.shuffle = function () {
        var index = 0;

        srv.helpMass.sort(function () {
            return 0.5 - Math.random()
        });

        for (var i = 0; i < srv.dimensionOfTheGame; i++) {
            for (var j = 0; j < srv.dimensionOfTheGame; j++) {
                vm.mass[i][j].dynamicIndex = srv.helpMass[index];
                if (srv.helpMass[index] == "") {
                    vm.mass[i][j].property = true;
                } else {
                    vm.mass[i][j].property = false;
                }
                index++;
            }
        }
    }

    srv.startGame = function (param) {
        //srv.initialize(param);

        var watcherStop = $scope.$watch(function () {
            return srv.mass;
        }, function (prev, next) {
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
                alert('я молодец! ' + 'мое время:');
                watcherStop();
            }
        }, true);
    }

    srv.yaMolodets = function () {
        var index = 0;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                //debugger;
                vm.mass[i][j].dynamicIndex = srv.standartMass[index];
                if (standartMass[index] == "") {
                    //debugger;
                    vm.mass[i][j].property = true;
                } else {
                    vm.mass[i][j].property = false;
                }
                index++;
            }
        }
    }

}]);
