(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfilePageController', ProfilePageController);

    ProfilePageController.$inject = ['$rootScope'];
    function ProfilePageController($rootScope) {
        var vm = this;

        initController();

        function initController() {

        }

    }

})();
