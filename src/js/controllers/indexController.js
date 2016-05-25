// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("indexController", function($scope, $timeout, skillopediaServices, errorServices, toastServices, localStorageService, config) {
	// banner
	toastServices.show();
	skillopediaServices.query_banner().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.banners = data.Result.homeBanner;
		} else {
			errorServices.autoHide(data.message);
		}
	})
});