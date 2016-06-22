// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("orderManagementController", function($scope, $sce, $routeParams, orderServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	orderServices.query_manage_order({
		orders_id: $routeParams.id,
		latitude: "0",
		longitude: "0"
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.order = data.Orders;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// parse iframe map url
	$scope.get_map = function() {
		if (!$scope.order) {
			return;
		}
		var map_url = "https://maps.google.com/maps?q=" + $scope.order.Course.city + $scope.order.Course.area + $scope.order.Course.street + $scope.order.Course.address + "&output=embed";
		return $sce.trustAsResourceUrl(map_url);
	};
	$scope.get_total_partner_fee = function() {
		if (!$scope.order) {
			return;
		}
		return (parseFloat($scope.order.take_partner_num) * parseFloat($scope.order.surcharge_for_each_cash)).toFixed(2);
	};
	// remove order
	$scope.remove = function(order) {
		$scope.confirm.content = "确定删除吗？";
		$scope.confirm.open();
		$scope.confirm.cancle_callback = function() {}
		$scope.confirm.ok_callback = function() {
			toastServices.show();
			orderServices.remove({
				delete_type: "1",
				orders_ids: order.orders_id
			}).then(function(data) {
				toastServices.hide()
				if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
					errorServices.autoHide(data.message);
					$timeout(function() {
						$rootScope.back();
					}, 2000)
				} else {
					errorServices.autoHide(data.message);
				}
			})
		}
	};
})