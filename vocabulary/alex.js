var Alex_APP = angular.module("alexApp", ['ngDialog']);

// injection - grishanyaFactory - function, someService - object
Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', '$window',
    function ($scope, $timeout, $http, $q, ngDialog, $window) {
        var vm = this;
        vm.resource = '';
        vm.controlArray = [];
        vm.helpForControlArray = [];
        vm.optionsLearnParam = ['10', '20', '30'];
        vm.selectArrayForLearn = [];
        vm.revertObj = {
            'engRu': {'inSelect': 1, 'forSecretWord': 4, 'inSelectFromTranslate': 2},
            'ruEng': {'inSelect': 4, 'forSecretWord': 1, 'inSelectFromTranslate': -1}
        }
        vm.revertRes = {'inSelect': 1, 'forSecretWord': 4, 'inSelectFromTranslate': 2};

        vm.setLearnParam = function (selectedElem) {
            var mass = JSON.parse($window.localStorage.getItem('mass'));
            if(mass != undefined){
                for(var i=0; i<mass.length; i++){
                    if(i<selectedElem){
                        vm.selectArrayForLearn[i] = mass[i];
                        vm.setSecretWord();
                    }else{
                        break;
                    }
                }
                alert('Количество выбранных вами слов для тренажера: ' + selectedElem + '');
            }else{
                alert('Заполните пожалуйста словарь');
            }

        }

        vm.setSecretWord = function () {
            vm.rand = Math.floor(Math.random() * vm.selectArrayForLearn.length);

        }
        vm.controlAnswerTheQuestion = function(selectedIndex, elem){
            //debugger;
            if(selectedIndex == vm.rand){
                vm.selectArrayForLearn[selectedIndex][5] = vm.selectArrayForLearn[selectedIndex][5] + 1;

                var mass = JSON.parse($window.localStorage.getItem('mass'));
                _.forEach(mass, function (word, i) {

                    if(vm.selectArrayForLearn[selectedIndex][0] == word[0]){

                        mass[i][5] = vm.selectArrayForLearn[selectedIndex][5];
                        $window.localStorage.setItem('mass', JSON.stringify(mass));
                    }
                });
                //vm.selectArrayForLearn = vm.selectArrayForLearn.splice(selectedIndex, 1);
                vm.setSecretWord();
                console.log('good!');
            }else{
                console.log('learn more');
            }
        }

        vm.nullAllResult = function(){
            var mass = JSON.parse($window.localStorage.getItem('mass'));
            _.forEach(vm.selectArrayForLearn, function (word, i) {
                word[5]=0;
            });
            _.forEach(mass, function (word, i) {
                word[5]=0;
            });
            $window.localStorage.setItem('mass', JSON.stringify(mass));
        }

        vm.nextBatchOfWords = function(selectedElem){
            //debugger;
            var flag = vm.selectArrayForLearn[vm.selectArrayForLearn.length - 1];
            var mass = JSON.parse($window.localStorage.getItem('mass'));
            if(flag != undefined){
                for(var i=0; i<mass.length; i++){
                    if(flag[1] == mass[i][1]){
                        //debugger;
                        vm.selectArrayForLearn = [];
                        for(var j=0; j < parseInt(selectedElem); j++){
                            if(mass.length >= i+j + 1){
                                vm.selectArrayForLearn[j] = mass[i+j + 1];

                            }else{
                                console.log('добавте слов');
                                break;
                            }
                        }

                    }
                }
                vm.setSecretWord();
            }
        }
        vm.previousBatchOfWords = function(selectedElem){
            var flag = vm.selectArrayForLearn[vm.selectArrayForLearn.length - 1];
            if(flag != undefined){
                var mass = JSON.parse($window.localStorage.getItem('mass'));
                for(var i=0; i<mass.length; i++){
                    if(flag[1] == mass[i][1]){
                        //debugger;
                        vm.selectArrayForLearn = [];
                        var myIndex = i-1;
                        for(var j=0; j < parseInt(selectedElem); j++){
                            //debugger
                            if(myIndex >=0){
                                vm.selectArrayForLearn[j] = mass[myIndex];
                                myIndex--;
                            }else{
                                break;
                            }
                        }

                    }
                }
                vm.setSecretWord();
            }
        }
        vm.revert = function(){
            if(vm.revertRes.inSelect == 1){
                vm.revertRes = vm.revertObj.ruEng;
            }else{
                vm.revertRes = vm.revertObj.engRu;
            }

        }

        vm.formattingResource = function () {
            vm.controlArray = [];
            vm.myObj = {};
            vm.helpForControlArray = [];
            vm.myVeryWellArray = ["предл.", "нареч.", "прил.",
                "союз", "мест.", "сущ.", "неопред.", "I", "гл.",
                "числ.", "геогр.", " —", " ;", " ."];
            var myRe = /(\d+\.\s*[a-zA-Z\']*\b) (\[([^\]]*)\]) (\-?.*$)/igm;

            var index = 0;
            while ((myArray = myRe.exec(vm.resource)) != null) {
                //debugger;
                vm.helpForControlArray[index] = myArray;
                //debugger;
                var myLittleReEngWord = new RegExp("([^\\s]*(\\w*)'(\\w*)[^\\s]*)|(\\w+)$", "igm");
                vm.helpForControlArray[index][1] = myLittleReEngWord.exec(vm.helpForControlArray[index][1])[0];
                vm.helpForControlArray[index][5] = 0;


                _.forEach(vm.myVeryWellArray, function (word, i) {

                    if(vm.helpForControlArray[index][4].indexOf(word) != -1){

                        vm.helpForControlArray[index][4] = vm.helpForControlArray[index][4].substring(word.length);
                    }
                });
                index++;
                //debugger;
            }
            index = 0;
            vm.controlArray = vm.helpForControlArray;
            vm.resource = null;
            vm.reviewLocalStorage();
        };


        vm.reviewLocalStorage = function () {
            //debugger;
            if ($window.localStorage.getItem('mass') == undefined) {
                $window.localStorage.setItem('mass', JSON.stringify(vm.controlArray));
            } else {
                var mass = JSON.parse($window.localStorage.getItem('mass'));
                for(var i_for_one=0; i_for_one < vm.controlArray.length; i_for_one++) {
                    var elemNotMustBePast = false;

                    for(var i_for_two=0; i_for_two < mass.length; i_for_two++) {
                        //debugger;
                        if (vm.controlArray[i_for_one][1] == mass[i_for_two][1]) {
                            elemNotMustBePast = true;
                        }

                    };
                    if (elemNotMustBePast == false) {
                        /*$window.localStorage.removeItem('mass');
                        debugger;*/
                        mass.splice(mass.length, 0, vm.controlArray[i_for_one]);
                        var myResStringify = JSON.stringify(mass);
                        //debugger;
                        $window.localStorage.setItem('mass', myResStringify);
                        //debugger;
                    }

                };
            }

        }

    }
]);
Alex_APP.filter('filterLimitGoodResult', [function () {
    return function (input, filterLimit, maxInfo) {
        //debugger;
        if(maxInfo <= filterLimit){
            return input;
        }

    };
}]);
