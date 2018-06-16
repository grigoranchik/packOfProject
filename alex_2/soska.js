angular.module("sosiApp").service('sosiService', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {
    var srv = this;

    srv.giveMePososat = function (pososalCallBack) {

        setTimeout(function () {
            if (typeof pososal == 'function') {
                var nasosal = [{
                    nasosano: Math.random()
                }];
                console.info("Na konce: " + nasosal.nasosano);
                pososalCallBack(nasosal);
            } else {
                alert("Pshol nah.")
            }

        }, 600);

    };
}]);