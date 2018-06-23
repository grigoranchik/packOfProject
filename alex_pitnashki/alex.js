var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', '$rootScope', 'myFactory',

    function ($scope, $timeout, $http, $q, ngDialog, $rootScope, myFactory) {
        var vm = this;
        vm.dimensionOfTheGame;
        var myGame = new myFactory(4);
        vm.mass = myGame.mass;

        vm.newDimension = function(){
            vm.mass = myGame.initialize(vm.dimensionOfTheGame);
        }

        vm.startGame = function(){
            vm.mass = myGame.startGame();
        }

        vm.yaMolodets = function(){
            vm.mass = myGame.yaMolodets();
        }

        vm.clickNextStep = function(valueNextNumber){
            myGame.nextStepForClick(valueNextNumber);
        }

        vm.keydownNextStep = function(event){
            myGame.nextStepForKeydown(event);
        }
    }]);

Alex_APP.directive('emitDirective', ['$rootScope', function ($rootScope) {
    return {
        scope: {
            info: "=emitDirective"
        },
        link: function (scope, element, attr) {
            var extendeElem = $(element);
            var info = scope.info;


            $rootScope.$on('myCustomEventFocus', function (event, value) {
                if (info.staticIndex == value.someProp) {
                    //debugger;
                    extendeElem.focus();
                }
            });
        }
    }
}]);

