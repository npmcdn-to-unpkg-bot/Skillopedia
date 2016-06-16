// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").factory("orderServices", function($http, localStorageService, config) {
	return {
		query_course: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/app/OrdersManage/orderCourseInfo",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_coupons: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/app/OrdersManage/courseCouponList2",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
	}
});