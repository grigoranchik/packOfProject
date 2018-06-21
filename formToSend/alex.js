var Alex_APP = angular.module("alexApp", []);

// injection - grishanyaFactory - function, someService - object
Alex_APP.controller('myCtrl', ['$scope', '$timeout', '$http', '$q',
    function ($scope, $timeout, $http, $q, ngDialog, grishanyaFactory) {
        var vm = this;

        var currentTab = 0; // Current tab is set to be the first tab (0)
        $scope.mucduk = {
            websiteAddress: '',
            name1: '',
            name2: '',
            email: ''
        }


        $scope.fixStepIndicator = function(n) {
            // This function removes the "active" class of all steps...
            var i, x = document.getElementsByClassName("step");
            for (i = 0; i < x.length; i++) {
                x[i].className = x[i].className.replace(" active", "");
            }
            //... and adds the "active" class on the current step:
            x[n].className += " active";
        }

        $scope.showTab = function(n) {
            // This function will display the specified tab of the form...
            var x = document.getElementsByClassName("tab");
            x[n].style.display = "block";
            //... and fix the Previous/Next buttons:
            if (n == 0) {
                document.getElementById("prevBtn").style.display = "none";
            } else {
                document.getElementById("prevBtn").style.display = "inline";
            }
            if (n == (x.length - 1)) {
                document.getElementById("nextBtn").innerHTML = "Submit";
            } else {
                document.getElementById("nextBtn").innerHTML = "Next";
            }
            //... and run a function that will display the correct step indicator:
            $scope.fixStepIndicator(n);
        }
        $scope.showTab(currentTab); // Display the crurrent tab

        $scope.nextPrev = function(n) {
            $scope.mucduk;
            // This function will figure out which tab to display
            var x = document.getElementsByClassName("tab");
            debugger;
            // Exit the function if any field in the current tab is invalid:
            if (n == 1 && !$scope.validateForm()) return false;
            // Hide the current tab:
            x[currentTab].style.display = "none";
            // Increase or decrease the current tab by 1:
            currentTab = currentTab + n;
            // if you have reached the end of the form...
            if (currentTab >= x.length) {
                // ... the form gets submitted:
                document.getElementById("regForm").submit();
                return false;
            }
            // Otherwise, display the correct tab:
            $scope.showTab(currentTab);
        }

        $scope.validateForm = function() {
            // This function deals with validation of the form fields
            var x, y, i, valid = true;
            x = document.getElementsByClassName("tab");
            y = x[currentTab].getElementsByTagName("input");
            // A loop that checks every input field in the current tab:
            for (i = 0; i < y.length; i++) {
                // If a field is empty...
                if (y[i].value == "") {
                    // add an "invalid" class to the field:
                    y[i].className += " invalid";
                    // and set the current valid status to false
                    valid = false;
                }
            }
            // If the valid status is true, mark the step as finished and valid:
            if (valid) {
                document.getElementsByClassName("step")[currentTab].className += " finish";
            }
            return valid; // return the valid status
        }

    }
]);

