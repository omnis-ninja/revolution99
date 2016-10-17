(function() {
	'use strict';

	angular.module('app').controller('ProfilePageController', ProfilePageController);

	ProfilePageController.$inject = ['$rootScope', '$scope', 'UserprofileService'];
	function ProfilePageController($rootScope, $scope, UserprofileService) {
		var vm = this;

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
					$scope.showUserProfile = true;
					console.log(response);
					$scope.userProfile = response.data.userProfile;
				}
			});
		}

	}

})();
