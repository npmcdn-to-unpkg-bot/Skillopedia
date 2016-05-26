// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("listController", function($scope, $rootScope, $routeParams, skillopediaServices, coursesServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		distances: [
			"500-1000mile",
			"1000-1500mile",
			"1500-2000mile",
			"2000-2500mile",
			"2500-3000mile"
		],
		priorities: [
			"distance",
			"price",
			"review",
			"hot",
		]
	};
	$scope.input.category = {
		name: $routeParams.category,
		id: $routeParams.category_id
	};
	// query category list;
	toastServices.show();
	skillopediaServices.query_all_second_category().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.categorys = data.Result.Categorys;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// query course list;
	$scope.courses = [];
	$scope.page = {
		pn: 1,
		page_size: 1,
		message: "点击加载更多",
		kw: $routeParams.kw,
		latitude: "0",
		longitude: "0",
		category_02_id: $scope.input.category.id,
		category_02_name: $scope.input.category.name,
		distances: $scope.input.distance,
		prioritys: $scope.input.priority
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		coursesServices.query($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.courses = $scope.courses.concat(data.Result.Courses.list);
				$scope.no_more = $scope.courses.length == data.Result.Courses.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "加载完成，共加载" + $scope.courses.length + "条记录";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
	// reload course;
	$scope.reload = function() {
		$scope.courses = [];
		$scope.page = {
			pn: 1,
			page_size: 1,
			message: "点击加载更多",
			kw: $routeParams.kw,
			latitude: "0",
			longitude: "0",
			category_02_id: $scope.input.category.id,
			category_02_name: $scope.input.category.name,
			distances: $scope.input.distance,
			prioritys: $scope.input.priority
		}
		$scope.no_more = false;
		console.log($scope.page)
		$scope.loadMore();
	};
	// filter by category;
	$scope.$watch("input.category", function(n, o) {
		if (n === o) {
			return;
		}
		$scope.reload();
	}, true);
	// filter by priority;
	$scope.remove = function(condition) {
		$scope.input[condition] = "";
	}
	$scope.sidebar = {
		title: "recommand"
	}
	$scope.change_sidebar = function(title) {
		$scope.sidebar.title = title;
	}
	$scope.open_map = function(e) {
		e.preventDefault();
		e.stopPropagation();
		$.magnificPopup.open({
			items: {
				src: "https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&hl=en&t=v&hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom"
			},
			type: "iframe"
		});
	}

})