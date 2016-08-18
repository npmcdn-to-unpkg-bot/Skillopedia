// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("accountController", function($scope, $rootScope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		nickname: "",
		password: ""
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
		userServices.rsa_key().then(function(data) {
			var crypt = new JSEncrypt(),
				private_key = data;
			crypt.setPrivateKey(private_key);
			var crypted_str = crypt.encrypt($scope.input.password);
			$scope.input.password = crypted_str;
		}).then(function(data) {
			toastServices.show();
			userServices.modify_nickname({
				nickname: $scope.input.nickname,
				password: $scope.input.password
			}).then(function(data) {
				toastServices.hide();
				if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
					$rootScope.user.nickname = $scope.input.nickname;
					errorServices.autoHide(data.message)
				} else {
					errorServices.autoHide(data.message);
				}
				$scope.input.password = "";
			})
		})
	}
});
angular.module("Skillopedia").controller("uploadAvatarController", function($scope, $rootScope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.$on("flow::filesSubmitted", function(event, flow, flowFile) {
		if (flow.files.length == 0) return;
		// $rootScope.back();
		flow.opts.target = config.url + "/app/UserCenter/UpdateAvatar";
		flow.opts.testChunks = false;
		flow.opts.fileParameterName = "image_01";
		flow.opts.query = {
			"token": localStorageService.get("token")
		};
		flow.upload();
	})
	$scope.$on('flow::fileAdded', function(event, flowFile, flow) {
		if (!{
				png: 1,
				gif: 1,
				jpg: 1,
				jpeg: 1
			}[flow.getExtension()]) {
			errorServices.autoHide("必须上传图片")
			event.preventDefault(); //prevent file from uploading
			return;
		}
		if (parseFloat(flow.size) / 1000 > 500) {
			errorServices.autoHide("图片太大，保证图片在500kb以内")
			event.preventDefault(); //prevent file from uploading
			return;
		}
	});
})