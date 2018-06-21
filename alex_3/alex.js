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
            var highlightPattern = "<span class='highlight'>$&</span>";
            var searchWords = searchPhrase.split(' ');

            _.forEach(searchWords, function (word, i) {
                var regEx = new RegExp('[\s]*(' + word + ')[\s]*', 'ig');
                innerHTML = innerHTML.replace(regEx, highlightPattern);
            });
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

