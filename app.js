(function() {
	'use strict';

	angular.module('app', ['ngRoute']).config(config).run(run);

	config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
	function config($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider.when('/', {
			controller : 'HomeController',
			templateUrl : 'home/home.view.html',
			controllerAs : 'vm'
		}).when('/login', {
			controller : 'LoginController',
			templateUrl : 'login/login.view.html',
			controllerAs : 'vm'
		}).when('/logout', {
			controller : 'LogoutController',
			templateUrl : 'login/login.view.html',
			controllerAs : 'vm'
		}).when('/forgotPassword', {
			controller : 'LoginController',
			templateUrl : 'login/forgotPassword.view.html',
			controllerAs : 'vm'
		}).when('/forgotPasswordSuccess', {
			controller : 'LoginController',
			templateUrl : 'login/forgotPasswordSuccess.view.html',
			controllerAs : 'vm'
		}).when('/scheduledEventsCalendar', {
			controller : 'ScheduledEventsCalendarController',
			templateUrl : 'eventsCalendar/scheduledEventsCalendar.view.html',
			controllerAs : 'vm'
		}).when('/upcomingEventsCalendar', {
			controller : 'UpcomingEventsCalendarController',
			templateUrl : 'eventsCalendar/upcomingEventsCalendar.view.html',
			controllerAs : 'vm'
		}).when('/profilePage', {
			controller : 'ProfilePageController',
			templateUrl : 'profilePage/profilePage.view.html',
			controllerAs : 'vm'
		}).when('/register', {
			controller : 'RegisterController',
			templateUrl : 'register/register.view.html',
			controllerAs : 'vm'
		}).otherwise({
			redirectTo : '/login'
		});
	}


	run.$inject = ['$rootScope', '$location', '$http'];
	handleLoginFailure.$inject = ['$location', '$rootScope'];

	function run($rootScope, $location, $http) {
		$rootScope.$on('$locationChangeStart', function(event, next, current) {
			// redirect to login page if not logged in and trying to access a restricted page
			handleLoginFailure($location, $rootScope);
		});
	}

	function handleLoginFailure($location, $rootScope) {
		var restrictedPage = $.inArray($location.path(), ['/login', '/forgotPassword', '/forgotPasswordSuccess']) === -1;
		var loggedIn = $rootScope.isSuccesfullyLoggedin;
		if (restrictedPage && !loggedIn) {
			$('.navbar-default').removeClass('hide');
			$location.path('/login');
		}
	}

})();
