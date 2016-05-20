// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("signinController", function($scope, $route, $window, errorServices, toastServices, localStorageService, config) {
	$scope.ajaxForm = function() {
		$window.location.href = "#/courses";
		$.magnificPopup.close();
	}
});