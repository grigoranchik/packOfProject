angular.module("sosiApp").service('sosiService', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {
    var srv = this;

    srv.giveMePososat = function (pososal) {

        setTimeout(function () {
            if (typeof pososal == 'function') {
                var nasosal = [{
                    nasosano: Math.random()
                }];
                pososal();
            } else {
                alert("Pshol nah.")
            }

        }, 600);
    };
}]);