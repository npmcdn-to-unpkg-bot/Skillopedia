// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("calendarController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.select_time = function(time, index) {
		if (time.state == 1 && $scope.times[index + 1].state == 1) {
			time.state = 3;
			$scope.times[index + 1].state = 3;
		}
	};
	// state_1 free
	// state_2 check
	// state_3 disabled
	$scope.times = [{
		hour: "08:00-08:30",
		plan: "free time",
		state: "1"
	}, {
		hour: "08:30-09:00",
		plan: "free time",
		state: "2"
	}, {
		hour: "08:00-08:30",
		plan: "free time",
		state: "2"
	}, {
		hour: "08:30-09:00",
		plan: "free time",
		state: "2"
	}, {
		hour: "08:00-08:30",
		plan: "free time",
		state: "2"
	}, {
		hour: "08:30-09:00",
		plan: "free time",
		state: "1"
	}, {
		hour: "08:00-08:30",
		plan: "free time",
		state: "1"
	}, {
		hour: "08:30-09:00",
		plan: "free time",
		state: "1"
	}, {
		hour: "08:00-08:30",
		plan: "free time",
		state: "3"
	}, {
		hour: "08:30-09:00",
		plan: "free time",
		state: "3"
	}, {
		hour: "08:00-08:30",
		plan: "free time",
		state: "3"
	}, {
		hour: "08:30-09:00",
		plan: "free time",
		state: "3"
	}, {
		hour: "08:00-08:30",
		plan: "free time",
		state: "1"
	}, {
		hour: "08:30-09:00",
		plan: "free time",
		state: "1"
	}, {
		hour: "08:00-08:30",
		plan: "free time",
		state: "1"
	}, {
		hour: "08:30-09:00",
		plan: "free time",
		state: "1"
	}, {
		hour: "08:00-08:30",
		plan: "free time",
		state: "1"
	}, {
		hour: "08:30-09:00",
		plan: "free time",
		state: "1"
	}, {
		hour: "08:00-08:30",
		plan: "free time",
		state: "1"
	}, {
		hour: "08:30-09:00",
		plan: "free time",
		state: "1"
	}];
})