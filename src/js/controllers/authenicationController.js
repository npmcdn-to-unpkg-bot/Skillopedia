// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("authenicationController", function($scope, $filter, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.input.gender = "Male";
	// picker
	$scope.input.date = $filter("date")(new Date());
	var date = $(".pickadate").pickadate();
	var picker = date.pickadate('picker');
	picker.on({
		set: function(thingSet) {
			var select = picker.get();
			$scope.$apply(function() {
				$scope.input.date = select || $scope.input.date;
			})
		}
	})
})