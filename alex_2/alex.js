var Alex_APP = angular.module("alexApp", ['ngDialog', 'sosiApp']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', 'sosiService', '$rootScope',

    function ($scope, $timeout, $http, $q, ngDialog, sosiService, $rootScope) {
        var vm = this;
        vm.responsSucking='';

        $rootScope.$on('getData', function (event, value) {
            //debugger;
            vm.responsSucking = value.someInfo[0].nasosano;
            $scope.$apply();

        });

        vm.getFuckOut = function(elem){
            //debugger;
            $rootScope.$broadcast('getData', {
                someInfo: elem
            });
        }

        vm.myButtonClick = function(){
            sosiService.giveMePososat(vm.getFuckOut);
        }
    }
]);

