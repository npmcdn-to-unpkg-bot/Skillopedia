// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").factory("shoppingcartServices", function($http, localStorageService, config) {
	return {
		query: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/app/CartManage/myCartList",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		}
	}
});