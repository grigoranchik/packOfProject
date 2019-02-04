var Alex_APP = angular.module("alexApp", ['ngDialog']);

Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog',

    function ($scope, $timeout, $http, $q, ngDialog) {
        var vm = this;
        vm.selectedFile;
        $scope.image;
        /*if (window.File && window.FileReader && window.FileList && window.Blob) {
            alert('all right!');
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }*/

    }
]);

Alex_APP.directive('directiveOpenImg', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
    return {
        link: function (scope, element, attr) {
            var elem = $(element);
            debugger;
            elem.on('change', function () {
                var tmppath = URL.createObjectURL(event.target.files[0]);
                $("img").fadeIn("fast").attr('src', tmppath);
            });
        }
    }
}]);
