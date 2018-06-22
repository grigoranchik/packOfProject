var Alex_APP = angular.module("alexApp", []);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q',

    function ($scope, $timeout, $http, $q) {
        var vm = this;
        vm.myModel_1;

        console.info("alexCtrl created.")
    }
]);

Alex_APP.filter('myFilter', ['$sce', function ($sce) {
    return function (input, searchPhrase) {

        var innerHTML = input;

        if (input != undefined && searchPhrase != undefined) {
            var searchWords = searchPhrase.split(' ');
            var highlightPatternString = '';
            var RegExpString = '';

            var past = 1;
            _.forEach(searchWords, function (word, i) {


                if (word == undefined) {
                    return;
                }

                RegExpString = RegExpString + '([\s]*(' + word + ')[\s]*)|';
                highlightPatternString = highlightPatternString + "<span class='highlight'>$" + past + "</span>";
                past = past + 2;
                //debugger;
                //'test'.replace(/(t)(es)(t)/, '$1_$2_$3')
            });
            //debugger;

            var regEx = new RegExp(RegExpString.substring(0, RegExpString.length - 1), 'ig');
            innerHTML = innerHTML.replace(regEx, highlightPatternString);


        }

        return $sce.trustAsHtml(innerHTML);
    }
}]);

Alex_APP.filter('myFilter1', ['$sce', function ($sce) {
    return function (input) {
        var innerHTML = [];

        if (input != undefined) {
            var mag = "<span class='highlight'>$1</span>";
            myMigracie = new RegExp(/<.+>/g, 'g');
            var innerHTML = input.match(myMigracie);
            //debugger;

            if (input.match(myMigracie) != null) {
                return $sce.trustAsHtml(innerHTML.join('/'));
            }
        }
    }
}]);

