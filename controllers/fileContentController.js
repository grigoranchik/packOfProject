MY_TOTAL_APP.controller('fileContentController', ['$scope', '$timeout', '$http', '$q', 'ngDialog',

    function ($scope, $timeout, $http, $q, ngDialog) {
        var vm = this;

        console.info("created new instance of fileContentController..");

        vm.onClosePopupClicked = function () {
            $scope.closeThisDialog();
        }
    }

]);


MESSAGE_SPA_APP.service('activeChatRoomRefreshService', ['$cookies', '$rootScope', '$timeout', '$q', 'chosenThreadVal', 'topicChatRoomFactory', 'messagingAppObserver', 'threadCrudService', 'messageListNavService', 'currentTopicVal', 'chatRoomActivatorService', 'spaWebSocketService', 'commonDms', function ($cookies, $rootScope, $timeout, $q, chosenThreadVal, topicChatRoomFactory, messagingAppObserver, threadCrudService, messageListNavService, currentTopicVal, chatRoomActivatorService, spaWebSocketService, commonDms) {
    var srv = this;
    /**
     *
     */
    PER_HOUR_STATS_NG_APP.directive('perHourSingleYearTableDirective', [function () {
        return {
            scope: {
                dataObj: '=perHourSingleYearTableDirective'
            },
            templateUrl: 'perHourSingleYearTable.html',
            link: function (scope, element, attr) {
                var dataCurrency = null;

                scope.closeDistributionAreas = function () {
                    _.fill(scope.distributionAreasToggled, false);
                };

                scope.formatCurrency = function (value) {
                    if (!value) {
                        return '-';
                    }
                    return XPL.XplLogic.Misc.globalJsFormatCurrencySymbol(value, dataCurrency)
                };

                scope.$watch('dataObj', renderTable());

                function renderTable() {
                    if (angular.isDefined(scope.dataObj)) {
                        dataCurrency = scope.dataObj.perHourStatsCurrency;

                        scope.tableData = angular.copy(scope.dataObj.perHourStatsCategoriesByYear[PER_HOUR_STATS_FOR_YEAR]);

                        scope.categoriesNames = _.reverse(scope.tableData.perHourStatsCategoriesNames);
                        scope.averages = _.reverse(scope.tableData.perHourStatsCategoriesAverages);
                        scope.bottom10Percentiles = _.reverse(scope.tableData.perHourStatsCategories10Percentiles);
                        scope.bottom25Percentiles = _.reverse(scope.tableData.perHourStatsCategories25Percentiles);
                        scope.medians = _.reverse(scope.tableData.perHourStatsCategoriesMedians);
                        scope.top10Percentiles = _.reverse(scope.tableData.perHourStatsCategories90Percentiles);
                        scope.top25Percentiles = _.reverse(scope.tableData.perHourStatsCategories75Percentiles);

                        scope.distributionAreasToggled = [scope.categoriesNames.length];
                        scope.closeDistributionAreas();
                    }
                }
            }
        }
    }]);