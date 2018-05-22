angular.module("myApp",[]).controller('ctrlForTable', ['$scope', '$timeout', '$http', '$q',


    function ($scope, $timeout, $http, $q) {
        var vm = this;
    vm.pathTable = 'C://';
    vm.renderDataTable = [];
    vm.massIdexOf = [];
    vm.massTypeOf = [];
        $scope.$watch(function () {
            return vm.renderDataTable;
        }, function (newValue, oldValue) {
            var million = 1000000;
            for(var i = 0; i<newValue.length; i++){
                vm.massIdexOf[i] = million;
                million++;
            }
        });

        vm.onSendEnterInTable= function(val) {
        //debugger;
        if(val != 'UP'){//углубляемся в папку
            if(vm.pathTable == 'C://') {
                vm.pathTable +=val;
            } else {
                vm.pathTable += '//' + val;
            }
        } else{//выходим из нее
            if ((vm.pathTable.lastIndexOf("//") !=2)){
                vm.pathTable = vm.pathTable.substring(0, vm.pathTable.lastIndexOf("//"));
            } else
                vm.pathTable = vm.pathTable.substring(0, vm.pathTable.lastIndexOf("//")+2);
        }



       /* if(vm.pathTable == 'C://') {
            vm.pathTable +=val;
        } else {
            vm.pathTable += '//' + val;
        }
        if((val != 'UP') &&(vm.pathTable.lastIndexOf("//") != 2)){

        } else{
            debugger;
            if(vm.pathTable.lastIndexOf("//") != 2){
                vm.pathTable = vm.pathTable.substring(0, vm.pathTable.lastIndexOf("//")+2);
            }else{

            }

        }*/

        sendMessage();
    };


    vm.onUpDown = function(event, index, val){
        //debugger;
        switch(event.keyCode) {
            case 40:
                /*var bollDown = ((index +1) < vm.renderDataTable.length) || ((index) > vm.renderDataTable.length) && (index +1) < (vm.renderDataTable.length * 2);
                if(bollDown==true){*/
                if(index+1<vm.renderDataTable.length && index>=0){
                    document.getElementById(index+1).focus();
                }
                if(index-1000000+1<vm.massIdexOf.length && index-1000000>=0){
                    document.getElementById(index+1).focus();
                }

                /*};*/

                break;
            case 38:
                /*var bollUp = (index>0) && (((index)-vm.renderDataTable.length) != 0);
                if(bollUp==true){
                    //debugger;*/
                if(index<=vm.renderDataTable.length && index>0){
                    document.getElementById(index-1).focus();
                }
                if(index-1000000<=vm.massIdexOf.length && index-1000000>0){
                    document.getElementById(index-1).focus();
                }

                /*};*/
                break;

            case 37://jumpToLeftTable
                document.getElementById(0).focus();
                break;

            case 39://jumpToRightTable
                document.getElementById(1000000).focus();
                break;

            case 13://enter
                vm.onSendEnterInTable(val);
                if(index<=vm.renderDataTable.length && index>=0){
                    document.getElementById(0).focus();
                }
                if(index-1000000<=vm.massIdexOf.length && index-1000000>=0){
                    document.getElementById(1000000).focus();
                }
                break;

            /*default:

                break;*/
        }





    }

    vm.backTable = function () {
            if(vm.pathTable.lastIndexOf("//")>2){
                vm.pathTable = vm.pathTable.substring(0, vm.pathTable.lastIndexOf("//"));
            } else{
                vm.pathTable = vm.pathTable.substring(0, vm.pathTable.lastIndexOf("//")+2);
            }

            sendMessage();
    }
    vm.onSendMessTable = function () {
        sendMessage();
    };


    function sendMessage() {
        //debugger;
        var pathoftables = vm.pathTable;

        var promise = $http.post('/send_path', {newPath: pathoftables}, {});
        promise.then(function (response) {
            vm.renderDataTable = [];

            if(vm.pathTable != 'C://'){
                vm.renderDataTable[0] = 'UP';
                //debugger;
                if(response.data.newPath != undefined){
                    for(var i=0;i<response.data.newPath.length; i++){
                        vm.renderDataTable[i+1] = response.data.newPath[i];
                    }
                }
            } else{
                //debugger;
                vm.renderDataTable = response.data.newPath;
            }

        });
    }

    sendMessage();
}

]);
