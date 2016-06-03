// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("stepController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.experience_id) {
		$rootScope.back()
	}
	toastServices.show();
	userServices.query_step_by_user_id({
		experience_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.step = data.Result.ExperienceInfo;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})