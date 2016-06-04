// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("sidebarController", function($scope, $routeParams, $location, errorServices, toastServices, localStorageService, config) {
	if ($routeParams.user_id) {
		$scope.user_id = $routeParams.user_id
	}
	$scope.highlight = function(item) {
		if (item == $location.path()) {
			return true;
		}
		return false;
	}
})