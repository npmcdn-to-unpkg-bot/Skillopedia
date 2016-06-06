// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("showCommentsController", function($scope, $rootScope, $routeParams, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.user_id) {
		$rootScope.back();
		return;
	}
	if ($routeParams.user_id) {
		$scope.user_id = $routeParams.user_id
	}
})