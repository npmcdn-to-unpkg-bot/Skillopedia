// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("createCourseController", function($scope, $rootScope, $sce, $timeout, $location, $window, googleMapServices, skillopediaServices, filterFilter, coursesServices, errorServices, toastServices, localStorageService, config) {
	// 未认证，跳转认证
	// agent_level 1:普通用户 2:教练
	if ($rootScope.user.agent_level != "2") {
		$location.path("authenication").replace();
		return;
	}
	$window.onbeforeunload = function(e) {
		var dialogText = '确定离开网页吗？';
		e.returnValue = dialogText;
		return dialogText;
	}
	$scope.input = {};
	$scope.step = 1;
	$scope.show_step = function(step) {
		$scope.step = step;
		$("body").scrollTop(0);
	};
	// 获取新建课程id
	toastServices.show();
	coursesServices.prapare_create_course().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.course_id = data.course_id;
			// pickadate
			// $timeout(function() {
			// 	$(".pickadate").pickadate();
			// }, 0);
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// 分类列表
	$scope.category_1 = [];
	$scope.category_2 = {};
	$scope.$watch("input.category_1", function(n, o) {
		if (n === o) return;
		$scope.input.category_2 = $scope.category_2[$scope.input.category_1.name][0];
	});
	toastServices.show();
	coursesServices.query_category().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			angular.forEach(data.Result.Categorys, function(category) {
				var obj = {};
				obj.name = category.category_01_name;
				obj.id = category.category_01_id;
				$scope.category_1.push(obj);
				$scope.category_2[category.category_01_name] = [];
				angular.forEach(category.category02s, function(sub) {
					var temp_obj = {};
					temp_obj.name = sub.category_02_name;
					temp_obj.id = sub.category_02_id;
					$scope.category_2[category.category_01_name].push(temp_obj);
				})
			});
			$scope.input.category_1 = $scope.category_1[0];
			$scope.input.category_2 = $scope.category_2[$scope.input.category_1.name][0];
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// 证书列表
	$scope.input.certs = [];
	// 增加证书输入
	$scope.add_cert = function() {
		var cert = {
			id: "",
			random_id: "",
			title: "",
			time: "",
			url: "",
			institute: ""
		};
		$scope.input.certs.push(cert);
	};
	$scope.remove_cert = function(cert) {
		$scope.input.certs = $scope.input.certs.filter(function(c) {
			return cert != c;
		})
		if (cert.id == "") return;
		toastServices.show();
		coursesServices.remove_certification({
			course_certification_id: cert.id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	// 提交证书
	$scope.ajaxCert = function(cert, form) {
		if (form.$invalid) return;
		toastServices.show();
		coursesServices.create_certification({
			course_id: $scope.course_id,
			name: cert.title,
			get_time: cert.time,
			institue: cert.institute,
			filename: cert.url
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				cert.id = data.course_certification_id;
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	// 编辑证书
	$scope.editCert = function(cert, form) {
		if (form.$invalid) return;
		toastServices.show();
		coursesServices.edit_certification({
			course_certification_id: cert.id,
			name: cert.title,
			get_time: cert.time,
			institue: cert.institute,
			filename: cert.url
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	// 封面
	$scope.$on("upload_poster_success", function(event, args) {
		$scope.input.poster = args.message;
	});
	// 其他图片
	// mock {id:"",url:""}
	$scope.input.covers = [];
	$scope.$on("upload_cover_success", function(event, args) {
		$scope.input.covers.push(args.message)
	});
	// 移除封面
	$scope.remove_cover = function(cover) {
		$scope.input.covers = $scope.input.covers.filter(function(c) {
			return cover != c;
		})
	};
	// video 视频路径
	$scope.input.videos = [];
	// 增加视频输入
	$scope.add_video = function() {
		var video = {
			id: new Date().getTime(),
			url: "",
		}
		$scope.input.videos.push(video);
	};
	$scope.remove_video = function(video) {
		$scope.input.videos = $scope.input.videos.filter(function(v) {
			return video != v;
		})
	};
	// 第二步
	// 课程时长
	$scope.course_durations = ["60"];
	$scope.input.course_duration = $scope.course_durations[0];
	// teaching since
	$scope.input.teaching_since = "";
	// 课程费用
	$scope.input.rate = "";
	// 教育年限
	$scope.input.teaching_age = "";
	// addtional partner
	$scope.input.partner = "";
	$scope.input.surcharge = "";
	// 打折方式
	$scope.input.discount_1 = {
		purchase: 3,
		off: 0
	};
	$scope.input.discount_2 = {
		purchase: 5,
		off: 0
	};
	$scope.input.discount_3 = {
		purchase: 10,
		off: 0
	};
	// unit:["Money","Amount"]
	// $scope.input.discount = "by_amount";
	// $scope.input.discounts = [{
	// 	message: "One-time Purchase",
	// 	unit: "Money",
	// 	purchase: 3,
	// 	off: 0
	// }, {
	// 	message: "One-time Purchase",
	// 	unit: "Money",
	// 	purchase: 5,
	// 	off: 0
	// }, {
	// 	message: "One-time Purchase",
	// 	unit: "Money",
	// 	purchase: 10,
	// 	off: 0
	// }];
	// $scope.$watch("input.discounts[0].off", function(n, o) {
	// 	console.log(n)
	// 	if (!n) {
	// 		$scope.input.discounts[0].off = 0;
	// 	}
	// });
	// $scope.$watch("input.discounts[1].off", function(n, o) {
	// 	if (!n) {
	// 		$scope.input.discounts[1].off = 0;
	// 	}
	// });
	// $scope.$watch("input.discounts[2].off", function(n, o) {
	// 	if (!n) {
	// 		$scope.input.discounts[2].off = 0;
	// 	}
	// });
	// 增加打折输入
	// $scope.add_discount = function() {
	// 	var discount = {
	// 		message: "One-time Purchase",
	// 		unit: "Money",
	// 		purchase: "",
	// 		off: ""
	// 	}
	// 	if ($scope.input.discounts.length > 3) {
	// 		return;
	// 	}
	// 	if ($scope.input.discount == 'by_amount') {
	// 		discount.unit = "Amount";
	// 	}
	// 	$scope.input.discounts.push(discount);
	// }
	// $scope.remove_discount = function(discount) {
	// 	$scope.input.discounts = $scope.input.discounts.filter(function(d) {
	// 		return discount != d;
	// 	})
	// }
	// $scope.$watch("input.discount", function(n, o) {
	// 	if (n === o) {
	// 		return;
	// 	}
	// 	var unit = "Money";
	// 	if (n == "by_amount") {
	// 		unit = "Amount";
	// 	}
	// 	$scope.input.discounts = [{
	// 		message: "One-time Purchase",
	// 		unit: unit,
	// 		purchase: "",
	// 		off: ""
	// 	}];
	// })
	// $scope.confirm_discount = function(discount) {
	// 	if ($scope.input.discount == 'by_money' && discount.money != "" && discount.off != "") {
	// 		discount.mode = "preview";
	// 		return;
	// 	}
	// 	if ($scope.input.discount == 'by_amount' && discount.amount != "" && discount.off != "") {
	// 		discount.mode = "preview";
	// 		return;
	// 	}
	// 	errorServices.autoHide("请填写");
	// }
	// $scope.edit_discount = function(discount) {
	// 	discount.mode = "edit";
	// };
	// 第三步
	$scope.input.travel_to_session = "1";
	$scope.input.distance = "";
	$scope.input.traffic_cost = "";
	$scope.input.street = "";
	$scope.input.apt = "";
	$scope.input.city = "";
	$scope.input.state = "";
	// zipcode
	$scope.input.zipcode = "";
	var suggestions = [];
	toastServices.show();
	skillopediaServices.query_zipcode().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			suggestions = data.Result.CityBeans;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.$watch("input.zipcode", function(n, o) {
		$scope.input.suggestions = filterFilter(suggestions, n);
	})
	$scope.select = function(s) {
		$scope.input.zipcode = s.zipcode;
		$timeout(function() {
			$scope.input.suggestions = [];
		}, 100)
	};
	$scope.location_mode = "edit";
	$scope.lat_lng = {
		lng: 0,
		lat: 0
	}
	$scope.save_location = function() {
		$scope.location_mode = "preview";
		// $scope.map_url = $scope.get_map($scope.input.state, $scope.input.city, $scope.input.street, $scope.input.apt);
		googleMapServices.geocoding({
			address: $scope.input.street + "," + $scope.input.apt + "," + $scope.input.city + "," + $scope.input.state + "," + $scope.input.zipcode
		}).then(function(data) {
			console.log(data)
			$scope.lat_lng = data.results[0].geometry.location;
			$scope.format_address = data.results[0].formatted_address;
			var map = googleMapServices.create_map(document.getElementById('map'), $scope.lat_lng);
			// console.log(map)
			var marker = googleMapServices.create_marker(map, $scope.lat_lng);
			marker.addListener("dragend", function(e) {
				$scope.$apply(function() {
					$scope.lat_lng = e.latLng.toJSON()
				})
			})
		})
	}
	$scope.edit_location = function() {
		$scope.location_mode = "edit";
	};
	// parse iframe map url
	$scope.get_map = function(state, city, street, apt) {
		var map_url = "https://maps.google.com/maps?q=" + state + city + street + apt + "&output=embed";
		return $sce.trustAsResourceUrl(map_url);
	};
	// 第四步;
	$scope.time_slots = [{
		time: "09:00",
		slot: "1"
	}, {
		time: "09:30",
		slot: "2"
	}, {
		time: "10:00",
		slot: "3"
	}, {
		time: "10:30",
		slot: "4"
	}, {
		time: "11:00",
		slot: "5"
	}, {
		time: "11:30",
		slot: "6"
	}, {
		time: "12:00",
		slot: "7"
	}, {
		time: "12:30",
		slot: "8"
	}, {
		time: "13:00",
		slot: "9"
	}, {
		time: "13:30",
		slot: "10"
	}, {
		time: "14:00",
		slot: "11"
	}, {
		time: "14:30",
		slot: "12"
	}, {
		time: "15:00",
		slot: "13"
	}, {
		time: "15:30",
		slot: "14"
	}, {
		time: "16:00",
		slot: "15"
	}, {
		time: "16:30",
		slot: "16"
	}, {
		time: "17:00",
		slot: "17"
	}, {
		time: "17:30",
		slot: "18"
	}, {
		time: "18:00",
		slot: "19"
	}, {
		time: "18:30",
		slot: "20"
	}, {
		time: "19:00",
		slot: "21"
	}, {
		time: "19:30",
		slot: "22"
	}, {
		time: "20:00",
		slot: "23"
	}, {
		time: "20:30",
		slot: "24"
	}];
	$scope.$watch("input.start_time", function(n, o) {
		$scope.get_time_slots(n);
	});
	$scope.input.weeks = [{
		day: "Sunday",
		value: "1",
		select: true,
	}, {
		day: "Monday",
		value: "2",
		select: true,
	}, {
		day: "Tuesday",
		value: "3",
		select: true,
	}, {
		day: "Wensday",
		value: "4",
		select: true,
	}, {
		day: "Thursday",
		value: "5",
		select: true,
	}, {
		day: "Friday",
		value: "6",
		select: true,
	}, {
		day: "Saturday",
		value: "7",
		select: true,
	}];
	$scope.select_week = function(week) {
		week.select = !week.select;
	}
	$scope.get_time_slots = function(slot) {
		$scope.end_time_slots = $scope.time_slots.filter(function(s) {
			return parseFloat(s.slot) > parseFloat(slot);
		});
	};
	$scope.input.start_time = $scope.time_slots[0].slot;
	$scope.input.end_time = $scope.time_slots[23].slot;
	// 提交表单 最终创建课程
	$scope.ajaxForm = function() {
		// var discount_onetion_pur_money_01, discount_price_01, discount_onetion_pur_money_02, discount_price_02, discount_onetion_pur_money_03, discount_price_03;
		// if ($scope.input.discounts.length > 0) {
		// 	discount_onetion_pur_money_01 = $scope.input.discounts[0].purchase;
		// 	discount_price_01 = $scope.input.discounts[0].off;
		// }
		// if ($scope.input.discounts.length > 1) {
		// 	discount_onetion_pur_money_02 = $scope.input.discounts[1].purchase;
		// 	discount_price_02 = $scope.input.discounts[1].off;
		// }
		// if ($scope.input.discounts.length > 2) {
		// 	discount_onetion_pur_money_03 = $scope.input.discounts[2].purchase;
		// 	discount_price_03 = $scope.input.discounts[2].off;
		// }
		toastServices.show();
		coursesServices.create_course({
			course_id: $scope.course_id,
			title: $scope.input.title,
			category_01_id: $scope.input.category_1.id,
			category_01_name: $scope.input.category_1.name,
			category_02_id: $scope.input.category_2.id,
			category_02_name: $scope.input.category_2.name,
			overview: $scope.input.overview,
			fileName: $scope.input.covers.join("#"),
			vedioURL: $scope.input.videos.map(function(video) {
				return video.url
			}).join("#"),
			session_length: $scope.input.course_duration,
			session_rate: $scope.input.rate,
			teaching_age: $scope.input.teaching_age,
			teaching_since: $scope.input.teaching_since,
			travel_to_session: $scope.input.travel_to_session,
			travel_to_session_distance: $scope.input.distance,
			travel_to_session_trafic_surcharge: $scope.input.traffic_cost,
			city: $scope.input.state,
			area: $scope.input.city,
			street: $scope.input.street,
			address: $scope.input.apt,
			zipcode: $scope.input.zipcode,
			latitude: $scope.lat_lng.lat,
			longitude: $scope.lat_lng.lng,
			additional_partner: $scope.input.partner,
			surcharge_for_each: $scope.input.surcharge,
			discount_type: "2", //$scope.input.discount == "by_money" ? "1" : "2",
			discount_onetion_pur_money_01: $scope.input.discount_1.purchase || "",
			discount_price_01: $scope.input.discount_1.off || "",
			discount_onetion_pur_money_02: $scope.input.discount_2.purchase || "",
			discount_price_02: $scope.input.discount_2.off || "",
			discount_onetion_pur_money_03: $scope.input.discount_3.purchase || "",
			discount_price_03: $scope.input.discount_3.off || "",
			start_time_slot: $scope.input.start_time,
			end_time_slot: $scope.input.end_time,
			weeks: $scope.input.weeks.filter(function(week) {
				return week.select;
			}).map(function(w) {
				return w.value;
			}).join("#"),
			user_images_01: $scope.input.poster
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message, 7000);
				$timeout(function() {
					// $rootScope.back();
					// $window.close();
					$location.path("skillopedia").replace();
				}, 7000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
});
// uploadController upload certs
angular.module("Skillopedia").controller("uploadController", function($scope, errorServices, toastServices, localStorageService, config) {
	var filename, extension;
	$scope.$on("flow::filesSubmitted", function(event, flow) {
		if (flow.files.length == 0) return;
		flow.files[0].name.replace(/.png|.jpg|.jpeg|.gif/g, function(ext) {
			extension = ext;
			return ext;
		})
		filename = new Date().getTime() + extension;
		flow.opts.target = config.url + "/app/Experiences/updatePic";
		flow.opts.testChunks = false;
		flow.opts.fileParameterName = "image_01";
		flow.opts.query = {
			"invoke": "h5",
			"token": localStorageService.get("token"),
			"filename": filename
		};
		flow.upload();
	});
	$scope.$on('flow::fileAdded', function(event, flowFile, flow) {
		if (!{
				png: 1,
				gif: 1,
				jpg: 1,
				jpeg: 1
			}[flow.getExtension()]) {
			errorServices.autoHide("必须上传图片")
			event.preventDefault(); //prevent file from uploading
			return;
		}
		if (parseFloat(flow.size) / 1000 > 500) {
			errorServices.autoHide("图片太大，保证图片在500kb以内")
			event.preventDefault(); //prevent file from uploading
			return;
		}
		$scope.cert.url = "";
	});
	$scope.$on('flow::fileSuccess', function(file, message, chunk) {
		$scope.cert.url = filename;
	});
});
// uploadCoversController
angular.module("Skillopedia").controller("uploadCoversController", function($scope, errorServices, toastServices, localStorageService, config) {
	var filename, extension;
	$scope.$on("flow::filesSubmitted", function(event, flow) {
		if (flow.files.length == 0) return;
		flow.files[0].name.replace(/.png|.jpg|.jpeg|.gif/g, function(ext) {
			extension = ext;
			return ext;
		})
		filename = new Date().getTime() + extension;
		flow.opts.target = config.url + "/app/Experiences/updatePic";
		flow.opts.testChunks = false;
		flow.opts.fileParameterName = "image_01";
		flow.opts.query = {
			"invoke": "h5",
			"token": localStorageService.get("token"),
			"filename": filename
		};
		toastServices.show();
		flow.upload();
	});
	$scope.$on('flow::fileAdded', function(event, flowFile, flow) {
		if (!{
				png: 1,
				gif: 1,
				jpg: 1,
				jpeg: 1
			}[flow.getExtension()]) {
			errorServices.autoHide("必须上传图片")
			event.preventDefault(); //prevent file from uploading
			return;
		}
		// if (parseFloat(flow.size) / 1000 > 500) {
		// 	errorServices.autoHide("图片太大，保证图片在500kb以内")
		// 	event.preventDefault(); //prevent file from uploading
		// 	return;
		// }
		// $scope.cover.url = "";
	});
	$scope.$on('flow::fileSuccess', function(file, message, chunk) {
		$scope.$flow.files = [];
		$scope.$emit("upload_cover_success", {
			message: filename
		});
		toastServices.hide();
	});
});
// uploadCoversController
angular.module("Skillopedia").controller("uploadPosterController", function($scope, errorServices, toastServices, localStorageService, config) {
	var filename, extension;
	$scope.$on("flow::filesSubmitted", function(event, flow) {
		if (flow.files.length == 0) return;
		flow.files[0].name.replace(/.png|.jpg|.jpeg|.gif/g, function(ext) {
			extension = ext;
			return ext;
		})
		filename = new Date().getTime() + extension;
		flow.opts.target = config.url + "/app/Experiences/updatePic";
		flow.opts.testChunks = false;
		flow.opts.fileParameterName = "image_01";
		flow.opts.query = {
			"invoke": "h5",
			"token": localStorageService.get("token"),
			"filename": filename
		};
		toastServices.show();
		flow.upload();
	});
	$scope.$on('flow::fileAdded', function(event, flowFile, flow) {
		if (!{
				png: 1,
				gif: 1,
				jpg: 1,
				jpeg: 1
			}[flow.getExtension()]) {
			errorServices.autoHide("必须上传图片")
			event.preventDefault(); //prevent file from uploading
			return;
		}
		if (parseFloat(flow.size) / 1000 > 500) {
			errorServices.autoHide("图片太大，保证图片在500kb以内")
			event.preventDefault(); //prevent file from uploading
			return;
		}
		// $scope.cover.url = "";
	});
	$scope.$on('flow::fileSuccess', function(file, message, chunk) {
		$scope.$flow.files = [];
		$scope.$emit("upload_poster_success", {
			message: filename
		});
		toastServices.hide();
	});
})