(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$rootScope'];
    function LoginController($location, AuthenticationService, FlashService, $rootScope) {
        var vm = this;

        vm.login = login;
        vm.forgotPassword = forgotPassword;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

		/*
		 * Login the user
		 */
        function login() {
            vm.dataLoading = true;
            var username = vm.username;
            var password = vm.password;
			
            AuthenticationService.GetAccessToken().then(function successCallback(response) {
            	$rootScope.for_next_call = response.data.for_next_call;
            	$rootScope.next_code = response.data.next_code;
            	$rootScope.next_resp = response.data.next_resp;

            	var credentials = {
            		from_prev_call : $rootScope.for_next_call,
            		uName : username,
            		uPass : password
            	};
            	AuthenticationService.Login(credentials).then(function (response) {
					if(response.data.errorMSG_user !== '') {
						response = {
						success: false,
						message: 'Username or password is incorrect'
						};
						FlashService.Error(response.message);
						vm.dataLoading = false;
					} else {
						$rootScope.for_next_call = response.data.for_next_call;
						$rootScope.uID = response.data.uID;
						$location.path('/upcomingEventsCalendar');
						$rootScope.isSuccesfullyLoggedin = true;
						$('.navbar-default').removeClass('hide');
					}                    
                });
	        });
        };

		/*
		 * Forgot password functionality
		 */
        function forgotPassword() {
            vm.dataLoading = true;
            AuthenticationService.ForgotPassword(vm.badgeNumber, vm.email, function (response) {
                if (response.success) {
                    $location.path('/forgotPasswordSuccess');
                } else {
                    $location.path('/forgotPasswordSuccess');
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };

    }

})();
