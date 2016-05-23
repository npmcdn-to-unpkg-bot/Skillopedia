// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("createCourseController", function($scope, errorServices, toastServices, localStorageService, config) {
	console.log("dd")
	$scope.step = 1;
	$scope.show_step = function(step) {
		$scope.step = step;
	}
	$scope.location_mode = "edit";
	$scope.save = function() {
		$scope.location_mode = "preview";
	}
	$scope.edit = function() {
		$scope.location_mode = "edit";
	}
})