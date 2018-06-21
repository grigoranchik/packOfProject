var Dodge_App = angular.module("sosiApp", []).service('sosiService', ['$rootScope', '$timeout', '$q', function ($rootScope, $timeout, $q) {
    var srv = this;

    srv.giveMePososat = function (pososalCallBack) {

        setTimeout(function () {
            if (typeof pososalCallBack == 'function') {

                var nasosal = [{
                    nasosano: Math.random()
                }];
                //console.info("Na konce: " + nasosal[0].nasosano);
                //debugger;
                pososalCallBack(nasosal);
            } else {
                alert("Pshol nah.")
            }

        }, 600);

    };
}]);