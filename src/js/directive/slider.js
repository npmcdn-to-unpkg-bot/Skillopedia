// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").directive('dribehanceSlider', function($rootScope, $timeout) {
	return {
		restrict: 'E',
		templateUrl: "templates/slider.html",
		scope: {
			banners: "="
		},
		link: function(scope, element, attrs) {
			$(element).css({
				display: "block",
				height: $(window).height()
			})
			scope.staticImageUrl = $rootScope.staticImageUrl;
			scope.$on("onRepeatDone", function() {
				// $('#slides').superslides("update");
				$timeout(function() {
					$('#slides').superslides({
						animation: 'fade',
						play: 2500
					});
				}, 0)
			});
		}
	};
});