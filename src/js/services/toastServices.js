// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").factory("toastServices", function() {
	return {
		show: function() {
			$(".toast").addClass("active");
		},
		hide: function() {
			$(".toast").removeClass("active");
		},
		start: function() {
			NProgress.start();
		},
		done: function() {
			NProgress.done();
		}
	}
});