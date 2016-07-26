// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("showStepsController", function($scope, $routeParams, $rootScope, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.user_id) {
		$rootScope.back();
		return;
	}
	if ($routeParams.user_id) {
		$scope.user_id = $routeParams.user_id
	}
	toastServices.show();
	userServices.query_steps_by_user_id({
		user_id: $routeParams.user_id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.steps = data.Result.TaExperiences;
			$scope.steps_message = $scope.steps.length == 0 ? "暂无经历" : "";
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// 用户信息
	toastServices.show();
	userServices.query_basicinfo_id({
		user_id: $routeParams.user_id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.guest = data.Result.UserInfo
		} else {
			errorServices.autoHide(data.message);
		}
	})
})