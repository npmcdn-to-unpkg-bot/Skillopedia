// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("indexController", function($scope, $timeout, skillopediaServices, errorServices, toastServices, localStorageService, config) {
	// banner
	toastServices.show();
	skillopediaServices.query_banner().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.banners = data.Result.homeBanner;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// base category
	toastServices.show();
	skillopediaServices.query_base_category().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.sport = data.Result.Category01s[0];
			$scope.arts = data.Result.Category01s[1];
		} else {
			errorServices.autoHide(data.message);
		}
	});
	$scope.open_left_feature = function(e) {
		toastServices.show();
		skillopediaServices.query_second_category({
			category_01_id: $scope.sport.category_01_id
		}).then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.sport_seconds = data.Result.Category02s;
				$timeout(function() {
					toastServices.hide()
					open_left_feature(e);
				}, 100)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.open_right_feature = function(e) {
		toastServices.show();
		skillopediaServices.query_second_category({
			category_01_id: $scope.arts.category_01_id
		}).then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.art_seconds = data.Result.Category02s;
				$timeout(function() {
					toastServices.hide()
					open_right_feature(e);
				}, 100)
			} else {
				errorServices.autoHide(data.message);
			}
		})

	}
	$scope.close_left = function(e) {
		close_left(e);
	};
	$scope.close_right = function(e) {
		close_right(e);
	};
	// hot
});