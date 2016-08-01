// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").factory("googleMapServices", function($http, config) {
	return {
		create_map: function(container, latlng) {
			var map = new google.maps.Map(container, {
				zoom: 18,
				center: latlng,
				// mapTypeId: google.maps.MapTypeId.TERRAIN
			});
			// var marker = new google.maps.Marker({
			// 	position: latlng,
			// 	map: map,
			// 	draggable: true,
			// });
			// var cityCircle = new google.maps.Circle({
			// 	strokeColor: 'blue',
			// 	strokeOpacity: 0.8,
			// 	strokeWeight: 2,
			// 	fillColor: 'blue',
			// 	fillOpacity: 0.35,
			// 	map: map,
			// 	center: latlng,
			// 	radius: 100
			// });
			return map;
		},
		create_marker: function(map, latlng) {
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				draggable: true,
			});
			return marker;
		},
		create_circle: function(map, latlng) {
			var cityCircle = new google.maps.Circle({
				strokeColor: '#0087ff',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#0087ff',
				fillOpacity: 0.35,
				map: map,
				center: latlng,
				radius: 50
			});
			return cityCircle;
		},
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