// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("stepsPublishController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.input.step_status = "1";
	$scope.$watch("input.step_status", function(n, o) {
		if (n == undefined) {
			return;
		};
		$scope.query_steps();
	});
	$scope.query_steps = function() {
		$scope.steps = [];
		toastServices.show();
		userServices.query_steps({
			status: $scope.input.step_status
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.steps = data.Result.Experiences;
				$scope.steps_message = $scope.steps.length == 0 ? "暂无经历" : "";
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})