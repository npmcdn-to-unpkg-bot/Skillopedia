// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("searchFormController", function($scope, $timeout, $location, skillopediaServices, filterFilter, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		keyword: "",
		zipcode: "",
		suggestions: []
	}
	var suggestions = [];
	toastServices.show();
	skillopediaServices.query_zipcode().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			suggestions = data.Result.CityBeans;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.$watch("input.zipcode", function(n, o) {
		$scope.input.suggestions = filterFilter(suggestions, n);
	})
	$scope.select = function(s) {
		$scope.input.zipcode = s.zipcode;
		$timeout(function() {
			$scope.input.suggestions = [];
		}, 100)
	}
	$scope.ajaxForm = function() {
		console.log("ddd")
		$location.path("search").search({
			keyword: $scope.input.keyword,
			zipcode: $scope.input.zipcode
		});
	}
})