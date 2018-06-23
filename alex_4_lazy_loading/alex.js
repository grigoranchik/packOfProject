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


Alex_APP.directive('whenScrolled', function ($window) {
    return function (scope, elm, attr) {

        var raw = elm[0];
        var elem = $(elm);
        //debugger;
        elem.scroll(function() {
            //console.log("Вы прокрутили содержимое маленького окна, .scrollTop = ", + elem.scrollTop() + ' $(\'.myClass\').offset().top= ' + $('.myClass').offset().top + ' elem.height()= ' + elem.height() + ' elem.offset().top' + elem.offset().top);
            if(elem.find('button').offset().top < elem.height() + elem.offset().top){
                scope.$apply(attr.whenScrolled);
            }
        });

        angular.element($window).on("scroll", function() {
            //console.log('$(document).scrollTop()= ' + $(document).scrollTop() + ' $(window).height()' + $(window).height() + ' $(\'#mainPage\').offset().top ' + $('#mainPage').offset().top + ' $(\'#mainPage\').height() ' + $('#mainPage').height());
            if ($(document).scrollTop() + $(window).height() > $('#mainPage').offset().top && $(document).scrollTop() - $('#mainPage').offset().top < $('#mainPage').height()){
                scope.$apply(attr.whenScrolled);
            }
            else{
                console.log('not');
            }
            //scope.$apply(); -- ??
        });

    };
});
