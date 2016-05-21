// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("orderCancelController", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.calendar = {
		mode: "edit",
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
})