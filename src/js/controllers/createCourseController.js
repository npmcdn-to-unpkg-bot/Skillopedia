// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("createCourseController", function($scope, coursesServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.step = 1;
	$scope.show_step = function(step) {
		$scope.step = step;
	}
	$scope.location_mode = "edit";
	$scope.save = function() {
		$scope.location_mode = "preview";
	}
	$scope.edit = function() {
		$scope.location_mode = "edit";
	};
	// 获取新建课程id
	toastServices.show();
	coursesServices.prapare_create_course().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.course_id = data.course_id
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
	$scope.input.certs = [{
		id: "",
		title: "",
		time: "",
		url: "",
		institute: ""
	}];
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
	$scope.ajaxCert = function(cert) {
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
	$scope.editCert = function(cert) {
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
		$scope.input.videos.push("http://");
		console.log($scope.input.videos);
	};
	$scope.remove_video = function(video) {
		$scope.input.videos = $scope.input.videos.filter(function(v) {
			return video != v;
		})
	};
	// 提交表单 最终创建课程
	$scope.ajaxForm = function() {
		console.log($scope.input.certs)
	}
});
// uploadController upload certs
angular.module("Skillopedia").controller("uploadController", function($scope, errorServices, toastServices, localStorageService, config) {
	var filename, extension;
	$scope.$on("flow::filesSubmitted", function(event, flow) {
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
	$scope.$on('flow::fileAdded', function(file, message, chunk) {
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
	$scope.$on('flow::fileAdded', function(file, message, chunk) {
		// $scope.cover.url = "";
	});
	$scope.$on('flow::fileSuccess', function(file, message, chunk) {
		$scope.$flow.files = [];
		$scope.$emit("upload_cover_success", {
			message: filename
		});
		toastServices.hide();
	});
})