/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/build/sweepstakes.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = function () {\n\treturn this;\n}();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/js/build/sweepstakes.js":
/*!*************************************!*\
  !*** ./src/js/build/sweepstakes.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plugins_validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plugins/validate */ \"./src/js/plugins/validate.js\");\n/* harmony import */ var _plugins_validate__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_plugins_validate__WEBPACK_IMPORTED_MODULE_0__);\n/**\n* sweepstakes\n*\n* import dependencies\n* fire functions\n*/\n\n/**\n* import dependencies\n*/\n\n\n/**\n*\n* namespace\n* run\n* fire functions\n*/\n\n/**\n* Sweepstakes namespace\n* @type {Object}\n*/\nSDG.Sweepstakes = SDG.Sweepstakes || {};\n\nSDG.Sweepstakes.config = {\n\tmodal: {\n\t\tid: 'modalSweep',\n\t\ttrigger: 'modalSweepTrigger',\n\t\toverlay: 'modalSweepOverlay'\n\t}\n};\n\nSDG.Sweepstakes.run = function (opts) {\n\tconst c = _.extend(SDG.Sweepstakes.config, opts);\n\t// Sweepstakes modal\n\tconst modalOpts = {\n\t\tdom: {\n\t\t\tmodal_id: c.modal.id,\n\t\t\toverlay: c.modal.overlay,\n\t\t\ttrigger: c.modal.trigger\n\t\t}\n\t};\n\tconst modalSweep = SDG.Modal.init(modalOpts);\n\tconst placeholder = SDG.placeholder({\n\t\tid: 'form302'\n\t});\n\n\tfunction init() {\n\t\tconst hash = window.location.hash.substring(1);\n\t\tif (window.location.hash) {\n\n\t\t\tif (hash === 'thanks') {\n\t\t\t\tdocument.getElementById('formWrap').style.display = 'none';\n\t\t\t\tdocument.getElementById('formThanks').style.display = 'block';\n\t\t\t}\n\t\t}\n\n\t\t// modal init\n\t\tmodalSweep.init();\n\n\t\t// placeholder init\n\t\tplaceholder.init();\n\n\t\t// validate init\n\t\t_plugins_validate__WEBPACK_IMPORTED_MODULE_0___default.a.init();\n\t}\n\n\treturn init();\n};\n\nSDG.Sweepstakes.run();\n\n//# sourceURL=webpack:///./src/js/build/sweepstakes.js?");

/***/ }),

/***/ "./src/js/plugins/validate.js":
/*!************************************!*\
  !*** ./src/js/plugins/validate.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!\n * validate v2.2.0: A lightweight form validation script that augments native HTML5 form validation elements and attributes.\n * (c) 2018 Chris Ferdinandi\n * MIT License\n * http://github.com/cferdinandi/validate\n */\n\n(function (root, factory) {\n\tif (true) {\n\t\t!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory(root)),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t} else {}\n})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {\n\n\t'use strict';\n\n\t//\n\t// Variables\n\t//\n\n\tvar validate = {}; // Object for public APIs\n\tvar settings;\n\n\t// Default settings\n\tvar defaults = {\n\n\t\t// Classes and Selectors\n\t\tselector: '[data-validate]',\n\t\tfieldClass: 'error',\n\t\terrorClass: 'error-message',\n\n\t\t// Messages\n\t\tmessageValueMissing: 'Please fill out this field.',\n\t\tmessageValueMissingCheckbox: 'This field is required.',\n\t\tmessageValueMissingRadio: 'Please select a value.',\n\t\tmessageValueMissingSelect: 'Please select a value.',\n\t\tmessageValueMissingSelectMulti: 'Please select at least one value.',\n\t\tmessageTypeMismatchEmail: 'Please enter an email address.',\n\t\tmessageTypeMismatchURL: 'Please enter a URL.',\n\t\tmessageTooShort: 'Please lengthen this text to {minLength} characters or more. You are currently using {length} characters.',\n\t\tmessageTooLong: 'Please shorten this text to no more than {maxLength} characters. You are currently using {length} characters.',\n\t\tmessagePatternMismatch: 'Please match the requested format.',\n\t\tmessageBadInput: 'Please enter a number.',\n\t\tmessageStepMismatch: 'Please select a valid value.',\n\t\tmessageRangeOverflow: 'Please select a value that is no more than {max}.',\n\t\tmessageRangeUnderflow: 'Please select a value that is no less than {min}.',\n\t\tmessageGeneric: 'The value you entered for this field is invalid.',\n\n\t\t// Form Submission\n\t\tdisableSubmit: false,\n\t\tonSubmit: function () {},\n\n\t\t// Callbacks\n\t\tbeforeShowError: function () {},\n\t\tafterShowError: function () {},\n\t\tbeforeRemoveError: function () {},\n\t\tafterRemoveError: function () {}\n\n\t};\n\n\t//\n\t// Methods\n\t//\n\n\t/**\n  * Element.matches() polyfill (simple version)\n  * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill\n  */\n\tif (!Element.prototype.matches) {\n\t\tElement.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;\n\t}\n\n\t/**\n  * Feature test\n  * @return {Boolean} Returns true if required methods and APIs are supported by the browser\n  */\n\tvar supports = function () {\n\t\treturn 'querySelector' in document && 'addEventListener' in root;\n\t};\n\n\t/**\n  * Merge two or more objects. Returns a new object.\n  * @private\n  * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]\n  * @param {Object}   objects  The objects to merge together\n  * @returns {Object}          Merged values of defaults and options\n  */\n\tvar extend = function () {\n\n\t\t// Variables\n\t\tvar extended = {};\n\t\tvar deep = false;\n\t\tvar i = 0;\n\t\tvar length = arguments.length;\n\n\t\t// Check if a deep merge\n\t\tif (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {\n\t\t\tdeep = arguments[0];\n\t\t\ti++;\n\t\t}\n\n\t\t// Merge the object into the extended object\n\t\tvar merge = function (obj) {\n\t\t\tfor (var prop in obj) {\n\t\t\t\tif (Object.prototype.hasOwnProperty.call(obj, prop)) {\n\t\t\t\t\t// If deep merge and property is an object, merge properties\n\t\t\t\t\tif (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {\n\t\t\t\t\t\textended[prop] = extend(true, extended[prop], obj[prop]);\n\t\t\t\t\t} else {\n\t\t\t\t\t\textended[prop] = obj[prop];\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\t// Loop through each object and conduct a merge\n\t\tfor (; i < length; i++) {\n\t\t\tvar obj = arguments[i];\n\t\t\tmerge(obj);\n\t\t}\n\n\t\treturn extended;\n\t};\n\n\t/**\n  * Get the closest matching element up the DOM tree.\n  * @private\n  * @param  {Element} elem     Starting element\n  * @param  {String}  selector Selector to match against\n  * @return {Boolean|Element}  Returns null if not match found\n  */\n\tvar getClosest = function (elem, selector) {\n\t\tfor (; elem && elem !== document; elem = elem.parentNode) {\n\t\t\tif (elem.matches(selector)) return elem;\n\t\t}\n\t\treturn null;\n\t};\n\n\t/**\n  * Validate a form field\n  * @public\n  * @param  {Node}    field   The field to validate\n  * @param  {Object}  options User options\n  * @return {String}          The error message\n  */\n\tvalidate.hasError = function (field, options) {\n\n\t\t// Merge user options with existing settings or defaults\n\t\tvar localSettings = extend(settings || defaults, options || {});\n\n\t\t// Don't validate submits, buttons, file and reset inputs, and disabled fields\n\t\tif (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;\n\n\t\t// Get validity\n\t\tvar validity = field.validity;\n\n\t\t// If valid, return null\n\t\tif (validity.valid) return;\n\n\t\t// If field is required and empty\n\t\tif (validity.valueMissing) {\n\n\t\t\tif (field.type === 'checkbox') return localSettings.messageValueMissingCheckbox;\n\n\t\t\tif (field.type === 'radio') return localSettings.messageValueMissingRadio;\n\n\t\t\tif (field.type === 'select-multiple') return localSettings.messageValueMissingSelectMulti;\n\n\t\t\tif (field.type === 'select-one') return localSettings.messageValueMissingSelect;\n\n\t\t\treturn localSettings.messageValueMissing;\n\t\t}\n\n\t\t// If not the right type\n\t\tif (validity.typeMismatch) {\n\n\t\t\t// Email\n\t\t\tif (field.type === 'email') return localSettings.messageTypeMismatchEmail;\n\n\t\t\t// URL\n\t\t\tif (field.type === 'url') return localSettings.messageTypeMismatchURL;\n\t\t}\n\n\t\t// If too short\n\t\tif (validity.tooShort) return localSettings.messageTooShort.replace('{minLength}', field.getAttribute('minLength')).replace('{length}', field.value.length);\n\n\t\t// If too long\n\t\tif (validity.tooLong) return localSettings.messageTooLong.replace('{minLength}', field.getAttribute('maxLength')).replace('{length}', field.value.length);\n\n\t\t// If number input isn't a number\n\t\tif (validity.badInput) return localSettings.messageBadInput;\n\n\t\t// If a number value doesn't match the step interval\n\t\tif (validity.stepMismatch) return localSettings.messageStepMismatch;\n\n\t\t// If a number field is over the max\n\t\tif (validity.rangeOverflow) return localSettings.messageRangeOverflow.replace('{max}', field.getAttribute('max'));\n\n\t\t// If a number field is below the min\n\t\tif (validity.rangeUnderflow) return localSettings.messageRangeUnderflow.replace('{min}', field.getAttribute('min'));\n\n\t\t// If pattern doesn't match\n\t\tif (validity.patternMismatch) {\n\n\t\t\t// If pattern info is included, return custom error\n\t\t\tif (field.hasAttribute('title')) return field.getAttribute('title');\n\n\t\t\t// Otherwise, generic error\n\t\t\treturn localSettings.messagePatternMismatch;\n\t\t}\n\n\t\t// If all else fails, return a generic catchall error\n\t\treturn localSettings.messageGeneric;\n\t};\n\n\t/**\n  * Show an error message on a field\n  * @public\n  * @param  {Node}   field   The field to show an error message for\n  * @param  {String} error   The error message to show\n  * @param  {Object} options User options\n  */\n\tvalidate.showError = function (field, error, options) {\n\n\t\t// Merge user options with existing settings or defaults\n\t\tvar localSettings = extend(settings || defaults, options || {});\n\n\t\t// Before show error callback\n\t\tlocalSettings.beforeShowError(field, error);\n\n\t\t// Add error class to field\n\t\tfield.classList.add(localSettings.fieldClass);\n\n\t\t// If the field is a radio button and part of a group, error all and get the last item in the group\n\t\tif (field.type === 'radio' && field.name) {\n\t\t\tvar group = document.getElementsByName(field.name);\n\t\t\tif (group.length > 0) {\n\t\t\t\tfor (var i = 0; i < group.length; i++) {\n\t\t\t\t\tif (group[i].form !== field.form) continue; // Only check fields in current form\n\t\t\t\t\tgroup[i].classList.add(localSettings.fieldClass);\n\t\t\t\t}\n\t\t\t\tfield = group[group.length - 1];\n\t\t\t}\n\t\t}\n\n\t\t// Get field id or name\n\t\tvar id = field.id || field.name;\n\t\tif (!id) return;\n\n\t\t// Check if error message field already exists\n\t\t// If not, create one\n\t\tvar message = field.form.querySelector('.' + localSettings.errorClass + '#error-for-' + id);\n\t\tif (!message) {\n\t\t\tmessage = document.createElement('div');\n\t\t\tmessage.className = localSettings.errorClass;\n\t\t\tmessage.id = 'error-for-' + id;\n\n\t\t\t// If the field is a radio button or checkbox, insert error after the label\n\t\t\tvar label;\n\t\t\tif (field.type === 'radio' || field.type === 'checkbox') {\n\t\t\t\tlabel = field.form.querySelector('label[for=\"' + id + '\"]') || getClosest(field, 'label');\n\t\t\t\tif (label) {\n\t\t\t\t\tlabel.parentNode.insertBefore(message, label.nextSibling);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Otherwise, insert it after the field\n\t\t\tif (!label) {\n\t\t\t\tfield.parentNode.insertBefore(message, field.nextSibling);\n\t\t\t}\n\t\t}\n\n\t\t// Add ARIA role to the field\n\t\tfield.setAttribute('aria-describedby', 'error-for-' + id);\n\n\t\t// Update error message\n\t\tmessage.innerHTML = error;\n\n\t\t// Remove any existing styles hiding the error message\n\t\tmessage.style.display = '';\n\t\tmessage.style.visibility = '';\n\n\t\t// After show error callback\n\t\tlocalSettings.afterShowError(field, error);\n\t};\n\n\t/**\n  * Remove an error message from a field\n  * @public\n  * @param  {Node}   field   The field to remove the error from\n  * @param  {Object} options User options\n  */\n\tvalidate.removeError = function (field, options) {\n\n\t\t// Merge user options with existing settings or defaults\n\t\tvar localSettings = extend(settings || defaults, options || {});\n\n\t\t// Before remove error callback\n\t\tlocalSettings.beforeRemoveError(field);\n\n\t\t// Remove ARIA role from the field\n\t\tfield.removeAttribute('aria-describedby');\n\n\t\t// Remove error class to field\n\t\tfield.classList.remove(localSettings.fieldClass);\n\n\t\t// If the field is a radio button and part of a group, remove error from all and get the last item in the group\n\t\tif (field.type === 'radio' && field.name) {\n\t\t\tvar group = document.getElementsByName(field.name);\n\t\t\tif (group.length > 0) {\n\t\t\t\tfor (var i = 0; i < group.length; i++) {\n\t\t\t\t\tif (group[i].form !== field.form) continue; // Only check fields in current form\n\t\t\t\t\tgroup[i].classList.remove(localSettings.fieldClass);\n\t\t\t\t}\n\t\t\t\tfield = group[group.length - 1];\n\t\t\t}\n\t\t}\n\n\t\t// Get field id or name\n\t\tvar id = field.id || field.name;\n\t\tif (!id) return;\n\n\t\t// Check if an error message is in the DOM\n\t\tvar message = field.form.querySelector('.' + localSettings.errorClass + '#error-for-' + id + '');\n\t\tif (!message) return;\n\n\t\t// If so, hide it\n\t\tmessage.innerHTML = '';\n\t\tmessage.style.display = 'none';\n\t\tmessage.style.visibility = 'hidden';\n\n\t\t// After remove error callback\n\t\tlocalSettings.afterRemoveError(field);\n\t};\n\n\t/**\n  * Add the `novalidate` attribute to all forms\n  * @private\n  * @param {Boolean} remove  If true, remove the `novalidate` attribute\n  */\n\tvar addNoValidate = function (remove) {\n\t\tvar forms = document.querySelectorAll(settings.selector);\n\t\tfor (var i = 0; i < forms.length; i++) {\n\t\t\tif (remove) {\n\t\t\t\tforms[i].removeAttribute('novalidate');\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\tforms[i].setAttribute('novalidate', true);\n\t\t}\n\t};\n\n\t/**\n  * Check field validity when it loses focus\n  * @private\n  * @param  {Event} event The blur event\n  */\n\tvar blurHandler = function (event) {\n\n\t\t// Only run if the field is in a form to be validated\n\t\tif (!event.target.form || !event.target.form.matches(settings.selector)) return;\n\n\t\t// Validate the field\n\t\tvar error = validate.hasError(event.target);\n\n\t\t// If there's an error, show it\n\t\tif (error) {\n\t\t\tvalidate.showError(event.target, error);\n\t\t\treturn;\n\t\t}\n\n\t\t// Otherwise, remove any errors that exist\n\t\tvalidate.removeError(event.target);\n\t};\n\n\t/**\n  * Check radio and checkbox field validity when clicked\n  * @private\n  * @param  {Event} event The click event\n  */\n\tvar clickHandler = function (event) {\n\n\t\t// Only run if the field is in a form to be validated\n\t\tif (!event.target.form || !event.target.form.matches(settings.selector)) return;\n\n\t\t// Only run if the field is a checkbox or radio\n\t\tvar type = event.target.getAttribute('type');\n\t\tif (!(type === 'checkbox' || type === 'radio')) return;\n\n\t\t// Validate the field\n\t\tvar error = validate.hasError(event.target);\n\n\t\t// If there's an error, show it\n\t\tif (error) {\n\t\t\tvalidate.showError(event.target, error);\n\t\t\treturn;\n\t\t}\n\n\t\t// Otherwise, remove any errors that exist\n\t\tvalidate.removeError(event.target);\n\t};\n\n\t/**\n  * Check all fields on submit\n  * @private\n  * @param  {Event} event  The submit event\n  */\n\tvar submitHandler = function (event) {\n\n\t\t// Only run on forms flagged for validation\n\t\tif (!event.target.matches(settings.selector)) return;\n\n\t\t// Get all of the form elements\n\t\tvar fields = event.target.elements;\n\n\t\t// Validate each field\n\t\t// Store the first field with an error to a variable so we can bring it into focus later\n\t\tvar hasErrors;\n\t\tfor (var i = 0; i < fields.length; i++) {\n\t\t\tvar error = validate.hasError(fields[i]);\n\t\t\tif (error) {\n\t\t\t\tvalidate.showError(fields[i], error);\n\t\t\t\tif (!hasErrors) {\n\t\t\t\t\thasErrors = fields[i];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// Prevent form from submitting if there are errors or submission is disabled\n\t\tif (hasErrors || settings.disableSubmit) {\n\t\t\tevent.preventDefault();\n\t\t}\n\n\t\t// If there are errrors, focus on first element with error\n\t\tif (hasErrors) {\n\t\t\thasErrors.focus();\n\t\t\treturn;\n\t\t}\n\n\t\t// Otherwise, submit the form\n\t\tsettings.onSubmit(event.target, fields);\n\t};\n\n\t/**\n  * Destroy the current initialization.\n  * @public\n  */\n\tvalidate.destroy = function () {\n\n\t\t// If plugin isn't already initialized, stop\n\t\tif (!settings) return;\n\n\t\t// Remove event listeners\n\t\tdocument.removeEventListener('blur', blurHandler, true);\n\t\tdocument.removeEventListener('click', clickHandler, false);\n\t\tdocument.removeEventListener('submit', submitHandler, false);\n\n\t\t// Remove all errors\n\t\tvar fields = document.querySelectorAll(settings.errorClass);\n\t\tfor (var i = 0; i < fields.length; i++) {\n\t\t\tvalidate.removeError(fields[i]);\n\t\t}\n\n\t\t// Remove `novalidate` from forms\n\t\taddNoValidate(true);\n\n\t\t// Reset variables\n\t\tsettings = null;\n\t};\n\n\t/**\n  * Initialize Validate\n  * @public\n  * @param {Object} options User settings\n  */\n\tvalidate.init = function (options) {\n\n\t\t// feature test\n\t\tif (!supports()) return;\n\n\t\t// Destroy any existing initializations\n\t\tvalidate.destroy();\n\n\t\t// Merge user options with defaults\n\t\tsettings = extend(defaults, options || {});\n\n\t\t// Add the `novalidate` attribute to all forms\n\t\taddNoValidate();\n\n\t\t// Event listeners\n\t\tdocument.addEventListener('blur', blurHandler, true);\n\t\tdocument.addEventListener('click', clickHandler, true);\n\t\tdocument.addEventListener('submit', submitHandler, false);\n\t};\n\n\t//\n\t// Public APIs\n\t//\n\n\treturn validate;\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/js/plugins/validate.js?");

/***/ })

/******/ });