// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").factory("browserServices", function() {
	var tips = "<!-- ie -->" +
		"<div class='overlay'>" +
		"<div class='browser-message text-center'>" +
		"<h1>May be Chrome should be your first choice !</h1>" +
		"<a class='btn btn-primary' ng-href='http://www.google.cn/chrome/browser' target='_blank'>download chrome</a>" +
		"</div>" +
		"</div>";
	return {
		// Opera 8.0+
		isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
		// Firefox 1.0+
		isFirefox: typeof InstallTrigger !== 'undefined',
		// At least Safari 3+: "[object HTMLElementConstructor]"
		isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
		// Internet Explorer 6-11
		isIE: /*@cc_on!@*/ false || !!document.documentMode,
		// Edge 20+
		isEdge: !this.isIE && !!window.StyleMedia,
		// Chrome 1+
		isChrome: !!window.chrome && !!window.chrome.webstore,
		// Blink engine detection
		isBlink: (this.isChrome || this.isOpera) && !!window.CSS,
		detect: function() {
			if (this.isIE && $("html").hasClass("lt-ie10")) {
				$("body").append($(tips))
			}
		}
	}
});