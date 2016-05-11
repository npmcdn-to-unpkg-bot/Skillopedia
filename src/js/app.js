// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia", [
		"ngRoute",
		// "mobile-angular-ui",
		// "mobile-angular-ui.core",
		"LocalStorageModule",
		// "flow",
		// "timer"
	])
	.config(function($routeProvider, $httpProvider, $locationProvider, localStorageServiceProvider) {
		$routeProvider
			.when("/index", {
				templateUrl: "templates/home.html",
				reloadOnSearch: false,
				controller: indexController
			})
			.otherwise({
				redirectTo: "/index"
			});
		// $locationProvider.html5Mode(true);
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		localStorageServiceProvider.setStorageCookie(1 / 50);
		$httpProvider.interceptors.push('tokenInterceptor');

	}).run(function(appServices) {
		// init event such as routechangestart...
		// appServices.init();
	});