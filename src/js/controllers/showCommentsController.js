// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("showCommentsController", function($scope, $routeParams, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.user_id) {
		$rootScope.back();
		return;
	}
})