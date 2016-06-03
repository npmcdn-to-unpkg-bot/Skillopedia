// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("createStepController", function($scope, $timeout, $window, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	// 封面
	// mock {id:"",url:""}
	$scope.input.covers = [];
	$scope.$on("upload_cover_success", function(event, args) {
		$scope.input.covers.push(args.message)
	});
	// 移除封面
	$scope.remove_cover = function(cover) {
		$scope.input.covers = $scope.input.covers.filter(function(c) {
			return cover != c;
		})
	};
	$scope.ajaxForm = function() {
		if (!$scope.input.content) {
			errorServices.autoHide("请填写内容");
			return;
		}
		toastServices.show();
		userServices.create_step({
			title: $scope.input.title,
			content: $scope.input.content,
			status: "1",
			fileName: $scope.input.covers.join("#")
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$window.close();
				}, 2000);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.save_to_draft = function() {
		toastServices.show();
		userServices.create_step({
			title: $scope.input.title,
			content: $scope.input.content || "",
			status: "2",
			fileName: $scope.input.covers.join("#")
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$window.close();
				}, 2000);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})