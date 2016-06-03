// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia", [
		"ngRoute",
		// "mobile-angular-ui",
		// "mobile-angular-ui.core",
		"LocalStorageModule",
		"ngSanitize",
		"flow",
		"textAngular",
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
					user: function($rootScope, $q, $location, $interval, localStorageService) {
						var resolve_path = ["account", "courses", "create_course", "shoppingcart", "orders", "order", "order_booking", "order_comment", "coach", "authenication", "orders_management", "order_management", "order_confirm", "order_cancel", "order_finish", "order_refund", "schedule", "steps", "steps_publish", "favourite", "messages", "coupons"],
							defer = $q.defer();
						// 未登录;
						if (resolve_path.includes(path) && !localStorageService.get("token")) {
							defer.reject();
							$location.path("/landing").replace();
							return;
						}
						// 登录过,获取用户信息
						if (resolve_path.includes(path) && localStorageService.get("token")) {
							var timer = $interval(function() {
								if ($rootScope.user) {
									$interval.cancel(timer);
									defer.resolve();
								}
							}, 10);
						} else {
							// 其他不需要登录的地方，直接resolve
							defer.resolve();
						}
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