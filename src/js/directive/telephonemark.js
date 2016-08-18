// by dribehance <dribehance.kksdapp.com>
angular.module("Skillopedia").directive('mark', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var us_telephone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                is_backspace = false;
            ctrl.$parsers.push(function(viewValue) {
                if (is_backspace) {
                    is_backspace = false;
                    return;
                }
                viewValue = format_telephone(viewValue);
                ctrl.$setViewValue(viewValue);
                if (us_telephone.test(viewValue)) {
                    ctrl.$setValidity("mark", true);
                } else {
                    ctrl.$setValidity("mark", false);
                }
                ctrl.$render();
                return viewValue;
            });
            $(element).bind("keydown", function(e) {
                if (!(e.key.match(/[0-9]/) || e.key == "Backspace")) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                if (e.key == "Backspace" && ctrl.$viewValue) {
                    is_backspace = true;
                    return;
                }
            });

            function format_telephone(str) {
                if (!str) return;
                str = str.replace(/-/g, "");
                str = str.substring(0, 10);
                str = str.replace(/[0-9]{6}/, function(replacement) {
                    return replacement + "-";
                })
                str = str.replace(/[0-9]{3}/, function(replacement) {
                    return replacement + "-";
                })
                return str;
            };
        }
    };
});