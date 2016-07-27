// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("searchFormController", function($scope, $timeout, $location, skillopediaServices, filterFilter, errorServices, toastServices, localStorageService, config) {
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
	$scope.$watch("input.zipcode", function(n, o) {
		$scope.input.suggestions = filterFilter(suggestions, n);
	})
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
		$location.path("search").search({
			keyword: $scope.input.keyword,
			zipcode: $scope.input.zipcode
		});
	}
})