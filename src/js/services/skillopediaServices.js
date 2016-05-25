// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").factory("skillopediaServices", function($http, config) {
	return {
		query_banner: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/app/IndexBannerManage/homeBanner",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_base_category: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "interface",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_recommand_category: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "interface",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_hot_category: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "interface",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		}
	}
});