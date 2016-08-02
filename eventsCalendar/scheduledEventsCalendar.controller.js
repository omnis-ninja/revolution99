(function () {
    'use strict';

    angular
        .module('app')
        .controller('ScheduledEventsCalendarController', ScheduledEventsCalendarController);

    ScheduledEventsCalendarController.$inject = ['$rootScope'];
    function ScheduledEventsCalendarController($rootScope) {
        var vm = this;

        initController();

        function initController() {

        }

    }

})();
