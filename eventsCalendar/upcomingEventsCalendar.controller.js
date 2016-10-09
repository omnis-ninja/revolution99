(function () {
    'use strict';

    angular
        .module('app')
        .controller('UpcomingEventsCalendarController', UpcomingEventsCalendarController);

    UpcomingEventsCalendarController.$inject = ['$rootScope', 'EventsService', '$scope', 'FlashService'];
    function UpcomingEventsCalendarController($rootScope, EventsService, $scope, FlashService) {
        var vm = this;

        (function initController() {
            GetAllEvents();
        })();

        function GetAllEvents() {
        	$scope.scheduledEvents = [];
        	$scope.upcomingEvents = [];
        	var eventDetails = {
        		cDate : '01/04/2016',
        		from_prev_call : $rootScope.for_next_call,
        		uID : $rootScope.uID
        	};
        	EventsService.GetAllEvents(eventDetails).then(function (response) {
					if(response.data.errorMSG_user !== '') {
						response = {
						success: false,
						message: 'Cannot fetch event details'
						};
						FlashService.Error(response.message);
						vm.dataLoading = false;
					} else {
						$rootScope.for_next_call = response.data.for_next_call;
						$rootScope.uID = response.data.uID;
						$scope.scheduledEvents = (response.data.month_events_list[3]);
						(response.data.month_events_list).pop();
						$scope.upcomingEvents = response.data.month_events_list;
						
					}                    
                });
        }
        
        $('.tab-list').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});

    }

})();
