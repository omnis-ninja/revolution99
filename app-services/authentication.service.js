(function () {
    'use strict';

    angular.module('app').factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', '$location'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, $location) {
        var service = {};

        service.Login = Login;
        service.ForgotPassword = ForgotPassword;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

		/*
		 * Login the user
		 */
        function Login(username, password, callback) {
            $http({
                method: 'POST',
                url: '/api/authenticate'
            }).then(function successCallback(response) {
                callback(response);
            }, function errorCallback(response) {
                response = {
                    success: false,
                    message: 'Username or password is incorrect'
                };
                callback(response);
            });
        }
		
		/*
		 * Forgot password functionality
		 */
        function ForgotPassword(badgeNumber, email, callback) {
            $http({
                method: 'POST',
                url: '/api/forgotPassword'
            }).then(function successCallback(response) {
                callback(response);
            }, function errorCallback(response) {
                response = {
                    success: false,
                    message: 'There is a problem resetting your password.Please contact support'
                };
                callback(response);
            });
        };
		
		/*
		 * Set the credentials for future use
		 */
        function SetCredentials(username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            $cookieStore.put('globals', $rootScope.globals);
        }
		
		/*
		 * Clear the user credentials
		 */
        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }

    }

})();
