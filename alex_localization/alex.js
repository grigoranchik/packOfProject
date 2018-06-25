var Alex_APP = angular.module("alexApp", ['ngDialog', 'ngResource']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', '$resource',
    function ($scope, $timeout, $http, $q, ngDialog, $resource) {

        var vm = this;

        vm.selectedLanguage = 'en';

        vm.translate = function () {
            var languageFilePath = 'resources_' + vm.selectedLanguage + '.json';
            console.log(languageFilePath);

            $resource(languageFilePath).get(function (data) {
                vm.translation = data;
            });
        };

        vm.translate();
    }
]);

