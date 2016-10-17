(function () {
    'use strict';

    angular.module('app').factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$rootScope', 'localStorageService'];
    function AuthenticationService($http, $rootScope, localStorageService) {
        var service = {};
		
		service.GetAccessToken = GetAccessToken;
        service.Login = Login;
        service.Logout = Logout;
        service.ForgotPassword = ForgotPassword;
        service.ClearCredentials = ClearCredentials;
        getConfigDetails();

        return service;
        
        /*
         * Get access token to call web API
         */
        function GetAccessToken() {
		    return $http({
			    method: 'GET',
			    url: $rootScope.configData.webApi +'genAppAuthToken',
			    headers: {'Content-Type': 'application/json'}
				});
		}
		/*
		 * Login the user
		 */
        function Login(credentials) {
            return $http({
                method: 'POST',
                url: $rootScope.configData.webApi + 'authenticateUser',
				data : JSON.stringify(credentials),
				cache:false,
				headers: { 'Content-Type': 'application/json' }
            });
        }
        
        /*
		 * Logout the user
		 */
        function Logout(data) {
            return $http({
                method: 'POST',
                url: $rootScope.configData.webApi + 'SignoutUser',
				data : JSON.stringify(data),
				cache:false,
				headers: { 'Content-Type': 'application/json' }
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
		 * Clear the user credentials
		 */
        function ClearCredentials() {
            $rootScope.globals = {};
            $http.defaults.headers.common.Authorization = 'Basic';
        }
        
        /*
         * Gets config details
         */
        function getConfigDetails() {
	        $http.get('config/config.json')
	        .success(function(data) {
	            $rootScope.configData=data;
	        })
	        .error(function(data,status,error,config){
	            $rootScope.configData = [{heading:"Error",description:"Could not load json   data"}];
	        });
	    }

    }

})();
