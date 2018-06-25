var Alex_APP = angular.module("alexApp", ['ngDialog', 'ngResource']);

// injection - grishanyaFactory - function, someService - object
Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', '$resource',
    function ($scope, $timeout, $http, $q, ngDialog, $resource) {

        var vm = this;

        vm.getTranslation = function ($scope, language) {
            var languageFilePath = 'resources_' + language + '.json';
            console.log(languageFilePath);

            $resource(languageFilePath).get(function (data) {

                $scope.translation = data;

            });
        };

        vm.translate = function () {
            vm.getTranslation($scope, vm.selectedLanguage);
        };

        vm.selectedLanguage = 'en';
        vm.translate();
    }
]);

