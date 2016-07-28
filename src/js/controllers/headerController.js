// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("headerController", function($scope, $route, userServices, orderServices, errorServices, toastServices, localStorageService, config) {
	$scope.query_shoppingcart_count = function() {
		orderServices.query_shoppingcart_count().then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.amount = data.total_card_number;
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.query_shoppingcart_count();
	$scope.show_menu = function(e) {
		if ($(".dropdown-menu").hasClass("active")) {
			$(".dropdown-menu").removeClass("active")
		} else {
			$(".dropdown-menu").addClass("active")
		}
		e.preventDefault();
		e.stopPropagation();
	}
	$("body").bind("click", function() {
		$(".dropdown-menu").removeClass("active");
	});
	$scope.$on("addToCart", function() {
		$scope.query_shoppingcart_count();
	})
	$scope.logout = function() {
		userServices.logout();
		$route.reload();
	}
})