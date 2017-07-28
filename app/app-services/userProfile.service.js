(function() {
	'use strict';

	angular.module('app').factory('UserprofileService', UserprofileService);

	UserprofileService.$inject = ['$http', '$rootScope'];

	function UserprofileService($http, $rootScope) {
		var service = {};
		service.GetPersonalDetails = GetPersonalDetails;
		service.UpdateProfile = UpdateProfile;

		return service;

		/*
		 * Get user profile details
		 */
		function GetPersonalDetails(data) {
			return $http({
				method : 'POST',
				url : $rootScope.configData.webApi + 'getUserProfile',
				data : JSON.stringify(data),
				headers: { 
					'Content-Type': 'application/json',
					'prev_code' : $rootScope.headers.next_code,
					'prev_resp' : $rootScope.headers.next_resp
					}
			});
		}

		/*
		 * Update user profile
		 */
		function UpdateProfile(userData) {
			return $http({
				method : 'POST',
				url : $rootScope.configData.webApi + 'setUserProfile',
				data : JSON.stringify(userData),
				headers: { 
					'Content-Type': 'application/json',
					'prev_code' : $rootScope.headers.next_code,
					'prev_resp' : $rootScope.headers.next_resp
					}
			});
		}

	}

})(); 