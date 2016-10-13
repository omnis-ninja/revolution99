(function () {
    'use strict';

    angular
        .module('app')
        .controller('UpcomingEventsCalendarController', UpcomingEventsCalendarController);

    UpcomingEventsCalendarController.$inject = ['$rootScope', 'EventsService', '$scope', 'FlashService'];
    function UpcomingEventsCalendarController($rootScope, EventsService, $scope, FlashService) {
        var vm = this;
        
        vm.SubscribeToEvent = SubscribeToEvent;

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
						(response.data.month_events_list).pop();
						$scope.upcomingEvents = response.data.month_events_list;
						$scope.showUpcomingEvents = $scope.upcomingEvents[1].length > 0;
					}                    
                });
        }
        
        function SubscribeToEvent(eventDetails, event) {
        	event.stopPropagation();
        	console.log(eventDetails);
        	var eventTosubscribe = {
        		from_prev_call : $rootScope.for_next_call,
        		uID : $rootScope.uID,
        		event_row : {
        			eSEQ : eventDetails[0],
	        		eNum : eventDetails[1],
	        		eName : eventDetails[2],
	        		eLocation : eventDetails[3],
	        		eStart_date_time : eventDetails[4],
	        		eEnd_date_time : eventDetails[5],
	        		oType : eventDetails[6],
	        		oSkill : eventDetails[7] 
	        	}
        	};
        	console.log(eventTosubscribe);
        	EventsService.SubscribeToEvent(eventTosubscribe).then(function (response) {
        		$rootScope.for_next_call = response.data.for_next_call;
				$rootScope.uID = response.data.uID;
        		FlashService.Success(response.data.errorMSG_user);
        	});
        }
        
        $('.tab-list').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});

    }

})();
