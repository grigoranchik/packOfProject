Alex_APP.factory('myFactory', ['$timeout', '$q', '$http', '$rootScope', function ($timeout, $q, $http, $rootScope) {

    var myFactoryFn = function (dimensions) {
        var srv = this;
        srv.dimensionOfTheGame = dimensions;
        srv.standartMass = [];
        srv.helpMass = [];
        srv.mass;

        srv.initialize = function () {
            srv.mass = new Array(srv.dimensionOfTheGame);

            var index = 1;
            var i, j;
            for (i = 0; i < srv.dimensionOfTheGame; i++) {
                srv.mass[i] = new Array(srv.dimensionOfTheGame);
            }
            for (i = 0; i < srv.dimensionOfTheGame; i++) {
                for (j = 0; j < srv.dimensionOfTheGame; j++) {
                    srv.mass[i][j] = {
                        staticIndex: index,
                        dynamicIndex: index,
                        property: false
                    };
                    index++;
                }
            }
            i--;
            j--;
            srv.mass[i][j].property = true;
            srv.mass[i][j].dynamicIndex = '';
            console.log(srv.mass[i][j]);
            console.log('создан массив объектов:', srv.mass);
        };

        srv.initialize();

        srv.initialize = function (param) {
            var result = confirm('Вы действительно хотите поменять размерность?');
            if (result == true) {
                srv.dimensionOfTheGame = param;
                srv.mass = new Array(srv.dimensionOfTheGame);

                var index = 1;
                for (var i = 0; i < srv.dimensionOfTheGame; i++) {
                    srv.mass[i] = new Array(srv.dimensionOfTheGame);
                }
                for (var i = 0; i < srv.dimensionOfTheGame; i++) {
                    for (var j = 0; j < srv.dimensionOfTheGame; j++) {
                        srv.mass[i][j] = {
                            staticIndex: index,
                            dynamicIndex: index,
                            property: false
                        };
                        index++;
                    }
                }
                i--;
                j--;
                srv.mass[i][j].property = true;
                srv.mass[i][j].dynamicIndex = '';
                console.log('создан массив объектов:', srv.mass);
                srv.makeStandartAndHelpMass();
            }
            return srv.mass;
        };

        srv.makeStandartAndHelpMass = function () {

            var index = 0;
            var i, j;
            for (i = 0; i < srv.dimensionOfTheGame; i++) {
                for (j = 0; j < srv.dimensionOfTheGame; j++) {
                    srv.standartMass[index] = srv.mass[i][j].dynamicIndex;
                    srv.helpMass[index] = srv.mass[i][j].dynamicIndex;
                    index++;
                }
            }


            if (srv.dimensionOfTheGame * srv.dimensionOfTheGame < srv.standartMass.length) {
                debugger;
                srv.standartMass.splice(srv.dimensionOfTheGame * srv.dimensionOfTheGame, srv.standartMass.length - srv.dimensionOfTheGame * srv.dimensionOfTheGame); // начиная с позиции 1, удалить 1 элемент
                srv.helpMass.splice(srv.dimensionOfTheGame * srv.dimensionOfTheGame, srv.helpMass.length - srv.dimensionOfTheGame * srv.dimensionOfTheGame);
                debugger;
            }
        }
        srv.makeStandartAndHelpMass();

        srv.replaseObject = function(main, next){
            var main1 = Object.assign({}, main);
            var next1 = Object.assign({}, next);
            //debugger;
            for (var i = 0; i < srv.dimensionOfTheGame; i++) {
                for (var j = 0; j < srv.dimensionOfTheGame; j++) {
                    //debugger;
                    if (srv.mass[i][j].staticIndex == main1.staticIndex) {
                        //debugger;
                        srv.mass[i][j].property = false;
                        srv.mass[i][j].dynamicIndex = next1.dynamicIndex;
                    }
                    if (srv.mass[i][j].staticIndex == next1.staticIndex) {
                        //debugger;
                        srv.mass[i][j].property = true;
                        srv.mass[i][j].dynamicIndex = main1.dynamicIndex;
                        $rootScope.$broadcast('myCustomEventFocus', {
                            someProp: srv.mass[i][j].staticIndex
                        });
                    }
                }
            }
        }
        srv.nextStepForClick = function (valueNextNumber) {
            var index = 0;
            var main = srv.convertDataToTwoObjOfClick(valueNextNumber).a;
            var next = srv.convertDataToTwoObjOfClick(valueNextNumber).b;

            var next_i, next_j, main_i, main_j;
            for (var i = 0; i < srv.dimensionOfTheGame; i++) {
                for (var j = 0; j < srv.dimensionOfTheGame; j++) {
                    //debugger;
                    if (srv.mass[i][j].dynamicIndex == '') {
                        main_i = i;
                        main_j = j;
                    }

                    if (srv.mass[i][j].dynamicIndex == next.dynamicIndex) {
                        next_i = i;
                        next_j = j;
                    }
                }
            }
            var myLog = ((main_i == next_i) && (Math.abs(main_j - next_j)>=0) && (Math.abs(main_j - next_j)<=1)) || ((main_j == next_j) && (Math.abs(main_i - next_i)>=0) && (Math.abs(main_i - next_i)<=1))

            if (myLog == true) {
                srv.replaseObject(main, next);
                console.log('access');
            } else {
                console.log('no access');
            }
        }

        srv.convertDataToTwoObjOfClick = function (valueNextNumber) {
            var main, next;
            for (var i = 0; i < srv.dimensionOfTheGame; i++) {
                for (var j = 0; j < srv.dimensionOfTheGame; j++) {
                    //debugger;
                    if (srv.mass[i][j].dynamicIndex == '') {
                        main = Object.assign({}, srv.mass[i][j]);
                    }
                    if (srv.mass[i][j].staticIndex == valueNextNumber) {
                        next = Object.assign({}, srv.mass[i][j]);
                    }
                }
            }
            return {a: main, b: next}
        }

        srv.nextStepForKeydown = function (event) {
            var main, next;
            var next_i, next_j;
            for (var i = 0; i < srv.dimensionOfTheGame; i++) {
                for (var j = 0; j < srv.dimensionOfTheGame; j++) {
                    if (srv.mass[i][j].dynamicIndex == '') {
                        main = srv.mass[i][j];
                        next_i = i;
                        next_j = j;
                    }
                }
            }

            switch (event.keyCode) {
                case 37:  //LEFT
                {
                    --next_j;
                    break;
                }
                case 38: //UP
                {
                    --next_i;
                    break;
                }
                case 39:  //RIGHT
                {
                    ++next_j;
                    break;
                }
                case 40:  //DOWN
                {
                    ++next_i;
                    break;
                }
            }
            if ((next_i >= 0) && (next_i < srv.dimensionOfTheGame ) && (next_j >= 0) && (next_j < srv.dimensionOfTheGame )) {
                for (var i = 0; i < srv.dimensionOfTheGame; i++) {
                    for (var j = 0; j < srv.dimensionOfTheGame; j++) {
                        if ((i == next_i) &&(j == next_j)) {
                            next = srv.mass[i][j];
                        }
                    }
                }
                srv.replaseObject(main, next);
            }
        }

        srv.shuffle = function () {
            var index = 0;

            srv.helpMass.sort(function () {
                return 0.5 - Math.random()
            });
            debugger;

            for (var i = 0; i < srv.dimensionOfTheGame; i++) {
                for (var j = 0; j < srv.dimensionOfTheGame; j++) {
                    srv.mass[i][j].dynamicIndex = srv.helpMass[index];
                    if (srv.helpMass[index] == "") {
                        srv.mass[i][j].property = true;
                    } else {
                        srv.mass[i][j].property = false;
                    }
                    index++;
                }
            }
        }

        srv.startGame = function () {
            srv.shuffle();
            $rootScope.$broadcast('beginGame', {});

            var watcherStop = $rootScope.$watch(function () {
                return srv.mass;
            }, function (prev, next) {
                var index = 0;
                var myBool = true;
                for (var i = 0; i < srv.dimensionOfTheGame; i++) {
                    for (var j = 0; j < srv.dimensionOfTheGame; j++) {
                        //debugger;
                        if (srv.mass[i][j].dynamicIndex != srv.standartMass[index]) {
                            myBool = false;
                        }
                        index++;
                    }
                }
                if (myBool == true) {
                    $rootScope.$broadcast('stopGame', {});
                    watcherStop();
                }
            }, true);
            return srv.mass;
        }

        srv.yaMolodets = function () {
            var index = 0;
            for (var i = 0; i < srv.dimensionOfTheGame; i++) {
                for (var j = 0; j < srv.dimensionOfTheGame; j++) {
                    srv.mass[i][j].dynamicIndex = srv.standartMass[index];
                    if (srv.standartMass[index] == "") {
                        srv.mass[i][j].property = true;
                    } else {
                        srv.mass[i][j].property = false;
                    }
                    index++;
                }
            }
            debugger;
            return srv.mass;
        }
    }
    return myFactoryFn;

}]);
