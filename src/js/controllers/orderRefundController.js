// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("orderRefundController", function($scope, $routeParams, orderServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	orderServices.query_refund({
		orders_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.refunds = data.Result.Refunds;
			$scope.refund_meta = data;
			$scope.refunds.map(function(r) {
				r.selected = true;
				return r;
			});
			$scope.calculate_each();
			console.log($scope.refunds)
			$scope.calculate_total();
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// 选择退款
	$scope.select = function(refund) {
		refund.selected = !refund.selected;
		$scope.calculate_total();

	};
	// 计算退款，总退金额
	$scope.calculate_total = function() {
		$scope.total_refund_money = 0;
		angular.forEach($scope.refunds, function(value, key) {
			if (value.selected) {
				$scope.total_refund_money += parseFloat(value.refund_money);
			}
		})
	};
	// 计算退款，每个课程应退金额
	$scope.calculate_each = function() {
		$scope.refunds.map(function(r) {
			// 未选课程时间;
			if (r.status == "4") {
				r.refund_money = parseFloat($scope.refund_meta.total_session_rate) - parseFloat($scope.refund_meta.first_joint_fee) - $scope.query_other(r);
			}
			// 已选课程时间;
			if (r.status == "20" || r.status == "21" || r.status == "3") {
				r.refund_money = parseFloat($scope.refund_meta.total_session_rate) - parseFloat($scope.refund_meta.first_joint_fee) - $scope.query_other(r) - $scope.query_refunded(r);
			}
			return r;
		})
	};
	// 查询剩余课程总价,不包含退款中，退款完成 
	$scope.query_other = function(self) {
		var other = $scope.refunds.filter(function(r) {
			return self != r;
		}).filter(function(r2) {
			return r2.refund_status == "10";
		});
		// var result = parseFloat($scope.refund_meta.session_rate) * parseFloat(other.length);
		var result = (parseFloat($scope.refund_meta.total_session_rate) - parseFloat($scope.refund_meta.first_joint_fee)) / parseFloat($scope.refunds.length) * parseFloat(other.length);
		return result;
	};
	$scope.query_refunded = function(r) {
		var other = $scope.refunds.filter(function(r) {
			return self != r;
		}).filter(function(r2) {
			return r2.refund_status != "10";
		});
		var result = (parseFloat($scope.refund_meta.total_session_rate) - parseFloat($scope.refund_meta.first_joint_fee)) / parseFloat($scope.refunds.length) * parseFloat(other.length);
		console.log(result)
		return result;
	}
})