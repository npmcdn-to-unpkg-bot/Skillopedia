// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("searchFormController", function($scope, $timeout, $location, googleMapServices, skillopediaServices, filterFilter, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		keyword: "",
		zipcode: "",
		suggestions: []
	}
	var suggestions = [],
		categorys = [];
	// query zipcode
	toastServices.show();
	skillopediaServices.query_zipcode().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			suggestions = data.Result.CityBeans;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// query category list;
	skillopediaServices.query_all_second_category().then(function(data) {
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			categorys = data.Result.Categorys;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// $scope.$watch("input.zipcode", function(n, o) {
	// 	$scope.input.suggestions = filterFilter(suggestions, n);
	// })
	$scope.select = function(s) {
		$scope.input.zipcode = s.zipcode;
		$timeout(function() {
			$scope.input.suggestions = [];
		}, 100)
	}
	$scope.$watch("input.keyword", function(n, o) {
		$scope.input.categorys = filterFilter(categorys, n);
	})
	$scope.select_category = function(c) {
		$scope.input.keyword = c.category_02_name;
		$timeout(function() {
			$scope.input.categorys = [];
		}, 100)
	}
	$scope.ajaxForm = function() {
		var address = $("#autocomplete").val()
		if (!address) {
			$scope.confirm.content = "输入地址可以让我们更好的搜索结果？";
			$scope.confirm.ok_text = "输入地址";
			$scope.confirm.cancel_text = "跳过，继续搜索";
			$scope.confirm.open();
			$scope.confirm.cancle_callback = function() {
				$location.path("search").search({
					keyword: $scope.input.keyword,
					zipcode: address
				});
			}
			$scope.confirm.ok_callback = function() {
				// $scope.confirm.close();
			}
			return;
		}
		toastServices.show();
		googleMapServices.code_address(address).then(function(data) {
			toastServices.hide();
			$location.path("search").search({
				keyword: $scope.input.keyword,
				zipcode: address,
				lat: data.lat,
				lng: data.lng,
			});
		})
	}
})