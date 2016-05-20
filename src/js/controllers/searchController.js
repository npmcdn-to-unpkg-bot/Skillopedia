// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("searchController", function($scope, $timeout, filterFilter, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		keyword: "",
		zipcode: "",
		suggestions: []
	}
	var suggestions = ["235689", "565237", "2356998", "53389"];
	$scope.$watch("input.zipcode", function(n, o) {
		$scope.input.suggestions = filterFilter(suggestions, n);
	})
	$scope.select = function(s) {
		$scope.input.zipcode = s;
		$timeout(function() {
			$scope.input.suggestions = [];
		}, 100)
	}
})