var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog',

    function ($scope, $timeout, $http, $q, ngDialog) {
        var vm = this;

        vm.itemsArray = [];


        vm.loadMoreItems = function () {
            var startIdx = vm.itemsArray.length;
            for (var i = 0; i < 100; i++) {
                vm.itemsArray.push({
                    itemTitle: startIdx + " - " + Math.random()
                });
                startIdx++;
            }

            console.info("total number of items:  " + vm.itemsArray.length);
        };

        vm.loadMoreItems();
    }
]);
