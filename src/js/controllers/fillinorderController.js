// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("fillinorderController", function($scope, $rootScope, $filter, $routeParams, $sce, orderServices, scheduleServices, userServices, coursesServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.course = {};
	toastServices.show();
	orderServices.query_course({
		course_id: $routeParams.course_id,
		latitude: 0,
		latitude: 0
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.course = data.Course;
			$scope.teaching_location_map = $scope.get_map($scope.course.city, $scope.course.area, $scope.course.street, $scope.course.address);
			$scope.input.total_price = $scope.course.session_rate;
			// discount handle
			$scope.discounts = [];
			if ($scope.course.discount_onetion_pur_money_01 > 0) {
				$scope.discounts.push({
					purchase: $scope.course.discount_onetion_pur_money_01,
					off: $scope.course.discount_price_01
				})
			}
			if ($scope.course.discount_onetion_pur_money_02 > 0) {
				$scope.discounts.push({
					purchase: $scope.course.discount_onetion_pur_money_02,
					off: $scope.course.discount_price_02
				})
			}
			if ($scope.course.discount_onetion_pur_money_03 > 0) {
				$scope.discounts.push({
					purchase: $scope.course.discount_onetion_pur_money_03,
					off: $scope.course.discount_price_03
				})
			}
			$scope.discounts.sort(function(x, y) {
				return parseFloat(x.purchase) > parseFloat(y.purchase);
			});
			// coupons handle
			$scope.query_coupons();
		} else {
			errorServices.autoHide(data.message);
		}
	}).then(function(data) {
		$scope.query_schedule($filter("date")(new Date().getTime(), "yyyy-MM-dd"));
	});
	// 优惠券
	$scope.input.coupons = {
		selected: "",
		all: []
	};
	$scope.query_coupons = function() {
		toastServices.show();
		orderServices.query_coupons({
			category_01_id: $scope.course.category_01_id,
			category_02_id: $scope.course.category_02_id,
			user_id: $scope.course.user_id,
			course_id: $scope.course.course_id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.coupons = data.Result.CourseCoupons;
				$scope.calculate();
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	// 编辑地址 
	$scope.edit = function() {
		$.magnificPopup.open({
			items: {
				src: '#location-popup'
			},
			type: 'inline'
		}, 0);
	};
	$scope.save_location = function() {
		$scope.teaching_location_map = $scope.get_map($scope.input.city, $scope.input.area, $scope.input.street, $scope.input.address);
		$scope.course.city = $scope.input.city;
		$scope.course.area = $scope.input.area;
		$scope.course.street = $scope.input.street;
		$scope.course.address = $scope.input.address;
		$.magnificPopup.close();
	};
	// parse iframe map url
	$scope.get_map = function(state, city, street, unit) {
		var map_url = "https://maps.google.com/maps?q=" + state + city + street + "&output=embed";
		return $sce.trustAsResourceUrl(map_url);
	};
	// parse video url
	$scope.get_video = function(video) {
		if (video) {
			// ?autoplay=0
			var video = video.replace("watch?v=", "embed/");
			return $sce.trustAsResourceUrl(video);
		}
	};
	// 加入收藏
	$scope.like = function() {
		if (!$rootScope.is_signin()) {
			$rootScope.signin();
			return;
		}
		toastServices.show();
		userServices.like({
			course_id: $scope.course.course_id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	// schedule
	$scope.calendar = {
		mode: "edit",
		disabled: false,
		disabled_message: "All Day Busy",
		times: []
	}
	$scope.query_schedule = function(day) {
		// $scope.calendar.selected = [];
		var selected = $scope.calendar.selected.map(function(t) {
			return t.from.day + " " + t.from.hour + "to" + t.to.day + " " + t.to.hour;
		}).join("#");
		toastServices.show();
		scheduleServices.query_by_order({
			course_id: $routeParams.course_id,
			user_id: $scope.course.user_id,
			choice_currentdate: day,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.calendar.times = data.ScheduleBeans.map(function(time) {
					time.schedule_state = time.schedule_state;
					time.schedule_state_message = time.schedule_state_message;
					time.day = day;
					var temp = time.day + " " + time.hour;
					if (selected.indexOf(temp) != -1) {
						time.schedule_state = 2;
						time.active = true;
					}
					return time;
				})
				$scope.calendar.is_stop_course = data.is_stop_course;
				$scope.calendar.is_busy_24 = data.is_busy_24;
				if ($scope.calendar.is_stop_course == "1" || $scope.calendar.is_busy_24 == "1") {
					$scope.calendar.disabled = true;
				} else {
					$scope.calendar.disabled = false;
				}
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.calendar.onDayChange = function() {
		$scope.query_schedule($filter("date")(new Date($scope.calendar.day).getTime(), "yyyy-MM-dd"))
	};
	// action
	$scope.input.amount = 1;
	$scope.add_amount = function() {
		$scope.input.amount++;
		$scope.calculate();
	}
	$scope.minus_amount = function() {
		$scope.input.amount = --$scope.input.amount < 1 ? ++$scope.input.amount : $scope.input.amount;
		$scope.calculate();
	}
	$scope.input.partner = 0;
	$scope.add_partner = function() {
		$scope.input.partner = ++$scope.input.partner > $scope.course.additional_partner ? --$scope.input.partner : $scope.input.partner;
		$scope.calculate()
	}
	$scope.minus_partner = function() {
		$scope.input.partner = --$scope.input.partner < 0 ? ++$scope.input.partner : $scope.input.partner;
		$scope.calculate();
	}
	$scope.calculate = function() {
		var discount_price = 0;
		$scope.input.total_price = parseFloat($scope.course.session_rate) * parseFloat($scope.input.amount) + parseFloat($scope.course.surcharge_for_each) * parseFloat($scope.input.partner);
		// by total money;
		if ($scope.course.discount_type == 1) {
			angular.forEach($scope.discounts, function(discount) {
				if (parseFloat($scope.input.total_price) > parseFloat(discount.purchase) - 1) {
					discount_price = parseFloat($scope.input.total_price) - parseFloat(discount.off);
				}
			});
		}
		// by total amount
		if ($scope.course.discount_type == 2) {
			angular.forEach($scope.discounts, function(discount) {
				if (parseFloat($scope.input.amount) > parseFloat(discount.purchase) - 1) {
					discount_price = parseFloat($scope.input.total_price) - parseFloat(discount.off);
				}
			});
		}
		$scope.input.discount_price = discount_price;
		$scope.input.coupons.all = $scope.coupons.filter(function(coupon) {
			return parseFloat($scope.input.discount_price) > parseFloat(coupon.consume_money);
		});
		if ($scope.input.coupons.all.length > 0 && !$scope.is_watch) {
			$scope.input.coupons.selected = $scope.input.coupons.all[0];
		}
		if ($scope.input.coupons.all.length == 0) {
			$scope.is_watch = false;
			$scope.input.coupons.selected = {
				coupon_name: "无可用优惠券"
			};
		}
		if ($scope.input.coupons.selected.coupon_money) {
			$scope.input.discount_price = parseFloat($scope.input.discount_price) - parseFloat($scope.input.coupons.selected.coupon_money);
		}
	}
	$scope.is_watch = false;
	$scope.$watch("input.coupons.selected", function(n, o) {
		if (n === o || o == "") {
			return;
		}
		$scope.is_watch = true;
		$scope.calculate();
	}, true)
})