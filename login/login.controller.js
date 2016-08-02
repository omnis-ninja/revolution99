(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
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
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    $location.path('/scheduledEventsCalendar');
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
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
