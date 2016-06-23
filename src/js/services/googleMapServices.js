// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").factory("googleMapServices", function($http, config) {
	return {
		geocoding: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: "https://maps.googleapis.com/maps/api/geocode/json",
				method: "GET",
				params: angular.extend({}, {
					key: config.key.google
				}, input)
			}).then(function(data) {
				return data.data;
			});
		}
	}
});