// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").controller("landingController", function($scope, $rootScope, $location, $route, $window, $timeout, facebookServices, userServices, errorServices, toastServices, localStorageService, config) {
	if ($rootScope.is_signin()) {
		$rootScope.back();
	}
	$scope.input = {
		signin_email: "",
		signin_password: "",
		signup_username: "",
		signup_email: "",
		signup_password: "",
		forget_email: "",
	}
	$scope.signin_action = function() {
		toastServices.show();
		userServices.rsa_key().then(function(data) {
			var crypt = new JSEncrypt(),
				private_key = data;
			crypt.setPrivateKey(private_key);
			var crypted_str = crypt.encrypt($scope.input.signin_password);
			$scope.input.signin_password = crypted_str;
		}).then(function(data) {
			toastServices.show();
			userServices.signin({
				email: $scope.input.signin_email,
				password: $scope.input.signin_password,
				t_uid: localStorageService.get("t_uid"),
				f_uid: localStorageService.get("f_uid")
			}).then(function(data) {
				toastServices.hide();
				if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
					localStorageService.set("token", data.token);
					userServices.sync();
					// $rootScope.back();
					errorServices.autoHide(data.message);
					$location.path("index").replace();
					$timeout(function() {
						$window.location.href = $location.protocol() + "://" + $location.host() + ":" + $location.port();
					}, 2000)
				} else {
					errorServices.autoHide(data.message);
				}
				$scope.input.signin_password = "";
			})
		})
	}
	$scope.signup_action = function() {
		toastServices.show();
		userServices.signup({
			nickname: $scope.input.username,
			email: $scope.input.signup_email,
			password: $scope.input.signup_password,
			t_uid: localStorageService.get("t_uid"),
			f_uid: localStorageService.get("f_uid")
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				localStorageService.set("token", data.user.token);
				$rootScope.user = data.user;
				errorServices.autoHide(data.message);
				$location.path("index").replace();
				$timeout(function() {
					$window.location.href = $location.protocol() + "://" + $location.host() + ":" + $location.port();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.forget_action = function() {
		toastServices.show();
		userServices.forget({
			email: $scope.input.forget_email,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.sign = "signin";
	$scope.signin = function() {
		$scope.sign = "signin";
	}
	$scope.signup = function() {
			$scope.sign = "signup";
		}
		// oauth
	$scope.facebook_login = function() {
		$window.FB && facebookServices.login().then(function(data) {
			localStorageService.set("f_uid", data.id)
			toastServices.show();
			userServices.login_by_oauth({
				u_type: "1",
				uid: localStorageService.get("f_uid"),
			}).then(function(data) {
				toastServices.hide()
				if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
					localStorageService.set("token", data.token);
					userServices.sync();
					$rootScope.close_popup_signin();
					$route.reload();
				} else {
					$window.location.href = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/landing_facebook.html";
				}
			})
		});
	}
	$scope.twitter_login = function() {
		$window.location.href = config.url + "/twitterOne";
	}
	$scope.go = function() {
		$window.location.href = $location.protocol() + "://" + $location.host() + ":" + $location.port();
	}
});