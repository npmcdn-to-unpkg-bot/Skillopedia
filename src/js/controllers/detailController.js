// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("detailController", function($scope, $routeParams, $sce, coursesServices, errorServices, toastServices, localStorageService, config) {
	$scope.calendar = {
		// mode: "edit",
		times: [{
			hour: "00:00-08:30",
			plan: "free time",
			state: "1"
		}, {
			hour: "08:30-09:00",
			plan: "free time",
			state: "3"
		}, {
			hour: "09:00-08:30",
			plan: "free time",
			state: "1"
		}, {
			hour: "10:30-09:00",
			plan: "free time",
			state: "1"
		}, {
			hour: "11:00-08:30",
			plan: "free time",
			state: "1"
		}, {
			hour: "12:00-08:30",
			plan: "free time",
			state: "1"
		}, {
			hour: "13:30-09:00",
			plan: "free time",
			state: "1"
		}, {
			hour: "14:00-08:30",
			plan: "free time",
			state: "1"
		}]
	}
	$scope.course = {};
	toastServices.show();
	coursesServices.query_by_id({
		course_id: $routeParams.course_id,
		latitude: 0,
		latitude: 0
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.course = data.Result.Course;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// parse iframe map url
	$scope.get_map = function() {
		if (!$scope.course.city) {
			return;
		}
		var map_url = "https://maps.google.com/maps?q=" + $scope.course.city + $scope.course.area + "&output=embed";
		return $sce.trustAsResourceUrl(map_url);
	}
})