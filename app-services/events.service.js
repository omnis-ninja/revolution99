(function() {
	'use strict';

	angular.module('app').factory('EventsService', EventsService);

	EventsService.$inject = ['$http', '$rootScope', 'localStorageService'];

	function EventsService($http, $rootScope, localStorageService) {
		var service = {};
		service.GetAllEvents = GetAllEvents;
		service.SubscribeToEvent = SubscribeToEvent;
		getConfigDetails();

		return service;

		/*
		 * Get scheduled events
		 */
		function GetAllEvents(eventData) {
			return $http({
				method : 'POST',
				url : $rootScope.configData.webApi + 'getEvents',
				data : JSON.stringify(eventData),
				headers : {
					'Content-Type' : 'application/json'
				}
			});
		}

		/*
		 * Gets config details
		 */
		function getConfigDetails() {
			$http.get('config/config.json').success(function(data) {
				$rootScope.configData = data;
			}).error(function(data, status, error, config) {
				$rootScope.configData = [{
					heading : "Error",
					description : "Could not load json data"
				}];
			});
		}

		/*
		 * Subscribe to event
		 */
		function SubscribeToEvent(eventDetails) {
			return $http({
				method : 'POST',
				url : $rootScope.configData.webApi + 'subscribeUserToEvent',
				data : JSON.stringify(eventDetails),
				headers : {
					'Content-Type' : 'application/json'
				}
			});
		}

	}

})(); 