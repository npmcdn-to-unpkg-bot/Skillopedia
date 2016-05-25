 // by dribehance <dribehance.kksdapp.com>
 // EventHandle
 angular.module("Skillopedia").factory("appServices", function($rootScope, $window, $location, errorServices, toastServices, config) {
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
 			$rootScope.go = function(path) {
 				$location.path(path);
 			}
 			$rootScope.staticImageUrl = config.imageUrl;
 		}
 	}
 });