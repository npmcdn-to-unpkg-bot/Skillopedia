 // by dribehance <dribehance.kksdapp.com>
 // EventHandle
 angular.module("Skillopedia").factory("appServices", function($rootScope, $window, $location, userServices, localStorageService, errorServices, toastServices, config) {
 	var routeChangeStart = function(e) {
 		// do something white routechangestart,eg:
 		// toastServices.show();
 	}
 	var routeChangeSuccess = function(e, currentRoute, prevRoute) {
 		// do something white routechangesuccess,eg:
 		toastServices.hide();
 		errorServices.hide();
 		navBarHandler(e, currentRoute, prevRoute);
 	}
 	var routeChangeError = function(e, currentRoute, prevRoute) {
 		// do something white routechangesuccess,eg:
 		// $rootScope.back();
 	}
 	var navBarHandler = function(e, currentRoute, prevRoute) {
 		// handle navbar
 	}
 	var onBackKeyDown = function() {
 		$rootScope.$apply(function() {
 			$rootScope.back();
 		});
 	}
 	var popup_signin = function() {
 		$.magnificPopup.open({
 			items: {
 				src: '#signin-popup'
 			},
 			type: 'inline'
 		}, 0);
 	}
 	var close_popup_signin = function() {
 		$.magnificPopup.close();
 	}
 	return {
 		init: function() {
 			$rootScope.$on("$routeChangeStart", routeChangeStart);
 			$rootScope.$on("$routeChangeSuccess", routeChangeSuccess);
 			$rootScope.$on("$routeChangeError", routeChangeError);
 			$rootScope.signin = function() {
 				$rootScope.sign = "signin";
 				popup_signin();
 			}
 			$rootScope.signup = function() {
 				$rootScope.sign = "signup";
 				popup_signin();
 			}
 			$rootScope.forget = function() {
 				$rootScope.sign = "forget";
 				popup_signin();
 			}
 			$rootScope.back = function() {
 				$window.history.back();
 			}
 			$rootScope.go = function(path) {
 				$location.path(path);
 			}
 			$rootScope.popup_signin = function() {
 				popup_signin();
 			}
 			$rootScope.close_popup_signin = function() {
 				close_popup_signin();
 			}
 			$rootScope.is_signin = function() {
 				if (localStorageService.get("token")) {
 					return true;
 				}
 				return false;
 			}
 			if (localStorageService.get("token")) {
 				userServices.query_basicinfo().then(function(data) {
 					if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
 						$rootScope.user = data.Result.UserInfo;
 					} else {
 						errorServices.autoHide(data.message);
 					}
 				})
 			}
 			$rootScope.staticImageUrl = config.imageUrl;
 		}
 	}
 });