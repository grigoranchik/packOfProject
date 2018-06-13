Alex_APP.directive('directiveTimer', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    return {
        link: function (scope, element, attr) {
            var seconds = 0;
            var min = 0;
            var hour = 0;
            var stopRec = false;
            scope.sec = '0';
            scope.display = function () {
                if (stopRec == false) {
                    if (seconds > 59) {
                        seconds = 0;
                        min += 1;
                    }
                    if (min > 59) {
                        min = 0;
                        hour += 1;
                    }
                    if (hour > 23) {
                        hour = 0;
                    }
                    seconds++;

                    scope.sec = hour + ":" + min + ":" + seconds;
                    $timeout(scope.display, 1000);

                } else {
                    //debugger;
                    scope.sec = '0';
                    seconds = 0;
                    min = 0;
                    hour = 0;
                    return;
                }

            };
            $rootScope.$on('beginGame', function (event, value) {
                //debugger;
                stopRec = false;
                scope.display();

            });
            $rootScope.$on('stopGame', function (event, value) {
                stopRec = true;

            });
        }
    }
}]);