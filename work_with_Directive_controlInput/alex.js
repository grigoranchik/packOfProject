var Alex_APP = angular.module("alexApp", ['ngDialog']);

// injection - grishanyaFactory - function, someService - object
Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', '$rootScope',
    function ($scope, $timeout, $http, $q, ngDialog, $rootScope) {
        var vm = this;
        vm.myInputModel;
    }
]);

Alex_APP.directive('myControlDirective', ['$rootScope', function ($rootScope) {
    return {
        scope: {
            info: "=myControlDirective"
        },
        link: function (scope, element, attr) {

            var elem = $(element);

            //debugger;

            elem.on('input keyup', function (e) { // це не ангуларна функція - треба повідомити ангулар що були зміни jr)

                var inputName = scope.info;

                var regEx = new RegExp('[а-яіїє]+', 'ig');

                inputName = inputName.substr(inputName.length - 1, 1);
                //debugger;
                var regEx_2 = new RegExp('[^ыъ]', 'ig');

                if (regEx_2.test(inputName) != true) {
                    inputName = scope.info.substr(0, scope.info.length - 1);
                    //debugger;
                } else {
                    //debugger;
                    var myArray = inputName.toLowerCase().match(regEx);
                    if (myArray != null) {
                        //debugger;
                        inputName = scope.info.substr(0, scope.info.length - 1) + myArray[0];
                    } else {
                        //debugger;
                        inputName = scope.info.substr(0, scope.info.length - 1);
                    }
                }

                scope.info = inputName;
                var watcherStop = $rootScope.$watch(function () {
                    return scope.info;
                }, function (prev, next) {
                    scope.$apply();
                });
                watcherStop();



            });
        }
    }
}]);