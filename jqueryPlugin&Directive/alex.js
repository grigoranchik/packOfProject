var Alex_APP = angular.module("alexApp", []);

// injection - grishanyaFactory - function, someService - object
Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', '$rootScope',
    function ($scope, $timeout, $http, $q, $rootScope) {
        var vm = this;
        vm.mySliderValue;

        $rootScope.$on('myEvent', function (event, value) {
            vm.mySliderValue = value.someProp;
            console.log('mySliderValue: ' + vm.mySliderValue);
        });

    }
]);

Alex_APP.directive('mySliderDirective', ['$rootScope', function ($rootScope) {
    return {
        link: function (scope, element, attr) {

            var elem = $(element);
            var valueRoundSlider= 75;
            $rootScope.$broadcast('myEvent', {
                someProp: valueRoundSlider
            });

            elem.roundSlider({
                sliderType: "min-range",
                editableTooltip: false,
                radius: 105,
                width: 16,
                value: valueRoundSlider,
                handleSize: 0,
                handleShape: "square",
                circleShape: "pie",
                startAngle: 315,
                tooltipFormat: "changeTooltip"
            });

            function changeTooltip(e) {
                var val = e.value, speed;
                if (val < 20) speed = "Slow";
                else if (val < 40) speed = "Normal";
                else if (val < 70) speed = "Speed";
                else speed = "Very Speed";

                return val + " km/h" + "<div>" + speed + "<div>";
            }

            elem.on("change", function (e) {
                //debugger;
                $rootScope.$broadcast('myEvent', {
                    someProp: e.value
                });

            })


        }
    }
}]);
