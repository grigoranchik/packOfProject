var Alex_APP = angular.module("alexApp", ['ngDialog']);

// injection - grishanyaFactory - function, someService - object
Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', 'grishanyaFactory',
    function ($scope, $timeout, $http, $q, ngDialog, grishanyaFactory) {
        var vm = this;

        var factoryInstanceG = new grishanyaFactory("Grishanya.");
        var factoryInstanceS = new grishanyaFactory("Sanya.");

        factoryInstanceG.someFunctionFromAlexWithLove();
    }
]);

Alex_APP.factory('grishanyaFactory', ['$rootScope', '$timeout', '$q',
    function ($rootScope, $timeout, $q) {

    var myFactoryFn = function (userName) {
        var srv = this;

        srv.userName = userName;

        srv.someFunctionFromAlexWithLove = function () {
            console.info("someFunctionFromAlexWithLove: " + srv.initArgument);
        }
    };

    return myFactoryFn;
}]);
