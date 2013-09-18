/* angular-spinner version 0.2.1
 * License: MIT.
 * Copyright (C) 2013, Uri Shaked.
 */

'use strict';

angular.module('angularSpinner', [])
	.provider('usSpinner', [function () {
		var defaults = {};
		this.setDefaults = function (defs) {
			defaults = defs;
		};
		this.$get = ['$window', function ($window) {
			return function (opts) {
				var spinner;
				var config = angular.copy(defaults);
				angular.extend(config, opts || {});
				spinner = new $window.Spinner(config);
				return spinner;
			};
		}];
	}])

	.directive('usSpinner', ['usSpinner', function (usSpinner) {
		return {
			scope: true,
			link: function (scope, element, attr) {
				scope.spinner = null;

				function stopSpinner() {
					if (scope.spinner) {
						scope.spinner.stop();
						scope.spinner = null;
					}
				}

				scope.$watch(attr.usSpinner, function (options) {
					stopSpinner();
					scope.spinner = usSpinner(options);
					scope.spinner.spin(element[0]);
				}, true);

				scope.$on('$destroy', function () {
					stopSpinner();
				});
			}
		};
	}]);
