// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("supportController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.view = 'customers';
	$scope.jump = function(t) {
		$scope.view = t;
	}
})