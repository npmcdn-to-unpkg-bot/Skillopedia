// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("detailController", function($scope, $rootScope, $filter, $routeParams, $sce, scheduleServices, userServices, coursesServices, errorServices, toastServices, localStorageService, config) {
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
	}).then(function(data) {
		$scope.query_schedule($filter("date")(new Date().getTime(), "yyyy-MM-dd"));
	});
	// parse iframe map url
	$scope.get_map = function() {
		if (!$scope.course.city) {
			return;
		}
		var map_url = "https://maps.google.com/maps?q=" + $scope.course.city + $scope.course.area + $scope.course.address + "&output=embed";
		return $sce.trustAsResourceUrl(map_url);
	};
	// parse video url
	$scope.get_video = function(video) {
		if (video) {
			// ?autoplay=0
			var video = video.replace("watch?v=", "embed/");
			return $sce.trustAsResourceUrl(video);
		}
	};
	// 加入收藏
	$scope.like = function() {
		if (!$rootScope.is_signin()) {
			$rootScope.signin();
			return;
		}
		toastServices.show();
		userServices.like({
			course_id: $scope.course.course_id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	// schedule
	$scope.calendar = {
		mode: "",
		disabled: false,
		disabled_message: "All Day Busy",
		times: []
	}
	$scope.query_schedule = function(day) {
		$scope.calendar.selected = null;
		toastServices.show();
		scheduleServices.query_by_course({
			course_id: $routeParams.course_id,
			user_id: $scope.course.user_id,
			choice_currentdate: day,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.calendar.times = data.ScheduleBeans.map(function(time) {
					time.schedule_state = time.schedule_state;
					time.schedule_state_message = time.schedule_state_message;
					return time;
				})
				$scope.calendar.is_stop_course = data.is_stop_course;
				$scope.calendar.is_busy_24 = data.is_busy_24;
				if ($scope.calendar.is_stop_course == "1" || $scope.calendar.is_busy_24 == "1") {
					$scope.calendar.disabled = true;
				} else {
					$scope.calendar.disabled = false;
				}
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.calendar.onDayChange = function() {
		$scope.query_schedule($filter("date")(new Date($scope.calendar.day).getTime(), "yyyy-MM-dd"))
	}
})