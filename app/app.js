(function() {
	'use strict';

	angular.module('app', ['ngRoute']).config(config).run(run);

	config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
	function config($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider.when('/', {
			controller : 'HomeController',
			templateUrl : 'app/home/home.view.html',
			controllerAs : 'vm'
		}).when('/login', {
			controller : 'LoginController',
			templateUrl : 'app/login/login.view.html',
			controllerAs : 'vm'
		}).when('/logout', {
			controller : 'LogoutController',
			templateUrl : 'app/login/logout.view.html',
			controllerAs : 'vm'
		}).when('/forgotPassword', {
			controller : 'LoginController',
			templateUrl : 'app/login/forgotPassword.view.html',
			controllerAs : 'vm'
		}).when('/forgotPasswordSuccess', {
			controller : 'LoginController',
			templateUrl : 'app/login/forgotPasswordSuccess.view.html',
			controllerAs : 'vm'
		}).when('/scheduledEventsCalendar', {
			controller : 'ScheduledEventsCalendarController',
			templateUrl : 'app/eventsCalendar/scheduledEventsCalendar.view.html',
			controllerAs : 'vm'
		}).when('/upcomingEventsCalendar', {
			controller : 'UpcomingEventsCalendarController',
			templateUrl : 'app/eventsCalendar/upcomingEventsCalendar.view.html',
			controllerAs : 'vm'
		}).when('/profilePage', {
			controller : 'ProfilePageController',
			templateUrl : 'app/profilePage/profilePage.view.html',
			controllerAs : 'vm'
		}).when('/register', {
			controller : 'RegisterController',
			templateUrl : 'app/register/register.view.html',
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
			$('.navbar-default').addClass('hide');
			$location.path('/login');
		}
	}

})();
