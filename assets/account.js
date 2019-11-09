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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/build/account.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/build/account.js":
/*!*********************************!*\
  !*** ./src/js/build/account.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n* Account\r\n*\r\n* namespace\r\n* config\r\n* run\r\n* login\r\n* fire functions\r\n*/\n\n/**\r\n* Account namespace\r\n* @type {Object}\r\n*/\nSDG.Account = SDG.Account || {};\n/**\r\n* config\r\n* @type {Object}\r\n*/\nSDG.Account.config = {\n\n\t// elements\n\tel: {\n\t\tlogin: document.getElementById('acLogin')\n\t},\n\n\t// ids\n\tid: {\n\t\thideRecoverPassword: 'hideRecoverPasswordBtn',\n\t\trecoverPassword: 'recoverPassword',\n\t\tsectionLogin: 'acLoginForm',\n\t\tsectionRecoverPassword: 'acRecoverPasswordForm'\n\t},\n\n\t// urls (hashes)\n\turl: {\n\t\trecover: '#recover'\n\t}\n};\n\n/**\r\n* run\r\n* @type {Function}\r\n*/\nSDG.Account.run = function () {\n\tconst c = SDG.Account.config;\n\tconst placeholder = SDG.placeholder();\n\n\t// login\n\tif (c.el.login) {\n\t\tSDG.Account.login();\n\t}\n\n\t// placeholder\n\tplaceholder.init();\n};\n\n/**\r\n* login\r\n* @return {SDG.Account.login~init}\r\n*/\nSDG.Account.login = function () {\n\tconst c = SDG.Account.config;\n\n\t// globals\n\tconst sectionLogin = document.getElementById(c.id.sectionLogin);\n\tconst sectionRecoverPassword = document.getElementById(c.id.sectionRecoverPassword);\n\n\t/**\r\n * init\r\n */\n\tfunction init() {\n\t\tdetectRecover();\n\t\taddEvents();\n\t}\n\n\t/**\r\n * add events\r\n */\n\tfunction addEvents() {\n\n\t\t// forgot password click\n\t\t_.addEvent({\n\t\t\tid: c.id.recoverPassword,\n\t\t\tevent: 'click',\n\t\t\tfn: showRecoverPasswordForm\n\t\t});\n\n\t\t// go back click\n\t\t_.addEvent({\n\t\t\tid: c.id.hideRecoverPassword,\n\t\t\tevent: 'click',\n\t\t\tfn: hideRecoverPasswordForm\n\t\t});\n\t}\n\n\t/**\r\n * show recover password form\r\n */\n\tfunction showRecoverPasswordForm() {\n\t\tsectionLogin.style.display = 'none';\n\t\tsectionRecoverPassword.style.display = 'block';\n\t}\n\n\t/**\r\n * hide recover password form\r\n */\n\tfunction hideRecoverPasswordForm() {\n\t\tsectionRecoverPassword.style.display = 'none';\n\t\tsectionLogin.style.display = 'block';\n\t}\n\n\t/**\r\n * detect recover\r\n */\n\tfunction detectRecover() {\n\t\tif (window.location.hash === c.url.recover) {\n\t\t\tshowRecoverPasswordForm();\n\t\t}\n\t}\n\n\t/**\r\n * return\r\n * @type {Object}\r\n */\n\treturn {\n\t\tinit: init()\n\t};\n};\n\n/**\r\n* fire functions\r\n*/\nSDG.Account.run();\n\n//# sourceURL=webpack:///./src/js/build/account.js?");

/***/ })

/******/ });