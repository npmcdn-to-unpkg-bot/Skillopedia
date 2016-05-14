// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("indexController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.signin = function() {
		$scope.sign = 1;
	}
	$scope.signup = function() {
		$scope.sign = 2;
	}
	$scope.forget = function() {
		$scope.sign = 3;
	}
});