// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").directive('confirm', function() {
	return {
		restrict: 'E',
		scope: {
			confirm: "="
		},
		templateUrl: "templates/confirm.html",
		link: function(scope, element, attrs) {
			// function body
			scope.confirm = angular.extend({}, {
				title: "Tips",
				content: "Are You Sure?",
				open: function() {
					$(element).show();
				},
				cancel: function() {
					$(element).hide();
				},
				ok: function() {
					$(element).hide();
				}
			}, scope.confirm);
		}
	};
});