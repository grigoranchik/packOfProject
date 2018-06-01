angular.module("myApp", []).controller('ctrlForTable', ['$scope', '$timeout', '$http', '$q',


    function ($scope, $timeout, $http, $q) {
        var vm = this;

        console.info("created new instance of ctrlForTable..");
        vm.pathTable = 'C://';
        vm.renderDataTable = [];
        vm.massIdexOf = [];
        vm.massOfButton = 0;
        vm.haveLinkOfDir = '';

        $scope.$watch(function () {
            return vm.renderDataTable;
        }, function (newValue, oldValue) {
            var million = 1000000;
            for (var i = 0; i < newValue.length; i++) {
                vm.massIdexOf[i] = million;
                million++;
            }
        });

        vm.onHaveLinkOfDir = function (val) {
            //debugger;
            if(vm.pathTable == 'C://'){
                vm.haveLinkOfDir = vm.pathTable + val.renderFileName;
            } else {
                vm.haveLinkOfDir = vm.pathTable + '//' + val.renderFileName;
            }
        };

        vm.cleanLinkOfDir = function (){
            vm.haveLinkOfDir = '';
        };

        vm.tabElements = [/*{tabName: 'fuck'}, {tabName: 'beach'}*/];
        vm.onTabButtonClicked = function (selectedTabName) {
            vm.pathTable = selectedTabName;
            sendMessage();
            console.info('Select me: ' + selectedTabName);
        };

        vm.hideElem = function(){
            var a = document.body.children[3].children[0].children[1].children[1];

            a.style.display = 'none';

        };
        vm.showElem = function(){
            //console.log(document.body.children[3]);
            var a = document.body.children[3].children[0].children[1].children[1];

            a.style.display = 'block';

        };

        vm.onCloseTabButtonClicked = function (removingTabId) {
            console.info('Remove me : ' + removingTabId);

            vm.tabElements = _.filter(vm.tabElements, function(tabObject) {
                return tabObject.tabId !== removingTabId;
            })
        };

        vm.onGetLinkOfDir = function (){

            if(vm.haveLinkOfDir != ''){
                //debugger;
                var memberOFButtonLink = vm.haveLinkOfDir;
                var nameFile = vm.haveLinkOfDir.substring(vm.haveLinkOfDir.lastIndexOf("//") + 2, vm.haveLinkOfDir.length);

                vm.tabElements.push({tabName:nameFile, tabAddress: vm.haveLinkOfDir, tabId: new Date().getTime()});

                vm.haveLinkOfDir = '';
            }

        };

        vm.onSendEnterInTable = function (val) {
            //debugger;
            if (val.renderFileName != 'UP') {//углубляемся в папку
                if (vm.pathTable == 'C://') {
                    vm.pathTable += val.renderFileName;
                } else {
                    vm.pathTable += '//' + val.renderFileName;
                }
            } else {//выходим из нее
                if ((vm.pathTable.lastIndexOf("//") != 2)) {
                    vm.pathTable = vm.pathTable.substring(0, vm.pathTable.lastIndexOf("//"));
                } else
                    vm.pathTable = vm.pathTable.substring(0, vm.pathTable.lastIndexOf("//") + 2);
            }

            sendMessage();
        };


        vm.onUpDown = function (event, index, val) {
            //debugger;
            switch (event.keyCode) {
                case 40:
                    /*var bollDown = ((index +1) < vm.renderDataTable.length) || ((index) > vm.renderDataTable.length) && (index +1) < (vm.renderDataTable.length * 2);
                    if(bollDown==true){*/
                    if (index + 1 < vm.renderDataTable.length && index >= 0) {
                        document.getElementById(index + 1).focus();
                    }
                    if (index - 1000000 + 1 < vm.massIdexOf.length && index - 1000000 >= 0) {
                        document.getElementById(index + 1).focus();
                    }

                    /*};*/

                    break;
                case 38:
                    /*var bollUp = (index>0) && (((index)-vm.renderDataTable.length) != 0);
                    if(bollUp==true){
                        //debugger;*/
                    if (index <= vm.renderDataTable.length && index > 0) {
                        document.getElementById(index - 1).focus();
                    }
                    if (index - 1000000 <= vm.massIdexOf.length && index - 1000000 > 0) {
                        document.getElementById(index - 1).focus();
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
                    vm.pressEnter(event, index, val);
                    break;

                case 46://del
                    vm.pressDelete(event, index, val);
                    break;

            }


        }

        vm.responseInformation = '';
        $scope.div = document.body.children[2];
        $scope.$watch(function () {
            return vm.responseInformation;
        }, function (newValue, oldValue) {
            if(vm.responseInformation != ''){
                /*var a = document.body.children[2].children[0].children[1].children[1];
                a.style.display = 'none';*/
                debugger;
                $scope.div.style.display = 'block';
            } else{
                $scope.div.style.display = 'none';
            }

        });
        vm.mainKeyDown = function (event, index, val) {
            //debugger;
            switch (event.keyCode) {
                case 114: //f3 View
                    event.stopPropagation(); //cancelBubble = true;
                    event.preventDefault();
                    //debugger;
                    var path;
                    if(vm.pathTable != 'C://') {
                        path = vm.pathTable + '//' + val.renderFileName;
                    } else{
                        path = vm.pathTable + val.renderFileName;
                    }

                    var promise = $http.post('/view', {newPath: path}, {});
                    promise.then(function (response) {
                        //window.open();                                          //??
                        vm.responseInformation = response.data;
                        debugger;

                    });

                    //console.log('document.activeElement', document.activeElement);


                    break;
                case 115: //f4 Edit

                    break;

                case 116://f5 Copy
                    document.getElementById(0).focus();
                    break;

                case 117://f6 Move
                    document.getElementById(1000000).focus();
                    break;

                case 118://f7 New Folder
                    debugger;

                    if(val.typeOfFile == 'folder'){
                        var path;
                        if(vm.pathTable != 'C://') {
                            path = vm.pathTable + '//' + val.renderFileName;
                        } else{
                            path = vm.pathTable + val.renderFileName;
                        }
                        var promise = $http.post('/makeNewFolder', {newPath: path}, {});
                        promise.then(function (response) {
                            //window.open();                                          //??
                            alert('папку успешно созданна');

                        });
                    }else{
                        alert('создать файл можно только в папке');
                    }

                    break;

                case 119://f8 Del
                    vm.pressDelete(event, index, val);
                    break;

            }


        }

        vm.pressEnter = function(event, index, val){
            vm.onSendEnterInTable(val);
            if (index <= vm.renderDataTable.length && index >= 0) {
                document.getElementById(0).focus();
            }
            if (index - 1000000 <= vm.massIdexOf.length && index - 1000000 >= 0) {
                document.getElementById(1000000).focus();
            }
        };
        vm.pressDelete = function(event, index, val){
            if (val.renderFileName != 'UP') {
                debugger;
                var pathSend;
                if(vm.pathTable == 'C://') {
                    pathSend = vm.pathTable + val.renderFileName;
                } else{
                    pathSend = vm.pathTable + '//' + val.renderFileName;
                }
                var promise = $http.post('/del', {
                    newPathDel: pathSend,
                    typeOfFile: val.typeOfFile

                }, {});
                promise.then(function (response) {
                    sendMessage();
                });
            }
        };


        vm.backTable = function () {
            if (vm.pathTable.lastIndexOf("//") > 2) {
                vm.pathTable = vm.pathTable.substring(0, vm.pathTable.lastIndexOf("//"));
            } else {
                vm.pathTable = vm.pathTable.substring(0, vm.pathTable.lastIndexOf("//") + 2);
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
                if (vm.pathTable != 'C://') {
                    vm.renderDataTable[0] = {renderFileName: 'UP', typeOfFile: ''};
                    //debugger;
                    if (response.data.newPath != undefined) {
                        for (var i = 0; i < response.data.newPath.length; i++) {
                            vm.renderDataTable[i + 1] = {
                                renderFileName: response.data.newPath[i],
                                typeOfFile: response.data.massOfTypeFiles[i].characteristic
                            };
                        }
                    }
                } else {
                    //debugger;
                    for (var i = 0; i < response.data.newPath.length; i++) {
                        vm.renderDataTable[i] = {
                            renderFileName: response.data.newPath[i],
                            typeOfFile: response.data.massOfTypeFiles[i].characteristic
                        };
                    }
                }

            });
        }

        sendMessage();
    }

]);
