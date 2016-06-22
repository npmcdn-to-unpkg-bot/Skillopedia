// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("contactController", function($scope, skillopediaServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		toastServices.show();
		skillopediaServices.feedback({
			content: $scope.input.content,
			name: $scope.input.fullname,
			contact: $scope.input.email
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$scope.input.content = "";
				$scope.input.fullname = "";
				$scope.input.email = "";
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})