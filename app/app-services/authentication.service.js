(function () {
    'use strict';

    angular.module('app').factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$rootScope'];
    function AuthenticationService($http, $rootScope) {
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
        function ForgotPassword(data) {
            return $http({
                method: 'POST',
                url: $rootScope.configData.webApi + 'changePassword',
                data : JSON.stringify(data),
				cache:false,
				headers: { 'Content-Type': 'application/json' }
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
