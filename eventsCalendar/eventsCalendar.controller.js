(function () {
    'use strict';

    angular
        .module('app')
        .controller('EventsCalendarController', EventsCalendarController);

    EventsCalendarController.$inject = ['$rootScope'];
    function EventsCalendarController($rootScope) {
        var vm = this;

        initController();

        function initController() {

        }
    }

})();
