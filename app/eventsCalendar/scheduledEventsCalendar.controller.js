(function() {
	'use strict';

	angular.module('app').controller('ScheduledEventsCalendarController', ScheduledEventsCalendarController);

	ScheduledEventsCalendarController.$inject = ['$rootScope', 'EventsService', '$scope', 'FlashService', 'EventsJSONMapping'];
	function ScheduledEventsCalendarController($rootScope, EventsService, $scope, FlashService, EventsJSONMapping) {
		var vm = this;
		vm.EventsJSONMapping = EventsJSONMapping;

		(function initController() {
			GetAllEvents();
		})();

		function GetAllEvents() {
			var eventDetails = {
				cDate : '01/04/2016',
				from_prev_call : $rootScope.for_next_call,
				uID : $rootScope.uID
			};
			if (!$rootScope.subscribedToEvent) {
				$scope.scheduledEvents = $rootScope.scheduledEvents;
				$scope.showScheduledEvents = $rootScope.scheduledEvents[1].length > 0;
			} else {
				EventsService.GetAllEvents(eventDetails).then(function(response) {
					if (response.data.errorMSG_internal !== 'DEFAULT_OK') {
						FlashService.Error(response.data.errorMSG_user);
						vm.dataLoading = false;
					} else {
						$rootScope.for_next_call = response.data.for_next_call;
						$rootScope.uID = response.data.uID;
						$rootScope.scheduledEvents = (response.data.month_events_list[3]);
						$scope.showScheduledEvents = $scope.scheduledEvents[1].length > 0;
					}
				}, function error(errorResponse) {
					FlashService.Error($rootScope.configData.errorMessage);
				});
			}
		}

	}

})();
