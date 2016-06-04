// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("editStepController", function($scope, $timeout, $routeParams, $window, userServices, errorServices, toastServices, localStorageService, config) {
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
		userServices.edit_step({
			title: $scope.input.title,
			content: $scope.input.content,
			status: "1",
			fileName: $scope.input.covers.join("#"),
			experience_id: $routeParams.id
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
	};
	// query old step;
	toastServices.show();
	userServices.query_step_by_user_id({
		experience_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.step = data.Result.ExperienceInfo;
			$scope.input.title = $scope.step.title;
			$scope.input.content = $scope.step.content;
			$scope.input.covers = $scope.step.exBanners.map(function(c) {
				return c.image_01;
			})
		} else {
			errorServices.autoHide(data.message);
		}
	})
})