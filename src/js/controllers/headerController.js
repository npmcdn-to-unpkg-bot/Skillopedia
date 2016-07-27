// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("headerController", function($scope, $route, userServices, errorServices, toastServices, localStorageService, config) {
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
	})
	$scope.logout = function() {
		userServices.logout();
		$route.reload();
	}
})