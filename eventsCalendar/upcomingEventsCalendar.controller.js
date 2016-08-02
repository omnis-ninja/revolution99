(function () {
    'use strict';

    angular
        .module('app')
        .controller('UpcomingEventsCalendarController', UpcomingEventsCalendarController);

    UpcomingEventsCalendarController.$inject = ['$rootScope'];
    function UpcomingEventsCalendarController($rootScope) {
        var vm = this;

        initController();

        function initController() {

        }

    }

})();
