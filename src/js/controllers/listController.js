// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("listController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		categorys: [
			"football",
			"basketball",
			"swimming"
		],
		distances: [
			"500-1000mile",
			"1000-1500mile",
			"1500-2000mile",
			"2000-2500mile",
			"2500-3000mile"
		],
		priorities: [
			"distance",
			"price",
			"review",
			"hot",
		]
	}
	$scope.remove = function(condition) {
		$scope.input[condition] = "";
	}
})