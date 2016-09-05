// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("contactController", function($scope, skillopediaServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		toastServices.show();
		skillopediaServices.feedback({
			first_name: $scope.input.first_name,
			last_name: $scope.input.last_name,
			email: $scope.input.email,
			phone: $scope.input.phone,
			content: $scope.input.content,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$scope.input.first_name = "";
				$scope.input.last_name = "";
				$scope.input.email = "";
				$scope.input.phone = "";
				$scope.input.content = "";
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})