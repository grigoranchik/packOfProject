var Alex_APP = angular.module("alexApp", ['ngDialog']);

// injection - grishanyaFactory - function, someService - object
Alex_APP.controller('alexCtrl', ['$scope', '$timeout', '$http', '$q', 'ngDialog', 'grishanyaFactory',
    function ($scope, $timeout, $http, $q, ngDialog, grishanyaFactory) {
        var vm = this;
        vm.secretWord ='';
        vm.rand;

        vm.mass = [
            ["about", "[ǝ\'baut]", "приблизительно", "около"],
            ["after", "[\'a:ftǝ]", "потом", "после"],
            ["again", "[ǝ\'ge(i)n]", "снова", "опять"],
            ["air", "[eǝ]", "воздух", "внешний вид"],
            ["all", "[ɔ:l]", "всё", "весь"],
            ["along", "[ǝ'lɔŋ]", "вдоль", "в соответствии"]
        ];
        vm.getRandom = function(){
            vm.rand = Math.floor(Math.random() * vm.mass.length);
            vm.secretWord = vm.mass[vm.rand][2];
        };
        vm.getRandom();

        vm.sendAnswer = function(index){
            //debugger;
            if(index == vm.rand){
                console.log('Right!');
                vm.getRandom();
            }else{
                console.log('learn continue..');
            }

        }
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
