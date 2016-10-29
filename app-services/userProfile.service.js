(function() {
	'use strict';

	angular.module('app').factory('UserprofileService', UserprofileService);

	UserprofileService.$inject = ['$http', '$rootScope', 'localStorageService'];

	function UserprofileService($http, $rootScope, localStorageService) {
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
				headers : {
					'Content-Type' : 'application/json'
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
				headers : {
					'Content-Type' : 'application/json'
				}
			});
		}

	}

})(); 