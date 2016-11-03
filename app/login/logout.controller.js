(function () {
    'use strict';

    angular
        .module('app')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$location', 'AuthenticationService', 'FlashService', '$rootScope'];
    function LogoutController($location, AuthenticationService, FlashService, $rootScope) {
        var vm = this;

        (function initController() {
        	Logout();
        })();		
        
        /*
         * Logout the user
         */
        function Logout() {
        	vm.dataLoading = true;
        	var data = {
        		from_prev_call : $rootScope.for_next_call,
        		uID : $rootScope.uID
        	};
        	AuthenticationService.Logout(data).then(function (response) {
        		vm.dataLoading = false;
        		if (response.data.errorMSG_internal !== 'DEFAULT_OK') {
        			$('.signout-error-message').html(response.data.errorMSG_user);
					FlashService.Error(response.data.errorMSG_user);
				} else {
					$('.navbar-default').addClass('hide');
					$location.path('/login');
				}
            }, function error(errorResponse) {
            	vm.dataLoading = false;
            	$('.signout-error-message').html(response.data.errorMSG_user);
				FlashService.Error($rootScope.configData.errorMessage);
			});
        }
        
        $('.signout').click(function(e) {
			Logout();
		});
    }

})();
