(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })
            
            .when('/forgotPassword', {
                controller: 'LoginController',
                templateUrl: 'login/forgotPassword.view.html',
                controllerAs: 'vm'
            })
            
            .when('/forgotPasswordSuccess', {
                controller: 'LoginController',
                templateUrl: 'login/forgotPasswordSuccess.view.html',
                controllerAs: 'vm'
            })
            
            .when('/scheduledEventsCalendar', {
                controller: 'ScheduledEventsCalendarController',
                templateUrl: 'eventsCalendar/scheduledEventsCalendar.view.html',
                controllerAs: 'vm'
            })
            
            .when('/upcomingEventsCalendar', {
                controller: 'UpcomingEventsCalendarController',
                templateUrl: 'eventsCalendar/upcomingEventsCalendar.view.html',
                controllerAs: 'vm'
            })
            
            .when('/profilePage', {
                controller: 'ProfilePageController',
                templateUrl: 'profilePage/profilePage.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/scheduledEventsCalendar','/upcomingEventsCalendar', '/forgotPassword','/forgotPasswordSuccess','/profilePage']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();