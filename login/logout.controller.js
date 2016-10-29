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
        	var data = {
        		from_prev_call : $rootScope.for_next_call,
        		uID : $rootScope.uID
        	};
        	AuthenticationService.Logout(data).then(function (response) {
                if (response.data.status !=200) {
                	$rootScope.isSuccesfullyLoggedin = true;
                	$('.navbar-default').addClass('hide');
                    $location.path('/login');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }
    }

})();
