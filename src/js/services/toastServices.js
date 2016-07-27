// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").factory("toastServices", function() {
	return {
		show: function() {
			$(".toast").show();
		},
		hide: function() {
			$(".toast").hide();
		},
		show_toast_animation: function() {
			$(".toast_with_animation").addClass("active");
		},
		hide_toast_animation: function() {
			$(".toast_with_animation").removeClass("active");
		},
		start: function() {
			NProgress.start();
			// NProgress.set(0) == NProgress.start();
			// NProgress.set(0.4);
		},
		done: function() {
			NProgress.done();
		}
	}
});