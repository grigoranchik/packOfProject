var Alex_APP = angular.module("alexApp", []);

// injection - grishanyaFactory - function, someService - object
Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q',
    function ($scope, $timeout, $http, $q) {
        var vm = this;


    }
]);

Alex_APP.directive('mySliderDirective', [function () {
    return {
        link: function (scope, element, attr) {
            var elem = $(element);
            scope.valueRoundSlider;


            /*elem.roundSlider({
                min: 0,
                max: 100,
                step: 1,
                value: null,
                radius: 85,
                width: 16,
                handleSize: "+16",
                startAngle: 0,
                endAngle: "+360",
                animation: true,
                showTooltip: true,
                editableTooltip: true,
                readOnly: false,
                disabled: false,
                keyboardAction: true,
                mouseScrollAction: false,
                sliderType: "min-range",
                circleShape: "full",
                handleShape: "dot",
                lineCap: "square",

                // events
                beforeCreate: null,
                create: null,
                start: null,
                drag: null,
                change: null,
                stop: null,
                tooltipFormat: null
            });*/
            elem.roundSlider({
                sliderType: "min-range",
                editableTooltip: false,
                radius: 105,
                width: 16,
                value: 75,
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
                scope.valueRoundSlider = e.value;
                console.log('scope.valueRoundSlider = ' + scope.valueRoundSlider);
            })


        }
    }
}]);
