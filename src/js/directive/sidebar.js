// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").directive('sidebar', function($rootScope, $timeout, config) {
	return {
		restrict: 'E',
		templateUrl: "templates/sidebar.html",
		scope: {
			active: "="
		},
		link: function(scope, element, attrs) {
			scope.staticImageUrl = config.imageUrl;
			scope.user = $rootScope.user;
			scope.go = $rootScope.go;
			// var offset = "";
			// $timeout(function() {
			// 	offset = $(element).offset();
			// }, 0)
			// $(window).resize(function() {
			// 	offset = $(element).offset();
			// })
			// $(document).scroll(function() {
			// 	if (offset.top < $("body").scrollTop()) {
			// 		$(element).css({
			// 			"position": "fixed",
			// 			"left": offset.left,
			// 		})
			// 	} else {
			// 		$(element).css({
			// 			"position": "absolute",
			// 			"left": 0,
			// 		})
			// 	}
			// })
		}
	};
});