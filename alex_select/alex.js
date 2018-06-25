var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog',

    function ($scope, $timeout, $http, $q, ngDialog) {
        var vm = this;


        vm.arrayA = ["bog", "poslal", "kusocheck", "huya"];
        vm.arrayB = ["ya", "durak", "i", "yeblan"];
        vm.getLeft = function(singleSelectB){
            if (singleSelectB != undefined && singleSelectB != null){
                if(vm.arrayB.indexOf(singleSelectB[0]) != -1){
                    vm.arrayB.splice(vm.arrayB.indexOf(singleSelectB[0]), 1);
                    vm.arrayA.push(singleSelectB[0]);
                }

            }
        }
        vm.getRight = function(singleSelectA){
            if (singleSelectA != undefined && singleSelectA != null){
                if(vm.arrayA.indexOf(singleSelectA[0]) != -1){
                    vm.arrayA.splice(vm.arrayA.indexOf(singleSelectA[0]), 1);
                    vm.arrayB.push(singleSelectA[0]);
                }
            }
        }


        console.info("alexCtrl created.")
    }
]);
