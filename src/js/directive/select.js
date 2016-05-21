// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").directive('dribehanceSelect', function() {
	return {
		restrict: 'E',
		templateUrl: "templates/select.html",
		scope: {
			options: "="
		},
		link: function(scope, element, attrs) {
			// function body
			scope.options = angular.extend({}, {
				all: []
			}, scope.options);
			scope.select = function(op, e) {
				scope.options.selected = op;
				$(element).find(".dribehance-options").hide();
				e.preventDefault();
				e.stopPropagation();
			}
			$(element).bind("click", function(e) {
				$(element).find(".dribehance-options").show();
				e.preventDefault();
				e.stopPropagation();
			})
			$("body").bind("click", function() {
				$(element).find(".dribehance-options").hide();
			})
		}
	};
});