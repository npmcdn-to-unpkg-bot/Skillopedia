// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").factory("coursesServices", function($http, config) {
	return {
		query: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/app/CatetoryManage/courseList",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_by_id: function(input) {
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