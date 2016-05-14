// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").directive('calendar', function($filter) {
	return {
		restrict: 'E',
		templateUrl: 'templates/calendar.html',
		scope: {
			calendar: "=",
		},
		link: function(scope, element, attrs) {
			scope.calendar = angular.extend({}, scope.calendar);
			scope.calendar.day = $filter("date")(new Date());
			var date = $(".calendar-day").pickadate();
			var picker = date.pickadate('picker');
			picker.on({
				set: function(thingSet) {
					var select = picker.get();
					scope.$apply(function() {
						scope.calendar.day = select || scope.calendar.day;
					})
				}
			})
			scope.pickadate = function(event) {
				picker.open();
				event.stopPropagation();
				event.preventDefault()
			}
			if (scope.calendar.mode != "edit") {
				return;
			}
			// scope.calendar = angular.extend({}, scope.calendar);
			scope.calendar.selected = [];
			scope.select = function(time, index) {
				var next = index + 1;
				next = next > scope.calendar.times.length - 1 ? scope.calendar.times.length - 1 : next;
				if (index == next) {
					return;
				}
				// state_1 free,state_2 check,state_3 disabled
				if (time.state == 1 && scope.calendar.times[next].state == 1) {
					time.state = 2;
					var selected_time = {
						from: time,
						to: scope.calendar.times[next]
					}
					scope.calendar.times[next].state = 2;
					scope.calendar.selected.push(selected_time);
				}
			};
			scope.calendar.remove = function(selected) {
				scope.calendar.selected = scope.calendar.selected.filter(function(s) {
					return s.from.hour != selected.from.hour;
				})
				scope.calendar.times = scope.calendar.times.map(function(t) {
					if (t.hour == selected.from.hour || t.hour == selected.to.hour) {
						t.state = 1;
					}
					return t;
				});
			}
		}
	};
});