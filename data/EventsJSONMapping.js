(function() {
	'use strict';

	angular.module('app').factory('EventsJSONMapping', EventsJSONMapping);

	EventsJSONMapping.$inject = [];

	function EventsJSONMapping() {
		return {
			SEQ : 0,
			NUM : 1,
			NAME : 2,
			LOCATION : 3,
			START_DATE_TIME : 4,
			END_DATE_TIME : 5,
			TYPE : 6,
			SKILL : 7
		};
	}

})();