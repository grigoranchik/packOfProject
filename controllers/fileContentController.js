MY_TOTAL_APP.controller('fileContentController', ['$scope', '$timeout', '$http', '$q', 'ngDialog',

        function ($scope, $timeout, $http, $q, ngDialog) {
            var vm = this;
            debugger;
            console.info("created new instance of fileContentController..");


            vm.onClosePopupClicked = function () {
                alert('Oh .. shit');
            }
        }

    ]);
