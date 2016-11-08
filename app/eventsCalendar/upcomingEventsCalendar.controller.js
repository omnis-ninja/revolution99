(function() {
	'use strict';

	angular.module('app').controller('UpcomingEventsCalendarController', UpcomingEventsCalendarController);

	UpcomingEventsCalendarController.$inject = ['$rootScope', 'EventsService', '$scope', 'FlashService', 'EventsJSONMapping'];
	function UpcomingEventsCalendarController($rootScope, EventsService, $scope, FlashService, EventsJSONMapping) {
		var vm = this;

		vm.SubscribeToEvent = SubscribeToEvent;
		vm.EventsJSONMapping = EventsJSONMapping;

		(function initController() {
			$rootScope.subscribedToEvent = false;
			GetAllEvents();
		})();

		function GetAllEvents() {
			$scope.upcomingEvents = [];
			$rootScope.scheduledEvents = [];
			var cDate = moment().format('DD/MM/YYYY');
			var eventDetails = {
				cDate : cDate,
				from_prev_call : $rootScope.for_next_call,
				uID : $rootScope.uID
			};
			EventsService.GetAllEvents(eventDetails).then(function(response) {
				if (response.data.errorMSG_user !== '') {
					response = {
						success : false,
						message : 'Cannot fetch event details'
					};
					FlashService.Error(response.message);
					vm.dataLoading = false;
				} else {
					$rootScope.for_next_call = response.data.for_next_call;
					$rootScope.uID = response.data.uID;
					$rootScope.scheduledEvents = (response.data.month_events_list[3]);
					
					(response.data.month_events_list).pop();	

					$scope.upcomingEvents = response.data.month_events_list;
					$scope.showUpcomingEvents = $scope.upcomingEvents[1].length > 0;
					
				}
			}, function error(errorResponse) {
				FlashService.Error($rootScope.configData.errorMessage);
			});
		}

		function SubscribeToEvent(eventDetails, event) {
			event.stopPropagation();
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
			EventsService.SubscribeToEvent(eventTosubscribe).then(function(response) {
				$rootScope.subscribedToEvent = true;
				if (response.data.errorMSG_internal !== 'DEFAULT_OK') {
					FlashService.Error(response.data.errorMSG_user);
				} else {
					$rootScope.for_next_call = response.data.for_next_call;
					$rootScope.uID = response.data.uID;
					FlashService.Success(response.data.errorMSG_user);
				}
			}, function error(errorResponse) {
				FlashService.Error($rootScope.configData.errorMessage);
			});
		}


		$('.tab-list').click(function(e) {
			e.preventDefault();
			$(this).tab('show');
		});

	}

})();
