(function () {
    'use strict';

    angular
        .module('app')
        .controller('ScheduledEventsCalendarController', ScheduledEventsCalendarController);

    ScheduledEventsCalendarController.$inject = ['$rootScope', 'EventsService', '$scope', 'FlashService'];
    function ScheduledEventsCalendarController($rootScope, EventsService, $scope, FlashService) {
        var vm = this;
		
		(function initController() {
            GetAllEvents();
        })();

        function GetAllEvents() {
        	$scope.scheduledEvents = [];
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
						$scope.showScheduledEvents = $scope.scheduledEvents[1].length > 0;	
					}                    
                });
        }

    }

})();
