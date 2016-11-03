(function() {
	'use strict';

	angular.module('app').controller('ProfilePageController', ProfilePageController);

	ProfilePageController.$inject = ['$location', '$rootScope', '$scope', 'FlashService', 'UserprofileService'];
	function ProfilePageController($location, $rootScope, $scope, FlashService, UserprofileService) {
		var vm = this;
		vm.UpdateProfile = UpdateProfile;

		(function initController() {
			GetPersonalDetails();
		})();

		function GetPersonalDetails() {
			$scope.showUserProfile = false;
			var data = {
        		from_prev_call : $rootScope.for_next_call,
        		uID : $rootScope.uID
        	};
			UserprofileService.GetPersonalDetails(data).then(function(response) {
				if (response.data.errorMSG_user !== '') {
					response = {
						success : false,
						message : 'Cannot fetch user details'
					};
					FlashService.Error(response.message);
					vm.dataLoading = false;
				} else {
					$rootScope.for_next_call = response.data.for_next_call;
					$rootScope.uID = response.data.uID;
					$scope.showUserProfile = true;
					$scope.userProfile = response.data.userProfile;
				}
			}, function error(errorResponse) {
	        	FlashService.Error($rootScope.configData.errorMessage);
	        	$location.path('/login');
	        });
		}
		
		function UpdateProfile(userProfile) {			
			var userProfileData = {
        		from_prev_call : $rootScope.for_next_call,
        		uID : $rootScope.uID,
        		userProfile : userProfile
        	};

			UserprofileService.UpdateProfile(userProfileData).then(function(response) {
				if(response.data.errorMSG_internal !== 'DEFAULT_OK') {
					FlashService.Error(response.data.errorMSG_user);
					vm.dataLoading = false;
				} else {
					$rootScope.for_next_call = response.data.for_next_call;
					$rootScope.uID = response.data.uID;
					FlashService.Success(response.data.errorMSG_user !== '' ? response.data.errorMSG_user : 'user data updated successfully !!!');
				}
			}, function error(errorResponse) {
	        	FlashService.Error($rootScope.configData.errorMessage);
	        	$location.path('/login');
	        });
		}

	}

})();
