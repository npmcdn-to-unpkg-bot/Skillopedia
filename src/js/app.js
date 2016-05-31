// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia", [
		"ngRoute",
		// "mobile-angular-ui",
		// "mobile-angular-ui.core",
		"LocalStorageModule",
		"ngSanitize",
		"flow",
		// "timer"
	])
	.config(function($routeProvider, $httpProvider, $locationProvider, localStorageServiceProvider, config) {
		angular.forEach(config.interceptor, function(path) {
			var controllername = path.replace(/_[a-z]/g, function(letter) {
				return letter.split("_")[1].toUpperCase();
			});
			controllername = controllername + "Controller";
			$routeProvider.when("/" + path, {
				templateUrl: "templates/" + path + ".html",
				reloadOnSearch: true,
				controller: controllername,
				resolve: {
					user: function($q, $location, localStorageService) {
						var resolve_path = ["account", "shoppingcart", "orders", "order", "order_booking", "order_comment", "coach", "authenication", "orders_management", "order_management", "order_confirm", "order_cancel", "order_finish", "order_refund", "schedule", "steps_publish", "favourite", "messages", "coupons"],
							defer = $q.defer();
						if (resolve_path.includes(path) && !localStorageService.get("token")) {
							defer.reject();
							$location.path("/signin").replace();
							return;
						}
						defer.resolve();
						return defer.promise;
					},
					authenication: function($rootScope, $q, $location, localStorageService) {
						var resolve_path = ["coach"],
							defer = $q.defer();
						if (resolve_path.includes(path) && $rootScope.user.agent_level) {
							defer.reject();
							$location.path("/authenication").replace();
							return;
						}
						defer.resolve();
						return defer.promise;
					}
				}
			})
		})
		$routeProvider.otherwise("/index");
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		localStorageServiceProvider.setStorageCookie(1 / 50);
		$httpProvider.interceptors.push('tokenInterceptor');

	}).run(function(appServices) {
		// init event such as routechangestart...
		appServices.init();
	});