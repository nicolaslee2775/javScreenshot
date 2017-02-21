angular.module('starter.directive', [])

.directive('avCode', function (codeValidationService) {
	return {
		require: 'ngModel',
		link: function (scope, elm, attrs, ctrl) {
			
			/*ctrl.$validators.avcode = function (modelValue, viewValue) {
				console.log('[avcode] modelValue: ', modelValue, ', viewValue: ', viewValue);

				if (ctrl.$isEmpty(modelValue)) {
					// consider empty models to be valid
					return true;
				}

				if (codeValidation.codeValidate(viewValue).valid) {
					// it is valid
					return true;
				}

				// it is invalid
				return false;

				
			};*/

			function customValidator(ngModelValue) {
        
				if (codeValidationService.codeValidate(ngModelValue).valid) {
					ctrl.$setValidity('avCode', true);
				} else {
					ctrl.$setValidity('avCode', false);
				}

				return ngModelValue;
			}

			ctrl.$parsers.push(customValidator);
		}
	};
});