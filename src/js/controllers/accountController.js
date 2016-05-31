// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("accountController", function($scope, $rootScope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		nickname: ""
	}
	toastServices.show();
	userServices.query_basicinfo().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$rootScope.user = data.Result.UserInfo;
			$scope.input.nickname = $rootScope.user.nickname;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.modify_nickname({
			nickname: $scope.input.nickname
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$rootScope.user.nickname = $scope.input.nickname;
				errorServices.autoHide(data.message)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
});
angular.module("Skillopedia").controller("uploadAvatarController", function($scope, $rootScope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.$on("flow::filesSubmitted", function(event, flow, flowFile) {
		// $rootScope.back();
		flow.opts.target = config.url + "/app/UserCenter/UpdateAvatar";
		flow.opts.testChunks = false;
		flow.opts.fileParameterName = "image_01";
		flow.opts.query = {
			"token": localStorageService.get("token")
		};
		flow.upload();
	})
})