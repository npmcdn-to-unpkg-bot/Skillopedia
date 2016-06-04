// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("showController", function($scope, $routeParams, $rootScope, user, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.user_id) {
		$rootScope.back();
		return;
	}
	$scope.courses = [];
	$scope.page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多",
		latitude: "0",
		longitude: "0",
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		$scope.page.user_id = $routeParams.user_id;
		userServices.query_courses_by_user_id($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.courses = $scope.courses.concat(data.Result.Courses.list);
				$scope.no_more = $scope.courses.length == data.Result.Courses.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "加载完成，共加载" + $scope.courses.length + "条数据";
			}
			$scope.page.pn++;
		})

	};
	$scope.loadMore();
})