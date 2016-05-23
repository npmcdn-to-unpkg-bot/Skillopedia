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
	$scope.sidebar = {
		title: "recommand"
	}
	$scope.change_sidebar = function(title) {
		$scope.sidebar.title = title;
	}
	$scope.open_map = function(e) {
		e.preventDefault();
		e.stopPropagation();
		$.magnificPopup.open({
			items: {
				src: "https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&hl=en&t=v&hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom"
			},
			type: "iframe"
		});
	}

})