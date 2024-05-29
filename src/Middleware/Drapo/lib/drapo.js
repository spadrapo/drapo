
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function e(t){return"function"==typeof t}function n(t){W=t}function r(t){z=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof U?function(){U(a)}:c()}function s(){var t=0,e=new H(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<N;t+=2){var e=Q[t],n=Q[t+1];e(n),Q[t]=void 0,Q[t+1]=void 0}N=0}function f(){try{var t=Function("return this")().require("vertx");return U=t.runOnLoop||t.runOnContext,i()}catch(e){return c()}}function l(t,e){var n=this,r=new this.constructor(p);void 0===r[V]&&x(r);var o=n._state;if(o){var i=arguments[o-1];z(function(){return T(o,r,i,n._result)})}else j(n,r,t,e);return r}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return w(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function y(t,e,n){z(function(t){var r=!1,o=_(n,e,function(n){r||(r=!0,e!==n?w(t,n):A(t,n))},function(e){r||(r=!0,S(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,S(t,o))},t)}function m(t,e){e._state===Z?A(t,e._result):e._state===$?S(t,e._result):j(e,void 0,function(e){return w(t,e)},function(e){return S(t,e)})}function b(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?m(t,n):void 0===r?A(t,n):e(r)?y(t,n,r):A(t,n)}function w(e,n){if(e===n)S(e,v());else if(t(n)){var r=void 0;try{r=n.then}catch(o){return void S(e,o)}b(e,n,r)}else A(e,n)}function g(t){t._onerror&&t._onerror(t._result),E(t)}function A(t,e){t._state===X&&(t._result=e,t._state=Z,0!==t._subscribers.length&&z(E,t))}function S(t,e){t._state===X&&(t._state=$,t._result=e,z(g,t))}function j(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+Z]=n,o[i+$]=r,0===i&&t._state&&z(E,t)}function E(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?T(n,r,o,i):o(i);t._subscribers.length=0}}function T(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=!0;if(i){try{s=r(o)}catch(a){c=!1,u=a}if(n===s)return void S(n,d())}else s=o;n._state!==X||(i&&c?w(n,s):c===!1?S(n,u):t===Z?A(n,s):t===$&&S(n,s))}function M(t,e){try{e(function(e){w(t,e)},function(e){S(t,e)})}catch(n){S(t,n)}}function P(){return tt++}function x(t){t[V]=tt++,t._state=void 0,t._result=void 0,t._subscribers=[]}function C(){return new Error("Array Methods must be provided an Array")}function O(t){return new et(this,t).promise}function k(t){var e=this;return new e(L(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function F(t){var e=this,n=new e(p);return S(n,t),n}function Y(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function q(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function D(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=nt}var K=void 0;K=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var L=K,N=0,U=void 0,W=void 0,z=function(t,e){Q[N]=t,Q[N+1]=e,N+=2,2===N&&(W?W(a):R())},B="undefined"!=typeof window?window:void 0,G=B||{},H=G.MutationObserver||G.WebKitMutationObserver,I="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),J="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,Q=new Array(1e3),R=void 0;R=I?o():H?s():J?u():void 0===B&&"function"==typeof require?f():c();var V=Math.random().toString(36).substring(2),X=void 0,Z=1,$=2,tt=0,et=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[V]||x(this.promise),L(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?A(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&A(this.promise,this._result))):S(this.promise,C())}return t.prototype._enumerate=function(t){for(var e=0;this._state===X&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(u){s=!0,i=u}if(o===l&&t._state!==X)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===nt){var c=new n(p);s?S(c,i):b(c,t,o),this._willSettleAt(c,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===X&&(this._remaining--,t===$?S(r,n):this._result[e]=n),0===this._remaining&&A(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;j(t,void 0,function(t){return n._settledAt(Z,e,t)},function(t){return n._settledAt($,e,t)})},t}(),nt=function(){function t(e){this[V]=P(),this._result=this._state=void 0,this._subscribers=[],p!==e&&("function"!=typeof e&&Y(),this instanceof t?M(this,e):q())}return t.prototype["catch"]=function(t){return this.then(null,t)},t.prototype["finally"]=function(t){var n=this,r=n.constructor;return e(t)?n.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})}):n.then(t,t)},t}();return nt.prototype.then=l,nt.all=O,nt.race=k,nt.resolve=h,nt.reject=F,nt._setScheduler=n,nt._setAsap=r,nt._asap=z,nt.polyfill=D,nt.Promise=nt,nt.polyfill(),nt});
(function webpackUniversalModuleDefinition(root,factory){if(typeof exports==="object"&&typeof module==="object")module.exports=factory();else if(typeof define==="function"&&define.amd)define([],factory);else if(typeof exports==="object")exports["signalR"]=factory();else root["signalR"]=factory()})(window,function(){return function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId]){return installedModules[moduleId].exports}var module=installedModules[moduleId]={i:moduleId,l:false,exports:{}};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.l=true;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.d=function(exports,name,getter){if(!__webpack_require__.o(exports,name)){Object.defineProperty(exports,name,{enumerable:true,get:getter})}};__webpack_require__.r=function(exports){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(exports,"__esModule",{value:true})};__webpack_require__.t=function(value,mode){if(mode&1)value=__webpack_require__(value);if(mode&8)return value;if(mode&4&&typeof value==="object"&&value&&value.__esModule)return value;var ns=Object.create(null);__webpack_require__.r(ns);Object.defineProperty(ns,"default",{enumerable:true,value:value});if(mode&2&&typeof value!="string")for(var key in value)__webpack_require__.d(ns,key,function(key){return value[key]}.bind(null,key));return ns};__webpack_require__.n=function(module){var getter=module&&module.__esModule?function getDefault(){return module["default"]}:function getModuleExports(){return module};__webpack_require__.d(getter,"a",getter);return getter};__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)};__webpack_require__.p="";return __webpack_require__(__webpack_require__.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var es6_promise_dist_es6_promise_auto_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1);var es6_promise_dist_es6_promise_auto_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(es6_promise_dist_es6_promise_auto_js__WEBPACK_IMPORTED_MODULE_0__);var _index__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3);__webpack_require__.d(__webpack_exports__,"VERSION",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["VERSION"]});__webpack_require__.d(__webpack_exports__,"AbortError",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["AbortError"]});__webpack_require__.d(__webpack_exports__,"HttpError",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["HttpError"]});__webpack_require__.d(__webpack_exports__,"TimeoutError",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["TimeoutError"]});__webpack_require__.d(__webpack_exports__,"HttpClient",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]});__webpack_require__.d(__webpack_exports__,"HttpResponse",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]});__webpack_require__.d(__webpack_exports__,"DefaultHttpClient",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["DefaultHttpClient"]});__webpack_require__.d(__webpack_exports__,"HubConnection",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["HubConnection"]});__webpack_require__.d(__webpack_exports__,"HubConnectionState",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["HubConnectionState"]});__webpack_require__.d(__webpack_exports__,"HubConnectionBuilder",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["HubConnectionBuilder"]});__webpack_require__.d(__webpack_exports__,"MessageType",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["MessageType"]});__webpack_require__.d(__webpack_exports__,"LogLevel",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["LogLevel"]});__webpack_require__.d(__webpack_exports__,"HttpTransportType",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["HttpTransportType"]});__webpack_require__.d(__webpack_exports__,"TransferFormat",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["TransferFormat"]});__webpack_require__.d(__webpack_exports__,"NullLogger",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["NullLogger"]});__webpack_require__.d(__webpack_exports__,"JsonHubProtocol",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["JsonHubProtocol"]});__webpack_require__.d(__webpack_exports__,"Subject",function(){return _index__WEBPACK_IMPORTED_MODULE_1__["Subject"]});if(!Uint8Array.prototype.indexOf){Object.defineProperty(Uint8Array.prototype,"indexOf",{value:Array.prototype.indexOf,writable:true})}if(!Uint8Array.prototype.slice){Object.defineProperty(Uint8Array.prototype,"slice",{value:function(start,end){return new Uint8Array(Array.prototype.slice.call(this,start,end))},writable:true})}if(!Uint8Array.prototype.forEach){Object.defineProperty(Uint8Array.prototype,"forEach",{value:Array.prototype.forEach,writable:true})}},function(module,exports,__webpack_require__){(function(global){var require;
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.2+97478eb6
 */
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.2+97478eb6
 */
(function(global,factory){true?module.exports=factory():undefined})(this,function(){"use strict";function objectOrFunction(x){var type=typeof x;return x!==null&&(type==="object"||type==="function")}function isFunction(x){return typeof x==="function"}var _isArray=void 0;if(Array.isArray){_isArray=Array.isArray}else{_isArray=function(x){return Object.prototype.toString.call(x)==="[object Array]"}}var isArray=_isArray;var len=0;var vertxNext=void 0;var customSchedulerFn=void 0;var asap=function asap(callback,arg){queue[len]=callback;queue[len+1]=arg;len+=2;if(len===2){if(customSchedulerFn){customSchedulerFn(flush)}else{scheduleFlush()}}};function setScheduler(scheduleFn){customSchedulerFn=scheduleFn}function setAsap(asapFn){asap=asapFn}var browserWindow=typeof window!=="undefined"?window:undefined;var browserGlobal=browserWindow||{};var BrowserMutationObserver=browserGlobal.MutationObserver||browserGlobal.WebKitMutationObserver;var isNode=typeof self==="undefined"&&typeof process!=="undefined"&&{}.toString.call(process)==="[object process]";var isWorker=typeof Uint8ClampedArray!=="undefined"&&typeof importScripts!=="undefined"&&typeof MessageChannel!=="undefined";function useNextTick(){return function(){return process.nextTick(flush)}}function useVertxTimer(){if(typeof vertxNext!=="undefined"){return function(){vertxNext(flush)}}return useSetTimeout()}function useMutationObserver(){var iterations=0;var observer=new BrowserMutationObserver(flush);var node=document.createTextNode("");observer.observe(node,{characterData:true});return function(){node.data=iterations=++iterations%2}}function useMessageChannel(){var channel=new MessageChannel;channel.port1.onmessage=flush;return function(){return channel.port2.postMessage(0)}}function useSetTimeout(){var globalSetTimeout=setTimeout;return function(){return globalSetTimeout(flush,1)}}var queue=new Array(1e3);function flush(){for(var i=0;i<len;i+=2){var callback=queue[i];var arg=queue[i+1];callback(arg);queue[i]=undefined;queue[i+1]=undefined}len=0}function attemptVertx(){try{var r=require;var vertx=__webpack_require__(!function webpackMissingModule(){var e=new Error("Cannot find module 'vertx'");e.code="MODULE_NOT_FOUND";throw e}());vertxNext=vertx.runOnLoop||vertx.runOnContext;return useVertxTimer()}catch(e){return useSetTimeout()}}var scheduleFlush=void 0;if(isNode){scheduleFlush=useNextTick()}else if(BrowserMutationObserver){scheduleFlush=useMutationObserver()}else if(isWorker){scheduleFlush=useMessageChannel()}else if(browserWindow===undefined&&"function"==="function"){scheduleFlush=attemptVertx()}else{scheduleFlush=useSetTimeout()}function then(onFulfillment,onRejection){var parent=this;var child=new this.constructor(noop);if(child[PROMISE_ID]===undefined){makePromise(child)}var _state=parent._state;if(_state){var callback=arguments[_state-1];asap(function(){return invokeCallback(_state,child,callback,parent._result)})}else{subscribe(parent,child,onFulfillment,onRejection)}return child}function resolve$1(object){var Constructor=this;if(object&&typeof object==="object"&&object.constructor===Constructor){return object}var promise=new Constructor(noop);resolve(promise,object);return promise}var PROMISE_ID=Math.random().toString(36).substring(16);function noop(){}var PENDING=void 0;var FULFILLED=1;var REJECTED=2;var GET_THEN_ERROR=new ErrorObject;function selfFulfillment(){return new TypeError("You cannot resolve a promise with itself")}function cannotReturnOwn(){return new TypeError("A promises callback cannot return that same promise.")}function getThen(promise){try{return promise.then}catch(error){GET_THEN_ERROR.error=error;return GET_THEN_ERROR}}function tryThen(then$$1,value,fulfillmentHandler,rejectionHandler){try{then$$1.call(value,fulfillmentHandler,rejectionHandler)}catch(e){return e}}function handleForeignThenable(promise,thenable,then$$1){asap(function(promise){var sealed=false;var error=tryThen(then$$1,thenable,function(value){if(sealed){return}sealed=true;if(thenable!==value){resolve(promise,value)}else{fulfill(promise,value)}},function(reason){if(sealed){return}sealed=true;reject(promise,reason)},"Settle: "+(promise._label||" unknown promise"));if(!sealed&&error){sealed=true;reject(promise,error)}},promise)}function handleOwnThenable(promise,thenable){if(thenable._state===FULFILLED){fulfill(promise,thenable._result)}else if(thenable._state===REJECTED){reject(promise,thenable._result)}else{subscribe(thenable,undefined,function(value){return resolve(promise,value)},function(reason){return reject(promise,reason)})}}function handleMaybeThenable(promise,maybeThenable,then$$1){if(maybeThenable.constructor===promise.constructor&&then$$1===then&&maybeThenable.constructor.resolve===resolve$1){handleOwnThenable(promise,maybeThenable)}else{if(then$$1===GET_THEN_ERROR){reject(promise,GET_THEN_ERROR.error);GET_THEN_ERROR.error=null}else if(then$$1===undefined){fulfill(promise,maybeThenable)}else if(isFunction(then$$1)){handleForeignThenable(promise,maybeThenable,then$$1)}else{fulfill(promise,maybeThenable)}}}function resolve(promise,value){if(promise===value){reject(promise,selfFulfillment())}else if(objectOrFunction(value)){handleMaybeThenable(promise,value,getThen(value))}else{fulfill(promise,value)}}function publishRejection(promise){if(promise._onerror){promise._onerror(promise._result)}publish(promise)}function fulfill(promise,value){if(promise._state!==PENDING){return}promise._result=value;promise._state=FULFILLED;if(promise._subscribers.length!==0){asap(publish,promise)}}function reject(promise,reason){if(promise._state!==PENDING){return}promise._state=REJECTED;promise._result=reason;asap(publishRejection,promise)}function subscribe(parent,child,onFulfillment,onRejection){var _subscribers=parent._subscribers;var length=_subscribers.length;parent._onerror=null;_subscribers[length]=child;_subscribers[length+FULFILLED]=onFulfillment;_subscribers[length+REJECTED]=onRejection;if(length===0&&parent._state){asap(publish,parent)}}function publish(promise){var subscribers=promise._subscribers;var settled=promise._state;if(subscribers.length===0){return}var child=void 0,callback=void 0,detail=promise._result;for(var i=0;i<subscribers.length;i+=3){child=subscribers[i];callback=subscribers[i+settled];if(child){invokeCallback(settled,child,callback,detail)}else{callback(detail)}}promise._subscribers.length=0}function ErrorObject(){this.error=null}var TRY_CATCH_ERROR=new ErrorObject;function tryCatch(callback,detail){try{return callback(detail)}catch(e){TRY_CATCH_ERROR.error=e;return TRY_CATCH_ERROR}}function invokeCallback(settled,promise,callback,detail){var hasCallback=isFunction(callback),value=void 0,error=void 0,succeeded=void 0,failed=void 0;if(hasCallback){value=tryCatch(callback,detail);if(value===TRY_CATCH_ERROR){failed=true;error=value.error;value.error=null}else{succeeded=true}if(promise===value){reject(promise,cannotReturnOwn());return}}else{value=detail;succeeded=true}if(promise._state!==PENDING){}else if(hasCallback&&succeeded){resolve(promise,value)}else if(failed){reject(promise,error)}else if(settled===FULFILLED){fulfill(promise,value)}else if(settled===REJECTED){reject(promise,value)}}function initializePromise(promise,resolver){try{resolver(function resolvePromise(value){resolve(promise,value)},function rejectPromise(reason){reject(promise,reason)})}catch(e){reject(promise,e)}}var id=0;function nextId(){return id++}function makePromise(promise){promise[PROMISE_ID]=id++;promise._state=undefined;promise._result=undefined;promise._subscribers=[]}function validationError(){return new Error("Array Methods must be provided an Array")}function validationError(){return new Error("Array Methods must be provided an Array")}var Enumerator=function(){function Enumerator(Constructor,input){this._instanceConstructor=Constructor;this.promise=new Constructor(noop);if(!this.promise[PROMISE_ID]){makePromise(this.promise)}if(isArray(input)){this.length=input.length;this._remaining=input.length;this._result=new Array(this.length);if(this.length===0){fulfill(this.promise,this._result)}else{this.length=this.length||0;this._enumerate(input);if(this._remaining===0){fulfill(this.promise,this._result)}}}else{reject(this.promise,validationError())}}Enumerator.prototype._enumerate=function _enumerate(input){for(var i=0;this._state===PENDING&&i<input.length;i++){this._eachEntry(input[i],i)}};Enumerator.prototype._eachEntry=function _eachEntry(entry,i){var c=this._instanceConstructor;var resolve$$1=c.resolve;if(resolve$$1===resolve$1){var _then=getThen(entry);if(_then===then&&entry._state!==PENDING){this._settledAt(entry._state,i,entry._result)}else if(typeof _then!=="function"){this._remaining--;this._result[i]=entry}else if(c===Promise$2){var promise=new c(noop);handleMaybeThenable(promise,entry,_then);this._willSettleAt(promise,i)}else{this._willSettleAt(new c(function(resolve$$1){return resolve$$1(entry)}),i)}}else{this._willSettleAt(resolve$$1(entry),i)}};Enumerator.prototype._settledAt=function _settledAt(state,i,value){var promise=this.promise;if(promise._state===PENDING){this._remaining--;if(state===REJECTED){reject(promise,value)}else{this._result[i]=value}}if(this._remaining===0){fulfill(promise,this._result)}};Enumerator.prototype._willSettleAt=function _willSettleAt(promise,i){var enumerator=this;subscribe(promise,undefined,function(value){return enumerator._settledAt(FULFILLED,i,value)},function(reason){return enumerator._settledAt(REJECTED,i,reason)})};return Enumerator}();function all(entries){return new Enumerator(this,entries).promise}function race(entries){var Constructor=this;if(!isArray(entries)){return new Constructor(function(_,reject){return reject(new TypeError("You must pass an array to race."))})}else{return new Constructor(function(resolve,reject){var length=entries.length;for(var i=0;i<length;i++){Constructor.resolve(entries[i]).then(resolve,reject)}})}}function reject$1(reason){var Constructor=this;var promise=new Constructor(noop);reject(promise,reason);return promise}function needsResolver(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function needsNew(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}var Promise$2=function(){function Promise(resolver){this[PROMISE_ID]=nextId();this._result=this._state=undefined;this._subscribers=[];if(noop!==resolver){typeof resolver!=="function"&&needsResolver();this instanceof Promise?initializePromise(this,resolver):needsNew()}}Promise.prototype.catch=function _catch(onRejection){return this.then(null,onRejection)};Promise.prototype.finally=function _finally(callback){var promise=this;var constructor=promise.constructor;return promise.then(function(value){return constructor.resolve(callback()).then(function(){return value})},function(reason){return constructor.resolve(callback()).then(function(){throw reason})})};return Promise}();Promise$2.prototype.then=then;Promise$2.all=all;Promise$2.race=race;Promise$2.resolve=resolve$1;Promise$2.reject=reject$1;Promise$2._setScheduler=setScheduler;Promise$2._setAsap=setAsap;Promise$2._asap=asap;function polyfill(){var local=void 0;if(typeof global!=="undefined"){local=global}else if(typeof self!=="undefined"){local=self}else{try{local=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}}var P=local.Promise;if(P){var promiseToString=null;try{promiseToString=Object.prototype.toString.call(P.resolve())}catch(e){}if(promiseToString==="[object Promise]"&&!P.cast){return}}local.Promise=Promise$2}Promise$2.polyfill=polyfill;Promise$2.Promise=Promise$2;Promise$2.polyfill();return Promise$2})}).call(this,__webpack_require__(2))},function(module,exports){var g;g=function(){return this}();try{g=g||new Function("return this")()}catch(e){if(typeof window==="object")g=window}module.exports=g},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"VERSION",function(){return VERSION});var _Errors__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4);__webpack_require__.d(__webpack_exports__,"AbortError",function(){return _Errors__WEBPACK_IMPORTED_MODULE_0__["AbortError"]});__webpack_require__.d(__webpack_exports__,"HttpError",function(){return _Errors__WEBPACK_IMPORTED_MODULE_0__["HttpError"]});__webpack_require__.d(__webpack_exports__,"TimeoutError",function(){return _Errors__WEBPACK_IMPORTED_MODULE_0__["TimeoutError"]});var _HttpClient__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);__webpack_require__.d(__webpack_exports__,"HttpClient",function(){return _HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]});__webpack_require__.d(__webpack_exports__,"HttpResponse",function(){return _HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]});var _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(6);__webpack_require__.d(__webpack_exports__,"DefaultHttpClient",function(){return _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_2__["DefaultHttpClient"]});var _HubConnection__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(10);__webpack_require__.d(__webpack_exports__,"HubConnection",function(){return _HubConnection__WEBPACK_IMPORTED_MODULE_3__["HubConnection"]});__webpack_require__.d(__webpack_exports__,"HubConnectionState",function(){return _HubConnection__WEBPACK_IMPORTED_MODULE_3__["HubConnectionState"]});var _HubConnectionBuilder__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(17);__webpack_require__.d(__webpack_exports__,"HubConnectionBuilder",function(){return _HubConnectionBuilder__WEBPACK_IMPORTED_MODULE_4__["HubConnectionBuilder"]});var _IHubProtocol__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(15);__webpack_require__.d(__webpack_exports__,"MessageType",function(){return _IHubProtocol__WEBPACK_IMPORTED_MODULE_5__["MessageType"]});var _ILogger__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(9);__webpack_require__.d(__webpack_exports__,"LogLevel",function(){return _ILogger__WEBPACK_IMPORTED_MODULE_6__["LogLevel"]});var _ITransport__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(20);__webpack_require__.d(__webpack_exports__,"HttpTransportType",function(){return _ITransport__WEBPACK_IMPORTED_MODULE_7__["HttpTransportType"]});__webpack_require__.d(__webpack_exports__,"TransferFormat",function(){return _ITransport__WEBPACK_IMPORTED_MODULE_7__["TransferFormat"]});var _Loggers__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(14);__webpack_require__.d(__webpack_exports__,"NullLogger",function(){return _Loggers__WEBPACK_IMPORTED_MODULE_8__["NullLogger"]});var _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(25);__webpack_require__.d(__webpack_exports__,"JsonHubProtocol",function(){return _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_9__["JsonHubProtocol"]});var _Subject__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(16);__webpack_require__.d(__webpack_exports__,"Subject",function(){return _Subject__WEBPACK_IMPORTED_MODULE_10__["Subject"]});var VERSION="3.1.17"},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"HttpError",function(){return HttpError});__webpack_require__.d(__webpack_exports__,"TimeoutError",function(){return TimeoutError});__webpack_require__.d(__webpack_exports__,"AbortError",function(){return AbortError});var __extends=undefined&&undefined.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p]};return function(d,b){extendStatics(d,b);function __(){this.constructor=d}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __)}}();var HttpError=function(_super){__extends(HttpError,_super);function HttpError(errorMessage,statusCode){var _newTarget=this.constructor;var _this=this;var trueProto=_newTarget.prototype;_this=_super.call(this,errorMessage)||this;_this.statusCode=statusCode;_this.__proto__=trueProto;return _this}return HttpError}(Error);var TimeoutError=function(_super){__extends(TimeoutError,_super);function TimeoutError(errorMessage){var _newTarget=this.constructor;if(errorMessage===void 0){errorMessage="A timeout occurred."}var _this=this;var trueProto=_newTarget.prototype;_this=_super.call(this,errorMessage)||this;_this.__proto__=trueProto;return _this}return TimeoutError}(Error);var AbortError=function(_super){__extends(AbortError,_super);function AbortError(errorMessage){var _newTarget=this.constructor;if(errorMessage===void 0){errorMessage="An abort occurred."}var _this=this;var trueProto=_newTarget.prototype;_this=_super.call(this,errorMessage)||this;_this.__proto__=trueProto;return _this}return AbortError}(Error)},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"HttpResponse",function(){return HttpResponse});__webpack_require__.d(__webpack_exports__,"HttpClient",function(){return HttpClient});var __assign=undefined&&undefined.__assign||Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p]}return t};var HttpResponse=function(){function HttpResponse(statusCode,statusText,content){this.statusCode=statusCode;this.statusText=statusText;this.content=content}return HttpResponse}();var HttpClient=function(){function HttpClient(){}HttpClient.prototype.get=function(url,options){return this.send(__assign({},options,{method:"GET",url:url}))};HttpClient.prototype.post=function(url,options){return this.send(__assign({},options,{method:"POST",url:url}))};HttpClient.prototype.delete=function(url,options){return this.send(__assign({},options,{method:"DELETE",url:url}))};HttpClient.prototype.getCookieString=function(url){return""};return HttpClient}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"DefaultHttpClient",function(){return DefaultHttpClient});var _Errors__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4);var _HttpClient__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);var _NodeHttpClient__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(7);var _XhrHttpClient__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(8);var __extends=undefined&&undefined.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p]};return function(d,b){extendStatics(d,b);function __(){this.constructor=d}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __)}}();var DefaultHttpClient=function(_super){__extends(DefaultHttpClient,_super);function DefaultHttpClient(logger){var _this=_super.call(this)||this;if(typeof XMLHttpRequest!=="undefined"){_this.httpClient=new _XhrHttpClient__WEBPACK_IMPORTED_MODULE_3__["XhrHttpClient"](logger)}else{_this.httpClient=new _NodeHttpClient__WEBPACK_IMPORTED_MODULE_2__["NodeHttpClient"](logger)}return _this}DefaultHttpClient.prototype.send=function(request){if(request.abortSignal&&request.abortSignal.aborted){return Promise.reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["AbortError"])}if(!request.method){return Promise.reject(new Error("No method defined."))}if(!request.url){return Promise.reject(new Error("No url defined."))}return this.httpClient.send(request)};DefaultHttpClient.prototype.getCookieString=function(url){return this.httpClient.getCookieString(url)};return DefaultHttpClient}(_HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"NodeHttpClient",function(){return NodeHttpClient});var _HttpClient__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(5);var __extends=undefined&&undefined.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p]};return function(d,b){extendStatics(d,b);function __(){this.constructor=d}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __)}}();var NodeHttpClient=function(_super){__extends(NodeHttpClient,_super);function NodeHttpClient(logger){return _super.call(this)||this}NodeHttpClient.prototype.send=function(){return Promise.reject(new Error("If using Node either provide an XmlHttpRequest polyfill or consume the cjs or esm script instead of the browser/signalr.js one."))};return NodeHttpClient}(_HttpClient__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"XhrHttpClient",function(){return XhrHttpClient});var _Errors__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(4);var _HttpClient__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(5);var _ILogger__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(9);var __extends=undefined&&undefined.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p]};return function(d,b){extendStatics(d,b);function __(){this.constructor=d}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __)}}();var XhrHttpClient=function(_super){__extends(XhrHttpClient,_super);function XhrHttpClient(logger){var _this=_super.call(this)||this;_this.logger=logger;return _this}XhrHttpClient.prototype.send=function(request){var _this=this;if(request.abortSignal&&request.abortSignal.aborted){return Promise.reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["AbortError"])}if(!request.method){return Promise.reject(new Error("No method defined."))}if(!request.url){return Promise.reject(new Error("No url defined."))}return new Promise(function(resolve,reject){var xhr=new XMLHttpRequest;xhr.open(request.method,request.url,true);xhr.withCredentials=true;xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");var headers=request.headers;if(headers){Object.keys(headers).forEach(function(header){xhr.setRequestHeader(header,headers[header])})}if(request.responseType){xhr.responseType=request.responseType}if(request.abortSignal){request.abortSignal.onabort=function(){xhr.abort();reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["AbortError"])}}if(request.timeout){xhr.timeout=request.timeout}xhr.onload=function(){if(request.abortSignal){request.abortSignal.onabort=null}if(xhr.status>=200&&xhr.status<300){resolve(new _HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"](xhr.status,xhr.statusText,xhr.response||xhr.responseText))}else{reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["HttpError"](xhr.statusText,xhr.status))}};xhr.onerror=function(){_this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Warning,"Error from HTTP request. "+xhr.status+": "+xhr.statusText+".");reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["HttpError"](xhr.statusText,xhr.status))};xhr.ontimeout=function(){_this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Warning,"Timeout from HTTP request.");reject(new _Errors__WEBPACK_IMPORTED_MODULE_0__["TimeoutError"])};xhr.send(request.content||"")})};return XhrHttpClient}(_HttpClient__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"LogLevel",function(){return LogLevel});var LogLevel;(function(LogLevel){LogLevel[LogLevel["Trace"]=0]="Trace";LogLevel[LogLevel["Debug"]=1]="Debug";LogLevel[LogLevel["Information"]=2]="Information";LogLevel[LogLevel["Warning"]=3]="Warning";LogLevel[LogLevel["Error"]=4]="Error";LogLevel[LogLevel["Critical"]=5]="Critical";LogLevel[LogLevel["None"]=6]="None"})(LogLevel||(LogLevel={}))},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"HubConnectionState",function(){return HubConnectionState});__webpack_require__.d(__webpack_exports__,"HubConnection",function(){return HubConnection});var _HandshakeProtocol__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(11);var _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(15);var _ILogger__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(9);var _Subject__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(16);var _Utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(13);var __awaiter=undefined&&undefined.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())})};var __generator=undefined&&undefined.__generator||function(thisArg,body){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),throw:verb(1),return:verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return step([n,v])}}function step(op){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break}if(t[2])_.ops.pop();_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e];y=0}finally{f=t=0}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true}}};var DEFAULT_TIMEOUT_IN_MS=30*1e3;var DEFAULT_PING_INTERVAL_IN_MS=15*1e3;var HubConnectionState;(function(HubConnectionState){HubConnectionState["Disconnected"]="Disconnected";HubConnectionState["Connecting"]="Connecting";HubConnectionState["Connected"]="Connected";HubConnectionState["Disconnecting"]="Disconnecting";HubConnectionState["Reconnecting"]="Reconnecting"})(HubConnectionState||(HubConnectionState={}));var HubConnection=function(){function HubConnection(connection,logger,protocol,reconnectPolicy){var _this=this;this.nextKeepAlive=0;_Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(connection,"connection");_Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(logger,"logger");_Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(protocol,"protocol");this.serverTimeoutInMilliseconds=DEFAULT_TIMEOUT_IN_MS;this.keepAliveIntervalInMilliseconds=DEFAULT_PING_INTERVAL_IN_MS;this.logger=logger;this.protocol=protocol;this.connection=connection;this.reconnectPolicy=reconnectPolicy;this.handshakeProtocol=new _HandshakeProtocol__WEBPACK_IMPORTED_MODULE_0__["HandshakeProtocol"];this.connection.onreceive=function(data){return _this.processIncomingData(data)};this.connection.onclose=function(error){return _this.connectionClosed(error)};this.callbacks={};this.methods={};this.closedCallbacks=[];this.reconnectingCallbacks=[];this.reconnectedCallbacks=[];this.invocationId=0;this.receivedHandshakeResponse=false;this.connectionState=HubConnectionState.Disconnected;this.connectionStarted=false;this.cachedPingMessage=this.protocol.writeMessage({type:_IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Ping})}HubConnection.create=function(connection,logger,protocol,reconnectPolicy){return new HubConnection(connection,logger,protocol,reconnectPolicy)};Object.defineProperty(HubConnection.prototype,"state",{get:function(){return this.connectionState},enumerable:true,configurable:true});Object.defineProperty(HubConnection.prototype,"connectionId",{get:function(){return this.connection?this.connection.connectionId||null:null},enumerable:true,configurable:true});Object.defineProperty(HubConnection.prototype,"baseUrl",{get:function(){return this.connection.baseUrl||""},set:function(url){if(this.connectionState!==HubConnectionState.Disconnected&&this.connectionState!==HubConnectionState.Reconnecting){throw new Error("The HubConnection must be in the Disconnected or Reconnecting state to change the url.")}if(!url){throw new Error("The HubConnection url must be a valid url.")}this.connection.baseUrl=url},enumerable:true,configurable:true});HubConnection.prototype.start=function(){this.startPromise=this.startWithStateTransitions();return this.startPromise};HubConnection.prototype.startWithStateTransitions=function(){return __awaiter(this,void 0,void 0,function(){var e_1;return __generator(this,function(_a){switch(_a.label){case 0:if(this.connectionState!==HubConnectionState.Disconnected){return[2,Promise.reject(new Error("Cannot start a HubConnection that is not in the 'Disconnected' state."))]}this.connectionState=HubConnectionState.Connecting;this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Starting HubConnection.");_a.label=1;case 1:_a.trys.push([1,3,,4]);return[4,this.startInternal()];case 2:_a.sent();this.connectionState=HubConnectionState.Connected;this.connectionStarted=true;this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"HubConnection connected successfully.");return[3,4];case 3:e_1=_a.sent();this.connectionState=HubConnectionState.Disconnected;this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"HubConnection failed to start successfully because of error '"+e_1+"'.");return[2,Promise.reject(e_1)];case 4:return[2]}})})};HubConnection.prototype.startInternal=function(){return __awaiter(this,void 0,void 0,function(){var handshakePromise,handshakeRequest,e_2;var _this=this;return __generator(this,function(_a){switch(_a.label){case 0:this.stopDuringStartError=undefined;this.receivedHandshakeResponse=false;handshakePromise=new Promise(function(resolve,reject){_this.handshakeResolver=resolve;_this.handshakeRejecter=reject});return[4,this.connection.start(this.protocol.transferFormat)];case 1:_a.sent();_a.label=2;case 2:_a.trys.push([2,5,,7]);handshakeRequest={protocol:this.protocol.name,version:this.protocol.version};this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Sending handshake request.");return[4,this.sendMessage(this.handshakeProtocol.writeHandshakeRequest(handshakeRequest))];case 3:_a.sent();this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information,"Using HubProtocol '"+this.protocol.name+"'.");this.cleanupTimeout();this.resetTimeoutPeriod();this.resetKeepAliveInterval();return[4,handshakePromise];case 4:_a.sent();if(this.stopDuringStartError){throw this.stopDuringStartError}return[3,7];case 5:e_2=_a.sent();this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Hub handshake failed with error '"+e_2+"' during start(). Stopping HubConnection.");this.cleanupTimeout();this.cleanupPingTimer();return[4,this.connection.stop(e_2)];case 6:_a.sent();throw e_2;case 7:return[2]}})})};HubConnection.prototype.stop=function(){return __awaiter(this,void 0,void 0,function(){var startPromise,e_3;return __generator(this,function(_a){switch(_a.label){case 0:startPromise=this.startPromise;this.stopPromise=this.stopInternal();return[4,this.stopPromise];case 1:_a.sent();_a.label=2;case 2:_a.trys.push([2,4,,5]);return[4,startPromise];case 3:_a.sent();return[3,5];case 4:e_3=_a.sent();return[3,5];case 5:return[2]}})})};HubConnection.prototype.stopInternal=function(error){if(this.connectionState===HubConnectionState.Disconnected){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Call to HubConnection.stop("+error+") ignored because it is already in the disconnected state.");return Promise.resolve()}if(this.connectionState===HubConnectionState.Disconnecting){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Call to HttpConnection.stop("+error+") ignored because the connection is already in the disconnecting state.");return this.stopPromise}this.connectionState=HubConnectionState.Disconnecting;this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Stopping HubConnection.");if(this.reconnectDelayHandle){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Connection stopped during reconnect delay. Done reconnecting.");clearTimeout(this.reconnectDelayHandle);this.reconnectDelayHandle=undefined;this.completeClose();return Promise.resolve()}this.cleanupTimeout();this.cleanupPingTimer();this.stopDuringStartError=error||new Error("The connection was stopped before the hub handshake could complete.");return this.connection.stop(error)};HubConnection.prototype.stream=function(methodName){var _this=this;var args=[];for(var _i=1;_i<arguments.length;_i++){args[_i-1]=arguments[_i]}var _a=this.replaceStreamingParams(args),streams=_a[0],streamIds=_a[1];var invocationDescriptor=this.createStreamInvocation(methodName,args,streamIds);var promiseQueue;var subject=new _Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"];subject.cancelCallback=function(){var cancelInvocation=_this.createCancelInvocation(invocationDescriptor.invocationId);delete _this.callbacks[invocationDescriptor.invocationId];return promiseQueue.then(function(){return _this.sendWithProtocol(cancelInvocation)})};this.callbacks[invocationDescriptor.invocationId]=function(invocationEvent,error){if(error){subject.error(error);return}else if(invocationEvent){if(invocationEvent.type===_IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Completion){if(invocationEvent.error){subject.error(new Error(invocationEvent.error))}else{subject.complete()}}else{subject.next(invocationEvent.item)}}};promiseQueue=this.sendWithProtocol(invocationDescriptor).catch(function(e){subject.error(e);delete _this.callbacks[invocationDescriptor.invocationId]});this.launchStreams(streams,promiseQueue);return subject};HubConnection.prototype.sendMessage=function(message){this.resetKeepAliveInterval();return this.connection.send(message)};HubConnection.prototype.sendWithProtocol=function(message){return this.sendMessage(this.protocol.writeMessage(message))};HubConnection.prototype.send=function(methodName){var args=[];for(var _i=1;_i<arguments.length;_i++){args[_i-1]=arguments[_i]}var _a=this.replaceStreamingParams(args),streams=_a[0],streamIds=_a[1];var sendPromise=this.sendWithProtocol(this.createInvocation(methodName,args,true,streamIds));this.launchStreams(streams,sendPromise);return sendPromise};HubConnection.prototype.invoke=function(methodName){var _this=this;var args=[];for(var _i=1;_i<arguments.length;_i++){args[_i-1]=arguments[_i]}var _a=this.replaceStreamingParams(args),streams=_a[0],streamIds=_a[1];var invocationDescriptor=this.createInvocation(methodName,args,false,streamIds);var p=new Promise(function(resolve,reject){_this.callbacks[invocationDescriptor.invocationId]=function(invocationEvent,error){if(error){reject(error);return}else if(invocationEvent){if(invocationEvent.type===_IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Completion){if(invocationEvent.error){reject(new Error(invocationEvent.error))}else{resolve(invocationEvent.result)}}else{reject(new Error("Unexpected message type: "+invocationEvent.type))}}};var promiseQueue=_this.sendWithProtocol(invocationDescriptor).catch(function(e){reject(e);delete _this.callbacks[invocationDescriptor.invocationId]});_this.launchStreams(streams,promiseQueue)});return p};HubConnection.prototype.on=function(methodName,newMethod){if(!methodName||!newMethod){return}methodName=methodName.toLowerCase();if(!this.methods[methodName]){this.methods[methodName]=[]}if(this.methods[methodName].indexOf(newMethod)!==-1){return}this.methods[methodName].push(newMethod)};HubConnection.prototype.off=function(methodName,method){if(!methodName){return}methodName=methodName.toLowerCase();var handlers=this.methods[methodName];if(!handlers){return}if(method){var removeIdx=handlers.indexOf(method);if(removeIdx!==-1){handlers.splice(removeIdx,1);if(handlers.length===0){delete this.methods[methodName]}}}else{delete this.methods[methodName]}};HubConnection.prototype.onclose=function(callback){if(callback){this.closedCallbacks.push(callback)}};HubConnection.prototype.onreconnecting=function(callback){if(callback){this.reconnectingCallbacks.push(callback)}};HubConnection.prototype.onreconnected=function(callback){if(callback){this.reconnectedCallbacks.push(callback)}};HubConnection.prototype.processIncomingData=function(data){this.cleanupTimeout();if(!this.receivedHandshakeResponse){data=this.processHandshakeResponse(data);this.receivedHandshakeResponse=true}if(data){var messages=this.protocol.parseMessages(data,this.logger);for(var _i=0,messages_1=messages;_i<messages_1.length;_i++){var message=messages_1[_i];switch(message.type){case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Invocation:this.invokeClientMethod(message);break;case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].StreamItem:case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Completion:var callback=this.callbacks[message.invocationId];if(callback){if(message.type===_IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Completion){delete this.callbacks[message.invocationId]}callback(message)}break;case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Ping:break;case _IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Close:this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information,"Close message received from server.");var error=message.error?new Error("Server returned an error on close: "+message.error):undefined;if(message.allowReconnect===true){this.connection.stop(error)}else{this.stopPromise=this.stopInternal(error)}break;default:this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Warning,"Invalid message type: "+message.type+".");break}}}this.resetTimeoutPeriod()};HubConnection.prototype.processHandshakeResponse=function(data){var _a;var responseMessage;var remainingData;try{_a=this.handshakeProtocol.parseHandshakeResponse(data),remainingData=_a[0],responseMessage=_a[1]}catch(e){var message="Error parsing handshake response: "+e;this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error,message);var error=new Error(message);this.handshakeRejecter(error);throw error}if(responseMessage.error){var message="Server returned handshake error: "+responseMessage.error;this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error,message);var error=new Error(message);this.handshakeRejecter(error);throw error}else{this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Server handshake complete.")}this.handshakeResolver();return remainingData};HubConnection.prototype.resetKeepAliveInterval=function(){if(this.connection.features.inherentKeepAlive){return}this.nextKeepAlive=(new Date).getTime()+this.keepAliveIntervalInMilliseconds;this.cleanupPingTimer()};HubConnection.prototype.resetTimeoutPeriod=function(){var _this=this;if(!this.connection.features||!this.connection.features.inherentKeepAlive){this.timeoutHandle=setTimeout(function(){return _this.serverTimeout()},this.serverTimeoutInMilliseconds);if(this.pingServerHandle===undefined){var nextPing=this.nextKeepAlive-(new Date).getTime();if(nextPing<0){nextPing=0}this.pingServerHandle=setTimeout(function(){return __awaiter(_this,void 0,void 0,function(){var _a;return __generator(this,function(_b){switch(_b.label){case 0:if(!(this.connectionState===HubConnectionState.Connected))return[3,4];_b.label=1;case 1:_b.trys.push([1,3,,4]);return[4,this.sendMessage(this.cachedPingMessage)];case 2:_b.sent();return[3,4];case 3:_a=_b.sent();this.cleanupPingTimer();return[3,4];case 4:return[2]}})})},nextPing)}}};HubConnection.prototype.serverTimeout=function(){this.connection.stop(new Error("Server timeout elapsed without receiving a message from the server."))};HubConnection.prototype.invokeClientMethod=function(invocationMessage){var _this=this;var methods=this.methods[invocationMessage.target.toLowerCase()];if(methods){try{methods.forEach(function(m){return m.apply(_this,invocationMessage.arguments)})}catch(e){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error,"A callback for the method "+invocationMessage.target.toLowerCase()+" threw error '"+e+"'.")}if(invocationMessage.invocationId){var message="Server requested a response, which is not supported in this version of the client.";this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error,message);this.stopPromise=this.stopInternal(new Error(message))}}else{this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Warning,"No client method with the name '"+invocationMessage.target+"' found.")}};HubConnection.prototype.connectionClosed=function(error){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"HubConnection.connectionClosed("+error+") called while in state "+this.connectionState+".");this.stopDuringStartError=this.stopDuringStartError||error||new Error("The underlying connection was closed before the hub handshake could complete.");if(this.handshakeResolver){this.handshakeResolver()}this.cancelCallbacksWithError(error||new Error("Invocation canceled due to the underlying connection being closed."));this.cleanupTimeout();this.cleanupPingTimer();if(this.connectionState===HubConnectionState.Disconnecting){this.completeClose(error)}else if(this.connectionState===HubConnectionState.Connected&&this.reconnectPolicy){this.reconnect(error)}else if(this.connectionState===HubConnectionState.Connected){this.completeClose(error)}};HubConnection.prototype.completeClose=function(error){var _this=this;if(this.connectionStarted){this.connectionState=HubConnectionState.Disconnected;this.connectionStarted=false;try{this.closedCallbacks.forEach(function(c){return c.apply(_this,[error])})}catch(e){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error,"An onclose callback called with error '"+error+"' threw error '"+e+"'.")}}};HubConnection.prototype.reconnect=function(error){return __awaiter(this,void 0,void 0,function(){var reconnectStartTime,previousReconnectAttempts,retryError,nextRetryDelay,e_4;var _this=this;return __generator(this,function(_a){switch(_a.label){case 0:reconnectStartTime=Date.now();previousReconnectAttempts=0;retryError=error!==undefined?error:new Error("Attempting to reconnect due to a unknown error.");nextRetryDelay=this.getNextRetryDelay(previousReconnectAttempts++,0,retryError);if(nextRetryDelay===null){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Connection not reconnecting because the IRetryPolicy returned null on the first reconnect attempt.");this.completeClose(error);return[2]}this.connectionState=HubConnectionState.Reconnecting;if(error){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information,"Connection reconnecting because of error '"+error+"'.")}else{this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information,"Connection reconnecting.")}if(this.onreconnecting){try{this.reconnectingCallbacks.forEach(function(c){return c.apply(_this,[error])})}catch(e){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error,"An onreconnecting callback called with error '"+error+"' threw error '"+e+"'.")}if(this.connectionState!==HubConnectionState.Reconnecting){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Connection left the reconnecting state in onreconnecting callback. Done reconnecting.");return[2]}}_a.label=1;case 1:if(!(nextRetryDelay!==null))return[3,7];this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information,"Reconnect attempt number "+previousReconnectAttempts+" will start in "+nextRetryDelay+" ms.");return[4,new Promise(function(resolve){_this.reconnectDelayHandle=setTimeout(resolve,nextRetryDelay)})];case 2:_a.sent();this.reconnectDelayHandle=undefined;if(this.connectionState!==HubConnectionState.Reconnecting){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Connection left the reconnecting state during reconnect delay. Done reconnecting.");return[2]}_a.label=3;case 3:_a.trys.push([3,5,,6]);return[4,this.startInternal()];case 4:_a.sent();this.connectionState=HubConnectionState.Connected;this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information,"HubConnection reconnected successfully.");if(this.onreconnected){try{this.reconnectedCallbacks.forEach(function(c){return c.apply(_this,[_this.connection.connectionId])})}catch(e){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error,"An onreconnected callback called with connectionId '"+this.connection.connectionId+"; threw error '"+e+"'.")}}return[2];case 5:e_4=_a.sent();this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information,"Reconnect attempt failed because of error '"+e_4+"'.");if(this.connectionState!==HubConnectionState.Reconnecting){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Debug,"Connection moved to the '"+this.connectionState+"' from the reconnecting state during reconnect attempt. Done reconnecting.");if(this.connectionState===HubConnectionState.Disconnecting){this.completeClose()}return[2]}retryError=e_4 instanceof Error?e_4:new Error(e_4.toString());nextRetryDelay=this.getNextRetryDelay(previousReconnectAttempts++,Date.now()-reconnectStartTime,retryError);return[3,6];case 6:return[3,1];case 7:this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information,"Reconnect retries have been exhausted after "+(Date.now()-reconnectStartTime)+" ms and "+previousReconnectAttempts+" failed attempts. Connection disconnecting.");this.completeClose();return[2]}})})};HubConnection.prototype.getNextRetryDelay=function(previousRetryCount,elapsedMilliseconds,retryReason){try{return this.reconnectPolicy.nextRetryDelayInMilliseconds({elapsedMilliseconds:elapsedMilliseconds,previousRetryCount:previousRetryCount,retryReason:retryReason})}catch(e){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error,"IRetryPolicy.nextRetryDelayInMilliseconds("+previousRetryCount+", "+elapsedMilliseconds+") threw error '"+e+"'.");return null}};HubConnection.prototype.cancelCallbacksWithError=function(error){var callbacks=this.callbacks;this.callbacks={};Object.keys(callbacks).forEach(function(key){var callback=callbacks[key];callback(null,error)})};HubConnection.prototype.cleanupPingTimer=function(){if(this.pingServerHandle){clearTimeout(this.pingServerHandle);this.pingServerHandle=undefined}};HubConnection.prototype.cleanupTimeout=function(){if(this.timeoutHandle){clearTimeout(this.timeoutHandle)}};HubConnection.prototype.createInvocation=function(methodName,args,nonblocking,streamIds){if(nonblocking){return{arguments:args,streamIds:streamIds,target:methodName,type:_IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Invocation}}else{var invocationId=this.invocationId;this.invocationId++;return{arguments:args,invocationId:invocationId.toString(),streamIds:streamIds,target:methodName,type:_IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Invocation}}};HubConnection.prototype.launchStreams=function(streams,promiseQueue){var _this=this;if(streams.length===0){return}if(!promiseQueue){promiseQueue=Promise.resolve()}var _loop_1=function(streamId){streams[streamId].subscribe({complete:function(){promiseQueue=promiseQueue.then(function(){return _this.sendWithProtocol(_this.createCompletionMessage(streamId))})},error:function(err){var message;if(err instanceof Error){message=err.message}else if(err&&err.toString){message=err.toString()}else{message="Unknown error"}promiseQueue=promiseQueue.then(function(){return _this.sendWithProtocol(_this.createCompletionMessage(streamId,message))})},next:function(item){promiseQueue=promiseQueue.then(function(){return _this.sendWithProtocol(_this.createStreamItemMessage(streamId,item))})}})};for(var streamId in streams){_loop_1(streamId)}};HubConnection.prototype.replaceStreamingParams=function(args){var streams=[];var streamIds=[];for(var i=0;i<args.length;i++){var argument=args[i];if(this.isObservable(argument)){var streamId=this.invocationId;this.invocationId++;streams[streamId]=argument;streamIds.push(streamId.toString());args.splice(i,1)}}return[streams,streamIds]};HubConnection.prototype.isObservable=function(arg){return arg&&arg.subscribe&&typeof arg.subscribe==="function"};HubConnection.prototype.createStreamInvocation=function(methodName,args,streamIds){var invocationId=this.invocationId;this.invocationId++;return{arguments:args,invocationId:invocationId.toString(),streamIds:streamIds,target:methodName,type:_IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].StreamInvocation}};HubConnection.prototype.createCancelInvocation=function(id){return{invocationId:id,type:_IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].CancelInvocation}};HubConnection.prototype.createStreamItemMessage=function(id,item){return{invocationId:id,item:item,type:_IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].StreamItem}};HubConnection.prototype.createCompletionMessage=function(id,error,result){if(error){return{error:error,invocationId:id,type:_IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Completion}}return{invocationId:id,result:result,type:_IHubProtocol__WEBPACK_IMPORTED_MODULE_1__["MessageType"].Completion}};return HubConnection}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"HandshakeProtocol",function(){return HandshakeProtocol});var _TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(12);var _Utils__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(13);var HandshakeProtocol=function(){function HandshakeProtocol(){}HandshakeProtocol.prototype.writeHandshakeRequest=function(handshakeRequest){return _TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].write(JSON.stringify(handshakeRequest))};HandshakeProtocol.prototype.parseHandshakeResponse=function(data){var responseMessage;var messageData;var remainingData;if(Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["isArrayBuffer"])(data)||typeof Buffer!=="undefined"&&data instanceof Buffer){var binaryData=new Uint8Array(data);var separatorIndex=binaryData.indexOf(_TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].RecordSeparatorCode);if(separatorIndex===-1){throw new Error("Message is incomplete.")}var responseLength=separatorIndex+1;messageData=String.fromCharCode.apply(null,binaryData.slice(0,responseLength));remainingData=binaryData.byteLength>responseLength?binaryData.slice(responseLength).buffer:null}else{var textData=data;var separatorIndex=textData.indexOf(_TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].RecordSeparator);if(separatorIndex===-1){throw new Error("Message is incomplete.")}var responseLength=separatorIndex+1;messageData=textData.substring(0,responseLength);remainingData=textData.length>responseLength?textData.substring(responseLength):null}var messages=_TextMessageFormat__WEBPACK_IMPORTED_MODULE_0__["TextMessageFormat"].parse(messageData);var response=JSON.parse(messages[0]);if(response.type){throw new Error("Expected a handshake response from the server.")}responseMessage=response;return[remainingData,responseMessage]};return HandshakeProtocol}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"TextMessageFormat",function(){return TextMessageFormat});var TextMessageFormat=function(){function TextMessageFormat(){}TextMessageFormat.write=function(output){return""+output+TextMessageFormat.RecordSeparator};TextMessageFormat.parse=function(input){if(input[input.length-1]!==TextMessageFormat.RecordSeparator){throw new Error("Message is incomplete.")}var messages=input.split(TextMessageFormat.RecordSeparator);messages.pop();return messages};TextMessageFormat.RecordSeparatorCode=30;TextMessageFormat.RecordSeparator=String.fromCharCode(TextMessageFormat.RecordSeparatorCode);return TextMessageFormat}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Arg",function(){return Arg});__webpack_require__.d(__webpack_exports__,"Platform",function(){return Platform});__webpack_require__.d(__webpack_exports__,"getDataDetail",function(){return getDataDetail});__webpack_require__.d(__webpack_exports__,"formatArrayBuffer",function(){return formatArrayBuffer});__webpack_require__.d(__webpack_exports__,"isArrayBuffer",function(){return isArrayBuffer});__webpack_require__.d(__webpack_exports__,"sendMessage",function(){return sendMessage});__webpack_require__.d(__webpack_exports__,"createLogger",function(){return createLogger});__webpack_require__.d(__webpack_exports__,"SubjectSubscription",function(){return SubjectSubscription});__webpack_require__.d(__webpack_exports__,"ConsoleLogger",function(){return ConsoleLogger});var _ILogger__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(9);var _Loggers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(14);var __awaiter=undefined&&undefined.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())})};var __generator=undefined&&undefined.__generator||function(thisArg,body){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),throw:verb(1),return:verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return step([n,v])}}function step(op){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break}if(t[2])_.ops.pop();_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e];y=0}finally{f=t=0}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true}}};var Arg=function(){function Arg(){}Arg.isRequired=function(val,name){if(val===null||val===undefined){throw new Error("The '"+name+"' argument is required.")}};Arg.isIn=function(val,values,name){if(!(val in values)){throw new Error("Unknown "+name+" value: "+val+".")}};return Arg}();var Platform=function(){function Platform(){}Object.defineProperty(Platform,"isBrowser",{get:function(){return typeof window==="object"},enumerable:true,configurable:true});Object.defineProperty(Platform,"isWebWorker",{get:function(){return typeof self==="object"&&"importScripts"in self},enumerable:true,configurable:true});Object.defineProperty(Platform,"isNode",{get:function(){return!this.isBrowser&&!this.isWebWorker},enumerable:true,configurable:true});return Platform}();function getDataDetail(data,includeContent){var detail="";if(isArrayBuffer(data)){detail="Binary data of length "+data.byteLength;if(includeContent){detail+=". Content: '"+formatArrayBuffer(data)+"'"}}else if(typeof data==="string"){detail="String data of length "+data.length;if(includeContent){detail+=". Content: '"+data+"'"}}return detail}function formatArrayBuffer(data){var view=new Uint8Array(data);var str="";view.forEach(function(num){var pad=num<16?"0":"";str+="0x"+pad+num.toString(16)+" "});return str.substr(0,str.length-1)}function isArrayBuffer(val){return val&&typeof ArrayBuffer!=="undefined"&&(val instanceof ArrayBuffer||val.constructor&&val.constructor.name==="ArrayBuffer")}function sendMessage(logger,transportName,httpClient,url,accessTokenFactory,content,logMessageContent){return __awaiter(this,void 0,void 0,function(){var _a,headers,token,responseType,response;return __generator(this,function(_b){switch(_b.label){case 0:if(!accessTokenFactory)return[3,2];return[4,accessTokenFactory()];case 1:token=_b.sent();if(token){headers=(_a={},_a["Authorization"]="Bearer "+token,_a)}_b.label=2;case 2:logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace,"("+transportName+" transport) sending data. "+getDataDetail(content,logMessageContent)+".");responseType=isArrayBuffer(content)?"arraybuffer":"text";return[4,httpClient.post(url,{content:content,headers:headers,responseType:responseType})];case 3:response=_b.sent();logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace,"("+transportName+" transport) request complete. Response status: "+response.statusCode+".");return[2]}})})}function createLogger(logger){if(logger===undefined){return new ConsoleLogger(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Information)}if(logger===null){return _Loggers__WEBPACK_IMPORTED_MODULE_1__["NullLogger"].instance}if(logger.log){return logger}return new ConsoleLogger(logger)}var SubjectSubscription=function(){function SubjectSubscription(subject,observer){this.subject=subject;this.observer=observer}SubjectSubscription.prototype.dispose=function(){var index=this.subject.observers.indexOf(this.observer);if(index>-1){this.subject.observers.splice(index,1)}if(this.subject.observers.length===0&&this.subject.cancelCallback){this.subject.cancelCallback().catch(function(_){})}};return SubjectSubscription}();var ConsoleLogger=function(){function ConsoleLogger(minimumLogLevel){this.minimumLogLevel=minimumLogLevel;this.outputConsole=console}ConsoleLogger.prototype.log=function(logLevel,message){if(logLevel>=this.minimumLogLevel){switch(logLevel){case _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Critical:case _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Error:this.outputConsole.error("["+(new Date).toISOString()+"] "+_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"][logLevel]+": "+message);break;case _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Warning:this.outputConsole.warn("["+(new Date).toISOString()+"] "+_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"][logLevel]+": "+message);break;case _ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Information:this.outputConsole.info("["+(new Date).toISOString()+"] "+_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"][logLevel]+": "+message);break;default:this.outputConsole.log("["+(new Date).toISOString()+"] "+_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"][logLevel]+": "+message);break}}};return ConsoleLogger}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"NullLogger",function(){return NullLogger});var NullLogger=function(){function NullLogger(){}NullLogger.prototype.log=function(_logLevel,_message){};NullLogger.instance=new NullLogger;return NullLogger}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"MessageType",function(){return MessageType});var MessageType;(function(MessageType){MessageType[MessageType["Invocation"]=1]="Invocation";MessageType[MessageType["StreamItem"]=2]="StreamItem";MessageType[MessageType["Completion"]=3]="Completion";MessageType[MessageType["StreamInvocation"]=4]="StreamInvocation";MessageType[MessageType["CancelInvocation"]=5]="CancelInvocation";MessageType[MessageType["Ping"]=6]="Ping";MessageType[MessageType["Close"]=7]="Close"})(MessageType||(MessageType={}))},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"Subject",function(){return Subject});var _Utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(13);var Subject=function(){function Subject(){this.observers=[]}Subject.prototype.next=function(item){for(var _i=0,_a=this.observers;_i<_a.length;_i++){var observer=_a[_i];observer.next(item)}};Subject.prototype.error=function(err){for(var _i=0,_a=this.observers;_i<_a.length;_i++){var observer=_a[_i];if(observer.error){observer.error(err)}}};Subject.prototype.complete=function(){for(var _i=0,_a=this.observers;_i<_a.length;_i++){var observer=_a[_i];if(observer.complete){observer.complete()}}};Subject.prototype.subscribe=function(observer){this.observers.push(observer);return new _Utils__WEBPACK_IMPORTED_MODULE_0__["SubjectSubscription"](this,observer)};return Subject}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"HubConnectionBuilder",function(){return HubConnectionBuilder});var _DefaultReconnectPolicy__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(18);var _HttpConnection__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(19);var _HubConnection__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(10);var _ILogger__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(9);var _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(25);var _Loggers__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(14);var _Utils__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(13);var __assign=undefined&&undefined.__assign||Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p]}return t};var LogLevelNameMapping={trace:_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Trace,debug:_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Debug,info:_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Information,information:_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Information,warn:_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Warning,warning:_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Warning,error:_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Error,critical:_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].Critical,none:_ILogger__WEBPACK_IMPORTED_MODULE_3__["LogLevel"].None};function parseLogLevel(name){var mapping=LogLevelNameMapping[name.toLowerCase()];if(typeof mapping!=="undefined"){return mapping}else{throw new Error("Unknown log level: "+name)}}var HubConnectionBuilder=function(){function HubConnectionBuilder(){}HubConnectionBuilder.prototype.configureLogging=function(logging){_Utils__WEBPACK_IMPORTED_MODULE_6__["Arg"].isRequired(logging,"logging");if(isLogger(logging)){this.logger=logging}else if(typeof logging==="string"){var logLevel=parseLogLevel(logging);this.logger=new _Utils__WEBPACK_IMPORTED_MODULE_6__["ConsoleLogger"](logLevel)}else{this.logger=new _Utils__WEBPACK_IMPORTED_MODULE_6__["ConsoleLogger"](logging)}return this};HubConnectionBuilder.prototype.withUrl=function(url,transportTypeOrOptions){_Utils__WEBPACK_IMPORTED_MODULE_6__["Arg"].isRequired(url,"url");this.url=url;if(typeof transportTypeOrOptions==="object"){this.httpConnectionOptions=__assign({},this.httpConnectionOptions,transportTypeOrOptions)}else{this.httpConnectionOptions=__assign({},this.httpConnectionOptions,{transport:transportTypeOrOptions})}return this};HubConnectionBuilder.prototype.withHubProtocol=function(protocol){_Utils__WEBPACK_IMPORTED_MODULE_6__["Arg"].isRequired(protocol,"protocol");this.protocol=protocol;return this};HubConnectionBuilder.prototype.withAutomaticReconnect=function(retryDelaysOrReconnectPolicy){if(this.reconnectPolicy){throw new Error("A reconnectPolicy has already been set.")}if(!retryDelaysOrReconnectPolicy){this.reconnectPolicy=new _DefaultReconnectPolicy__WEBPACK_IMPORTED_MODULE_0__["DefaultReconnectPolicy"]}else if(Array.isArray(retryDelaysOrReconnectPolicy)){this.reconnectPolicy=new _DefaultReconnectPolicy__WEBPACK_IMPORTED_MODULE_0__["DefaultReconnectPolicy"](retryDelaysOrReconnectPolicy)}else{this.reconnectPolicy=retryDelaysOrReconnectPolicy}return this};HubConnectionBuilder.prototype.build=function(){var httpConnectionOptions=this.httpConnectionOptions||{};if(httpConnectionOptions.logger===undefined){httpConnectionOptions.logger=this.logger}if(!this.url){throw new Error("The 'HubConnectionBuilder.withUrl' method must be called before building the connection.")}var connection=new _HttpConnection__WEBPACK_IMPORTED_MODULE_1__["HttpConnection"](this.url,httpConnectionOptions);return _HubConnection__WEBPACK_IMPORTED_MODULE_2__["HubConnection"].create(connection,this.logger||_Loggers__WEBPACK_IMPORTED_MODULE_5__["NullLogger"].instance,this.protocol||new _JsonHubProtocol__WEBPACK_IMPORTED_MODULE_4__["JsonHubProtocol"],this.reconnectPolicy)};return HubConnectionBuilder}();function isLogger(logger){return logger.log!==undefined}},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"DefaultReconnectPolicy",function(){return DefaultReconnectPolicy});var DEFAULT_RETRY_DELAYS_IN_MILLISECONDS=[0,2e3,1e4,3e4,null];var DefaultReconnectPolicy=function(){function DefaultReconnectPolicy(retryDelays){this.retryDelays=retryDelays!==undefined?retryDelays.concat([null]):DEFAULT_RETRY_DELAYS_IN_MILLISECONDS}DefaultReconnectPolicy.prototype.nextRetryDelayInMilliseconds=function(retryContext){return this.retryDelays[retryContext.previousRetryCount]};return DefaultReconnectPolicy}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"HttpConnection",function(){return HttpConnection});__webpack_require__.d(__webpack_exports__,"TransportSendQueue",function(){return TransportSendQueue});var _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(6);var _ILogger__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(9);var _ITransport__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(20);var _LongPollingTransport__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(21);var _ServerSentEventsTransport__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(23);var _Utils__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(13);var _WebSocketTransport__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(24);var __awaiter=undefined&&undefined.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())})};var __generator=undefined&&undefined.__generator||function(thisArg,body){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),throw:verb(1),return:verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return step([n,v])}}function step(op){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break}if(t[2])_.ops.pop();_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e];y=0}finally{f=t=0}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true}}};var MAX_REDIRECTS=100;var WebSocketModule=null;var EventSourceModule=null;if(_Utils__WEBPACK_IMPORTED_MODULE_5__["Platform"].isNode&&"function"!=="undefined"){var requireFunc=true?require:undefined;WebSocketModule=requireFunc("ws");EventSourceModule=requireFunc("eventsource")}var HttpConnection=function(){function HttpConnection(url,options){if(options===void 0){options={}}this.stopPromiseResolver=function(){};this.features={};this.negotiateVersion=1;_Utils__WEBPACK_IMPORTED_MODULE_5__["Arg"].isRequired(url,"url");this.logger=Object(_Utils__WEBPACK_IMPORTED_MODULE_5__["createLogger"])(options.logger);this.baseUrl=this.resolveUrl(url);options=options||{};options.logMessageContent=options.logMessageContent||false;if(!_Utils__WEBPACK_IMPORTED_MODULE_5__["Platform"].isNode&&typeof WebSocket!=="undefined"&&!options.WebSocket){options.WebSocket=WebSocket}else if(_Utils__WEBPACK_IMPORTED_MODULE_5__["Platform"].isNode&&!options.WebSocket){if(WebSocketModule){options.WebSocket=WebSocketModule}}if(!_Utils__WEBPACK_IMPORTED_MODULE_5__["Platform"].isNode&&typeof EventSource!=="undefined"&&!options.EventSource){options.EventSource=EventSource}else if(_Utils__WEBPACK_IMPORTED_MODULE_5__["Platform"].isNode&&!options.EventSource){if(typeof EventSourceModule!=="undefined"){options.EventSource=EventSourceModule}}this.httpClient=options.httpClient||new _DefaultHttpClient__WEBPACK_IMPORTED_MODULE_0__["DefaultHttpClient"](this.logger);this.connectionState="Disconnected";this.connectionStarted=false;this.options=options;this.onreceive=null;this.onclose=null}HttpConnection.prototype.start=function(transferFormat){return __awaiter(this,void 0,void 0,function(){var message,message;return __generator(this,function(_a){switch(_a.label){case 0:transferFormat=transferFormat||_ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"].Binary;_Utils__WEBPACK_IMPORTED_MODULE_5__["Arg"].isIn(transferFormat,_ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"],"transferFormat");this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"Starting connection with transfer format '"+_ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"][transferFormat]+"'.");if(this.connectionState!=="Disconnected"){return[2,Promise.reject(new Error("Cannot start an HttpConnection that is not in the 'Disconnected' state."))]}this.connectionState="Connecting ";this.startInternalPromise=this.startInternal(transferFormat);return[4,this.startInternalPromise];case 1:_a.sent();if(!(this.connectionState==="Disconnecting"))return[3,3];message="Failed to start the HttpConnection before stop() was called.";this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error,message);return[4,this.stopPromise];case 2:_a.sent();return[2,Promise.reject(new Error(message))];case 3:if(this.connectionState!=="Connected"){message="HttpConnection.startInternal completed gracefully but didn't enter the connection into the connected state!";this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error,message);return[2,Promise.reject(new Error(message))]}_a.label=4;case 4:this.connectionStarted=true;return[2]}})})};HttpConnection.prototype.send=function(data){if(this.connectionState!=="Connected"){return Promise.reject(new Error("Cannot send data if the connection is not in the 'Connected' State."))}if(!this.sendQueue){this.sendQueue=new TransportSendQueue(this.transport)}return this.sendQueue.send(data)};HttpConnection.prototype.stop=function(error){return __awaiter(this,void 0,void 0,function(){var _this=this;return __generator(this,function(_a){switch(_a.label){case 0:if(this.connectionState==="Disconnected"){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"Call to HttpConnection.stop("+error+") ignored because the connection is already in the disconnected state.");return[2,Promise.resolve()]}if(this.connectionState==="Disconnecting"){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"Call to HttpConnection.stop("+error+") ignored because the connection is already in the disconnecting state.");return[2,this.stopPromise]}this.connectionState="Disconnecting";this.stopPromise=new Promise(function(resolve){_this.stopPromiseResolver=resolve});return[4,this.stopInternal(error)];case 1:_a.sent();return[4,this.stopPromise];case 2:_a.sent();return[2]}})})};HttpConnection.prototype.stopInternal=function(error){return __awaiter(this,void 0,void 0,function(){var e_1,e_2;return __generator(this,function(_a){switch(_a.label){case 0:this.stopError=error;_a.label=1;case 1:_a.trys.push([1,3,,4]);return[4,this.startInternalPromise];case 2:_a.sent();return[3,4];case 3:e_1=_a.sent();return[3,4];case 4:if(!this.transport)return[3,9];_a.label=5;case 5:_a.trys.push([5,7,,8]);return[4,this.transport.stop()];case 6:_a.sent();return[3,8];case 7:e_2=_a.sent();this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error,"HttpConnection.transport.stop() threw error '"+e_2+"'.");this.stopConnection();return[3,8];case 8:this.transport=undefined;return[3,10];case 9:this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"HttpConnection.transport is undefined in HttpConnection.stop() because start() failed.");_a.label=10;case 10:return[2]}})})};HttpConnection.prototype.startInternal=function(transferFormat){return __awaiter(this,void 0,void 0,function(){var url,negotiateResponse,redirects,_loop_1,this_1,e_3;return __generator(this,function(_a){switch(_a.label){case 0:url=this.baseUrl;this.accessTokenFactory=this.options.accessTokenFactory;_a.label=1;case 1:_a.trys.push([1,12,,13]);if(!this.options.skipNegotiation)return[3,5];if(!(this.options.transport===_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].WebSockets))return[3,3];this.transport=this.constructTransport(_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].WebSockets);return[4,this.startTransport(url,transferFormat)];case 2:_a.sent();return[3,4];case 3:throw new Error("Negotiation can only be skipped when using the WebSocket transport directly.");case 4:return[3,11];case 5:negotiateResponse=null;redirects=0;_loop_1=function(){var accessToken_1;return __generator(this,function(_a){switch(_a.label){case 0:return[4,this_1.getNegotiationResponse(url)];case 1:negotiateResponse=_a.sent();if(this_1.connectionState==="Disconnecting"||this_1.connectionState==="Disconnected"){throw new Error("The connection was stopped during negotiation.")}if(negotiateResponse.error){throw new Error(negotiateResponse.error)}if(negotiateResponse.ProtocolVersion){throw new Error("Detected a connection attempt to an ASP.NET SignalR Server. This client only supports connecting to an ASP.NET Core SignalR Server. See https://aka.ms/signalr-core-differences for details.")}if(negotiateResponse.url){url=negotiateResponse.url}if(negotiateResponse.accessToken){accessToken_1=negotiateResponse.accessToken;this_1.accessTokenFactory=function(){return accessToken_1}}redirects++;return[2]}})};this_1=this;_a.label=6;case 6:return[5,_loop_1()];case 7:_a.sent();_a.label=8;case 8:if(negotiateResponse.url&&redirects<MAX_REDIRECTS)return[3,6];_a.label=9;case 9:if(redirects===MAX_REDIRECTS&&negotiateResponse.url){throw new Error("Negotiate redirection limit exceeded.")}return[4,this.createTransport(url,this.options.transport,negotiateResponse,transferFormat)];case 10:_a.sent();_a.label=11;case 11:if(this.transport instanceof _LongPollingTransport__WEBPACK_IMPORTED_MODULE_3__["LongPollingTransport"]){this.features.inherentKeepAlive=true}if(this.connectionState==="Connecting "){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"The HttpConnection connected successfully.");this.connectionState="Connected"}return[3,13];case 12:e_3=_a.sent();this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error,"Failed to start the connection: "+e_3);this.connectionState="Disconnected";this.transport=undefined;this.stopPromiseResolver();return[2,Promise.reject(e_3)];case 13:return[2]}})})};HttpConnection.prototype.getNegotiationResponse=function(url){return __awaiter(this,void 0,void 0,function(){var _a,headers,token,negotiateUrl,response,negotiateResponse,e_4;return __generator(this,function(_b){switch(_b.label){case 0:if(!this.accessTokenFactory)return[3,2];return[4,this.accessTokenFactory()];case 1:token=_b.sent();if(token){headers=(_a={},_a["Authorization"]="Bearer "+token,_a)}_b.label=2;case 2:negotiateUrl=this.resolveNegotiateUrl(url);this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"Sending negotiation request: "+negotiateUrl+".");_b.label=3;case 3:_b.trys.push([3,5,,6]);return[4,this.httpClient.post(negotiateUrl,{content:"",headers:headers})];case 4:response=_b.sent();if(response.statusCode!==200){return[2,Promise.reject(new Error("Unexpected status code returned from negotiate "+response.statusCode))]}negotiateResponse=JSON.parse(response.content);if(!negotiateResponse.negotiateVersion||negotiateResponse.negotiateVersion<1){negotiateResponse.connectionToken=negotiateResponse.connectionId}return[2,negotiateResponse];case 5:e_4=_b.sent();this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error,"Failed to complete negotiation with the server: "+e_4);return[2,Promise.reject(e_4)];case 6:return[2]}})})};HttpConnection.prototype.createConnectUrl=function(url,connectionToken){if(!connectionToken){return url}return url+(url.indexOf("?")===-1?"?":"&")+("id="+connectionToken)};HttpConnection.prototype.createTransport=function(url,requestedTransport,negotiateResponse,requestedTransferFormat){return __awaiter(this,void 0,void 0,function(){var connectUrl,transportExceptions,transports,negotiate,_i,transports_1,endpoint,transportOrError,ex_1,ex_2,message;return __generator(this,function(_a){switch(_a.label){case 0:connectUrl=this.createConnectUrl(url,negotiateResponse.connectionToken);if(!this.isITransport(requestedTransport))return[3,2];this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"Connection was provided an instance of ITransport, using that directly.");this.transport=requestedTransport;return[4,this.startTransport(connectUrl,requestedTransferFormat)];case 1:_a.sent();this.connectionId=negotiateResponse.connectionId;return[2];case 2:transportExceptions=[];transports=negotiateResponse.availableTransports||[];negotiate=negotiateResponse;_i=0,transports_1=transports;_a.label=3;case 3:if(!(_i<transports_1.length))return[3,13];endpoint=transports_1[_i];transportOrError=this.resolveTransportOrError(endpoint,requestedTransport,requestedTransferFormat);if(!(transportOrError instanceof Error))return[3,4];transportExceptions.push(endpoint.transport+" failed: "+transportOrError);return[3,12];case 4:if(!this.isITransport(transportOrError))return[3,12];this.transport=transportOrError;if(!!negotiate)return[3,9];_a.label=5;case 5:_a.trys.push([5,7,,8]);return[4,this.getNegotiationResponse(url)];case 6:negotiate=_a.sent();return[3,8];case 7:ex_1=_a.sent();return[2,Promise.reject(ex_1)];case 8:connectUrl=this.createConnectUrl(url,negotiate.connectionToken);_a.label=9;case 9:_a.trys.push([9,11,,12]);return[4,this.startTransport(connectUrl,requestedTransferFormat)];case 10:_a.sent();this.connectionId=negotiate.connectionId;return[2];case 11:ex_2=_a.sent();this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error,"Failed to start the transport '"+endpoint.transport+"': "+ex_2);negotiate=undefined;transportExceptions.push(endpoint.transport+" failed: "+ex_2);if(this.connectionState!=="Connecting "){message="Failed to select transport before stop() was called.";this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,message);return[2,Promise.reject(new Error(message))]}return[3,12];case 12:_i++;return[3,3];case 13:if(transportExceptions.length>0){return[2,Promise.reject(new Error("Unable to connect to the server with any of the available transports. "+transportExceptions.join(" ")))]}return[2,Promise.reject(new Error("None of the transports supported by the client are supported by the server."))]}})})};HttpConnection.prototype.constructTransport=function(transport){switch(transport){case _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].WebSockets:if(!this.options.WebSocket){throw new Error("'WebSocket' is not supported in your environment.")}return new _WebSocketTransport__WEBPACK_IMPORTED_MODULE_6__["WebSocketTransport"](this.httpClient,this.accessTokenFactory,this.logger,this.options.logMessageContent||false,this.options.WebSocket);case _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].ServerSentEvents:if(!this.options.EventSource){throw new Error("'EventSource' is not supported in your environment.")}return new _ServerSentEventsTransport__WEBPACK_IMPORTED_MODULE_4__["ServerSentEventsTransport"](this.httpClient,this.accessTokenFactory,this.logger,this.options.logMessageContent||false,this.options.EventSource);case _ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].LongPolling:return new _LongPollingTransport__WEBPACK_IMPORTED_MODULE_3__["LongPollingTransport"](this.httpClient,this.accessTokenFactory,this.logger,this.options.logMessageContent||false);default:throw new Error("Unknown transport: "+transport+".")}};HttpConnection.prototype.startTransport=function(url,transferFormat){var _this=this;this.transport.onreceive=this.onreceive;this.transport.onclose=function(e){return _this.stopConnection(e)};return this.transport.connect(url,transferFormat)};HttpConnection.prototype.resolveTransportOrError=function(endpoint,requestedTransport,requestedTransferFormat){var transport=_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][endpoint.transport];if(transport===null||transport===undefined){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"Skipping transport '"+endpoint.transport+"' because it is not supported by this client.");return new Error("Skipping transport '"+endpoint.transport+"' because it is not supported by this client.")}else{if(transportMatches(requestedTransport,transport)){var transferFormats=endpoint.transferFormats.map(function(s){return _ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"][s]});if(transferFormats.indexOf(requestedTransferFormat)>=0){if(transport===_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].WebSockets&&!this.options.WebSocket||transport===_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"].ServerSentEvents&&!this.options.EventSource){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"Skipping transport '"+_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport]+"' because it is not supported in your environment.'");return new Error("'"+_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport]+"' is not supported in your environment.")}else{this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"Selecting transport '"+_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport]+"'.");try{return this.constructTransport(transport)}catch(ex){return ex}}}else{this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"Skipping transport '"+_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport]+"' because it does not support the requested transfer format '"+_ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"][requestedTransferFormat]+"'.");return new Error("'"+_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport]+"' does not support "+_ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"][requestedTransferFormat]+".")}}else{this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"Skipping transport '"+_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport]+"' because it was disabled by the client.");return new Error("'"+_ITransport__WEBPACK_IMPORTED_MODULE_2__["HttpTransportType"][transport]+"' is disabled by the client.")}}};HttpConnection.prototype.isITransport=function(transport){return transport&&typeof transport==="object"&&"connect"in transport};HttpConnection.prototype.stopConnection=function(error){var _this=this;this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"HttpConnection.stopConnection("+error+") called while in state "+this.connectionState+".");this.transport=undefined;error=this.stopError||error;this.stopError=undefined;if(this.connectionState==="Disconnected"){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Debug,"Call to HttpConnection.stopConnection("+error+") was ignored because the connection is already in the disconnected state.");return}if(this.connectionState==="Connecting "){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Warning,"Call to HttpConnection.stopConnection("+error+") was ignored because the connection hasn't yet left the in the connecting state.");return}if(this.connectionState==="Disconnecting"){this.stopPromiseResolver()}if(error){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error,"Connection disconnected with error '"+error+"'.")}else{this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Information,"Connection disconnected.")}if(this.sendQueue){this.sendQueue.stop().catch(function(e){_this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error,"TransportSendQueue.stop() threw error '"+e+"'.")});this.sendQueue=undefined}this.connectionId=undefined;this.connectionState="Disconnected";if(this.connectionStarted){this.connectionStarted=false;try{if(this.onclose){this.onclose(error)}}catch(e){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Error,"HttpConnection.onclose("+error+") threw error '"+e+"'.")}}};HttpConnection.prototype.resolveUrl=function(url){if(url.lastIndexOf("https://",0)===0||url.lastIndexOf("http://",0)===0){return url}if(!_Utils__WEBPACK_IMPORTED_MODULE_5__["Platform"].isBrowser||!window.document){throw new Error("Cannot resolve '"+url+"'.")}var aTag=window.document.createElement("a");aTag.href=url;this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Information,"Normalizing '"+url+"' to '"+aTag.href+"'.");return aTag.href};HttpConnection.prototype.resolveNegotiateUrl=function(url){var index=url.indexOf("?");var negotiateUrl=url.substring(0,index===-1?url.length:index);if(negotiateUrl[negotiateUrl.length-1]!=="/"){negotiateUrl+="/"}negotiateUrl+="negotiate";negotiateUrl+=index===-1?"":url.substring(index);if(negotiateUrl.indexOf("negotiateVersion")===-1){negotiateUrl+=index===-1?"?":"&";negotiateUrl+="negotiateVersion="+this.negotiateVersion}return negotiateUrl};return HttpConnection}();function transportMatches(requestedTransport,actualTransport){return!requestedTransport||(actualTransport&requestedTransport)!==0}var TransportSendQueue=function(){function TransportSendQueue(transport){this.transport=transport;this.buffer=[];this.executing=true;this.sendBufferedData=new PromiseSource;this.transportResult=new PromiseSource;this.sendLoopPromise=this.sendLoop()}TransportSendQueue.prototype.send=function(data){this.bufferData(data);if(!this.transportResult){this.transportResult=new PromiseSource}return this.transportResult.promise};TransportSendQueue.prototype.stop=function(){this.executing=false;this.sendBufferedData.resolve();return this.sendLoopPromise};TransportSendQueue.prototype.bufferData=function(data){if(this.buffer.length&&typeof this.buffer[0]!==typeof data){throw new Error("Expected data to be of type "+typeof this.buffer+" but was of type "+typeof data)}this.buffer.push(data);this.sendBufferedData.resolve()};TransportSendQueue.prototype.sendLoop=function(){return __awaiter(this,void 0,void 0,function(){var transportResult,data,error_1;return __generator(this,function(_a){switch(_a.label){case 0:if(false){}return[4,this.sendBufferedData.promise];case 1:_a.sent();if(!this.executing){if(this.transportResult){this.transportResult.reject("Connection stopped.")}return[3,6]}this.sendBufferedData=new PromiseSource;transportResult=this.transportResult;this.transportResult=undefined;data=typeof this.buffer[0]==="string"?this.buffer.join(""):TransportSendQueue.concatBuffers(this.buffer);this.buffer.length=0;_a.label=2;case 2:_a.trys.push([2,4,,5]);return[4,this.transport.send(data)];case 3:_a.sent();transportResult.resolve();return[3,5];case 4:error_1=_a.sent();transportResult.reject(error_1);return[3,5];case 5:return[3,0];case 6:return[2]}})})};TransportSendQueue.concatBuffers=function(arrayBuffers){var totalLength=arrayBuffers.map(function(b){return b.byteLength}).reduce(function(a,b){return a+b});var result=new Uint8Array(totalLength);var offset=0;for(var _i=0,arrayBuffers_1=arrayBuffers;_i<arrayBuffers_1.length;_i++){var item=arrayBuffers_1[_i];result.set(new Uint8Array(item),offset);offset+=item.byteLength}return result};return TransportSendQueue}();var PromiseSource=function(){function PromiseSource(){var _this=this;this.promise=new Promise(function(resolve,reject){var _a;return _a=[resolve,reject],_this.resolver=_a[0],_this.rejecter=_a[1],_a})}PromiseSource.prototype.resolve=function(){this.resolver()};PromiseSource.prototype.reject=function(reason){this.rejecter(reason)};return PromiseSource}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"HttpTransportType",function(){return HttpTransportType});__webpack_require__.d(__webpack_exports__,"TransferFormat",function(){return TransferFormat});var HttpTransportType;(function(HttpTransportType){HttpTransportType[HttpTransportType["None"]=0]="None";HttpTransportType[HttpTransportType["WebSockets"]=1]="WebSockets";HttpTransportType[HttpTransportType["ServerSentEvents"]=2]="ServerSentEvents";HttpTransportType[HttpTransportType["LongPolling"]=4]="LongPolling"})(HttpTransportType||(HttpTransportType={}));var TransferFormat;(function(TransferFormat){TransferFormat[TransferFormat["Text"]=1]="Text";TransferFormat[TransferFormat["Binary"]=2]="Binary"})(TransferFormat||(TransferFormat={}))},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"LongPollingTransport",function(){return LongPollingTransport});var _AbortController__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(22);var _Errors__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(4);var _ILogger__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(9);var _ITransport__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(20);var _Utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(13);var __awaiter=undefined&&undefined.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())})};var __generator=undefined&&undefined.__generator||function(thisArg,body){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),throw:verb(1),return:verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return step([n,v])}}function step(op){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break}if(t[2])_.ops.pop();_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e];y=0}finally{f=t=0}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true}}};var LongPollingTransport=function(){function LongPollingTransport(httpClient,accessTokenFactory,logger,logMessageContent){this.httpClient=httpClient;this.accessTokenFactory=accessTokenFactory;this.logger=logger;this.pollAbort=new _AbortController__WEBPACK_IMPORTED_MODULE_0__["AbortController"];this.logMessageContent=logMessageContent;this.running=false;this.onreceive=null;this.onclose=null}Object.defineProperty(LongPollingTransport.prototype,"pollAborted",{get:function(){return this.pollAbort.aborted},enumerable:true,configurable:true});LongPollingTransport.prototype.connect=function(url,transferFormat){return __awaiter(this,void 0,void 0,function(){var pollOptions,token,pollUrl,response;return __generator(this,function(_a){switch(_a.label){case 0:_Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(url,"url");_Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isRequired(transferFormat,"transferFormat");_Utils__WEBPACK_IMPORTED_MODULE_4__["Arg"].isIn(transferFormat,_ITransport__WEBPACK_IMPORTED_MODULE_3__["TransferFormat"],"transferFormat");this.url=url;this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) Connecting.");if(transferFormat===_ITransport__WEBPACK_IMPORTED_MODULE_3__["TransferFormat"].Binary&&(typeof XMLHttpRequest!=="undefined"&&typeof(new XMLHttpRequest).responseType!=="string")){throw new Error("Binary protocols over XmlHttpRequest not implementing advanced features are not supported.")}pollOptions={abortSignal:this.pollAbort.signal,headers:{},timeout:1e5};if(transferFormat===_ITransport__WEBPACK_IMPORTED_MODULE_3__["TransferFormat"].Binary){pollOptions.responseType="arraybuffer"}return[4,this.getAccessToken()];case 1:token=_a.sent();this.updateHeaderToken(pollOptions,token);pollUrl=url+"&_="+Date.now();this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) polling: "+pollUrl+".");return[4,this.httpClient.get(pollUrl,pollOptions)];case 2:response=_a.sent();if(response.statusCode!==200){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error,"(LongPolling transport) Unexpected response code: "+response.statusCode+".");this.closeError=new _Errors__WEBPACK_IMPORTED_MODULE_1__["HttpError"](response.statusText||"",response.statusCode);this.running=false}else{this.running=true}this.receiving=this.poll(this.url,pollOptions);return[2]}})})};LongPollingTransport.prototype.getAccessToken=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(_a){switch(_a.label){case 0:if(!this.accessTokenFactory)return[3,2];return[4,this.accessTokenFactory()];case 1:return[2,_a.sent()];case 2:return[2,null]}})})};LongPollingTransport.prototype.updateHeaderToken=function(request,token){if(!request.headers){request.headers={}}if(token){request.headers["Authorization"]="Bearer "+token;return}if(request.headers["Authorization"]){delete request.headers["Authorization"]}};LongPollingTransport.prototype.poll=function(url,pollOptions){return __awaiter(this,void 0,void 0,function(){var token,pollUrl,response,e_1;return __generator(this,function(_a){switch(_a.label){case 0:_a.trys.push([0,,8,9]);_a.label=1;case 1:if(!this.running)return[3,7];return[4,this.getAccessToken()];case 2:token=_a.sent();this.updateHeaderToken(pollOptions,token);_a.label=3;case 3:_a.trys.push([3,5,,6]);pollUrl=url+"&_="+Date.now();this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) polling: "+pollUrl+".");return[4,this.httpClient.get(pollUrl,pollOptions)];case 4:response=_a.sent();if(response.statusCode===204){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Information,"(LongPolling transport) Poll terminated by server.");this.running=false}else if(response.statusCode!==200){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Error,"(LongPolling transport) Unexpected response code: "+response.statusCode+".");this.closeError=new _Errors__WEBPACK_IMPORTED_MODULE_1__["HttpError"](response.statusText||"",response.statusCode);this.running=false}else{if(response.content){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) data received. "+Object(_Utils__WEBPACK_IMPORTED_MODULE_4__["getDataDetail"])(response.content,this.logMessageContent)+".");if(this.onreceive){this.onreceive(response.content)}}else{this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) Poll timed out, reissuing.")}}return[3,6];case 5:e_1=_a.sent();if(!this.running){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) Poll errored after shutdown: "+e_1.message)}else{if(e_1 instanceof _Errors__WEBPACK_IMPORTED_MODULE_1__["TimeoutError"]){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) Poll timed out, reissuing.")}else{this.closeError=e_1;this.running=false}}return[3,6];case 6:return[3,1];case 7:return[3,9];case 8:this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) Polling complete.");if(!this.pollAborted){this.raiseOnClose()}return[7];case 9:return[2]}})})};LongPollingTransport.prototype.send=function(data){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(_a){if(!this.running){return[2,Promise.reject(new Error("Cannot send until the transport is connected"))]}return[2,Object(_Utils__WEBPACK_IMPORTED_MODULE_4__["sendMessage"])(this.logger,"LongPolling",this.httpClient,this.url,this.accessTokenFactory,data,this.logMessageContent)]})})};LongPollingTransport.prototype.stop=function(){return __awaiter(this,void 0,void 0,function(){var deleteOptions,token;return __generator(this,function(_a){switch(_a.label){case 0:this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) Stopping polling.");this.running=false;this.pollAbort.abort();_a.label=1;case 1:_a.trys.push([1,,5,6]);return[4,this.receiving];case 2:_a.sent();this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) sending DELETE request to "+this.url+".");deleteOptions={headers:{}};return[4,this.getAccessToken()];case 3:token=_a.sent();this.updateHeaderToken(deleteOptions,token);return[4,this.httpClient.delete(this.url,deleteOptions)];case 4:_a.sent();this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) DELETE request sent.");return[3,6];case 5:this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,"(LongPolling transport) Stop finished.");this.raiseOnClose();return[7];case 6:return[2]}})})};LongPollingTransport.prototype.raiseOnClose=function(){if(this.onclose){var logMessage="(LongPolling transport) Firing onclose event.";if(this.closeError){logMessage+=" Error: "+this.closeError}this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_2__["LogLevel"].Trace,logMessage);this.onclose(this.closeError)}};return LongPollingTransport}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"AbortController",function(){return AbortController});var AbortController=function(){function AbortController(){this.isAborted=false;this.onabort=null}AbortController.prototype.abort=function(){if(!this.isAborted){this.isAborted=true;if(this.onabort){this.onabort()}}};Object.defineProperty(AbortController.prototype,"signal",{get:function(){return this},enumerable:true,configurable:true});Object.defineProperty(AbortController.prototype,"aborted",{get:function(){return this.isAborted},enumerable:true,configurable:true});return AbortController}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"ServerSentEventsTransport",function(){return ServerSentEventsTransport});var _ILogger__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(9);var _ITransport__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(20);var _Utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(13);var __awaiter=undefined&&undefined.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())})};var __generator=undefined&&undefined.__generator||function(thisArg,body){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),throw:verb(1),return:verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return step([n,v])}}function step(op){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break}if(t[2])_.ops.pop();_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e];y=0}finally{f=t=0}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true}}};var ServerSentEventsTransport=function(){function ServerSentEventsTransport(httpClient,accessTokenFactory,logger,logMessageContent,eventSourceConstructor){this.httpClient=httpClient;this.accessTokenFactory=accessTokenFactory;this.logger=logger;this.logMessageContent=logMessageContent;this.eventSourceConstructor=eventSourceConstructor;this.onreceive=null;this.onclose=null}ServerSentEventsTransport.prototype.connect=function(url,transferFormat){return __awaiter(this,void 0,void 0,function(){var token;var _this=this;return __generator(this,function(_a){switch(_a.label){case 0:_Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isRequired(url,"url");_Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isRequired(transferFormat,"transferFormat");_Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isIn(transferFormat,_ITransport__WEBPACK_IMPORTED_MODULE_1__["TransferFormat"],"transferFormat");this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace,"(SSE transport) Connecting.");this.url=url;if(!this.accessTokenFactory)return[3,2];return[4,this.accessTokenFactory()];case 1:token=_a.sent();if(token){url+=(url.indexOf("?")<0?"?":"&")+("access_token="+encodeURIComponent(token))}_a.label=2;case 2:return[2,new Promise(function(resolve,reject){var opened=false;if(transferFormat!==_ITransport__WEBPACK_IMPORTED_MODULE_1__["TransferFormat"].Text){reject(new Error("The Server-Sent Events transport only supports the 'Text' transfer format"));return}var eventSource;if(_Utils__WEBPACK_IMPORTED_MODULE_2__["Platform"].isBrowser||_Utils__WEBPACK_IMPORTED_MODULE_2__["Platform"].isWebWorker){eventSource=new _this.eventSourceConstructor(url,{withCredentials:true})}else{var cookies=_this.httpClient.getCookieString(url);eventSource=new _this.eventSourceConstructor(url,{withCredentials:true,headers:{Cookie:cookies}})}try{eventSource.onmessage=function(e){if(_this.onreceive){try{_this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace,"(SSE transport) data received. "+Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["getDataDetail"])(e.data,_this.logMessageContent)+".");_this.onreceive(e.data)}catch(error){_this.close(error);return}}};eventSource.onerror=function(e){var error=new Error(e.data||"Error occurred");if(opened){_this.close(error)}else{reject(error)}};eventSource.onopen=function(){_this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Information,"SSE connected to "+_this.url);_this.eventSource=eventSource;opened=true;resolve()}}catch(e){reject(e);return}})]}})})};ServerSentEventsTransport.prototype.send=function(data){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(_a){if(!this.eventSource){return[2,Promise.reject(new Error("Cannot send until the transport is connected"))]}return[2,Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["sendMessage"])(this.logger,"SSE",this.httpClient,this.url,this.accessTokenFactory,data,this.logMessageContent)]})})};ServerSentEventsTransport.prototype.stop=function(){this.close();return Promise.resolve()};ServerSentEventsTransport.prototype.close=function(e){if(this.eventSource){this.eventSource.close();this.eventSource=undefined;if(this.onclose){this.onclose(e)}}};return ServerSentEventsTransport}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"WebSocketTransport",function(){return WebSocketTransport});var _ILogger__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(9);var _ITransport__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(20);var _Utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(13);var __awaiter=undefined&&undefined.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())})};var __generator=undefined&&undefined.__generator||function(thisArg,body){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1]},trys:[],ops:[]},f,y,t,g;return g={next:verb(0),throw:verb(1),return:verb(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return step([n,v])}}function step(op){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break}if(t[2])_.ops.pop();_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e];y=0}finally{f=t=0}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true}}};var WebSocketTransport=function(){function WebSocketTransport(httpClient,accessTokenFactory,logger,logMessageContent,webSocketConstructor){this.logger=logger;this.accessTokenFactory=accessTokenFactory;this.logMessageContent=logMessageContent;this.webSocketConstructor=webSocketConstructor;this.httpClient=httpClient;this.onreceive=null;this.onclose=null}WebSocketTransport.prototype.connect=function(url,transferFormat){return __awaiter(this,void 0,void 0,function(){var token;var _this=this;return __generator(this,function(_a){switch(_a.label){case 0:_Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isRequired(url,"url");_Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isRequired(transferFormat,"transferFormat");_Utils__WEBPACK_IMPORTED_MODULE_2__["Arg"].isIn(transferFormat,_ITransport__WEBPACK_IMPORTED_MODULE_1__["TransferFormat"],"transferFormat");this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace,"(WebSockets transport) Connecting.");if(!this.accessTokenFactory)return[3,2];return[4,this.accessTokenFactory()];case 1:token=_a.sent();if(token){url+=(url.indexOf("?")<0?"?":"&")+("access_token="+encodeURIComponent(token))}_a.label=2;case 2:return[2,new Promise(function(resolve,reject){url=url.replace(/^http/,"ws");var webSocket;var cookies=_this.httpClient.getCookieString(url);var opened=false;if(_Utils__WEBPACK_IMPORTED_MODULE_2__["Platform"].isNode&&cookies){webSocket=new _this.webSocketConstructor(url,undefined,{headers:{Cookie:""+cookies}})}if(!webSocket){webSocket=new _this.webSocketConstructor(url)}if(transferFormat===_ITransport__WEBPACK_IMPORTED_MODULE_1__["TransferFormat"].Binary){webSocket.binaryType="arraybuffer"}webSocket.onopen=function(_event){_this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Information,"WebSocket connected to "+url+".");_this.webSocket=webSocket;opened=true;resolve()};webSocket.onerror=function(event){var error=null;if(typeof ErrorEvent!=="undefined"&&event instanceof ErrorEvent){error=event.error}else{error=new Error("There was an error with the transport.")}reject(error)};webSocket.onmessage=function(message){_this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace,"(WebSockets transport) data received. "+Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["getDataDetail"])(message.data,_this.logMessageContent)+".");if(_this.onreceive){_this.onreceive(message.data)}};webSocket.onclose=function(event){if(opened){_this.close(event)}else{var error=null;if(typeof ErrorEvent!=="undefined"&&event instanceof ErrorEvent){error=event.error}else{error=new Error("There was an error with the transport.")}reject(error)}}})]}})})};WebSocketTransport.prototype.send=function(data){if(this.webSocket&&this.webSocket.readyState===this.webSocketConstructor.OPEN){this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace,"(WebSockets transport) sending data. "+Object(_Utils__WEBPACK_IMPORTED_MODULE_2__["getDataDetail"])(data,this.logMessageContent)+".");this.webSocket.send(data);return Promise.resolve()}return Promise.reject("WebSocket is not in the OPEN state")};WebSocketTransport.prototype.stop=function(){if(this.webSocket){this.close(undefined)}return Promise.resolve()};WebSocketTransport.prototype.close=function(event){if(this.webSocket){this.webSocket.onclose=function(){};this.webSocket.onmessage=function(){};this.webSocket.onerror=function(){};this.webSocket.close();this.webSocket=undefined}this.logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].Trace,"(WebSockets transport) socket closed.");if(this.onclose){if(event&&(event.wasClean===false||event.code!==1e3)){this.onclose(new Error("WebSocket closed with status code: "+event.code+" ("+event.reason+")."))}else{this.onclose()}}};return WebSocketTransport}()},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,"JsonHubProtocol",function(){return JsonHubProtocol});var _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(15);var _ILogger__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(9);var _ITransport__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(20);var _Loggers__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(14);var _TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(12);var JSON_HUB_PROTOCOL_NAME="json";var JsonHubProtocol=function(){function JsonHubProtocol(){this.name=JSON_HUB_PROTOCOL_NAME;this.version=1;this.transferFormat=_ITransport__WEBPACK_IMPORTED_MODULE_2__["TransferFormat"].Text}JsonHubProtocol.prototype.parseMessages=function(input,logger){if(typeof input!=="string"){throw new Error("Invalid input for JSON hub protocol. Expected a string.")}if(!input){return[]}if(logger===null){logger=_Loggers__WEBPACK_IMPORTED_MODULE_3__["NullLogger"].instance}var messages=_TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__["TextMessageFormat"].parse(input);var hubMessages=[];for(var _i=0,messages_1=messages;_i<messages_1.length;_i++){var message=messages_1[_i];var parsedMessage=JSON.parse(message);if(typeof parsedMessage.type!=="number"){throw new Error("Invalid payload.")}switch(parsedMessage.type){case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Invocation:this.isInvocationMessage(parsedMessage);break;case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].StreamItem:this.isStreamItemMessage(parsedMessage);break;case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Completion:this.isCompletionMessage(parsedMessage);break;case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Ping:break;case _IHubProtocol__WEBPACK_IMPORTED_MODULE_0__["MessageType"].Close:break;default:logger.log(_ILogger__WEBPACK_IMPORTED_MODULE_1__["LogLevel"].Information,"Unknown message type '"+parsedMessage.type+"' ignored.");continue}hubMessages.push(parsedMessage)}return hubMessages};JsonHubProtocol.prototype.writeMessage=function(message){return _TextMessageFormat__WEBPACK_IMPORTED_MODULE_4__["TextMessageFormat"].write(JSON.stringify(message))};JsonHubProtocol.prototype.isInvocationMessage=function(message){this.assertNotEmptyString(message.target,"Invalid payload for Invocation message.");if(message.invocationId!==undefined){this.assertNotEmptyString(message.invocationId,"Invalid payload for Invocation message.")}};JsonHubProtocol.prototype.isStreamItemMessage=function(message){this.assertNotEmptyString(message.invocationId,"Invalid payload for StreamItem message.");if(message.item===undefined){throw new Error("Invalid payload for StreamItem message.")}};JsonHubProtocol.prototype.isCompletionMessage=function(message){if(message.result&&message.error){throw new Error("Invalid payload for Completion message.")}if(!message.result&&message.error){this.assertNotEmptyString(message.error,"Invalid payload for Completion message.")}this.assertNotEmptyString(message.invocationId,"Invalid payload for Completion message.")};JsonHubProtocol.prototype.assertNotEmptyString=function(value,errorMessage){if(typeof value!=="string"||value===""){throw new Error(errorMessage)}};return JsonHubProtocol}()}])});
//# sourceMappingURL=signalr.min.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoApplication {
    get IsLoaded() {
        return (this._isLoaded);
    }
    get Log() {
        return (this._logger);
    }
    get Router() {
        return (this._router);
    }
    get Server() {
        return (this._server);
    }
    get Observer() {
        return (this._observer);
    }
    get Document() {
        return (this._document);
    }
    get ControlFlow() {
        return (this._controlFlow);
    }
    get Parser() {
        return (this._parser);
    }
    get Storage() {
        return (this._storage);
    }
    get Solver() {
        return (this._solver);
    }
    get Binder() {
        return (this._binder);
    }
    get Config() {
        return (this._config);
    }
    get Register() {
        return (this._register);
    }
    get Serializer() {
        return (this._serializer);
    }
    get Barber() {
        return (this._barber);
    }
    get Searcher() {
        return (this._searcher);
    }
    get ModelHandler() {
        return (this._modelHandler);
    }
    get AttributeHandler() {
        return (this._attributeHandler);
    }
    get ClassHandler() {
        return (this._classHandler);
    }
    get EventHandler() {
        return (this._eventHandler);
    }
    get FunctionHandler() {
        return (this._functionHandler);
    }
    get ComponentHandler() {
        return (this._componentHandler);
    }
    get CookieHandler() {
        return (this._cookieHandler);
    }
    get SectorContainerHandler() {
        return (this._sectorContainerHandler);
    }
    get WindowHandler() {
        return (this._windowHandler);
    }
    get BehaviorHandler() {
        return (this._behaviorHandler);
    }
    get Plumber() {
        return (this._plumber);
    }
    get Formatter() {
        return (this._formatter);
    }
    get Validator() {
        return (this._validator);
    }
    get ExceptionHandler() {
        return (this._exceptionHandler);
    }
    get Globalization() {
        return (this._globalization);
    }
    get Stylist() {
        return (this._stylist);
    }
    get ViewportHandler() {
        return (this._viewportHandler);
    }
    get CacheHandler() {
        return (this._cacheHandler);
    }
    get Worker() {
        return (this._worker);
    }
    get Debugger() {
        return (this._debugger);
    }
    constructor() {
        this._isLoaded = false;
        this._logger = new DrapoLogger(this);
        this._router = new DrapoRouter(this);
        this._server = new DrapoServer(this);
        this._observer = new DrapoObserver(this);
        this._document = new DrapoDocument(this);
        this._controlFlow = new DrapoControlFlow(this);
        this._parser = new DrapoParser(this);
        this._storage = new DrapoStorage(this);
        this._solver = new DrapoSolver(this);
        this._binder = new DrapoBinder(this);
        this._config = new DrapoConfig(this);
        this._register = new DrapoRegister(this);
        this._serializer = new DrapoSerializer(this);
        this._barber = new DrapoBarber(this);
        this._searcher = new DrapoSearcher(this);
        this._modelHandler = new DrapoModelHandler(this);
        this._attributeHandler = new DrapoAttributeHandler(this);
        this._classHandler = new DrapoClassHandler(this);
        this._eventHandler = new DrapoEventHandler(this);
        this._functionHandler = new DrapoFunctionHandler(this);
        this._componentHandler = new DrapoComponentHandler(this);
        this._cookieHandler = new DrapoCookieHandler(this);
        this._sectorContainerHandler = new DrapoSectorContainerHandler(this);
        this._windowHandler = new DrapoWindowHandler(this);
        this._behaviorHandler = new DrapoBehaviorHandler(this);
        this._plumber = new DrapoPlumber(this);
        this._formatter = new DrapoFormatter(this);
        this._validator = new DrapoValidator(this);
        this._exceptionHandler = new DrapoExceptionHandler(this);
        this._globalization = new DrapoGlobalization(this);
        this._stylist = new DrapoStylist(this);
        this._viewportHandler = new DrapoViewportHandler(this);
        this._cacheHandler = new DrapoCacheHandler(this);
        this._worker = new DrapoWorker(this);
        this._debugger = new DrapoDebugger(this);
    }
    OnLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.Log.WriteVerbose('Application - OnLoad - Started');
                yield this.Debugger.Initialize();
                yield this.Plumber.ConnectPipe();
                yield this.CacheHandler.Initialize();
                yield this.Document.Resolve();
                yield this.Document.StartUnitTest();
                yield this.Debugger.ConnectDebugger();
                this._isLoaded = true;
                this.Log.WriteVerbose('Application - OnLoad - Finished');
            }
            catch (e) {
                yield this.ExceptionHandler.Handle(e, 'OnLoad');
            }
        });
    }
    show() {
        this.Debugger.ShowDebugger();
        return ('');
    }
    close() {
        this.Debugger.CloseDebugger();
        return ('');
    }
}
window.onload = () => {
    const application = new DrapoApplication();
    const windowAny = window;
    windowAny.drapo = application;
    application.OnLoad();
};
window.onpopstate = (e) => {
    const windowAny = window;
    const application = windowAny.drapo;
    application.Router.OnPopState(e);
};
window.addEventListener('message', (event) => {
    const windowAny = window;
    const application = windowAny.drapo;
    application.Document.ReceiveMessage(event.data);
}, false);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoAttributeHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    HasContentIDContext(content) {
        return (content.indexOf('d-id') > -1);
    }
    HasContentAttributeContext(content) {
        return (content.indexOf('d-attr') > -1);
    }
    ResolveAttr(el, canBind = true, canSubscribeDelay = true, dataKeyFilter = null, dataFieldFilter = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const attributes = this.ExtractAttr(el);
            if (attributes.length == 0)
                return;
            const sector = this.Application.Document.GetSector(el);
            const context = new DrapoContext();
            for (let i = 0; i < attributes.length; i++) {
                const attribute = attributes[i];
                const attributeName = attribute[0];
                let attributeValue = attribute[1];
                if (this.Application.Barber.HasMustacheContext(attributeValue, sector))
                    continue;
                const attributeType = attribute[2];
                const format = attribute[3];
                const formatResolved = format == null ? null : yield this.Application.ModelHandler.ResolveValueExpression(context, el, sector, format, false);
                const attributeValueOriginal = attributeValue;
                attributeValue = yield this.Application.ModelHandler.ResolveValueExpression(context, el, sector, attributeValue, canBind);
                attributeValue = this.ResolveConversionAttributeValue(attributeName, attributeValue, formatResolved);
                if (attributeValue === attributeValueOriginal)
                    continue;
                if (attributeType == null) {
                    el.setAttribute(attributeName, attributeValue);
                }
                else if (attributeType === 'min') {
                    const isValid = yield this.Application.Solver.ResolveConditional(attributeValue);
                    if (isValid)
                        el.setAttribute(attributeName, '');
                    else
                        el.removeAttribute(attributeName);
                }
            }
        });
    }
    ResolveAttrContext(context, el, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            const attributes = this.ExtractAttr(el);
            if (attributes.length == 0)
                return;
            const sector = this.Application.Document.GetSector(el);
            for (let i = 0; i < attributes.length; i++) {
                const attribute = attributes[i];
                const attributeName = attribute[0];
                let attributeValue = attribute[1];
                const attributeType = attribute[2];
                const format = attribute[3];
                const formatResolved = format == null ? null : yield this.Application.ModelHandler.ResolveValueExpression(context, el, sector, format, false);
                const attributeValueOriginal = attributeValue;
                attributeValue = yield this.Application.ModelHandler.ResolveValueExpression(context, el, sector, attributeValue, canBind);
                attributeValue = this.ResolveConversionAttributeValue(attributeName, attributeValue, formatResolved);
                if (context.CanUpdateTemplate) {
                    const attributeNameFull = 'd-attr-' + attributeName + (attributeType != null ? ('-' + attributeType) : '');
                    if (this.Application.Parser.HasMustache(attributeValue)) {
                        el.setAttribute(attributeNameFull, attributeValue);
                        continue;
                    }
                    if (this.Application.Parser.IsMustache(attributeValueOriginal)) {
                        const key = this.Application.Parser.ParseMustache(attributeValueOriginal)[0];
                        if (!context.IsParentKey(key))
                            el.removeAttribute(attributeNameFull);
                    }
                    else
                        el.removeAttribute(attributeNameFull);
                }
                if (attributeValue === attributeValueOriginal)
                    continue;
                if (attributeType == null) {
                    el.setAttribute(attributeName, attributeValue);
                }
                else if (attributeType === 'min') {
                    const isValid = yield this.Application.Solver.ResolveConditional(attributeValue);
                    if (isValid)
                        el.setAttribute(attributeName, '');
                    else
                        el.removeAttribute(attributeName);
                }
            }
        });
    }
    ResolveContextValue(context, el, sector, isContext, value, canBind, canSubscribeDelay = false, dataKeyFilter = null, dataFieldFilter = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const valueOriginal = value;
            const mustaches = this.Application.Parser.ParseMustaches(value);
            for (let j = 0; j < mustaches.length; j++) {
                const mustache = mustaches[j];
                const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                const dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                if ((dataKeyFilter != null) && (dataKey != dataKeyFilter))
                    continue;
                const isDataKeyContext = !this.Application.Storage.IsDataKey(dataKey, sector);
                if (isDataKeyContext !== isContext)
                    continue;
                if ((context !== null) && (!context.CanResolve(dataKey)))
                    continue;
                const dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                if ((dataFieldFilter != null) && (dataFields[0] != dataFieldFilter))
                    continue;
                if ((isContext) || (yield this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts))) {
                    let contextCurrent = context;
                    if (contextCurrent === null) {
                        contextCurrent = new DrapoContext();
                        const data = yield this.Application.Storage.RetrieveData(dataKey, sector);
                        contextCurrent.Create(data, el, null, dataKey, dataKey, null, null);
                    }
                    const valueNew = yield this.Application.Solver.ResolveDataPath(contextCurrent, null, el, sector, mustacheParts, canBind);
                    value = value.replace(mustache, valueNew);
                }
                else if (canSubscribeDelay) {
                    this.Application.Observer.SubscribeDelay(el, dataKey, dataFields);
                }
            }
            if (valueOriginal !== value)
                return (yield this.ResolveContextValue(context, el, sector, isContext, value, canBind, canSubscribeDelay, null, null));
            return (value);
        });
    }
    ExtractAttr(el) {
        const attributes = [];
        for (let i = 0; i < el.attributes.length; i++) {
            const attribute = el.attributes[i];
            const attributeProperty = this.Application.AttributeHandler.ExtractAttrProperty(attribute.nodeName);
            if (attributeProperty == null)
                continue;
            const format = el.getAttribute('d-attr-' + attributeProperty[0] + "-format");
            attributes.push([attributeProperty[0], attribute.nodeValue, attributeProperty[1], format]);
        }
        return (attributes);
    }
    ExtractAttrProperty(property) {
        const parse = this.Application.Parser.ParseProperty(property);
        if (parse.length < 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'attr')
            return (null);
        const name = parse[2];
        const type = parse.length > 3 ? parse[3] : null;
        if (type === 'format')
            return (null);
        return ([name, type]);
    }
    ResolveID(el, sector, canBind = true, canSubscribeDelay = true, dataKeyFilter = null, dataFieldFilter = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const did = el.getAttribute('d-id');
            if (did == null)
                return;
            if (this.Application.Barber.HasMustacheContext(did, sector))
                return;
            const context = new DrapoContext();
            const expressionCurrent = yield this.Application.Barber.ResolveControlFlowMustacheString(context, null, null, did, el, sector, canBind);
            if (did !== expressionCurrent)
                el.setAttribute('d-id', expressionCurrent);
        });
    }
    ResolveIDContext(context, el, sector, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            const did = el.getAttribute('d-id');
            if (did == null)
                return;
            const expressionCurrent = yield this.Application.Barber.ResolveControlFlowMustacheString(context, null, null, did, el, sector, canBind);
            if (did !== expressionCurrent)
                el.setAttribute('d-id', expressionCurrent);
        });
    }
    ResolveConversionAttributeValue(name, value, format) {
        if (name === 'src')
            return (this.ResolveConversionAttributeSourceValue(value));
        if (format != null)
            value = this.Application.Formatter.Format(value, format);
        return (value);
    }
    ResolveConversionAttributeSourceValue(value) {
        const url = this.Application.Server.ResolveUrl(value);
        const urlEncoded = this.Application.Server.EnsureUrlEncoded(url);
        return (urlEncoded);
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoBarber {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    HasContentMustacheNodesContext(content) {
        let isInsideTag = false;
        const length = content.length - 1;
        for (let i = 0; i < length; i++) {
            const chr = content[i];
            if (chr == '>') {
                isInsideTag = false;
            }
            else if (chr == '<') {
                isInsideTag = true;
            }
            else if ((!isInsideTag) && (chr === '{')) {
                if (content[i + 1] === '{')
                    return (true);
            }
        }
        return (false);
    }
    HasContentMustacheAttributeContext(content) {
        const attributes = this.Application.Parser.ParseHTMLAttributes(content);
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            const attributeKey = attribute[0];
            if ((attributeKey !== 'value') && (attributeKey !== 'class'))
                continue;
            const attributeValue = attribute[1];
            if (attributeValue.indexOf('{{') >= 0)
                return (true);
        }
        return (false);
    }
    HasContentMustacheAttributeContextMustache(content, attribute) {
        return ((content.indexOf(attribute + '="{{') > -1) || (content.indexOf(attribute + "='{{") > -1));
    }
    ResolveMustaches(el = null, sector = null, stopAtSectors = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (el == null)
                el = document.documentElement;
            if (sector === null)
                sector = this.Application.Document.GetSector(el);
            const renderContext = new DrapoRenderContext();
            const context = new DrapoContext();
            this.Application.ControlFlow.InitializeContext(context, el.outerHTML);
            yield this.ResolveMustachesInternal(el, sector, context, renderContext, stopAtSectors);
            yield this.Application.Storage.LoadDataDelayedAndNotify();
        });
    }
    ResolveMustachesInternal(el, sector, context, renderContext, stopAtSectors) {
        return __awaiter(this, void 0, void 0, function* () {
            const pre = el.getAttribute != null ? el.getAttribute('d-pre') : null;
            if (pre === 'true')
                return;
            const children = [].slice.call(el.children);
            const hasChildren = children.length > 0;
            if (hasChildren) {
                for (let i = 0; i < children.length; i++) {
                    const child = children[i];
                    const childSector = child.getAttribute('d-sector');
                    if (childSector != null) {
                        if (stopAtSectors)
                            continue;
                        sector = childSector;
                    }
                    const canRender = yield this.CanRender(child, sector);
                    if (canRender) {
                        yield this.ResolveMustachesInternal(child, sector, context, renderContext, stopAtSectors);
                    }
                    else {
                        yield this.Application.Document.RemoveElement(child);
                    }
                }
            }
            else {
                yield this.ResolveMustacheElementLeaf(el);
            }
            if (context.CheckID)
                yield this.Application.AttributeHandler.ResolveID(el, sector);
            if (context.CheckAttribute)
                yield this.Application.AttributeHandler.ResolveAttr(el);
            if (context.CheckModel)
                yield this.ResolveModel(el);
            if (context.CheckClass)
                yield this.Application.ClassHandler.ResolveClass(el, sector);
            if (context.CheckValidation)
                yield this.Application.Validator.RegisterValidation(el, sector);
            if (context.CheckEvent)
                yield this.Application.EventHandler.Attach(el, renderContext);
            if (context.CheckBehavior)
                yield this.Application.BehaviorHandler.ResolveBehavior(el);
            yield this.ResolveMustacheElementVisibility(el);
            yield this.ResolveCloak(el);
        });
    }
    CanRender(el, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dRender = el.getAttribute('d-render');
            if (dRender == null)
                return (true);
            if (this.Application.Barber.HasMustacheContext(dRender, sector))
                return (true);
            const context = new DrapoContext();
            const expression = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, dRender, null, false);
            const result = yield this.Application.Solver.ResolveConditional(expression);
            el.removeAttribute('d-render');
            return (result);
        });
    }
    ResolveFilter(el, sector, canBind, dataKeyFilter, dataFieldFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.Application.Document.IsElementPreprocessed(el))
                return;
            const children = [].slice.call(el.children);
            const hasChildren = children.length > 0;
            if (!hasChildren) {
                yield this.ResolveMustacheElementLeaf(el, false, true, dataKeyFilter, dataFieldFilter);
            }
            yield this.Application.AttributeHandler.ResolveID(el, sector, canBind, true, dataKeyFilter, dataFieldFilter);
            yield this.Application.AttributeHandler.ResolveAttr(el, canBind, true, dataKeyFilter, dataFieldFilter);
            yield this.ResolveModel(el, canBind, true, dataKeyFilter, dataFieldFilter);
            yield this.Application.ClassHandler.ResolveClass(el, sector, canBind, true, dataKeyFilter, dataFieldFilter);
            yield this.ResolveMustacheElementVisibility(el, canBind);
            yield this.Application.Storage.LoadDataDelayedAndNotify();
            yield this.ResolveCloak(el, canBind);
        });
    }
    ResolveElementDelayed(el, sector, dataKeyFilter = null, dataFieldFilter = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ResolveMustacheElementLeaf(el, true, false, dataKeyFilter, dataFieldFilter);
            yield this.Application.AttributeHandler.ResolveAttr(el, false, false, dataKeyFilter, dataFieldFilter);
            yield this.Application.ClassHandler.ResolveClass(el, sector, false, false, dataKeyFilter, dataFieldFilter);
        });
    }
    ResolveMustacheElementLeaf(el, canUseModel = false, canSubscribeDelay = true, dataKeyFilter = null, dataFieldFilter = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = this.Application.Document.GetSector(el);
            const model = canUseModel ? el.getAttribute('d-model') : null;
            let text = model != null ? model : this.Application.Document.GetText(el);
            let updated = false;
            const mustaches = this.Application.Parser.ParseMustaches(text);
            for (let i = 0; i < mustaches.length; i++) {
                const mustache = mustaches[i];
                const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                const dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                if ((dataKeyFilter != null) && (dataKey != dataKeyFilter))
                    continue;
                if (!this.Application.Storage.IsMustachePartsDataKey(sector, mustacheParts))
                    continue;
                const dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                const dataField = dataFields[0];
                if ((dataFieldFilter != null) && (dataField != dataFieldFilter))
                    continue;
                if (yield this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts)) {
                    const mustacheData = this.Application.Storage.GetDataKeyField(dataKey, sector, mustacheParts);
                    if (mustacheData == null)
                        continue;
                    text = text.replace(mustache, mustacheData);
                    updated = true;
                }
                else if (canSubscribeDelay) {
                    this.Application.Observer.SubscribeDelay(el, dataKey, dataFields);
                }
            }
            if (updated)
                this.Application.Document.SetText(el, text);
        });
    }
    ResolveModel(el, canBind = true, canSubscribeDelay = true, dataKeyFilter = null, dataFieldFilter = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = el.getAttribute('d-model');
            if (model == null)
                return;
            const sector = this.Application.Document.GetSector(el);
            if (this.Application.Barber.HasMustacheContext(model, sector))
                return;
            const isMustacheOnly = this.Application.Parser.IsMustacheOnly(model, true);
            if (!isMustacheOnly) {
                const context = new DrapoContext();
                yield this.Application.ModelHandler.ResolveModel(context, null, el, sector, canBind, false);
                return;
            }
            const mustaches = this.Application.Parser.ParseMustaches(model);
            if (mustaches.length != 1)
                return;
            const mustache = mustaches[0];
            const mustacheParts = this.Application.Parser.ParseMustache(mustache);
            const dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
            if ((dataKeyFilter != null) && (dataKey != dataKeyFilter))
                return;
            if (!this.Application.Storage.IsDataKey(dataKey, sector))
                return;
            const dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
            const dataField = dataFields[0];
            if ((dataFieldFilter != null) && (dataField != dataFieldFilter))
                return;
            if (yield this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts)) {
                const context = new DrapoContext();
                const data = yield this.Application.Storage.RetrieveData(dataKey, sector);
                context.Create(data, el, null, dataKey, dataKey, null, null);
                yield this.Application.ModelHandler.ResolveModel(context, null, el, sector, canBind, false);
            }
            else if (canSubscribeDelay) {
                this.Application.Observer.SubscribeDelay(el, dataKey, dataFields);
            }
        });
    }
    ResolveControlFlowMustacheAttributes(context, element, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ResolveControlFlowMustacheAttribute(context, "value", element, sector);
            yield this.ResolveControlFlowMustacheAttribute(context, "class", element, sector);
        });
    }
    ResolveControlFlowMustacheNodes(context, element, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const childNodes = [].slice.call(element.childNodes);
            for (let i = 0; i < childNodes.length; i++) {
                const childNode = childNodes[i];
                if (childNode.nodeType != Node.TEXT_NODE)
                    continue;
                let text = childNode.nodeValue;
                const textOriginal = text;
                const mustaches = this.Application.Parser.ParseMustaches(text);
                if (mustaches.length == 0)
                    continue;
                for (let j = 0; j < mustaches.length; j++) {
                    const mustache = mustaches[j];
                    const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                    if ((context !== null) && (!context.CanResolve(mustacheParts[0])))
                        continue;
                    const mustacheData = yield this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, true);
                    text = text.replace(mustache, mustacheData);
                }
                if (textOriginal !== text)
                    childNode.nodeValue = text;
            }
        });
    }
    ResolveControlFlowMustacheAttribute(context, attribute, el, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            let hasChanges = false;
            let text = el.getAttribute(attribute);
            if (text == null)
                return;
            const mustaches = this.Application.Parser.ParseMustaches(text);
            for (let j = 0; j < mustaches.length; j++) {
                const mustache = mustaches[j];
                const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                if (!context.CanResolve(mustacheParts[0]))
                    continue;
                const mustacheData = yield this.Application.Solver.ResolveDataPath(context, null, el, sector, mustacheParts, true);
                text = text.replace(mustache, mustacheData);
                hasChanges = true;
            }
            if (context.CanUpdateTemplate) {
                if (this.Application.Parser.HasMustache(text)) {
                    if (hasChanges)
                        el.setAttribute(attribute, text);
                    return;
                }
            }
            if (hasChanges)
                el.setAttribute(attribute, text);
        });
    }
    ResolveControlFlowMustacheStringFunction(sector, context, renderContext, executionContext, expression, element, canBind = true, type = DrapoStorageLinkType.Render) {
        return __awaiter(this, void 0, void 0, function* () {
            const expressionWithoutFunctions = yield this.Application.FunctionHandler.ReplaceFunctionExpressions(sector, context, expression, canBind);
            return (this.ResolveControlFlowMustacheString(context, renderContext, executionContext, expressionWithoutFunctions, element, sector, canBind, type));
        });
    }
    ResolveControlFlowMustacheString(context, renderContext, executionContext, expression, element, sector, canBind = true, type = DrapoStorageLinkType.Render, isForIterator = false, elementForTemplate = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const mustaches = this.Application.Parser.ParseMustaches(expression);
            for (let j = 0; j < mustaches.length; j++) {
                const mustache = mustaches[j];
                const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                const dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                const dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                if ((this.Application.Storage.IsDataKey(dataKey, sector, renderContext)) && (!this.Application.Storage.IsDataKeyExecution(dataKey))) {
                    yield this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts);
                    let mustacheData = this.Application.Storage.GetDataKeyField(dataKey, sector, mustacheParts);
                    mustacheData = this.Application.Solver.EnsureString(mustacheData);
                    if (canBind) {
                        if (isForIterator) {
                            this.Application.Observer.SubscribeLink(dataKey, context.GetDataKeyRoot(), dataFields);
                        }
                        else {
                            const contextDataKey = new DrapoContext();
                            const data = yield this.Application.Storage.RetrieveData(dataKey, sector);
                            contextDataKey.Create(data, element, null, dataKey, dataKey, null, null);
                            this.Application.Binder.BindReader(contextDataKey.Item, element, dataFields);
                            if ((context != null) && (context.Item != null) && (dataKey !== context.Item.DataKey))
                                this.Application.Observer.SubscribeStorage(dataKey, dataFields, context.Item.DataKey, type);
                        }
                    }
                    expression = expression.replace(mustache, mustacheData);
                }
                else {
                    let mustacheData = context.Item === null ? '' : yield this.Application.Solver.ResolveDataPath(context, executionContext, element, sector, mustacheParts, canBind);
                    mustacheData = this.Application.Solver.EnsureString(mustacheData);
                    expression = expression.replace(mustache, mustacheData);
                }
            }
            return (expression);
        });
    }
    ResolveMustacheElementVisibility(el, canBind = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const elFor = el.getAttribute('d-for');
            if (elFor != null)
                return;
            const elIF = el.getAttribute('d-if');
            if (elIF == null)
                return;
            const sector = this.Application.Document.GetSector(el);
            if (this.Application.Barber.HasMustacheContext(elIF, sector))
                return;
            const context = new DrapoContext();
            const visibility = yield this.Application.Solver.ResolveConditional(elIF, el, sector, context);
            if (visibility)
                this.Application.Document.Show(el);
            else
                this.Application.Document.Hide(el);
        });
    }
    HasMustacheContext(expression, sector, renderContext = null) {
        const valueCache = this.HasMustacheContextInternal(expression, sector, renderContext);
        return (valueCache);
    }
    HasMustacheContextInternal(expression, sector, renderContext = null) {
        const mustaches = this.Application.Parser.ParseMustaches(expression, true);
        for (let j = 0; j < mustaches.length; j++) {
            const mustache = mustaches[j];
            const mustacheParts = this.Application.Parser.ParseMustache(mustache);
            const dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
            const isDataKey = this.Application.Storage.IsDataKey(dataKey, sector, renderContext);
            if (!isDataKey)
                return (true);
        }
        return (false);
    }
    ResolveCloak(el, canBind = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const elCloak = el.getAttribute('d-cloak');
            if (elCloak == null)
                return;
            el.classList.remove(elCloak);
        });
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoBehaviorHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    HasContentBehaviorContext(content) {
        return ((content.indexOf('d-dragstart') > -1) || (content.indexOf('d-dragend') > -1) || (content.indexOf('d-resize-location') > -1));
    }
    ResolveBehavior(el, canBind = true, canSubscribeDelay = true, dataKeyFilter = null, dataFieldFilter = null) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ResolveBehaviorDragStart(el);
            yield this.ResolveBehaviorDragEnd(el);
            yield this.ResolveBehaviorResize(el, canBind, canSubscribeDelay, dataKeyFilter, dataFieldFilter);
        });
    }
    ResolveBehaviorContext(context, element, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ResolveBehaviorDragStartContext(context, element, canBind);
            yield this.ResolveBehaviorDragEndContext(context, element, canBind);
            yield this.ResolveBehaviorResizeContext(context, element, canBind);
        });
    }
    ResolveBehaviorDragStart(el) {
        const dragStartAttribute = el.getAttribute('d-dragStart');
        if ((dragStartAttribute === null) || (dragStartAttribute === undefined))
            return;
        const dragActionAttribute = el.getAttribute('d-dragAction');
        if (dragActionAttribute !== 'barber')
            return;
        const sector = this.Application.Document.GetSector(el);
        const onBefore = el.getAttribute('d-dragOnBeforeStart');
        const onAfter = el.getAttribute('d-dragOnAfterEnd');
        const application = this.Application;
        const drag = this.CreateDrag(dragActionAttribute, null, null, this.Application.Parser.ParseTags(dragStartAttribute), false, null, sector, onBefore, onAfter);
        el.setAttribute('draggable', 'true');
        const eventType = 'dragstart';
        const eventNamespace = this.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'drag');
        this.Application.EventHandler.DetachEventListener(el, eventNamespace);
        this.Application.EventHandler.AttachEventListener(el, eventType, eventNamespace, (e) => {
            application.BehaviorHandler.SetDrag(drag);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text', drag.Code);
        });
    }
    ResolveBehaviorDragEnd(el) {
        return __awaiter(this, void 0, void 0, function* () {
            const dragEndAttribute = el.getAttribute('d-dragEnd');
            if ((dragEndAttribute === null) || (dragEndAttribute === undefined))
                return;
            const dragActionAttribute = el.getAttribute('d-dragAction');
            if (dragActionAttribute !== 'barber')
                return;
            const notifyText = el.getAttribute('d-dragNotify');
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            const onBefore = el.getAttribute('d-dragOnBeforeStart');
            const onAfter = el.getAttribute('d-dragOnAfterEnd');
            const application = this.Application;
            const tags = this.Application.Parser.ParseTags(dragEndAttribute);
            const sector = this.Application.Document.GetSector(el);
            const eventTypeDragover = 'dragover';
            const eventNamespaceDragover = this.Application.EventHandler.CreateEventNamespace(null, null, eventTypeDragover, 'drag');
            this.Application.EventHandler.DetachEventListener(el, eventNamespaceDragover);
            this.Application.EventHandler.AttachEventListener(el, eventTypeDragover, eventNamespaceDragover, (e) => {
                e.preventDefault();
                const drag = application.BehaviorHandler.GetDrag();
                if (!application.BehaviorHandler.IsDragMatch(drag, e.dataTransfer.getData('Text'), tags))
                    return;
                e.dataTransfer.dropEffect = 'move';
            });
            const eventTypeDrop = 'drop';
            const eventNamespaceDrop = this.Application.EventHandler.CreateEventNamespace(null, null, eventTypeDrop, 'drag');
            this.Application.EventHandler.DetachEventListener(el, eventNamespaceDrop);
            this.Application.EventHandler.AttachEventListener(el, eventTypeDrop, eventNamespaceDrop, (e) => {
                application.BehaviorHandler.ResolveBehaviorDragEndDrop(e, null, tags, notify, null, sector, onBefore, onAfter);
            });
        });
    }
    ResolveBehaviorDragStartContext(context, el, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            const dragStartAttribute = el.getAttribute('d-dragStart');
            if ((dragStartAttribute === null) || (dragStartAttribute === undefined))
                return;
            let dragActionAttribute = el.getAttribute('d-dragAction');
            if ((dragActionAttribute === null) || (dragActionAttribute === undefined))
                dragActionAttribute = 'move';
            if (dragActionAttribute === 'barber')
                return;
            let custom = null;
            if (dragActionAttribute === 'custom')
                custom = el.getAttribute('d-dragActionCustom');
            const notifyText = el.getAttribute('d-dragNotify');
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            const dataKey = el.getAttribute('d-dragStartDataKey');
            const sector = this.Application.Document.GetSector(el);
            const onBefore = el.getAttribute('d-dragOnBeforeStart');
            const onAfter = el.getAttribute('d-dragOnAfterEnd');
            const application = this.Application;
            const drag = this.CreateDrag(dragActionAttribute, custom, context.Item, this.Application.Parser.ParseTags(dragStartAttribute), notify, dataKey, sector, onBefore, onAfter);
            el.setAttribute('draggable', 'true');
            const eventType = 'dragstart';
            const eventNamespace = this.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'drag');
            this.Application.EventHandler.DetachEventListener(el, eventNamespace);
            this.Application.EventHandler.AttachEventListener(el, eventType, eventNamespace, (e) => {
                application.BehaviorHandler.SetDrag(drag);
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text', drag.Code);
            });
        });
    }
    ResolveBehaviorDragEndContext(context, el, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            const dragEndAttribute = el.getAttribute('d-dragEnd');
            if ((dragEndAttribute === null) || (dragEndAttribute === undefined))
                return;
            const dragActionAttribute = el.getAttribute('d-dragAction');
            if (dragActionAttribute === 'barber')
                return;
            const notifyText = el.getAttribute('d-dragNotify');
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            const dataKey = el.getAttribute('d-dragEndDataKey');
            const onBefore = el.getAttribute('d-dragOnBeforeStart');
            const onAfter = el.getAttribute('d-dragOnAfterEnd');
            const application = this.Application;
            const item = context.Item;
            const tags = this.Application.Parser.ParseTags(dragEndAttribute);
            const sector = this.Application.Document.GetSector(el);
            const eventTypeDragover = 'dragover';
            const eventNamespaceDragover = this.Application.EventHandler.CreateEventNamespace(null, null, eventTypeDragover, 'drag');
            this.Application.EventHandler.DetachEventListener(el, eventNamespaceDragover);
            this.Application.EventHandler.AttachEventListener(el, eventTypeDragover, eventNamespaceDragover, (e) => {
                e.preventDefault();
                const drag = application.BehaviorHandler.GetDrag();
                if (!application.BehaviorHandler.IsDragMatch(drag, e.dataTransfer.getData('Text'), tags))
                    return;
                e.dataTransfer.dropEffect = 'move';
            });
            const eventTypeDrop = 'drop';
            const eventNamespaceDrop = this.Application.EventHandler.CreateEventNamespace(null, null, eventTypeDrop, 'drag');
            this.Application.EventHandler.DetachEventListener(el, eventNamespaceDrop);
            this.Application.EventHandler.AttachEventListener(el, eventTypeDrop, eventNamespaceDrop, (e) => {
                application.BehaviorHandler.ResolveBehaviorDragEndDrop(e, item, tags, notify, dataKey, sector, onBefore, onAfter);
            });
        });
    }
    ResolveBehaviorDragEndDrop(e, item, tags, notify, dataKey, sector, onBefore, onAfter) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const dragBefore = this.GetDrag();
            if (!this.IsDragMatch(dragBefore, e.dataTransfer.getData('Text'), tags))
                return;
            this.SetDrag(null);
            const dragAfter = this.CreateDrag(null, null, item, tags, notify, dataKey, sector, onBefore, onAfter);
            if (dragBefore.DataKey !== null)
                yield this.Application.Storage.UpdateData(dragBefore.DataKey, sector, dragBefore.Item.Data);
            if (dragAfter.DataKey !== null)
                yield this.Application.Storage.UpdateData(dragAfter.DataKey, sector, dragAfter.Item.Data);
            yield this.ResolveBehaviorDragStartOnBefore(dragBefore, dragAfter);
            if (this.IsMoveDrag(dragBefore, dragAfter)) {
                yield this.MoveDrag(dragBefore, dragAfter);
            }
            else if (this.IsSwapDrag(dragBefore, dragAfter)) {
                this.SwapDrag(dragBefore, dragAfter);
            }
            else if (this.IsCustomDrag(dragBefore, dragAfter)) {
                yield this.CustomDrag(dragBefore, dragAfter);
            }
            yield this.ResolveBehaviorDragEndOnAfter(dragBefore, dragAfter);
        });
    }
    ResolveBehaviorDragStartOnBefore(dragBefore, dragAfter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dragBefore.OnBefore != null)
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragBefore.Sector, dragBefore.Item != null ? dragBefore.Item.Element : null, dragBefore.OnBefore);
            if ((dragAfter.OnBefore != null) && (dragAfter.OnBefore != dragBefore.OnBefore))
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragAfter.Sector, dragAfter.Item != null ? dragAfter.Item.Element : null, dragAfter.OnBefore);
        });
    }
    ResolveBehaviorDragEndOnAfter(dragBefore, dragAfter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dragBefore.OnAfter != null)
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragBefore.Sector, dragBefore.Item != null ? dragBefore.Item.Element : null, dragBefore.OnAfter);
            if ((dragAfter.OnAfter != null) && (dragAfter.OnAfter != dragBefore.OnAfter))
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragAfter.Sector, dragAfter.Item != null ? dragAfter.Item.Element : null, dragAfter.OnAfter);
        });
    }
    GetDrag() {
        return (this._drag);
    }
    SetDrag(drag) {
        this._drag = drag;
    }
    IsDragMatch(drag, code, tags) {
        if (drag === null)
            return (false);
        if (drag.Code !== code)
            return (false);
        if (!drag.IsMatch(tags))
            return (false);
        return (true);
    }
    CreateDrag(action, custom, item, tags, notify, dataKey, sector, onBefore, onAfter) {
        const drag = new DrapoDrag();
        drag.Code = this.Application.Document.CreateGuid();
        drag.Action = action;
        drag.Custom = custom;
        drag.Item = item;
        drag.Tags = tags;
        drag.Notify = notify;
        drag.DataKey = dataKey;
        drag.Sector = sector;
        drag.OnBefore = onBefore;
        drag.OnAfter = onAfter;
        return (drag);
    }
    IsMoveDrag(dragBefore, dragAfter) {
        return (dragBefore.Action === 'move');
    }
    MoveDrag(dragBefore, dragAfter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.IsInternalDrag(dragBefore, dragAfter))
                return (this.Application.Storage.MoveDataItem(dragAfter.Item.DataKey, dragAfter.Sector, dragBefore.Item.Data, dragAfter.Item.Data, dragAfter.Notify));
            return (false);
        });
    }
    IsInternalDrag(dragBefore, dragAfter) {
        return (dragBefore.Item.DataKey === dragAfter.Item.DataKey);
    }
    IsSwapDrag(dragBefore, dragAfter) {
        return (dragBefore.Action === 'swap');
    }
    SwapDrag(dragBefore, dragAfter) {
        return (false);
    }
    IsCustomDrag(dragBefore, dragAfter) {
        return (dragBefore.Action === 'custom');
    }
    CustomDrag(dragBefore, dragAfter) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(dragBefore.Sector, dragBefore.Item != null ? dragBefore.Item.Element : null, dragBefore.Custom);
            return (true);
        });
    }
    ResolveBehaviorResizeContext(context, el, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            const resizeLocation = el.getAttribute('d-resize-location');
            if (resizeLocation == null)
                return;
            return (this.ResolveBehaviorResizeInternal(context, el, canBind, resizeLocation));
        });
    }
    ResolveBehaviorResize(el, canBind = true, canSubscribeDelay = true, dataKeyFilter = null, dataFieldFilter = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const resizeLocation = el.getAttribute('d-resize-location');
            if (resizeLocation == null)
                return;
            const context = new DrapoContext();
            return (yield this.ResolveBehaviorResizeInternal(context, el, canBind, resizeLocation));
        });
    }
    ResolveBehaviorResizeInternal(context, el, canBind, resizeLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            const resizeModel = el.getAttribute('d-resize-model');
            const resizeClass = el.getAttribute('d-resize-class');
            let resizeType = el.getAttribute('d-resize-type');
            if (resizeType == null)
                resizeType = 'normal';
            const resizeContainer = this.Application.Parser.ParseNumber(el.getAttribute('d-resize-container'), 2);
            const resizePreview = this.Application.Parser.ParseBoolean(el.getAttribute('d-resize-preview'), false);
            const resizer = this.CreateResize(context.Item, el, resizeModel, resizeLocation, resizeType, resizeClass, resizePreview, resizeContainer);
            const application = this.Application;
            const eventTypeMousedown = 'mousedown';
            const eventTypeMousemove = 'mousemove';
            const eventTypeMouseup = 'mouseup';
            const eventNamespaceMousedown = this.Application.EventHandler.CreateEventNamespace(el, null, eventTypeMousedown, resizer.Code);
            const eventNamespaceMouseMove = this.Application.EventHandler.CreateEventNamespace(el, null, eventTypeMousemove, resizer.Code);
            const eventNamespaceMouseUp = this.Application.EventHandler.CreateEventNamespace(el, null, eventTypeMouseup, resizer.Code);
            this.Application.EventHandler.DetachEventListener(el, eventNamespaceMousedown);
            this.Application.EventHandler.AttachEventListener(el, eventTypeMousedown, eventNamespaceMousedown, (e) => {
                const container = resizer.Container;
                if (resizer.Preview) {
                    application.EventHandler.AttachEventListener(container, eventTypeMousemove, eventNamespaceMouseMove, (ev) => {
                        application.BehaviorHandler.ResolveBehaviorResizeContinue(resizer, ev);
                    });
                }
                application.EventHandler.AttachEventListener(container, eventTypeMouseup, eventNamespaceMouseUp, (ev) => {
                    application.BehaviorHandler.ResolveBehaviorResizeFinish(resizer, ev);
                    if (resizer.Preview)
                        application.EventHandler.DetachEventListener(container, eventNamespaceMouseMove);
                    application.EventHandler.DetachEventListener(container, eventNamespaceMouseUp);
                });
                application.BehaviorHandler.ResolveBehaviorResizeStart(resizer, e);
            });
        });
    }
    CreateResize(item, element, model, location, type, resizeClass, preview, container) {
        const resizer = new DrapoResize();
        resizer.Code = this.Application.Document.CreateGuid();
        resizer.Item = item;
        resizer.Element = element;
        resizer.Model = model;
        resizer.Location = location;
        resizer.Type = type;
        resizer.Class = resizeClass;
        resizer.Preview = preview;
        resizer.Parent = resizer.Element.parentElement;
        resizer.Container = this.Application.EventHandler.GetElementParent(resizer.Element, container);
        return (resizer);
    }
    ResolveBehaviorResizeStart(resizer, e) {
        return __awaiter(this, void 0, void 0, function* () {
            const sizeUnit = this.GetSize(resizer);
            resizer.UnitStart = this.GetSizeUnit(sizeUnit);
            resizer.SizeStart = this.GetSizeValue(resizer.UnitStart, sizeUnit);
            resizer.EventStartValue = this.GetResizerEventValue(resizer, e);
            resizer.EventCurrentValue = null;
            if (resizer.Class !== null)
                resizer.Container.classList.add(resizer.Class);
        });
    }
    ResolveBehaviorResizeContinue(resizer, e) {
        return __awaiter(this, void 0, void 0, function* () {
            if (resizer.EventStartValue == null)
                return;
            resizer.EventCurrentValue = this.GetResizerEventValue(resizer, e);
            this.ApplySizeNew(resizer);
        });
    }
    ResolveBehaviorResizeFinish(resizer, e) {
        return __awaiter(this, void 0, void 0, function* () {
            if (resizer.EventStartValue == null)
                return;
            resizer.EventCurrentValue = this.GetResizerEventValue(resizer, e);
            const sizeNew = this.ApplySizeNew(resizer);
            resizer.EventStartValue = null;
            if (resizer.Class !== null)
                resizer.Container.classList.remove(resizer.Class);
            if (resizer.Model === null)
                return;
            const dataPath = this.Application.Parser.ParseMustache(resizer.Model);
            yield this.Application.Solver.UpdateItemDataPathObject(this.Application.Document.GetSector(resizer.Element), resizer.Item, null, dataPath, sizeNew, true);
        });
    }
    GetSize(resizer) {
        if (resizer.Location == 'bootstrap') {
            const classAttribute = resizer.Parent.getAttribute('class');
            const classesAttribute = this.Application.Parser.Tokenize(classAttribute);
            for (let i = 0; i < classesAttribute.length; i++) {
                const classCurrent = classesAttribute[i];
                if (this.IsClassBootstrap(classCurrent))
                    return (classCurrent);
            }
            return (null);
        }
        else {
            return (this.Application.Stylist.GetElementStyleProperty(resizer.Parent, 'width'));
        }
    }
    GetSizeUnit(size) {
        if (this.EndsWith(size, '%'))
            return ('%');
        if (this.EndsWith(size, 'px'))
            return ('px');
        if (this.IsClassBootstrap(size)) {
            const parts = this.Application.Parser.Tokenize(size, '-');
            if (parts.length < 3)
                return ('');
            return (parts[parts.length - 2]);
        }
        throw new Error('Size unit not supported: ' + size);
    }
    IsClassBootstrap(data) {
        return (data.indexOf('col-') === 0);
    }
    CreateClassBootstrap(type, size) {
        let className = 'col-';
        if (type != '')
            className = className + type + '-';
        className = className + size;
        return (className);
    }
    EndsWith(data, endsWith) {
        const size = endsWith.length;
        const diff = data.length - size;
        for (let i = 0; i < size; i++)
            if (endsWith[i] !== data[i + diff])
                return (false);
        return (true);
    }
    GetSizeValue(unit, sizeUnit) {
        if (this.IsClassBootstrap(sizeUnit)) {
            const parts = this.Application.Parser.Tokenize(sizeUnit, '-');
            return (Number(parts[parts.length - 1]));
        }
        const valueString = sizeUnit.substr(0, sizeUnit.length - (unit.length));
        return (Number(valueString));
    }
    GetSizeStartWithOffset(resizer) {
        const offset = this.GetResizerOffset(resizer);
        return (resizer.SizeStart + offset);
    }
    GetResizerOffset(resizer) {
        const start = resizer.EventStartValue;
        const end = resizer.EventCurrentValue;
        if (resizer.Type === 'reverse')
            return (start - end);
        return (end - start);
    }
    GetResizerEventValue(resizer, event) {
        if (resizer.Location === 'height')
            return (event.pageY);
        return (event.pageX);
    }
    ApplySizeNew(resizer) {
        if (resizer.Location === 'bootstrap') {
            const sizeBase = this.Application.Stylist.GetElementStyleProperty(resizer.Parent, 'width');
            const sizeBaseUnit = this.GetSizeUnit(sizeBase);
            const sizeBaseValue = this.GetSizeValue(sizeBaseUnit, sizeBase);
            const sizeBaseValueOne = sizeBaseValue / resizer.SizeStart;
            const sizeOffset = this.GetResizerOffset(resizer);
            const valueOffset = Math.round(sizeOffset / sizeBaseValueOne);
            if (valueOffset === 0)
                return (0);
            const valueNew = resizer.SizeStart + valueOffset;
            const classRemove = this.CreateClassBootstrap(resizer.UnitStart, resizer.SizeStart);
            const classInsert = this.CreateClassBootstrap(resizer.UnitStart, valueNew);
            resizer.Parent.classList.remove(classRemove);
            resizer.Parent.classList.add(classInsert);
            return (valueNew);
        }
        else {
            const sizeNew = this.GetSizeStartWithOffset(resizer);
            if (sizeNew === null)
                return (null);
            this.Application.Stylist.SetElementStyleProperty(resizer.Parent, resizer.Location, sizeNew + resizer.Unit);
            return (sizeNew);
        }
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoBinder {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    BindReaderWriter(contextItem, el, dataFields, eventTypes, eventTypesCancel = null, canNotify) {
        if (contextItem === null)
            return;
        if (el === null)
            return;
        this.BindReader(contextItem, el, dataFields);
        this.BindWriter(contextItem, el, dataFields, eventTypes, eventTypesCancel, canNotify);
    }
    BindReader(contextItem, el, dataFields) {
        if ((contextItem === null) || (contextItem.ElementForTemplate !== null))
            return;
        if (el === null)
            return;
        this.Application.Observer.SubscribeBarber(el, contextItem.DataKey, dataFields);
    }
    BindWriter(contextItem, el, dataFields, eventTypes, eventTypesCancel, canNotify) {
        const application = this.Application;
        const contextItemLocal = contextItem;
        const data = contextItem.Data;
        const dataKey = contextItem.DataKey;
        const index = contextItem.Index;
        for (let i = 0; i < eventTypes.length; i++) {
            const event = application.Parser.ParseEvent(eventTypes[i]);
            const eventType = event[0];
            const eventFilter = event[1];
            const eventNamespace = this.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'model');
            const debounceTimeout = this.Application.EventHandler.GetEventDebounce(el, eventType);
            let delayTimeout = null;
            const canNotifyLocal = canNotify;
            this.Application.EventHandler.DetachEventListener(el, eventNamespace);
            this.Application.EventHandler.AttachEventListener(el, eventType, eventNamespace, (e) => {
                if (debounceTimeout == null) {
                    application.Binder.BindWriterEvent(e, eventType, eventFilter, contextItem, el, dataFields, data, dataKey, index, canNotify);
                }
                else {
                    if (delayTimeout != null)
                        clearTimeout(delayTimeout);
                    delayTimeout = setTimeout(() => {
                        clearTimeout(delayTimeout);
                        delayTimeout = null;
                        application.Binder.BindWriterEvent(e, eventType, eventFilter, contextItem, el, dataFields, data, dataKey, index, canNotify);
                    }, debounceTimeout);
                }
            });
        }
        if ((eventTypesCancel) != null) {
            for (let i = 0; i < eventTypesCancel.length; i++) {
                const event = application.Parser.ParseEvent(eventTypesCancel[i]);
                const eventType = event[0];
                const eventFilter = event[1];
                const eventNamespace = this.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'modelCancel');
                this.Application.EventHandler.DetachEventListener(el, eventNamespace);
                this.Application.EventHandler.AttachEventListener(el, eventType, eventNamespace, (e) => {
                    if (!this.Application.EventHandler.IsValidEventFilter(e, eventFilter))
                        return (true);
                    const dataPath = this.Application.Solver.CreateDataPath(dataKey, dataFields);
                    const valueCurrent = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
                    const valueBefore = this.Application.Document.GetValue(el);
                    if (valueCurrent == valueBefore)
                        return (true);
                    this.Application.Document.SetValue(el, valueCurrent);
                    return (false);
                });
            }
        }
    }
    BindWriterEvent(e, eventType, eventFilter, contextItem, el, dataFields, data, dataKey, index, canNotify) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Application.EventHandler.IsValidEventFilter(e, eventFilter))
                return (true);
            const value = this.Application.Binder.GetEventValue(eventType, e);
            const dataPath = this.Application.Solver.CreateDataPath(dataKey, dataFields);
            const valueCurrent = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
            if (valueCurrent != value) {
                const sector = this.Application.Document.GetSector(el);
                if ((dataPath.length === 1) && (contextItem !== null) && (dataPath[0] === dataKey))
                    yield this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, false);
                else
                    this.Application.Solver.UpdateDataPathObject(data, dataPath, value);
                yield this.Application.Storage.FlagDataItemAsUpdated(dataKey, sector, index, false);
                yield this.Application.ModelHandler.ResolveOnModelChange(contextItem, el);
                if (canNotify)
                    yield this.Application.Observer.Notify(dataKey, index, dataFields);
            }
            yield this.Application.ModelHandler.ResolveOnModelComplete(contextItem, el);
            return (true);
        });
    }
    BindIncremental(el, dataKey, sector, isIncremental) {
        return __awaiter(this, void 0, void 0, function* () {
            if (el == null)
                return (null);
            const application = this.Application;
            if (!isIncremental)
                application.Observer.SubscribeIncremental(el, dataKey);
            const elParent = this.GetParentElementWithScrollVertical(el);
            if ((elParent === null) || (!this.IsElementScrollVisible(elParent))) {
                if (!(yield this.Application.Storage.CanGrowData(dataKey, sector)))
                    return;
                if (!(yield this.Application.Storage.GrowData(dataKey, sector)))
                    return;
                yield this.Application.Observer.NotifyIncremental(dataKey);
                return;
            }
            const isRoot = (elParent.tagName === 'HTML') || (elParent.tagName === 'BODY');
            const binder = isRoot ? window : elParent;
            const dataKeyLocal = dataKey;
            const sectorLocal = sector;
            const eventType = 'scroll';
            const eventNamespace = this.Application.EventHandler.CreateEventNamespace(el, null, eventType, 'incremental');
            this.Application.EventHandler.DetachEventListener(el, eventNamespace);
            this.Application.EventHandler.AttachEventListener(binder, eventType, eventNamespace, (e) => {
                application.Binder.BindIncrementalScroll(binder, eventNamespace, elParent, dataKeyLocal, sector);
            });
        });
    }
    BindIncrementalScroll(binder, eventNamespace, elParent, dataKey, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((!this.Application.Observer.IsEnabledNotifyIncremental) || (!this.IsElementScrollVerticalAlmostEnd(elParent)))
                return (true);
            if (!(yield this.Application.Storage.CanGrowData(dataKey, sector))) {
                this.Application.EventHandler.DetachEventListener(binder, eventNamespace);
                return (false);
            }
            if (!(yield this.Application.Storage.GrowData(dataKey, sector)))
                return (true);
            yield this.Application.Observer.NotifyIncremental(dataKey);
            return (true);
        });
    }
    GetEventValue(eventType, e) {
        const target = e.target;
        const tag = target.tagName.toLowerCase();
        if (tag == 'input')
            return (this.GetEventValueInput(eventType, e));
        if (tag == 'select')
            return (e.target.value);
        if (tag == 'textarea')
            return (this.Application.Document.GetValue(e.target));
        return (null);
    }
    GetEventValueInput(eventType, e) {
        const el = e.target;
        const type = el.getAttribute('type');
        if (type == 'checkbox')
            return (this.Application.Document.GetProperty(el, 'checked'));
        return (this.Application.Document.GetValue(el));
    }
    GetParentElementWithScrollVertical(el) {
        let elParent = null;
        while ((elParent = el.parentElement) != null) {
            if (this.HasElementVerticalScroll(elParent))
                return (elParent);
            el = elParent;
        }
        return (null);
    }
    IsElementScrollVisible(el) {
        return (el.scrollHeight !== el.clientHeight);
    }
    HasElementVerticalScroll(el) {
        const style = window.getComputedStyle(el);
        const overflow = style.getPropertyValue('overflow');
        if (overflow === 'auto')
            return (true);
        if (el.scrollTop)
            return (true);
        el.scrollTop = 1;
        if (!el.scrollTop)
            return (false);
        el.scrollTop = 0;
        return (true);
    }
    IsElementScrollVerticalAlmostEnd(el) {
        const scrollTop = el.scrollTop;
        if (scrollTop == null)
            return (false);
        const clientHeight = el.clientHeight;
        const scrollHeight = el.scrollHeight;
        const remaining = scrollHeight - (scrollTop + clientHeight);
        return (remaining < 50);
    }
    UnbindControlFlowViewport(viewport) {
        const binder = viewport.ElementScroll;
        const eventNamespace = this.Application.EventHandler.CreateEventNamespace(null, null, 'scroll', 'viewport');
        this.Application.EventHandler.DetachEventListener(binder, eventNamespace);
    }
    BindControlFlowViewport(viewport) {
        const application = this.Application;
        const viewportCurrent = viewport;
        const binder = viewport.ElementScroll;
        const eventType = 'scroll';
        const eventNamespace = this.Application.EventHandler.CreateEventNamespace(null, null, eventType, 'viewport');
        this.Application.EventHandler.DetachEventListener(binder, eventNamespace);
        this.Application.EventHandler.AttachEventListener(binder, eventType, eventNamespace, (e) => {
            application.Binder.BindControlFlowViewportScroll(viewportCurrent);
        });
    }
    BindControlFlowViewportScroll(viewport) {
        return __awaiter(this, void 0, void 0, function* () {
            clearTimeout(viewport.EventScrollTimeout);
            viewport.EventScrollTimeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                clearTimeout(viewport.EventScrollTimeout);
                try {
                    while (viewport.Busy) {
                        yield this.Application.Document.Sleep(50);
                    }
                    viewport.Busy = true;
                    yield this.Application.ControlFlow.ResolveControlFlowForViewportScroll(viewport);
                    viewport.Busy = false;
                }
                catch (e) {
                    yield this.Application.ExceptionHandler.Handle(e, 'DrapoBinder - BindControlFlowViewportScroll');
                }
            }), 50);
        });
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoCacheHandler {
    get Application() {
        return (this._application);
    }
    get CanUseLocalStorage() {
        return ((this._hasLocalStorage) && (this._useLocalStorage));
    }
    constructor(application) {
        this._hasLocalStorage = null;
        this._useLocalStorage = false;
        this._applicationBuild = null;
        this._cacheKeysView = null;
        this._cacheKeysComponentView = null;
        this._cacheKeysComponentStyle = null;
        this._cacheKeysComponentScript = null;
        this.TYPE_DATA = "d";
        this.TYPE_COMPONENTVIEW = "cv";
        this.TYPE_COMPONENTSTYLE = "cs";
        this.TYPE_COMPONENTSCRIPT = "cj";
        this.TYPE_VIEW = "v";
        this._application = application;
        this._hasLocalStorage = window.localStorage != null;
    }
    Initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this._useLocalStorage = yield this.Application.Config.GetUseCacheLocalStorage();
            this._applicationBuild = yield this.Application.Config.GetApplicationBuild();
            this._cacheKeysView = yield this.GetConfigurationKeys('CacheKeysView');
            this._cacheKeysComponentView = yield this.GetConfigurationKeys('CacheKeysComponentView');
            this._cacheKeysComponentStyle = yield this.GetConfigurationKeys('CacheKeysComponentStyle');
            this._cacheKeysComponentScript = yield this.GetConfigurationKeys('CacheKeysComponentScript');
            return (true);
        });
    }
    EnsureLoaded(storageItem, sector, dataKey, dataPath = null) {
        if (!this.CanUseLocalStorage)
            return (false);
        const cacheKey = this.CreateCacheKey(this.TYPE_DATA, storageItem.CacheKeys, sector, dataKey, dataPath, null);
        if (cacheKey == null)
            return (false);
        const valueCached = this.GetClientDataCache(cacheKey);
        if (valueCached == null)
            return (false);
        const appended = this.AppendStorageDataCache(storageItem, dataPath, valueCached);
        return (appended);
    }
    GetCachedData(cacheKeys, sector, dataKey) {
        if (!this.CanUseLocalStorage)
            return (null);
        const cacheKey = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, null, null);
        if (cacheKey == null)
            return (null);
        const valueCached = this.GetClientDataCache(cacheKey);
        return (valueCached);
    }
    GetCachedDataPath(cacheKeys, sector, dataKey, dataPath) {
        if (!this.CanUseLocalStorage)
            return (null);
        const cacheKey = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, dataPath, null);
        if (cacheKey == null)
            return (null);
        const valueCached = this.GetClientDataCache(cacheKey);
        return (valueCached);
    }
    AppendCacheData(cacheKeys, sector, dataKey, value, isDelay = false) {
        if (!this.CanUseLocalStorage)
            return (false);
        if ((cacheKeys == null) || (cacheKeys.length == 0))
            return (null);
        let appended = false;
        if (isDelay) {
            for (const dataField in value) {
                const dataPath = [dataKey, dataField];
                const dataPathValue = value[dataField];
                if (this.AppendCacheDataEntry(cacheKeys, sector, dataKey, dataPath, dataPathValue))
                    appended = true;
            }
        }
        else {
            appended = this.AppendCacheDataEntry(cacheKeys, sector, dataKey, null, value);
        }
        return (appended);
    }
    GetCachedView(url) {
        if (!this.CanUseLocalStorage)
            return (null);
        const cacheKey = this.CreateCacheKey(this.TYPE_VIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (null);
        const value = this.GetClientDataCache(cacheKey);
        return (value);
    }
    SetCachedView(url, value) {
        if (!this.CanUseLocalStorage)
            return (false);
        const cacheKey = this.CreateCacheKey(this.TYPE_VIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (false);
        this.SetClientDataCache(cacheKey, value);
        return (true);
    }
    GetCachedComponentView(url) {
        if (!this.CanUseLocalStorage)
            return (null);
        const cacheKey = this.CreateCacheKey(this.TYPE_COMPONENTVIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (null);
        const value = this.GetClientDataCache(cacheKey);
        return (value);
    }
    SetCachedComponentView(url, value) {
        if (!this.CanUseLocalStorage)
            return (false);
        const cacheKey = this.CreateCacheKey(this.TYPE_COMPONENTVIEW, this._cacheKeysView, null, null, null, url);
        if (cacheKey == null)
            return (false);
        this.SetClientDataCache(cacheKey, value);
        return (true);
    }
    GetConfigurationKeys(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.Application.Config.GetProperty(name);
            if ((value == null) || (value == ''))
                return (null);
            const values = this.Application.Parser.ParsePipes(value);
            if ((values == null) || (values.length == 0))
                return (null);
            return (values);
        });
    }
    AppendCacheDataEntry(cacheKeys, sector, dataKey, dataPath, value) {
        const cacheKey = this.CreateCacheKey(this.TYPE_DATA, cacheKeys, sector, dataKey, dataPath, null);
        if (cacheKey == null)
            return (false);
        this.SetClientDataCache(cacheKey, value);
        return (true);
    }
    CreateCacheKey(type, cacheKeys, sector, dataKey, dataPath, url) {
        if ((cacheKeys == null) || (cacheKeys.length == 0))
            return (null);
        let key = type;
        for (let i = 0; i < cacheKeys.length; i++) {
            const cacheKey = cacheKeys[i];
            const cacheKeyValue = this.GetKey(cacheKey, sector, dataKey, dataPath, url);
            if (cacheKeyValue == null)
                return (null);
            key = key + '_' + cacheKeyValue;
        }
        return (key);
    }
    GetKey(cacheKey, sector, dataKey, dataPath, url) {
        const key = cacheKey.toLowerCase();
        if (key == 'datakey')
            return (dataKey);
        if (key == 'url')
            return (url);
        if (key == 'datapath') {
            if ((dataPath == null) || (dataPath.length <= 1))
                return (dataKey);
            let dataPathValue = dataPath[0];
            for (let i = 1; i < dataPath.length; i++)
                dataPathValue = dataPathValue + '.' + dataPath[i];
            return (dataPathValue);
        }
        if (key == 'culture')
            return (this.Application.Globalization.GetCulture());
        if (key == 'applicationbuild')
            return (this._applicationBuild);
        if (key == 'view')
            return (this.Application.CookieHandler.GetView());
        if (key == 'theme')
            return (this.Application.CookieHandler.GetTheme());
        return (null);
    }
    AppendStorageDataCache(storageItem, dataPath, valueCached) {
        if (storageItem.IsDelay) {
            const data = storageItem.Data;
            const dataField = dataPath[1];
            data[dataField] = valueCached;
        }
        else {
            storageItem.Data = valueCached;
        }
        return (true);
    }
    GetClientDataCache(cacheKey) {
        let value = null;
        try {
            value = window.localStorage.getItem(cacheKey);
            if (value == null)
                return (null);
        }
        catch (e) {
            this._useLocalStorage = false;
            this.Application.ExceptionHandler.Handle(e, 'DrapoCacheHandler - GetClientDataCache :' + cacheKey);
        }
        try {
            return (this.Application.Serializer.Deserialize(value));
        }
        catch (_a) {
            return (null);
        }
    }
    SetClientDataCache(cacheKey, value) {
        try {
            const valueSerialized = this.Application.Serializer.SerializeObject(value);
            window.localStorage.setItem(cacheKey, valueSerialized);
        }
        catch (e) {
            this._useLocalStorage = false;
            this.Application.ExceptionHandler.Handle(e, 'DrapoCacheHandler - SetClientDataCache');
        }
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoClassHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    HasContentClassContext(content) {
        return (content.indexOf('d-class') > -1);
    }
    ResolveClass(el, sector, canBind = true, canSubscribeDelay = true, dataKeyFilter = null, dataFieldFilter = null, type = DrapoStorageLinkType.Render) {
        return __awaiter(this, void 0, void 0, function* () {
            const dClassMustache = el.getAttribute('d-class');
            if (dClassMustache == null)
                return;
            if (this.Application.Barber.HasMustacheContext(dClassMustache, sector))
                return;
            const context = new DrapoContext();
            const dClass = this.Application.Parser.IsMustacheOnly(dClassMustache) ? yield this.Application.Barber.ResolveControlFlowMustacheString(context, null, null, dClassMustache, el, sector, canBind) : dClassMustache;
            if (this.Application.Barber.HasMustacheContext(dClass, sector))
                return;
            const classesExpressions = this.ExtractClasses(dClass);
            for (let i = 0; i < classesExpressions.length; i++) {
                const classExpression = classesExpressions[i];
                const classMustachesTrue = classExpression[0];
                const classTrue = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, classMustachesTrue, el, canBind, type);
                const classFalse = classExpression[2] != null ? yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, classExpression[2], el, canBind, type) : null;
                const expressionMustaches = classExpression[1];
                const expressionCurrent = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, expressionMustaches, el, canBind, type);
                const addClass = yield this.Application.Solver.ResolveConditional(expressionCurrent);
                if (addClass) {
                    this.AddClass(el, classTrue);
                    if (classFalse != null)
                        this.RemoveClass(el, classFalse);
                }
                else {
                    this.RemoveClass(el, classTrue);
                    if (classFalse != null)
                        this.AddClass(el, classFalse);
                }
            }
        });
    }
    ResolveClassContext(context, renderContext, el, sector, canBind, type = DrapoStorageLinkType.Render) {
        return __awaiter(this, void 0, void 0, function* () {
            const dClassMustache = el.getAttribute('d-class');
            if (dClassMustache == null)
                return;
            const dClass = this.Application.Parser.IsMustacheOnly(dClassMustache) ? yield this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, null, dClassMustache, el, sector, canBind) : dClassMustache;
            const classesExpressions = this.ExtractClasses(dClass);
            for (let i = 0; i < classesExpressions.length; i++) {
                const classExpression = classesExpressions[i];
                const classMustachesTrue = classExpression[0];
                const classTrue = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, renderContext, null, classMustachesTrue, el, canBind, type);
                const classFalse = classExpression[2] != null ? yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, renderContext, null, classExpression[2], el, canBind, type) : null;
                const expressionMustaches = classExpression[1];
                const expressionCurrent = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, renderContext, null, expressionMustaches, el, canBind, type);
                const addClass = yield this.Application.Solver.ResolveConditional(expressionCurrent);
                if (addClass) {
                    this.AddClass(el, classTrue);
                    if (classFalse != null)
                        this.RemoveClass(el, classFalse);
                }
                else {
                    this.RemoveClass(el, classTrue);
                    if (classFalse != null)
                        this.AddClass(el, classFalse);
                }
            }
        });
    }
    ExtractClasses(dClass) {
        const classes = [];
        if (!this.Application.Parser.IsClassArray(dClass))
            return (classes);
        const parsedClasses = this.Application.Parser.ParseClassArray(dClass);
        for (let i = 0; i < parsedClasses.length; i++) {
            const parsedClass = parsedClasses[i];
            const parseClass = this.Application.Parser.ParseClass(parsedClass);
            if (parseClass != null)
                classes.push(parseClass);
        }
        return (classes);
    }
    AddClass(el, value) {
        const values = this.GetClassValues(value);
        for (let i = 0; i < values.length; i++)
            el.classList.add(values[i]);
    }
    RemoveClass(el, value) {
        const values = this.GetClassValues(value);
        for (let i = 0; i < values.length; i++)
            el.classList.remove(values[i]);
    }
    GetClassValues(value) {
        const valuesClass = [];
        const values = this.Application.Parser.ParseBlock(value, ' ');
        for (let i = 0; i < values.length; i++) {
            const valueCurrent = values[i];
            if (valueCurrent == null)
                continue;
            const valueTrim = valueCurrent.trim();
            if (valueTrim == '')
                continue;
            valuesClass.push(valueTrim);
        }
        return (valuesClass);
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoComponentHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._dataSectors = [];
        this._dataTags = [];
        this._dataElements = [];
        this._dataInstances = [];
        this._application = application;
    }
    ResolveComponents(el = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (el == null)
                el = document.documentElement;
            yield this.ResolveComponentsElement(el, null, true, true);
        });
    }
    ResolveComponentsElement(el, context, checkSectorReady, handleDynamicSectors) {
        return __awaiter(this, void 0, void 0, function* () {
            if (handleDynamicSectors)
                yield this.Application.Document.ResolveComponentDynamicSector(el);
            if (checkSectorReady) {
                const sector = this.Application.Document.GetSector(el);
                if (sector === '@')
                    return;
            }
            if (this.Application.ControlFlow.IsElementControlFlowTemplate(el))
                return;
            const tagName = el.tagName.toLowerCase();
            const children = [].slice.call(el.children);
            const hasChildren = children.length > 0;
            if (this.IsComponent(tagName)) {
                const isContext = context != null;
                const isInsideContext = this.Application.Document.IsElementInsideControlFlow(el);
                if (isContext !== isInsideContext)
                    return;
                yield this.ResolveComponentElement(el, tagName, context, checkSectorReady, handleDynamicSectors);
            }
            else if (hasChildren) {
                for (let i = 0; i < children.length; i++) {
                    const child = children[i];
                    yield this.ResolveComponentsElement(child, context, checkSectorReady, handleDynamicSectors);
                }
            }
            else {
                const contentUrl = el.getAttribute('d-contenturl');
                if (contentUrl != null)
                    yield this.ResolveContentElement(el, context, contentUrl, checkSectorReady, handleDynamicSectors);
            }
        });
    }
    ResolveComponentElement(el, tagName, context, checkSectorReady, handleDynamicSectors) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.Application.Register.IsRegisteredComponent(tagName))) {
                yield this.Application.ExceptionHandler.HandleError('There is no component: {0}', tagName);
                return;
            }
            if (!this.Application.Register.IsActiveComponent(tagName))
                yield this.Application.Register.ActivateComponent(tagName);
            const html = yield this.Application.Register.GetRegisteredComponentViewContent(tagName);
            if (html == null) {
                yield this.Application.ExceptionHandler.HandleError('There is no html for the component: {0}', tagName);
                return;
            }
            const eljNew = this.Application.Document.CreateHTMLElement(html);
            const attributes = this.Application.Document.GetElementAttributes(el);
            const content = this.Application.Document.GetHTML(el);
            if (context != null)
                this.Application.ControlFlow.InitializeContext(context, content);
            const sector = this.GetSectorContext(el, context);
            this.Application.Document.ReplaceElement(el, eljNew);
            this.Application.Document.SetElementAttributes(eljNew, attributes);
            const elNew = eljNew;
            const elContent = ((content != null) && (content != '')) ? this.GetElementContent(elNew) : null;
            if (elContent !== null)
                this.Application.Document.SetHTML(elContent, content);
            let isSectorContext = false;
            let elSector = elNew.getAttribute('d-sector');
            if (elSector === "@") {
                elSector = this.CreateGuidContext(elNew, context);
                elNew.setAttribute('d-sector', elSector);
                yield this.Application.Document.AddSectorHierarchy(elSector, sector);
                yield this.Application.Document.AddSectorFriends(sector, elNew.getAttribute('d-sector-friend'));
            }
            else if (elSector == null) {
                isSectorContext = ((context != null) && (context.Sector != null));
                if (isSectorContext)
                    elNew.setAttribute('d-sector', context.Sector);
            }
            try {
                const instance = yield this.Application.Register.CreateInstanceComponent(tagName, elNew);
                if (instance != null)
                    this.SubscribeComponentInstance(sector, tagName, elNew, instance);
            }
            catch (e) {
                yield this.Application.ExceptionHandler.HandleError('There is an error in component: {0} contructor. {1}', tagName, e.toString());
            }
            yield this.Application.Document.ResolveComponentUpdate(elNew, context);
            if (isSectorContext)
                elNew.removeAttribute('d-sector');
            yield this.Application.Debugger.NotifyComponents();
        });
    }
    GetSectorContext(el, context) {
        if ((context != null) && (context.Item != null) && (context.Item.ElementOld != null))
            return (this.Application.Document.GetSector(context.Item.ElementOld));
        if ((context != null) && (context.Sector != null))
            return (context.Sector);
        return (this.Application.Document.GetSector(el));
    }
    CreateGuidContext(el, context) {
        const guid = this.CreateGuidContextHierarchy(el, context);
        if (guid !== null)
            return (guid);
        return (this.Application.Document.CreateGuid());
    }
    CreateGuidContextHierarchy(el, context) {
        if ((context === null) || (context.Item === null) || (context.Item.ElementOld === null))
            return (null);
        const hierarchy = this.CreateElementHierarchy(el);
        if (hierarchy.length === 0)
            return (null);
        const elHierarchy = this.GetElementByHierarchy(context.Item.ElementOld, hierarchy);
        if (elHierarchy === null)
            return (null);
        const sector = elHierarchy.getAttribute('d-sector');
        if (sector == "@")
            return (null);
        return (sector);
    }
    CreateElementHierarchy(el) {
        const hierarchy = [];
        this.InsertElementHierarchy(hierarchy, el);
        hierarchy.reverse();
        return (hierarchy);
    }
    InsertElementHierarchy(hierarchy, el) {
        if (el == null)
            return;
        const elParent = el.parentElement;
        if (elParent == null)
            return;
        const index = this.GetElementIndex(elParent, el);
        if (index == null)
            return;
        hierarchy.push(index);
        this.InsertElementHierarchy(hierarchy, elParent);
    }
    GetElementIndex(elParent, el) {
        for (let i = 0; i < elParent.children.length; i++)
            if (elParent.children[i] === el)
                return (i);
        return (null);
    }
    GetElementByHierarchy(el, hierarchy) {
        let elCurrent = el;
        for (let i = 0; i < hierarchy.length; i++) {
            if (elCurrent == null)
                return (null);
            const index = hierarchy[i];
            if (elCurrent.children.length <= index)
                return (null);
            elCurrent = elCurrent.children[index];
        }
        return (elCurrent);
    }
    GetElementContent(el) {
        const elContent = el.getAttribute('d-content');
        if (elContent === 'internal')
            return (el);
        const children = [].slice.call(el.children);
        for (let i = 0; i < children.length; i++) {
            const elContentChild = this.GetElementContent(children[i]);
            if (elContentChild !== null)
                return (elContentChild);
        }
        return (null);
    }
    ResolveContentElement(el, context, contentUrl, checkSectorReady, handleDynamicSectors) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this.Application.Server.GetViewHTML(contentUrl);
            if (html == null) {
                yield this.Application.ExceptionHandler.HandleError('There is an error getting html for the contenturl: {0}', contentUrl);
                return;
            }
            const content = this.Application.Parser.ParseDocumentContent(html);
            const elNew = this.Application.Document.CreateHTMLElement(content);
            if (elNew == null) {
                yield this.Application.ExceptionHandler.HandleError('There is no html container for the contenturl: {0}', contentUrl);
                return;
            }
            el.innerHTML = elNew.innerHTML;
            yield this.Application.Document.ResolveComponentUpdate(el, context);
        });
    }
    IsComponent(tagName) {
        return (this.IsStartsWith(tagName, "d-"));
    }
    IsStartsWith(text, value) {
        const length = value.length;
        if (text.length < length)
            return (false);
        return (text.substr(0, length) === value);
    }
    SubscribeComponentInstance(sector, tag, el, instance) {
        let index = this.GetComponentInstanceIndex(sector);
        if (index == null)
            index = this.CreateComponentInstanceIndex(sector);
        const tags = this._dataTags[index];
        tags.push(tag);
        const elements = this._dataElements[index];
        elements.push(el);
        const instances = this._dataInstances[index];
        instances.push(instance);
        return (true);
    }
    GetComponentInstanceIndex(sector) {
        for (let i = 0; i < this._dataSectors.length; i++)
            if (this._dataSectors[i] == sector)
                return (i);
        return (null);
    }
    CreateComponentInstanceIndex(sector) {
        const index = this._dataSectors.push(sector);
        this._dataTags.push([]);
        this._dataElements.push([]);
        this._dataInstances.push([]);
        return (index - 1);
    }
    GetComponentInstance(sector, did = null) {
        if (did === null)
            return (this.GetComponentInstanceByElementSector(sector));
        const sectors = this.Application.Document.GetSectorsAllowed(sector);
        if (sectors == null)
            return (this.GetComponentInstanceInternal(sector, did));
        for (let i = 0; i < sectors.length; i++) {
            const sectorCurrent = sectors[i];
            const instance = this.GetComponentInstanceInternal(sectorCurrent, did);
            if (instance != null)
                return (instance);
        }
        return (null);
    }
    GetComponentInstanceByElementSector(sector) {
        for (let i = 0; i < this._dataElements.length; i++) {
            const dataElements = this._dataElements[i];
            for (let j = 0; j < dataElements.length; j++) {
                const el = dataElements[j];
                const elSector = el.getAttribute('d-sector');
                if (elSector === sector)
                    return (this._dataInstances[i][j]);
            }
        }
        return (null);
    }
    GetComponentInstanceInternal(sector, did) {
        const index = this.GetComponentInstanceIndex(sector);
        if (index === null)
            return (null);
        const elements = this._dataElements[index];
        const instances = this._dataInstances[index];
        for (let j = elements.length - 1; j >= 0; j--) {
            const element = elements[j];
            if (element.parentElement == null)
                continue;
            const elementDid = element.getAttribute('d-id');
            if (did !== elementDid)
                continue;
            return (instances[j]);
        }
        return (null);
    }
    UnloadComponentInstances(sector) {
        const index = this.GetComponentInstanceIndex(sector);
        if (index === null)
            return (false);
        this._dataSectors.splice(index, 1);
        this._dataTags.splice(index, 1);
        this._dataElements.splice(index, 1);
        this._dataInstances.splice(index, 1);
        return (true);
    }
    UnloadComponentInstancesDetached(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.GetComponentInstanceIndex(sector);
            if (index === null)
                return (false);
            let updated = false;
            const dataTags = this._dataTags[index];
            const dataElements = this._dataElements[index];
            const dataInstances = this._dataInstances[index];
            for (let i = dataElements.length - 1; i >= 0; i--) {
                const dataElement = dataElements[i];
                if (this.Application.Document.IsElementAlive(dataElement))
                    continue;
                dataTags.splice(i, 1);
                dataElements.splice(i, 1);
                dataInstances.splice(i, 1);
                updated = true;
            }
            if (updated)
                yield this.Application.Debugger.NotifyComponents();
            return (true);
        });
    }
    UnloadComponentInstancesDetachedFullCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            let updated = false;
            for (let index = this._dataSectors.length - 1; index >= 0; index--) {
                const dataTags = this._dataTags[index];
                const dataElements = this._dataElements[index];
                const dataInstances = this._dataInstances[index];
                for (let i = dataElements.length - 1; i >= 0; i--) {
                    const dataElement = dataElements[i];
                    if (this.Application.Document.IsElementAlive(dataElement))
                        continue;
                    dataTags.splice(i, 1);
                    dataElements.splice(i, 1);
                    dataInstances.splice(i, 1);
                    updated = true;
                }
                if (dataTags.length === 0) {
                    this._dataSectors.splice(index, 1);
                    this._dataTags.splice(index, 1);
                    this._dataElements.splice(index, 1);
                    this._dataInstances.splice(index, 1);
                    updated = true;
                }
            }
            if (updated)
                yield this.Application.Debugger.NotifyComponents();
            return (true);
        });
    }
    HasContentComponent(content) {
        return ((content.indexOf('<d-') > -1));
    }
    ResolveComponentContext(sector, context, el, renderContext, canResolveComponents) {
        return __awaiter(this, void 0, void 0, function* () {
            const tagName = el.tagName.toLowerCase();
            if (!this.IsComponent(tagName))
                return;
            const elAttributes = this.Application.Document.GetElementAttributes(el);
            for (let i = 0; i < elAttributes.length; i++) {
                const elAttribute = elAttributes[i];
                let elAttributeValue = elAttribute[1];
                let updated = false;
                const mustaches = this.Application.Parser.ParseMustaches(elAttributeValue);
                for (let j = 0; j < mustaches.length; j++) {
                    const mustache = mustaches[j];
                    const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                    const mustacheContext = this.Application.Solver.CreateMustacheContext(context, mustacheParts);
                    if ((mustacheContext === null) || (mustacheContext === mustache))
                        continue;
                    updated = true;
                    elAttributeValue = elAttributeValue.replace(mustache, mustacheContext);
                }
                if (updated)
                    el.setAttribute(elAttribute[0], elAttributeValue);
            }
            if ((canResolveComponents) && (((context != null) && (context.HasContextItemBefore)) || (this.Application.Document.IsElementAlive(el))))
                yield this.Application.Document.ResolveComponentUpdate(el, context);
        });
    }
    Retrieve() {
        const list = [];
        for (let i = 0; i < this._dataSectors.length; i++) {
            const sector = this._dataSectors[i];
            const tags = this._dataTags[i];
            const elements = this._dataElements[i];
            const instances = this._dataInstances[i];
            for (let j = 0; j < tags.length; j++)
                list.push([sector, tags[j], elements[j], instances[j]]);
        }
        return (list);
    }
    AppendInstances(sector, componentSectors, componentTags, componentElements, componentInstances) {
        const index = this.GetComponentInstanceIndex(sector);
        if (index === null)
            return;
        componentSectors.push(sector);
        componentTags.push(this.Application.Solver.CloneArrayString(this._dataTags[index]));
        componentElements.push(this.Application.Solver.CloneArrayElement(this._dataElements[index]));
        componentInstances.push(this.Application.Solver.CloneArrayAny(this._dataInstances[index]));
    }
    AddInstances(container) {
        return __awaiter(this, void 0, void 0, function* () {
            this._dataSectors.push.apply(this._dataSectors, container.ComponentSectors);
            this._dataTags.push.apply(this._dataTags, container.ComponentTags);
            this._dataElements.push.apply(this._dataElements, container.ComponentElements);
            this._dataInstances.push.apply(this._dataInstances, container.ComponentInstances);
            yield this.Application.Debugger.NotifyComponents();
        });
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoConfig {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._url = null;
        this._cacheKeys = null;
        this._cacheDatas = null;
        this._timezone = null;
        this._application = application;
    }
    GetUrl() {
        if (this._url == null)
            this._url = this.GetUrlInternal();
        return (this._url);
    }
    GetUrlInternal() {
        return ('~/drapo.json');
    }
    Load() {
        return __awaiter(this, void 0, void 0, function* () {
            this._cacheKeys = [];
            this._cacheDatas = [];
            const data = yield this.Application.Server.GetJSON(this.GetUrl());
            for (const property in data) {
                this._cacheKeys.push(property);
                this._cacheDatas.push(data[property]);
            }
        });
    }
    IsLoaded() {
        return (this._cacheKeys != null);
    }
    EnsureLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.IsLoaded())
                return;
            yield this.Load();
        });
    }
    GetSector(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.EnsureLoaded();
            const index = this.GetCacheKeyIndex(name);
            if (index == null)
                return (null);
            return (this.GetCacheData(index));
        });
    }
    GetCacheKeyIndex(dataKey) {
        for (let i = 0; i < this._cacheKeys.length; i++) {
            if (this._cacheKeys[i] == dataKey)
                return (i);
        }
        return (null);
    }
    GetCacheData(dataIndex) {
        return (this._cacheDatas[dataIndex]);
    }
    AddCacheData(dataKey, data) {
        this._cacheKeys.push(dataKey);
        this._cacheDatas.push(data);
    }
    GetProperty(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = yield this.GetSector(name);
            if ((config === undefined) || (config === null))
                return (null);
            return (config);
        });
    }
    GetPropertyBoolean(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.GetProperty(name);
            if (value == null)
                return (false);
            return (value.toString() == 'true');
        });
    }
    GetPropertyArray(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.GetSector(name);
            if ((value === undefined) || (value === null))
                return (null);
            return (value);
        });
    }
    GetUsePipes() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetPropertyBoolean('UsePipes'));
        });
    }
    GetUseRouter() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetPropertyBoolean('UseRouter'));
        });
    }
    GetUseCacheLocalStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetPropertyBoolean('UseCacheLocalStorage'));
        });
    }
    GetUseCacheStatic() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetPropertyBoolean('UseCacheStatic'));
        });
    }
    GetPipeHubName() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('PipeHubName'));
        });
    }
    GetPipeActionRegister() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('PipeActionRegister'));
        });
    }
    GetPipeActionNotify() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('PipeActionNotify'));
        });
    }
    GetPipeActionPolling() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('PipeActionPolling'));
        });
    }
    GetPipeHeaderConnectionId() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('PipeHeaderConnectionId'));
        });
    }
    GetOnAuthorizationRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('OnAuthorizationRequest'));
        });
    }
    GetOnError() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('OnError'));
        });
    }
    GetOnReconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('OnReconnect'));
        });
    }
    GetStorageErrors() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('StorageErrors'));
        });
    }
    GetOnBadRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('OnBadRequest'));
        });
    }
    GetStorageBadRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('StorageBadRequest'));
        });
    }
    GetValidatorUncheckedClass() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('ValidatorUncheckedClass'));
        });
    }
    GetValidatorValidClass() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('ValidatorValidClass'));
        });
    }
    GetValidatorInvalidClass() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('ValidatorInvalidClass'));
        });
    }
    GetApplicationBuild() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('ApplicationBuild'));
        });
    }
    GetHeaderContainerId() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('HeaderContainerId'));
        });
    }
    GetHeaderCSRF() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('HeaderCSRF'));
        });
    }
    GetTimestamp() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetProperty('Timestamp'));
        });
    }
    GetViews() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.GetPropertyArray('Views'));
        });
    }
    GetTimezone() {
        return (this._timezone);
    }
    SetTimezone(value) {
        this._timezone = value;
    }
}

"use strict";
class DrapoContext {
    set Sector(value) {
        this._sector = value;
    }
    get Sector() {
        return (this._sector);
    }
    get Item() {
        return (this._itemCurrent);
    }
    get ItemsCurrentStack() {
        return (this._itemCurrentStack);
    }
    set Index(value) {
        this._index = value;
    }
    get Index() {
        return (this._index);
    }
    get IsEmpty() {
        return (this._index === -1);
    }
    set IndexRelative(value) {
        this._indexRelative = value;
    }
    get IndexRelative() {
        return (this._indexRelative);
    }
    get IndexRelatives() {
        return (this._indexRelatives);
    }
    get Level() {
        return (this._level);
    }
    get IsInsideRecursion() {
        return (this._level > 0);
    }
    set CheckMustacheNodes(value) {
        this._checkMustacheNodes = value;
    }
    get CheckMustacheNodes() {
        return ((!this._checkpoint) || (this._checkMustacheNodes));
    }
    set CheckMustacheAttributes(value) {
        this._checkMustacheAttributes = value;
    }
    get CheckMustacheAttributes() {
        return ((!this._checkpoint) || (this._checkMustacheAttributes));
    }
    set CheckModel(value) {
        this._checkModel = value;
    }
    get CheckModel() {
        return ((!this._checkpoint) || (this._checkModel));
    }
    set CheckID(value) {
        this._checkID = value;
    }
    get CheckID() {
        return ((!this._checkpoint) || (this._checkID));
    }
    set CheckAttribute(value) {
        this._checkAttribute = value;
    }
    get CheckAttribute() {
        return ((!this._checkpoint) || (this._checkAttribute));
    }
    set CheckClass(value) {
        this._checkClass = value;
    }
    get CheckClass() {
        return ((!this._checkpoint) || (this._checkClass));
    }
    set CheckEvent(value) {
        this._checkEvent = value;
    }
    get CheckEvent() {
        return (((!this._checkpoint) || (this._checkEvent)) && (!this.CanUpdateTemplate));
    }
    set CheckBehavior(value) {
        this._checkBehavior = value;
    }
    get CheckBehavior() {
        return (((!this._checkpoint) || (this._checkBehavior)) && (!this.CanUpdateTemplate));
    }
    set CheckComponent(value) {
        this._checkComponent = value;
    }
    get CheckComponent() {
        return (((!this._checkpoint) || (this._checkComponent)) && (!this.CanUpdateTemplate));
    }
    set CheckValidation(value) {
        this._checkValidation = value;
    }
    get CheckValidation() {
        return (((!this._checkpoint) || (this._checkValidation)) && (!this.CanUpdateTemplate));
    }
    get CanUpdateTemplate() {
        return (this._canUpdateTemplate);
    }
    set CanUpdateTemplate(value) {
        this._canUpdateTemplate = value;
    }
    constructor(item = null) {
        this._sector = null;
        this._itemsRoot = [];
        this._items = this._itemsRoot;
        this._itemParent = null;
        this._itemCurrent = null;
        this._itemCurrentStack = [];
        this._index = -1;
        this._level = 0;
        this._indexRelatives = [];
        this._indexRelative = -1;
        this._checkpoint = false;
        this._checkMustacheNodes = false;
        this._checkMustacheAttributes = false;
        this._checkModel = false;
        this._checkID = false;
        this._checkAttribute = false;
        this._checkClass = false;
        this._checkEvent = false;
        this._checkBehavior = false;
        this._checkComponent = false;
        this._checkValidation = false;
        this._canUpdateTemplate = false;
        this._templateKeys = [];
        this._templateDatas = [];
        if (item != null) {
            this._items.push(item);
            this._itemCurrent = item;
        }
    }
    Create(data, element, elementForTemplate, dataKey, key, iterator, index, elementOld = null) {
        const item = new DrapoContextItem(this, this._itemParent);
        item.Data = data;
        item.Element = element;
        item.ElementForTemplate = elementForTemplate;
        item.ElementOld = elementOld;
        item.DataKey = dataKey;
        item.Key = key;
        item.Iterator = iterator;
        item.Index = index;
        this._items.push(item);
        this._itemCurrent = item;
        this._index++;
        this._indexRelative++;
        return (item);
    }
    Initialize(count) {
        if (count <= 0)
            return;
        for (let i = 0; i < count; i++)
            this._items.push(null);
        this._index = count;
        this._indexRelative = count;
    }
    Pop() {
        if (this._itemCurrent == null)
            return (null);
        this._itemCurrent = this._items.length < 2 ? null : this._items[this._items.length - 2];
        return (this._items.pop());
    }
    Down() {
        if (this._itemCurrent == null)
            return (false);
        this._items = this._itemCurrent.Children;
        this._itemParent = this._itemCurrent;
        this._itemCurrentStack.push(this._itemCurrent);
        this._level++;
        this._indexRelatives.push(this._indexRelative);
        this._indexRelative = -1;
        return (true);
    }
    Up() {
        if (this._itemParent == null)
            return (false);
        this._itemParent = this._itemParent.Parent;
        this._items = this._itemParent == null ? this._itemsRoot : this._itemParent.Children;
        this._itemCurrent = this._itemCurrentStack.pop();
        this._level--;
        this._indexRelative = this._indexRelatives.pop();
        return (true);
    }
    GetElementTemplate(key) {
        let item = this.Item;
        let template = null;
        while (item != null) {
            if (item.Key == key)
                template = item.ElementForTemplate;
            item = item.Parent;
        }
        return (template);
    }
    IsElementTemplateRoot(key) {
        let item = this.Item;
        while (item != null) {
            if ((item.Parent === null) && (item.Key === key))
                return (true);
            item = item.Parent;
        }
        return (false);
    }
    IsKey(key) {
        return this.IsKeyInternal(this.Item, key);
    }
    IsParentKey(key) {
        return this.IsKeyInternal(this.Item.Parent, key);
    }
    IsKeyInternal(item, key) {
        while (item !== null) {
            if (item.Key === key)
                return (true);
            item = item.Parent;
        }
        return (false);
    }
    GetDataKeyRoot() {
        if (this._itemsRoot.length === 0)
            return (null);
        return (this._itemsRoot[0].DataKey);
    }
    Checkpoint() {
        if (this._checkpoint)
            return;
        if (this._level !== 0)
            return;
        this._checkpoint = true;
    }
    GetTemplateIndex(templateKey) {
        for (let i = 0; i < this._templateKeys.length; i++)
            if (this._templateKeys[i] === templateKey)
                return (i);
        return (null);
    }
    GetTemplate(templateKey) {
        const index = this.GetTemplateIndex(templateKey);
        if (index === null)
            return (null);
        return (this._templateDatas[index]);
    }
    AddTemplate(templateKey, templateData) {
        const index = this.GetTemplateIndex(templateKey);
        if (index === null) {
            this._templateKeys.push(templateKey);
            this._templateDatas.push(templateData);
        }
        else {
            this._templateDatas[index] = templateData;
        }
    }
    CanResolve(key) {
        if (!this._canUpdateTemplate)
            return (true);
        return (!this.IsElementTemplateRoot(key));
    }
    HasContextItemBefore() {
        return ((this.Item != null) && (this.Item.ElementOld != null));
    }
    GetIndex(key) {
        if (this.Item.Key === key)
            return (this.Index);
        for (let i = 0; i < this._itemCurrentStack.length; i++) {
            const itemCurrent = this._itemCurrentStack[i];
            if (itemCurrent.Key === key)
                return (itemCurrent.Index);
        }
        return (null);
    }
    GetIndexRelative(key) {
        if (this.Item.Key === key)
            return (this.IndexRelative);
        for (let i = 0; i < this._itemCurrentStack.length; i++) {
            const itemCurrent = this._itemCurrentStack[i];
            if (itemCurrent.Key === key)
                return (this._indexRelatives[i]);
        }
        return (null);
    }
}

"use strict";
class DrapoContextItem {
    get Context() {
        return (this._context);
    }
    get Parent() {
        return (this._parent);
    }
    get Children() {
        return (this._children);
    }
    get Data() {
        return (this._data);
    }
    set Data(value) {
        this._data = value;
    }
    get DataKey() {
        return (this._dataKey);
    }
    set DataKey(value) {
        this._dataKey = value;
    }
    get Key() {
        return (this._key);
    }
    set Key(value) {
        this._key = value;
    }
    get Iterator() {
        return (this._iterator);
    }
    set Iterator(value) {
        this._iterator = value;
    }
    get Index() {
        return (this._index);
    }
    set Index(value) {
        this._index = value;
    }
    get Element() {
        return (this._element);
    }
    set Element(value) {
        this._element = value;
    }
    get ElementForTemplate() {
        return (this._elementForTemplate);
    }
    set ElementForTemplate(value) {
        this._elementForTemplate = value;
    }
    get ElementOld() {
        return (this._elementOld);
    }
    set ElementOld(value) {
        this._elementOld = value;
    }
    get RootItem() {
        if (this.Parent != null)
            return (this.Parent.RootItem);
        return (this);
    }
    get RootElement() {
        return (this.RootItem.Element);
    }
    constructor(context, parent = null) {
        this._context = null;
        this._parent = null;
        this._children = [];
        this._data = null;
        this._dataKey = null;
        this._key = null;
        this._iterator = null;
        this._index = null;
        this._element = null;
        this._elementForTemplate = null;
        this._elementOld = null;
        this._context = context;
        this._parent = parent;
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoControlFlow {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    ResolveControlFlowDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            const els = this.Application.Searcher.FindAllByAttribute('d-for');
            yield this.ResolveControlFlowForArray(els);
        });
    }
    ResolveControlFlowSector(el, canResolveComponents = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (el == null)
                return;
            const els = this.Application.Searcher.FindAllByAttributeFromParent('d-for', el);
            yield this.ResolveControlFlowForArray(els, false, true, DrapoStorageLinkType.Render, canResolveComponents);
        });
    }
    ResolveControlFlowForParent(forElement) {
        let forElementParent = null;
        while ((forElementParent = forElement.parentElement) != null) {
            if (forElementParent.getAttribute('d-for') != null)
                return (forElementParent);
            forElement = forElementParent;
        }
        return (null);
    }
    ResolveControlFlowForRoot(forElement) {
        let forElementParent = null;
        while ((forElementParent = this.ResolveControlFlowForParent(forElement)) != null) {
            forElement = forElementParent;
        }
        return (forElement);
    }
    ResolveControlFlowForElement(forElement, isIncremental = false, canUseDifference = true, type = DrapoStorageLinkType.Render, canResolveComponents = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const forElements = [];
            forElements.push(forElement);
            return (yield this.ResolveControlFlowForArray(forElements, isIncremental, canUseDifference, type, canResolveComponents));
        });
    }
    ResolveControlFlowForArray(forElements, isIncremental = false, canUseDifference = true, type = DrapoStorageLinkType.Render, canResolveComponents = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const forElementsInserted = [];
            for (let i = 0; i < forElements.length; i++) {
                const forElement = forElements[i];
                const forElementRoot = this.ResolveControlFlowForRoot(forElement);
                if (!this.Application.Document.IsElementInserted(forElementsInserted, forElementRoot))
                    continue;
                if (this.Application.Document.IsElementPreprocessed(forElement))
                    continue;
                if (this.Application.Document.IsElementInsideComponent(forElement))
                    continue;
                const context = new DrapoContext();
                const sector = this.Application.Document.GetSector(forElementRoot);
                context.Sector = sector;
                if (!this.Application.Document.IsSectorReady(sector))
                    continue;
                const renderContext = new DrapoRenderContext();
                yield this.ResolveControlFlowForInternal(sector, context, renderContext, forElementRoot, isIncremental, canUseDifference, type, canResolveComponents);
            }
        });
    }
    InitializeContext(context, content) {
        if (this.Application.Barber.HasContentMustacheNodesContext(content))
            context.CheckMustacheNodes = true;
        if (this.Application.ModelHandler.HasContentModelContext(content))
            context.CheckModel = true;
        if (this.Application.Barber.HasContentMustacheAttributeContext(content))
            context.CheckMustacheAttributes = true;
        if (this.Application.AttributeHandler.HasContentIDContext(content))
            context.CheckID = true;
        if (this.Application.AttributeHandler.HasContentAttributeContext(content))
            context.CheckAttribute = true;
        if (this.Application.ClassHandler.HasContentClassContext(content))
            context.CheckClass = true;
        if (this.Application.EventHandler.HasContentEventContext(content))
            context.CheckEvent = true;
        if (this.Application.BehaviorHandler.HasContentBehaviorContext(content))
            context.CheckBehavior = true;
        if (this.Application.ComponentHandler.HasContentComponent(content))
            context.CheckComponent = true;
        if (this.Application.Validator.HasContentValidation(content))
            context.CheckValidation = true;
        context.Checkpoint();
    }
    IsElementControlFlowTemplate(el) {
        const forText = el.getAttribute('d-for');
        if (forText === null)
            return (false);
        return (el.style.display === 'none');
    }
    ResolveControlFlowForInternal(sector, context, renderContext, elFor, isIncremental, canUseDifference = true, type = DrapoStorageLinkType.Render, canResolveComponents = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let forText = elFor.getAttribute('d-for');
            let ifText = null;
            let forIfText = null;
            let wasWrapped = false;
            let viewportBeforeScrollPosition = 0;
            if (forText == null) {
                const wrapper = this.Application.Document.GetWrapper(elFor);
                forText = wrapper != null ? wrapper.getAttribute('d-for') : null;
                if (forText == null)
                    return (false);
                wasWrapped = true;
                ifText = wrapper.getAttribute('d-if');
                forIfText = wrapper.getAttribute('d-for-if');
            }
            const parsedFor = this.Application.Parser.ParseFor(forText);
            if (parsedFor == null)
                return (false);
            const key = parsedFor[0];
            const dataKeyIteratorRange = parsedFor[2];
            const forElementRecursive = isIncremental ? null : context.GetElementTemplate(key);
            const elementForTemplate = forElementRecursive != null ? forElementRecursive : elFor;
            if (ifText == null)
                ifText = elementForTemplate.getAttribute('d-if');
            const hasIfText = (ifText != null);
            if (forIfText == null)
                forIfText = elementForTemplate.getAttribute('d-for-if');
            const hasForIfText = (forIfText != null);
            let conditionalForIfResult = true;
            const isContextRoot = context.IsEmpty;
            const elAnchor = (isContextRoot) ? this.Application.Document.Hide(elFor) : elFor;
            const content = isContextRoot ? elFor.outerHTML : null;
            if (isContextRoot)
                this.InitializeContext(context, content);
            const dForRender = elementForTemplate.getAttribute('d-for-render');
            const dForRenders = ((dForRender == null) || (dForRender == '')) ? [] : this.Application.Parser.ParseBlock(dForRender, ',');
            const isHTML = this.Application.Solver.Contains(dForRenders, 'html');
            const isViewport = this.Application.Solver.Contains(dForRenders, 'viewport');
            let hasViewPortBefore = (isViewport) && (this.Application.ViewportHandler.HasElementViewport(elementForTemplate));
            const hasViewPortbeforeRecycle = ((hasViewPortBefore) && ((!canUseDifference) || (isViewport)));
            if (hasViewPortbeforeRecycle) {
                hasViewPortBefore = false;
                const viewportBefore = this.Application.ViewportHandler.GetElementViewport(elementForTemplate);
                viewportBeforeScrollPosition = viewportBefore.ElementScroll.scrollTop;
                this.Application.ViewportHandler.DestroyViewportControlFlow(viewportBefore);
                const itemsViewport = this.Application.Document.GetNextAll(elAnchor);
                this.RemoveList(itemsViewport);
            }
            let isDifference = ((canUseDifference) && ((!isViewport) || (hasViewPortBefore)) && (!isIncremental) && (!hasIfText));
            const isLastChild = this.Application.Document.IsLastChild(elAnchor);
            if ((isDifference) && (isContextRoot) && (isLastChild))
                isDifference = false;
            const isContextRootFull = ((isContextRoot) && (!isDifference));
            const isFirstChild = this.Application.Document.IsFirstChild(elAnchor);
            const isContextRootFullExclusive = ((isContextRootFull) && (isFirstChild) && (!wasWrapped));
            const elForParent = elAnchor.parentElement;
            if (hasForIfText)
                conditionalForIfResult = yield this.Application.Solver.ResolveConditional(forIfText, null, sector, context, renderContext);
            const items = isContextRootFullExclusive ? null : this.Application.Document.GetNextAll(elAnchor);
            let dataItem = null;
            let datas = null;
            const range = this.GetIteratorRange(dataKeyIteratorRange);
            const dataKeyIterator = range == null ? dataKeyIteratorRange : this.CleanIteratorRange(dataKeyIteratorRange);
            let dataKey = dataKeyIterator;
            if (this.IsControlFlowDataKeyIterator(dataKeyIterator)) {
                datas = yield this.GetControlFlowDataKeyIterators(context, renderContext, elementForTemplate, dataKeyIterator);
            }
            else {
                const dataKeyIteratorParts = this.Application.Parser.ParseForIterable(dataKeyIterator);
                dataKey = dataKeyIteratorParts[0];
                const isDataKey = this.Application.Storage.IsDataKey(dataKey, sector);
                if (isDataKey) {
                    const dataKeyRoot = context.GetDataKeyRoot();
                    if (dataKeyRoot === null) {
                        this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
                        this.Application.Observer.SubscribeFor(elementForTemplate, dataKey);
                    }
                    else if (dataKeyRoot !== dataKey) {
                        this.Application.Observer.SubscribeLink(dataKey, dataKeyRoot);
                    }
                    if (hasForIfText)
                        this.Application.Observer.SubscribeLinkMustache(forIfText, dataKey);
                }
                if (conditionalForIfResult) {
                    if (this.HasContextIterators(context, dataKeyIteratorParts)) {
                        datas = this.GetContextIteratorsData(context, dataKeyIteratorParts);
                    }
                    else {
                        dataItem = yield this.Application.Storage.Retrieve(dataKey, sector, context, dataKeyIteratorParts);
                        if (dataItem == null)
                            return (false);
                        if ((isDataKey) && (dataKeyIteratorParts.length > 1)) {
                            datas = this.Application.Solver.ResolveDataObjectPathObject(dataItem.Data, dataKeyIteratorParts);
                        }
                        else {
                            datas = dataItem.Data;
                        }
                    }
                }
                else {
                    datas = [];
                }
            }
            if (datas == null)
                return (false);
            if (!datas.length)
                datas = this.Application.Solver.TransformObjectIntoArray(datas);
            if (range !== null)
                datas = this.ApplyRange(datas, range);
            let lastInserted = elAnchor;
            let start = 0;
            if (isIncremental) {
                const nextElements = this.Application.Document.GetNextAll(elAnchor);
                start = this.Application.Document.GetIndex(elAnchor) + nextElements.length;
                if (nextElements.length > 0)
                    lastInserted = nextElements[nextElements.length - 1];
            }
            if ((!isDifference) && (type == DrapoStorageLinkType.RenderClass))
                type = DrapoStorageLinkType.Render;
            if ((!isIncremental) && (!isDifference) && (!isContextRootFullExclusive) && (!isViewport))
                this.RemoveList(items);
            if (isDifference) {
                const dataLength = datas.length;
                for (let i = items.length - 1; i >= dataLength; i--) {
                    this.RemoveListIndex(items, i);
                }
            }
            if ((datas.length !== null) && (datas.length === 0)) {
                if (isIncremental)
                    return (false);
                if (isContextRootFullExclusive) {
                    this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
                    if (!isLastChild)
                        this.Application.Document.SetHTML(elForParent, content);
                    const template = elForParent.children[0];
                    this.Application.Observer.SubscribeFor(template, dataKey);
                }
                return (false);
            }
            this.Application.Observer.IsEnabledNotifyIncremental = false;
            let forReferenceTemplate = this.Application.Document.Clone(elementForTemplate);
            if ((isContextRoot) || (context.IsInsideRecursion))
                forReferenceTemplate = this.Application.Document.Show(forReferenceTemplate);
            forReferenceTemplate.removeAttribute('d-for');
            if (ifText != null)
                forReferenceTemplate.removeAttribute('d-if');
            const isHash = this.Application.Solver.Contains(dForRenders, 'hash');
            const hashTemplate = isHash ? this.GetElementHashTemplate(elementForTemplate) : null;
            const useHash = hashTemplate !== null;
            const length = datas.length;
            const canCreateViewport = ((isContextRoot) && (isFirstChild) && (!wasWrapped) && (!hasIfText) && (range === null));
            const viewport = (canCreateViewport && isViewport) ? this.Application.ViewportHandler.CreateViewportControlFlow(sector, elementForTemplate, forReferenceTemplate, dataKey, key, dataKeyIteratorRange, datas) : null;
            const isViewportActive = ((viewport != null) && (viewport.IsActive));
            if (dForRender != null)
                forReferenceTemplate.removeAttribute('d-for-render');
            lastInserted = this.Application.ViewportHandler.CreateViewportControlFlowBallonBefore(viewport, lastInserted);
            let canFragmentElements = viewport == null;
            const fragment = document.createDocumentFragment();
            const canUseTemplate = isContextRootFullExclusive && (type == DrapoStorageLinkType.Render) && (datas.length > 3);
            const templateVariables = canUseTemplate ? (yield this.GetTemplateVariables(sector, context, dataKey, key, forReferenceTemplate)) : null;
            let nodesRemovedCount = 0;
            const startViewport = this.Application.ViewportHandler.GetViewportControlFlowStart(viewport, start);
            let endViewport = this.Application.ViewportHandler.GetViewportControlFlowEnd(viewport, length);
            if (isViewportActive)
                context.Initialize(startViewport - 1);
            for (let j = startViewport; j < endViewport; j++) {
                const data = datas[j];
                const templateKey = templateVariables !== null ? yield this.CreateTemplateKey(sector, context, dataKey, templateVariables, data, key, j) : null;
                let templateData = templateKey !== null ? yield this.GetTemplateFromTemplateKey(context, templateKey) : null;
                if ((templateKey !== null) && (templateData === null)) {
                    templateData = yield this.CreateTemplate(sector, context, renderContext, this.Application.Document.Clone(forReferenceTemplate), dataKey, key, j, data);
                    this.AddTemplate(context, templateKey, templateData);
                }
                const template = templateData !== null ? this.Application.Document.Clone(templateData) : this.Application.Document.Clone(forReferenceTemplate);
                const viewportIndexDifference = (isViewportActive ? (1 - startViewport) : 0);
                const nodeIndex = j - nodesRemovedCount + viewportIndexDifference;
                const oldNode = ((items !== null) && (nodeIndex < items.length)) ? items[nodeIndex] : null;
                const item = context.Create(data, template, elementForTemplate, dataKey, key, dataKeyIterator, j, oldNode);
                if ((hasIfText) && (!(yield this.Application.Solver.ResolveConditional(ifText, template, sector, context, renderContext, elementForTemplate)))) {
                    if ((isDifference) && (oldNode !== null))
                        this.RemoveListIndex(items, nodeIndex);
                    nodesRemovedCount++;
                    context.Pop();
                    continue;
                }
                if (type == DrapoStorageLinkType.Render) {
                    const hashValueBefore = ((useHash) && (oldNode != null)) ? oldNode.getAttribute('d-hash') : null;
                    const hashValueCurrent = hashTemplate === null ? null : yield this.GetElementHashValue(sector, context, template, hashTemplate);
                    const applyHash = ((!useHash) || (hashValueCurrent !== hashValueBefore));
                    if (applyHash)
                        yield this.ResolveControlFlowForIterationRender(sector, context, template, renderContext, true, canResolveComponents);
                    if (((isDifference) || (isViewportActive)) && (oldNode != null)) {
                        if (applyHash)
                            this.Application.Document.ApplyNodeDifferences(oldNode.parentElement, oldNode, template, isHTML);
                        if (hashValueCurrent !== null)
                            oldNode.setAttribute('d-hash', hashValueCurrent);
                        lastInserted = oldNode;
                    }
                    else if (canFragmentElements) {
                        if (hashValueCurrent !== null)
                            template.setAttribute('d-hash', hashValueCurrent);
                        fragment.appendChild(template);
                    }
                    else {
                        lastInserted.after(template);
                        lastInserted = template;
                        if (hashValueCurrent !== null)
                            template.setAttribute('d-hash', hashValueCurrent);
                        if (!this.Application.ViewportHandler.HasHeightChanged(viewport)) {
                            this.Application.ViewportHandler.UpdateHeightItem(viewport, template);
                            endViewport = this.Application.ViewportHandler.GetViewportControlFlowEnd(viewport, length);
                            canFragmentElements = true;
                        }
                    }
                }
                else if (type == DrapoStorageLinkType.RenderClass) {
                    yield this.ResolveControlFlowForIterationRenderClass(context, renderContext, template, sector);
                    if (oldNode != null)
                        this.Application.Document.ApplyNodeDifferencesRenderClass(oldNode, template);
                }
            }
            this.Application.ViewportHandler.AppendViewportControlFlowBallonAfter(viewport, fragment);
            if ((viewport == null) && (isContextRootFullExclusive) && (!isIncremental)) {
                this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
                if (elForParent.children.length !== 1)
                    this.Application.Document.SetHTML(elForParent, content);
                const template = elForParent.children[0];
                this.Application.Observer.SubscribeFor(template, dataKey);
                elForParent.append(fragment);
                elFor = template;
            }
            else {
                if (fragment.childNodes.length > 0)
                    lastInserted.after(fragment);
            }
            this.Application.ViewportHandler.ActivateViewportControlFlow(viewport, lastInserted);
            this.Application.Observer.IsEnabledNotifyIncremental = true;
            if ((context.IsInsideRecursion) && (!context.IsElementTemplateRoot(key)))
                yield this.Application.Document.RemoveElement(elementForTemplate, false);
            if ((dataItem != null) && (dataItem.IsIncremental))
                yield this.Application.Binder.BindIncremental(elFor, dataKeyIterator, sector, isIncremental);
            if (isContextRoot) {
                yield this.Application.ComponentHandler.UnloadComponentInstancesDetached(sector);
                yield this.Application.Document.CollectSector(sector);
            }
            if (hasViewPortbeforeRecycle) {
                viewport.ElementScroll.scrollTop = viewportBeforeScrollPosition;
                yield this.ResolveControlFlowForViewportScroll(viewport);
            }
        });
    }
    ResolveControlFlowForIterationRender(sector, context, element, renderContext, isStart, canResolveComponents) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.CheckMustacheNodes)
                yield this.Application.Barber.ResolveControlFlowMustacheNodes(context, element, sector);
            const children = [].slice.call(element.children);
            const hasChildren = children.length > 0;
            if (hasChildren) {
                for (let i = 0; i < children.length; i++) {
                    const child = children[i];
                    const forText = child.getAttribute('d-for');
                    if (forText != null) {
                        const ifText = child.getAttribute('d-if');
                        const hasIfText = (ifText != null);
                        const applyConditional = ((hasIfText) && (this.CanApplyConditional(context, forText, ifText)));
                        if ((!applyConditional) || (yield this.Application.Solver.ResolveConditional(ifText, null, sector, context, renderContext))) {
                            context.Down();
                            yield this.ResolveControlFlowForInternal(sector, context, renderContext, child, false, true, DrapoStorageLinkType.Render);
                            context.Up();
                        }
                        yield this.Application.Document.RemoveElement(child);
                        children.splice(i, 1);
                        i--;
                    }
                    else {
                        if (!(yield this.IsControlFlowForIterationVisible(sector, context, child, renderContext))) {
                            yield this.Application.Document.RemoveElement(child);
                            children.splice(i, 1);
                            i--;
                            continue;
                        }
                        if (context.CheckMustacheAttributes)
                            yield this.Application.Barber.ResolveControlFlowMustacheAttributes(context, child, sector);
                        yield this.ResolveControlFlowForIterationRender(sector, context, child, renderContext, false, canResolveComponents);
                        if (context.CheckID)
                            yield this.Application.AttributeHandler.ResolveIDContext(context, child, sector, true);
                        if (context.CheckAttribute)
                            yield this.Application.AttributeHandler.ResolveAttrContext(context, child, true);
                        if (context.CheckModel)
                            yield this.Application.ModelHandler.ResolveModel(context, renderContext, child, sector, true, true);
                        if (context.CheckClass)
                            yield this.Application.ClassHandler.ResolveClassContext(context, renderContext, child, sector, true, DrapoStorageLinkType.Render);
                        if (context.CheckEvent)
                            yield this.Application.EventHandler.AttachContext(context, child, sector, renderContext);
                        if (context.CheckBehavior)
                            yield this.Application.BehaviorHandler.ResolveBehaviorContext(context, child, true);
                        if (context.CheckComponent)
                            yield this.Application.ComponentHandler.ResolveComponentContext(sector, context, child, renderContext, canResolveComponents);
                        if (context.CheckValidation)
                            yield this.Application.Validator.RegisterValidation(child, sector, context);
                    }
                }
            }
            if ((isStart) || (!hasChildren)) {
                if (context.CheckID)
                    yield this.Application.AttributeHandler.ResolveIDContext(context, element, sector, true);
                if (context.CheckAttribute)
                    yield this.Application.AttributeHandler.ResolveAttrContext(context, element, true);
                if (context.CheckModel)
                    yield this.Application.ModelHandler.ResolveModel(context, renderContext, element, sector, true, true);
                if (context.CheckClass)
                    yield this.Application.ClassHandler.ResolveClassContext(context, renderContext, element, sector, true, DrapoStorageLinkType.RenderClass);
                if (context.CheckEvent)
                    yield this.Application.EventHandler.AttachContext(context, element, sector, renderContext);
                if (context.CheckBehavior)
                    yield this.Application.BehaviorHandler.ResolveBehaviorContext(context, element, true);
                if (context.CheckComponent)
                    yield this.Application.ComponentHandler.ResolveComponentContext(sector, context, element, renderContext, canResolveComponents);
                if (context.CheckValidation)
                    yield this.Application.Validator.RegisterValidation(element, sector, context);
                if ((!hasChildren) && (context.CheckMustacheAttributes))
                    yield this.Application.Barber.ResolveControlFlowMustacheAttributes(context, element, sector);
            }
        });
    }
    CanApplyConditional(context, forText, ifText) {
        const parsedFor = this.Application.Parser.ParseFor(forText);
        if (parsedFor == null)
            return (true);
        const key = parsedFor[0];
        if (context.IsKey(key))
            return (true);
        const index = ifText.indexOf('{{' + key);
        return (index < 0);
    }
    ResolveControlFlowForIterationRenderClass(context, renderContext, element, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Application.ClassHandler.ResolveClassContext(context, renderContext, element, sector, true, DrapoStorageLinkType.RenderClass);
        });
    }
    IsControlFlowForIterationVisible(sector, context, el, renderContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifText = el.getAttribute('d-if');
            if (ifText == null)
                return (true);
            if (!(yield this.Application.FunctionHandler.HasFunctionMustacheContext(ifText, sector, renderContext)))
                return (true);
            const value = yield this.Application.Solver.ResolveConditional(ifText, null, sector, context, renderContext);
            if (value)
                el.removeAttribute('d-if');
            return (value);
        });
    }
    RemoveList(els) {
        if (els === null)
            return;
        for (let i = els.length - 1; i >= 0; i--)
            this.RemoveListIndex(els, i);
    }
    RemoveListIndex(els, index) {
        const node = els[index];
        if (node.parentElement != null)
            node.parentElement.removeChild(node);
        els.splice(index, 1);
    }
    IsControlFlowDataKeyIterator(dataKey) {
        return (this.Application.Parser.IsIterator(dataKey));
    }
    GetControlFlowDataKeyIterators(context, renderContext, elementForTemplate, expression) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = this.Application.Document.GetSector(elementForTemplate);
            const mustaches = this.Application.Parser.ParseMustaches(expression);
            for (let i = 0; i < mustaches.length; i++) {
                const mustache = mustaches[i];
                const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                const dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                if (!this.Application.Storage.IsDataKey(dataKey, sector, renderContext))
                    continue;
                this.Application.Observer.UnsubscribeFor(dataKey, elementForTemplate);
                this.Application.Observer.SubscribeFor(elementForTemplate, dataKey);
            }
            const data = yield this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, null, expression, elementForTemplate, sector, true, null, true, elementForTemplate);
            return (this.Application.Parser.ParseIterator(data));
        });
    }
    GetElementHashTemplate(el) {
        const content = el.outerHTML;
        const mustaches = this.Application.Parser.ParseMustaches(content);
        let template = '';
        for (let i = 0; i < mustaches.length; i++) {
            if (i > 0)
                template = template + '_';
            template = template + mustaches[i];
        }
        return (template);
    }
    GetElementHashValue(sector, context, el, hashTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashValue = yield this.Application.ModelHandler.ResolveValueExpression(context, el, sector, hashTemplate, false);
            return (hashValue);
        });
    }
    GetTemplateVariables(sector, context, dataKey, key, template) {
        return __awaiter(this, void 0, void 0, function* () {
            const elsFor = this.Application.Searcher.FindAllByAttributeFromParent('d-for', template);
            if (elsFor.length < 1)
                return (null);
            const dataKeys = yield this.GetControlFlowExpressionsDataKey(sector, elsFor);
            if ((dataKeys == null) || (dataKeys.length < 1))
                return (null);
            const elIfs = this.Application.Searcher.FindAllByAttributeFromParent('d-if', template);
            if (elIfs.length < 1)
                return ([]);
            return (this.GetControlFlowConditionsDataKey(sector, dataKey, key, elIfs));
        });
    }
    GetControlFlowExpressionsDataKey(sector, elsFor) {
        const dataKeys = [];
        for (let i = 0; i < elsFor.length; i++) {
            const elForCurrent = elsFor[i];
            const forText = elForCurrent.getAttribute('d-for');
            const parsedFor = this.Application.Parser.ParseFor(forText);
            if (parsedFor == null)
                continue;
            const dataKey = parsedFor[2];
            const dataKeyIteratorParts = this.Application.Parser.ParseForIterable(dataKey);
            if (dataKeyIteratorParts.length !== 1)
                return (null);
            const isDataKey = this.Application.Storage.IsDataKey(dataKey, sector);
            if (!isDataKey)
                return (null);
            dataKeys.push(dataKey);
        }
        return (dataKeys);
    }
    GetControlFlowConditionsDataKey(sector, dataKey, key, elIfs) {
        const dataPaths = [];
        for (let i = 0; i < elIfs.length; i++) {
            const elIfCurrent = elIfs[i];
            const ifText = elIfCurrent.getAttribute('d-if');
            const mustaches = this.Application.Parser.ParseMustaches(ifText);
            for (let j = 0; j < mustaches.length; j++) {
                const mustache = mustaches[j];
                const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                if (mustacheParts[0] !== key)
                    continue;
                dataPaths.push(mustacheParts);
            }
        }
        return (dataPaths);
    }
    CreateTemplateKey(sector, context, dataKey, templateVariables, data, key, index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (templateVariables.length === 0)
                return ('_');
            let templateKey = '';
            context.Create(data, null, null, dataKey, key, null, index);
            for (let i = 0; i < templateVariables.length; i++) {
                const mustacheParts = templateVariables[i];
                const mustacheResolved = yield this.Application.Solver.ResolveDataPath(context, null, null, sector, mustacheParts);
                templateKey = templateKey + '_' + mustacheResolved;
            }
            context.Pop();
            return (templateKey);
        });
    }
    CreateTemplate(sector, context, renderContext, el, dataKey, key, index, data) {
        return __awaiter(this, void 0, void 0, function* () {
            context.CanUpdateTemplate = true;
            context.Create(data, el, null, dataKey, key, null, index);
            yield this.ResolveControlFlowForIterationRender(sector, context, el, renderContext, true, false);
            context.Pop();
            context.CanUpdateTemplate = false;
            return (el);
        });
    }
    GetTemplateFromTemplateKey(context, templateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return (context.GetTemplate(templateKey));
        });
    }
    AddTemplate(context, templateKey, template) {
        context.AddTemplate(templateKey, template);
    }
    GetIteratorRange(iterator) {
        const rangeString = this.GetIteratorRangeString(iterator);
        if (rangeString === null)
            return (null);
        const range = this.GetIteratorRangeInternal(rangeString);
        if (!this.IsValidRange(range)) {
            this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - GetIteratorRange - Invalid Iterator Range - {0}', iterator);
        }
        return (range);
    }
    GetIteratorRangeInternal(rangeString) {
        const index = rangeString.indexOf('..');
        if (index === -1)
            return (new DrapoRange(rangeString, rangeString));
        if (index === 0)
            return (new DrapoRange(null, rangeString.substr(2)));
        if (index === rangeString.length - 2)
            return (new DrapoRange(rangeString.substr(0, rangeString.length - 2)));
        return (new DrapoRange(rangeString.substr(0, index), rangeString.substr(index + 2)));
    }
    GetIteratorRangeString(iterator) {
        if (iterator[iterator.length - 1] !== ']')
            return (null);
        const index = iterator.lastIndexOf('[');
        if (index < 1)
            return (null);
        if (iterator[0] === '{')
            return (null);
        return (iterator.substring(index + 1, iterator.length - 1));
    }
    CleanIteratorRange(iterator) {
        const index = iterator.lastIndexOf('[');
        if (index === -1)
            return (iterator);
        return (iterator.substring(0, index));
    }
    IsValidRange(range) {
        if (!this.IsValidRangeIndex(range.Start))
            return (false);
        if (!this.IsValidRangeIndex(range.End))
            return (false);
        return (true);
    }
    IsValidRangeIndex(rangeIndex) {
        if (rangeIndex === null)
            return (true);
        const isHat = rangeIndex[0] === '^';
        if (isHat)
            return (this.Application.Parser.IsNumber(rangeIndex.substr(1)));
        return (this.Application.Parser.IsNumber(rangeIndex));
    }
    ApplyRange(data, range) {
        const start = range.Start == null ? 0 : this.GetRangeIndex(data, range.Start);
        const end = range.End === null ? data.length : this.GetRangeIndex(data, range.End);
        const isCrescent = end > start;
        const dataRange = [];
        for (let i = start; ((isCrescent) && (i < end)) || ((!isCrescent) && (i >= end)); isCrescent ? i++ : i--) {
            if (i < 0)
                continue;
            if (i >= data.length)
                continue;
            dataRange.push(data[i]);
        }
        return (dataRange);
    }
    GetRangeIndex(data, rangeIndex) {
        const isHat = rangeIndex[0] === '^';
        const number = this.Application.Parser.ParseNumber(isHat ? rangeIndex.substr(1) : rangeIndex);
        const numberHat = isHat ? data.length - number : number;
        if (numberHat < 0)
            return (0);
        if (numberHat > data.length)
            return (data.length);
        return (numberHat);
    }
    HasContextIterators(context, dataKeyIteratorParts) {
        if (dataKeyIteratorParts.length != 1)
            return (false);
        const key = dataKeyIteratorParts[0];
        const item = this.GetContextItemByKey(context, key);
        return (item != null);
    }
    GetContextIteratorsData(context, dataKeyIteratorParts) {
        if (dataKeyIteratorParts.length < 1)
            return ([]);
        const key = dataKeyIteratorParts[0];
        const item = this.GetContextItemByKey(context, key);
        const datas = this.Application.Solver.ResolveDataObjectPathObject(item.Data, dataKeyIteratorParts);
        return (datas);
    }
    GetContextItemByKey(context, key) {
        for (let i = 0; i < context.ItemsCurrentStack.length; i++) {
            const item = context.ItemsCurrentStack[i];
            if (item.Key == key)
                return (item);
        }
        return (null);
    }
    ExecuteDataItem(sector, context, expression, iterator, forText, ifText, all, datas, dataKey, key, executionContext = null) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let j = 0; j < datas.length; j++) {
                const data = datas[j];
                const item = context.Create(data, null, null, dataKey, key, iterator, j);
                let execute = true;
                if (ifText != null) {
                    const conditionalText = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, executionContext, ifText, null);
                    const conditional = yield this.Application.Solver.ResolveConditional(conditionalText);
                    if (!conditional) {
                        context.Pop();
                        execute = false;
                    }
                }
                if (execute) {
                    yield this.Application.FunctionHandler.ResolveFunction(sector, context.Item, null, null, expression, executionContext);
                    if (!all)
                        return (true);
                }
                if (forText == null)
                    continue;
                const parsedFor = this.Application.Parser.ParseFor(forText);
                if (parsedFor == null)
                    continue;
                const keyChildren = parsedFor[0];
                const dataKeyIteratorRange = parsedFor[2];
                const range = this.GetIteratorRange(dataKeyIteratorRange);
                const dataKeyIterator = range == null ? dataKeyIteratorRange : this.CleanIteratorRange(dataKeyIteratorRange);
                const dataKeyChildren = dataKeyIterator;
                const dataKeyIteratorParts = this.Application.Parser.ParseForIterable(dataKeyIterator);
                let datasChildren = this.Application.Solver.ResolveDataObjectPathObject(data, dataKeyIteratorParts);
                if (range !== null)
                    datasChildren = this.Application.ControlFlow.ApplyRange(datasChildren, range);
                if (datasChildren.length === 0)
                    continue;
                const childExecuted = yield this.ExecuteDataItem(sector, context, expression, dataKeyIterator, forText, ifText, all, datasChildren, dataKeyChildren, keyChildren, executionContext);
                if ((childExecuted) && (!all))
                    return (true);
            }
            return (false);
        });
    }
    ResolveControlFlowForViewportScroll(viewport) {
        return __awaiter(this, void 0, void 0, function* () {
            const view = this.Application.ViewportHandler.GetView(viewport);
            if (view === null)
                return;
            const dForRender = viewport.Element.getAttribute('d-for-render');
            const dForRenders = (dForRender == null) || (dForRender == '') ? [] : this.Application.Parser.ParseBlock(dForRender, ',');
            const isHash = this.Application.Solver.Contains(dForRenders, 'hash');
            const hashTemplate = isHash ? this.GetElementHashTemplate(viewport.Element) : null;
            const rowsBeforeRemove = view[0];
            const rowsBeforeInsertStart = view[1];
            const rowsBeforeInsertEnd = view[2];
            const rowsAfterRemove = view[3];
            const rowsAfterInsertStart = view[4];
            const rowsAfterInsertEnd = view[5];
            if (rowsBeforeRemove !== null) {
                if (rowsBeforeRemove === -1) {
                    let rowRemove = viewport.ElementBallonBefore.nextElementSibling;
                    const elBallonAfter = viewport.ElementBallonAfter;
                    while ((rowRemove != null) && (rowRemove !== elBallonAfter)) {
                        const rowNext = rowRemove.nextElementSibling;
                        rowRemove.remove();
                        rowRemove = rowNext;
                    }
                }
                else {
                    let rowRemove = viewport.ElementBallonBefore.nextElementSibling;
                    if (rowRemove != null) {
                        for (let i = 0; i < rowsBeforeRemove; i++) {
                            const rowNext = rowRemove.nextElementSibling;
                            rowRemove.remove();
                            rowRemove = rowNext;
                        }
                    }
                }
            }
            const fragmentBefore = yield this.CreateControlFlowForViewportFragment(viewport, rowsBeforeInsertStart, rowsBeforeInsertEnd, hashTemplate);
            if (fragmentBefore !== null) {
                viewport.ElementBallonBefore.after(fragmentBefore);
            }
            if (rowsAfterRemove !== null) {
                let rowRemove = viewport.ElementBallonAfter.previousElementSibling;
                for (let i = 0; i < rowsAfterRemove; i++) {
                    const rowPrevious = rowRemove.previousElementSibling;
                    rowRemove.remove();
                    rowRemove = rowPrevious;
                }
            }
            const fragmentAfter = yield this.CreateControlFlowForViewportFragment(viewport, rowsAfterInsertStart, rowsAfterInsertEnd, hashTemplate);
            if (fragmentAfter !== null) {
                const elementAfterPrevious = viewport.ElementBallonAfter.previousElementSibling;
                elementAfterPrevious.after(fragmentAfter);
            }
            this.Application.ViewportHandler.UpdateElementsBallon(viewport);
            yield this.Application.ComponentHandler.UnloadComponentInstancesDetached(viewport.Sector);
            yield this.Application.Document.CollectSector(viewport.Sector);
        });
    }
    CreateControlFlowForViewportFragment(viewport, start, end, hashTemplate) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((start === null) || (end == start))
                return (null);
            const fragment = document.createDocumentFragment();
            const context = new DrapoContext();
            context.Sector = viewport.Sector;
            context.Index = start - 1;
            context.IndexRelative = context.Index;
            const content = viewport.ElementTemplate.outerHTML;
            this.InitializeContext(context, content);
            const renderContext = new DrapoRenderContext();
            for (let i = start; i < end; i++) {
                const data = viewport.Data[i];
                const template = this.Application.Document.Clone(viewport.ElementTemplate);
                const item = context.Create(data, template, template, viewport.DataKey, viewport.Key, viewport.DataKeyIteratorRange, i, null);
                yield this.ResolveControlFlowForIterationRender(viewport.Sector, context, template, renderContext, true, true);
                const hashValueCurrent = hashTemplate === null ? null : yield this.GetElementHashValue(viewport.Sector, context, template, hashTemplate);
                if (hashValueCurrent !== null)
                    template.setAttribute('d-hash', hashValueCurrent);
                fragment.appendChild(template);
            }
            return (fragment);
        });
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoCookieHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    RetrieveData(name = 'drapo') {
        const data = this.CreateStructure(name);
        const values = this.GetCookieValues(name);
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            data[value[0]] = value[1];
        }
        return (data);
    }
    CreateStructure(name) {
        const object = {};
        if (name.toLowerCase() == 'drapo') {
            object.theme = '';
            object.view = '';
            object.culture = '';
        }
        return (object);
    }
    GetCookieValues(name = 'drapo') {
        const values = [];
        const cookieValue = this.GetCookieValue(name);
        if (cookieValue == null)
            return (values);
        return (this.CreateCookieValues(cookieValue));
    }
    GetCookieValue(name) {
        const nameEqual = name + "=";
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(nameEqual) == 0) {
                return (cookie.substring(nameEqual.length, cookie.length));
            }
        }
        return (null);
    }
    CreateCookieValues(value) {
        const valueDecoded = this.Application.Serializer.EnsureUrlDecoded(value);
        const values = [];
        const keyValues = valueDecoded.split('&');
        for (let i = 0; i < keyValues.length; i++) {
            const keyValue = keyValues[i];
            const index = keyValue.indexOf('=');
            if (index < 0)
                continue;
            values.push([keyValue.substring(0, index), keyValue.substring(index + 1)]);
        }
        return (values);
    }
    SetCookieValue(dataItem) {
        if (dataItem.Data == null)
            return (false);
        const data = this.CreateCookieValue(dataItem.Data);
        return (this.SetDocumentCookie(dataItem.CookieName, data));
    }
    CreateCookieValue(object) {
        let data = '';
        for (const name in object) {
            const value = object[name];
            if (value == null)
                continue;
            if (data.length > 0)
                data = data + '&';
            data = data + name + '=' + value;
        }
        return (data);
    }
    SetDocumentCookie(name, value) {
        document.cookie = name + "=" + value + ";expires=Thu, 03 Jun 2980 00:00:00 UTC;path=/";
        return (true);
    }
    HandleCookieValuesChanges(cookieValuesBefore) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookieValues = this.GetCookieValues();
            const namesChanged = this.GetCookieValuesNamedChanged(cookieValuesBefore, cookieValues);
            for (let i = 0; i < namesChanged.length; i++)
                yield this.HandleCookieValueChange(namesChanged[i]);
            return (namesChanged.length > 0);
        });
    }
    HandleCookieValueChange(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (name === 'culture')
                yield this.Application.Globalization.ReloadCulture();
            else if (name === 'theme')
                yield this.Application.Stylist.ReloadStyles();
        });
    }
    GetCookieValuesNamedChanged(cookieValuesBefore, cookieValues) {
        const changesNames = [];
        for (let i = 0; i < cookieValues.length; i++) {
            const cookieValue = cookieValues[i];
            const name = cookieValue[0];
            const value = cookieValue[1];
            if (this.HasCookieValueChanged(cookieValuesBefore, name, value))
                changesNames.push(name);
        }
        return (changesNames);
    }
    HasCookieValueChanged(cookieValues, name, value) {
        for (let i = 0; i < cookieValues.length; i++) {
            const cookieValue = cookieValues[i];
            const nameCurrent = cookieValue[0];
            if (name !== nameCurrent)
                continue;
            const valueCurrent = cookieValue[1];
            return (value !== valueCurrent);
        }
        return (true);
    }
    GetTheme() {
        const cookieData = this.Application.CookieHandler.RetrieveData();
        if (cookieData == null)
            return ('');
        return (cookieData.theme);
    }
    GetView() {
        const cookieData = this.Application.CookieHandler.RetrieveData();
        if (cookieData == null)
            return ('');
        return (cookieData.view);
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoDebugger {
    get Application() {
        return (this._application);
    }
    get Visible() {
        return (this._visible);
    }
    get Active() {
        return (this._active);
    }
    constructor(application) {
        this._visible = false;
        this._active = false;
        this._sector = '__debugger';
        this.SESSION_STORAGE_KEY = 'drapoDebugger';
        this._application = application;
    }
    ConnectDebugger() {
        return __awaiter(this, void 0, void 0, function* () {
            const application = this.Application;
            const elDocument = document.documentElement;
            this.Application.EventHandler.AttachEventListener(elDocument, 'keyup', 'keyup.debugger', (e) => {
                if (!e.ctrlKey)
                    return;
                if (e.key !== 'F2')
                    return;
                application.Debugger.ToogleDebugger();
            });
        });
    }
    Initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const debuggerPropertiesText = window.sessionStorage.getItem(this.SESSION_STORAGE_KEY);
            if (debuggerPropertiesText == null)
                return;
            const debuggerProperties = this.Application.Serializer.Deserialize(debuggerPropertiesText);
            yield this.Application.Storage.UpdateData('__debuggerProperties', null, debuggerProperties);
            this._active = true;
        });
    }
    ToogleDebugger() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._visible)
                return (this.CloseDebugger());
            else
                return (this.ShowDebugger());
        });
    }
    ShowDebugger() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._visible)
                return (false);
            yield this.Application.Storage.UnloadData('__objects', '');
            const elSector = this.Application.Searcher.FindByAttributeAndValue('d-sector', this._sector);
            if (elSector == null) {
                const fragment = document.createDocumentFragment();
                const elSectorNew = document.createElement('div');
                elSectorNew.setAttribute('d-sector', this._sector);
                elSectorNew.setAttribute('style', 'position:relative;z-index:99999');
                fragment.appendChild(elSectorNew);
                document.body.appendChild(fragment);
            }
            this.Application.Document.StartUpdate(this._sector);
            yield this.Application.Document.LoadChildSectorContent(this._sector, '<d-debugger></d-debugger>');
            this._visible = true;
            this._active = true;
            return (true);
        });
    }
    CloseDebugger() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._visible)
                return (false);
            this.Application.Document.StartUpdate(this._sector);
            yield this.Application.Document.LoadChildSectorContent(this._sector, '');
            const elSector = this.Application.Searcher.FindByAttributeAndValue('d-sector', this._sector);
            yield this.Application.Document.RemoveElement(elSector, false);
            this._visible = false;
            this._active = false;
            return (true);
        });
    }
    HasBreakpoint(sector, dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return (false);
            const breakpoints = yield this.Application.Storage.RetrieveData('__breakpoints', '');
            for (let i = 0; i < breakpoints.length; i++) {
                const breakpoint = breakpoints[i];
                if ((this.Application.Document.IsEqualSector(breakpoint.sector, sector)) && (breakpoint.datakey === dataKey))
                    return (true);
            }
            return (false);
        });
    }
    ActivateBreakpoint(sector, dataKey, functionsValue, functionValue, label) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return;
            yield this.Application.Storage.SetDataKeyField('__runtime', '', ['sector'], sector, false);
            yield this.Application.Storage.SetDataKeyField('__runtime', '', ['datakey'], dataKey, false);
            yield this.Application.Storage.SetDataKeyField('__runtime', '', ['expression'], functionsValue, false);
            yield this.Application.Storage.SetDataKeyField('__runtime', '', ['functionValue'], functionValue, false);
            yield this.Application.Storage.SetDataKeyField('__runtime', '', ['label'], label, false);
            yield this.Application.Storage.SetDataKeyField('__runtime', '', ['running'], false, false);
            yield this.Application.Observer.Notify('__runtime', null, null);
            while (true) {
                const isRunning = yield this.Application.Storage.ResolveMustaches('', '{{__runtime.running}}');
                if (yield this.Application.Solver.ResolveConditional(isRunning))
                    break;
                yield this.Application.Document.Sleep(1000);
            }
        });
    }
    CleanRuntime() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return;
            yield this.Application.Storage.SetDataKeyField('__runtime', '', ['sector'], '', false);
            yield this.Application.Storage.SetDataKeyField('__runtime', '', ['datakey'], '', false);
            yield this.Application.Storage.SetDataKeyField('__runtime', '', ['expression'], '', false);
            yield this.Application.Storage.SetDataKeyField('__runtime', '', ['functionValue'], '', false);
            yield this.Application.Storage.SetDataKeyField('__runtime', '', ['label'], '', false);
            yield this.Application.Observer.Notify('__runtime', null, null);
        });
    }
    NotifySectors() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return;
            yield this.Application.Storage.ReloadData('__sectors', '');
            yield this.Application.Storage.ReloadData('__objects', '');
            yield this.Application.Storage.ReloadData('__objectswatchsvalues', '');
        });
    }
    NotifyStorage(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return;
            if (this.Application.Document.IsHiddenKey(dataKey))
                return;
            yield this.Application.Storage.ReloadData('__objects', '');
            yield this.Application.Storage.ReloadData('__objectswatchsvalues', '');
        });
    }
    NotifyComponents() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return;
            yield this.Application.Storage.ReloadData('__components', '');
        });
    }
    AddNotify(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return;
            if (this.Application.Document.IsHiddenKey(dataKey))
                return;
            yield this.Application.Storage.AddDataItem('__notifys', null, '', dataKey);
            yield this.Application.Storage.ReloadData('__objectswatchsvalues', '');
        });
    }
    AddPipe(pipe) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return;
            if (this.Application.Document.IsHiddenKey(pipe))
                return;
            yield this.Application.Storage.AddDataItem('__pipes', null, '', pipe);
        });
    }
    AddFunction(functionParsed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return;
            if (this.Application.Document.IsHiddenKey(functionParsed.Name))
                return;
            let functionText = functionParsed.Name + '(';
            for (let i = 0; i < functionParsed.Parameters.length; i++) {
                if (i != 0)
                    functionText += ',';
                functionText += functionParsed.Parameters[i];
            }
            functionText += ')';
            yield this.Application.Storage.AddDataItem('__functions', null, '', functionText);
        });
    }
    AddError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return;
            const lastError = yield this.Application.Storage.GetDataItemLast('__errors', '');
            if (lastError == error)
                return;
            yield this.Application.Storage.AddDataItem('__errors', null, '', error);
        });
    }
    GetObjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const objectsExpanded = yield this.Application.Storage.RetrieveData('__objectsexpanded', null);
            const objects = [];
            yield this.CreateObjectSector(objectsExpanded, objects, null, 'root');
            return (objects);
        });
    }
    CreateObject(type, key, name, sector, objectsExpanded) {
        return __awaiter(this, void 0, void 0, function* () {
            const object = {};
            object.Type = type;
            object.Key = key;
            object.Code = type + '_' + key;
            object.Name = name != null ? name : key;
            object.Children = [];
            object.Sector = sector;
            object.Action = this.CreateObjectAction(type, key, name, sector);
            object.IsExpanded = false;
            if (objectsExpanded != null) {
                for (let i = 0; i < objectsExpanded.length; i++) {
                    if (objectsExpanded[i] != object.Code)
                        continue;
                    object.IsExpanded = true;
                    break;
                }
            }
            return (object);
        });
    }
    CreateObjectAction(type, key, name, sector) {
        if (type === 'sector')
            return ('UpdateDataField(__objectproperties,datakey,);UpdateDataField(__objectproperties,sector,' + sector + ');Debugger(highlight,sector,dbgDebuggerHighlight,' + sector + ')');
        if (type === 'data')
            return ('UpdateDataField(__objectproperties,sector,' + sector + ',false);UpdateDataField(__objectproperties,datakey,' + key + ');Debugger(highlight,sector,dbgDebuggerHighlight,);ReloadData(__objectdata)');
        return ('');
    }
    CreateObjectSector(objectsExpanded, objects, sector, name = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((sector != null) && (sector[0] == '_'))
                return;
            const object = yield this.CreateObject('sector', sector, name != null ? name : sector, sector, objectsExpanded);
            objects.push(object);
            yield this.InsertObjectSectorChildrenSectors(objectsExpanded, object.Children, sector);
            yield this.InsertObjectSectorChildrenData(object.Children, sector);
        });
    }
    InsertObjectSectorChildrenSectors(objectsExpanded, objects, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = this.Application.Document.GetSectorChildren(sector);
            for (let i = 0; i < sectors.length; i++) {
                yield this.CreateObjectSector(objectsExpanded, objects, sectors[i]);
            }
        });
    }
    InsertObjectSectorChildrenData(objects, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKeys = this.Application.Storage.GetSectorDataKeys(sector);
            for (let i = 0; i < dataKeys.length; i++) {
                const dataKey = dataKeys[i];
                if (dataKey[0] == '_')
                    return;
                const object = yield this.CreateObject('data', dataKey, dataKey, sector, null);
                objects.push(object);
            }
        });
    }
    CreateObjectData(sector, name, value, mustache) {
        const object = {};
        object.Name = name != null ? name : 'data';
        object.Value = value;
        object.Mustache = mustache;
        object.__objectdata = [];
        object.Action = 'UpdateDataField(__objectwatch,Sector,' + sector + ');UpdateDataField(__objectwatch,Mustache,' + object.Mustache + ');AddDataItem(__objectswatchs,__objectwatch);ReloadData(__objectswatchsvalues)';
        object.IsExpanded = name == null;
        return (object);
    }
    GetObjectData() {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = yield this.Application.Storage.RetrieveDataValue(null, '{{__objectproperties.sector}}');
            const dataKey = yield this.Application.Storage.RetrieveDataValue(null, '{{__objectproperties.datakey}}');
            const objects = [];
            if (dataKey == '')
                return (objects);
            const data = yield this.GetObjectDataItem(dataKey, sector);
            yield this.InsertObjectData(sector, objects, dataKey, null, data);
            return (objects);
        });
    }
    GetObjectDataItem(dataKey, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const storageItem = yield this.Application.Storage.RetrieveDataItem(dataKey, sector);
            if (storageItem == null)
                return (null);
            if ((storageItem.Type == 'function') && (storageItem.OnLoad != null))
                return (storageItem.OnLoad);
            return (storageItem.Data);
        });
    }
    InsertObjectData(sector, objects, mustachePrefix, name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data == null)
                return;
            if (name !== null)
                mustachePrefix = mustachePrefix + '.' + name;
            if (Array.isArray(data))
                yield this.InsertObjectDataArray(sector, objects, mustachePrefix, name, data);
            else if (data instanceof Object)
                yield this.InsertObjectDataObject(sector, objects, mustachePrefix, name, data);
            else if ((typeof data === 'string') || (data instanceof String))
                yield this.InsertObjectDataString(sector, objects, mustachePrefix, name, data);
            else
                yield this.InsertObjectDataString(sector, objects, mustachePrefix, name, data.toString());
        });
    }
    InsertObjectDataObject(sector, objects, mustache, name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const object = this.CreateObjectData(sector, name, '', mustache);
            objects.push(object);
            for (const property in data) {
                const propertyName = property;
                const propertyData = data[property];
                yield this.InsertObjectData(sector, object.__objectdata, mustache, propertyName, propertyData);
            }
        });
    }
    InsertObjectDataArray(sector, objects, mustache, name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const object = this.CreateObjectData(sector, name, '', mustache);
            objects.push(object);
            yield this.InsertObjectDataString(sector, object.__objectdata, mustache + '.length', 'length', data.length.toString());
            for (let i = 0; i < data.length; i++)
                yield this.InsertObjectData(sector, object.__objectdata, mustache, '[' + i + ']', data[i]);
        });
    }
    InsertObjectDataString(sector, objects, mustache, name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            objects.push(this.CreateObjectData(sector, name, data, mustache));
        });
    }
    CreateWatchValue(sector, mustache, value, index) {
        const object = {};
        object.Sector = sector == null ? 'root' : sector;
        object.Mustache = mustache;
        object.Value = value;
        object.ActionRemove = 'RemoveDataItemLookup(__objectswatchs,_Index,' + index + ');ReloadData(__objectswatchsvalues)';
        return (object);
    }
    GetWatchsValues() {
        return __awaiter(this, void 0, void 0, function* () {
            const objects = [];
            const watchs = yield this.Application.Storage.RetrieveData('__objectswatchs', null);
            for (let i = 0; i < watchs.length; i++) {
                const watch = watchs[i];
                const sector = watch.Sector;
                const mustache = watch.Mustache;
                const value = yield this.Application.Storage.RetrieveDataValue(sector, '{{' + mustache + '}}');
                objects.push(this.CreateWatchValue(sector, mustache, value, i));
            }
            return (objects);
        });
    }
    ExecuteFunctionDebugger(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = parameters[0].toLowerCase();
            if (command == 'highlight')
                yield this.ExecuteFunctionDebuggerHighligh(parameters);
            else if (command == 'reload')
                yield this.ExecuteFunctionDebuggerReload();
            else if (command == 'persist')
                yield this.ExecuteFunctionDebuggerPersist();
        });
    }
    ExecuteFunctionDebuggerHighligh(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = parameters[1].toLowerCase();
            if (location == 'sector')
                yield this.ExecuteFunctionDebuggerHighlighSector(parameters);
            else if (location == 'component')
                yield this.ExecuteFunctionDebuggerHighlighComponent(parameters);
        });
    }
    ExecuteFunctionDebuggerHighlighSector(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const classHighlight = parameters[2];
            const sector = parameters[3];
            const elBeforeList = document.getElementsByClassName(classHighlight);
            const elBefore = elBeforeList.length > 0 ? elBeforeList[0] : null;
            const elAfter = ((sector != '') && (sector != 'null')) ? this.Application.Searcher.FindByAttributeAndValue('d-sector', sector) : null;
            if (elBefore != null)
                elBefore.classList.remove(classHighlight);
            if (elBefore != elAfter)
                elAfter.classList.add(classHighlight);
        });
    }
    ExecuteFunctionDebuggerHighlighComponent(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const classHighlight = parameters[2];
            const index = Number(parameters[3]);
            const elBeforeList = document.getElementsByClassName(classHighlight);
            const elBefore = elBeforeList.length > 0 ? elBeforeList[0] : null;
            const components = this.Application.ComponentHandler.Retrieve();
            const elAfter = components[index][2];
            if (elBefore != null)
                elBefore.classList.remove(classHighlight);
            if (elBefore != elAfter)
                elAfter.classList.add(classHighlight);
        });
    }
    GetComponents() {
        return __awaiter(this, void 0, void 0, function* () {
            const objectsExpanded = yield this.Application.Storage.RetrieveData('__objectsexpanded', null);
            const objects = [];
            const components = this.Application.ComponentHandler.Retrieve();
            for (let i = 0; i < components.length; i++) {
                const component = components[i];
                objects.push(this.CreateComponentData(component[1], i));
            }
            return (objects);
        });
    }
    CreateRequest(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return (null);
            const request = {};
            request.Url = url;
            request.Start = new Date(Date.now()).toJSON();
            yield this.Application.Storage.AddDataItem('__requests', null, '', request, false);
            return (request);
        });
    }
    FinishRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request == null)
                return (null);
            request.End = new Date(Date.now()).toJSON();
            const lastRequest = yield this.Application.Storage.GetDataItemLast('__requests', '');
            request.Last = request === request;
            yield this.Application.Observer.Notify('__requests', null, null);
        });
    }
    CreateComponentData(tag, index) {
        const object = {};
        object.Tag = tag;
        object.Action = 'Debugger(highlight,component,dbgDebuggerHighlight, ' + index + ')';
        return (object);
    }
    AddSectorUpdate(name, parent, url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Active)
                return (null);
            const sectorUpdate = {};
            sectorUpdate.Name = name;
            sectorUpdate.Parent = parent;
            sectorUpdate.Url = url;
            yield this.Application.Storage.AddDataItem('__sectorsupdate', null, '', sectorUpdate);
        });
    }
    ExecuteFunctionDebuggerReload() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!window.sessionStorage)
                return;
            const debuggerConfiguration = yield this.Application.Storage.RetrieveData('__debuggerProperties', null);
            window.sessionStorage.setItem(this.SESSION_STORAGE_KEY, this.Application.Serializer.Serialize(debuggerConfiguration));
            window.location.reload();
        });
    }
    ExecuteFunctionDebuggerPersist() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!window.sessionStorage)
                return;
            const debuggerConfiguration = yield this.Application.Storage.RetrieveData('__debuggerProperties', null);
            if (debuggerConfiguration == null)
                return;
            const persist = this.Application.Solver.ResolveConditionalBoolean(debuggerConfiguration.persist);
            if (persist)
                window.sessionStorage.setItem(this.SESSION_STORAGE_KEY, this.Application.Serializer.Serialize(debuggerConfiguration));
            else
                window.sessionStorage.removeItem(this.SESSION_STORAGE_KEY);
        });
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoDocument {
    get Application() {
        return (this._application);
    }
    get Message() {
        return (this._message);
    }
    set Message(value) {
        this._message = value;
    }
    constructor(application) {
        this._pendingAuthorizations = 0;
        this._sectorsLoaded = [];
        this._message = null;
        this._sectorHierarchy = [];
        this._sectorFriends = [];
        this._lastGuid = null;
        this._application = application;
    }
    ResetPendingAuthorizations(count = 0) {
        this._pendingAuthorizations = count;
    }
    StartUpdate(sector) {
        if (sector == null) {
            this.InitializeSectorsLoaded();
        }
        else {
            for (let i = this._sectorsLoaded.length - 1; i >= 0; i--)
                if (this._sectorsLoaded[i] === sector)
                    this._sectorsLoaded.splice(i, 1);
        }
    }
    Resolve() {
        return __awaiter(this, void 0, void 0, function* () {
            this.StartUpdate(null);
            yield this.ResolveInternal();
        });
    }
    ResolveInternal() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Application.Log.WriteVerbose('Document - ResolveInternal - Started');
            if (!(yield this.ResolveParent()))
                yield this.ResolveChildren(null);
            this.Application.Log.WriteVerbose('Document - ResolveInternal - Finished');
            yield this.Application.Storage.ResolveData(false);
            yield this.Application.ControlFlow.ResolveControlFlowDocument();
            yield this.Application.ComponentHandler.ResolveComponents();
            yield this.Application.Storage.ResolveData(true);
            yield this.Application.Barber.ResolveMustaches();
            yield this.TryOnAuthorizationRequest();
        });
    }
    ResolveParent() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Application.Log.WriteVerbose('Document - ResolveParent - Started');
            const divElement = this.Application.Searcher.FindByTagName('div');
            if (divElement == null) {
                this.Application.Log.WriteVerbose('Document - ResolveParent - Finished - NoDiv');
                return (false);
            }
            const parent = divElement.getAttribute('d-sector-parent-url');
            if (parent == null) {
                this.Application.Log.WriteVerbose('Document - ResolveParent - Finished - NoParent');
                return (false);
            }
            const parentSector = divElement.getAttribute('d-sector-parent');
            if (parentSector == null) {
                this.Application.Log.WriteVerbose('Document - ResolveParent - Finished - NoParentSector');
                return (false);
            }
            const sectors = this.ExtractSectors(divElement);
            this.Application.Log.WriteVerbose('Document - ResolveParent - parent = {0}, parentSector = {1}', parent, parentSector);
            const html = yield this.Application.Server.GetViewHTML(parent);
            yield this.ResolveParentResponse(html, parent, parentSector, divElement.outerHTML, sectors);
            this.Application.Log.WriteVerbose('Document - ResolveParent - Finished');
            return (true);
        });
    }
    ResolveParentResponse(data, parent, parentSector, childHtml, sectors) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Application.Log.WriteVerbose('Document - ResolveParentResponse - Started');
            if (this.Application.Log.ShowHTML)
                this.Application.Log.WriteVerbose('Document - ResolveParentResponse - data - {0}', data);
            this.ReplaceDocument(data);
            this.Application.Log.WriteVerbose('Document - ResolveParentResponse - parent = {0}, parentSector = {1}', parent, parentSector);
            const elChildSector = this.Application.Searcher.FindByAttributeAndValue('d-sector', parentSector);
            if (elChildSector != null) {
                yield this.AddSectorFriends(parentSector, elChildSector.getAttribute('d-sector-friend'));
                this.SetHTML(elChildSector, childHtml);
            }
            for (let i = 0; i < sectors.length; i++) {
                const sector = sectors[i];
                const sectorName = sector[0];
                const url = sector[1];
                const container = sector[2];
                yield this.AddSectorHierarchy(sectorName, parentSector);
                this.StartUpdate(sectorName);
                yield this.LoadChildSector(sectorName, url, null, true, false, container);
            }
            this.Application.Log.WriteVerbose('Document - ResolveParentResponse - Finished');
            yield this.ResolveInternal();
        });
    }
    ExtractSectors(el) {
        const attributes = [];
        for (let i = 0; i < el.attributes.length; i++) {
            const attribute = el.attributes[i];
            const attributeSectorProperty = this.ExtractSectorProperty(attribute.nodeName);
            if (attributeSectorProperty != null)
                attributes.push([attributeSectorProperty, attribute.nodeValue, el.getAttribute('d-sector-container-' + attributeSectorProperty)]);
        }
        return (attributes);
    }
    ExtractSectorProperty(property) {
        const parse = this.Application.Parser.ParseProperty(property);
        if (parse.length != 4)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if ((parse[1].toLowerCase() != 'sector') || (parse[2] != 'default'))
            return (null);
        return (parse[3]);
    }
    ResolveChildren(elStart) {
        return __awaiter(this, void 0, void 0, function* () {
            const elsSector = elStart == null ? this.Application.Searcher.FindAllByAttribute('d-sector') : this.Application.Searcher.FindAllByAttributeFromParent('d-sector', elStart);
            if (elsSector.length === 0)
                return;
            const sector = this.GetSector(elStart);
            const sectorChildren = [];
            for (let i = 0; i < elsSector.length; i++) {
                const elSector = elsSector[i];
                const sectorChildParent = this.GetSectorParent(elSector);
                if (sector === sectorChildParent)
                    sectorChildren.push(elSector);
            }
            for (let i = 0; i < sectorChildren.length; i++) {
                const elChild = sectorChildren[i];
                let childSector = elChild.getAttribute('d-sector');
                if (childSector == "@") {
                    childSector = this.CreateGuid();
                    elChild.setAttribute('d-sector', childSector);
                }
                if (this.IsSectorAlreadyLoaded(childSector))
                    continue;
                this.MarkSectorAsLoaded(childSector);
                const url = elChild.getAttribute('d-sector-url');
                if ((url != null) && (elChild.children.length > 0))
                    continue;
                const urlSector = this.GetSectorParent(elChild);
                const urlResolved = url != null ? yield this.Application.Storage.ResolveDataUrlMustaches(null, urlSector, url, null) : null;
                let container = null;
                let childContainer = elChild.getAttribute('d-container');
                if (childContainer !== null) {
                    if (this.Application.Parser.IsMustache(childContainer)) {
                        const dataPath = this.Application.Parser.ParseMustache(childContainer);
                        const contextItem = yield this.Application.Solver.CreateContextItemFromPath(childSector, dataPath);
                        let item = yield this.Application.Solver.ResolveItemDataPathObject(childSector, contextItem, dataPath);
                        if ((item === null) || (item === '')) {
                            item = this.Application.Document.CreateGuid();
                            yield this.Application.Solver.UpdateItemDataPathObject(childSector, contextItem, null, dataPath, item);
                        }
                        container = item.toString();
                    }
                    else {
                        if (childContainer == "@") {
                            childContainer = this.CreateGuid();
                            elChild.setAttribute('d-container', childContainer);
                        }
                        container = childContainer;
                    }
                }
                const html = urlResolved != null ? yield this.Application.Server.GetViewHTML(urlResolved) : null;
                yield this.LoadChildSectorInternal(urlResolved, html, childSector, elChild, null, true, false, container);
            }
        });
    }
    LoadChildSectorInternal(url, data, sector, elSector, title = null, canRoute = true, canLoadDefaultSectors = false, container = null) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Application.Log.WriteVerbose('Document - ResolveChildResponse - Started - Sector {0}', sector);
            if (container !== null) {
                if (yield this.Application.SectorContainerHandler.Switch(sector, container))
                    return;
                const content = this.Application.Parser.ParseDocumentContent(data);
                const elContentParent = document.createElement('div');
                elContentParent.innerHTML = this.EnsureHTML(content);
                elSector.appendChild(elContentParent.children[0]);
            }
            else {
                if (data != null)
                    yield this.ReplaceSectorData(elSector, data);
            }
            const route = ((canRoute) && (url != null)) ? elSector.getAttribute('d-route') : 'false';
            if ((route == null) || (route != 'false'))
                yield this.Application.Router.Route(url, sector, title);
            const sectorParent = this.GetSectorParent(elSector);
            yield this.Application.Debugger.AddSectorUpdate(sector, sectorParent, url);
            yield this.AddSectorHierarchy(sector, sectorParent);
            yield this.AddSectorFriends(sector, elSector.getAttribute('d-sector-friend'));
            if (canLoadDefaultSectors) {
                const divChildSectorLoaded = elSector.children;
                const divElement = divChildSectorLoaded.length > 0 ? divChildSectorLoaded[0] : null;
                const sectors = divElement != null ? this.ExtractSectors(divElement) : [];
                for (let i = 0; i < sectors.length; i++) {
                    const sectorInfo = sectors[i];
                    const sectorName = sectorInfo[0];
                    const sectorUrl = sectorInfo[1];
                    const sectorContainer = sectorInfo[2];
                    yield this.AddSectorHierarchy(sectorName, sector);
                    this.StartUpdate(sectorName);
                    yield this.LoadChildSector(sectorName, sectorUrl, null, true, false, sectorContainer);
                }
            }
            if (data == '')
                return;
            const elSectorContent = container !== null ? elSector.children[elSector.children.length - 1] : elSector;
            yield this.Application.Storage.ResolveData(false, elSectorContent);
            yield this.Application.ControlFlow.ResolveControlFlowSector(elSectorContent);
            yield this.Application.ComponentHandler.ResolveComponents(elSectorContent);
            yield this.Application.Storage.ResolveData(true, elSectorContent);
            yield this.Application.Barber.ResolveMustaches(elSectorContent);
            yield this.ResolveChildren(elSectorContent);
            yield this.Application.Storage.LoadDataDelayedAndNotify();
            const onload = elSector.getAttribute("d-on-load");
            if (onload != null)
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, elSector, onload);
            yield this.TryOnAuthorizationRequest();
            if (container !== null)
                this.InitializeSectorElementDetach(elSectorContent);
            yield this.Application.ComponentHandler.UnloadComponentInstancesDetached(sector);
        });
    }
    ReplaceSectorData(elChildSector, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data === null) {
                this.SetHTML(elChildSector, '');
                return (false);
            }
            const content = this.Application.Parser.ParseDocumentContent(data);
            const attributes = this.Application.Parser.ParseElementAttributes(content);
            const templateUrl = this.Application.Solver.Get(attributes, 'd-templateurl');
            if (templateUrl === null) {
                this.SetHTML(elChildSector, content);
                return (true);
            }
            let template = this.Application.Solver.Get(attributes, 'd-template');
            if (template === null)
                template = 'template';
            const templateUrlContent = yield this.Application.Server.GetViewHTML(templateUrl);
            const templateContent = this.Application.Parser.ParseDocumentContent(templateUrlContent);
            this.SetHTML(elChildSector, templateContent);
            const elSectorTemplate = this.Application.Searcher.FindByAttributeAndValueFromParent('d-template', template, elChildSector);
            if (elSectorTemplate == null)
                this.SetHTML(elChildSector, content);
            else
                this.SetHTML(elSectorTemplate, content);
            return (true);
        });
    }
    ResolveWindow(elWindow) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = this.Application.Document.GetSector(elWindow);
            this.Application.Document.StartUpdate(sector);
            yield this.Application.Storage.ResolveData(false, elWindow);
            yield this.Application.ControlFlow.ResolveControlFlowSector(elWindow, false);
            yield this.Application.ComponentHandler.ResolveComponents(elWindow);
            yield this.Application.Storage.ResolveData(true, elWindow);
            yield this.Application.Barber.ResolveMustaches(elWindow);
        });
    }
    ResolveComponentDynamicSector(el) {
        return __awaiter(this, void 0, void 0, function* () {
            const elSector = el.getAttribute('d-sector');
            if (elSector == null)
                return;
            const isSectorGuid = elSector == '@';
            if ((!isSectorGuid) && (this.Application.Document.IsSectorReady(elSector)))
                return;
            const sectorParent = this.GetSectorParent(el);
            const sector = isSectorGuid ? this.CreateGuid() : elSector;
            if (isSectorGuid)
                el.setAttribute('d-sector', sector);
            yield this.AddSectorHierarchy(sector, sectorParent);
            yield this.AddSectorFriends(sector, el.getAttribute('d-sector-friend'));
            this.MarkSectorAsLoaded(sector);
            yield this.Application.Storage.ResolveData(true, el);
        });
    }
    ResolveComponentUpdate(el, context) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Application.Storage.ResolveData(false, el);
            yield this.Application.ControlFlow.ResolveControlFlowSector(el);
            yield this.Application.ComponentHandler.ResolveComponentsElement(el, context, true, true);
            yield this.Application.Storage.ResolveData(true, el);
            yield this.Application.Barber.ResolveMustaches(el, null, false);
        });
    }
    RemoveElement(el, checkSector = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (el.parentNode)
                el.parentNode.removeChild(el);
            if (checkSector)
                yield this.RemoveElementIteration(el);
        });
    }
    RemoveElementIteration(el) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = el.getAttribute('d-sector');
            if (sector != null) {
                yield this.RemoveSectorData(sector);
            }
            else {
                const children = [].slice.call(el.children);
                for (let i = 0; i < children.length; i++)
                    yield this.RemoveElementIteration(children[i]);
            }
        });
    }
    RemoveSectorData(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectors = this.GetSectorChildren(sector);
            for (let i = 0; i < sectors.length; i++)
                yield this.RemoveSectorData(sectors[i]);
            this.CleanSectorMetadataInternal(sector);
            yield this.Application.Storage.RemoveBySector(sector);
            this.Application.SectorContainerHandler.RemoveBySector(sector);
            this.Application.ComponentHandler.UnloadComponentInstances(sector);
        });
    }
    LoadChildSector(sectorName, url, title = null, canRoute = true, canLoadDefaultSectors = false, container = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.IsSectorAlreadyLoaded(sectorName))
                return (false);
            this.MarkSectorAsLoaded(sectorName);
            const elsSector = this.Application.Searcher.FindAllByAttributeAndValue('d-sector', sectorName);
            let elSector = null;
            for (let i = elsSector.length - 1; i >= 0; i--) {
                const el = elsSector[i];
                if (this.IsElementDetached(el))
                    continue;
                elSector = el;
                break;
            }
            if (elSector == null) {
                this.Application.Log.WriteVerbose('Document - LoadChildSector - Missing Sector - {0}', sectorName);
                return (false);
            }
            const urlResolved = ((url === null) || (url === '')) ? '' : yield this.Application.Storage.ResolveDataUrlMustaches(null, null, url, null);
            const html = ((urlResolved === null) || (urlResolved === '')) ? '' : yield this.Application.Server.GetViewHTML(urlResolved);
            yield this.LoadChildSectorInternal(url, html, sectorName, elSector, title, canRoute, canLoadDefaultSectors, container);
            return (true);
        });
    }
    LoadChildSectorContent(sectorName, content) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.IsSectorAlreadyLoaded(sectorName))
                return (false);
            this.MarkSectorAsLoaded(sectorName);
            const elSector = this.Application.Searcher.FindByAttributeAndValue('d-sector', sectorName);
            if (elSector == null) {
                this.Application.Log.WriteVerbose('Document - LoadChildSectorContent - Missing Sector - {0}', sectorName);
                return (false);
            }
            yield this.LoadChildSectorInternal(null, content, sectorName, elSector, null, false, false, null);
            return (true);
        });
    }
    LoadChildSectorDefault(sectorName) {
        return __awaiter(this, void 0, void 0, function* () {
            const elSector = this.Application.Searcher.FindByAttributeAndValue('d-sector', sectorName);
            if (elSector == null) {
                this.Application.Log.WriteVerbose('Document - LoadChildSectorDefault - Missing Sector - {0}', sectorName);
                return (false);
            }
            if (elSector.children.length == 0)
                return (false);
            let url = elSector.getAttribute('d-sector-url');
            if ((url === null))
                url = '';
            const urlSector = this.GetSectorParent(elSector);
            const urlResolved = yield this.Application.Storage.ResolveDataUrlMustaches(null, urlSector, url, null);
            return (yield this.LoadChildSector(sectorName, urlResolved, null, false, false));
        });
    }
    ReplaceDocument(data) {
        this.Application.Log.WriteVerbose('Document - ReplaceDocument - Data - {0}', data);
        const head = this.ExtractHeadInnerHtml(data);
        if (head != null)
            this.SetHTML(document.head, head);
        const body = this.ExtractBodyInnerHtml(data);
        if (body != null)
            this.SetHTML(document.body, body);
    }
    ReplaceElement(el, elNew) {
        const parent = el.parentElement;
        if (parent != null)
            parent.replaceChild(elNew, el);
    }
    Show(el) {
        let elCurrent = el;
        if ((elCurrent.tagName === 'SPAN') && (el.children.length == 1)) {
            const elChild = el.children[0];
            if ((elChild.tagName === 'OPTION') || (elChild.tagName === 'OPTGROUP'))
                elCurrent = elChild;
        }
        this.ShowInternal(elCurrent);
        return (elCurrent);
    }
    ShowInternal(el) {
        const display = el.style.display;
        if (display === 'none')
            el.style.display = '';
        const style = el.getAttribute('style');
        if (style === '')
            el.removeAttribute('style');
    }
    Hide(el) {
        const isOption = el.tagName === 'OPTION';
        const isOptGroup = ((!isOption) && (el.tagName === 'OPTGROUP'));
        const elParent = el.parentElement;
        const hasParent = elParent != null;
        const isParentOptGroup = ((isOption) && (hasParent) && (elParent.tagName === 'OPTGROUP'));
        if (((isOption) && (!isParentOptGroup)) || (isOptGroup)) {
            const elWrap = ((hasParent) && (elParent.tagName === 'SPAN')) ? elParent : this.Wrap(el, 'SPAN');
            this.HideInternal(elWrap);
            return (elWrap);
        }
        else {
            this.HideInternal(el);
            return (el);
        }
    }
    HideInternal(el) {
        el.style.display = 'none';
    }
    GetWrapper(el) {
        if (el.tagName !== 'span')
            return (null);
        if (el.children.length !== 1)
            return (null);
        return el.children[0];
    }
    Wrap(el, tagName) {
        const wrapper = document.createElement(tagName);
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        return (wrapper);
    }
    GetElementAttributes(el) {
        const attributes = [];
        for (let i = 0; i < el.attributes.length; i++) {
            const attribute = el.attributes[i];
            attributes.push([attribute.nodeName, attribute.nodeValue]);
        }
        return (attributes);
    }
    GetElementAttributesFilteredPrefix(el, prefix) {
        if ((prefix === null) || (prefix === ''))
            return (this.GetElementAttributes(el));
        const attributes = [];
        const length = prefix.length;
        for (let i = 0; i < el.attributes.length; i++) {
            const attribute = el.attributes[i];
            const name = attribute.nodeName;
            if (name.length < length)
                continue;
            if (name.substring(0, length) !== prefix)
                continue;
            attributes.push([name.substring(length), attribute.nodeValue]);
        }
        return (attributes);
    }
    SetElementAttributes(el, attributes) {
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            el.setAttribute(attribute[0], attribute[1]);
        }
    }
    ExtractHeadInnerHtml(data) {
        const index = data.indexOf('<head>');
        if (index < 0)
            return (null);
        const indexEnd = data.indexOf('</head>');
        const head = data.substr(index + 6, indexEnd - (index + 6));
        const headWithoutFramework = this.RemoveFramework(head);
        return (headWithoutFramework);
    }
    RemoveFramework(data) {
        let indexScript = 0;
        while ((indexScript = data.indexOf('<script', indexScript)) >= 0) {
            const indexScriptEnd = data.indexOf('</script>', indexScript);
            if (indexScriptEnd > indexScript) {
                const script = data.substring(indexScript, indexScriptEnd + 9);
                if (script.indexOf('drapo.js') >= 0)
                    return (data.replace(script, ''));
            }
            indexScript = indexScriptEnd;
        }
        return (data);
    }
    ExtractBodyInnerHtml(data) {
        let index = data.indexOf('<body>');
        if (index >= 0) {
            const indexEnd = data.indexOf('</body>');
            return (data.substr(index + 6, indexEnd - (index + 6)));
        }
        index = data.indexOf('<div');
        if (index >= 0) {
            return (data.substr(index));
        }
        return (null);
    }
    IsElementInserted(list, itemInsert) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] == itemInsert)
                return (false);
        }
        list.push(itemInsert);
        return (true);
    }
    IsElementAttached(el) {
        let elc = el;
        while (elc != null) {
            if (elc.tagName === 'BODY')
                return (true);
            elc = elc.parentElement;
        }
        return (false);
    }
    IsElementInsideControlFlow(el) {
        if (el.getAttribute == null)
            return (false);
        if (el.tagName === 'BODY')
            return (false);
        const dfor = el.getAttribute('d-for');
        if (dfor != null)
            return (true);
        const elParent = el.parentElement;
        if (elParent == null)
            return (true);
        return (this.IsElementInsideControlFlow(elParent));
    }
    IsElementInsideControlFlowOrContext(el) {
        if (el.getAttribute == null)
            return (false);
        if (el.tagName === 'BODY')
            return (false);
        const dfor = el.getAttribute('d-for');
        if (dfor != null)
            return (true);
        const elPrevious = el.previousElementSibling;
        if (elPrevious != null)
            return (this.IsElementInsideControlFlowOrContext(elPrevious));
        const elParent = el.parentElement;
        if (elParent == null)
            return (true);
        return (this.IsElementInsideControlFlowOrContext(elParent));
    }
    IsElementPreprocessed(el) {
        if (el.getAttribute == null)
            return (false);
        const pre = el.getAttribute('d-pre');
        if (pre === 'true')
            return (true);
        const elParent = el.parentElement;
        if (elParent == null)
            return (false);
        return (this.IsElementPreprocessed(elParent));
    }
    RequestAuthorization(dataKey, type) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Application.Observer.SubscribeAuthorization(dataKey, type);
            yield this.TryOnAuthorizationRequest();
        });
    }
    TryOnAuthorizationRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            const pendingAuthorizations = this.Application.Observer.GetPendingAuthorization();
            if (this._pendingAuthorizations === pendingAuthorizations)
                return (false);
            this._pendingAuthorizations = pendingAuthorizations;
            yield this.OnAuthorizationRequest();
            return (true);
        });
    }
    OnAuthorizationRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            const onAuthorizationRequest = yield this.Application.Config.GetOnAuthorizationRequest();
            if ((onAuthorizationRequest === null) || (onAuthorizationRequest === ''))
                return;
            yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onAuthorizationRequest);
        });
    }
    IsSectorAlreadyLoaded(sector) {
        for (let i = 0; i < this._sectorsLoaded.length; i++)
            if (this._sectorsLoaded[i] === sector)
                return (true);
        return (false);
    }
    MarkSectorAsLoaded(sector) {
        this._sectorsLoaded.push(sector);
    }
    InitializeSectorsLoaded() {
        this._sectorsLoaded = [];
    }
    GetSectorParent(el) {
        return (this.GetSector(el.parentElement));
    }
    GetSector(el) {
        if (el == null)
            return (null);
        const sector = el.getAttribute('d-sector');
        if (sector != null)
            return (sector);
        return (this.GetSector(el.parentElement));
    }
    GetSectorElement(sector) {
        return (this.Application.Searcher.FindByAttributeAndValue('d-sector', sector));
    }
    GetSectorElementInner(sector) {
        const elSector = this.GetSectorElement(sector);
        if ((elSector == null) || (elSector.children.length == 0))
            return (null);
        for (let i = elSector.children.length - 1; i >= 0; i--) {
            const elSectorChild = elSector.children[i];
            const detach = elSectorChild.getAttribute('d-detach');
            if ((detach === null) || (detach === '') || (detach === 'active'))
                return (elSectorChild);
        }
        return (null);
    }
    SetSectorElementInner(sector, el, canDetach) {
        const elSector = this.GetSectorElement(sector);
        if (elSector == null)
            return (null);
        for (let i = elSector.children.length - 1; i >= 0; i--) {
            const elSectorChild = elSector.children[i];
            const detach = elSectorChild.getAttribute('d-detach');
            if (detach == null) {
                elSector.removeChild(elSectorChild);
            }
            else {
                if (detach === 'active') {
                    const elSectorChildDisplay = elSectorChild.style.display;
                    const detachValue = ((elSectorChildDisplay != null) && (elSectorChildDisplay != '')) ? elSectorChildDisplay : 'empty';
                    elSectorChild.style.display = 'none';
                    elSectorChild.setAttribute('d-detach', detachValue);
                }
            }
        }
        if (el === null)
            return;
        if (canDetach) {
            elSector.appendChild(el);
        }
        else {
            el.style.display = '';
            el.setAttribute('d-detach', 'active');
            if (el.parentElement == null)
                elSector.appendChild(el);
        }
    }
    CreateHTMLElement(html, onlyLast = false) {
        if (html == null)
            return (null);
        const elContainer = document.createElement('div');
        elContainer.innerHTML = this.EnsureHTML(html);
        if (onlyLast)
            return elContainer.children[elContainer.children.length - 1];
        return elContainer.children[0];
    }
    InitializeSectorElementDetach(el) {
        if (this.CanDetachElement(el))
            return;
        el.setAttribute('d-detach', 'active');
    }
    CanDetachElement(el) {
        if (this.HasElementIframe(el))
            return (false);
        if (this.HasElementCantDetach(el))
            return (false);
        return (true);
    }
    IsElementDetached(el) {
        if (el.tagName === 'BODY')
            return (false);
        const detach = el.getAttribute('d-detach');
        if ((detach !== null) && (detach !== '') && (detach != 'active'))
            return (true);
        if (el.parentElement == null)
            return (true);
        return (this.IsElementDetached(el.parentElement));
    }
    IsElementAlive(el) {
        if (el === null)
            return (false);
        if (el.tagName === 'BODY')
            return (true);
        if (this.Application.SectorContainerHandler.IsElementContainerized(el))
            return (true);
        return (this.IsElementAlive(el.parentElement));
    }
    IsElementInsideComponent(el) {
        if (el === null)
            return (false);
        if (el.tagName === 'BODY')
            return (false);
        if (this.Application.ComponentHandler.IsComponent(el.tagName.toLowerCase()))
            return (true);
        return (this.IsElementInsideComponent(el.parentElement));
    }
    HasElementIframe(el) {
        if (el == null)
            return (false);
        if (el.tagName.toLowerCase() === 'iframe')
            return (true);
        const children = [].slice.call(el.children);
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const hasChildIframe = this.HasElementIframe(child);
            if (hasChildIframe)
                return (true);
        }
        return (false);
    }
    HasElementCantDetach(el) {
        if (el == null)
            return (false);
        const detachable = el.getAttribute('d-detachable');
        if (detachable === 'false')
            return (true);
        const children = [].slice.call(el.children);
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const hasElementCantDetach = this.HasElementCantDetach(child);
            if (hasElementCantDetach)
                return (true);
        }
        return (false);
    }
    GetSectorImpersonate(el) {
        if (el == null)
            return (null);
        const sector = el.getAttribute('d-sector');
        if (sector != null)
            return (null);
        const sectorImpersonate = el.getAttribute('d-sector-impersonate');
        if (sectorImpersonate != null)
            return (sectorImpersonate);
        return (this.GetSectorImpersonate(el.parentElement));
    }
    IsSectorDynamic(el) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = yield this.GetSectorImpersonate(el);
            return (this.Application.Parser.IsMustache(sector));
        });
    }
    GetSectorResolved(el) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = this.GetSector(el);
            const sectorImpersonate = this.GetSectorImpersonate(el);
            if (sectorImpersonate == null)
                return (sector);
            const sectorResolved = yield this.Application.Storage.ResolveDataUrlMustaches(null, sector, sectorImpersonate, null);
            return (sectorResolved);
        });
    }
    Clone(el) {
        if (el == null)
            return (null);
        return el.cloneNode(true);
    }
    Select(el) {
        const eli = el;
        if (eli.select != null)
            eli.select();
    }
    GetValue(el) {
        const eli = el;
        if (eli.value)
            return (eli.value);
        return ('');
    }
    SetValue(el, value) {
        const eli = el;
        if (eli.value)
            eli.value = value;
    }
    GetText(el) {
        if (el.children.length > 0)
            return ('');
        const eli = el;
        if (eli.textContent)
            return (eli.textContent);
        return (eli.innerText);
    }
    SetText(el, value) {
        if (el.children.length > 0)
            return;
        const eli = el;
        if (eli.textContent)
            eli.textContent = value;
        else
            eli.innerText = value;
    }
    GetHTML(el) {
        return (el.innerHTML);
    }
    GetHTMLEncoded(html) {
        const div = document.createElement('div');
        const text = document.createTextNode(html);
        div.appendChild(text);
        const contentEncoded = div.innerHTML;
        return (contentEncoded);
    }
    EnsureHTML(value) {
        const valueHTML = value.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, "<$1></$2>");
        return (valueHTML);
    }
    SetHTML(el, value) {
        const valueHTML = this.EnsureHTML(value);
        el.innerHTML = valueHTML;
    }
    GetProperty(el, propertyName) {
        const elAny = el;
        return (elAny[propertyName]);
    }
    CreateGuid(isShort = true) {
        if (isShort)
            return (this.CreateGuidShort());
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    CreateGuidShort() {
        let guid = this.CreateGuidShortInternal();
        while (guid === this._lastGuid)
            guid = this.CreateGuidShortInternal();
        this._lastGuid = guid;
        return (guid);
    }
    CreateGuidShortInternal() {
        const date = new Date();
        const hexa = date.getTime().toString(16);
        if (hexa.length <= 8)
            return (hexa);
        return (hexa.substr(hexa.length - 8));
    }
    EnsureElementHasID(el) {
        let id = el.getAttribute('d-id');
        if (id != null)
            return (id);
        id = this.CreateGuid();
        el.setAttribute('d-id', id);
        return (id);
    }
    ApplyNodeDifferences(parent, nodeOld, nodeNew, isHTML) {
        if (!nodeOld) {
            parent.appendChild(nodeNew);
        }
        else if (!nodeNew) {
            parent.removeChild(nodeOld);
        }
        else if (this.IsNodeDifferentType(nodeOld, nodeNew)) {
            parent.replaceChild(nodeNew, nodeOld);
        }
        else {
            if ((isHTML) && (nodeOld.outerHTML == nodeNew.outerHTML))
                return;
            this.ApplyNodeEventsDifferences(nodeOld, nodeNew);
            this.ApplyNodeSpecialDifferences(nodeOld, nodeNew);
            this.ApplyNodeAttributesDifferences(nodeOld, nodeNew);
            const childrenOld = nodeOld != null ? [].slice.call(nodeOld.children) : [];
            const childrenNew = nodeNew != null ? [].slice.call(nodeNew.children) : [];
            const lengthOld = childrenOld.length;
            const lengthNew = childrenNew.length;
            if ((lengthOld === 0) && (lengthNew === 0)) {
                if (nodeOld.textContent !== nodeNew.textContent)
                    nodeOld.textContent = nodeNew.textContent;
            }
            else {
                for (let i = 0; i < lengthNew || i < lengthOld; i++) {
                    this.ApplyNodeDifferences(nodeOld, childrenOld[i], childrenNew[i], isHTML);
                }
            }
        }
    }
    ApplyNodeDifferencesRenderClass(nodeOld, nodeNew) {
        const className = nodeNew.className;
        if (nodeOld.className !== className)
            nodeOld.className = className;
    }
    IsNodeDifferentType(nodeOld, nodeNew) {
        if ((typeof nodeOld) !== (typeof nodeNew))
            return (true);
        if ((nodeOld.nodeType) !== (nodeNew.nodeType))
            return (true);
        if ((nodeOld.tagName) !== (nodeNew.tagName))
            return (true);
        return (false);
    }
    ApplyNodeEventsDifferences(nodeOld, nodeNew) {
        this.Application.EventHandler.SyncNodeEventsDifferences(nodeOld, nodeNew);
    }
    ApplyNodeSpecialDifferences(nodeOld, nodeNew) {
        const tag = nodeOld.tagName.toLowerCase();
        if (tag === "input")
            this.ApplyNodeSpecialDifferencesInput(nodeOld, nodeNew);
        else if (tag === "select")
            this.ApplyNodeSpecialDifferencesSelect(nodeOld, nodeNew);
        else if (tag === "textarea")
            this.ApplyNodeSpecialDifferencesTextarea(nodeOld, nodeNew);
    }
    ApplyNodeSpecialDifferencesInput(nodeOld, nodeNew) {
        const type = nodeOld.type;
        if (((type == 'checkbox')) && (nodeOld.checked !== nodeNew.checked))
            nodeOld.checked = nodeNew.checked;
        if (((type == 'text') || (type == 'password')) && (nodeOld.value !== nodeNew.value))
            nodeOld.value = nodeNew.value;
    }
    ApplyNodeSpecialDifferencesSelect(nodeOld, nodeNew) {
        if (nodeOld.value !== nodeNew.value)
            nodeOld.value = nodeNew.value;
    }
    ApplyNodeSpecialDifferencesTextarea(nodeOld, nodeNew) {
        if (nodeOld.value !== nodeNew.value)
            nodeOld.value = nodeNew.value;
    }
    ApplyNodeAttributesDifferences(nodeOld, nodeNew) {
        const attributesOld = this.ExtactNodeAttributes(nodeOld);
        const attributesNew = this.ExtactNodeAttributes(nodeNew);
        for (let i = 0; i < attributesNew.length; i++) {
            const attribute = attributesNew[i];
            const name = attribute[0];
            const valueNew = attribute[1];
            const valueOld = this.ExtractNodeAttributeValue(attributesOld, name);
            if (valueNew === valueOld)
                continue;
            if ((name === 'class') && (this.Application.Validator.IsValidatorInterface(nodeOld)))
                continue;
            nodeOld.setAttribute(name, valueNew);
        }
        for (let i = 0; i < attributesOld.length; i++) {
            const attribute = attributesOld[i];
            const name = attribute[0];
            const valueNew = this.ExtractNodeAttributeValue(attributesNew, name);
            if (valueNew !== null)
                continue;
            nodeOld.removeAttribute(name);
        }
    }
    ExtactNodeAttributes(node) {
        const attributes = [];
        const nodeAttributes = node.attributes;
        const length = nodeAttributes.length;
        for (let i = 0; i < length; i++) {
            const nodeAttribute = nodeAttributes[i];
            attributes.push([nodeAttribute.name, nodeAttribute.value]);
        }
        return (attributes);
    }
    ExtractNodeAttributeValue(attributes, name) {
        for (let i = attributes.length - 1; i >= 0; i--)
            if (attributes[i][0] === name)
                return (attributes[i][1]);
        return (null);
    }
    Contains(element) {
        return (document.documentElement.contains(element));
    }
    ExtractQueryString(canUseRouter) {
        let url = canUseRouter ? document.location.href : this.Application.Router.GetLastRouteUrl();
        if (url == null)
            url = document.location.href;
        return (this.Application.Parser.ParseQueryString(url));
    }
    Sleep(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => setTimeout(resolve, timeout));
        });
    }
    WaitForMessage(retry = 1000, interval = 50) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < retry; i++) {
                if (this.Message != null)
                    return (this.Message);
                yield this.Application.Document.Sleep(interval);
            }
            return (null);
        });
    }
    AddSectorHierarchy(sector, sectorParent) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this._sectorHierarchy.length; i++) {
                const sectorHierarchyCurrent = this._sectorHierarchy[i];
                if (sectorHierarchyCurrent[0] !== sector)
                    continue;
                sectorHierarchyCurrent[1] = sectorParent;
                yield this.Application.Debugger.NotifySectors();
                return;
            }
            const sectorHierarchy = [sector, sectorParent];
            this._sectorHierarchy.push(sectorHierarchy);
            yield this.Application.Debugger.NotifySectors();
        });
    }
    GetSectorAndChildren(sector) {
        const sectors = [];
        sectors.push(sector);
        for (let i = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[1] !== sector)
                continue;
            const sectorChild = sectorHierarchy[0];
            sectors.push(sectorChild);
            const sectorChildren = this.GetSectorHierarchyChildren(sectorChild);
            for (let j = 0; j < sectorChildren.length; j++)
                sectors.push(sectorChildren[j]);
        }
        return (sectors);
    }
    GetSectorChildren(sector) {
        const sectors = [];
        for (let i = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[1] !== sector)
                continue;
            const sectorChild = sectorHierarchy[0];
            sectors.push(sectorChild);
        }
        return (sectors);
    }
    GetSectorHierarchyChildren(sector) {
        const sectors = [];
        for (let i = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[1] !== sector)
                continue;
            const sectorChild = sectorHierarchy[0];
            sectors.push(sectorChild);
            const sectorChildren = this.GetSectorHierarchyChildren(sectorChild);
            for (let j = 0; j < sectorChildren.length; j++)
                sectors.push(sectorChildren[j]);
        }
        return (sectors);
    }
    IsSectorReady(sector) {
        if (sector == null)
            return (true);
        for (let i = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[0] === sector)
                return (true);
        }
        return (false);
    }
    GetSectorHierarchyParents(sector) {
        const sectors = [sector];
        for (let i = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[0] !== sector)
                continue;
            const sectorParent = sectorHierarchy[1];
            if (sectorParent == null)
                continue;
            const sectorParents = this.GetSectorHierarchyParents(sectorParent);
            for (let j = 0; j < sectorParents.length; j++)
                sectors.push(sectorParents[j]);
        }
        return (sectors);
    }
    AppendSectorHierarchyBySector(sectorHierarchy, sector) {
        for (let i = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchyCurrent = this._sectorHierarchy[i];
            if (sectorHierarchyCurrent[0] !== sector)
                continue;
            sectorHierarchy.push([sector, sectorHierarchyCurrent[1]]);
            break;
        }
    }
    AddSectorHierarchys(sectorHierarchys) {
        for (let i = 0; i < sectorHierarchys.length; i++)
            this._sectorHierarchy.push(sectorHierarchys[i]);
    }
    AppendSectorFriendsBySector(sectorFriends, sector) {
        for (let i = 0; i < this._sectorFriends.length; i++) {
            const sectorFriend = this._sectorFriends[i];
            if (sectorFriend[0] !== sector)
                continue;
            sectorFriends.push([sector, this.Application.Solver.CloneArrayString(sectorFriend[1])]);
            break;
        }
    }
    AddSectorFriendsRange(sectorFriends) {
        for (let i = 0; i < sectorFriends.length; i++)
            this._sectorFriends.push(sectorFriends[i]);
    }
    IsSystemKey(key) {
        return ((key.length > 2) && (key[0] == '_') && (key[1] == '_'));
    }
    IsHiddenKey(key) {
        return ((key.length > 1) && (key[0] == '_'));
    }
    GetSectors() {
        const sectors = [];
        sectors.push('');
        for (let i = 0; i < this._sectorHierarchy.length; i++) {
            const sectorHierarchy = this._sectorHierarchy[i];
            const sector = sectorHierarchy[0];
            if (this.IsSystemKey(sector))
                continue;
            sectors.push(sector);
        }
        return (sectors);
    }
    IsEqualSector(sector1, sector2) {
        const sector1Root = this.IsSectorRoot(sector1);
        const sector2Root = this.IsSectorRoot(sector2);
        if ((sector1Root) && (sector2Root))
            return (true);
        if ((sector1Root) || (sector2Root))
            return (false);
        return (sector1 === sector2);
    }
    IsSectorRoot(sector) {
        return ((sector === null) || (sector === ''));
    }
    CleanSectorMetadata(sector) {
        if (sector == null)
            return;
        const sectorChildren = this.GetSectorAndChildren(sector);
        for (let i = 0; i < sectorChildren.length; i++)
            this.CleanSectorMetadataInternal(sectorChildren[i]);
    }
    CleanSectorMetadataInternal(sector) {
        for (let i = this._sectorFriends.length - 1; i >= 0; i--) {
            const sectorFriends = this._sectorFriends[i];
            if (sectorFriends[0] !== sector)
                continue;
            this._sectorFriends.splice(i, 1);
            break;
        }
        for (let i = this._sectorHierarchy.length - 1; i >= 0; i--) {
            const sectorHierarchy = this._sectorHierarchy[i];
            if (sectorHierarchy[0] !== sector)
                continue;
            this._sectorHierarchy.splice(i, 1);
        }
    }
    GetSectorsAllowed(sector) {
        if (sector == null)
            return (null);
        const sectors = this.GetSectorHierarchyParents(sector);
        for (let i = 0; i < sectors.length; i++) {
            const sectorCurrent = sectors[i];
            const sectorCurrentFriends = this.GetSectorFriends(sectorCurrent);
            if (sectorCurrentFriends == null)
                continue;
            for (let j = 0; j < sectorCurrentFriends.length; j++) {
                const sectorCurrentFriend = sectorCurrentFriends[j];
                if (this.Application.Solver.Contains(sectors, sectorCurrentFriend))
                    continue;
                sectors.push(sectorCurrentFriend);
                const sectorCurrentFriendChildren = this.GetSectorHierarchyChildren(sectorCurrentFriend);
                for (let k = 0; k < sectorCurrentFriendChildren.length; k++) {
                    const sectorCurrentFriendChild = sectorCurrentFriendChildren[k];
                    if (this.Application.Solver.Contains(sectors, sectorCurrentFriendChild))
                        continue;
                    sectors.push(sectorCurrentFriendChild);
                }
            }
        }
        return (sectors);
    }
    IsSectorAllowed(sector, sectors) {
        if (sector == null)
            return (true);
        if (sectors == null)
            return (true);
        for (let i = 0; i < sectors.length; i++)
            if (sectors[i] == sector)
                return (true);
        return (false);
    }
    AddSectorFriends(sector, sectorFriendsText) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sectorFriendsText == null)
                return;
            const friends = this.Application.Parser.ParseTags(sectorFriendsText);
            for (let i = 0; i < friends.length; i++) {
                if (this.Application.Parser.IsMustache(friends[i])) {
                    const sectorFriend = yield this.Application.Storage.RetrieveDataValue(sector, friends[i]);
                    friends.splice(i, 1);
                    friends.push(sectorFriend);
                }
            }
            for (let i = 0; i < this._sectorFriends.length; i++) {
                const sectorFriendsCurrent = this._sectorFriends[i];
                if (sectorFriendsCurrent[0] !== sector)
                    continue;
                sectorFriendsCurrent[1] = friends;
                return;
            }
            const sectorFriends = [sector, friends];
            this._sectorFriends.push(sectorFriends);
        });
    }
    GetSectorFriends(sector) {
        for (let i = 0; i < this._sectorFriends.length; i++) {
            const sectorFriends = this._sectorFriends[i];
            if (sectorFriends[0] === sector)
                return (sectorFriends[1]);
        }
        return (null);
    }
    CollectSector(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = this._sectorHierarchy.length - 1; i >= 0; i--) {
                const sectorHierarchy = this._sectorHierarchy[i];
                if (sectorHierarchy[1] !== sector)
                    continue;
                const sectorCurrent = sectorHierarchy[0];
                yield this.CollectSector(sectorCurrent);
                if (this.Application.Searcher.FindByAttributeAndValue('d-sector', sectorCurrent) !== null)
                    continue;
                yield this.Application.SectorContainerHandler.UnloadSector(sectorCurrent);
            }
        });
    }
    IsFirstChild(el) {
        return (this.GetIndex(el) === 0);
    }
    IsLastChild(el) {
        return (this.GetNextAll(el).length === 0);
    }
    GetIndex(el) {
        const elParent = el.parentElement;
        if (elParent == null)
            return (-1);
        for (let i = 0; i < elParent.children.length; i++)
            if (el === elParent.children[i])
                return (i);
        return (-1);
    }
    GetNextAll(el) {
        const elParent = el.parentElement;
        if (elParent == null)
            return ([]);
        const els = [];
        let found = false;
        for (let i = 0; i < elParent.children.length; i++) {
            const elChild = elParent.children[i];
            if (el === elChild)
                found = true;
            else if (found)
                els.push(elChild);
        }
        return (els);
    }
    ReceiveMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.Action === 'execute')
                yield this.ExecuteMessage(message);
            else if (message.Action === 'update')
                yield this.UpdateMessage(message);
            else
                this.Message = message;
        });
    }
    ExecuteMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            while (!this.Application.IsLoaded)
                yield this.Sleep(50);
            const storageItem = yield this.Application.Storage.RetrieveDataItem(message.DataKey, message.Sector);
            if (storageItem === null)
                return;
            if (!storageItem.IsTypeValue)
                return;
            const valueFunction = storageItem.Data;
            yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(message.Sector, null, valueFunction);
        });
    }
    UpdateMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Application.Storage.UpdateData(message.DataKey, message.Sector, message.Data);
        });
    }
    GetClipboard() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield this.GetClipboardValueAsync();
                if (value !== null)
                    return (value);
                return (this.GetClipboardValueExecCommand());
            }
            catch (_a) {
                return ('');
            }
        });
    }
    GetClipboardValueAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const clipboard = navigator.clipboard;
            if (clipboard == null)
                return (null);
            if (!clipboard.readText)
                return (null);
            const value = yield clipboard.readText();
            return (value);
        });
    }
    GetClipboardValueExecCommand() {
        return __awaiter(this, void 0, void 0, function* () {
            const el = document.createElement('textarea');
            document.body.appendChild(el);
            el.select();
            document.execCommand('paste');
            const value = el.value;
            document.body.removeChild(el);
            return (value);
        });
    }
    SetClipboard(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.SetClipboardEvent(value))
                return (true);
            return (yield this.SetClipboardTextArea(value));
        });
    }
    SetClipboardEvent(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = false;
            const listener = (ev) => {
                if (!ev.clipboardData)
                    return (false);
                ev.preventDefault();
                ev.clipboardData.setData('text/plain', value);
                result = true;
                return (true);
            };
            try {
                document.addEventListener('copy', listener);
                document.execCommand('copy');
            }
            catch (_a) {
                return (false);
            }
            finally {
                document.removeEventListener('copy', listener);
            }
            return (result);
        });
    }
    SetClipboardTextArea(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = document.createElement('textarea');
            el.setAttribute('style', 'width:1px;height:0px;border:0;opacity:0;');
            el.value = value;
            document.body.appendChild(el);
            el.select();
            const result = document.execCommand('copy');
            document.body.removeChild(el);
            return (result);
        });
    }
    StartUnitTest() {
        return __awaiter(this, void 0, void 0, function* () {
            const elUnitTest = this.Application.Searcher.FindByAttributeAndValue('d-id', '__drapoUnitTest');
            if ((elUnitTest == null))
                return;
            yield this.Application.EventHandler.TriggerClick(elUnitTest);
        });
    }
}

"use strict";
class DrapoDrag {
    get Code() {
        return (this._code);
    }
    set Code(value) {
        this._code = value;
    }
    get Action() {
        return (this._action);
    }
    set Action(value) {
        this._action = value;
    }
    get Item() {
        return (this._contextItem);
    }
    set Item(value) {
        this._contextItem = value;
    }
    get Tags() {
        return (this._tags);
    }
    set Tags(value) {
        this._tags = value;
    }
    get Notify() {
        return (this._notify);
    }
    set Notify(value) {
        this._notify = value;
    }
    get OnBefore() {
        return (this._onBefore);
    }
    set OnBefore(value) {
        this._onBefore = value;
    }
    get OnAfter() {
        return (this._onAfter);
    }
    set OnAfter(value) {
        this._onAfter = value;
    }
    get DataKey() {
        return (this._dataKey);
    }
    set DataKey(value) {
        this._dataKey = value;
    }
    get Sector() {
        return (this._sector);
    }
    set Sector(value) {
        this._sector = value;
    }
    get Custom() {
        return (this._custom);
    }
    set Custom(value) {
        this._custom = value;
    }
    constructor() {
        this._action = 'move';
        this._tags = [];
    }
    IsMatch(tags) {
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            for (let j = 0; j < this._tags.length; j++) {
                if (this._tags[j] === tag)
                    return (true);
            }
        }
        return (false);
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoEventHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._debounceDefault = 500;
        this._debounceDefaultClick = 200;
        this._debounce = 'debounce';
        this._detach = 'detach';
        this._eventsRunning = [];
        this._application = application;
    }
    HasContentEventContext(content) {
        return (content.indexOf('d-on-') > -1);
    }
    CreateEventNamespace(el, location, eventType, namespace = 'default') {
        if (eventType === 'load')
            return (eventType);
        if (location === null)
            return (eventType + '.' + namespace);
        const did = this.Application.Document.EnsureElementHasID(el);
        return (eventType + '.' + did);
    }
    GetEventPropagation(el, eventType) {
        const propagationValue = el.getAttribute('d-propagation-' + eventType);
        if (propagationValue == null)
            return (true);
        return (this.Application.Solver.ResolveConditionalBoolean(propagationValue));
    }
    RetrieveEventBinder(element, location) {
        if (location == null)
            return (element);
        if (this.IsLocationBody(location))
            return (document.documentElement);
        return (null);
    }
    IsLocationBody(location) {
        return (location === 'body');
    }
    GetElementParent(element, levels = 0) {
        let current = element;
        for (let i = 0; (i < levels) && (current != null); i++)
            current = current.parentElement;
        if (current == null)
            return (null);
        if (current.tagName.toLowerCase() === 'body')
            return (document.body);
        return (current);
    }
    Attach(el, renderContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = this.RetrieveElementEvents(el);
            if (events.length == 0)
                return;
            const application = this.Application;
            const sector = yield this.Application.Document.GetSectorResolved(el);
            const isSectorDynamic = yield this.Application.Document.IsSectorDynamic(el);
            for (let i = 0; i < events.length; i++) {
                const event = events[i];
                const eventType = event[2];
                if (!this.IsEventTypeValid(eventType))
                    continue;
                const functionsValue = event[3];
                if ((!isSectorDynamic) && (yield this.HasEventContext(sector, renderContext, functionsValue, event[5])))
                    continue;
                const eventFilter = event[4];
                const location = event[1];
                const isLocationBody = this.IsLocationBody(location);
                const eventNamespace = this.CreateEventNamespace(el, location, eventType, 'noContext');
                const binder = this.RetrieveEventBinder(el, location);
                if (binder === null)
                    continue;
                const propagation = this.GetEventPropagation(el, eventType);
                let isDelay = this.IsEventDelay(el, eventType);
                let debounceTimeout = this._debounceDefaultClick;
                const elDebounceTimeout = isDelay ? null : this.GetEventDebounce(el, eventType);
                if (elDebounceTimeout !== null) {
                    isDelay = true;
                    debounceTimeout = elDebounceTimeout;
                }
                let delayTimeout = null;
                const eventsDetach = this.GetEventDetach(el, eventType);
                let eventsDetachActivated = false;
                const eventAttribute = event[0];
                this.DetachEventListener(binder, eventNamespace);
                this.AttachEventListener(binder, eventType, eventNamespace, (e) => __awaiter(this, void 0, void 0, function* () {
                    if (!propagation)
                        e.stopPropagation();
                    if ((isLocationBody) && (!application.Document.Contains(el))) {
                        application.EventHandler.DetachEventListener(binder, eventNamespace);
                        return (true);
                    }
                    if (!application.EventHandler.IsValidEventFilter(e, eventFilter))
                        return (true);
                    const sectorEvent = isSectorDynamic ? yield this.Application.Document.GetSectorResolved(el) : sector;
                    if (!(yield this.Application.Validator.IsValidationEventValid(el, sectorEvent, eventType, location, e, null)))
                        return (true);
                    if (eventsDetachActivated)
                        return (true);
                    if (eventsDetach != null) {
                        for (let j = 0; j < eventsDetach.length; j++) {
                            const eventDetach = eventsDetach[j];
                            const eventDetachNamespace = this.CreateEventNamespace(el, null, eventDetach, 'noContext');
                            application.EventHandler.DetachEventListener(binder, eventNamespace);
                            if (eventDetach === eventType)
                                eventsDetachActivated = true;
                        }
                    }
                    const functionsValueCurrent = el.getAttribute(eventAttribute);
                    if (!isDelay) {
                        application.EventHandler.ExecuteEvent(sector, null, el, e, functionsValueCurrent, isSectorDynamic);
                    }
                    else {
                        if (delayTimeout != null)
                            clearTimeout(delayTimeout);
                        delayTimeout = setTimeout(() => {
                            clearTimeout(delayTimeout);
                            delayTimeout = null;
                            application.EventHandler.ExecuteEvent(sector, null, el, e, functionsValueCurrent, isSectorDynamic);
                        }, debounceTimeout);
                    }
                    return (propagation);
                }));
            }
        });
    }
    AttachContext(context, el, sector, renderContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = this.RetrieveElementEvents(el);
            if (events.length == 0)
                return;
            const application = this.Application;
            const contextItem = context.Item;
            for (let i = 0; i < events.length; i++) {
                const event = events[i];
                const eventType = event[2];
                if (!this.IsEventTypeValid(eventType))
                    continue;
                const functionsValueOriginal = event[3];
                if (!(yield this.HasEventContext(sector, renderContext, functionsValueOriginal, event[5])))
                    continue;
                const eventFilter = event[4];
                const location = event[1];
                const isLocationBody = this.IsLocationBody(location);
                const functionsValue = this.Application.Solver.ResolveSystemContextPath(sector, context, functionsValueOriginal);
                const eventNamespace = this.CreateEventNamespace(el, location, eventType, 'context');
                const binder = this.RetrieveEventBinder(el, location);
                if (binder === null)
                    continue;
                const propagation = this.GetEventPropagation(el, eventType);
                let isDelay = this.IsEventDelay(el, eventType);
                let debounceTimeout = this._debounceDefaultClick;
                const elDebounceTimeout = isDelay ? null : this.GetEventDebounce(el, eventType);
                if (elDebounceTimeout !== null) {
                    isDelay = true;
                    debounceTimeout = elDebounceTimeout;
                }
                let delayTimeout = null;
                const eventsDetach = this.GetEventDetach(el, eventType);
                let eventsDetachActivated = false;
                this.DetachEventListener(binder, eventNamespace);
                this.AttachEventListener(binder, eventType, eventNamespace, (e) => __awaiter(this, void 0, void 0, function* () {
                    if (!propagation)
                        e.stopPropagation();
                    if ((isLocationBody) && (!application.Document.Contains(el))) {
                        application.EventHandler.DetachEventListener(binder, eventNamespace);
                        return (true);
                    }
                    if (!application.EventHandler.IsValidEventFilter(e, eventFilter))
                        return (true);
                    const sectorLocal = application.Document.GetSector(e.target);
                    if (!(yield this.Application.Validator.IsValidationEventValid(el, sectorLocal, eventType, location, e, contextItem)))
                        return (true);
                    if (eventsDetachActivated)
                        return (true);
                    if (eventsDetach != null) {
                        for (let j = 0; j < eventsDetach.length; j++) {
                            const eventDetach = eventsDetach[j];
                            const eventDetachNamespace = this.CreateEventNamespace(el, null, eventDetach, 'noContext');
                            application.EventHandler.DetachEventListener(binder, eventNamespace);
                            if (eventDetach === eventType)
                                eventsDetachActivated = true;
                        }
                    }
                    if (!isDelay) {
                        application.EventHandler.ExecuteEvent(sectorLocal, contextItem, el, e, functionsValue);
                    }
                    else {
                        if (delayTimeout != null)
                            clearTimeout(delayTimeout);
                        delayTimeout = setTimeout(() => {
                            clearTimeout(delayTimeout);
                            delayTimeout = null;
                            application.EventHandler.ExecuteEvent(sectorLocal, contextItem, el, e, functionsValue);
                        }, debounceTimeout);
                    }
                    return (propagation);
                }));
            }
        });
    }
    HasEventContext(sector, renderContext, functionsValue, validation) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.Application.FunctionHandler.HasFunctionMustacheContext(functionsValue, sector, renderContext))
                return (true);
            if ((validation != null) && (yield this.Application.FunctionHandler.HasFunctionMustacheContext(validation, sector, renderContext)))
                return (true);
            return (false);
        });
    }
    AttachEventListener(el, eventType, eventNamespace, callback) {
        const elEventListeners = this.GetElementEventListenerContainer(el);
        const elEventListener = new DrapoEventListener();
        elEventListener.EventType = eventType;
        elEventListener.EventNamespace = eventNamespace;
        elEventListener.Function = callback;
        elEventListeners.push(elEventListener);
        el.addEventListener(eventType, callback);
        this.SetElementEventListenerContainer(el, elEventListeners);
    }
    DetachEventListener(el, eventNamespace) {
        const elEventListeners = this.GetElementEventListenerContainer(el);
        for (let i = elEventListeners.length - 1; i >= 0; i--) {
            const elEventListener = elEventListeners[i];
            if (elEventListener.EventNamespace !== eventNamespace)
                continue;
            elEventListeners.splice(i, 1);
            el.removeEventListener(elEventListener.EventType, elEventListener.Function);
            this.SetElementEventListenerContainer(el, elEventListeners);
            return (true);
        }
        return (false);
    }
    SetElementEventListenerContainer(el, elEventListeners) {
        const elAny = el;
        elAny._events = elEventListeners;
    }
    GetElementEventListenerContainer(el) {
        const elAny = el;
        if (elAny._events == null) {
            const elEventListeners = [];
            elAny._events = elEventListeners;
            return (elEventListeners);
        }
        return elAny._events;
    }
    ExecuteEvent(sector, contextItem, element, event, functionsValue, isSectorDynamic = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isEventSingle = element.getAttribute('d-event-single') === 'true';
                if ((isEventSingle) && (this.IsEventRunning(element)))
                    return;
                let eventSingleClass = null;
                if (isEventSingle) {
                    this.AddEventRunning(element);
                    eventSingleClass = element.getAttribute('d-event-single-class');
                    if (eventSingleClass != null)
                        element.classList.add(eventSingleClass);
                }
                const sectorEvent = isSectorDynamic ? yield this.Application.Document.GetSectorResolved(element) : sector;
                yield this.Application.FunctionHandler.ResolveFunction(sectorEvent, contextItem, element, event, functionsValue);
                if (isEventSingle) {
                    this.RemoveEventRunning(element);
                    if (eventSingleClass != null)
                        element.classList.remove(eventSingleClass);
                }
            }
            catch (e) {
                yield this.Application.ExceptionHandler.Handle(e, 'DrapoEventHandler - ExecuteEvent');
            }
        });
    }
    IsEventRunning(element) {
        for (let i = this._eventsRunning.length - 1; i >= 0; i--) {
            const elementCurrent = this._eventsRunning[i];
            if (elementCurrent === element)
                return (true);
        }
        return (false);
    }
    AddEventRunning(element) {
        this._eventsRunning.push(element);
    }
    RemoveEventRunning(element) {
        for (let i = this._eventsRunning.length - 1; i >= 0; i--) {
            const elementCurrent = this._eventsRunning[i];
            if (elementCurrent === element)
                this._eventsRunning.splice(i, 1);
        }
    }
    IsEventTypeValid(eventType) {
        if (eventType == 'click')
            return (true);
        if (eventType == 'change')
            return (true);
        if (eventType == 'keyup')
            return (true);
        if (eventType == 'blur')
            return (true);
        if (eventType == 'dblclick')
            return (true);
        if (eventType == 'input')
            return (true);
        if (eventType == 'load')
            return (true);
        if (eventType == 'mousedown')
            return (true);
        if (eventType == 'mouseover')
            return (true);
        if (eventType == 'mouseup')
            return (true);
        if (eventType === 'model')
            return (false);
        this.Application.ExceptionHandler.HandleError('DrapoEventHandler - EventType Unknown - {0}', eventType);
        return (false);
    }
    IsEventDelay(el, eventType) {
        if (eventType !== 'click')
            return (false);
        return (this.HasEventDoubleClickInParent(el));
    }
    GetEventDebounce(el, eventType) {
        const elEventTypeDebounce = el.getAttribute('d-on-' + eventType + '-' + this._debounce);
        if ((elEventTypeDebounce == null) || (elEventTypeDebounce == ''))
            return (null);
        if (elEventTypeDebounce === 'true')
            return (this._debounceDefault);
        return (this.Application.Parser.ParseNumber(elEventTypeDebounce, this._debounceDefault));
    }
    GetEventDetach(el, eventType) {
        const elEventTypeDetach = el.getAttribute('d-on-' + eventType + '-' + this._detach);
        if ((elEventTypeDetach == null) || (elEventTypeDetach == ''))
            return (null);
        if (elEventTypeDetach === 'true')
            return ([eventType]);
        return (this.Application.Parser.ParsePipes(elEventTypeDetach));
    }
    HasEventDoubleClickInParent(el) {
        if (el == null)
            return (false);
        const doubleClickEvent = el.getAttribute('d-on-dblclick');
        if ((doubleClickEvent != null) && (doubleClickEvent != ''))
            return (true);
        return (this.HasEventDoubleClickInParent(el.parentElement));
    }
    IsEventTypeKeyboard(eventType) {
        return (eventType == 'keyup');
    }
    IsValidEventFilter(e, eventFilter) {
        if (eventFilter == null)
            return (true);
        if (this.IsEventTypeKeyboard(e.type))
            return (this.IsValidEventFilterKeyboard(e, eventFilter));
        return (true);
    }
    IsValidEventFilterKeyboard(e, eventFilter) {
        return (this.GetKeyboardMapping(e.key) == this.GetKeyboardMapping(eventFilter));
    }
    GetKeyboardMapping(key) {
        if (key == null)
            return (null);
        key = key.toLowerCase();
        if (key === 'esc')
            key = 'escape';
        if (key === 'del')
            key = 'delete';
        return (key);
    }
    RetrieveElementEvents(el) {
        const events = [];
        for (let i = 0; i < el.attributes.length; i++) {
            const attribute = el.attributes[i];
            const event = this.Application.Parser.ParseEventProperty(el, attribute.nodeName, attribute.nodeValue);
            if ((event != null) && (event[4] !== this._debounce) && (event[4] !== this._detach))
                events.push(event);
        }
        return (events);
    }
    TriggerClick(el) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.Trigger(el, 'click'));
        });
    }
    Trigger(el, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = new Event(type);
            return (yield this.TriggerEvent(el, event));
        });
    }
    TriggerEvent(el, event) {
        return __awaiter(this, void 0, void 0, function* () {
            return (el.dispatchEvent(event));
        });
    }
    SyncNodeEventsDifferences(nodeOld, nodeNew) {
        const eventsOld = this.GetElementEventListenerContainer(nodeOld);
        const eventsNew = this.GetElementEventListenerContainer(nodeNew);
        for (let i = 0; i < eventsNew.length; i++) {
            const eventNew = eventsNew[i];
            const eventOld = this.GetEventListener(eventNew.EventNamespace, eventsOld);
            if (eventOld == null) {
                const elEventListener = new DrapoEventListener();
                elEventListener.EventType = eventNew.EventType;
                elEventListener.EventNamespace = eventNew.EventNamespace;
                elEventListener.Function = eventNew.Function;
                eventsOld.push(elEventListener);
                this.AttachEventListener(nodeOld, elEventListener.EventType, elEventListener.EventNamespace, elEventListener.Function);
            }
            else {
                this.DetachEventListener(nodeOld, eventOld.EventNamespace);
                eventOld.Function = eventNew.Function;
                this.AttachEventListener(nodeOld, eventOld.EventType, eventOld.EventNamespace, eventOld.Function);
            }
        }
        for (let i = eventsOld.length - 1; i >= 0; i--) {
            const eventOld = eventsOld[i];
            const eventNew = this.GetEventListener(eventOld.EventNamespace, eventsNew);
            if (eventNew !== null)
                continue;
            this.DetachEventListener(nodeOld, eventOld.EventNamespace);
        }
        if ((eventsOld.length > 0) || (eventsNew.length > 0))
            this.SetElementEventListenerContainer(nodeOld, eventsOld);
    }
    GetEventListener(eventNamespace, events) {
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event.EventNamespace === eventNamespace)
                return (event);
        }
        return (null);
    }
}

"use strict";
class DrapoEventListener {
    constructor() {
        this._eventType = null;
        this._eventNamespace = null;
        this._function = null;
    }
    get EventType() {
        return (this._eventType);
    }
    set EventType(value) {
        this._eventType = value;
    }
    get EventNamespace() {
        return (this._eventNamespace);
    }
    set EventNamespace(value) {
        this._eventNamespace = value;
    }
    get Function() {
        return (this._function);
    }
    set Function(value) {
        this._function = value;
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoExceptionHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    Handle(e, context = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = context != null ? context : 'DrapoExceptionHandler - Handle - Exception';
            yield this.Application.Log.WriteError('Drapo - ' + message + ' - Stack: ' + e.stack.toString(), []);
        });
    }
    HandleError(message, ...parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Application.Log.WriteError('Drapo - ' + message, parameters);
        });
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoExecutionContext {
    get HasError() {
        return (this._hasError);
    }
    set HasError(value) {
        this._hasError = value;
    }
    get CanReset() {
        return (this._canReset);
    }
    set CanReset(value) {
        this._canReset = value;
    }
    get HasBreakpoint() {
        return (this._hasBreakpoint);
    }
    set HasBreakpoint(value) {
        this._hasBreakpoint = value;
    }
    get Sector() {
        return (this._sector);
    }
    set Sector(value) {
        this._sector = value;
    }
    get DataKey() {
        return (this._dataKey);
    }
    set DataKey(value) {
        this._dataKey = value;
    }
    get Data() {
        return (this._data);
    }
    set Data(value) {
        this._data = value;
    }
    get Stack() {
        return (this._stack);
    }
    constructor(application) {
        this._application = null;
        this._hasError = false;
        this._canReset = false;
        this._hasBreakpoint = false;
        this._sector = '';
        this._dataKey = '';
        this._data = null;
        this._sectorContainer = [];
        this._windowsAutoClose = [];
        this._stack = new DrapoStack();
        this._application = application;
    }
    Continue() {
        return __awaiter(this, void 0, void 0, function* () {
            return (!this._hasError);
        });
    }
    AddSectorContainer(sector, containerCode) {
        for (let i = 0; i < this._sectorContainer.length; i++) {
            const tuple = this._sectorContainer[i];
            if (tuple[0] !== sector)
                continue;
            tuple[1] = containerCode;
            break;
        }
        this._sectorContainer.push([sector, containerCode]);
    }
    HasSectorContainer(sector) {
        for (let i = 0; i < this._sectorContainer.length; i++) {
            const tuple = this._sectorContainer[i];
            if (tuple[0] === sector)
                return (true);
        }
        return (false);
    }
    GetSectorContainer(sector) {
        for (let i = 0; i < this._sectorContainer.length; i++) {
            const tuple = this._sectorContainer[i];
            if (tuple[0] === sector)
                return (tuple[1]);
        }
        return (null);
    }
    AddWindowAutoClose(window) {
        this._windowsAutoClose.push(window);
    }
    GetWindowsAutoClose() {
        return (this._windowsAutoClose);
    }
}

"use strict";
class DrapoExpressionItem {
    get Type() {
        return (this._type);
    }
    set Type(value) {
        this._type = value;
    }
    get Value() {
        return (this._value);
    }
    set Value(value) {
        if ((value != null) && (value.length > 1) && (value[0] === "'") && (value[value.length - 1] === "'"))
            this._value = value.substring(1, value.length - 1);
        else if ((value != null) && (value.length > 1) && (value[0] === '"') && (value[value.length - 1] === '"'))
            this._value = value.substring(1, value.length - 1);
        else
            this._value = value;
    }
    get Items() {
        return (this._items);
    }
    set Items(value) {
        this._items = value;
    }
    constructor(type, value = '') {
        this._value = '';
        this._items = [];
        this._type = type;
        this.Value = value;
    }
    GetItemIndex(value) {
        for (let i = 0; i < this._items.length; i++)
            if (this._items[i].Value === value)
                return (i);
        return (null);
    }
    CreateBlock(startingIndex, endingIndex) {
        const block = new DrapoExpressionItem(DrapoExpressionItemType.Block);
        for (let i = startingIndex; i <= endingIndex; i++)
            block.Items.push(this.Items[i]);
        return (block);
    }
}

"use strict";
var DrapoExpressionItemType;
(function (DrapoExpressionItemType) {
    DrapoExpressionItemType[DrapoExpressionItemType["Block"] = 0] = "Block";
    DrapoExpressionItemType[DrapoExpressionItemType["Text"] = 1] = "Text";
    DrapoExpressionItemType[DrapoExpressionItemType["Function"] = 2] = "Function";
    DrapoExpressionItemType[DrapoExpressionItemType["Mustache"] = 3] = "Mustache";
    DrapoExpressionItemType[DrapoExpressionItemType["Comparator"] = 4] = "Comparator";
    DrapoExpressionItemType[DrapoExpressionItemType["Logical"] = 5] = "Logical";
    DrapoExpressionItemType[DrapoExpressionItemType["Deny"] = 6] = "Deny";
    DrapoExpressionItemType[DrapoExpressionItemType["Arithmetic"] = 7] = "Arithmetic";
})(DrapoExpressionItemType || (DrapoExpressionItemType = {}));

"use strict";
class DrapoFormatter {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    Format(value, format, culture = null, applyTimezone = null) {
        if ((value == null) || (value === ''))
            return ('');
        if (this.Application.Parser.IsBoolean(value))
            return (value);
        if (this.Application.Parser.IsNumber(value))
            return (this.FormatNumber(this.Application.Parser.ParseNumber(value), format, culture));
        return (this.FormatDate(value, format, culture, applyTimezone == null ? true : applyTimezone));
    }
    FormatDate(value, format, culture, applyTimezone) {
        const date = this.Application.Parser.ParseDate(value);
        if (date === null)
            return (value);
        if (applyTimezone) {
            const timeZone = this.Application.Config.GetTimezone();
            if (timeZone != null)
                date.setHours(date.getHours() + timeZone);
        }
        const formatConverted = this.ConvertDateFormat(format, culture);
        const formatTokens = this.Application.Parser.ParseFormat(formatConverted);
        const dateFormatted = this.GetDateFormattedTokens(date, formatTokens, culture);
        return (dateFormatted);
    }
    ConvertDateFormat(format, culture) {
        let formatConverted = format;
        switch (format) {
            case "d":
            case "D":
            case "t":
            case "T":
            case "g":
            case "G":
            case "r":
                formatConverted = this.Application.Globalization.GetDateFormat(format, culture);
                break;
        }
        return (formatConverted);
    }
    GetDateFormattedTokens(date, formatTokens, culture) {
        let dateCulture = '';
        for (let i = 0; i < formatTokens.length; i++) {
            const formatToken = formatTokens[i];
            dateCulture = dateCulture + this.GetDateFormattedToken(date, formatToken, culture);
        }
        return (dateCulture);
    }
    GetDateFormattedToken(date, formatToken, culture) {
        let dateFormat = formatToken;
        switch (formatToken) {
            case 'YYYY':
            case 'yyyy':
                dateFormat = date.getFullYear().toString();
                break;
            case 'YY':
            case 'yy':
                const yearFull = date.getFullYear().toString();
                dateFormat = yearFull.substring(2);
                break;
            case 'M':
                dateFormat = (date.getMonth() + 1).toString();
                break;
            case 'MM':
                dateFormat = this.EnsureLength((date.getMonth() + 1).toString());
                break;
            case 'MMM':
                dateFormat = this.Application.Globalization.GetMonthNameShort(date.getMonth(), culture);
                break;
            case 'MMMM':
                dateFormat = this.Application.Globalization.GetMonthName(date.getMonth(), culture);
                break;
            case 'D':
            case 'd':
                dateFormat = (date.getDate()).toString();
            case 'DD':
            case 'dd':
                dateFormat = this.EnsureLength((date.getDate()).toString());
                break;
            case 'DDD':
            case 'ddd':
                dateFormat = this.Application.Globalization.GetDayOfWeekNameShort(date.getDay(), culture);
                break;
            case 'DDDD':
            case 'dddd':
                dateFormat = this.Application.Globalization.GetDayOfWeekName(date.getDay(), culture);
                break;
            case 'h':
                let hours = date.getHours();
                if (hours > 12)
                    hours = hours - 12;
                dateFormat = hours.toString();
                break;
            case 'hh':
                let hoursDouble = date.getHours();
                if (hoursDouble > 12)
                    hoursDouble = hoursDouble - 12;
                dateFormat = this.EnsureLength(hoursDouble.toString());
                break;
            case 'H':
                dateFormat = date.getHours().toString();
                break;
            case 'HH':
                dateFormat = this.EnsureLength(date.getHours().toString());
                break;
            case 'm':
                dateFormat = date.getMinutes().toString();
                break;
            case 'mm':
                dateFormat = this.EnsureLength(date.getMinutes().toString());
                break;
            case 's':
                dateFormat = date.getSeconds().toString();
            case 'ss':
                dateFormat = this.EnsureLength(date.getSeconds().toString());
                break;
            case 'f':
            case 'F':
                dateFormat = this.EnsureLengthMax(date.getMilliseconds().toString(), 1);
                break;
            case 'ff':
            case 'FF':
                dateFormat = this.EnsureLengthMax(date.getMilliseconds().toString(), 2);
                break;
            case 'fff':
            case 'FFF':
                dateFormat = this.EnsureLengthMax(date.getMilliseconds().toString(), 3);
                break;
        }
        return (dateFormat);
    }
    EnsureLength(data, length = 2) {
        while (data.length < length)
            data = '0' + data;
        return (data);
    }
    EnsureLengthMax(data, length) {
        if (data.length > length)
            return (data.substring(0, length));
        return (data);
    }
    FormatNumber(value, format, culture) {
        const formatTokens = this.Application.Parser.ParseFormat(format);
        if (formatTokens.length == 0)
            return (value.toString());
        const formatTokenType = formatTokens[0];
        if ((formatTokenType === 'N') || (formatTokenType === 'n'))
            return (this.FormatNumberNumeric(value, formatTokens, culture));
        if ((formatTokenType === 'P') || (formatTokenType === 'p'))
            return (this.FormatNumberPercentage(value, formatTokens, culture));
        if ((formatTokenType === 'D') || (formatTokenType === 'd'))
            return (this.FormatNumberDecimal(value, formatTokens, culture));
        if ((formatTokenType === 'T') || (formatTokenType === 't'))
            return (this.FormatNumberTimespan(value, formatTokens, culture));
        if ((formatTokenType === 'S') || (formatTokenType === 's'))
            return (this.FormatNumberSize(value, formatTokens, culture));
        return (value.toString());
    }
    FormatNumberNumeric(value, formatTokens, culture) {
        const decimals = this.GetFormatTokenNumber(formatTokens, 1, 2);
        const isNegative = value < 0;
        const valueAbsolute = Math.abs(value);
        const valueDecimals = valueAbsolute.toFixed(decimals);
        const valueDecimalsWithCulture = this.GetNumberFormattedWithCulture(valueDecimals, culture);
        return ((isNegative ? '-' : '') + valueDecimalsWithCulture);
    }
    FormatNumberPercentage(value, formatTokens, culture) {
        const decimals = this.GetFormatTokenNumber(formatTokens, 1, 2);
        const isNegative = value < 0;
        const valueAbsolute = Math.abs(value);
        const valueDecimals = (valueAbsolute * 100).toFixed(decimals);
        const valueDecimalsWithCulture = this.GetNumberFormattedWithCulture(valueDecimals, culture);
        return ((isNegative ? '-' : '') + valueDecimalsWithCulture + ' %');
    }
    FormatNumberDecimal(value, formatTokens, culture) {
        const decimals = this.GetFormatTokenNumber(formatTokens, 1, 1);
        const isNegative = value < 0;
        const valueAbsolute = Math.abs(value);
        const valueDecimals = this.EnsureLength(valueAbsolute.toFixed(0), decimals);
        const valueDecimalsWithCulture = this.GetNumberFormattedWithCulture(valueDecimals, culture);
        return ((isNegative ? '-' : '') + valueDecimalsWithCulture);
    }
    FormatNumberTimespan(value, formatTokens, culture) {
        if (value === 0)
            return ('');
        if (value < 0)
            return (((formatTokens != null) && (formatTokens.length > 1)) ? formatTokens[1] : '');
        if (value < 1000)
            return (value.toString() + 'ms');
        if (value < (1000 * 60)) {
            const seconds = Math.floor(value / 1000);
            return (seconds.toString() + 's');
        }
        if (value < (1000 * 60 * 60)) {
            const minutes = Math.floor(value / (1000 * 60));
            return (minutes.toString() + 'm' + this.FormatNumberTimespan(value - (minutes * 1000 * 60), null, culture));
        }
        const hours = Math.floor(value / (1000 * 60 * 60));
        return (hours.toString() + 'h' + this.FormatNumberTimespan(value - (hours * 1000 * 60 * 60), null, culture));
    }
    FormatNumberSize(value, formatTokens, culture) {
        let type = 0;
        let valueSize = value;
        while (valueSize > 1000) {
            valueSize = valueSize / 1000;
            type++;
        }
        return (valueSize.toString() + this.Application.Globalization.GetNumberSizeTypeName(type, culture));
    }
    GetNumberFormattedWithCulture(value, culture) {
        const delimiterDecimal = this.Application.Globalization.GetDelimiterDecimal(culture);
        const delimiterThousandes = this.Application.Globalization.GetDelimiterThousands(culture);
        if (delimiterDecimal !== '.')
            value = value.replace('.', delimiterDecimal);
        let index = value.indexOf(delimiterDecimal);
        if (index === -1)
            index = value.length;
        for (let i = index - 3; i > 0; i = i - 3)
            value = value.substring(0, i) + delimiterThousandes + value.substring(i);
        return (value);
    }
    GetFormatTokenNumber(formatTokens, index, valueDefault) {
        if (index >= formatTokens.length)
            return (valueDefault);
        const token = formatTokens[index];
        return (this.Application.Parser.ParseNumber(token, valueDefault));
    }
}

"use strict";
class DrapoFunction {
    constructor() {
        this._name = null;
        this._parameters = [];
    }
    get Name() {
        return (this._name);
    }
    set Name(value) {
        this._name = value;
    }
    get Parameters() {
        return (this._parameters);
    }
    set Parameters(value) {
        this._parameters = value;
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoFunctionHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    ResolveFunctionWithoutContext(sector, element, functionsValue, executionContext = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.ResolveFunction(sector, null, element, null, functionsValue, executionContext, true));
        });
    }
    CreateExecutionContext(canReset = true) {
        const executionContext = new DrapoExecutionContext(this.Application);
        executionContext.CanReset = canReset;
        if (canReset)
            this.Application.Server.HasBadRequest = false;
        return (executionContext);
    }
    FinalizeExecutionContext(executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const windowsAutoClose = executionContext.GetWindowsAutoClose();
            for (let i = windowsAutoClose.length - 1; i >= 0; i--) {
                const windowAutoClose = windowsAutoClose[i];
                yield this.Application.WindowHandler.TryClose(windowAutoClose);
            }
        });
    }
    IsExecutionBroked(executionContext) {
        if (executionContext.HasError)
            return (true);
        if (!executionContext.CanReset)
            return (false);
        if (this.Application.Server.HasBadRequest) {
            this.Application.Server.HasBadRequest = false;
            executionContext.HasError = true;
            return (true);
        }
        return (false);
    }
    ReplaceFunctionExpressions(sector, context, expression, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.ReplaceFunctionExpressionsContext(sector, context, expression, canBind, this.CreateExecutionContext(false)));
        });
    }
    ReplaceFunctionExpressionsContext(sector, context, expression, canBind, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const functionsParsed = this.Application.Parser.ParseFunctions(expression);
            for (let i = 0; i < functionsParsed.length; i++) {
                let functionParse = functionsParsed[i];
                let functionParsed = this.Application.Parser.ParseFunction(functionParse);
                if (functionParsed === null)
                    continue;
                if (this.Application.Parser.IsMustache(functionParse)) {
                    const dataPath = this.Application.Parser.ParseMustache(functionParse);
                    const data = yield this.Application.Solver.ResolveItemDataPathObject(sector, context.Item, dataPath);
                    if ((data == null) || (data == ''))
                        continue;
                    functionParse = data;
                    const functionInnerParsed = yield this.ReplaceFunctionExpressionsContext(sector, context, functionParse, canBind, executionContext);
                    if (functionInnerParsed === functionParse)
                        continue;
                    functionParse = functionInnerParsed;
                    expression = expression.replace(functionParse, functionInnerParsed);
                }
                functionParsed = this.Application.Parser.ParseFunction(functionParse);
                if (functionParsed == null) {
                    yield this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - ResolveFunction - Invalid Parse - {0}', functionParse);
                    continue;
                }
                expression = expression.replace(functionParse, yield this.ExecuteFunctionContextSwitch(sector, context.Item, null, null, functionParsed, executionContext));
            }
            return (expression);
        });
    }
    ResolveFunction(sector, contextItem, element, event, functionsValue, executionContext = null, forceFinalizeExecutionContext = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let created = false;
            if (created = executionContext === null) {
                executionContext = this.CreateExecutionContext();
            }
            const result = yield this.ResolveFunctionContext(sector, contextItem, element, event, functionsValue, executionContext);
            if ((created) || (forceFinalizeExecutionContext))
                yield this.FinalizeExecutionContext(executionContext);
            return (result);
        });
    }
    ResolveFunctionContext(sector, contextItem, element, event, functionsValue, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = '';
            if (this.IsExecutionBroked(executionContext))
                return (result);
            const functionsParsed = this.Application.Parser.ParseFunctions(functionsValue);
            for (let i = 0; i < functionsParsed.length; i++) {
                const functionParse = functionsParsed[i];
                if (functionParse == '')
                    continue;
                if (this.Application.Parser.IsMustache(functionParse)) {
                    const dataPath = this.Application.Parser.ParseMustache(functionParse);
                    const data = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
                    if ((data == null) || (data == ''))
                        continue;
                    const dataKey = this.Application.Solver.ResolveDataKey(dataPath);
                    executionContext.HasBreakpoint = yield this.Application.Debugger.HasBreakpoint(sector, dataKey);
                    executionContext.Sector = sector;
                    executionContext.DataKey = dataKey;
                    result = result + (yield this.ResolveFunctionContext(sector, contextItem, element, event, data, executionContext));
                    if (this.IsExecutionBroked(executionContext))
                        return (result);
                    continue;
                }
                const functionParsed = this.Application.Parser.ParseFunction(functionParse);
                if (functionParsed == null) {
                    yield this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - ResolveFunction - Invalid Parse - {0}', functionParse);
                    continue;
                }
                if (executionContext.HasBreakpoint)
                    yield this.Application.Debugger.ActivateBreakpoint(executionContext.Sector, executionContext.DataKey, functionsValue, functionParse, 'before');
                result = result + (yield this.ExecuteFunctionContextSwitch(sector, contextItem, element, event, functionParsed, executionContext));
                if ((executionContext.HasBreakpoint) && (i == (functionsParsed.length - 1)))
                    yield this.Application.Debugger.ActivateBreakpoint(executionContext.Sector, executionContext.DataKey, functionsValue, functionParse, 'after');
                if (this.IsExecutionBroked(executionContext))
                    return (result);
            }
            yield this.Application.Debugger.CleanRuntime();
            return (result);
        });
    }
    ResolveFunctionParameter(sector, contextItem, element, executionContext, parameter, canForceLoadDataDelay = false, canUseReturnFunction = false, isRecursive = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (canUseReturnFunction) {
                const functionParsed = this.Application.Parser.ParseFunction(parameter);
                if (functionParsed != null) {
                    const valueFunction = yield this.ExecuteFunctionContextSwitch(sector, contextItem, element, null, functionParsed, executionContext);
                    if (isRecursive)
                        return (yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, valueFunction));
                    return (valueFunction);
                }
            }
            if (!this.Application.Parser.HasMustache(parameter))
                return (parameter);
            if (this.Application.Parser.HasFunction(parameter))
                return (parameter);
            const mustaches = this.Application.Parser.ParseMustaches(parameter);
            if (mustaches.length == 0)
                return (parameter);
            const mustache = this.Application.Parser.ParseMustache(mustaches[0]);
            const value = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, mustache, canForceLoadDataDelay, executionContext);
            if ((!isRecursive) && (parameter === mustaches[0]))
                return (value);
            const valueReplaceMustache = parameter.replace(mustaches[0], value);
            return (yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, valueReplaceMustache));
        });
    }
    ResolveExecutionContextMustache(sector, executionContext, value) {
        if (executionContext == null)
            return (value);
        if (!this.Application.Parser.HasMustache(value))
            return (value);
        const mustaches = this.Application.Parser.ParseMustaches(value);
        for (let i = 0; i < mustaches.length; i++) {
            const mustache = mustaches[i];
            const dataPath = this.Application.Parser.ParseMustache(mustache);
            const mustacheResolved = this.Application.Solver.GetExecutionContextPathValue(sector, executionContext, dataPath);
            if (mustacheResolved !== null)
                value = value.replace(mustache, mustacheResolved);
        }
        return (value);
    }
    ResolveFunctions(sector, contextItem, element, executionContext, value, checkInvalidFunction = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const functionsParsed = this.Application.Parser.ParseFunctionsPartial(value);
            for (let i = 0; i < functionsParsed.length; i++) {
                const functionText = functionsParsed[i];
                const functionParsed = this.Application.Parser.ParseFunction(functionText);
                if (functionParsed === null)
                    continue;
                const valueFunction = yield this.ExecuteFunctionContextSwitch(sector, contextItem, element, null, functionParsed, executionContext, checkInvalidFunction);
                if ((valueFunction === null) && (!checkInvalidFunction))
                    continue;
                const valueReplaceFunction = value.replace(functionText, valueFunction);
                return (yield this.ResolveFunctions(sector, contextItem, element, executionContext, valueReplaceFunction, checkInvalidFunction));
            }
            if (!this.Application.Parser.HasMustache(value))
                return (value);
            const mustaches = this.Application.Parser.ParseMustaches(value);
            if (mustaches.length == 0)
                return (value);
            const mustache = this.Application.Parser.ParseMustache(mustaches[0]);
            const mustacheValue = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, mustache, true);
            const valueReplaceMustache = value.replace(mustaches[0], mustacheValue);
            return (yield this.ResolveFunctions(sector, contextItem, element, executionContext, valueReplaceMustache, checkInvalidFunction));
        });
    }
    ResolveFunctionParameterDataFields(sector, contextItem, element, parameter, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, parameter);
            if ((value == null) || (value == ''))
                return (null);
            const mustache = '{{' + value + '}}';
            const dataFields = this.Application.Parser.ParseMustache(mustache);
            return (dataFields);
        });
    }
    ExecuteFunctionContextSwitch(sector, contextItem, element, event, functionParsed, executionContext, checkInvalidFunction = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Application.Debugger.AddFunction(functionParsed);
            if (functionParsed.Name === 'external')
                return (this.ExecuteFunctionExternal(contextItem, element, event, functionParsed));
            if (functionParsed.Name === 'toggleitemfield')
                return (yield this.ExecuteFunctionToggleItemField(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'toggledata')
                return (yield this.ExecuteFunctionToggleData(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'uncheckitemfield')
                return (yield this.ExecuteFunctionUncheckItemField(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'clearitemfield')
                return (yield this.ExecuteFunctionClearItemField(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'updateitemfield')
                return (yield this.ExecuteFunctionUpdateItemField(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'checkdatafield')
                return (yield this.ExecuteFunctionCheckDataField(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'uncheckdatafield')
                return (yield this.ExecuteFunctionUncheckDataField(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'cleardatafield')
                return (yield this.ExecuteFunctionClearDataField(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'updatedatafield')
                return (yield this.ExecuteFunctionUpdateDataField(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'updatedatafieldlookup')
                return (yield this.ExecuteFunctionUpdateDataFieldLookup(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'checkitemfield')
                return (yield this.ExecuteFunctionCheckItemField(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'moveitem')
                return (yield this.ExecuteFunctionMoveItem(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'updatedataurl')
                return (yield this.ExecuteFunctionUpdateDataUrl(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'updatedataurlset')
                return (yield this.ExecuteFunctionUpdateDataUrlSet(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'adddataitem')
                return (yield this.ExecuteFunctionAddDataItem(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'removedataitem')
                return (yield this.ExecuteFunctionRemoveDataItem(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'removedataitemlookup')
                return (yield this.ExecuteFunctionRemoveDataItemLookup(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'containsdataitem')
                return (yield this.ExecuteFunctionContainsDataItem(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'updatesector')
                return (yield this.ExecuteFunctionUpdateSector(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'switchsector')
                return (yield this.ExecuteFunctionSwitchSector(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'reloadsector')
                return (yield this.ExecuteFunctionReloadSector(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'clearsector')
                return (yield this.ExecuteFunctionClearSector(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'loadsectorcontent')
                return (yield this.ExecuteFunctionLoadSectorContent(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'postdata')
                return (yield this.ExecuteFunctionPostData(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'postdataitem')
                return (yield this.ExecuteFunctionPostDataItem(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'cleardata')
                return (yield this.ExecuteFunctionClearData(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'unloaddata')
                return (yield this.ExecuteFunctionUnloadData(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'createdata')
                return (yield this.ExecuteFunctionCreateData(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'updatedata')
                return (yield this.ExecuteFunctionUpdateData(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'reloaddata')
                return (yield this.ExecuteFunctionReloadData(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'filterdata')
                return (yield this.ExecuteFunctionFilterData(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'hasdatachanges')
                return (yield this.ExecuteFunctionHasDataChanges(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'acceptdatachanges')
                return (yield this.ExecuteFunctionAcceptDataChanges(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'reloadpage')
                return (yield this.ExecuteFunctionReloadPage(sector, contextItem, element, event, functionParsed));
            if (functionParsed.Name === 'closepage')
                return (yield this.ExecuteFunctionClosePage(sector, contextItem, element, event, functionParsed));
            if (functionParsed.Name === 'redirectpage')
                return (yield this.ExecuteFunctionRedirectPage(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'updateurl')
                return (yield this.ExecuteFunctionUpdateURL(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'updatetoken')
                return (yield this.ExecuteFunctionUpdateToken(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'cleartoken')
                return (yield this.ExecuteFunctionClearToken(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'hastoken')
                return (this.ExecuteFunctionHasToken(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'updatetokenantiforgery')
                return (yield this.ExecuteFunctionUpdateTokenAntiforgery(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'destroycontainer')
                return (yield this.ExecuteFunctionDestroyContainer(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'if')
                return (yield this.ExecuteFunctionIf(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'async')
                return (yield this.ExecuteFunctionAsync(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'notify')
                return (yield this.ExecuteFunctionNotify(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'focus')
                return (yield this.ExecuteFunctionFocus(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'showwindow')
                return (yield this.ExecuteFunctionShowWindow(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'closewindow')
                return (yield this.ExecuteFunctionCloseWindow(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'hidewindow')
                return (yield this.ExecuteFunctionHideWindow(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'getwindow')
                return (yield this.ExecuteFunctionGetWindow(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'setexternal')
                return (yield this.ExecuteFunctionSetExternal(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'getexternal')
                return (yield this.ExecuteFunctionGetExternal(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'setexternalframe')
                return (yield this.ExecuteFunctionSetExternalFrame(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'getexternalframe')
                return (yield this.ExecuteFunctionGetExternalFrame(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'setexternalframemessage')
                return (yield this.ExecuteFunctionSetExternalFrameMessage(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'getexternalframemessage')
                return (yield this.ExecuteFunctionGetExternalFrameMessage(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'createguid')
                return (yield this.ExecuteFunctionCreateGuid(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'createtick')
                return (yield this.ExecuteFunctionCreateTick(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'getdate')
                return (yield this.ExecuteFunctionGetDate(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'adddate')
                return (yield this.ExecuteFunctionAddDate(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'pushstack')
                return (yield this.ExecuteFunctionPushStack(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'popstack')
                return (yield this.ExecuteFunctionPopStack(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'peekstack')
                return (yield this.ExecuteFunctionPeekStack(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'execute')
                return (yield this.ExecuteFunctionExecute(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'executedataitem')
                return (yield this.ExecuteFunctionExecuteDataItem(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'executecomponentfunction')
                return (yield this.ExecuteFunctionExecuteComponentFunction(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'executeinstancefunction')
                return (yield this.ExecuteFunctionExecuteInstanceFunction(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'cast')
                return (yield this.ExecuteFunctionCast(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'encodeurl')
                return (yield this.ExecuteFunctionEncodeUrl(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'addrequestheader')
                return (yield this.ExecuteFunctionAddRequestHeader(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'getsector')
                return (yield this.ExecuteFunctionGetSector(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'getclipboard')
                return (yield this.ExecuteFunctionGetClipboard(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'setclipboard')
                return (yield this.ExecuteFunctionSetClipboard(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'createtimer')
                return (yield this.ExecuteFunctionCreateTimer(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'createreference')
                return (yield this.ExecuteFunctionCreateReference(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'wait')
                return (yield this.ExecuteFunctionWait(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'executevalidation')
                return (yield this.ExecuteFunctionExecuteValidation(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'clearvalidation')
                return (yield this.ExecuteFunctionClearValidation(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'downloaddata')
                return (yield this.ExecuteFunctionDownloadData(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'detectview')
                return (yield this.ExecuteFunctionDetectView(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'setconfig')
                return (yield this.ExecuteFunctionSetConfig(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'getconfig')
                return (yield this.ExecuteFunctionGetConfig(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'lockplumber')
                return (yield this.ExecuteFunctionLockPlumber(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'unlockplumber')
                return (yield this.ExecuteFunctionUnlockPlumber(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'lockdata')
                return (yield this.ExecuteFunctionLockData(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'unlockdata')
                return (yield this.ExecuteFunctionUnlockData(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'clearplumber')
                return (yield this.ExecuteFunctionClearPlumber(sector, contextItem, element, event, functionParsed, executionContext));
            if (functionParsed.Name === 'debugger')
                return (yield this.ExecuteFunctionDebugger(sector, contextItem, element, event, functionParsed, executionContext));
            if (!checkInvalidFunction)
                return (null);
            yield this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - ExecuteFunction - Invalid Function - {0}', functionParsed.Name);
            return ('');
        });
    }
    ExecuteFunctionExternal(contextItem, element, event, functionParsed) {
        return ('');
    }
    ExecuteFunctionSetExternal(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const externalFunction = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const isCloneText = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
            const isClone = ((isCloneText == null) || (isCloneText == '')) ? false : yield this.Application.Solver.ResolveConditional(isCloneText);
            const data = yield this.Application.Storage.RetrieveData(dataKey, sector);
            const windowFunction = window[externalFunction];
            if (typeof windowFunction !== 'function')
                return ('');
            windowFunction(isClone ? this.Application.Solver.Clone(data, true) : data);
        });
    }
    ExecuteFunctionGetExternal(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const externalFunction = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const isCloneText = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
            const isClone = ((isCloneText == null) || (isCloneText == '')) ? false : yield this.Application.Solver.ResolveConditional(isCloneText);
            const windowFunction = window[externalFunction];
            if (typeof windowFunction !== 'function')
                return ('');
            const data = windowFunction();
            yield this.Application.Storage.UpdateData(dataKey, sector, isClone ? this.Application.Solver.Clone(data, true) : data);
            return ('');
        });
    }
    ExecuteFunctionSetExternalFrame(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const frameID = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const externalFunction = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
            const isCloneText = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]);
            const isClone = ((isCloneText == null) || (isCloneText == '')) ? false : yield this.Application.Solver.ResolveConditional(isCloneText);
            const data = yield this.Application.Storage.RetrieveData(dataKey, sector);
            const frame = document.getElementById(frameID);
            if (frame == null)
                return ('');
            const frameContent = (frame.contentWindow || frame.contentDocument);
            const application = this.Application;
            let windowFunction = frameContent[externalFunction];
            if (typeof windowFunction !== 'function') {
                const eventType = 'load';
                const eventNamespace = this.Application.EventHandler.CreateEventNamespace(null, null, eventType);
                const elFrame = frame;
                this.Application.EventHandler.AttachEventListener(elFrame, eventType, eventNamespace, () => {
                    windowFunction = frameContent[externalFunction];
                    if (typeof windowFunction !== 'function')
                        return ('');
                    application.EventHandler.DetachEventListener(elFrame, eventNamespace);
                    windowFunction(isClone ? application.Solver.Clone(data, true) : data);
                });
            }
            else {
                windowFunction(isClone ? this.Application.Solver.Clone(data, true) : data);
            }
        });
    }
    ExecuteFunctionGetExternalFrame(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const frameID = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const externalFunction = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
            const isCloneText = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]);
            const isClone = ((isCloneText == null) || (isCloneText == '')) ? false : yield this.Application.Solver.ResolveConditional(isCloneText);
            const frame = document.getElementById(frameID);
            if (frame == null)
                return ('');
            const frameContent = (frame.contentWindow || frame.contentDocument);
            const windowFunction = frameContent[externalFunction];
            if (typeof windowFunction !== 'function')
                return ('');
            const data = windowFunction();
            yield this.Application.Storage.UpdateData(dataKey, sector, isClone ? this.Application.Solver.Clone(data, true) : data);
            return ('');
        });
    }
    ExecuteFunctionSetExternalFrameMessage(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const frameID = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const externalFunction = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
            const isCloneText = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]);
            const isClone = ((isCloneText == null) || (isCloneText == '')) ? false : yield this.Application.Solver.ResolveConditional(isCloneText);
            const data = yield this.Application.Storage.RetrieveData(dataKey, sector);
            const frame = document.getElementById(frameID);
            if (frame == null)
                return ('');
            const frameContent = (frame.contentWindow || frame.contentDocument);
            const message = new DrapoMessage();
            message.Action = 'set';
            message.DataKey = dataKey;
            message.Tag = externalFunction;
            message.Data = isClone ? this.Application.Solver.Clone(data, true) : data;
            const application = this.Application;
            const eventType = 'load';
            const eventNamespace = this.Application.EventHandler.CreateEventNamespace(null, null, eventType);
            const elFrame = frame;
            this.Application.EventHandler.AttachEventListener(elFrame, eventType, eventNamespace, () => {
                application.EventHandler.DetachEventListener(elFrame, eventNamespace);
                frameContent.postMessage(message, "*");
            });
        });
    }
    ExecuteFunctionGetExternalFrameMessage(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const frameID = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const externalFunction = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
            const isCloneText = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]);
            const isClone = ((isCloneText == null) || (isCloneText == '')) ? false : yield this.Application.Solver.ResolveConditional(isCloneText);
            const frame = document.getElementById(frameID);
            if (frame == null)
                return ('');
            const frameContent = (frame.contentWindow || frame.contentDocument);
            const message = new DrapoMessage();
            message.Action = 'get';
            message.DataKey = dataKey;
            message.Tag = externalFunction;
            message.Data = null;
            this.Application.Document.Message = null;
            frameContent.postMessage(message, "*");
            const messagePost = yield this.Application.Document.WaitForMessage();
            const data = messagePost != null ? messagePost._data : [];
            yield this.Application.Storage.UpdateData(dataKey, sector, isClone ? this.Application.Solver.Clone(data, true) : data);
            return ('');
        });
    }
    ExecuteFunctionToggleItemField(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
            const notifyText = functionParsed.Parameters[1];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            const stateAny = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
            const state = this.Application.Solver.ResolveConditionalBoolean(((stateAny == null) || ((typeof stateAny) === 'string')) ? stateAny : stateAny.toString());
            const stateUpdated = !state;
            yield this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, stateUpdated, notify);
            return ('');
        });
    }
    ExecuteFunctionToggleData(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const source = functionParsed.Parameters[0];
            const isSourceMustache = this.Application.Parser.IsMustache(source);
            const mustacheParts = isSourceMustache ? this.Application.Parser.ParseMustache(source) : null;
            const dataKey = mustacheParts != null ? this.Application.Solver.ResolveDataKey(mustacheParts) : source;
            const itemText = functionParsed.Parameters[1];
            let item = null;
            if (this.Application.Parser.IsMustache(itemText)) {
                const dataPath = this.Application.Parser.ParseMustache(itemText);
                item = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
            }
            else {
                if (this.Application.Storage.IsDataKey(itemText, sector)) {
                    const dataItem = yield this.Application.Storage.RetrieveDataItem(itemText, sector);
                    if (dataItem != null)
                        item = dataItem.Data;
                }
                else if (contextItem == null) {
                    item = itemText;
                }
                else {
                    const itemPath = [];
                    itemPath.push(itemText);
                    item = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, itemPath);
                }
            }
            if (item == null)
                return (null);
            const notifyText = functionParsed.Parameters[2];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.ToggleData(dataKey, mustacheParts, sector, item, notify);
            return ('');
        });
    }
    ExecuteFunctionUncheckItemField(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
            yield this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, false);
            return ('');
        });
    }
    ExecuteFunctionClearItemField(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
            const notifyText = functionParsed.Parameters[1];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, null, notify);
            return ('');
        });
    }
    ExecuteFunctionUpdateItemField(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
            for (let i = 0; i < dataPath.length; i++) {
                const dataPathValue = dataPath[i];
                if (!this.Application.Parser.HasMustache(dataPathValue))
                    continue;
                const dataPathValueResolved = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, dataPathValue);
                if (dataPathValue !== dataPathValueResolved)
                    dataPath[i] = dataPathValueResolved;
            }
            const recursiveText = functionParsed.Parameters.length > 3 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
            const recursive = ((recursiveText == null) || (recursiveText == '')) ? false : yield this.Application.Solver.ResolveConditional(recursiveText);
            const resolveText = functionParsed.Parameters.length > 4 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4]) : null;
            const resolve = ((resolveText == null) || (resolveText == '')) ? true : yield this.Application.Solver.ResolveConditional(resolveText);
            const item = resolve ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1], true, true, recursive) : functionParsed.Parameters[1];
            const notifyText = functionParsed.Parameters[2];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, item, notify);
            return ('');
        });
    }
    ExecuteFunctionCheckDataField(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            const dataFields = yield this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext);
            const notifyText = functionParsed.Parameters[2];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, true, notify);
            return ('');
        });
    }
    ExecuteFunctionUncheckDataField(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            const dataFields = yield this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext);
            const notifyText = functionParsed.Parameters[2];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, false, notify);
            return ('');
        });
    }
    ExecuteFunctionClearDataField(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            const dataFields = yield this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext);
            const notifyText = functionParsed.Parameters[2];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, null, notify);
            return ('');
        });
    }
    ExecuteFunctionUpdateDataField(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const dataFields = yield this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext);
            const recursiveText = functionParsed.Parameters.length > 4 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4]) : null;
            const recursive = ((recursiveText == null) || (recursiveText == '')) ? false : yield this.Application.Solver.ResolveConditional(recursiveText);
            const resolveText = functionParsed.Parameters.length > 5 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[5]) : null;
            const resolve = ((resolveText == null) || (resolveText == '')) ? true : yield this.Application.Solver.ResolveConditional(resolveText);
            const value = resolve ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2], true, true, recursive) : functionParsed.Parameters[2];
            const notifyText = functionParsed.Parameters.length > 3 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, notify);
            return ('');
        });
    }
    ExecuteFunctionUpdateDataFieldLookup(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const dataFieldSeek = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const valueSeek = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
            const dataField = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]);
            const valueText = functionParsed.Parameters[4];
            let value = null;
            if (this.Application.Parser.IsMustache(valueText)) {
                const dataPath = this.Application.Parser.ParseMustache(valueText);
                value = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
            }
            else {
                value = valueText;
            }
            const notifyText = functionParsed.Parameters.length > 3 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[5]) : null;
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.UpdateDataFieldLookup(dataKey, sector, dataFieldSeek, valueSeek, dataField, value, notify);
            return ('');
        });
    }
    ExecuteFunctionCheckItemField(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
            const notifyText = functionParsed.Parameters[1];
            const nofity = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, true, nofity);
            return ('');
        });
    }
    ExecuteFunctionMoveItem(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const rangeIndex = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const notifyText = functionParsed.Parameters[2];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            const dataItem = yield this.Application.Storage.RetrieveDataItem(contextItem.DataKey, sector);
            if (dataItem == null)
                return ('');
            const index = this.Application.ControlFlow.GetRangeIndex(dataItem.Data, rangeIndex);
            yield this.Application.Storage.MoveDataIndex(contextItem.DataKey, sector, contextItem.Data, index, notify);
            return ('');
        });
    }
    ExecuteFunctionUpdateDataUrl(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            const dataUrl = functionParsed.Parameters[1];
            const elDataKey = this.Application.Searcher.FindByAttributeAndValue('d-dataKey', dataKey);
            if (elDataKey == null)
                return ('');
            const dataUrlCurrent = elDataKey.getAttribute('d-dataUrlGet');
            if (dataUrl === dataUrlCurrent)
                return ('');
            elDataKey.setAttribute('d-dataUrlGet', dataUrl);
            yield this.Application.Storage.DiscardCacheData(dataKey, sector);
            yield this.Application.Observer.Notify(dataKey, null, null);
            return ('');
        });
    }
    ExecuteFunctionUpdateDataUrlSet(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            const dataUrl = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const elDataKey = this.Application.Searcher.FindByAttributeAndValue('d-dataKey', dataKey);
            if (elDataKey == null)
                return ('');
            const dataUrlCurrent = elDataKey.getAttribute('d-dataUrlSet');
            if (dataUrl === dataUrlCurrent)
                return ('');
            elDataKey.setAttribute('d-dataUrlSet', dataUrl);
            yield this.Application.Storage.DiscardCacheData(dataKey, sector);
            return ('');
        });
    }
    ExecuteFunctionAddDataItem(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const source = functionParsed.Parameters[0];
            const isSourceMustache = this.Application.Parser.IsMustache(source);
            const mustacheParts = isSourceMustache ? this.Application.Parser.ParseMustache(source) : null;
            const dataKey = mustacheParts != null ? this.Application.Solver.ResolveDataKey(mustacheParts) : source;
            const itemText = functionParsed.Parameters[1];
            let item = null;
            if (this.Application.Parser.IsMustache(itemText)) {
                const dataPath = this.Application.Parser.ParseMustache(itemText);
                item = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
            }
            else {
                if (this.Application.Storage.IsDataKey(itemText, sector)) {
                    const dataItem = yield this.Application.Storage.RetrieveDataItem(itemText, sector);
                    if (dataItem != null)
                        item = dataItem.Data;
                }
                else if (contextItem == null) {
                    item = itemText;
                }
                else {
                    const itemPath = [];
                    itemPath.push(itemText);
                    item = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, itemPath);
                }
            }
            if (item == null)
                return (null);
            const notifyText = functionParsed.Parameters[2];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            const isCloneText = functionParsed.Parameters[3];
            const isClone = ((isCloneText == null) || (isCloneText == '')) ? true : yield this.Application.Solver.ResolveConditional(isCloneText);
            yield this.Application.Storage.AddDataItem(dataKey, mustacheParts, sector, isClone ? this.Application.Solver.Clone(item) : item, notify);
        });
    }
    ExecuteFunctionRemoveDataItem(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const source = functionParsed.Parameters[0];
            const isSourceMustache = this.Application.Parser.IsMustache(source);
            const mustacheParts = isSourceMustache ? this.Application.Parser.ParseMustache(source) : null;
            const dataKey = mustacheParts != null ? this.Application.Solver.ResolveDataKey(mustacheParts) : source;
            const itemText = functionParsed.Parameters[1];
            let itemPath = [];
            if (this.Application.Parser.IsMustache(itemText)) {
                itemPath = this.Application.Parser.ParseMustache(itemText);
            }
            else {
                itemPath.push(itemText);
            }
            const item = contextItem === null ? itemText : yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, itemPath);
            if (item == null)
                return (null);
            const notifyText = functionParsed.Parameters[2];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            const deleted = contextItem === null ? yield this.Application.Storage.DeleteDataItemArray(dataKey, sector, item, notify) : yield this.Application.Storage.DeleteDataItem(dataKey, mustacheParts, sector, item, notify);
            if (!deleted)
                return (null);
        });
    }
    ExecuteFunctionRemoveDataItemLookup(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPath = functionParsed.Parameters[0];
            const dataFieldSeek = yield this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext);
            const valueSeek = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
            const notifyText = functionParsed.Parameters.length > 3 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.RemoveDataItemLookup(dataPath, sector, dataFieldSeek, valueSeek, notify);
            return ('');
        });
    }
    ExecuteFunctionContainsDataItem(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItemText = functionParsed.Parameters[1];
            let dataItemPath = [];
            const isMustache = this.Application.Parser.IsMustache(dataItemText);
            if (isMustache) {
                dataItemPath = this.Application.Parser.ParseMustache(dataItemText);
            }
            else {
                dataItemPath.push(dataItemText);
            }
            const item = ((!isMustache) && (contextItem == null)) ? dataItemText : yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataItemPath);
            const dataContainerText = functionParsed.Parameters[0];
            let dataContainerPath = [];
            if (this.Application.Parser.IsMustache(dataContainerText)) {
                dataContainerPath = this.Application.Parser.ParseMustache(dataContainerText);
            }
            else {
                dataContainerPath.push(dataContainerText);
            }
            const dataKeyContainer = dataContainerPath[0];
            const storageItem = yield this.Application.Storage.RetrieveDataItem(dataKeyContainer, sector);
            if (storageItem == null)
                return ('false');
            const contextContainer = new DrapoContext();
            for (let i = 0; i < storageItem.Data.length; i++) {
                const dataContainer = storageItem.Data[i];
                const containerItem = contextContainer.Create(dataContainer, null, null, dataKeyContainer, dataKeyContainer, null, i);
                const itemContainer = yield this.Application.Solver.ResolveItemDataPathObject(sector, containerItem, dataContainerPath);
                if (item == itemContainer)
                    return ('true');
            }
            return ('false');
        });
    }
    ExecuteFunctionUpdateSector(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            let title = null;
            if (functionParsed.Parameters.length >= 3)
                title = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
            const canRouteText = functionParsed.Parameters[3];
            const canRoute = ((canRouteText == null) || (canRouteText == '')) ? true : yield this.Application.Solver.ResolveConditional(canRouteText);
            const canLoadDefaultSectorsText = functionParsed.Parameters.length >= 4 ? functionParsed.Parameters[4] : null;
            const canLoadDefaultSectors = ((canLoadDefaultSectorsText == null) || (canLoadDefaultSectorsText == '')) ? false : yield this.Application.Solver.ResolveConditional(canLoadDefaultSectorsText);
            const containerText = functionParsed.Parameters.length >= 5 ? functionParsed.Parameters[5] : null;
            let container = null;
            if (containerText !== null) {
                if (this.Application.Parser.IsMustache(containerText)) {
                    const dataPath = this.Application.Parser.ParseMustache(containerText);
                    let item = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
                    if ((item === null) || (item === '')) {
                        item = this.Application.Document.CreateGuid();
                        yield this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, item);
                    }
                    container = item.toString();
                }
                else {
                    container = containerText;
                }
            }
            const sectorName = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const url = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            this.Application.Document.StartUpdate(sectorName);
            yield this.Application.Document.LoadChildSector(sectorName, url, title, canRoute, canLoadDefaultSectors, container);
            return ('');
        });
    }
    ExecuteFunctionSwitchSector(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectorName = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const container = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            yield this.Application.SectorContainerHandler.Switch(sectorName, container);
            return ('');
        });
    }
    ExecuteFunctionReloadSector(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectorName = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const url = this.Application.Router.GetLastRouteUrlBySector(sectorName);
            if (url == null)
                return ('');
            this.Application.Document.StartUpdate(sectorName);
            yield this.Application.Document.LoadChildSector(sectorName, url);
            return ('');
        });
    }
    ExecuteFunctionClearSector(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectorName = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            this.Application.Document.StartUpdate(sectorName);
            yield this.Application.SectorContainerHandler.Switch(sectorName, null);
            return ('');
        });
    }
    ExecuteFunctionLoadSectorContent(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectorName = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const content = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const contentText = this.Application.Serializer.SerializeObject(content);
            this.Application.Document.StartUpdate(sectorName);
            yield this.Application.Document.LoadChildSectorContent(sectorName, contentText);
            return ('');
        });
    }
    ExecuteFunctionClearData(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            const notifyText = functionParsed.Parameters[1];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.ClearData(dataKey, sector, notify);
            return ('');
        });
    }
    ExecuteFunctionUnloadData(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            const notifyText = functionParsed.Parameters[1];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.UnloadData(dataKey, sector);
            return ('');
        });
    }
    ExecuteFunctionCreateData(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            const notifyText = functionParsed.Parameters[1];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            const object = {};
            for (let i = 2; i < functionParsed.Parameters.length - 1; i = i + 2) {
                const windowParameter = [null, null];
                const key = contextItem != null ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i]) : functionParsed.Parameters[i];
                const value = contextItem != null ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i + 1]) : functionParsed.Parameters[i + 1];
                object[key] = value;
            }
            yield this.Application.Storage.UpdateData(dataKey, sector, object, notify);
            return ('');
        });
    }
    ExecuteFunctionUpdateData(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            const recursiveText = functionParsed.Parameters.length > 3 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
            const recursive = ((recursiveText == null) || (recursiveText == '')) ? true : yield this.Application.Solver.ResolveConditional(recursiveText);
            const resolveText = functionParsed.Parameters.length > 4 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4]) : null;
            const resolve = ((resolveText == null) || (resolveText == '')) ? true : yield this.Application.Solver.ResolveConditional(resolveText);
            const value = functionParsed.Parameters[1];
            const dataSource = resolve ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, value, true, recursive) : value;
            const data = this.Application.Solver.Clone(dataSource, true);
            const notifyText = functionParsed.Parameters[2];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.UpdateData(dataKey, sector, data, notify);
            return ('');
        });
    }
    ExecuteFunctionReloadData(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            const notifyText = functionParsed.Parameters[1];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.ReloadData(dataKey, sector, notify);
            return ('');
        });
    }
    ExecuteFunctionFilterData(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            if (functionParsed.Parameters.length < 3)
                return ('');
            const forText = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const ifText = functionParsed.Parameters[1];
            const dataKeyDestination = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
            const notifyText = functionParsed.Parameters[3];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            const hasIfText = (ifText != null);
            const parsedFor = this.Application.Parser.ParseFor(forText);
            if (parsedFor == null)
                return ('');
            const context = new DrapoContext();
            const key = parsedFor[0];
            const dataKeyIteratorRange = parsedFor[2];
            const range = this.Application.ControlFlow.GetIteratorRange(dataKeyIteratorRange);
            const dataKeyIterator = range == null ? dataKeyIteratorRange : this.Application.ControlFlow.CleanIteratorRange(dataKeyIteratorRange);
            const dataKey = dataKeyIterator;
            const dataKeyIteratorParts = this.Application.Parser.ParseForIterable(dataKeyIterator);
            const dataItem = yield this.Application.Storage.Retrieve(dataKey, sector, context, dataKeyIteratorParts);
            if (dataItem == null)
                return ('');
            const datasFiltered = [];
            let datas = dataItem.Data;
            if (datas == null)
                return ('');
            if (!datas.length)
                datas = this.Application.Solver.TransformObjectIntoArray(datas);
            if (range !== null)
                datas = this.Application.ControlFlow.ApplyRange(datas, range);
            if ((datas.length !== null) && (datas.length === 0))
                return ('');
            for (let j = 0; j < datas.length; j++) {
                const data = datas[j];
                const item = context.Create(data, null, null, dataKey, key, null, j);
                if (hasIfText) {
                    const conditional = yield this.Application.Solver.ResolveConditional(ifText, null, sector, context);
                    if (!conditional) {
                        context.Pop();
                        continue;
                    }
                }
                datasFiltered.push(data);
            }
            yield this.Application.Storage.UpdateData(dataKeyDestination, sector, datasFiltered, notify);
            return ('');
        });
    }
    ExecuteFunctionHasDataChanges(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameterSector = functionParsed.Parameters.length <= 0 ? null : yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            if (parameterSector === '=')
                parameterSector = sector;
            const parameterDataKeyOrDataGroup = functionParsed.Parameters.length <= 1 ? null : yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const storageItems = this.Application.Storage.RetrieveStorageItemsCached(parameterSector, parameterDataKeyOrDataGroup);
            for (let i = 0; i < storageItems.length; i++) {
                const storageItem = storageItems[i];
                if (storageItem.HasChanges)
                    return ('true');
            }
            return ('false');
        });
    }
    ExecuteFunctionAcceptDataChanges(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            let parameterSector = functionParsed.Parameters.length <= 0 ? null : yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            if (parameterSector === '=')
                parameterSector = sector;
            const parameterDataKeyOrDataGroup = functionParsed.Parameters.length <= 1 ? null : yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const storageItems = this.Application.Storage.RetrieveStorageItemsCached(parameterSector, parameterDataKeyOrDataGroup);
            for (let i = 0; i < storageItems.length; i++) {
                const storageItem = storageItems[i];
                if (storageItem.HasChanges)
                    storageItem.HasChanges = false;
            }
            return ('');
        });
    }
    ExecuteFunctionPostData(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            let dataKeyResponse = functionParsed.Parameters[1];
            if (dataKeyResponse == null)
                dataKeyResponse = dataKey;
            const notifyText = functionParsed.Parameters[2];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.PostData(dataKey, sector, dataKeyResponse, notify, executionContext);
            return ('');
        });
    }
    ExecuteFunctionPostDataItem(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = functionParsed.Parameters[0];
            let dataKeyResponse = functionParsed.Parameters[1];
            if (dataKeyResponse == null)
                dataKeyResponse = dataKey;
            const notifyText = functionParsed.Parameters[2];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.PostDataItem(dataKey, sector, dataKeyResponse, notify, executionContext);
            return ('');
        });
    }
    ExecuteFunctionReloadPage(sector, contextItem, element, event, functionParsed) {
        window.location.reload();
        return ('');
    }
    ExecuteFunctionClosePage(sector, contextItem, element, event, functionParsed) {
        window.location.href = "about:blank";
        return ('');
    }
    ExecuteFunctionRedirectPage(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const urlResolved = this.Application.Server.ResolveUrl(url);
            window.location.href = urlResolved;
            return ('');
        });
    }
    ExecuteFunctionUpdateURL(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            yield this.Application.Router.UpdateURL(url);
            return ('');
        });
    }
    ExecuteFunctionUpdateToken(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            yield this.Application.Server.SetToken(token);
            return ('');
        });
    }
    ExecuteFunctionClearToken(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Application.Server.SetToken(null);
            return ('');
        });
    }
    ExecuteFunctionHasToken(sector, contextItem, element, event, functionParsed, executionContext) {
        return (this.Application.Server.HasToken().toString());
    }
    ExecuteFunctionUpdateTokenAntiforgery(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            yield this.Application.Server.SetTokenAntiforgery(token);
            return ('');
        });
    }
    ExecuteFunctionDestroyContainer(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemText = functionParsed.Parameters[0];
            let containerCode = null;
            if (this.Application.Parser.IsMustache(itemText)) {
                const dataPath = this.Application.Parser.ParseMustache(itemText);
                containerCode = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
            }
            else {
                containerCode = itemText;
            }
            this.Application.SectorContainerHandler.RemoveByContainer(containerCode);
            return ('');
        });
    }
    ExecuteFunctionIf(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const conditional = functionParsed.Parameters[0];
            const context = new DrapoContext(contextItem);
            const conditionalResult = yield this.Application.Solver.ResolveConditional(conditional, element, sector, context, null, null, executionContext, false);
            if (conditionalResult) {
                const statementTrue = functionParsed.Parameters[1];
                yield this.ResolveFunctionContext(sector, contextItem, element, event, statementTrue, executionContext);
            }
            else if (functionParsed.Parameters.length > 2) {
                const statementFalse = functionParsed.Parameters[2];
                yield this.ResolveFunctionContext(sector, contextItem, element, event, statementFalse, executionContext);
            }
            return ('');
        });
    }
    ExecuteFunctionAsync(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = functionParsed.Parameters[0];
            const executionContextContent = this.CreateExecutionContext(false);
            this.ResolveFunctionContext(sector, contextItem, element, event, content, executionContextContent);
            return ('');
        });
    }
    ExecuteFunctionNotify(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const dataIndex = this.Application.Parser.GetStringAsNumber(yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]));
            const dataFields = yield this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[2], executionContext);
            const canUseDifferenceText = functionParsed.Parameters.length > 3 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
            const canUseDifference = ((canUseDifferenceText == null) || (canUseDifferenceText == '')) ? true : yield this.Application.Solver.ResolveConditional(canUseDifferenceText);
            yield this.Application.Observer.Notify(dataKey, dataIndex, dataFields, canUseDifference);
            return ('');
        });
    }
    ExecuteFunctionFocus(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const did = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            if ((did === null) || (did === '') || (did === undefined)) {
                const elementFocused = document.activeElement;
                elementFocused.blur();
                return ('');
            }
            const elDid = this.Application.Searcher.FindLastByAttributeAndValue('d-id', did);
            if (elDid === null)
                return ('');
            const isSelectText = functionParsed.Parameters[1];
            const isSelect = ((isSelectText == null) || (isSelectText == '')) ? true : yield this.Application.Solver.ResolveConditional(isSelectText);
            elDid.focus();
            if (isSelect)
                this.Application.Document.Select(elDid);
            return ('');
        });
    }
    ExecuteFunctionShowWindow(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const windowParameters = [];
            let windowNameOrUri = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const isUri = this.Application.Parser.IsUri(windowNameOrUri);
            if (isUri)
                windowNameOrUri = yield this.Application.Storage.ResolveDataUrlMustaches(null, sector, windowNameOrUri, executionContext);
            const did = isUri ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : null;
            for (let i = isUri ? 2 : 1; i < functionParsed.Parameters.length - 1; i = i + 2) {
                const windowParameter = [null, null];
                windowParameter[0] = contextItem != null ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i]) : functionParsed.Parameters[i];
                windowParameter[1] = contextItem != null ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i + 1]) : functionParsed.Parameters[i + 1];
                windowParameters.push(windowParameter);
            }
            if (isUri)
                yield this.Application.WindowHandler.CreateAndShowWindow(windowNameOrUri, did, windowParameters);
            else
                yield this.Application.WindowHandler.CreateAndShowWindowDefinition(windowNameOrUri, windowParameters);
            return ('');
        });
    }
    ExecuteFunctionCloseWindow(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const did = functionParsed.Parameters.length > 0 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0], false, true) : null;
            if ((did === '') && (functionParsed.Parameters.length > 0) && (this.Application.Parser.HasFunction(functionParsed.Parameters[0])))
                return ('');
            const allText = functionParsed.Parameters.length > 1 ? functionParsed.Parameters[1] : 'false';
            const all = yield this.Application.Solver.ResolveConditional(allText);
            const type = functionParsed.Parameters.length > 2 ? functionParsed.Parameters[2] : null;
            yield this.Application.WindowHandler.CloseWindow(did, all, type);
            return ('');
        });
    }
    ExecuteFunctionHideWindow(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const did = functionParsed.Parameters.length > 0 ? functionParsed.Parameters[0] : null;
            const allText = functionParsed.Parameters.length > 1 ? functionParsed.Parameters[1] : 'false';
            const all = yield this.Application.Solver.ResolveConditional(allText);
            const type = functionParsed.Parameters.length > 2 ? functionParsed.Parameters[2] : null;
            const window = yield this.Application.WindowHandler.HideWindow(did, all);
            if (window !== null) {
                if (type !== 'noclose')
                    executionContext.AddWindowAutoClose(window);
            }
            return ('');
        });
    }
    ExecuteFunctionGetWindow(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const window = this.Application.WindowHandler.GetWindowByElement(element);
            if (window !== null)
                return (window.Code);
            return ('');
        });
    }
    ExecuteFunctionCreateGuid(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = this.Application.Document.CreateGuid();
            if (functionParsed.Parameters.length == 0)
                return (value);
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const dataField = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const notifyText = functionParsed.Parameters.length > 2 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]) : null;
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.SetDataKeyField(dataKey, sector, [dataField], value, notify);
            return ('');
        });
    }
    ExecuteFunctionCreateTick(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticks = new Date().getTime();
            const value = ticks.toString();
            if (functionParsed.Parameters.length == 0)
                return (value);
            const mustacheText = functionParsed.Parameters[0];
            const mustache = this.Application.Parser.ParseMustache(mustacheText);
            const dataKey = this.Application.Solver.ResolveDataKey(mustache);
            const dataFields = this.Application.Solver.ResolveDataFields(mustache);
            const notifyText = functionParsed.Parameters.length > 1 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : null;
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, notify);
            return (value);
        });
    }
    ExecuteFunctionGetDate(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            const returnType = functionParsed.Parameters.length > 0 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]) : 'date';
            if (returnType.toUpperCase() == 'ISO')
                return (date.toISOString());
            return date;
        });
    }
    ExecuteFunctionAddDate(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateParameter = functionParsed.Parameters.length > 0 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]) : null;
            const dateParameterParsed = this.Application.Parser.ParseDateCulture(dateParameter);
            const date = (dateParameterParsed != null) ? dateParameterParsed : new Date();
            const typeParameter = functionParsed.Parameters.length > 1 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : 'day';
            const type = typeParameter != null ? typeParameter : 'day';
            const incrementParameter = functionParsed.Parameters.length > 2 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]) : '1';
            const increment = this.Application.Parser.ParseNumber(incrementParameter, 1);
            if (type === 'day')
                date.setDate(date.getDate() + increment);
            else if (type === 'month')
                date.setMonth(date.getMonth() + increment);
            if (type === 'year')
                date.setFullYear(date.getFullYear() + increment);
            const returnType = functionParsed.Parameters.length > 3 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : 'date';
            if (returnType.toUpperCase() == 'ISO')
                return (date.toISOString());
            return date;
        });
    }
    ExecuteFunctionPushStack(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            executionContext.Stack.Push(value);
            return ('');
        });
    }
    ExecuteFunctionPopStack(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = executionContext.Stack.Pop();
            if (functionParsed.Parameters.length == 0)
                return (value);
            const mustacheText = functionParsed.Parameters[0];
            const mustache = this.Application.Parser.ParseMustache(mustacheText);
            const dataKey = this.Application.Solver.ResolveDataKey(mustache);
            const dataFields = this.Application.Solver.ResolveDataFields(mustache);
            const notifyText = functionParsed.Parameters.length > 1 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : null;
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, notify);
            return (value);
        });
    }
    ExecuteFunctionPeekStack(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = executionContext.Stack.Peek();
            if (functionParsed.Parameters.length == 0)
                return (value);
            const mustacheText = functionParsed.Parameters[0];
            const mustache = this.Application.Parser.ParseMustache(mustacheText);
            const dataKey = this.Application.Solver.ResolveDataKey(mustache);
            const dataFields = this.Application.Solver.ResolveDataFields(mustache);
            const notifyText = functionParsed.Parameters.length > 1 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : null;
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, notify);
            return (value);
        });
    }
    ExecuteFunctionExecute(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectorFunction = functionParsed.Parameters.length > 1 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : sector;
            const valueFunction = yield this.ResolveFunctionParameter(sectorFunction, contextItem, element, executionContext, functionParsed.Parameters[0]);
            yield this.ResolveFunctionContext(sectorFunction, contextItem, element, event, valueFunction, executionContext);
            return ('');
        });
    }
    ExecuteFunctionExecuteDataItem(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const expression = functionParsed.Parameters[0];
            const forText = yield functionParsed.Parameters[1];
            const ifText = functionParsed.Parameters.length > 2 ? functionParsed.Parameters[2] : null;
            const hasIfText = (ifText != null);
            const allText = functionParsed.Parameters.length > 3 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
            const all = ((allText == null) || (allText == '')) ? !hasIfText : yield this.Application.Solver.ResolveConditional(allText);
            const parsedFor = this.Application.Parser.ParseFor(forText);
            if (parsedFor == null)
                return ('');
            const forHierarchyText = yield functionParsed.Parameters[4];
            const context = new DrapoContext();
            const key = parsedFor[0];
            const dataKeyIteratorRange = parsedFor[2];
            const range = this.Application.ControlFlow.GetIteratorRange(dataKeyIteratorRange);
            const dataKeyIterator = range == null ? dataKeyIteratorRange : this.Application.ControlFlow.CleanIteratorRange(dataKeyIteratorRange);
            const dataKeyIteratorParts = this.Application.Parser.ParseForIterable(dataKeyIterator);
            const dataKey = dataKeyIteratorParts[0];
            const dataItem = yield this.Application.Storage.Retrieve(dataKey, sector, context, dataKeyIteratorParts);
            if (dataItem == null)
                return ('');
            let datas = (dataKeyIteratorParts.length > 1) ? this.Application.Solver.ResolveDataObjectPathObject(dataItem.Data, dataKeyIteratorParts) : dataItem.Data;
            if (datas == null)
                return ('');
            if (!datas.length)
                datas = this.Application.Solver.TransformObjectIntoArray(datas);
            if (range !== null)
                datas = this.Application.ControlFlow.ApplyRange(datas, range);
            if ((datas.length !== null) && (datas.length === 0))
                return ('');
            const ifTextResolved = this.ResolveExecutionContextMustache(sector, executionContext, ifText);
            yield this.Application.ControlFlow.ExecuteDataItem(sector, context, expression, dataKeyIterator, forHierarchyText, ifTextResolved, all, datas, dataKey, key, executionContext);
            return ('');
        });
    }
    ExecuteFunctionExecuteComponentFunction(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const did = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            if (did == null)
                return ('');
            const instance = this.Application.ComponentHandler.GetComponentInstance(sector, did);
            if (instance == null)
                return ('');
            const functionName = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const instanceFunction = instance[functionName];
            if (instanceFunction == null)
                return ('');
            const parameters = [];
            for (let i = 2; i < functionParsed.Parameters.length; i++)
                parameters.push(yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i]));
            const result = instanceFunction.apply(instance, parameters);
            if (Promise.resolve(result) == result) {
                const resultPromise = result;
                yield resultPromise;
                return ('');
            }
            return ('');
        });
    }
    ExecuteFunctionExecuteInstanceFunction(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const instanceSectorParameter = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const instanceSector = ((instanceSectorParameter == null) || (instanceSectorParameter == '')) ? sector : instanceSectorParameter;
            const instance = this.Application.ComponentHandler.GetComponentInstance(instanceSector);
            if (instance == null)
                return ('');
            const functionName = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const instanceFunction = instance[functionName];
            if (instanceFunction == null)
                return ('');
            const parameters = [];
            for (let i = 3; i < functionParsed.Parameters.length; i++)
                parameters.push(yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i]));
            const result = instanceFunction.apply(instance, parameters);
            let value = result;
            if (Promise.resolve(result) == result) {
                const resultPromise = result;
                value = yield resultPromise;
            }
            const mustacheReturn = functionParsed.Parameters[2];
            if ((mustacheReturn !== null) && (mustacheReturn !== '')) {
                const dataPath = this.Application.Parser.ParseMustache(mustacheReturn);
                if (dataPath.length === 1)
                    yield this.Application.Storage.UpdateData(dataPath[0], sector, value, true);
                else
                    yield this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, value, true);
            }
            return ('');
        });
    }
    ExecuteFunctionCast(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = contextItem != null ? contextItem.Context : new DrapoContext();
            const value = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, executionContext, functionParsed.Parameters[0], null, false);
            const type = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            if (type === 'number')
                return (this.Application.Parser.ParseNumberBlock(value));
            return (value);
        });
    }
    ExecuteFunctionEncodeUrl(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = contextItem != null ? contextItem.Context : new DrapoContext();
            const value = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, executionContext, functionParsed.Parameters[0], null, false);
            const valueEncoded = this.Application.Server.EnsureUrlComponentEncoded(value);
            return (valueEncoded);
        });
    }
    ExecuteFunctionAddRequestHeader(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = new DrapoContext();
            const name = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const value = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            this.Application.Server.AddNextRequestHeader(name, value);
            return ('');
        });
    }
    ExecuteFunctionSetClipboard(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            yield this.Application.Document.SetClipboard(value);
            return ('');
        });
    }
    ExecuteFunctionCreateTimer(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = functionParsed.Parameters[0];
            const time = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const loopText = functionParsed.Parameters[2];
            const loop = ((loopText == null) || (loopText == '')) ? false : yield this.Application.Solver.ResolveConditional(loopText);
            const timeAsNumber = this.Application.Parser.ParseNumber(time, 0);
            const executionContextContent = this.CreateExecutionContext(false);
            const timerFunction = () => {
                this.ResolveFunctionContext(sector, contextItem, element, event, content, executionContextContent);
                if (loop)
                    setTimeout(timerFunction, timeAsNumber);
            };
            setTimeout(timerFunction, timeAsNumber);
            return ('');
        });
    }
    ExecuteFunctionCreateReference(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = functionParsed.Parameters[0];
            const mustacheReference = yield this.Application.Solver.CreateMustacheReference(sector, contextItem, value);
            return (mustacheReference);
        });
    }
    ExecuteFunctionWait(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const time = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const timeAsNumber = this.Application.Parser.ParseNumber(time, 0);
            yield this.Application.Document.Sleep(timeAsNumber);
            return ('');
        });
    }
    ExecuteFunctionDownloadData(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKeyFile = functionParsed.Parameters[0];
            const storageItem = yield this.Application.Storage.RetrieveDataItemContext(dataKeyFile, sector, executionContext);
            if (storageItem === null)
                return ('');
            const namePath = this.Application.Solver.CreateDataPath(dataKeyFile, ['filename']);
            const name = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, namePath, true);
            const dataPath = this.Application.Solver.CreateDataPath(dataKeyFile, ['body']);
            const data = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath, true);
            const contentTypePath = this.Application.Solver.CreateDataPath(dataKeyFile, ['contenttype']);
            const contentType = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, contentTypePath, true);
            this.DownloadData(name, data, contentType);
            return ('');
        });
    }
    DownloadData(name, data, contentType) {
        const blob = this.CreateBlob(data, contentType);
        const navigator = window.navigator;
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, name);
        }
        else {
            const elDownloader = document.createElement('a');
            elDownloader.href = window.URL.createObjectURL(blob);
            elDownloader.download = name;
            elDownloader.style.display = 'none';
            document.body.appendChild(elDownloader);
            elDownloader.click();
            document.body.removeChild(elDownloader);
        }
    }
    CreateBlob(data, contentType) {
        if (data instanceof Blob)
            return (data);
        const dataCharacters = atob(data);
        const dataBytes = new Array(dataCharacters.length);
        for (let i = 0; i < dataCharacters.length; i++) {
            dataBytes[i] = dataCharacters.charCodeAt(i);
        }
        const bytes = new Uint8Array(dataBytes);
        const blob = new Blob([bytes], { type: contentType });
        return (blob);
    }
    ExecuteFunctionDetectView(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const views = yield this.Application.Config.GetViews();
            if (views == null)
                return ('');
            const context = new DrapoContext();
            for (let i = 0; i < views.length; i++) {
                const view = views[i];
                if (view.Condition == null)
                    return (view.Tag);
                if (yield this.Application.Solver.ResolveConditional(view.Condition, null, sector, context))
                    return (view.Tag);
            }
            return ('');
        });
    }
    ExecuteFunctionSetConfig(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const value = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
            const valueAsNumber = this.Application.Parser.ParseNumber(value, 0);
            const keyLower = key.toLowerCase();
            if (keyLower === 'timezone')
                this.Application.Config.SetTimezone(valueAsNumber);
            return ('');
        });
    }
    ExecuteFunctionGetConfig(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const keyLower = key.toLowerCase();
            if (keyLower === 'timezone') {
                const timeZone = this.Application.Config.GetTimezone();
                if (timeZone != null)
                    return (timeZone.toString());
            }
            return ('');
        });
    }
    ExecuteFunctionLockPlumber(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Application.Plumber.Lock();
            return ('');
        });
    }
    ExecuteFunctionUnlockPlumber(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Application.Plumber.Unlock();
            return ('');
        });
    }
    ExecuteFunctionLockData(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            this.Application.Observer.Lock(dataKey);
            return ('');
        });
    }
    ExecuteFunctionUnlockData(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
            const notifyText = functionParsed.Parameters.length > 1 ? yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : null;
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            yield this.Application.Observer.Unlock(dataKey, notify);
            return ('');
        });
    }
    ExecuteFunctionClearPlumber(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Application.Plumber.Clear();
            return ('');
        });
    }
    ExecuteFunctionDebugger(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const parameters = [];
            for (let i = 0; i < functionParsed.Parameters.length; i++)
                parameters.push(yield this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i], true, true, true));
            yield this.Application.Debugger.ExecuteFunctionDebugger(parameters);
            return ('');
        });
    }
    ExecuteFunctionGetSector(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            return (this.Application.Document.GetSector(element));
        });
    }
    ExecuteFunctionGetClipboard(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPath = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
            const notifyText = functionParsed.Parameters[1];
            const notify = ((notifyText == null) || (notifyText == '')) ? true : yield this.Application.Solver.ResolveConditional(notifyText);
            const value = yield this.Application.Document.GetClipboard();
            yield this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, value, notify);
            return ('');
        });
    }
    ExecuteFunctionExecuteValidation(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = functionParsed.Parameters[0];
            const isValid = yield this.Application.Validator.IsValidationExpressionValid(element, sector, validation, contextItem);
            return (isValid ? 'true' : 'false');
        });
    }
    ExecuteFunctionClearValidation(sector, contextItem, element, event, functionParsed, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = functionParsed.Parameters[0];
            yield this.Application.Validator.UncheckValidationExpression(element, sector, validation, contextItem);
            return ('');
        });
    }
    HasFunctionMustacheContext(functionsValue, sector, renderContext) {
        return __awaiter(this, void 0, void 0, function* () {
            let hasContext = renderContext.HasExpressionContext(sector, functionsValue);
            if (hasContext !== null)
                return (hasContext);
            hasContext = yield this.HasFunctionMustacheContextInternal(functionsValue, sector);
            renderContext.AddExpressionContext(sector, functionsValue, hasContext);
            return (hasContext);
        });
    }
    HasFunctionMustacheContextInternal(functionsValue, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.HasFunctionsContext(functionsValue))
                return (true);
            if (!this.Application.Parser.IsMustache(functionsValue))
                return (this.Application.Barber.HasMustacheContext(functionsValue, sector));
            const mustaches = this.Application.Parser.ParseMustaches(functionsValue);
            for (let j = 0; j < mustaches.length; j++) {
                const mustache = mustaches[j];
                const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                const dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                if (!this.Application.Storage.IsDataKey(dataKey, null))
                    return (true);
                const value = this.Application.Storage.GetDataKeyField(dataKey, sector, mustacheParts);
                if (value == null) {
                    yield this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - HasFunctionMustacheContext - Null Mustache - {0}', mustache);
                    return (false);
                }
                if (yield this.HasFunctionMustacheContextInternal(value, sector))
                    return (true);
            }
            return (false);
        });
    }
    HasFunctionsContext(functionsValue) {
        const functionsParsed = this.Application.Parser.ParseFunctions(functionsValue);
        for (let i = 0; i < functionsParsed.length; i++) {
            const functionParse = functionsParsed[i];
            const functionParsed = this.Application.Parser.ParseFunction(functionParse);
            if (functionParsed === null)
                continue;
            if (this.IsFunctionContext(functionParsed))
                return (true);
        }
        return (false);
    }
    GetFunctionsContext() {
        const functions = [];
        functions.push('removedataitem');
        return (functions);
    }
    IsFunctionContext(functionParsed) {
        const functions = this.GetFunctionsContext();
        if (this.Application.Solver.Contains(functions, functionParsed.Name))
            return (true);
        return (false);
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoGlobalization {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._culture = null;
        this._resourceDayOfWeekNameShort = [];
        this._resourceDayOfWeekName = [];
        this._resourceMonthNameShort = [];
        this._resourceMonthName = [];
        this._resourceDateFormat = [];
        this._resourceNumberSizeType = [];
        this._application = application;
        this.Initialize();
    }
    Initialize() {
        this.InitializeResource(this._resourceDayOfWeekNameShort, 'en', 'Sun_Mon_Tue_Wed_Thu_Fri_Sat');
        this.InitializeResource(this._resourceDayOfWeekName, 'en', 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday');
        this.InitializeResource(this._resourceMonthNameShort, 'en', 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec');
        this.InitializeResource(this._resourceMonthName, 'en', 'January_February_March_April_May_June_July_August_September_October_November_December');
        this.InitializeResource(this._resourceDayOfWeekNameShort, 'pt', 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb');
        this.InitializeResource(this._resourceDayOfWeekName, 'pt', 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado');
        this.InitializeResource(this._resourceMonthNameShort, 'pt', 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez');
        this.InitializeResource(this._resourceMonthName, 'pt', 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro');
        this.InitializeResource(this._resourceDayOfWeekNameShort, 'es', 'dom_lun_mar_mié_jue_vie_sáb');
        this.InitializeResource(this._resourceDayOfWeekName, 'es', 'domingo_lunes_martes_miércoles_jueves_viernes_sábado');
        this.InitializeResource(this._resourceMonthNameShort, 'es', 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic');
        this.InitializeResource(this._resourceMonthName, 'es', 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre');
        this.InitializeResourceDictionary(this._resourceDateFormat, 'en', [['d', 'MM/dd/yyyy'], ['D', 'dddd, dd MMMM yyyy'], ['t', 'HH:mm'], ['T', 'HH:mm:ss'], ['g', 'MM/dd/yyyy HH:mm'], ['G', 'MM/dd/yyyy HH:mm:ss'], ['r', 'ddd, dd MMM yyyy HH:mm:ss']]);
        this.InitializeResourceDictionary(this._resourceDateFormat, 'pt', [['d', 'dd/MM/yyyy'], ['D', 'dddd, dd MMMM yyyy'], ['t', 'HH:mm'], ['T', 'HH:mm:ss'], ['g', 'dd/MM/yyyy HH:mm'], ['G', 'dd/MM/yyyy HH:mm:ss'], ['r', 'ddd, dd MMM yyyy HH:mm:ss']]);
        this.InitializeResourceDictionary(this._resourceDateFormat, 'es', [['d', 'dd/MM/yyyy'], ['D', 'dddd, dd MMMM yyyy'], ['t', 'HH:mm'], ['T', 'HH:mm:ss'], ['g', 'dd/MM/yyyy HH:mm'], ['G', 'dd/MM/yyyy HH:mm:ss'], ['r', 'ddd, dd MMM yyyy HH:mm:ss']]);
        this.InitializeResource(this._resourceNumberSizeType, 'pt', '_mil_mi_bi_tri');
        this.InitializeResource(this._resourceNumberSizeType, 'en', '_K_M_B_T');
        this.InitializeResource(this._resourceNumberSizeType, 'es', '_K_M_B_T');
    }
    InitializeResource(resource, culture, values) {
        resource.push([culture, values.split('_')]);
    }
    InitializeResourceDictionary(resource, culture, values) {
        resource.push([culture, values]);
    }
    GetLanguage() {
        if (navigator.language != null)
            return (navigator.language);
        return (navigator.userLanguage);
    }
    GetCultureNeutral(culture) {
        const index = culture.indexOf('-');
        if (index < 0)
            return (culture);
        return (culture.substring(0, index));
    }
    GetCultureCookie() {
        const cookieData = this.Application.CookieHandler.RetrieveData();
        if (cookieData == null)
            return ('');
        return (cookieData.culture);
    }
    GetCultureLanguage() {
        const language = this.GetLanguage();
        if (language == null)
            return (null);
        const cultureNeutral = this.GetCultureNeutral(language);
        return (cultureNeutral);
    }
    ReloadCulture() {
        return __awaiter(this, void 0, void 0, function* () {
            const culture = this._culture;
            this._culture = null;
            if (culture === this.GetCulture())
                return (false);
            return (true);
        });
    }
    GetCulture() {
        if (this._culture !== null)
            return (this._culture);
        const cultureCookie = this.GetCultureCookie();
        if ((cultureCookie != null) && (cultureCookie != ''))
            return (this._culture = cultureCookie);
        const cultureLanguage = this.GetCultureLanguage();
        if ((cultureLanguage != null) && (cultureLanguage != ''))
            return (this._culture = cultureLanguage);
        this._culture = 'en';
        return (this._culture);
    }
    GetDelimiterDecimal(culture) {
        if (culture == null)
            culture = this.GetCulture();
        if (culture === 'en')
            return ('.');
        return (',');
    }
    GetDelimiterThousands(culture) {
        if (culture == null)
            culture = this.GetCulture();
        if (culture === 'en')
            return (',');
        return ('.');
    }
    GetDayOfWeekNameShort(day, culture) {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceDayOfWeekNameShort, day, culture));
    }
    GetDayOfWeekName(day, culture) {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceDayOfWeekName, day, culture));
    }
    GetMonthNameShort(day, culture) {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceMonthNameShort, day, culture));
    }
    GetMonthName(day, culture) {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceMonthName, day, culture));
    }
    GetResourceValue(resource, index, culture) {
        const resourceCulture = this.GetResourceCulture(resource, culture);
        if (resourceCulture === null)
            return ('');
        if (resourceCulture.length < index)
            return ('');
        return (resourceCulture[index]);
    }
    GetResourceCulture(resource, culture) {
        if (culture == null)
            culture = this.GetCulture();
        for (let i = 0; i < resource.length; i++) {
            const resourceEntry = resource[i];
            if (resourceEntry[0] === culture)
                return (resourceEntry[1]);
        }
        return (null);
    }
    GetDateFormat(dateFormatType, culture) {
        const dateFormatDictionary = this.GetResourceCultureDictionary(this._resourceDateFormat, culture);
        if (dateFormatDictionary == null)
            return ('');
        return (this.GetResourceValueDictionary(dateFormatDictionary, dateFormatType));
    }
    GetDateFormatsRegex(culture = null) {
        if (culture == null)
            culture = this.GetCulture();
        const formats = [this.GetDateFormat('d', culture)];
        let formatsRegex = '';
        for (let i = 0; i < formats.length; i++) {
            const format = formats[i];
            const formatRegex = this.GetDateFormatRegex(format);
            if (formatsRegex.length > 0)
                formatsRegex += '|';
            formatsRegex += '(' + formatRegex + ')';
        }
        return ('^' + formatsRegex + '$');
    }
    GetDateFormatRegex(format) {
        format = format.replace(/\//g, '\\/');
        format = this.ReplaceDataFormatRegex(format, 'yyyy', 'year', '(\\d{4})');
        format = this.ReplaceDataFormatRegex(format, 'MM', 'month', '(\\d{1,2})');
        format = this.ReplaceDataFormatRegex(format, 'dd', 'day', '(\\d{1,2})');
        return (format);
    }
    GetDateFormatsRegularExpressions(culture = null) {
        if (culture == null)
            culture = this.GetCulture();
        const regularExpressions = [];
        if ((culture === 'pt') || (culture === 'es')) {
            const regularExpression = new DrapoRegularExpression();
            regularExpression.Expression = '^(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})$';
            regularExpression.CreateItem('(\\d{1,2})', 'day');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{1,2})', 'month');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{4})', 'year');
            regularExpressions.push(regularExpression);
        }
        else if (culture === 'en') {
            const regularExpression = new DrapoRegularExpression();
            regularExpression.Expression = '^(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})$';
            regularExpression.CreateItem('(\\d{1,2})', 'month');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{1,2})', 'day');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{4})', 'year');
            regularExpressions.push(regularExpression);
        }
        return (regularExpressions);
    }
    ReplaceDataFormatRegex(format, symbol, name, expression) {
        const regex = '(?<' + name + '>' + expression + ')';
        format = format.replace(symbol, regex);
        return (format);
    }
    GetResourceValueDictionary(dictonary, dateFormatType) {
        for (let i = 0; i < dictonary.length; i++) {
            const resourceEntry = dictonary[i];
            if (resourceEntry[0] === dateFormatType)
                return (resourceEntry[1]);
        }
        return ('');
    }
    GetResourceCultureDictionary(resource, culture) {
        if (culture == null)
            culture = this.GetCulture();
        for (let i = 0; i < resource.length; i++) {
            const resourceEntry = resource[i];
            if (resourceEntry[0] == culture)
                return (resourceEntry[1]);
        }
        return (null);
    }
    GetNumberSizeTypeName(type, culture = null) {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceNumberSizeType, type, culture));
    }
}

"use strict";
class DrapoLinkedCube {
    constructor() {
        this._head = null;
    }
    AddOrUpdate(context, value) {
        if (this._head === null) {
            this._head = this.CreateNode(context, value);
            return (this._head);
        }
        if (context === null)
            throw new Error('Drapo: The context in DrapoLinkedcube cant be null');
        if (this._head.Context.length != context.length)
            throw new Error('Drapo: The context to insert in linked cube must be the same lenght of the context lenght of head');
        let node = this._head;
        let nodePrevious = null;
        let nodePreviousIndex = null;
        let compare = 0;
        for (let i = 0; i < context.length; i++) {
            const contextValue = context[i];
            while ((compare = this.Compare(contextValue, node.Context[i])) !== 0) {
                if (compare < 0) {
                    const nodeNew = this.CreateNode(context, value);
                    this.AddNodeNext(nodeNew, node, i);
                    if (node === this._head)
                        this._head = nodeNew;
                    else if (nodePrevious !== null)
                        this.AddNodeNext(nodePrevious, nodeNew, nodePreviousIndex);
                    return (nodeNew);
                }
                else {
                    nodePrevious = node;
                    nodePreviousIndex = i;
                    const nodeNext = this.GetNodeNext(node, i);
                    if (nodeNext === null) {
                        const nodeNew = this.CreateNode(context, value);
                        this.AddNodeNext(node, nodeNew, i);
                        return (nodeNew);
                    }
                    else {
                        node = nodeNext;
                    }
                }
            }
        }
        node.Value = value;
        return (node);
    }
    Get(context) {
        let entry = null;
        let node = this._head;
        let index = 0;
        while (node !== null) {
            if (this.IsEqualContext(node.Context, context))
                return (node.Value);
            entry = this.GetNextInContext(node, context, index);
            if (entry === null)
                break;
            node = entry[0];
            index = entry[1];
        }
        return (null);
    }
    GetNode(context) {
        if (context == null)
            return (null);
        let entry = null;
        let node = this._head;
        let index = 0;
        while (node !== null) {
            if (this.IsEqualContext(context, node.Context, false))
                return (node);
            entry = this.GetNextInContext(node, context, index);
            if (entry === null)
                break;
            node = entry[0];
            index = entry[1];
        }
        return (null);
    }
    Clear() {
        this._head = null;
    }
    Remove(context) {
        if (this._head === null)
            return (null);
        let node = this._head;
        let nodePrevious = null;
        let nodePreviousIndex = null;
        let compare = 0;
        for (let i = 0; ((i < context.length) && (node !== null)); i++) {
            const contextValue = context[i];
            while ((compare = this.Compare(contextValue, node.Context[i])) !== 0) {
                if (compare < 0) {
                    return (null);
                }
                else {
                    nodePrevious = node;
                    nodePreviousIndex = i;
                    const nodeNext = this.GetNodeNext(node, i);
                    node = nodeNext;
                    if (node === null)
                        return (null);
                }
            }
        }
        if (node !== null) {
            const isContextToRemove = context.length < this._head.Context.length;
            const nodeNext = this.GetNextReverse(node, isContextToRemove ? context.length - 1 : null);
            const nodeNextIndex = this.GetNextReverseIndex(node, isContextToRemove ? context.length - 1 : null);
            if (nodePrevious === null) {
                if (nodeNext !== null) {
                    this.MoveLinks(nodeNext, node, nodeNextIndex);
                }
                this._head = nodeNext;
            }
            else {
                this.MoveLinks(nodeNext, node, nodeNextIndex);
                this.AddNodeNext(nodePrevious, nodeNext, nodePreviousIndex);
            }
        }
        return (node);
    }
    GetHead() {
        return (this._head);
    }
    CreateNode(context, value) {
        const node = new DrapoLinkedCubeNode();
        node.Context = context;
        node.Value = value;
        return (node);
    }
    GetNextInContext(node, context, index) {
        for (let i = index; i < context.length; i++) {
            const compare = this.Compare(context[i], node.Context[i]);
            if (compare < 0)
                return (null);
            else if (compare === 0)
                continue;
            if ((node.Next === null) || (node.Next.length <= i))
                return (null);
            return ([node.Next[i], i]);
        }
        return (null);
    }
    Compare(value1, value2) {
        if (value1 < value2)
            return (-1);
        if (value1 > value2)
            return (1);
        return (0);
    }
    GetNextReverse(node, index = null) {
        if (node.Next === null)
            return (null);
        let start = index !== null ? index : node.Next.length - 1;
        if (start >= node.Next.length)
            start = node.Next.length - 1;
        for (let i = start; i >= 0; i--) {
            const nodeNext = node.Next[i];
            if (nodeNext !== null)
                return (nodeNext);
        }
        return (null);
    }
    GetNextReverseIndex(node, index = null) {
        if (node.Next === null)
            return (null);
        let start = index !== null ? index : node.Next.length - 1;
        if (start >= node.Next.length)
            start = node.Next.length - 1;
        for (let i = start; i >= 0; i--) {
            const nodeNext = node.Next[i];
            if (nodeNext !== null)
                return (i);
        }
        return (null);
    }
    IsEqualContext(context1, context2, checkSize = true) {
        if ((checkSize) && (context1.length != context2.length))
            return (false);
        for (let i = 0; i < context1.length; i++)
            if (context1[i] !== context2[i])
                return (false);
        return (true);
    }
    EnsureNodeNext(node, index) {
        if (node.Next === null)
            node.Next = [];
        while (node.Next.length <= index)
            node.Next.push(null);
    }
    AddNodeNext(node, nodeNext, index) {
        this.EnsureNodeNext(node, index);
        node.Next[index] = nodeNext;
        if (nodeNext === null)
            return;
        if (nodeNext.Next === null)
            return;
        this.MoveLinks(node, nodeNext, index);
    }
    MoveLinks(node, nodeNext, index = null) {
        if (node === null)
            return;
        if (nodeNext === null)
            return;
        if (nodeNext.Next === null)
            return;
        this.EnsureNodeNext(node, index);
        for (let i = 0; ((index === null) || (i < index)) && (i < nodeNext.Next.length); i++) {
            if (node.Context[i] !== nodeNext.Context[i])
                break;
            if (node.Next[i] === null)
                node.Next[i] = nodeNext.Next[i];
            nodeNext.Next[i] = null;
        }
    }
    GetNodeNext(node, index) {
        if (node.Next === null)
            return (null);
        if (node.Next.length <= index)
            return (null);
        return (node.Next[index]);
    }
    ToList(node = null) {
        const list = [];
        const stack = [];
        if (node === null)
            node = this._head;
        while (node != null || stack.length > 0) {
            if (node != null) {
                list.push(node);
                if (node.Next != null) {
                    for (let i = node.Next.length - 1; i >= 0; i--) {
                        const nodeNext = node.Next[i];
                        if (nodeNext !== null)
                            stack.push(nodeNext);
                    }
                }
            }
            node = stack.pop();
        }
        return list;
    }
    ToListValues(node = null) {
        const listValues = [];
        const list = this.ToList(node);
        for (let i = 0; i < list.length; i++)
            listValues.push(list[i].Value);
        return (listValues);
    }
}

"use strict";
class DrapoLinkedCubeNode {
    constructor() {
        this.Value = null;
        this.Context = null;
        this.Next = null;
    }
}

"use strict";
class DrapoLinkedList {
    constructor() {
        this._head = null;
    }
    AddOrUpdate(index, value) {
        if (this._head === null) {
            this._head = new DrapoLinkedListNode();
            this._head.Index = index;
        }
        let node = this._head;
        let isEnd = false;
        while (node.Index !== index) {
            if ((isEnd = (node.Next === null)) || (node.Next.Index > index)) {
                const nodeNew = new DrapoLinkedListNode();
                nodeNew.Index = index;
                if ((isEnd) && (node.Index < index)) {
                    node.Next = nodeNew;
                }
                else if (node === this._head) {
                    nodeNew.Next = node;
                    this._head = nodeNew;
                }
                else {
                    nodeNew.Next = node.Next;
                    node.Next = nodeNew;
                }
                node = nodeNew;
            }
            else {
                node = node.Next;
            }
        }
        node.Value = value;
    }
    Get(index) {
        let node = this._head;
        while (node !== null) {
            if (node.Index < index)
                node = node.Next;
            else if (node.Index === index)
                return (node.Value);
        }
        return (null);
    }
    GetHead() {
        return (this._head);
    }
}

"use strict";
class DrapoLinkedListNode {
    constructor() {
        this.Value = null;
        this.Next = null;
        this.Index = null;
    }
}

"use strict";
class DrapoLinkedTable {
    constructor() {
        this._head = null;
    }
    AddOrUpdate(row, column, value) {
        if (this._head === null) {
            this._head = new DrapoLinkedTableNode();
            this._head.Row = row;
            this._head.Column = column;
        }
        let node = this._head;
        let nodeRowPrevious = null;
        let isEnd = false;
        while (node.Row !== row) {
            nodeRowPrevious = node;
            if ((isEnd = (node.NextRow === null)) || (node.NextRow.Row > row)) {
                const nodeRow = new DrapoLinkedTableNode();
                nodeRow.Row = row;
                nodeRow.Column = column;
                if ((isEnd) && (node.Row < row)) {
                    node.NextRow = nodeRow;
                }
                else if (node === this._head) {
                    nodeRow.NextRow = node;
                    this._head = nodeRow;
                }
                else {
                    nodeRow.NextRow = node.NextRow;
                    node.NextRow = nodeRow;
                }
                node = nodeRow;
            }
            else {
                node = node.NextRow;
            }
        }
        const nodeRowHead = node;
        while (node.Column !== column) {
            if ((isEnd = (node.NextCell === null)) || (node.NextCell.Column > column)) {
                const nodeCell = new DrapoLinkedTableNode();
                nodeCell.Row = row;
                nodeCell.Column = column;
                if ((isEnd) && (node.Column < column)) {
                    node.NextCell = nodeCell;
                }
                else if (node === nodeRowHead) {
                    nodeCell.NextCell = node;
                    if (nodeRowHead.Row !== nodeRowPrevious.Row)
                        nodeRowPrevious.NextRow = nodeCell;
                }
                else {
                    nodeCell.NextCell = node.NextCell;
                    node.NextCell = nodeCell;
                }
                node = nodeCell;
            }
            else {
                node = node.NextCell;
            }
        }
        node.Value = value;
    }
    Get(row, column) {
        let node = this._head;
        while (node !== null) {
            if (node.Row < row) {
                node = node.NextRow;
            }
            else if (node.Row > row) {
                return (null);
            }
            else if (node.Row === row) {
                if (node.Column < column)
                    node = node.NextCell;
                else if (node.Column > column)
                    return (null);
                else
                    return (node.Value);
            }
        }
        return (null);
    }
    GetHead() {
        return (this._head);
    }
    Delete(row, column) {
    }
}

"use strict";
class DrapoLinkedTableNode {
    constructor() {
        this.Value = null;
        this.NextCell = null;
        this.NextRow = null;
        this.Row = null;
        this.Column = null;
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoLogger {
    get Application() {
        return (this._application);
    }
    set ShowHtml(value) {
        this._showHtml = value;
    }
    get ShowHTML() {
        return (this._showHtml);
    }
    set AllowVerbose(value) {
        this._allowVerbose = value;
    }
    get AllowVerbose() {
        return (this._allowVerbose);
    }
    set AllowError(value) {
        this._allowError = value;
    }
    get AllowError() {
        return (this._allowError);
    }
    constructor(application) {
        this._showHtml = false;
        this._allowVerbose = false;
        this._allowError = true;
        this._application = application;
    }
    WriteVerbose(message, ...parameters) {
        if (this.AllowVerbose)
            console.log(this.CreateMessage(message, parameters));
    }
    WriteError(message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = this.CreateMessage(message, parameters);
            yield this.Application.Debugger.AddError(error);
            if (this.AllowError)
                console.log(error);
        });
    }
    CreateMessage(message, parameters) {
        let messageReplaced = message;
        for (let i = 0; i < parameters.length; i++)
            messageReplaced = messageReplaced.replace("{" + i + "}", parameters[i]);
        return (messageReplaced);
    }
}

"use strict";
class DrapoMessage {
    constructor() {
        this._action = null;
        this._dataKey = null;
        this._sector = null;
        this._tag = null;
        this._data = null;
    }
    get Action() {
        return (this._action);
    }
    set Action(value) {
        this._action = value;
    }
    get DataKey() {
        return (this._dataKey);
    }
    set DataKey(value) {
        this._dataKey = value;
    }
    get Sector() {
        return (this._sector);
    }
    set Sector(value) {
        this._sector = value;
    }
    get Tag() {
        return (this._tag);
    }
    set Tag(value) {
        this._tag = value;
    }
    get Data() {
        return (this._data);
    }
    set Data(value) {
        this._data = value;
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoModelHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    HasContentModelContext(content) {
        return (content.indexOf('d-model') > -1);
    }
    ResolveOnModelChange(contextItem, el) {
        return __awaiter(this, void 0, void 0, function* () {
            const onModel = el.getAttribute('d-on-model-change');
            if ((onModel === null) || (onModel === undefined))
                return;
            const sector = this.Application.Document.GetSector(el);
            yield this.Application.FunctionHandler.ResolveFunction(sector, contextItem, null, null, onModel);
        });
    }
    ResolveOnModelComplete(contextItem, el) {
        return __awaiter(this, void 0, void 0, function* () {
            const onModel = el.getAttribute('d-on-model-complete');
            if ((onModel === null) || (onModel === undefined))
                return;
            const sector = this.Application.Document.GetSector(el);
            yield this.Application.FunctionHandler.ResolveFunction(sector, contextItem, null, null, onModel);
        });
    }
    ResolveModel(context, renderContext, el, sector, canBind, isContext = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = el.getAttribute('d-model');
            if (model == null)
                return (false);
            const isMustacheContext = this.Application.Barber.HasMustacheContext(model, sector, renderContext);
            if (isContext !== isMustacheContext)
                return;
            const isMustacheOnly = this.Application.Parser.IsMustacheOnly(model, true);
            const mustache = isMustacheOnly ? model : null;
            const mustacheParts = isMustacheOnly ? this.Application.Parser.ParseMustache(model) : null;
            const dataFields = isMustacheOnly ? this.Application.Solver.ResolveDataFields(mustacheParts) : null;
            const onModelInitialize = el.getAttribute('d-on-model-initialize');
            if ((onModelInitialize !== null) && (onModelInitialize !== undefined) && (!(yield this.Application.Solver.ExistDataPath(context, sector, mustacheParts)))) {
                yield this.Application.FunctionHandler.ResolveFunction(sector, context.Item, null, null, onModelInitialize);
                if ((!isContext) || (!context.CanUpdateTemplate))
                    el.removeAttribute('d-on-model-initialize');
            }
            let canNotify = true;
            const modelNotify = el.getAttribute('d-modelNotify');
            if (modelNotify != null) {
                canNotify = modelNotify === 'true';
                if ((isContext) && (context.CanUpdateTemplate))
                    el.removeAttribute('d-modelNotify');
            }
            const modelEvents = this.Application.Parser.ParseEvents(el.getAttribute('d-model-event'));
            if (modelEvents.length === 0)
                modelEvents.push('change');
            if ((isMustacheOnly) && (context.CanUpdateTemplate)) {
                const mustacheResolved = yield this.Application.Solver.ResolveDataPathMustache(context, null, el, sector, mustacheParts);
                if (mustacheResolved !== null)
                    el.setAttribute('d-model', mustacheResolved);
            }
            const modelOrValue = isMustacheOnly ? model : yield this.ResolveValueExpression(context, el, sector, model, canBind);
            let updated = false;
            const tag = el.tagName.toLowerCase();
            if (tag === 'input')
                updated = yield this.ResolveModelInput(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, this.Application.Parser.ParseEvents(el.getAttribute('d-model-event-cancel')), canNotify);
            else if (tag === 'select')
                updated = yield this.ResolveModelSelect(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify);
            else if (tag === 'textarea')
                updated = yield this.ResolveModelTextArea(context, el, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, modelEvents, this.Application.Parser.ParseEvents(el.getAttribute('d-model-event-cancel')), canNotify);
            else if (tag === 'span')
                updated = yield this.ResolveModelSpan(context, el, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, ((isContext) && (!context.CanUpdateTemplate)));
            else if (tag === 'li')
                updated = yield this.ResolveModelLI(context, el, sector, model, mustache, mustacheParts, dataFields, canBind);
            else if (tag === 'div')
                updated = true;
            else if (tag === 'label')
                updated = yield this.ResolveModelSpan(context, el, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, ((isContext) && (!context.CanUpdateTemplate)));
            else if (tag === 'button')
                updated = yield this.ResolveModelSpan(context, el, sector, modelOrValue, mustache, mustacheParts, dataFields, canBind, ((isContext) && (!context.CanUpdateTemplate)));
            else
                yield this.Application.ExceptionHandler.HandleError('DrapoModelHandler - ResolveModel - model not supported in tag: {0}', tag);
            if ((updated) && (isContext)) {
                const canRemoveModel = ((!context.CanUpdateTemplate) || (context.IsInsideRecursion));
                const dataKey = isMustacheOnly ? this.Application.Solver.ResolveDataKey(mustacheParts) : null;
                if ((canRemoveModel) && ((!isMustacheOnly) || (dataKey === context.Item.Key)))
                    el.removeAttribute('d-model');
            }
            return (updated);
        });
    }
    ResolveValueExpression(context, el, sector, model, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            if (canBind) {
                const mustaches = this.Application.Parser.ParseMustaches(model, true);
                for (let i = 0; i < mustaches.length; i++) {
                    const mustache = mustaches[i];
                    const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                    const dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                    const dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                    this.Application.Binder.BindReader(yield this.Application.Solver.ResolveDataPathObjectItem(context.Item, dataKey, sector), el, dataFields);
                }
            }
            const executionContext = new DrapoExecutionContext(this.Application);
            const value = yield this.Application.FunctionHandler.ResolveFunctions(sector, context.Item, el, executionContext, model, false);
            const valueString = this.Application.Solver.EnsureString(value);
            if (valueString != model)
                return (yield this.ResolveValueExpression(context, el, sector, valueString, canBind));
            return (valueString);
        });
    }
    ResolveModelInput(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel, canNotify) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = el.getAttribute('type');
            if (type == 'checkbox')
                return (this.ResolveModelInputCheckbox(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify));
            if (type == 'text')
                return (this.ResolveModelInputText(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel, canNotify));
            if (type == 'number')
                return (this.ResolveModelInputNumber(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel, canNotify));
            if (type == 'password')
                return (this.ResolveModelInputPassword(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel, canNotify));
            if (type == 'hidden')
                return (this.ResolveModelInputHidden(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify));
            if (type == 'range')
                return (this.ResolveModelInputRange(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify));
            yield this.Application.ExceptionHandler.HandleError('DrapoModelHandler - ResolveModelInput - model not supported in input type: {0}', type);
            return (false);
        });
    }
    ResolveModelInputCheckbox(context, element, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.Application.Solver.ResolveConditional(yield this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, null, canNotify));
            element.checked = value;
            return (true);
        });
    }
    ResolveModelTextArea(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel, canNotify) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = mustacheParts != null ? yield this.Application.Solver.ResolveDataPath(context, null, el, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel, canNotify) : model;
            el.value = value;
            return (true);
        });
    }
    ResolveModelInputText(context, element, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel, canNotify) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = mustacheParts != null ? yield this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel, canNotify) : model;
            const elementInput = element;
            if (elementInput.value !== value)
                elementInput.value = value;
            return (true);
        });
    }
    ResolveModelInputNumber(context, element, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel, canNotify) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel, canNotify);
            const elementInput = element;
            if (elementInput.value !== value)
                elementInput.value = value;
            return (true);
        });
    }
    ResolveModelInputPassword(context, element, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, modelEventsCancel, canNotify) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, modelEventsCancel, canNotify);
            const elementInput = element;
            elementInput.value = value;
            return (true);
        });
    }
    ResolveModelInputHidden(context, element, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, null, canNotify);
            const elementInput = element;
            if (elementInput.value !== value)
                elementInput.value = value;
            return (true);
        });
    }
    ResolveModelInputRange(context, element, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, null, canNotify);
            const elementInput = element;
            if (elementInput.value !== value)
                elementInput.value = value;
            return (true);
        });
    }
    ResolveModelSelect(context, element, sector, model, mustache, mustacheParts, dataFields, canBind, modelEvents, canNotify) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.Application.Solver.ResolveDataPath(context, null, element, sector, mustacheParts, canBind, canBind, modelEvents, null, canNotify);
            const elementSelect = element;
            if (elementSelect.value !== value)
                elementSelect.value = value;
            return (true);
        });
    }
    ResolveModelSpan(context, el, sector, model, mustache, mustacheParts, dataFields, canBind, canClean) {
        return __awaiter(this, void 0, void 0, function* () {
            let updated = true;
            const format = el.getAttribute("d-format");
            let value = mustacheParts != null ? yield this.Application.Solver.ResolveDataPath(context, null, el, sector, mustacheParts, canBind, false) : model;
            if (this.Application.Parser.IsMustache(value)) {
                el.setAttribute('d-model', value);
                value = '';
                updated = false;
            }
            else if ((canClean) && (format != null)) {
                el.removeAttribute('d-model');
            }
            let valueFormatted = value;
            if (format != null) {
                if (canClean)
                    el.removeAttribute('d-format');
                let formatResolved = format;
                while (this.Application.Parser.HasMustache(formatResolved))
                    formatResolved = yield this.Application.Barber.ResolveControlFlowMustacheString(context, null, null, formatResolved, el, sector, false);
                const culture = el.getAttribute("d-culture");
                let cultureResolved = culture;
                if (cultureResolved != null) {
                    if (canClean)
                        el.removeAttribute('d-culture');
                    while (this.Application.Parser.HasMustache(cultureResolved))
                        cultureResolved = yield this.Application.Barber.ResolveControlFlowMustacheString(context, null, null, cultureResolved, el, sector, false);
                }
                const formatTimezone = el.getAttribute("d-format-timezone");
                if ((canClean) && (formatTimezone != null))
                    el.removeAttribute('d-format-timezone');
                const applyTimezone = (formatTimezone != 'false');
                valueFormatted = this.Application.Formatter.Format(value, formatResolved, cultureResolved, applyTimezone);
            }
            const elementSpan = el;
            if (elementSpan.textContent !== valueFormatted)
                elementSpan.textContent = valueFormatted;
            return (updated);
        });
    }
    ResolveModelLI(context, el, sector, model, mustache, mustacheParts, dataFields, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            let updated = true;
            let value = yield this.Application.Solver.ResolveDataPath(context, null, el, sector, mustacheParts, canBind, false);
            if (this.Application.Parser.IsMustache(value)) {
                el.setAttribute('d-model', value);
                value = '';
                updated = false;
            }
            const elementLI = el;
            if (elementLI.textContent !== value)
                elementLI.textContent = value;
            return (updated);
        });
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoObserver {
    get Application() {
        return (this._application);
    }
    get IsEnabledNotifyIncremental() {
        return (this._IsEnabledNotifyIncremental);
    }
    set IsEnabledNotifyIncremental(value) {
        this._IsEnabledNotifyIncremental = value;
    }
    constructor(application) {
        this._dataBarberDataKeys = [];
        this._dataBarberFields = [];
        this._dataBarberElements = [];
        this._dataForDataKey = [];
        this._dataForElement = [];
        this._dataIncrementalKey = [];
        this._dataIncrementalElements = [];
        this._IsEnabledNotifyIncremental = true;
        this._dataDelayKey = [];
        this._dataDelayField = [];
        this._dataDelayElements = [];
        this._dataStorageKey = [];
        this._dataStorageKeyFields = [];
        this._dataStorageKeyReferenceKey = [];
        this._dataStorageType = [];
        this._dataAuthorizationKey = [];
        this._dataAuthorizationType = [];
        this._dataLinkDataKey = [];
        this._dataLinkReferenceKey = [];
        this._dataLinkDataFields = [];
        this._dataComponentKey = [];
        this._dataComponentField = [];
        this._dataComponentElements = [];
        this._dataComponentFunction = [];
        this._dataComponentElementsFocus = [];
        this._lockedData = [];
        this._application = application;
    }
    GetBarberDataKeyIndex(dataKey) {
        for (let i = 0; i < this._dataBarberDataKeys.length; i++) {
            if (this._dataBarberDataKeys[i] == dataKey)
                return (i);
        }
        return (null);
    }
    GetForDataKeyIndex(dataKey) {
        for (let i = 0; i < this._dataForDataKey.length; i++) {
            if (this._dataForDataKey[i] == dataKey)
                return (i);
        }
        return (null);
    }
    GetDataIncrementalKeyIndex(dataKey) {
        for (let i = 0; i < this._dataIncrementalKey.length; i++) {
            if (this._dataIncrementalKey[i] == dataKey)
                return (i);
        }
        return (null);
    }
    CreateBarberDataKeyIndex(dataKey) {
        const index = this._dataBarberDataKeys.push(dataKey);
        this._dataBarberFields.push([]);
        this._dataBarberElements.push([]);
        return (index - 1);
    }
    CreateForDataKeyIndex(dataKey) {
        const index = this._dataForDataKey.push(dataKey);
        this._dataForElement.push([]);
        return (index - 1);
    }
    CreateDataIncrementalKeyIndex(dataKey) {
        const index = this._dataIncrementalKey.push(dataKey);
        this._dataIncrementalElements.push([]);
        return (index - 1);
    }
    SubscribeBarber(element, dataKey, dataFields) {
        let dataKeyIndex = this.GetBarberDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateBarberDataKeyIndex(dataKey);
        const dataBarberFields = this._dataBarberFields[dataKeyIndex];
        const elements = this._dataBarberElements[dataKeyIndex];
        for (let i = 0; i < dataBarberFields.length; i++) {
            if (!this.IsEqualDataFields(dataBarberFields[i], dataFields))
                continue;
            if (elements[i] !== element)
                continue;
            return (false);
        }
        dataBarberFields.push(dataFields);
        elements.push(element);
        return (true);
    }
    UnsubscribeBarber(dataKey) {
        const dataKeyIndex = this.GetBarberDataKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return;
        this._dataBarberDataKeys.splice(dataKeyIndex, 1);
        this._dataBarberElements.splice(dataKeyIndex, 1);
        this._dataBarberFields.splice(dataKeyIndex, 1);
    }
    SubscribeFor(elementForTemplate, dataKey) {
        let dataKeyIndex = this.GetForDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateForDataKeyIndex(dataKey);
        this._dataForElement[dataKeyIndex].push(elementForTemplate);
    }
    SubscribeStorage(dataKey, dataFields, dataReferenceKey, type = DrapoStorageLinkType.Reload) {
        const dataField = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
        let dataKeyIndex = this.GetStorageKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateStorageDataKeyIndex(dataKey);
        const dataStorageFields = this._dataStorageKeyFields[dataKeyIndex];
        const dataReferenceKeys = this._dataStorageKeyReferenceKey[dataKeyIndex];
        const dataTypes = this._dataStorageType[dataKeyIndex];
        for (let i = 0; i < dataStorageFields.length; i++) {
            if ((dataStorageFields[i] === dataField) && (dataReferenceKeys[i] === dataReferenceKey))
                return;
        }
        dataStorageFields.push(dataField);
        dataReferenceKeys.push(dataReferenceKey);
        dataTypes.push(type);
    }
    UnsubscribeStorage(dataKey) {
        this.UnsubscribeStorageReferenceKey(dataKey);
        const dataKeyIndex = this.GetStorageKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return;
        this._dataStorageKey.splice(dataKeyIndex, 1);
        this._dataStorageKeyFields.splice(dataKeyIndex, 1);
        this._dataStorageKeyReferenceKey.splice(dataKeyIndex, 1);
        this._dataStorageType.splice(dataKeyIndex, 1);
    }
    UnsubscribeStorageReferenceKey(dataKey) {
        for (let i = this._dataStorageKey.length - 1; i >= 0; i--) {
            const references = this._dataStorageKeyReferenceKey[i];
            for (let j = references.length - 1; j >= 0; j--) {
                if (references[j] !== dataKey)
                    continue;
                this._dataStorageKeyFields[i].splice(j, 1);
                this._dataStorageKeyReferenceKey[i].splice(j, 1);
                this._dataStorageType[i].splice(j, 1);
            }
            if (references.length !== 0)
                continue;
            this._dataStorageKey.splice(i, 1);
            this._dataStorageKeyFields.splice(i, 1);
            this._dataStorageKeyReferenceKey.splice(i, 1);
            this._dataStorageType.splice(i, 1);
        }
    }
    UnsubscribeFor(dataKey, elementForTemplate = null) {
        const dataKeyIndex = this.GetForDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return;
        if (elementForTemplate === null) {
            this._dataForDataKey.splice(dataKeyIndex, 1);
            this._dataForElement.splice(dataKeyIndex, 1);
            return;
        }
        const dataElements = this._dataForElement[dataKeyIndex];
        for (let i = dataElements.length - 1; i >= 0; i--) {
            const dataElementParent = dataElements[i];
            if (dataElementParent != elementForTemplate)
                continue;
            this._dataForElement[dataKeyIndex].splice(i, 1);
        }
    }
    Notify(dataKey, dataIndex, dataFields, canUseDifference = true, canNotifyStorage = true, notifyStorageDataKey = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.IsLocked(dataKey))
                return;
            yield this.Application.Debugger.AddNotify(dataKey);
            if (canNotifyStorage)
                yield this.NotifyStorage(dataKey, dataFields, notifyStorageDataKey);
            yield this.NotifyFor(dataKey, dataIndex, dataFields, canUseDifference);
            yield this.NotifyBarber(dataKey, dataFields);
            yield this.NotifyLink(dataKey, dataFields);
            yield this.NotifyComponent(dataKey, dataFields);
            yield this.Application.Storage.FireEventOnNotify(dataKey);
        });
    }
    NotifyFor(dataKey, dataIndex, dataFields, canUseDifference = true, type = DrapoStorageLinkType.Render) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.GetForDataKeyIndex(dataKey);
            if (index === null)
                return;
            const dataElements = this._dataForElement[index];
            for (let i = dataElements.length - 1; i >= 0; i--) {
                const dataElement = dataElements[i];
                if (dataElement.parentElement === null) {
                    dataElements.splice(i, 1);
                }
                else if (!this.Application.SectorContainerHandler.IsElementContainerized(dataElement)) {
                    const elParent = dataElement.parentElement;
                    yield this.Application.ControlFlow.ResolveControlFlowForElement(dataElement, false, canUseDifference, type);
                    yield this.Application.ComponentHandler.ResolveComponents(elParent);
                }
            }
        });
    }
    NotifyBarber(dataKey, dataFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKeyIndex = this.GetBarberDataKeyIndex(dataKey);
            if (dataKeyIndex === null)
                return;
            const dataField = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
            const dataElements = this._dataBarberElements[dataKeyIndex];
            const dataBarberFields = this._dataBarberFields[dataKeyIndex];
            for (let i = dataElements.length - 1; i >= 0; i--) {
                const element = dataElements[i];
                if (this.Application.Document.IsElementAttached(element)) {
                    const dataBarberFieldsCurrent = dataBarberFields[i];
                    if (!this.IsCompatibleDataFields(dataFields, dataBarberFieldsCurrent))
                        continue;
                    const sector = this.Application.Document.GetSector(element);
                    yield this.Application.Barber.ResolveFilter(element, sector, dataField == null, dataKey, dataField);
                }
                else if (!this.Application.SectorContainerHandler.IsElementContainerized(element)) {
                    dataElements.splice(i, 1);
                    dataBarberFields.splice(i, 1);
                }
            }
        });
    }
    NotifyStorage(dataKey, dataFields, notifyStorageDataKey = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKeyIndex = this.GetStorageKeyIndex(dataKey);
            if (dataKeyIndex == null)
                return;
            const dataField = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
            const dataStorageFields = this._dataStorageKeyFields[dataKeyIndex];
            const dataReferenceKeys = this._dataStorageKeyReferenceKey[dataKeyIndex];
            const dataTypes = this._dataStorageType[dataKeyIndex];
            for (let i = 0; i < dataStorageFields.length; i++) {
                if ((dataField != null) && (dataStorageFields[i] != null) && (dataStorageFields[i] !== dataField))
                    continue;
                const dataReferenceKey = dataReferenceKeys[i];
                if ((notifyStorageDataKey != null) && (dataReferenceKey === notifyStorageDataKey))
                    continue;
                const type = dataTypes[i];
                if (type == DrapoStorageLinkType.Reload) {
                    const sectors = this.Application.Storage.GetSectors(dataReferenceKey);
                    for (let j = 0; j < sectors.length; j++)
                        yield this.Application.Storage.ReloadData(dataReferenceKey, sectors[j], true, false);
                }
                else if (type == DrapoStorageLinkType.RenderClass) {
                    yield this.NotifyStorageRenderClass(dataReferenceKey);
                }
                else if (type == DrapoStorageLinkType.Pointer) {
                    yield this.Application.Storage.UpdatePointerStorageItems(dataKey, dataReferenceKey);
                    yield this.Application.Observer.Notify(dataReferenceKey, null, null, true, true, dataKey);
                }
                else {
                    yield this.Application.Observer.Notify(dataReferenceKey, null, null);
                }
            }
        });
    }
    NotifyStorageRenderClass(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.NotifyFor(dataKey, null, null, true, DrapoStorageLinkType.RenderClass);
        });
    }
    SubscribeIncremental(el, dataKey) {
        let dataKeyIndex = this.GetDataIncrementalKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateDataIncrementalKeyIndex(dataKey);
        this._dataIncrementalElements[dataKeyIndex].push(el);
    }
    NotifyIncremental(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.IsEnabledNotifyIncremental)
                return;
            const dataKeyIndex = this.GetDataIncrementalKeyIndex(dataKey);
            if (dataKeyIndex == null)
                return;
            const elements = this._dataIncrementalElements[dataKeyIndex];
            for (let i = elements.length - 1; i >= 0; i--) {
                if (i >= elements.length)
                    continue;
                const element = elements[i];
                if (element.parentElement === null)
                    elements.splice(i, 1);
                else
                    yield this.Application.ControlFlow.ResolveControlFlowForElement(element, true);
            }
        });
    }
    SubscribeDelay(el, dataKey, dataFields) {
        let dataKeyIndex = this.GetDelayKeyIndex(dataKey);
        if (dataKeyIndex == null) {
            dataKeyIndex = this._dataDelayKey.push(dataKey) - 1;
            this._dataDelayField.push([]);
            this._dataDelayElements.push([]);
        }
        const dataField = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
        let dataFieldIndex = this.GetDelayFieldKeyIndex(dataKeyIndex, dataField);
        if (dataFieldIndex == null) {
            dataFieldIndex = this._dataDelayField[dataKeyIndex].push(dataField) - 1;
            this._dataDelayElements[dataKeyIndex].push([]);
        }
        this._dataDelayElements[dataKeyIndex][dataFieldIndex].push(el);
    }
    NotifyDelay(dataKey, dataFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKeyIndex = this.GetDelayKeyIndex(dataKey);
            if (dataKeyIndex == null)
                return;
            const dataField = ((dataFields != null) && (dataFields.length > 0)) ? dataFields[0] : null;
            const dataFieldIndex = this.GetDelayFieldKeyIndex(dataKeyIndex, dataField);
            if (dataFieldIndex == null)
                return;
            const elements = this._dataDelayElements[dataKeyIndex][dataFieldIndex];
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                if (element === null)
                    continue;
                this.SubscribeBarber(element, dataKey, dataFields);
                const sector = this.Application.Document.GetSector(element);
                yield this.Application.Barber.ResolveElementDelayed(element, sector, dataKey, dataField);
            }
            this._dataDelayField[dataKeyIndex].splice(dataFieldIndex, 1);
            this._dataDelayElements[dataKeyIndex].splice(dataFieldIndex, 1);
        });
    }
    SubscribeAuthorization(dataKey, type) {
        if (this.HasDataKeyAuthorization(dataKey))
            return;
        this._dataAuthorizationKey.push(dataKey);
        this._dataAuthorizationType.push(type);
    }
    HasDataKeyAuthorization(dataKey) {
        return (this.GetDataKeyAuthorizationIndex(dataKey) >= 0);
    }
    GetDataKeyAuthorizationIndex(dataKey) {
        for (let i = 0; i < this._dataAuthorizationKey.length; i++)
            if (this._dataAuthorizationKey[i] == dataKey)
                return (i);
        return (-1);
    }
    NotifyAuthorization() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = this._dataAuthorizationKey.length - 1; i >= 0; i--) {
                const dataKey = this._dataAuthorizationKey[i];
                const type = this._dataAuthorizationType[i];
                this._dataAuthorizationKey.splice(i, 1);
                this._dataAuthorizationType.splice(i, 1);
                this.Application.Document.ResetPendingAuthorizations(this.GetPendingAuthorization());
                if (type === 'notify')
                    yield this.Application.Storage.ReloadData(dataKey, null);
                else if (type === 'initialize')
                    yield this.Application.Storage.RetrieveDataItem(dataKey, null);
            }
            this.Application.Document.ResetPendingAuthorizations();
        });
    }
    HasPendingAuthorization() {
        return (this.GetPendingAuthorization() > 0);
    }
    GetPendingAuthorization() {
        return (this._dataAuthorizationKey.length);
    }
    HasDelayKeys() {
        return (this._dataDelayKey.length > 0);
    }
    GetDelayKeys() {
        return (this._dataDelayKey);
    }
    GetDelayFields(dataKey) {
        const dataKeyIndex = this.GetDelayKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return (null);
        return (this._dataDelayField[dataKeyIndex]);
    }
    GetDelayKeyIndex(dataKey) {
        const data = this._dataDelayKey;
        for (let i = 0; i < data.length; i++) {
            if (data[i] == dataKey)
                return (i);
        }
        return (null);
    }
    GetDelayFieldKeyIndex(dataKeyIndex, dataField) {
        const data = this._dataDelayField[dataKeyIndex];
        for (let i = 0; i < data.length; i++) {
            if (data[i] == dataField)
                return (i);
        }
        return (null);
    }
    GetStorageKeyIndex(dataKey) {
        const data = this._dataStorageKey;
        for (let i = 0; i < data.length; i++) {
            if (data[i] == dataKey)
                return (i);
        }
        return (null);
    }
    CreateStorageDataKeyIndex(dataKey) {
        const index = this._dataStorageKey.push(dataKey);
        this._dataStorageKeyFields.push([]);
        this._dataStorageKeyReferenceKey.push([]);
        this._dataStorageType.push([]);
        return (index - 1);
    }
    SubscribeLink(dataKey, referenceKey, dataFields = null) {
        if (referenceKey === null)
            return (false);
        const index = this.GetLinkIndex(dataKey, referenceKey);
        if (index !== null) {
            const linkDataFields = this._dataLinkDataFields[index];
            if (linkDataFields == null)
                return (false);
            if (this.IsEqualDataFields(linkDataFields, dataFields))
                return (false);
            this._dataLinkDataFields[index] = null;
            return (true);
        }
        if (this.GetLinkIndex(referenceKey, dataKey) !== null)
            return (false);
        this._dataLinkDataKey.push(dataKey);
        this._dataLinkReferenceKey.push(referenceKey);
        this._dataLinkDataFields.push(dataFields);
        return (true);
    }
    SubscribeLinkMustache(mustache, referenceKey) {
        let inserted = false;
        const mustaches = this.Application.Parser.ParseMustaches(mustache);
        for (let i = 0; i < mustaches.length; i++) {
            const mustacheCurrent = mustaches[i];
            const mustacheParts = this.Application.Parser.ParseMustache(mustacheCurrent);
            const mustacheDataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
            const mustacheDataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
            if (this.SubscribeLink(mustacheDataKey, referenceKey, mustacheDataFields))
                inserted = true;
        }
        return (inserted);
    }
    UnsubscribeLink(dataKey, referenceKey = null) {
        if (referenceKey === null) {
            let unsubscribed = false;
            for (let i = 0; i < this._dataLinkDataKey.length; i++) {
                let remove = false;
                if (this._dataLinkDataKey[i] === dataKey)
                    remove = true;
                if ((!remove) && (this._dataLinkReferenceKey[i] === dataKey))
                    remove = true;
                if (!remove)
                    continue;
                unsubscribed = true;
                this._dataLinkDataKey.splice(i, 1);
                this._dataLinkReferenceKey.splice(i, 1);
                this._dataLinkDataFields.splice(i, 1);
            }
            return (unsubscribed);
        }
        else {
            const index = this.GetLinkIndex(dataKey, referenceKey);
            if (index === null)
                return (false);
            this._dataLinkDataKey.splice(index, 1);
            this._dataLinkReferenceKey.splice(index, 1);
            this._dataLinkDataFields.splice(index, 1);
            return (true);
        }
    }
    GetLinkIndex(dataKey, referenceKey) {
        for (let i = 0; i < this._dataLinkDataKey.length; i++) {
            const dataKeyLink = this._dataLinkDataKey[i];
            if (dataKeyLink !== dataKey)
                continue;
            const referenceKeyLink = this._dataLinkReferenceKey[i];
            if (referenceKeyLink === referenceKey)
                return (i);
        }
        return (null);
    }
    NotifyLink(dataKey, dataFields) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this._dataLinkDataKey.length; i++) {
                const dataKeyLink = this._dataLinkDataKey[i];
                if ((dataKeyLink !== dataKey) || (!this.IsCompatibleDataFields(dataFields, this._dataLinkDataFields[i])))
                    continue;
                const referenceKeyLink = this._dataLinkReferenceKey[i];
                yield this.Notify(referenceKeyLink, null, null);
            }
        });
    }
    Unsubscribe(dataKey) {
        this.UnsubscribeStorage(dataKey);
        this.UnsubscribeFor(dataKey);
        this.UnsubscribeBarber(dataKey);
        this.UnsubscribeLink(dataKey);
        this.UnsubscribeComponent(dataKey);
    }
    UnsubscribeDetached(sector) {
        this.UnsubscribeComponentDetached(sector);
    }
    GetComponentDataKeyIndex(dataKey) {
        const data = this._dataComponentKey;
        for (let i = 0; i < data.length; i++) {
            if (data[i] == dataKey)
                return (i);
        }
        return (null);
    }
    CreateComponentDataKeyIndex(dataKey) {
        const index = this._dataComponentKey.push(dataKey);
        this._dataComponentField.push([]);
        this._dataComponentElements.push([]);
        this._dataComponentFunction.push([]);
        this._dataComponentElementsFocus.push([]);
        return (index - 1);
    }
    SubscribeComponent(value, el, notifyFunction, elFocus = null) {
        let dataKey = null;
        let dataFields = null;
        let elComponentFocus = null;
        if (this.Application.Parser.IsMustache(value)) {
            const mustacheParts = this.Application.Parser.ParseMustache(value);
            dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
            dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
            elComponentFocus = elFocus;
        }
        else {
            dataKey = value;
        }
        let dataKeyIndex = this.GetComponentDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            dataKeyIndex = this.CreateComponentDataKeyIndex(dataKey);
        this._dataComponentField[dataKeyIndex].push(dataFields);
        this._dataComponentElements[dataKeyIndex].push(el);
        this._dataComponentFunction[dataKeyIndex].push(notifyFunction);
        this._dataComponentElementsFocus[dataKeyIndex].push(elComponentFocus);
    }
    UnsubscribeComponent(dataKey) {
        const dataKeyIndex = this.GetComponentDataKeyIndex(dataKey);
        if (dataKeyIndex == null)
            return;
        this._dataComponentKey.splice(dataKeyIndex, 1);
        this._dataComponentField.splice(dataKeyIndex, 1);
        this._dataComponentElements.splice(dataKeyIndex, 1);
        this._dataComponentFunction.splice(dataKeyIndex, 1);
        this._dataComponentElementsFocus.splice(dataKeyIndex, 1);
    }
    UnsubscribeComponentDetached(sector) {
        for (let i = this._dataComponentKey.length - 1; i >= 0; i--) {
            const dataComponentElements = this._dataComponentElements[i];
            for (let j = dataComponentElements.length - 1; j >= 0; j--) {
                const dataComponentElement = dataComponentElements[j];
                if (this.Application.Document.IsElementAttached(dataComponentElement))
                    continue;
                dataComponentElements.splice(j, 1);
                this._dataComponentField[i].splice(j, 1);
                this._dataComponentFunction[i].splice(j, 1);
                this._dataComponentElementsFocus[i].splice(j, 1);
            }
            if (dataComponentElements.length > 0)
                continue;
            this._dataComponentKey.splice(i, 1);
            this._dataComponentField.splice(i, 1);
            this._dataComponentElements.splice(i, 1);
            this._dataComponentFunction.splice(i, 1);
            this._dataComponentElementsFocus.splice(i, 1);
        }
    }
    NotifyComponent(dataKey, dataFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKeyIndex = this.GetComponentDataKeyIndex(dataKey);
            if (dataKeyIndex == null)
                return;
            const dataComponentElements = this._dataComponentElements[dataKeyIndex];
            const dataComponentFunctions = this._dataComponentFunction[dataKeyIndex];
            for (let i = dataComponentElements.length - 1; i >= 0; i--) {
                const dataComponentElement = dataComponentElements[i];
                if ((this.Application.Document.IsElementAttached(dataComponentElement)) && (!this.Application.Document.IsElementDetached(dataComponentElement))) {
                    const dataComponentFunction = dataComponentFunctions[i];
                    const result = yield dataComponentFunction.apply(null, [dataComponentElement, this.Application, dataFields]);
                    if ((result == null) || (result == true))
                        yield this.Application.Document.ResolveComponentUpdate(dataComponentElement, null);
                }
                else if (!this.Application.SectorContainerHandler.IsElementContainerized(dataComponentElement)) {
                    this._dataComponentField[dataKeyIndex].splice(i, 1);
                    this._dataComponentElements[dataKeyIndex].splice(i, 1);
                    this._dataComponentFunction[dataKeyIndex].splice(i, 1);
                    this._dataComponentElementsFocus[dataKeyIndex].splice(i, 1);
                }
            }
        });
    }
    GetElementByModel(sector, model) {
        if (!this.Application.Parser.IsMustacheOnly(model))
            return (null);
        const mustacheParts = this.Application.Parser.ParseMustache(model);
        const dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
        const dataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
        const el = this.GetElementByModelComponent(sector, model, dataKey, dataFields);
        if (el !== null)
            return (el);
        return (this.GetElementByModelBarber(sector, model, dataKey, dataFields));
    }
    GetElementByModelComponent(sector, model, dataKey, dataFields) {
        const dataKeyIndex = this.GetComponentDataKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return (null);
        const componentDataFields = this._dataComponentField[dataKeyIndex];
        const els = this._dataComponentElementsFocus[dataKeyIndex];
        for (let i = els.length - 1; i >= 0; i--) {
            const el = els[i];
            if (el === null)
                continue;
            if (el.parentElement == null)
                continue;
            const componentDataField = componentDataFields[i];
            if (componentDataField == null)
                continue;
            const isEqual = this.Application.Solver.IsEqualStringArray(dataFields, componentDataField);
            if (isEqual)
                return (el);
        }
        return (null);
    }
    GetElementByModelBarber(sector, model, dataKey, dataFields) {
        const dataKeyIndex = this.GetBarberDataKeyIndex(dataKey);
        if (dataKeyIndex === null)
            return;
        const dataBarberElements = this._dataBarberElements[dataKeyIndex];
        const dataBarberFields = this._dataBarberFields[dataKeyIndex];
        for (let i = 0; i < dataBarberElements.length; i++) {
            const element = dataBarberElements[i];
            const sectorElement = this.Application.Document.GetSector(element);
            if (sectorElement !== sector)
                continue;
            const barberFields = dataBarberFields[i];
            const isEqual = this.IsEqualDataFields(barberFields, dataFields);
            if (!isEqual)
                continue;
            return (element);
        }
        return (null);
    }
    IsCompatibleDataFields(dataFields1, dataFields2) {
        if (dataFields1 == null)
            return (true);
        if (dataFields2 == null)
            return (true);
        for (let i = 0; (i < dataFields1.length) && (i < dataFields2.length); i++)
            if (dataFields1[i] != dataFields2[i])
                return (false);
        return (true);
    }
    IsEqualDataFields(dataFields1, dataFields2) {
        const isNull1 = dataFields1 == null;
        const isNull2 = dataFields2 == null;
        if (isNull1 != isNull2)
            return (false);
        if (isNull1)
            return (true);
        const length = dataFields1.length;
        if (length != dataFields2.length)
            return (false);
        for (let i = 0; i < length; i++)
            if (dataFields1[i] != dataFields2[i])
                return (false);
        return (true);
    }
    Lock(dataKey) {
        for (let i = 0; i < this._lockedData.length; i++) {
            const locked = this._lockedData[i];
            if (locked[0] == dataKey)
                return (false);
        }
        this._lockedData.push([dataKey, false]);
        return (true);
    }
    Unlock(dataKey, notify) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this._lockedData.length; i++) {
                const locked = this._lockedData[i];
                if (locked[0] !== dataKey)
                    continue;
                this._lockedData.splice(i, 1);
                if ((locked[1]) && (notify))
                    yield this.Notify(dataKey, null, null);
                return (true);
            }
            return (false);
        });
    }
    IsLocked(dataKey) {
        for (let i = 0; i < this._lockedData.length; i++) {
            const locked = this._lockedData[i];
            if (locked[0] !== dataKey)
                continue;
            locked[1] = true;
            return (true);
        }
        return (false);
    }
}

"use strict";
class DrapoParser {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this.MUSTACHE_START = '{{';
        this.MUSTACHE_START_OVERFLOW = '{{{';
        this.MUSTACHE_END = '}}';
        this.MUSTACHE_INDEXER_START = '[';
        this.MUSTACHE_INDEXER_END = ']';
        this.ITERATOR_START = '(';
        this.ITERATOR_END = ')';
        this.CLASS_START = '{';
        this.CLASS_END = '}';
        this._tokensStart = [' ', '{', '=', '!', '<', '>', '&', '|', '-', '+', '*', '/'];
        this._tokensBlock = [['&', '&'], ['|', '|'], ['!', '='], ['>', '='], ['<', '=']];
        this._tokensComparator = ['=', '!=', '>', '>=', '<', '<=', 'LIKE'];
        this._tokensLogical = ['&&', '||'];
        this._tokensArithmetic = ['+', '-', '*', '/'];
        this._canUseRegexGroups = false;
        this._application = application;
    }
    Tokenize(data, splitter = " ") {
        if (data == null)
            return (null);
        return (data.split(splitter));
    }
    ParseFor(data) {
        const parse = this.Tokenize(data);
        if (parse == null)
            return (null);
        if (parse.length != 3) {
            this.Application.ExceptionHandler.HandleError('The for syntax is wrong. Waiting 3 arguments in : {0} ', data);
            return (null);
        }
        if (parse[1] != 'in') {
            this.Application.ExceptionHandler.HandleError('The for syntax is wrong. Expecting "in" in the second argument: {0} ', data);
            return (null);
        }
        return (parse);
    }
    ParseForIterable(data) {
        const parse = this.Tokenize(data, '.');
        return (parse);
    }
    ParseMustaches(data, checkEmbedded = false) {
        const mustaches = this.ParseMustachesInternal(data);
        if (!checkEmbedded)
            return (mustaches);
        for (let i = 0; i < mustaches.length; i++) {
            const mustache = mustaches[i];
            const mustachesEmbedded = this.ParseMustachesInternal(mustache.substr(2, mustache.length - 4));
            for (let j = 0; j < mustachesEmbedded.length; j++)
                mustaches.push(mustachesEmbedded[j]);
        }
        return (mustaches);
    }
    ParseMustachesInternal(data) {
        const mustaches = [];
        let opened = 0;
        const length = data.length - 1;
        let start = 0;
        for (let i = 0; i < length; i++) {
            const block = data.substr(i, 2);
            if (block === this.MUSTACHE_START) {
                if (opened === 0)
                    start = i;
                opened++;
                i++;
            }
            else if (block === this.MUSTACHE_END) {
                opened--;
                i++;
                if (opened !== 0)
                    continue;
                let mustache = data.substring(start, i + 1);
                while (mustache.indexOf(this.MUSTACHE_START_OVERFLOW) === 0)
                    mustache = mustache.substring(1);
                mustaches.push(mustache);
            }
        }
        return (mustaches);
    }
    IsMustache(data) {
        if (data === null)
            return (false);
        if (!((typeof data === 'string') || (data instanceof String)))
            return (false);
        if (data.length < 4)
            return (false);
        return ((data.substr(0, 2) == this.MUSTACHE_START) && (data.substr(data.length - 2, 2) == this.MUSTACHE_END));
    }
    IsMustacheContentValid(data) {
        if (!this.IsMustache(data))
            return (false);
        return ((this.GetMatchs(data, this.MUSTACHE_START)) === (this.GetMatchs(data, this.MUSTACHE_END)));
    }
    IsMustacheIndexer(data) {
        if (data === null)
            return (false);
        if (data.length < 3)
            return (false);
        if (data[0] !== this.MUSTACHE_INDEXER_START)
            return (false);
        if (data[data.length - 1] !== this.MUSTACHE_INDEXER_END)
            return (false);
        return (this.IsMustache(data.substring(this.MUSTACHE_INDEXER_START.length, data.length - this.MUSTACHE_INDEXER_END.length)));
    }
    GetMustacheInsideIndexer(data) {
        return (data.substring(this.MUSTACHE_INDEXER_START.length, data.length - this.MUSTACHE_INDEXER_END.length));
    }
    CreateMustacheIndexer(data) {
        return (this.MUSTACHE_INDEXER_START + data + this.MUSTACHE_INDEXER_END);
    }
    GetMatchs(data, search) {
        let hits = 0;
        let indexStart = 0;
        while ((indexStart = data.indexOf(search, indexStart)) >= 0) {
            hits++;
            indexStart = indexStart + search.length;
        }
        return (hits);
    }
    HasMustache(data) {
        if (data === null)
            return (false);
        if (!((typeof data === 'string') || (data instanceof String)))
            return (false);
        return (data.indexOf(this.MUSTACHE_START) > -1);
    }
    ParseMustache(data) {
        const mustache = data.substr(2, data.length - 4);
        const mustacheFields = [];
        let opened = 0;
        const length = data.length;
        let start = 0;
        for (let i = 0; i < length; i++) {
            const block = mustache.substr(i, 2);
            if (block === this.MUSTACHE_START) {
                opened++;
                i++;
            }
            else if (block === this.MUSTACHE_END) {
                opened--;
                i++;
            }
            else if ((opened === 0) && (mustache[i] === '.')) {
                mustacheFields.push(mustache.substring(start, i));
                start = i + 1;
            }
        }
        if (start !== length)
            mustacheFields.push(mustache.substring(start, length));
        return (mustacheFields);
    }
    ParseProperty(data) {
        return (this.Tokenize(data, '-'));
    }
    ParsePath(data) {
        return (this.Tokenize(data, '.'));
    }
    HasFunction(data) {
        const functions = this.ParseFunctions(data);
        for (let i = 0; i < functions.length; i++)
            if (this.IsFunction(functions[i]))
                return (true);
        return (false);
    }
    IsFunction(data) {
        const functionParsed = this.ParseFunction(data, false);
        return (functionParsed != null);
    }
    ParseFunctionsPartial(data) {
        const functions = [];
        let buffer = '';
        let blockCount = 0;
        for (let i = 0; i < data.length; i++) {
            const chr = data[i];
            if (chr === '(') {
                blockCount++;
                buffer += chr;
            }
            else if (chr === ')') {
                blockCount--;
                buffer += chr;
                if (blockCount === 0) {
                    if (buffer[0] !== '(')
                        functions.push(buffer);
                    buffer = '';
                }
            }
            else if ((blockCount === 0) && (this.IsFunctionPartialDelimiter(chr))) {
                buffer = '';
            }
            else {
                buffer += chr;
            }
        }
        return (functions);
    }
    IsFunctionPartialDelimiter(data) {
        if (data === ' ')
            return (true);
        if (data === ':')
            return (true);
        if (data === ';')
            return (true);
        if (data === '=')
            return (true);
        return (false);
    }
    ParseFunctions(data) {
        const functions = this.ParseBlock(data, ';');
        for (let i = functions.length - 1; i >= 0; i--) {
            const functionText = functions[i];
            const functionStartIndex = this.GetFunctionStart(functionText);
            if (functionStartIndex === 0)
                continue;
            functions[i] = functionText.substring(functionStartIndex);
        }
        return (functions);
    }
    GetFunctionStart(functionText) {
        for (let i = 0; i < functionText.length; i++)
            if (this.IsFunctionStartValid(functionText[i]))
                return (i);
        return (functionText.length);
    }
    IsFunctionStartValid(character) {
        if (character === ' ')
            return (false);
        if (character === '!')
            return (false);
        return (true);
    }
    ParseFunction(data, checkParameters = true) {
        const indexStart = data.indexOf('(');
        if (indexStart <= 0)
            return (null);
        if (data[data.length - 1] !== ')')
            return (null);
        const functionParsed = new DrapoFunction();
        const name = data.substr(0, indexStart).toLowerCase();
        if (!this.IsValidFunctionName(name))
            return (null);
        functionParsed.Name = name;
        functionParsed.Parameters = this.ParseParameters(data.substr(indexStart + 1, (data.length - (indexStart + 2))));
        if (!checkParameters)
            return (functionParsed);
        for (let i = functionParsed.Parameters.length - 1; i >= 0; i--)
            if (!this.IsValidFunctionParameter(functionParsed.Parameters[i]))
                return (null);
        return (functionParsed);
    }
    IsValidFunctionName(name) {
        if (name.length == 0)
            return (false);
        if (name[name.length - 1] === ' ')
            return (false);
        return (true);
    }
    ParseParameters(data) {
        return (this.ParseBlockWithQuotationMark(data, ',', ["'", '"']));
    }
    ParseBlock(data, delimiter) {
        const items = [];
        let buffer = '';
        let blockCount = 0;
        for (let i = 0; i < data.length; i++) {
            const chr = data[i];
            if (chr === '(') {
                blockCount++;
                buffer += chr;
            }
            else if (chr === ')') {
                blockCount--;
                buffer += chr;
            }
            else if (chr === delimiter) {
                if (blockCount === 0) {
                    items.push(buffer);
                    buffer = '';
                }
                else {
                    buffer += chr;
                }
            }
            else {
                buffer += chr;
            }
        }
        if (data.length > 0)
            items.push(buffer);
        return (items);
    }
    ParseBlockWithQuotationMark(data, delimiter, quotations) {
        const items = [];
        let buffer = '';
        let blockCount = 0;
        let quotation = null;
        for (let i = 0; i < data.length; i++) {
            const chr = data[i];
            if (chr === '(') {
                blockCount++;
                buffer += chr;
            }
            else if (chr === ')') {
                blockCount--;
                buffer += chr;
            }
            else if ((buffer.length == 0) && (quotations.indexOf(chr) >= 0)) {
                quotation = chr;
            }
            else if (chr === quotation) {
                quotation = null;
            }
            else if ((chr === delimiter) && (quotation === null)) {
                if (blockCount === 0) {
                    items.push(buffer);
                    buffer = '';
                }
                else {
                    buffer += chr;
                }
            }
            else {
                buffer += chr;
            }
        }
        if (data.length > 0)
            items.push(buffer);
        return (items);
    }
    ParseBlockMathematicalExpression(data) {
        const items = [];
        let buffer = '';
        let blockCount = 0;
        for (let i = 0; i < data.length; i++) {
            const chr = data[i];
            if (chr === '(') {
                if (blockCount === 0) {
                    if (buffer.length > 0)
                        items.push(buffer);
                    buffer = '';
                }
                blockCount++;
                buffer += chr;
            }
            else if (chr === ')') {
                blockCount--;
                buffer += chr;
                if (blockCount === 0) {
                    items.push(buffer);
                    buffer = '';
                }
            }
            else if (!this.IsBlockNumber(buffer, chr)) {
                if (blockCount === 0) {
                    if (buffer.length > 0)
                        items.push(buffer);
                    buffer = chr;
                }
                else {
                    buffer += chr;
                }
            }
            else {
                buffer += chr;
            }
        }
        if (buffer.length > 0)
            items.push(buffer);
        return (this.ParseBlockMathematicalExpressionSignals(items));
    }
    IsBlockNumber(buffer, chr) {
        return ((this.IsNumber(buffer + chr)) || ((chr === '.') && (this.IsNumber(buffer))));
    }
    ParseBlockMathematicalExpressionSignals(items) {
        const itemsSignal = [];
        let isLastOperation = true;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (isLastOperation) {
                itemsSignal.push(item);
                isLastOperation = false;
            }
            else if (this.IsMathematicalOperator(item)) {
                itemsSignal.push(item);
                isLastOperation = true;
            }
            else if (item.length > 1) {
                if (this.IsMathematicalOperator(item[0], true)) {
                    itemsSignal.push(item[0]);
                    itemsSignal.push(item.substring(1));
                }
                else {
                    itemsSignal.push(item);
                }
                isLastOperation = false;
            }
        }
        return (itemsSignal);
    }
    IsMathematicalOperator(chr, onlyItemOperator = false) {
        if (chr === '+')
            return (true);
        if (chr === '-')
            return (true);
        if (onlyItemOperator)
            return (false);
        if (chr === '*')
            return (true);
        if (chr === '/')
            return (true);
        return (false);
    }
    IsValidFunctionParameter(parameter) {
        let blockOpen = 0;
        let blockClose = 0;
        for (let i = parameter.length - 1; i >= 0; i--) {
            const chr = parameter[i];
            if (chr === '(')
                blockOpen++;
            else if (chr === ')')
                blockClose++;
        }
        return (blockOpen === blockClose);
    }
    IsIterator(data) {
        if (this.Application.Serializer.IsJson(data))
            return (true);
        return (this.IsIteratorArray(data));
    }
    IsIteratorArray(data) {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr != null) && (data.substr(0, 1) == this.ITERATOR_START) && (data.substr(data.length - 1, 1) == this.ITERATOR_END));
    }
    ParseIterator(data) {
        if (this.Application.Serializer.IsJson(data))
            return (this.Application.Serializer.Deserialize(data));
        return (this.ParseIteratorArray(data));
    }
    ParseIteratorArray(data) {
        const dataContent = data.substr(1, data.length - 2);
        const indexInterval = dataContent.indexOf('..');
        if (indexInterval !== -1) {
            const limits = this.Tokenize(dataContent, '..');
            if (limits.length != 2) {
                this.Application.ExceptionHandler.HandleError('Iterator in wrong format: {0}', data);
                return ([]);
            }
            const limitStart = this.ParseNumberBlock(limits[0]);
            const limitEnd = this.ParseNumberBlock(limits[1]);
            const dataIntervals = [];
            for (let i = limitStart; i < limitEnd; i++)
                dataIntervals.push(i.toString());
            return (dataIntervals);
        }
        else {
            return (this.Tokenize(dataContent, ','));
        }
    }
    ParseNumberBlock(data, valueDefault = 0) {
        let dataClean = '';
        for (let i = 0; i < data.length; i++) {
            const character = data.charAt(i);
            if (character == ' ')
                continue;
            dataClean = dataClean + character;
        }
        const dataWithoutDate = this.ReplaceDateWithTimespan(dataClean);
        return (this.ParseNumber(this.Application.Solver.ResolveMathematicalExpression(dataWithoutDate), valueDefault));
    }
    ReplaceDateWithTimespan(data) {
        const dataWithoutISO = this.ReplaceDateWithTimespanISO(data);
        const dataWithoutShort = this.ReplaceDateWithTimespanShort(dataWithoutISO);
        return (dataWithoutShort);
    }
    ReplaceDateWithTimespanISO(data) {
        const matchs = data.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?((\-|\+)\d{2}:\d{2})?/gi);
        if (matchs === null)
            return (data);
        let dataTimespan = data;
        for (let i = 0; i < matchs.length; i++) {
            const match = matchs[i];
            const date = new Date(match);
            const timespan = date.getTime();
            dataTimespan = dataTimespan.replace(match, timespan.toString());
        }
        return (dataTimespan);
    }
    ReplaceDateWithTimespanShort(data) {
        const matchs = data.match(/\d{4}-\d{2}-\d{2}\d{2}:\d{2}:\d{2}:\d{3}/gi);
        if (matchs === null)
            return (data);
        let dataTimespan = data;
        for (let i = 0; i < matchs.length; i++) {
            const match = matchs[i];
            const matchISO = match.substring(0, 10) + 'T' + match.substring(10, 18) + 'Z';
            const date = new Date(matchISO);
            const timespan = date.getTime();
            dataTimespan = dataTimespan.replace(match, timespan.toString());
        }
        return (dataTimespan);
    }
    IsClassArray(data) {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr(0, 1) == this.CLASS_START) && (data.substr(data.length - 1, 1) == this.CLASS_END));
    }
    IsMustacheOnly(data, allowInternal = false) {
        if (allowInternal)
            return (this.IsMutacheOnlyInternal(data));
        if (!this.IsMustache(data))
            return (false);
        return (data.indexOf(this.MUSTACHE_START, 2) === -1);
    }
    IsMutacheOnlyInternal(data) {
        if (!this.IsMustache(data))
            return (false);
        let open = 0;
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i] === ' ')
                return (false);
            const current = data.substr(i, 2);
            if (current === this.MUSTACHE_START) {
                open++;
                i++;
            }
            else if (current === this.MUSTACHE_END) {
                open--;
                i++;
            }
        }
        return (open === 0);
    }
    ParseClassArray(data) {
        return (this.ParseBlock(data.substr(1, data.length - 2), ','));
    }
    ParseTags(data) {
        return (this.ParseBlock(data, ','));
    }
    ParseClass(data) {
        const parsed = this.Tokenize(data, ':');
        if (parsed.length == 1)
            return ([parsed[0], 'true', null]);
        return ([parsed[0], parsed[1], parsed.length > 2 ? parsed[2] : null]);
    }
    ParseConditionalBlock(data) {
        if (data.indexOf == null)
            return (data.toString());
        let indexStart = data.indexOf('(');
        if (indexStart < 0)
            return (null);
        let indexStartNext = null;
        let indexEnd = null;
        indexStart++;
        while (((indexStartNext = data.indexOf('(', indexStart)) < (indexEnd = data.indexOf(')', indexStart))) && (indexStartNext != -1)) {
            indexStart = indexStartNext + 1;
        }
        return (data.substring(indexStart, indexEnd));
    }
    ParseConditionalLogicalOrComparator(data) {
        let parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '||');
        if (parsed != null)
            return (parsed);
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '&&');
        if (parsed != null)
            return (parsed);
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '!=');
        if (parsed != null)
            return (parsed);
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '=');
        if (parsed != null)
            return (parsed);
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '>');
        if (parsed != null)
            return (parsed);
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '<');
        if (parsed != null)
            return (parsed);
        return ([data]);
    }
    ParseConditionalLogicalOrComparatorSeparator(data, separator) {
        const index = data.indexOf(separator);
        if (index > 0)
            return ([data.substring(0, index), separator, data.substring(index + separator.length)]);
        else if (index == 0)
            return (['', separator, data.substring(index + separator.length)]);
        return (null);
    }
    GetStringAsNumber(text) {
        if (text == null)
            return (null);
        return (Number(text));
    }
    ParseEvents(data) {
        if ((data === null) || (data === undefined))
            return ([]);
        const parse = this.Tokenize(data, ',');
        return (parse);
    }
    ParseEventProperty(el, event, value) {
        const parse = this.ParseProperty(event);
        if (parse.length < 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'on')
            return (null);
        const location = this.ParseEventLocation(parse[2]);
        let index = location === null ? 2 : 3;
        const trigger = parse[index++];
        const eventFilter = parse.length > index ? parse[index] : null;
        const validation = el.getAttribute('d-validation-on-' + trigger);
        return ([event, location, trigger, value, eventFilter, validation]);
    }
    ParseEventLocation(value) {
        if (value === 'body')
            return (value);
        return (null);
    }
    ParseEvent(event) {
        const parse = this.ParseProperty(event);
        const eventFilter = parse.length > 1 ? parse[1] : null;
        return ([parse[0], eventFilter]);
    }
    IsUri(data) {
        if (data === null)
            return (false);
        if ((data.length > 0) && (data.substr(0, 1) === '~'))
            return (true);
        if ((data.length > 0) && (data.substr(0, 1) === '/'))
            return (true);
        return (false);
    }
    IsHTML(data) {
        if (data === null)
            return (false);
        if ((data.length > 0) && (data.substr(0, 1) === '<'))
            return (true);
        return (false);
    }
    ParsePipes(data) {
        if (data == null)
            return (null);
        const parse = this.Tokenize(data, ',');
        return (parse);
    }
    ParseDocumentContent(data) {
        const index = data.indexOf('<div');
        if (index >= 0)
            return (data.substr(index));
        return (data);
    }
    ParseElementAttributes(data) {
        const element = this.ParseElement(data);
        return (this.ParseAttributes(element));
    }
    ParseElement(data) {
        const index = data.indexOf('>');
        if (index >= 0)
            return (data.substr(0, index));
        return ('');
    }
    ParseAttributes(data) {
        const attributes = [];
        const block = this.ParseBlockAttribute(data);
        for (let i = 0; i < block.length; i++) {
            const attribute = this.ParseAttribute(block[i]);
            if (attribute !== null)
                attributes.push(attribute);
        }
        return (attributes);
    }
    ParseAttribute(data) {
        const block = this.ParseBlock(data, '=');
        if (block.length !== 2)
            return (null);
        const value = block[1];
        return ([block[0].toLowerCase(), value.substr(1, value.length - 2)]);
    }
    ParseDate(data) {
        const date = new Date(data);
        if ((date == null) || (date.toString() == 'Invalid Date'))
            return (null);
        return (date);
    }
    ParseDateCulture(data, culture = null) {
        if (data === null)
            return (null);
        if (typeof data.getMonth === 'function')
            return data;
        const dateISO = this.GetDateISO(data);
        if (dateISO !== null)
            return (dateISO);
        if (culture === null)
            culture = this.Application.Globalization.GetCulture();
        if (this._canUseRegexGroups)
            return (this.ParseDateCultureRegex(data, culture));
        return (this.ParseDateCultureRegularExpression(data, culture));
    }
    GetDateISO(data) {
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(data))
            return (null);
        const date = new Date(data);
        if ((date === null) || (!(date instanceof Date)) || (date.toString() == 'Invalid Date') || (date.toISOString() !== data))
            return (null);
        return (date);
    }
    ParseDateCultureRegex(data, culture) {
        const dateFormatRegex = this.Application.Globalization.GetDateFormatsRegex(culture);
        const match = data.match(dateFormatRegex);
        if (match == null)
            return (null);
        const groups = match.groups;
        const year = this.ParseDateGroupNumber(groups.year);
        if (year == null)
            return (null);
        const month = this.ParseDateGroupNumber(groups.month, 12);
        if (month == null)
            return (null);
        const day = this.ParseDateGroupNumber(groups.day, 31);
        if (day == null)
            return (null);
        const hours = 12;
        const date = new Date(Date.UTC(year, month - 1, day, hours, 0, 0, 0));
        if (!this.IsDate(date))
            return (null);
        if (date.getUTCDate() !== day)
            return (null);
        return (date);
    }
    ParseDateCultureRegularExpression(data, culture) {
        const regularExpressions = this.Application.Globalization.GetDateFormatsRegularExpressions(culture);
        for (let i = 0; i < regularExpressions.length; i++) {
            const regularExpression = regularExpressions[i];
            if (!regularExpression.IsValid(data))
                continue;
            const year = this.ParseDateGroupNumber(regularExpression.GetValue('year'));
            if (year == null)
                return (null);
            const month = this.ParseDateGroupNumber(regularExpression.GetValue('month'), 12);
            if (month == null)
                return (null);
            const day = this.ParseDateGroupNumber(regularExpression.GetValue('day'), 31);
            if (day == null)
                return (null);
            const hours = 12;
            const date = new Date(Date.UTC(year, month - 1, day, hours, 0, 0, 0));
            if (!this.IsDate(date))
                return (null);
            if (date.getUTCDate() !== day)
                return (null);
            return (date);
        }
        return (null);
    }
    IsDate(date) {
        return (!((date == null) || (date.toString() == 'Invalid Date')));
    }
    ParseDateGroupNumber(value, max = null) {
        if (value == null)
            return (null);
        const valueNumber = this.ParseNumber(value, null);
        if ((max != null) && (valueNumber > max))
            return (null);
        return (valueNumber);
    }
    ParseNumber(data, valueDefault = 0) {
        if (data == null)
            return (valueDefault);
        const value = Number(data);
        if (Number.NaN === value)
            return (valueDefault);
        return (value);
    }
    ParseNumberPercentageCulture(data, culture = null) {
        if (data == null)
            return (null);
        if (data.endsWith('%'))
            data = data.substr(0, data.length - 1);
        return (this.ParseNumberCulture(data, culture));
    }
    ParseNumberCulture(data, culture = null) {
        if (data == null)
            return (null);
        const delimiterThousands = this.Application.Globalization.GetDelimiterThousands(culture);
        const delimiterDecimal = this.Application.Globalization.GetDelimiterDecimal(culture);
        let valueClean = this.Application.Solver.Replace(data, delimiterThousands, '');
        if (delimiterDecimal !== '.')
            valueClean = valueClean.replace(delimiterDecimal, '.');
        const value = Number(valueClean);
        if (Number.NaN === value)
            return (null);
        return (value);
    }
    ParseBoolean(data, valueDefault = false) {
        if (data == null)
            return (valueDefault);
        return (data.toLowerCase() === 'true');
    }
    ParseQueryString(url) {
        const values = [];
        const indexQueryString = url.indexOf('?');
        if ((indexQueryString == null) || (indexQueryString < 0))
            return (values);
        const queryString = url.substring(indexQueryString + 1);
        const keyValuePairs = this.ParseBlock(queryString, '&');
        for (let i = 0; i < keyValuePairs.length; i++) {
            const keyValuePair = this.ParseBlock(keyValuePairs[i], '=');
            if (keyValuePair.length !== 2)
                continue;
            const key = keyValuePair[0];
            const value = keyValuePair[1];
            values.push([key, value]);
        }
        return (values);
    }
    ParseValidationGroups(data) {
        if (data == null)
            return ([]);
        return (this.ParseBlock(data, ','));
    }
    IsValidatorArray(data) {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr(0, 1) == this.CLASS_START) && (data.substr(data.length - 1, 1) == this.CLASS_END));
    }
    ParseValidatorsArray(data) {
        return (this.ParseBlock(data.substr(1, data.length - 2), ','));
    }
    ParseValidator(data) {
        const parsed = this.Tokenize(data, ':');
        if (parsed.length == 1)
            return ([parsed[0], 'true']);
        return ([parsed[0], parsed[1]]);
    }
    ParseHTMLAttributes(data) {
        const attributes = [];
        let indexStart = 0;
        while ((indexStart = data.indexOf('<', indexStart)) >= 0) {
            const indexEnd = data.indexOf('>', indexStart);
            if (indexEnd === -1)
                break;
            const dataElement = data.substring(indexStart, indexEnd);
            const elementAttributes = this.ParseAttributes(dataElement);
            attributes.push.apply(attributes, elementAttributes);
            indexStart = indexEnd;
        }
        return (attributes);
    }
    ParseBlockAttribute(data) {
        const items = [];
        let buffer = '';
        let attributeDelimiter = null;
        const space = ' ';
        for (let i = 0; i < data.length; i++) {
            const chr = data[i];
            if ((attributeDelimiter !== null) && (chr === attributeDelimiter)) {
                attributeDelimiter = null;
                buffer += chr;
            }
            else if ((chr === "'") || (chr === '"')) {
                attributeDelimiter = chr;
                buffer += chr;
            }
            else if (chr === space) {
                if (attributeDelimiter === null) {
                    items.push(buffer);
                    buffer = '';
                }
                else {
                    buffer += chr;
                }
            }
            else {
                buffer += chr;
            }
        }
        if (data.length > 0)
            items.push(buffer);
        return (items);
    }
    ParseExpression(expression) {
        const block = new DrapoExpressionItem(DrapoExpressionItemType.Block);
        this.ParseExpressionInsert(block, expression);
        block.Value = expression;
        return (block);
    }
    ParseExpressionInsert(block, expression) {
        const tokens = this.ParseExpressionTokens(expression);
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const item = this.ParseExpressionItem(token);
            block.Items.push(item);
        }
    }
    ParseExpressionTokens(expression) {
        const tokens = [];
        let blockCount = 0;
        let textBlock = null;
        let buffer = '';
        for (let i = 0; i < expression.length; i++) {
            const chr = expression[i];
            if (chr === textBlock) {
                buffer = buffer + chr;
                tokens.push(buffer);
                buffer = '';
                textBlock = null;
                continue;
            }
            if ((chr === '"') || (chr === "'")) {
                this.AddTokenNonEmpty(tokens, buffer);
                buffer = chr;
                textBlock = chr;
                continue;
            }
            if (textBlock !== null) {
                buffer = buffer + chr;
                continue;
            }
            if (chr === '(') {
                if ((blockCount === 0) && (this.ParseExpressionItemType(buffer) !== DrapoExpressionItemType.Text)) {
                    this.AddTokenNonEmpty(tokens, buffer);
                    buffer = '';
                }
                blockCount++;
            }
            else if (chr === ')') {
                blockCount--;
                if ((blockCount === 0) && (buffer !== '')) {
                    buffer = buffer + chr;
                    tokens.push(buffer);
                    buffer = '';
                    continue;
                }
            }
            if ((blockCount === 0) && (this.IsParseExpressionStartingToken(chr)) && (!this.IsParseExpressionMiddleToken(buffer, chr))) {
                this.AddTokenNonEmpty(tokens, buffer);
                buffer = '';
            }
            if ((blockCount === 0) && (buffer !== '') && (this.IsParseExpressionItemTypeComplete(buffer)) && (!this.IsParseExpressionItemTypeComplete(buffer + chr))) {
                this.AddTokenNonEmpty(tokens, buffer);
                buffer = '';
            }
            buffer = buffer + chr;
        }
        this.AddTokenNonEmpty(tokens, buffer);
        return (tokens);
    }
    AddTokenNonEmpty(tokens, token) {
        if (token == null)
            return (false);
        if (this.IsTokenEmpty(token))
            return (false);
        tokens.push(token);
        return (true);
    }
    Trim(token) {
        if (token == null)
            return (token);
        let indexStart = 0;
        for (let i = 0; i < token.length; i++) {
            if (token[i] === ' ')
                continue;
            indexStart = i;
            break;
        }
        let indexEnd = token.length - 1;
        for (let i = indexEnd; i >= 0; i--) {
            if (token[i] === ' ')
                continue;
            indexEnd = i;
            break;
        }
        const tokenTrim = token.substring(indexStart, indexEnd + 1);
        return (tokenTrim);
    }
    IsTokenEmpty(token) {
        if (token == null)
            return (true);
        for (let i = 0; i < token.length; i++)
            if (token[i] != ' ')
                return (false);
        return (true);
    }
    IsParseExpressionStartingToken(chr) {
        return (this.Application.Solver.Contains(this._tokensStart, chr));
    }
    IsParseExpressionMiddleToken(buffer, chr) {
        if (buffer.length == 0)
            return (false);
        for (let i = 0; i < this._tokensBlock.length; i++) {
            const tokenBlock = this._tokensBlock[i];
            const tokenBlockBuffer = tokenBlock[0];
            if (buffer.substr(0, tokenBlockBuffer.length) !== tokenBlockBuffer)
                continue;
            for (let j = 1; j < tokenBlock.length; j++)
                if (tokenBlock[j] === chr)
                    return (true);
            return (false);
        }
        if (buffer[0] === '{')
            return (true);
        return (false);
    }
    IsLetterOrNumber(chr) {
        return (chr.match(/^[a-zA-Z0-9_.-]+$/i) != null);
    }
    IsNumber(chr) {
        if (chr == null)
            return (false);
        if (typeof chr !== 'string')
            chr = chr.toString();
        return (chr.match(/^(\-)?((\d)+)?(\.)?(\d)+$/i) != null);
    }
    IsBoolean(data) {
        if (data == null)
            return (false);
        if (typeof data === 'boolean')
            return (true);
        if (typeof data !== 'string')
            data = data.toString();
        return ((data === 'true') || (data === 'false'));
    }
    ParseExpressionItem(token) {
        const tokenTrim = this.Trim(token);
        const type = this.ParseExpressionItemType(tokenTrim);
        const item = new DrapoExpressionItem(type);
        if (item.Type == DrapoExpressionItemType.Block) {
            const content = tokenTrim.substring(1, tokenTrim.length - 1);
            this.ParseExpressionInsert(item, content);
        }
        item.Value = tokenTrim;
        return (item);
    }
    ParseExpressionItemType(token) {
        const isBlockEnd = token.substr(token.length - 1, 1) == ')';
        if (isBlockEnd) {
            const isBlockStart = token.substr(0, 1) == '(';
            if (isBlockStart)
                return (DrapoExpressionItemType.Block);
            else
                return (DrapoExpressionItemType.Function);
        }
        if (token === '!')
            return (DrapoExpressionItemType.Deny);
        if ((token.length > 1) && (token[0] === "'") && (token[token.length - 1] === "'"))
            return (DrapoExpressionItemType.Text);
        if ((token.length > 1) && (token[0] === '"') && (token[token.length - 1] === '"'))
            return (DrapoExpressionItemType.Text);
        if (this.IsMustache(token))
            return (DrapoExpressionItemType.Mustache);
        if (this.Application.Solver.Contains(this._tokensComparator, token))
            return (DrapoExpressionItemType.Comparator);
        if (this.Application.Solver.Contains(this._tokensLogical, token))
            return (DrapoExpressionItemType.Logical);
        if (this.Application.Solver.Contains(this._tokensArithmetic, token))
            return (DrapoExpressionItemType.Arithmetic);
        return (DrapoExpressionItemType.Text);
    }
    IsParseExpressionItemTypeComplete(token) {
        if (this.Application.Solver.Contains(this._tokensLogical, token))
            return (true);
        if (this.Application.Solver.Contains(this._tokensComparator, token))
            return (true);
        if (this.Application.Solver.Contains(this._tokensArithmetic, token))
            return (true);
        if (this.IsNumber(token))
            return (true);
        if (this.IsMustacheContentValid(token))
            return (true);
        if (this.IsLetterOrNumber(token))
            return (true);
        return (false);
    }
    ParseLines(data) {
        const lines = [];
        const split = data.split('\r\n');
        for (let i = 0; i < split.length; i++) {
            const line = split[i];
            if (line.length === 0)
                continue;
            lines.push(line);
        }
        return (lines);
    }
    ParseHeader(data) {
        const index = data.indexOf(':');
        if (index < 0)
            return (null);
        const key = data.substr(0, index);
        const value = data.substr(index + 2);
        return ([key, value]);
    }
    ParseFormat(format) {
        const tokens = [];
        let buffer = '';
        for (let i = 0; i < format.length; i++) {
            const chr = format[i];
            if (this.IsFormatCharacterCompatible(buffer, chr)) {
                buffer = buffer + chr;
            }
            else {
                if (buffer.length > 0)
                    tokens.push(buffer);
                buffer = chr;
            }
        }
        if (buffer.length > 0)
            tokens.push(buffer);
        return (tokens);
    }
    IsFormatCharacterCompatible(buffer, chr) {
        if (buffer.length == 0)
            return (true);
        if (buffer[buffer.length - 1] === chr)
            return (true);
        if (this.IsNumber(buffer) && (this.IsNumber(chr)))
            return (true);
        return (false);
    }
    ParsePixels(value) {
        if ((value == null) || (value == '') || (value.length < 3))
            return (null);
        const valueNumber = this.ParseNumber(value.substr(0, value.length - 2));
        return (valueNumber);
    }
    ParseQuery(value, options) {
        if ((value == null) || (value === ''))
            return (null);
        const query = new DrapoQuery();
        const projections = this.ParseQueryProjections(value);
        if (projections === null) {
            query.Error = "Can't parse the projections.";
            return (query);
        }
        query.Projections = projections;
        const sources = this.ParseQuerySources(value);
        if (sources === null) {
            query.Error = "Can't parse the sources.";
            return (query);
        }
        query.Sources = sources;
        query.Filter = this.ParseQueryFilter(value);
        const sorts = this.ParseQueryOrderBy(value);
        if (sorts === null) {
            query.Error = "Can't parse the order by.";
            return (query);
        }
        query.Sorts = sorts;
        query.Options = this.ParseQueryOptions(options);
        return (query);
    }
    ParseQueryProjections(value) {
        const tokenProjections = this.ParseSubstring(value, "SELECT", "FROM");
        if (tokenProjections === null)
            return (null);
        const projections = [];
        const tokenProjectionsSplit = this.ParseBlock(tokenProjections, ',');
        for (let i = 0; i < tokenProjectionsSplit.length; i++) {
            const tokenProjection = tokenProjectionsSplit[i];
            const projection = this.ParseQueryProjection(tokenProjection);
            if (projection === null)
                return (null);
            projections.push(projection);
        }
        return (projections);
    }
    ParseQueryProjection(value) {
        const projection = new DrapoQueryProjection();
        const valueTrim = this.Trim(value);
        const valueTrimSplit = this.ParseBlock(valueTrim, ' ');
        const alias = this.ParseQueryProjectionAlias(valueTrimSplit);
        projection.Alias = alias;
        const valueTrimFirst = valueTrimSplit[0];
        const functionName = this.ParseQueryProjectionFunctionName(valueTrimFirst);
        if (functionName !== null) {
            projection.FunctionName = functionName;
            const functionParameters = this.ParseQueryProjectionFunctionParameters(valueTrimFirst);
            projection.FunctionParameters = this.ParseQueryProjectionFunctionParametersBlock(functionParameters);
        }
        else {
            const valueDefinition = valueTrimFirst;
            const isMustache = this.IsMustache(valueDefinition);
            const valueTrimFirstSplit = isMustache ? [valueDefinition] : this.ParseBlock(valueDefinition, '.');
            const source = (valueTrimFirstSplit.length > 1) ? valueTrimFirstSplit[0] : null;
            const column = (valueTrimFirstSplit.length > 1) ? valueTrimFirstSplit[1] : valueTrimFirstSplit[0];
            projection.Source = source;
            projection.Column = column;
        }
        return (projection);
    }
    ParseQueryProjectionFunctionName(value) {
        const index = value.indexOf('(');
        if (index < 0)
            return (null);
        const functionName = value.substr(0, index).toUpperCase();
        return (functionName);
    }
    ParseQueryProjectionFunctionParameters(value) {
        const index = value.indexOf('(');
        if (index < 0)
            return (null);
        const parameters = value.substring(index + 1, value.length - 1);
        return (parameters);
    }
    ParseQueryProjectionFunctionParametersBlock(value) {
        return (this.ParseBlock(value, ','));
    }
    ParseQueryProjectionFunctionParameterValue(value) {
        return (this.ParseBlock(value, '.'));
    }
    ParseQueryProjectionAlias(values) {
        if (values.length != 3)
            return (null);
        if (values[1].toUpperCase() !== 'AS')
            return (null);
        return (values[2]);
    }
    ParseQuerySources(value) {
        const tokenSources = this.ParseSubstring(value, 'FROM', 'WHERE', true);
        const tokenSourcesSplit = this.ParseQuerySourcesSplit(tokenSources);
        const sources = [];
        for (let i = 0; i < tokenSourcesSplit.length; i++) {
            const source = this.ParseQuerySource(tokenSourcesSplit[i]);
            if (source === null)
                return (null);
            sources.push(source);
        }
        return (sources);
    }
    ParseQuerySource(value) {
        const source = new DrapoQuerySource();
        const joinType = this.ParseQuerySourceHeadValue(value, 'JOIN');
        source.JoinType = this.Trim(joinType);
        const sourceToken = joinType === null ? value : this.ParseSubstring(value, 'JOIN', 'ON');
        const sourceProjection = this.ParseQueryProjection(sourceToken);
        source.Source = sourceProjection.Column;
        source.Alias = sourceProjection.Alias;
        if (joinType !== null) {
            const indexOn = value.indexOf('ON');
            if (indexOn < 0)
                return (null);
            const onToken = value.substring(indexOn + 2);
            const onConditional = this.ParseQueryConditional(onToken);
            if (onConditional === null)
                return (null);
            if (onConditional.Comparator !== '=')
                return (null);
            source.JoinConditions.push(onConditional);
        }
        return (source);
    }
    ParseQueryConditional(value) {
        const conditional = new DrapoQueryCondition();
        const item = this.ParseExpression(value);
        const leftProjection = this.ParseQueryProjection(item.Items[0].Value);
        conditional.SourceLeft = leftProjection.Source;
        conditional.ColumnLeft = leftProjection.Column;
        if (conditional.SourceLeft == null)
            conditional.ValueLeft = conditional.ColumnLeft;
        conditional.Comparator = item.Items[1].Value.toUpperCase();
        let index = 2;
        if ((item.Items.length === 4) && (conditional.Comparator === 'IS') && (item.Items[index].Value === 'NOT')) {
            conditional.Comparator = 'IS NOT';
            index++;
        }
        if ((item.Items.length > 3) && (conditional.Comparator === 'LIKE')) {
            if (item.Items[2].Value === '%') {
                index++;
                conditional.IsSearchStartRight = true;
            }
            if (item.Items[item.Items.length - 1].Value === '%')
                conditional.IsSearchEndRight = true;
        }
        const valueRight = item.Items[index].Value;
        if (valueRight.toUpperCase() === 'NULL') {
            conditional.IsNullRight = true;
        }
        else {
            const rightProjection = this.ParseQueryProjection(valueRight);
            conditional.SourceRight = rightProjection.Source;
            conditional.ColumnRight = rightProjection.Column;
            if (conditional.SourceRight == null)
                conditional.ValueRight = conditional.ColumnRight;
        }
        return (conditional);
    }
    ParseSubstring(value, start, end, canMissEnd = false) {
        const indexStart = value.indexOf(start);
        if (indexStart < 0)
            return (null);
        let indexEnd = end === null ? -1 : value.indexOf(end);
        if (indexEnd < 0) {
            if (canMissEnd)
                indexEnd = value.length;
            else
                return (null);
        }
        const substring = value.substring(indexStart + start.length, indexEnd);
        return (substring);
    }
    ParseQuerySourcesSplit(value) {
        value = this.Trim(value);
        const sources = [];
        while (value.length != 0) {
            const source = this.ParseQuerySourceHead(value);
            sources.push(source);
            if (value === source)
                break;
            value = value.substring(source.length, value.length);
            value = this.Trim(value);
        }
        return (sources);
    }
    ParseQuerySourceHead(value) {
        let header = this.ParseQuerySourceHeadValue(value, 'INNER JOIN');
        if (header !== null)
            return (header);
        header = this.ParseQuerySourceHeadValue(value, 'LEFT JOIN');
        if (header !== null)
            return (header);
        header = this.ParseQuerySourceHeadValue(value, 'OUTER JOIN');
        if (header !== null)
            return (header);
        header = this.ParseQuerySourceHeadValue(value, 'RIGHT JOIN');
        if (header !== null)
            return (header);
        return (value);
    }
    ParseQuerySourceHeadValue(value, search) {
        const index = value.indexOf(search, 1);
        if (index < 0)
            return (null);
        const header = value.substring(0, index);
        return (header);
    }
    ParseQueryFilter(value) {
        const whereToken = this.ParseSubstring(value, 'WHERE', 'ORDER BY', true);
        if (whereToken === null)
            return (null);
        const filter = this.ParseQueryConditional(whereToken);
        return (filter);
    }
    ParseQueryOrderBy(value) {
        const sorts = [];
        const token = this.ParseSubstring(value, 'ORDER BY ', null, true);
        if (token === null)
            return (sorts);
        const blocks = this.ParseBlock(token, ',');
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            const parts = this.ParseBlock(block, ' ');
            if (parts.length > 2)
                return (null);
            const sort = new DrapoQuerySort();
            sort.Column = parts[0];
            if (parts.length > 1)
                sort.Type = parts[1];
            sorts.push(sort);
        }
        return (sorts);
    }
    ParseQueryOptions(value) {
        const options = new DrapoQueryOptions();
        if (value == null)
            return (options);
        const optionsValues = this.ParseBlock(value, ';');
        for (let i = 0; i < optionsValues.length; i++) {
            const optionsValue = this.ParseBlock(optionsValues[i], '=');
            if (optionsValue[0] === 'list')
                options.List = optionsValue[1];
        }
        return (options);
    }
    ParseSwitch(value) {
        const items = [];
        const switchItems = this.ParseBlock(value, ',');
        for (let i = 0; i < switchItems.length; i++) {
            const switchItem = this.ParseBlock(switchItems[i], ':');
            const item = [switchItem[0], switchItem.length > 1 ? switchItem[1] : null];
            items.push(item);
        }
        return (items);
    }
}

"use strict";
class DrapoPipeMessage {
    constructor() {
        this._type = null;
        this._data = null;
    }
    get Type() {
        return (this._type);
    }
    set Type(value) {
        this._type = value;
    }
    get Data() {
        return (this._data);
    }
    set Data(value) {
        this._data = value;
    }
}

"use strict";
var DrapoPipeMessageType;
(function (DrapoPipeMessageType) {
    DrapoPipeMessageType[DrapoPipeMessageType["Register"] = 0] = "Register";
    DrapoPipeMessageType[DrapoPipeMessageType["Storage"] = 1] = "Storage";
    DrapoPipeMessageType[DrapoPipeMessageType["Execute"] = 2] = "Execute";
})(DrapoPipeMessageType || (DrapoPipeMessageType = {}));

"use strict";
class DrapoPipePollingMessage {
    constructor() {
        this.Key = null;
        this.Hash = null;
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoPlumber {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._connection = null;
        this._lock = false;
        this._messages = [];
        this._actionPolling = null;
        this._pollingMessages = [];
        this._application = application;
    }
    CanUsePipes() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.Application.Config.GetUsePipes());
        });
    }
    ConnectPipe() {
        return __awaiter(this, void 0, void 0, function* () {
            const usePipes = yield this.CanUsePipes();
            if (!usePipes)
                return (false);
            const application = this.Application;
            const pipHubName = yield this.Application.Config.GetPipeHubName();
            const urlRelative = '~/' + pipHubName;
            const urlAbsolute = this.Application.Server.ResolveUrl(urlRelative);
            const connection = new signalR.HubConnectionBuilder()
                .withUrl(urlAbsolute, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
                .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext) => {
                    if (retryContext.previousRetryCount < 10)
                        return (1000);
                    if (retryContext.previousRetryCount < 100)
                        return (10000);
                    return (60000);
                }
            })
                .build();
            this._connection = connection;
            yield connection.start();
            const actionNotify = yield this.Application.Config.GetPipeActionNotify();
            connection.on(actionNotify, (message) => {
                application.Plumber.NotifyPipe(message);
            });
            this._actionPolling = yield this.Application.Config.GetPipeActionPolling();
            connection.on(this._actionPolling, (message) => {
                application.Plumber.ReceivePollingPipe(message);
            });
            connection.onreconnected((connectionId) => __awaiter(this, void 0, void 0, function* () {
                yield this.RequestPipeRegister(connection);
                const onReconnect = yield this.Application.Config.GetOnReconnect();
                if ((onReconnect != null) && (onReconnect != ''))
                    yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onReconnect);
            }));
            yield this.RequestPipeRegister(connection);
            return (true);
        });
    }
    RequestPipeRegister(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const actionRegister = yield this.Application.Config.GetPipeActionRegister();
            yield connection.send(actionRegister);
            yield this.WaitForRegister();
        });
    }
    WaitForRegister(retry = 1000, interval = 50) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeHeaderConnectionId = yield this.Application.Config.GetPipeHeaderConnectionId();
            for (let i = 0; i < retry; i++) {
                const register = this.Application.Server.GetRequestHeader(pipeHeaderConnectionId);
                if (register != null)
                    return (register);
                yield this.Application.Document.Sleep(interval);
            }
            return (null);
        });
    }
    NotifyPipe(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this._lock) {
                    this._messages.push(message);
                    return;
                }
                if (message.Type == DrapoPipeMessageType.Storage)
                    yield this.NotifyPipeStorage(message);
                else if (message.Type == DrapoPipeMessageType.Register)
                    yield this.NofityPipeRegister(message);
                else if (message.Type == DrapoPipeMessageType.Execute)
                    yield this.NofityPipeExecute(message);
            }
            catch (e) {
                yield this.Application.ExceptionHandler.Handle(e, 'DrapoPlumber - NotifyPipe');
            }
        });
    }
    NotifyPipeStorage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPipes = this.Application.Parser.ParsePipes(message.Data);
            if (dataPipes == null)
                return;
            for (let i = 0; i < dataPipes.length; i++) {
                const dataPipe = dataPipes[i];
                yield this.Application.Debugger.AddPipe(dataPipe);
                yield this.Application.Storage.ReloadPipe(dataPipe);
                this.Application.SectorContainerHandler.ReloadStorageItemByPipe(dataPipe);
            }
        });
    }
    NofityPipeRegister(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeHeaderConnectionId = yield this.Application.Config.GetPipeHeaderConnectionId();
            this.Application.Server.AddRequestHeader(pipeHeaderConnectionId, message.Data);
        });
    }
    NofityPipeExecute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, message.Data);
        });
    }
    SendPolling(pollingKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = this.GetMessagePolling(pollingKey);
            if (message === null) {
                message = new DrapoPipePollingMessage();
                message.Key = pollingKey;
                this._pollingMessages.push(message);
            }
            else {
                message.Hash = null;
            }
            yield this._connection.invoke(this._actionPolling, message);
            const pollingHash = yield this.WaitForMessagePollingHash(pollingKey);
            return (pollingHash);
        });
    }
    GetMessagePolling(key) {
        for (let i = this._pollingMessages.length - 1; i >= 0; i--) {
            const currentMessage = this._pollingMessages[i];
            if (currentMessage.Key !== key)
                continue;
            return (currentMessage);
        }
        return (null);
    }
    WaitForMessagePollingHash(pollingKey, retry = 1000, interval = 50) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < retry; i++) {
                for (let j = this._pollingMessages.length - 1; j >= 0; j--) {
                    const currentMessage = this._pollingMessages[j];
                    if ((currentMessage.Key !== pollingKey) || (currentMessage.Hash === null))
                        continue;
                    this._pollingMessages.splice(j, 1);
                    return (currentMessage.Hash);
                }
                yield this.Application.Document.Sleep(interval);
            }
            return (null);
        });
    }
    ReceivePollingPipe(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentMessage = this.GetMessagePolling(message.Key);
            if (currentMessage !== null)
                currentMessage.Hash = message.Hash;
        });
    }
    Lock() {
        if (this._lock)
            return (false);
        this._lock = true;
        return (true);
    }
    Unlock() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._lock)
                return (false);
            this._lock = false;
            for (let i = this._messages.length - 1; i >= 0; i--) {
                const message = this._messages[i];
                yield this.NotifyPipe(message);
            }
            this._messages.length = 0;
            return (true);
        });
    }
    Clear() {
        this._messages.length = 0;
    }
}

"use strict";
class DrapoQuery {
    constructor() {
        this._error = null;
        this._projections = [];
        this._sources = [];
        this._filter = null;
        this._sorts = null;
        this._outputArray = null;
        this._options = null;
    }
    get Error() {
        return (this._error);
    }
    set Error(value) {
        this._error = value;
    }
    get Projections() {
        return (this._projections);
    }
    set Projections(value) {
        this._projections = value;
    }
    get Sources() {
        return (this._sources);
    }
    set Sources(value) {
        this._sources = value;
    }
    get Filter() {
        return (this._filter);
    }
    set Filter(value) {
        this._filter = value;
    }
    get Sorts() {
        return (this._sorts);
    }
    set Sorts(value) {
        this._sorts = value;
    }
    get OutputArray() {
        return (this._outputArray);
    }
    set OutputArray(value) {
        this._outputArray = value;
    }
    get Options() {
        return (this._options);
    }
    set Options(value) {
        this._options = value;
    }
}

"use strict";
class DrapoQueryCondition {
    constructor() {
        this._sourceLeft = null;
        this._columnLeft = null;
        this._valueLeft = null;
        this._comparator = null;
        this._sourceRight = null;
        this._columnRight = null;
        this._valueRight = null;
        this._isNullRight = false;
        this._isSearchStartRight = false;
        this._isSearchEndRight = false;
    }
    get SourceLeft() {
        return (this._sourceLeft);
    }
    set SourceLeft(value) {
        this._sourceLeft = value;
    }
    get ColumnLeft() {
        return (this._columnLeft);
    }
    set ColumnLeft(value) {
        this._columnLeft = value;
    }
    get ValueLeft() {
        return (this._valueLeft);
    }
    set ValueLeft(value) {
        this._valueLeft = value;
    }
    get Comparator() {
        return (this._comparator);
    }
    set Comparator(value) {
        this._comparator = value;
    }
    get SourceRight() {
        return (this._sourceRight);
    }
    set SourceRight(value) {
        this._sourceRight = value;
    }
    get ColumnRight() {
        return (this._columnRight);
    }
    set ColumnRight(value) {
        this._columnRight = value;
    }
    get ValueRight() {
        return (this._valueRight);
    }
    set ValueRight(value) {
        this._valueRight = value;
    }
    get IsNullRight() {
        return (this._isNullRight);
    }
    set IsNullRight(value) {
        this._isNullRight = value;
    }
    get IsSearchStartRight() {
        return (this._isSearchStartRight);
    }
    set IsSearchStartRight(value) {
        this._isSearchStartRight = value;
    }
    get IsSearchEndRight() {
        return (this._isSearchEndRight);
    }
    set IsSearchEndRight(value) {
        this._isSearchEndRight = value;
    }
    Clone() {
        const clone = new DrapoQueryCondition();
        clone.SourceLeft = this.SourceLeft;
        clone.ColumnLeft = this.ColumnLeft;
        clone.ValueLeft = this.ValueLeft;
        clone.Comparator = this.Comparator;
        clone.SourceRight = this.SourceRight;
        clone.ColumnRight = this.ColumnRight;
        clone.ValueRight = this.ValueRight;
        clone.IsNullRight = this.IsNullRight;
        clone.IsSearchStartRight = this.IsSearchStartRight;
        clone.IsSearchEndRight = this.IsSearchEndRight;
        return (clone);
    }
}

"use strict";
class DrapoQueryOptions {
    constructor() {
        this._list = null;
    }
    get List() {
        return (this._list);
    }
    set List(value) {
        this._list = value;
    }
}

"use strict";
class DrapoQueryProjection {
    constructor() {
        this._source = null;
        this._column = null;
        this._alias = null;
        this._functionName = null;
        this._functionParameters = null;
    }
    get Source() {
        return (this._source);
    }
    set Source(value) {
        this._source = value;
    }
    get Column() {
        return (this._column);
    }
    set Column(value) {
        this._column = value;
    }
    get Alias() {
        return (this._alias);
    }
    set Alias(value) {
        this._alias = value;
    }
    get FunctionName() {
        return (this._functionName);
    }
    set FunctionName(value) {
        this._functionName = value;
    }
    get FunctionParameters() {
        return (this._functionParameters);
    }
    set FunctionParameters(value) {
        this._functionParameters = value;
    }
}

"use strict";
class DrapoQuerySort {
    constructor() {
        this._column = null;
        this._type = null;
    }
    get Column() {
        return (this._column);
    }
    set Column(value) {
        this._column = value;
    }
    get Type() {
        return (this._type);
    }
    set Type(value) {
        this._type = value;
    }
}

"use strict";
class DrapoQuerySource {
    constructor() {
        this._joinType = null;
        this._source = null;
        this._alias = null;
        this._joinConditions = [];
    }
    get JoinType() {
        return (this._joinType);
    }
    set JoinType(value) {
        this._joinType = value;
    }
    get Source() {
        return (this._source);
    }
    set Source(value) {
        this._source = value;
    }
    get Alias() {
        return (this._alias);
    }
    set Alias(value) {
        this._alias = value;
    }
    get JoinConditions() {
        return (this._joinConditions);
    }
    set JoinConditions(value) {
        this._joinConditions = value;
    }
}

"use strict";
class DrapoRange {
    get Start() {
        return (this._start);
    }
    set Start(value) {
        this._start = value;
    }
    get End() {
        return (this._end);
    }
    set End(value) {
        this._end = value;
    }
    constructor(start = null, end = null) {
        this._start = null;
        this._end = null;
        this._start = start;
        this._end = end;
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoRegister {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._components = [];
        this._cacheKeys = [];
        this._cacheDatas = [];
        this._application = application;
    }
    GetRegisteredComponent(tagName) {
        return __awaiter(this, void 0, void 0, function* () {
            const components = yield this.Application.Config.GetSector("Components");
            if (components == null)
                return (null);
            for (let i = 0; i < components.length; i++) {
                const component = components[i];
                if (component.Tag == tagName)
                    return (component);
            }
            return (null);
        });
    }
    IsRegisteredComponent(tagName) {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield this.GetRegisteredComponent(tagName)) != null);
        });
    }
    IsActiveComponent(tagName) {
        for (let i = 0; i < this._components.length; i++)
            if (this._components[i] === tagName)
                return (true);
        return (false);
    }
    ActivateComponent(tagName) {
        return __awaiter(this, void 0, void 0, function* () {
            const component = yield this.GetRegisteredComponent(tagName);
            this._components.push(tagName);
            for (let i = 0; i < component.Files.length; i++) {
                const file = component.Files[i];
                if (file.Type === 2)
                    yield this.ActivateComponentFileScript(component, file);
                else if (file.Type === 1)
                    yield this.ActivateComponentFileStyle(component, file);
            }
        });
    }
    ActivateComponentFileScript(component, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const relatedUrl = yield this.GetComponentFileUrl(component, file);
            const url = this.Application.Server.ResolveUrl(relatedUrl);
            const script = document.createElement('script');
            script.src = url;
            script.async = false;
            document.head.appendChild(script);
        });
    }
    ActivateComponentFileStyle(component, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const relatedUrl = yield this.GetComponentFileUrl(component, file);
            const url = this.Application.Server.ResolveUrl(relatedUrl);
            const link = document.createElement('link');
            link.href = url;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        });
    }
    CreateInstanceComponent(tagName, el) {
        return __awaiter(this, void 0, void 0, function* () {
            const component = yield this.GetRegisteredComponent(tagName);
            if ((component.Constructor == null) || (component.Constructor == ''))
                return;
            yield this.WaitForFunction(component.Constructor);
            const constructor = window[component.Constructor];
            if (constructor == null)
                return;
            const result = constructor(el, this.Application);
            if (Promise.resolve(result) == result) {
                const resultPromise = result;
                return (yield resultPromise);
            }
            return (null);
        });
    }
    WaitForFunction(functionName, retry = 1000, interval = 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < retry; i++) {
                const functionReference = window[functionName];
                if (functionReference != null)
                    return;
                yield this.Application.Document.Sleep(interval);
            }
        });
    }
    GetRegisteredComponentViewContent(tagName) {
        return __awaiter(this, void 0, void 0, function* () {
            const component = yield this.GetRegisteredComponent(tagName);
            if (component == null)
                return (null);
            for (let i = 0; i < component.Files.length; i++) {
                const file = component.Files[i];
                if (file.Type === 0)
                    return (yield this.GetRegisteredComponentFileContent(component, file));
            }
            return (null);
        });
    }
    GetRegisteredComponentFileContent(component, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.CreateKeyComponentFile(component, file);
            let index = this.GetCacheKeyIndex(key);
            if (index == null)
                index = this.AddCacheData(key, yield this.GetRegisteredComponentFileContentInternal(component, file));
            return (this.GetCacheData(index));
        });
    }
    GetComponentFileUrl(component, file) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = file.ResourceType === 1 ? file.Path : '~/components/' + component.Name + '/' + file.Name;
            url += yield this.Application.Server.AppendUrlQueryStringCacheStatic(url);
            return (url);
        });
    }
    GetRegisteredComponentFileContentInternal(component, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = yield this.GetComponentFileUrl(component, file);
            const htmlCached = this.Application.CacheHandler.GetCachedComponentView(url);
            if (htmlCached != null)
                return (htmlCached);
            const response = yield this.Application.Server.GetHTML(url);
            if (response == null)
                return (null);
            const html = response[0];
            const allowCache = response[1];
            if (allowCache)
                this.Application.CacheHandler.SetCachedComponentView(url, html);
            return (html);
        });
    }
    CreateKeyComponentFile(component, file) {
        return (component.Name + ':' + file.Name);
    }
    GetCacheKeyIndex(dataKey) {
        for (let i = 0; i < this._cacheKeys.length; i++) {
            if (this._cacheKeys[i] == dataKey)
                return (i);
        }
        return (null);
    }
    GetCacheData(dataIndex) {
        return (this._cacheDatas[dataIndex]);
    }
    AddCacheData(dataKey, data) {
        this._cacheKeys.push(dataKey);
        this._cacheDatas.push(data);
        return (this._cacheKeys.length - 1);
    }
    IsEndsWith(text, value) {
        const length = value.length;
        if (text.length < length)
            return (false);
        return (text.substr(text.length - length) === value);
    }
}

"use strict";
class DrapoRegularExpression {
    constructor() {
        this._items = [];
    }
    get Expression() {
        return (this._expression);
    }
    set Expression(value) {
        this._expression = value;
    }
    get Items() {
        return (this._items);
    }
    CreateItem(expression, name = null) {
        const item = new DrapoRegularExpressionItem();
        item.Expression = expression;
        item.Name = name;
        this._items.push(item);
        return (item);
    }
    IsValid(value) {
        const regex = new RegExp(this.Expression);
        if (!regex.test(value))
            return (false);
        let valueCurrent = value;
        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            const match = valueCurrent.match(item.Expression);
            if (match == null)
                return (null);
            const matchValue = match[0];
            if (valueCurrent.indexOf(matchValue) != 0)
                return (null);
            item.Value = matchValue;
            valueCurrent = valueCurrent.substring(matchValue.length);
        }
        return (true);
    }
    GetValue(name) {
        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (item.Name === name)
                return (item.Value);
        }
        return (null);
    }
}

"use strict";
class DrapoRegularExpressionItem {
    get Expression() {
        return (this._expression);
    }
    set Expression(value) {
        this._expression = value;
    }
    get Name() {
        return (this._name);
    }
    set Name(value) {
        this._name = value;
    }
    get Value() {
        return (this._value);
    }
    set Value(value) {
        this._value = value;
    }
}

"use strict";
class DrapoRenderContext {
    constructor() {
        this._sectorExpressionContexts = {};
        this._dataKeyElements = {};
    }
    GetKey(sector, expression) {
        return (sector + '_' + expression);
    }
    HasExpressionContext(sector, expression) {
        const key = this.GetKey(sector, expression);
        const value = this._sectorExpressionContexts[key];
        if (value == null)
            return (null);
        return value;
    }
    AddExpressionContext(sector, expression, hasContext) {
        const key = this.GetKey(sector, expression);
        this._sectorExpressionContexts[key] = hasContext;
    }
    HasDataKeyElement(dataKey) {
        const value = this._dataKeyElements[dataKey];
        if (value == null)
            return (null);
        return value;
    }
    AddDataKeyElement(dataKey, hasElement) {
        this._dataKeyElements[dataKey] = hasElement;
    }
}

"use strict";
class DrapoResize {
    get Code() {
        return (this._code);
    }
    set Code(value) {
        this._code = value;
    }
    get Item() {
        return (this._contextItem);
    }
    set Item(value) {
        this._contextItem = value;
    }
    get Element() {
        return (this._element);
    }
    set Element(value) {
        this._element = value;
    }
    get Parent() {
        return (this._parent);
    }
    set Parent(value) {
        this._parent = value;
    }
    get Container() {
        return (this._container);
    }
    set Container(value) {
        this._container = value;
    }
    get Model() {
        return (this._model);
    }
    set Model(value) {
        this._model = value;
    }
    get Location() {
        return (this._location);
    }
    set Location(value) {
        this._location = value;
    }
    get Type() {
        return (this._type);
    }
    set Type(value) {
        this._type = value;
    }
    get Unit() {
        return (this._unit);
    }
    set Unit(value) {
        this._unit = value;
    }
    get Class() {
        return (this._class);
    }
    set Class(value) {
        this._class = value;
    }
    get Preview() {
        return (this._preview);
    }
    set Preview(value) {
        this._preview = value;
    }
    get SizeStart() {
        return (this._sizeStart);
    }
    set SizeStart(value) {
        this._sizeStart = value;
    }
    get UnitStart() {
        return (this._unitStart);
    }
    set UnitStart(value) {
        this._unitStart = value;
    }
    get EventStartValue() {
        return (this._eventStartValue);
    }
    set EventStartValue(value) {
        this._eventStartValue = value;
    }
    get EventCurrentValue() {
        return (this._eventCurrentValue);
    }
    set EventCurrentValue(value) {
        this._eventCurrentValue = value;
    }
    constructor() {
        this.Unit = 'px';
    }
}

"use strict";
class DrapoRouteItem {
    constructor() {
        this._url = null;
        this._sector = null;
        this._title = null;
        this._state = null;
    }
    get Url() {
        return (this._url);
    }
    set Url(value) {
        this._url = value;
    }
    get Sector() {
        return (this._sector);
    }
    set Sector(value) {
        this._sector = value;
    }
    get Title() {
        return (this._title);
    }
    set Title(value) {
        this._title = value;
    }
    get State() {
        return (this._state);
    }
    set State(value) {
        this._state = value;
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoRouter {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._routes = [];
        this._canUseRouter = null;
        this._application = application;
    }
    Create(url, sector, title, state) {
        const route = new DrapoRouteItem();
        route.Url = url;
        route.Sector = sector;
        route.Title = title;
        route.State = state;
        this._routes.push(route);
        return (route);
    }
    GetLastRouteUrlBySector(sector) {
        const route = this.GetLastRouteBySector(sector);
        if (route == null)
            return (null);
        return (route.Url);
    }
    GetLastRouteUrl() {
        for (let i = this._routes.length - 1; i >= 0; i--) {
            const route = this._routes[i];
            if (route.Url != null)
                return (route.Url);
        }
        return (null);
    }
    GetLastRouteBySector(sector) {
        for (let i = this._routes.length - 1; i >= 0; i--) {
            const route = this._routes[i];
            if (route.Sector === sector)
                return (route);
        }
        return (null);
    }
    GetLastRouteTitle() {
        for (let i = this._routes.length - 1; i >= 0; i--) {
            const route = this._routes[i];
            if (route.Title !== null)
                return (route.Title);
        }
        return (null);
    }
    CanUseRouter() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._canUseRouter === null)
                this._canUseRouter = yield this.Application.Config.GetUseRouter();
            return (this._canUseRouter);
        });
    }
    Route(url, sector = null, title = null, state = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const canUseRouter = yield this.CanUseRouter();
            this.UpdateTitle(title);
            if (canUseRouter) {
                const route = this.Create(this.Application.Server.ResolveUrl(url), sector, title, state);
                history.pushState(null, route.Title, route.Url);
            }
            this._application.Log.WriteVerbose("Router - Route to {0}", url);
        });
    }
    OnPopState(e) {
        const route = this._routes.pop();
        if (route == null)
            return;
        const routePrevious = this.GetLastRouteBySector(route.Sector);
        const title = this.GetLastRouteTitle();
        this.UpdateTitle(title);
        this.Application.Document.StartUpdate(null);
        if (routePrevious == null) {
            this.Application.Document.LoadChildSectorDefault(route.Sector);
        }
        else {
            this.Application.Document.LoadChildSector(route.Sector, route.Url, route.Title, false);
        }
    }
    UpdateTitle(title) {
        if (title == null)
            return;
        if (title == '')
            return;
        if (title == '=')
            return;
        document.title = title;
    }
    UpdateURL(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlResolved = this.Application.Server.ResolveUrl(url);
            history.pushState(null, document.title, urlResolved);
        });
    }
}

"use strict";
class DrapoSearcher {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    FindDataKey(dataKey, sector) {
        const els = this.FindAllByAttributeAndValue('d-datakey', dataKey);
        const el = this.Filter(sector, els);
        return (el);
    }
    HasDataKeyElement(dataKey) {
        const el = this.FindByAttributeAndValue('d-datakey', dataKey);
        return (el != null);
    }
    Filter(sector, els) {
        const sectors = this.Application.Document.GetSectorsAllowed(sector);
        for (let i = 0; i < els.length; i++) {
            const el = els[i];
            const elSector = this.Application.Document.GetSector(el);
            if (elSector !== sector) {
                const elAccess = el.getAttribute('d-dataAccess');
                if (elAccess == 'private')
                    continue;
                const elType = el.getAttribute('d-dataType');
                if ((elAccess == null) && (elType === 'parent'))
                    continue;
            }
            if ((this.Application.Document.IsSectorAllowed(elSector, sectors)) && (!this.Application.Document.IsElementDetached(el)))
                return (el);
        }
        return (null);
    }
    CreateElementsList(nodes) {
        const els = [];
        for (let i = 0; i < nodes.length; i++)
            els.push(nodes[i]);
        return (els);
    }
    FindByAttributeAndValue(name, value) {
        const el = document.querySelector("[" + name + "='" + value + "']");
        return (el);
    }
    FindLastByAttributeAndValue(name, value) {
        const els = this.FindAllByAttributeAndValue(name, value);
        if ((els != null) && (els.length > 0))
            return (els[els.length - 1]);
        return (null);
    }
    FindAllByAttributeAndValue(name, value) {
        const nodes = document.querySelectorAll("[" + name + "='" + value + "']");
        return (this.CreateElementsList(nodes));
    }
    FindByAttributeAndValueFromParent(name, value, parent) {
        const el = parent.querySelector("[" + name + "='" + value + "']");
        return (el);
    }
    FindAllByAttribute(name) {
        const nodes = document.querySelectorAll("[" + name + "]");
        return (this.CreateElementsList(nodes));
    }
    FindAllByAttributeFromParent(name, parent) {
        const nodes = parent.querySelectorAll("[" + name + "]");
        return (this.CreateElementsList(nodes));
    }
    FindByTagName(tagName) {
        const el = document.querySelector(tagName);
        return (el);
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoSectorContainerHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this.CONTAINER_EQUAL = '=';
        this._containers = [];
        this._activeSectorContainers = [];
        this._sectorContexts = [];
        this._sectorContextsExpressions = [];
        this._sectorContextsValues = [];
        this._application = application;
    }
    IsElementContainerized(element) {
        const elRoot = this.GetElementRoot(element);
        if (elRoot === null)
            return (false);
        for (let i = this._containers.length - 1; i >= 0; i--) {
            const container = this._containers[i];
            if (container.Element === elRoot)
                return (true);
        }
        return (false);
    }
    GetElementRoot(el) {
        if (el == null)
            return (null);
        while (el.parentElement !== null) {
            el = el.parentElement;
            if (el.tagName === 'BODY')
                return (null);
        }
        return (el);
    }
    Switch(sector, containerCode = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let containerCodePrevious = null;
            for (let i = 0; i < this._activeSectorContainers.length; i++) {
                const activeSectorContainer = this._activeSectorContainers[i];
                if (activeSectorContainer[0] !== sector)
                    continue;
                containerCodePrevious = activeSectorContainer[1];
                if (containerCode !== this.CONTAINER_EQUAL)
                    this._activeSectorContainers.splice(i, 1);
                break;
            }
            if ((containerCodePrevious !== null) && (containerCode !== this.CONTAINER_EQUAL)) {
                const containerPrevious = this.CreateContainer(sector, containerCodePrevious);
                this._containers.push(containerPrevious);
            }
            yield this.UnloadSector(sector);
            if (containerCode === this.CONTAINER_EQUAL) {
                const el = this.Application.Document.GetSectorElementInner(sector);
                if ((el !== null) && (el.parentElement !== null))
                    el.parentElement.removeChild(el);
            }
            if ((containerCode === null) || (containerCode === this.CONTAINER_EQUAL)) {
                return (false);
            }
            let loaded = false;
            for (let i = 0; i < this._containers.length; i++) {
                const container = this._containers[i];
                if ((container.Sector !== sector) || (container.ContainerCode !== containerCode))
                    continue;
                this._containers.splice(i, 1);
                yield this.LoadContainer(container);
                loaded = true;
                break;
            }
            this._activeSectorContainers.push([sector, containerCode]);
            return (loaded);
        });
    }
    CreateContainer(sector, containerCode) {
        const el = this.Application.Document.GetSectorElementInner(sector);
        const canDetachElement = this.Application.Document.CanDetachElement(el);
        const sectorChildren = this.Application.Document.GetSectorAndChildren(sector);
        const storageItems = [];
        const sectorHierarchys = [];
        const sectorFriends = [];
        const componentSectors = [];
        const componentTags = [];
        const componentElements = [];
        const componentInstances = [];
        for (let i = 0; i < sectorChildren.length; i++) {
            const sectorCurrent = sectorChildren[i];
            this.Application.Storage.AppendCacheDataItemBySector(storageItems, sectorCurrent);
            this.Application.Document.AppendSectorHierarchyBySector(sectorHierarchys, sectorCurrent);
            this.Application.Document.AppendSectorFriendsBySector(sectorFriends, sectorCurrent);
            this.Application.ComponentHandler.AppendInstances(sectorCurrent, componentSectors, componentTags, componentElements, componentInstances);
        }
        return (new DrapoSectorContainerItem(sector, containerCode, storageItems, sectorHierarchys, sectorFriends, componentSectors, componentTags, componentElements, componentInstances, el, canDetachElement));
    }
    LoadContainer(container) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Application.Document.SetSectorElementInner(container.Sector, container.Element, container.CanDetachElement);
            yield this.Application.Storage.AddCacheDataItems(container.StorageItems);
            this.Application.Document.AddSectorHierarchys(container.SectorHierarchys);
            this.Application.Document.AddSectorFriendsRange(container.SectorFriends);
            yield this.Application.ComponentHandler.AddInstances(container);
            const sectorChildren = this.Application.Document.GetSectorAndChildren(container.Sector);
            for (let i = 0; i < sectorChildren.length; i++) {
                const sectorCurrent = sectorChildren[i];
                yield this.Application.Storage.FireEventOnAfterContainerLoad(sectorCurrent);
            }
        });
    }
    UnloadSector(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const sectorChildren = this.Application.Document.GetSectorAndChildren(sector);
            for (let i = 0; i < sectorChildren.length; i++) {
                const sectorCurrent = sectorChildren[i];
                yield this.Application.Storage.FireEventOnBeforeContainerUnload(sectorCurrent);
                this.Application.Validator.UnloadSector(sectorCurrent);
                this.Application.ComponentHandler.UnloadComponentInstances(sectorCurrent);
                yield this.Application.Storage.RemoveBySector(sectorCurrent);
                this.RemoveMustacheContextCache(sectorCurrent);
            }
            this.Application.Document.CleanSectorMetadata(sector);
            this.Application.Document.SetSectorElementInner(sector, null, null);
        });
    }
    RemoveByContainer(containerCode) {
        for (let i = this._activeSectorContainers.length - 1; i >= 0; i--) {
            const sectorContainer = this._activeSectorContainers[i];
            if (sectorContainer[1] !== containerCode)
                continue;
            const el = this.Application.Document.GetSectorElementInner(sectorContainer[0]);
            if ((el !== null) && (el.parentElement !== null))
                el.parentElement.removeChild(el);
            this._activeSectorContainers.splice(i, 1);
            break;
        }
        let removed = false;
        for (let i = this._containers.length - 1; i >= 0; i--) {
            const container = this._containers[i];
            if (container.ContainerCode !== containerCode)
                continue;
            if (container.Element != null && container.Element.parentElement != null)
                container.Element.parentElement.removeChild(container.Element);
            this._containers.splice(i, 1);
            removed = true;
            break;
        }
        return (removed);
    }
    RemoveBySector(sector) {
        for (let i = this._activeSectorContainers.length - 1; i >= 0; i--) {
            const sectorContainer = this._activeSectorContainers[i];
            if (sectorContainer[0] !== sector)
                continue;
            this._activeSectorContainers.splice(i, 1);
            break;
        }
        let removed = false;
        for (let i = this._containers.length - 1; i >= 0; i--) {
            const container = this._containers[i];
            if (container.Sector !== sector)
                continue;
            if ((!container.CanDetachElement) && (container.Element.parentElement != null))
                container.Element.parentElement.removeChild(container.Element);
            this._containers.splice(i, 1);
            removed = true;
        }
        return (removed);
    }
    GetStorageItem(sector, containerCode, dataKey) {
        for (let i = this._containers.length - 1; i >= 0; i--) {
            const container = this._containers[i];
            if ((container.Sector !== sector) || (container.ContainerCode !== containerCode))
                continue;
            for (let j = 0; j < container.StorageItems.length; j++) {
                const storageItem = container.StorageItems[j];
                if (storageItem.DataKey !== dataKey)
                    continue;
                if (storageItem.Sector !== sector)
                    continue;
                return (storageItem);
            }
            break;
        }
        return (null);
    }
    ReloadStorageItemByPipe(dataPipe) {
    }
    HasMustacheContextCache(sector, expression) {
        const indexSector = this.GetMustacheContextIndex(sector);
        if (indexSector === null)
            return (null);
        const indexExpression = this.GetMustacheContextExpressionIndex(indexSector, expression);
        if (indexExpression === null)
            return (null);
        return (this._sectorContextsValues[indexSector][indexExpression]);
    }
    RemoveMustacheContextCache(sector) {
        const indexSector = this.GetMustacheContextIndex(sector);
        if (indexSector === null)
            return;
        this._sectorContexts.splice(indexSector, 1);
        this._sectorContextsExpressions.splice(indexSector, 1);
        this._sectorContextsValues.splice(indexSector, 1);
    }
    AddMustacheContextCache(sector, expression, value) {
        let indexSector = this.GetMustacheContextIndex(sector);
        if (indexSector === null) {
            indexSector = this._sectorContexts.push(sector) - 1;
            this._sectorContextsExpressions.push([]);
            this._sectorContextsValues.push([]);
        }
        this._sectorContextsExpressions[indexSector].push(expression);
        this._sectorContextsValues[indexSector].push(value);
    }
    GetMustacheContextIndex(sector) {
        for (let i = 0; i < this._sectorContexts.length; i++)
            if (this._sectorContexts[i] === sector)
                return (i);
        return (null);
    }
    GetMustacheContextExpressionIndex(indexSector, expression) {
        const expressions = this._sectorContextsExpressions[indexSector];
        for (let i = 0; i < expressions.length; i++)
            if (expressions[i] === expression)
                return (i);
        return (null);
    }
}

"use strict";
class DrapoSectorContainerItem {
    get Sector() {
        return (this._sector);
    }
    get ContainerCode() {
        return (this._containerCode);
    }
    get StorageItems() {
        return (this._storageItems);
    }
    get SectorHierarchys() {
        return this._sectorHierarchys;
    }
    get SectorFriends() {
        return this._sectorFriends;
    }
    get ComponentSectors() {
        return (this._componentSectors);
    }
    get ComponentTags() {
        return (this._componentTags);
    }
    get ComponentElements() {
        return (this._componentElements);
    }
    get ComponentInstances() {
        return (this._componentInstances);
    }
    get Element() {
        return this._element;
    }
    get CanDetachElement() {
        return this._canDetachElement;
    }
    constructor(sector, containerCode, storageItems, sectorHierarchys, sectorFriends, componentSectors, componentTags, componentElements, componentInstances, element, canDetachElement) {
        this._sector = null;
        this._containerCode = null;
        this._storageItems = [];
        this._sectorHierarchys = [];
        this._sectorFriends = [];
        this._componentSectors = [];
        this._componentTags = [];
        this._componentElements = [];
        this._componentInstances = [];
        this._element = null;
        this._canDetachElement = true;
        this._sector = sector;
        this._containerCode = containerCode;
        this._storageItems = storageItems;
        this._sectorHierarchys = sectorHierarchys;
        this._sectorFriends = sectorFriends;
        this._componentSectors = componentSectors;
        this._componentTags = componentTags;
        this._componentElements = componentElements;
        this._componentInstances = componentInstances;
        this._element = element;
        this._canDetachElement = canDetachElement;
    }
}

"use strict";
class DrapoSerializer {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this.JSON_START = '{';
        this.JSON_END = '}';
        this.JSON_ARRAY_START = '[';
        this.JSON_ARRAY_END = ']';
        this._application = application;
    }
    IsJson(data) {
        return ((this.IsJsonInstance(data)) || (this.IsJsonArray(data)));
    }
    IsJsonInstance(data) {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr != null) && (data.substr(0, 1) == this.JSON_START) && (data.substr(data.length - 1, 1) == this.JSON_END));
    }
    IsJsonArray(data) {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr != null) && (data.substr(0, 1) == this.JSON_ARRAY_START) && (data.substr(data.length - 1, 1) == this.JSON_ARRAY_END));
    }
    Deserialize(data) {
        if (!this.IsJson(data))
            return (data);
        return (JSON.parse(data));
    }
    Serialize(data) {
        if (data == null)
            return (null);
        return (JSON.stringify(data));
    }
    SerializeObject(data) {
        if (typeof data === "string")
            return (data);
        return (this.Serialize(data));
    }
    EncodeHeaderFieldValue(data) {
        if (data == null)
            return (null);
        return (data.replace(/(\r\n\t|\n|\r\t)/gm, ""));
    }
    EnsureASCII(data) {
        if (this.HasUnicode(data))
            return (this.ConvertToASCII(data));
        return (data);
    }
    HasUnicode(data) {
        for (let i = 0; i < data.length; i++) {
            const char = data[i];
            const index = char.charCodeAt(0);
            if (index > 127)
                return (true);
        }
        return (false);
    }
    ConvertToASCII(data) {
        let encoded = '';
        for (let i = 0; i < data.length; i++) {
            const char = data[i];
            const index = char.charCodeAt(0);
            encoded += '\\u' + index.toString(16).toUpperCase();
        }
        return (encoded);
    }
    EnsureUrlDecoded(value) {
        if ((value == null) || (value == '') || (value.indexOf == null))
            return (value);
        const hasPercentage = value.indexOf('%') >= 0;
        if (!hasPercentage)
            return (value);
        return (decodeURIComponent(value));
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoServer {
    get Application() {
        return (this._application);
    }
    get HasBadRequest() {
        return (this._hasBadRequest);
    }
    set HasBadRequest(value) {
        this._hasBadRequest = value;
    }
    constructor(application) {
        this._token = null;
        this._tokenAntiforgery = null;
        this._requestHeaders = [];
        this._requestHeadersNext = [];
        this._hasBadRequest = false;
        this._headerContainerIdKey = null;
        this._headerContainerIdValue = null;
        this._isInsideTimestamp = false;
        this._application = application;
        this.InitializeServer();
    }
    InitializeServer() {
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
            const source = script.src;
            const index = source.indexOf('/drapo.js');
            if ((index == null) || (index < 0))
                continue;
            this._url = source.substr(0, index);
            return;
        }
        this._url = '';
    }
    ResolveUrl(url) {
        if (url.substr(0, 1) == '~')
            return (this._url + url.substr(1));
        return (url);
    }
    AppendUrlQueryStringCacheStatic(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCacheStatic = yield this.Application.Config.GetUseCacheStatic();
            if (!useCacheStatic)
                return ('');
            const applicationBuild = yield this.Application.Config.GetApplicationBuild();
            if (applicationBuild == '')
                return ('');
            if (url.indexOf('ab=') >= 0)
                return ('');
            return ((url.indexOf('?') >= 0 ? '&' : '?') + 'ab=' + applicationBuild);
        });
    }
    AppendUrlQueryStringTimestamp(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const timestamp = new Date().getTime();
            const timestampConfig = yield this.Application.Config.GetTimestamp();
            const timestampMustache = ((timestampConfig == null) || (timestampConfig == '') || (this._isInsideTimestamp)) ? '{{ts}}' : timestampConfig;
            const timestampMustacheTimestamp = timestampMustache.replace('{{ts}}', timestamp.toString());
            this._isInsideTimestamp = true;
            const timestampResolved = yield this.Application.Storage.ResolveMustachesRecursive(null, timestampMustacheTimestamp);
            this._isInsideTimestamp = false;
            return (url + (url.indexOf('?') >= 0 ? '&' : '?') + 'ts=' + timestampResolved);
        });
    }
    GetViewHTML(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const htmlCached = this.Application.CacheHandler.GetCachedView(url);
            if (htmlCached != null)
                return (htmlCached);
            const response = yield this.Application.Server.GetHTML(url);
            if (response == null)
                return (null);
            const html = response[0];
            const allowCache = response[1];
            if (allowCache)
                this.Application.CacheHandler.SetCachedView(url, html);
            return (html);
        });
    }
    GetHTML(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestHeaders = [];
            this.InsertHeader(requestHeaders, 'X-Requested-With', 'XMLHttpRequest');
            if (this._headerContainerIdValue !== null)
                requestHeaders.push([this._headerContainerIdKey, this._headerContainerIdValue]);
            let urlResolved = this.ResolveUrl(url);
            urlResolved += yield this.AppendUrlQueryStringCacheStatic(url);
            const request = new DrapoServerRequest('GET', urlResolved, requestHeaders, null, true);
            const response = yield this.Request(request);
            const responseText = response.Body;
            const responseStatus = response.Status;
            if (responseStatus == 200) {
                return ([responseText, response.IsCacheAllowed()]);
            }
            return (null);
        });
    }
    GetJSON(url, verb = "GET", data = null, contentType = null, dataKey = null, headers = null, headersResponse = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestHeaders = [];
            this.InsertHeaders(requestHeaders, this.GetRequestHeaders());
            this.InsertHeaders(requestHeaders, headers);
            if (contentType != null)
                this.InsertHeader(requestHeaders, 'Content-Type', contentType);
            this.InsertHeader(requestHeaders, 'X-Requested-With', 'XMLHttpRequest');
            this.InsertHeader(requestHeaders, 'Cache-Control', 'no-cache, no-store, must-revalidate');
            if (this._headerContainerIdValue !== null)
                requestHeaders.push([this._headerContainerIdKey, this._headerContainerIdValue]);
            if ((this._tokenAntiforgery != null))
                this.InsertHeader(requestHeaders, yield this.Application.Config.GetHeaderCSRF(), this._tokenAntiforgery);
            const urlResolved = this.ResolveUrl(url);
            const urlResolvedTimestamp = yield this.AppendUrlQueryStringTimestamp(urlResolved);
            const cookieValues = this.Application.CookieHandler.GetCookieValues();
            const request = new DrapoServerRequest(verb, urlResolvedTimestamp, requestHeaders, data, true);
            const response = yield this.Request(request);
            if ((200 <= response.Status) && (response.Status < 400)) {
                const location = this.GetHeaderValue(response.Headers, 'Location');
                if (location !== null)
                    yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, 'RedirectPage(' + location + ')', this.Application.FunctionHandler.CreateExecutionContext(false));
            }
            if (response.Status == 200) {
                yield this.Application.CookieHandler.HandleCookieValuesChanges(cookieValues);
                if (response.Body == '')
                    return (null);
                if (headersResponse !== null) {
                    this.InsertHeaders(headersResponse, response.Headers);
                    return response.Body;
                }
                let dataResponse;
                dataResponse = this.Application.Serializer.Deserialize(response.Body);
                return (dataResponse);
            }
            else if (response.Status == 204) {
                return (null);
            }
            else if (response.Status == 400) {
                this.HasBadRequest = true;
                const onBadRequest = yield this.Application.Config.GetOnBadRequest();
                if (onBadRequest !== null) {
                    const storageBadRequest = yield this.Application.Config.GetStorageBadRequest();
                    if (storageBadRequest !== null) {
                        const dataResponse = this.Application.Serializer.Deserialize(response.Body);
                        yield this.Application.Storage.UpdateData(storageBadRequest, null, dataResponse);
                    }
                    yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onBadRequest, this.Application.FunctionHandler.CreateExecutionContext(false));
                    return ([]);
                }
                return ([]);
            }
            else if (response.Status == 401) {
                if (dataKey !== null)
                    yield this.Application.Document.RequestAuthorization(dataKey, 'notify');
            }
            else if (response.Status == 500) {
                this.HasBadRequest = true;
                const onError = yield this.Application.Config.GetOnError();
                if (onError !== null) {
                    const storageErrors = yield this.Application.Config.GetStorageErrors();
                    if (storageErrors !== null) {
                        const error = this.Application.Serializer.IsJson(response.Body) ? this.Application.Serializer.Deserialize(response.Body) : response.Body;
                        yield this.Application.Storage.AddDataItem(storageErrors, null, null, this.Application.Storage.CreateErrorForStorage('DataRequest', 'Error requesting data for :' + url, error));
                    }
                    yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onError, this.Application.FunctionHandler.CreateExecutionContext(false));
                    return ([]);
                }
                return ([]);
            }
            return ([]);
        });
    }
    GetFile(url, verb, data, contentType = null, dataKey = null, headers = null, headersResponse = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestHeaders = [];
            this.InsertHeaders(requestHeaders, this.GetRequestHeaders());
            this.InsertHeaders(requestHeaders, headers);
            this.InsertHeader(requestHeaders, 'X-Requested-With', 'XMLHttpRequest');
            this.InsertHeader(requestHeaders, 'Cache-Control', 'no-cache, no-store, must-revalidate');
            if (this._headerContainerIdValue !== null)
                requestHeaders.push([this._headerContainerIdKey, this._headerContainerIdValue]);
            if (contentType != null)
                this.InsertHeader(requestHeaders, 'Content-Type', contentType);
            if ((this._tokenAntiforgery != null))
                this.InsertHeader(requestHeaders, yield this.Application.Config.GetHeaderCSRF(), this._tokenAntiforgery);
            const urlResolved = this.ResolveUrl(url);
            const urlResolvedTimestamp = yield this.AppendUrlQueryStringTimestamp(urlResolved);
            const request = new DrapoServerRequest(verb, urlResolvedTimestamp, requestHeaders, data, true, true);
            const response = yield this.Request(request);
            if ((200 <= response.Status) && (response.Status < 400)) {
                const location = this.GetHeaderValue(response.Headers, 'Location');
                if (location !== null)
                    yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, 'RedirectPage(' + location + ')', this.Application.FunctionHandler.CreateExecutionContext(false));
            }
            if (response.Status == 200) {
                if (response.Body == '')
                    return (null);
                if (headersResponse !== null) {
                    this.InsertHeaders(headersResponse, response.Headers);
                    return (this.CreateFileObject(headersResponse, response.Body));
                }
                let dataResponse;
                dataResponse = this.Application.Serializer.Deserialize(response.Body);
                return (dataResponse);
            }
            else if (response.Status == 204) {
                return (null);
            }
            else if (response.Status == 400) {
                this.HasBadRequest = true;
                const onBadRequest = yield this.Application.Config.GetOnBadRequest();
                if (onBadRequest !== null) {
                    const storageBadRequest = yield this.Application.Config.GetStorageBadRequest();
                    if (storageBadRequest !== null) {
                        const dataResponse = this.Application.Serializer.Deserialize(response.Body);
                        yield this.Application.Storage.UpdateData(storageBadRequest, null, dataResponse);
                    }
                    yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onBadRequest, this.Application.FunctionHandler.CreateExecutionContext(false));
                    return ([]);
                }
                return ([]);
            }
            else if (response.Status == 401) {
                if (dataKey !== null)
                    yield this.Application.Document.RequestAuthorization(dataKey, 'notify');
            }
            else if (response.Status == 500) {
                this.HasBadRequest = true;
                const onError = yield this.Application.Config.GetOnError();
                if (onError !== null) {
                    const storageErrors = yield this.Application.Config.GetStorageErrors();
                    if (storageErrors !== null) {
                        const error = this.Application.Serializer.IsJson(response.Body) ? this.Application.Serializer.Deserialize(response.Body) : response.Body;
                        yield this.Application.Storage.AddDataItem(storageErrors, null, null, this.Application.Storage.CreateErrorForStorage('DataRequest', 'Error requesting data for :' + url, error));
                    }
                    yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onError, this.Application.FunctionHandler.CreateExecutionContext(false));
                    return ([]);
                }
                return ([]);
            }
            return ([]);
        });
    }
    CreateFileObject(headers, body) {
        const object = {};
        object.body = body;
        object.length = body.size;
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            const key = header[0].toLowerCase();
            const keyClean = key.replace('-', '');
            const value = header[1];
            object[keyClean] = value;
            if (keyClean !== 'contentdisposition')
                continue;
            const contentDispositionValues = value.split(';');
            for (let j = 0; j < contentDispositionValues.length; j++) {
                const contentDispositionValue = contentDispositionValues[j];
                const contentDispositionValueClean = contentDispositionValue[0] === ' ' ? contentDispositionValue.substring(1) : contentDispositionValue;
                const index = contentDispositionValueClean.indexOf('=');
                if (index < 0)
                    continue;
                const contentDispositionValueCleanKey = contentDispositionValueClean.substring(0, index);
                if (contentDispositionValueCleanKey === 'filename') {
                    let contentDispositionKeyValue = contentDispositionValueClean.substring(index + 1);
                    if ((contentDispositionKeyValue.length > 2) && (contentDispositionKeyValue[0] === '"') && (contentDispositionKeyValue[contentDispositionKeyValue.length - 1] === '"'))
                        contentDispositionKeyValue = contentDispositionKeyValue.substring(1, contentDispositionKeyValue.length - 1);
                    if ((contentDispositionKeyValue.length > 2) && (contentDispositionKeyValue[0] === "'") && (contentDispositionKeyValue[contentDispositionKeyValue.length - 1] === "'"))
                        contentDispositionKeyValue = contentDispositionKeyValue.substring(1, contentDispositionKeyValue.length - 1);
                    object.filename = contentDispositionKeyValue;
                }
                if (contentDispositionValueCleanKey === 'filename*') {
                    let contentDispositionKeyValue = contentDispositionValueClean.substring(index + 1);
                    if (contentDispositionKeyValue.indexOf('UTF-8\'\'') === 0)
                        contentDispositionKeyValue = contentDispositionKeyValue.substring('UTF-8\'\''.length, contentDispositionKeyValue.length);
                    if ((contentDispositionKeyValue.length > 2) && (contentDispositionKeyValue[0] === '"') && (contentDispositionKeyValue[contentDispositionKeyValue.length - 1] === '"'))
                        contentDispositionKeyValue = contentDispositionKeyValue.substring(1, contentDispositionKeyValue.length - 1);
                    if ((contentDispositionKeyValue.length > 2) && (contentDispositionKeyValue[0] === "'") && (contentDispositionKeyValue[contentDispositionKeyValue.length - 1] === "'"))
                        contentDispositionKeyValue = contentDispositionKeyValue.substring(1, contentDispositionKeyValue.length - 1);
                    object.filename = decodeURI(contentDispositionKeyValue);
                    break;
                }
            }
        }
        return (object);
    }
    ConvertFileBody(body) {
        if ((body.length > 2) && (body[0] === '"') && (body[body.length - 1] === '"'))
            return (body.substring(1, body.length - 1));
        if ((body.length > 2) && (body[0] === "'") && (body[body.length - 1] === "'"))
            return (body.substring(1, body.length - 1));
        return (btoa(body));
    }
    Request(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestDebbuger = yield this.Application.Debugger.CreateRequest(request.Url);
            const response = yield this.RequestInternal(request);
            yield this.SetContainerId(response);
            yield this.Application.Debugger.FinishRequest(requestDebbuger);
            return (response);
        });
    }
    RequestInternal(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const application = this.Application;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                xhr.onload = () => {
                    resolve(application.Server.CreateResponse(request, xhr));
                };
                xhr.open(request.Verb, request.Url, true);
                if (request.Headers != null) {
                    for (let i = 0; i < request.Headers.length; i++) {
                        const header = request.Headers[i];
                        xhr.setRequestHeader(header[0], application.Serializer.EnsureASCII(header[1]));
                    }
                }
                if (request.Binary)
                    xhr.responseType = 'blob';
                xhr.send(request.Body);
            });
        });
    }
    CreateResponse(request, xhr) {
        const headers = [];
        if (request.ExtractHeaders)
            this.ExtractHeaders(xhr, headers);
        let body = null;
        if (request.Binary)
            body = xhr.response;
        else
            body = xhr.responseText;
        return (new DrapoServerResponse(xhr.status, headers, body));
    }
    ExtractHeaders(xhr, headers) {
        const responseHeaders = xhr.getAllResponseHeaders();
        const lines = this.Application.Parser.ParseLines(responseHeaders);
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const header = this.Application.Parser.ParseHeader(line);
            if (header != null)
                headers.push(header);
        }
    }
    InsertHeaders(headers, headersInsert) {
        if (headersInsert == null)
            return;
        for (let i = 0; i < headersInsert.length; i++) {
            const header = headersInsert[i];
            this.InsertHeader(headers, header[0], header[1]);
        }
    }
    InsertHeader(headers, name, value) {
        headers.push([name, value]);
    }
    GetHeaderValue(headers, name) {
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            if (header[0].toLowerCase() === name.toLowerCase())
                return (header[1]);
        }
        return (null);
    }
    SetToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._token === token)
                return (false);
            this._token = token;
            if (this._token === null) {
                yield this.Application.Storage.ClearDataToken();
            }
            else {
                yield this.Application.Observer.NotifyAuthorization();
            }
            return (true);
        });
    }
    HasToken() {
        return (this._token != null);
    }
    SetTokenAntiforgery(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._tokenAntiforgery === token)
                return (false);
            const headerCSRF = yield this.Application.Config.GetHeaderCSRF();
            if ((headerCSRF == null) || (headerCSRF == ''))
                return;
            this._tokenAntiforgery = token;
            return (true);
        });
    }
    GetRequestHeaders() {
        if (this._requestHeadersNext.length === 0)
            return (this._requestHeaders);
        const headers = [];
        this.AddHeader(headers, this._requestHeaders);
        this.AddHeader(headers, this._requestHeadersNext);
        this._requestHeadersNext = [];
        return (headers);
    }
    AddHeader(headers, headersInsert) {
        for (let i = 0; i < headersInsert.length; i++)
            headers.push(headersInsert[i]);
    }
    AddRequestHeader(key, value) {
        for (let i = this._requestHeaders.length - 1; i >= 0; i--) {
            const requestHeader = this._requestHeaders[i];
            if (requestHeader[0] !== key)
                continue;
            requestHeader[1] = value;
            return;
        }
        this._requestHeaders.push([key, value]);
    }
    GetRequestHeader(key) {
        for (let i = this._requestHeaders.length - 1; i >= 0; i--) {
            const header = this._requestHeaders[i];
            if (header[0] === key)
                return (header[1]);
        }
        return (null);
    }
    AddNextRequestHeader(key, value) {
        this._requestHeadersNext.push([key, value]);
    }
    EnsureUrlEncoded(url) {
        if ((url == null) || (url == ''))
            return (url);
        if (this.IsUrlEncoded(url))
            return (url);
        let urlEncoded = encodeURI(url);
        urlEncoded = urlEncoded.replace(/[+]/g, '%2B');
        urlEncoded = urlEncoded.replace(/[$]/g, '%24');
        urlEncoded = urlEncoded.replace(/[#]/g, '%23');
        urlEncoded = urlEncoded.replace(/[,]/g, '%2C');
        urlEncoded = urlEncoded.replace(/[;]/g, '%3B');
        return (urlEncoded);
    }
    EnsureUrlComponentEncoded(url) {
        if ((url == null) || (url == ''))
            return (url);
        if (this.IsUrlEncoded(url))
            return (url);
        return (encodeURIComponent(url));
    }
    IsUrlEncoded(url) {
        if ((url == null) || (url == '') || (url.indexOf == null))
            return (false);
        const hasPercentage = url.indexOf('%') >= 0;
        if (!hasPercentage)
            return (false);
        const hasPercentageEncoded = url.indexOf('%25') >= 0;
        if (hasPercentageEncoded)
            return (true);
        const hasAndEncoded = url.indexOf('%26') >= 0;
        if (hasAndEncoded)
            return (true);
        const hasSpacedEncoded = url.indexOf('%20') >= 0;
        if (hasSpacedEncoded)
            return (true);
        const hasPlusEncoded = url.indexOf('%2B') >= 0;
        if (hasPlusEncoded)
            return (true);
        const hasCedilhaLCase = url.indexOf('%C3%A7') >= 0;
        if (hasCedilhaLCase)
            return (true);
        const hasCedilhaUCase = url.indexOf('%C3%87') >= 0;
        if (hasCedilhaUCase)
            return (true);
        const hasATilLCase = (url.indexOf('%C3%A3') >= 0 || url.indexOf('%C3%B5') >= 0 || url.indexOf('%C3%B1') >= 0);
        if (hasATilLCase)
            return (true);
        const hasATilUCase = (url.indexOf('%C3%83') >= 0 || url.indexOf('%C3%95') >= 0 || url.indexOf('%C3%91') >= 0);
        if (hasATilUCase)
            return (true);
        const hasAcuteAccentUCase = (url.indexOf('%C3%81') >= 0 || url.indexOf('%C3%89') >= 0 || url.indexOf('%C3%8D') >= 0 || url.indexOf('%C3%93') >= 0 || url.indexOf('%C3%9A') >= 0);
        if (hasAcuteAccentUCase)
            return (true);
        const hasAcuteAccentLCase = (url.indexOf('%C3%A1') >= 0 || url.indexOf('%C3%A9') >= 0 || url.indexOf('%C3%AD') >= 0 || url.indexOf('%C3%B3') >= 0 || url.indexOf('%C3%BA') >= 0);
        if (hasAcuteAccentLCase)
            return (true);
        const hasCircumflexAccentUCase = (url.indexOf('%C3%82') >= 0 || url.indexOf('%C3%8A') >= 0 || url.indexOf('%C3%94') >= 0);
        if (hasCircumflexAccentUCase)
            return (true);
        const hasCircumflexAccentLCase = (url.indexOf('%C3%A2') >= 0 || url.indexOf('%C3%AA') >= 0 || url.indexOf('%C3%B4') >= 0);
        if (hasCircumflexAccentLCase)
            return (true);
        return (false);
    }
    SetContainerId(response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._headerContainerIdKey == null)
                this._headerContainerIdKey = yield this.Application.Config.GetHeaderContainerId();
            if ((this._headerContainerIdKey == null) || (this._headerContainerIdKey == ''))
                return;
            for (let i = 0; i < response.Headers.length; i++) {
                const header = response.Headers[i];
                if (header[0].toLowerCase() !== this._headerContainerIdKey.toLowerCase())
                    continue;
                this._headerContainerIdValue = header[1];
                break;
            }
        });
    }
}

"use strict";
class DrapoServerRequest {
    get Verb() {
        return (this._verb);
    }
    set Verb(value) {
        this._verb = value;
    }
    get Url() {
        return (this._url);
    }
    set Url(value) {
        this._url = value;
    }
    get Headers() {
        return (this._headers);
    }
    set Headers(value) {
        this._headers = value;
    }
    get Body() {
        return (this._body);
    }
    set Body(value) {
        this._body = value;
    }
    get ExtractHeaders() {
        return (this._extractHeaders);
    }
    set ExtractHeaders(value) {
        this._extractHeaders = value;
    }
    set Binary(value) {
        this._binary = value;
    }
    get Binary() {
        return (this._binary);
    }
    constructor(verb, url, headers, body, extractHeaders, binary = false) {
        this._verb = 'GET';
        this._url = null;
        this._headers = [];
        this._body = null;
        this._extractHeaders = false;
        this._binary = false;
        this._verb = verb;
        this._url = url;
        this._headers = headers;
        this._body = body;
        this._extractHeaders = extractHeaders;
        this._binary = binary;
    }
}

"use strict";
class DrapoServerResponse {
    get Status() {
        return (this._status);
    }
    set Status(value) {
        this._status = value;
    }
    get Headers() {
        return (this._headers);
    }
    set Headers(value) {
        this._headers = value;
    }
    get Body() {
        return (this._body);
    }
    set Body(value) {
        this._body = value;
    }
    constructor(status, headers, body) {
        this._status = null;
        this._headers = [];
        this._body = null;
        this._cookies = null;
        this._status = status;
        this._headers = headers;
        this._body = body;
    }
    IsCacheAllowed() {
        if (this._headers == null)
            return (true);
        for (let i = 0; i < this._headers.length; i++) {
            const entry = this._headers[i];
            const key = entry[0].toLowerCase();
            if (key != 'cache-control')
                continue;
            const value = entry[1].toLowerCase();
            if (value == 'no-store')
                return (false);
            if (value == 'no-cache')
                return (false);
        }
        return (true);
    }
    GetCookieValue(name) {
        const cookies = this.GetCookies();
        for (let i = 0; i < cookies.length; i++)
            if (cookies[i][0] === name)
                return (cookies[i][1]);
        return (null);
    }
    GetCookies() {
        if (this._cookies == null)
            this._cookies = this.GetCookiesInternal();
        return (this._cookies);
    }
    GetCookiesInternal() {
        const cookies = [];
        for (let i = 0; i < this._headers.length; i++) {
            const header = this._headers[i];
            if (header[0].toLowerCase() !== 'set-cookie')
                continue;
            const headerCookies = header[1];
            const cookiesList = headerCookies.split(';');
            for (let j = 0; j < cookiesList.length; j++) {
                const cookie = cookiesList[j];
                const cookieParts = cookie.split('=');
                cookies.push([cookieParts[0], cookieParts[1]]);
            }
        }
        return (cookies);
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoSolver {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    ResolveConditional(expression, el = null, sector = null, context = null, renderContext = null, eljForTemplate = null, executionContext = null, canBind = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof expression === 'boolean')
                return (expression);
            if (typeof expression === 'number')
                return (expression > 0);
            const block = this.Application.Parser.ParseExpression(expression);
            const response = yield this.ResolveConditionalExpressionBlock(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind);
            if (this.Application.Parser.HasMustache(response))
                return (yield this.ResolveConditional(response, el, sector, context, renderContext, eljForTemplate, executionContext, canBind));
            const responseBoolean = yield this.ResolveConditionalBoolean(response);
            return (responseBoolean);
        });
    }
    ResolveConditionalExpressionBlock(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.EnsureExpressionItemCurrentLevelResolved(sector, context, renderContext, executionContext, el, block, eljForTemplate, canBind);
            this.JoinTexts(block);
            return (yield this.ResolveConditionalExpressionBlockOperation(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind));
        });
    }
    ResolveConditionalExpressionBlockOperation(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            if (block.Items.length === 0)
                return ('');
            yield this.EnsureExpressionItemResolved(sector, context, renderContext, executionContext, el, block, 0, eljForTemplate, canBind);
            const itemFirst = block.Items[0];
            if ((itemFirst.Type == DrapoExpressionItemType.Logical) || (itemFirst.Type == DrapoExpressionItemType.Comparator)) {
                const itemEmpty = new DrapoExpressionItem(DrapoExpressionItemType.Text, '');
                block.Items.unshift(itemEmpty);
                return (yield this.ResolveConditionalExpressionBlock(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind));
            }
            const resultFirst = itemFirst.Value;
            if (block.Items.length < 2)
                return (resultFirst);
            yield this.EnsureExpressionItemResolved(sector, context, renderContext, executionContext, el, block, 1, eljForTemplate, canBind);
            const itemSecond = block.Items[1];
            const resultSecond = itemSecond.Value;
            if ((resultSecond === '&&') && (!this.ResolveConditionalBoolean(resultFirst)))
                return ('false');
            if (resultFirst === '!') {
                const resultDenySecond = (!this.ResolveConditionalBoolean(resultSecond)).toString();
                const resultDenyItemSecond = new DrapoExpressionItem(DrapoExpressionItemType.Text, resultDenySecond);
                block.Items[0] = resultDenyItemSecond;
                block.Items.splice(1, 1);
                return (yield this.ResolveConditionalExpressionBlock(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind));
            }
            let resultThird = '';
            const hasMoreThanTwoTerms = block.Items.length > 2;
            if (hasMoreThanTwoTerms) {
                const itemThird = block.Items[2];
                if ((itemThird.Type == DrapoExpressionItemType.Logical) || (itemThird.Type == DrapoExpressionItemType.Comparator)) {
                    const itemEmpty = new DrapoExpressionItem(DrapoExpressionItemType.Text, '');
                    block.Items.splice(2, 0, itemEmpty);
                    return (yield this.ResolveConditionalExpressionBlock(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind));
                }
                yield this.EnsureExpressionItemResolved(sector, context, renderContext, executionContext, el, block, 2, eljForTemplate, canBind);
                resultThird = block.Items[2].Value;
            }
            if (resultThird === '!') {
                let resultFourth = 'false';
                if (block.Items.length > 3) {
                    yield this.EnsureExpressionItemResolved(sector, context, renderContext, executionContext, el, block, 3, eljForTemplate, canBind);
                    resultFourth = block.Items[3].Value;
                }
                const resultDenyFourth = (!this.ResolveConditionalBoolean(resultFourth)).toString();
                const resultDenyItemFourth = new DrapoExpressionItem(DrapoExpressionItemType.Text, resultDenyFourth);
                block.Items[2] = resultDenyItemFourth;
                if (block.Items.length > 3)
                    block.Items.splice(3, 1);
                return (yield this.ResolveConditionalExpressionBlock(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind));
            }
            if (this.HasBlockConditionalOperatorsNextResolve(block, 3))
                return (yield this.ResolveBlockConditionalOperatorsNext(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind, 3));
            const result = this.ResolveConditionalOperator(resultFirst, resultSecond, resultThird);
            const resultItem = new DrapoExpressionItem(DrapoExpressionItemType.Text);
            resultItem.Value = result;
            block.Items[0] = resultItem;
            block.Items.splice(1, hasMoreThanTwoTerms ? 2 : 1);
            return (yield this.ResolveConditionalExpressionBlock(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind));
        });
    }
    GetBlockConditionalOperatorsNextIndex(block, start) {
        for (let i = start; i < block.Items.length; i++) {
            const item = block.Items[i];
            if (item.Type == DrapoExpressionItemType.Logical)
                return (null);
            if (item.Type == DrapoExpressionItemType.Comparator)
                return (i);
        }
        return (null);
    }
    HasBlockConditionalOperatorsNextResolve(block, start) {
        const index = this.GetBlockConditionalOperatorsNextIndex(block, start);
        return (index !== null);
    }
    GetBlockConditionalOperatorsNextIndexStartingIndex(block, index) {
        if (((index - 2) >= 0) && (block.Items[index - 2].Type == DrapoExpressionItemType.Deny))
            return (index - 2);
        return (index - 1);
    }
    GetBlockConditionalOperatorsNextIndexEndingIndex(block, index) {
        if (index == (block.Items.length - 1))
            return (index);
        if (((index + 1) < block.Items.length) && (block.Items[index + 1].Type == DrapoExpressionItemType.Deny))
            return (index + 2);
        return (index + 1);
    }
    ResolveBlockConditionalOperatorsNext(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind, start) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.GetBlockConditionalOperatorsNextIndex(block, start);
            const startingIndex = this.GetBlockConditionalOperatorsNextIndexStartingIndex(block, index);
            const endingIndex = this.GetBlockConditionalOperatorsNextIndexEndingIndex(block, index);
            const blockConditional = block.CreateBlock(startingIndex, endingIndex);
            const valueConditional = yield this.ResolveConditionalExpressionBlock(sector, context, renderContext, executionContext, el, eljForTemplate, blockConditional, false);
            const itemConditinal = new DrapoExpressionItem(DrapoExpressionItemType.Text, valueConditional);
            block.Items[startingIndex] = itemConditinal;
            block.Items.splice(startingIndex + 1, (endingIndex - startingIndex));
            return (yield this.ResolveConditionalExpressionBlock(sector, context, renderContext, executionContext, el, eljForTemplate, block, canBind));
        });
    }
    EnsureExpressionItemCurrentLevelResolved(sector, context, renderContext, executionContext, el, block, eljForTemplate, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < block.Items.length; i++) {
                const item = block.Items[i];
                if (item.Type === DrapoExpressionItemType.Function)
                    block.Items[i] = new DrapoExpressionItem(DrapoExpressionItemType.Text, (yield this.Application.FunctionHandler.ReplaceFunctionExpressionsContext(sector, context, item.Value, canBind, executionContext)));
                else if (item.Type === DrapoExpressionItemType.Mustache)
                    block.Items[i] = new DrapoExpressionItem(DrapoExpressionItemType.Text, (yield this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, executionContext, item.Value, el, sector, canBind, DrapoStorageLinkType.Render, eljForTemplate != null, eljForTemplate)));
            }
        });
    }
    JoinTexts(block) {
        for (let i = block.Items.length - 1; i > 0; i--) {
            const item = block.Items[i];
            if (item.Type !== DrapoExpressionItemType.Text)
                continue;
            const itemPrevious = block.Items[i - 1];
            if (itemPrevious.Type !== DrapoExpressionItemType.Text)
                continue;
            itemPrevious.Value = itemPrevious.Value + item.Value;
            block.Items.splice(i, 1);
        }
    }
    EnsureExpressionItemResolved(sector, context, renderContext, executionContext, el, block, index, eljForTemplate, canBind) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = block.Items[index];
            if (item.Type === DrapoExpressionItemType.Block)
                block.Items[index] = new DrapoExpressionItem(DrapoExpressionItemType.Text, (yield this.ResolveConditionalExpressionBlock(sector, context, renderContext, executionContext, el, eljForTemplate, item, canBind)).toString());
            else if (item.Type === DrapoExpressionItemType.Function)
                block.Items[index] = new DrapoExpressionItem(DrapoExpressionItemType.Text, (yield this.Application.FunctionHandler.ReplaceFunctionExpressionsContext(sector, context, item.Value, canBind, executionContext)));
            else if (item.Type === DrapoExpressionItemType.Mustache)
                block.Items[index] = new DrapoExpressionItem(DrapoExpressionItemType.Text, (yield this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, executionContext, item.Value, el, sector, canBind, DrapoStorageLinkType.Render, eljForTemplate != null, eljForTemplate)));
        });
    }
    ResolveConditionalBlock(block) {
        const parts = this.Application.Parser.ParseConditionalLogicalOrComparator(block);
        while (parts.length > 2) {
            const result = this.ResolveConditionalOperator(parts[0], parts[1], parts[2]);
            parts[0] = result;
            parts.splice(1, 2);
        }
        if (parts.length == 0)
            return (false);
        return (this.ResolveConditionalBoolean(parts[0]));
    }
    ResolveConditionalOperator(dataLeft, dataOperation, dataRight) {
        if (dataOperation == "||")
            return (((this.ResolveConditionalBoolean(dataLeft)) || (this.ResolveConditionalBoolean(dataRight))).toString());
        if (dataOperation == "&&")
            return (((this.ResolveConditionalBoolean(dataLeft)) && (this.ResolveConditionalBoolean(dataRight))).toString());
        if (dataOperation == "!=")
            return ((dataLeft !== dataRight).toString());
        if (dataOperation == "=")
            return ((dataLeft === dataRight).toString());
        if (dataOperation == "<")
            return ((this.ResolveConditionalOperatorLessThan(dataLeft, dataRight)).toString());
        if (dataOperation == "<=")
            return ((this.ResolveConditionalOperatorLessOrEqualThan(dataLeft, dataRight)).toString());
        if (dataOperation == ">")
            return ((this.ResolveConditionalOperatorGreaterThan(dataLeft, dataRight)).toString());
        if (dataOperation == ">=")
            return ((this.ResolveConditionalOperatorGreaterOrEqualThan(dataLeft, dataRight)).toString());
        if (dataOperation == "LIKE")
            return ((this.ResolveConditionalOperatorLike(dataLeft, dataRight)).toString());
        if (dataOperation == "+")
            return (this.ResolveOperationArithmeticAddition(dataLeft, dataRight));
        if (dataOperation == "-")
            return (this.ResolveOperationArithmeticSubtraction(dataLeft, dataRight));
        if (dataOperation == "*")
            return (this.ResolveOperationArithmeticMultiplication(dataLeft, dataRight));
        if (dataOperation == "/")
            return (this.ResolveOperationArithmeticDivision(dataLeft, dataRight));
        this.Application.ExceptionHandler.HandleError('Drapo: Conditional Operation {0} is not supported', dataOperation);
        return (dataLeft);
    }
    ResolveConditionalBoolean(data) {
        if ((data != null) && (typeof data === 'string'))
            data = data.toLowerCase();
        if (data == 'true')
            return (true);
        if (data == 'false')
            return (false);
        if (data == '!false')
            return (true);
        if (data == '!true')
            return (false);
        if (data == '!null')
            return (true);
        if (data == 'null')
            return (false);
        if (data == '!')
            return (true);
        return ((data != null) && (data != '') && ((data.length == 1) || (data[0] !== '!')));
    }
    ResolveConditionalOperatorLessThan(dataLeft, dataRight) {
        const numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        const numberRight = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft < numberRight);
        return (dataLeft < dataRight);
    }
    ResolveConditionalOperatorLessOrEqualThan(dataLeft, dataRight) {
        const numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        const numberRight = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft <= numberRight);
        return (dataLeft <= dataRight);
    }
    ResolveConditionalOperatorGreaterThan(dataLeft, dataRight) {
        const numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        const numberRight = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft > numberRight);
        return (dataLeft > dataRight);
    }
    ResolveConditionalOperatorGreaterOrEqualThan(dataLeft, dataRight) {
        const numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        const numberRight = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft >= numberRight);
        return (dataLeft >= dataRight);
    }
    ResolveConditionalOperatorLike(dataLeft, dataRight) {
        if ((dataLeft == null) || (dataLeft == ''))
            return (false);
        if ((dataRight == null) || (dataRight == ''))
            return (false);
        const isAnyLeft = dataRight[0] === '%';
        const isAnyRight = dataRight[dataRight.length - 1] === '%';
        const dataRightClean = ((!isAnyLeft) && (!isAnyRight)) ? dataRight : dataRight.substring((isAnyLeft ? 1 : 0), dataRight.length - (isAnyRight ? 1 : 0));
        const index = dataLeft.toLowerCase().indexOf(dataRightClean.toLowerCase());
        if ((index == null) || (index < 0))
            return (false);
        if ((isAnyLeft) && (isAnyRight))
            return (true);
        if ((isAnyRight) && (index == 0))
            return (true);
        if ((isAnyLeft) && (index == (dataLeft.length - dataRight.length)))
            return (true);
        return (false);
    }
    ResolveOperationArithmeticAddition(dataLeft, dataRight) {
        const numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        const numberRight = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        const numberResult = numberLeft + numberRight;
        return (numberResult.toString());
    }
    ResolveOperationArithmeticSubtraction(dataLeft, dataRight) {
        const numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        const numberRight = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        const numberResult = numberLeft - numberRight;
        return (numberResult.toString());
    }
    ResolveOperationArithmeticMultiplication(dataLeft, dataRight) {
        const numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        const numberRight = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        const numberResult = numberLeft * numberRight;
        return (numberResult.toString());
    }
    ResolveOperationArithmeticDivision(dataLeft, dataRight) {
        const numberLeft = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        const numberRight = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        const numberResult = numberRight != 0 ? numberLeft / numberRight : 0;
        return (numberResult.toString());
    }
    CreateContextItemFromPath(sector, dataPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = dataPath[0];
            const context = new DrapoContext();
            const data = yield this.Application.Storage.RetrieveData(dataKey, sector);
            return (context.Create(data, null, null, dataKey, dataKey, null, null));
        });
    }
    CreateMustache(dataPath) {
        let mustache = '{{';
        for (let i = 0; i < dataPath.length; i++) {
            if (i > 0)
                mustache = mustache + '.';
            mustache = mustache + dataPath[i];
        }
        return (mustache + '}}');
    }
    CreateMustacheContext(context, mustacheParts, canResolveKey = true) {
        const mustacheContext = [];
        let updated = false;
        for (let i = 0; i < mustacheParts.length; i++) {
            const mustachePart = mustacheParts[i];
            const mustachePartNext = i < (mustacheParts.length - 1) ? mustacheParts[i + 1] : null;
            const mustacheSystem = mustachePartNext != null ? this.GetSystemContextPathValue(null, context, null, [mustachePart, mustachePartNext]) : null;
            if (mustacheSystem !== null) {
                return (mustacheSystem);
            }
            else {
                const mustacheRelative = this.CreateContextAbsoluteArray(context, mustachePart, canResolveKey);
                if (mustacheRelative === null) {
                    mustacheContext.push(mustachePart);
                }
                else {
                    for (let j = 0; j < mustacheRelative.length; j++)
                        mustacheContext.push(mustacheRelative[j]);
                    updated = true;
                }
            }
        }
        if (!updated)
            return (null);
        const mustacheRecursive = this.CreateMustache(mustacheContext);
        const mustacheRecursiveParts = this.Application.Parser.ParseMustache(mustacheRecursive);
        const mustacheRecursiveContext = this.CreateMustacheContext(context, mustacheRecursiveParts, false);
        if (mustacheRecursiveContext !== null)
            return (mustacheRecursiveContext);
        return (mustacheRecursive);
    }
    CreateContextAbsoluteArray(context, mustachePart, canResolveKey) {
        if ((canResolveKey) && (context.Item.Key === mustachePart)) {
            const contextKey = [];
            let hasInsertedContext = false;
            for (let i = 0; i < context.IndexRelatives.length; i++)
                if (this.AppendContextAbsoluteArray(context.Item, context.ItemsCurrentStack[i], context.IndexRelatives[i], contextKey, i === 0))
                    hasInsertedContext = true;
            this.AppendContextAbsoluteArray(context.Item, context.Item, context.IndexRelative, contextKey, !hasInsertedContext);
            return (contextKey);
        }
        for (let i = 0; i < context.ItemsCurrentStack.length; i++) {
            const itemCurrent = context.ItemsCurrentStack[i];
            if (itemCurrent.Key !== mustachePart)
                continue;
            return ([itemCurrent.Iterator, '[' + context.IndexRelatives[i] + ']']);
        }
        return (null);
    }
    AppendContextAbsoluteArray(itemCurrent, item, index, context, checkIndex) {
        if (!this.IsContextItemSameDataKey(itemCurrent, item))
            return (false);
        const iterators = this.Application.Parser.ParseForIterable(item.Iterator);
        if (iterators.length == 1)
            context.push(item.Iterator);
        else
            this.AppendContextAbsoluteIterators(item, context, iterators, checkIndex);
        context.push('[' + index + ']');
        return (true);
    }
    IsContextItemSameDataKey(itemCurrent, item) {
        if (item.DataKey == itemCurrent.DataKey)
            return (true);
        if (item.Key == itemCurrent.DataKey)
            return (true);
        return (false);
    }
    AppendContextAbsoluteIterators(item, context, iterators, checkIndex) {
        const start = ((checkIndex) && (item.DataKey === iterators[0])) ? 0 : 1;
        for (let i = start; i < iterators.length; i++)
            context.push(iterators[i]);
    }
    CreateMustacheReference(sector, contextItem, mustache) {
        return __awaiter(this, void 0, void 0, function* () {
            const mustacheContext = [];
            const mustacheParts = this.Application.Parser.ParseMustache(mustache);
            for (let i = 0; i < mustacheParts.length; i++) {
                const mustachePart = mustacheParts[i];
                if (contextItem != null) {
                    const mustacheRelative = this.GetContextItemAbsolute(contextItem, mustachePart);
                    for (let j = 0; j < mustacheRelative.length; j++)
                        mustacheContext.push(mustacheRelative[j]);
                }
                else {
                    mustacheContext.push(mustachePart);
                }
            }
            const dataKey = mustacheContext[0];
            const storageItem = yield this.Application.Storage.RetrieveDataItem(dataKey, sector);
            if (storageItem == null)
                return ('');
            const sectorStorage = storageItem.Sector != null ? storageItem.Sector : '';
            mustacheContext.splice(0, 0, '@' + sectorStorage);
            const mustacheReference = this.CreateMustache(mustacheContext);
            return (mustacheReference);
        });
    }
    GetContextItemAbsolute(contextItem, mustachePart) {
        if (contextItem.Key !== mustachePart)
            return ([mustachePart]);
        const iteratorParts = this.Application.Parser.ParseForIterable(contextItem.Iterator);
        const mustachePartsAbsolute = iteratorParts.concat('[' + contextItem.Index + ']');
        return (mustachePartsAbsolute);
    }
    ResolveDataPathMustache(context, executionContext, element, sector, mustacheParts) {
        return __awaiter(this, void 0, void 0, function* () {
            let updated = false;
            for (let i = 1; i < mustacheParts.length; i++) {
                const mustachePart = mustacheParts[i];
                if (!this.Application.Parser.IsMustache(mustachePart))
                    continue;
                const mustachePartParts = this.Application.Parser.ParseMustache(mustachePart);
                const dataValue = yield this.ResolveDataPath(context, executionContext, element, sector, mustachePartParts);
                mustacheParts[i] = dataValue;
                updated = true;
            }
            if (!updated)
                return (null);
            return (this.CreateMustache(mustacheParts));
        });
    }
    ExistDataPath(context, sector, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = this.Application.Solver.ResolveDataKey(path);
            const dataFields = this.Application.Solver.ResolveDataFields(path);
            const item = yield this.ResolveDataPathObjectItem(context.Item, dataKey, sector, true, path);
            if (item == null)
                return (false);
            return (this.ExistDataPathObject(item.Data, path));
        });
    }
    ExistDataPathObject(dataObject, dataPath) {
        let data = dataObject;
        for (let i = 1; i < dataPath.length; i++) {
            const currentKey = dataPath[i];
            const index = this.GetDataObjectPathObjectPropertyIndex(data, currentKey);
            if (index === null) {
                if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                    return (false);
                }
                data = data[currentKey];
            }
            else {
                if (!data.length)
                    return (false);
                data = data[index];
            }
        }
        if ((data === null) || (data === undefined))
            return (false);
        return (true);
    }
    ResolveDataPath(context, executionContext, element, sector, path, canBindReader = false, canBindWriter = false, modelEvents = null, modelEventsCancel = null, canNotify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataPath = (typeof path === 'string') ? [path] : path;
            for (let i = 1; i < dataPath.length; i++) {
                const mustache = dataPath[i];
                const isMustacheIndexer = this.Application.Parser.IsMustacheIndexer(mustache);
                const mustacheIndexer = isMustacheIndexer ? this.Application.Parser.GetMustacheInsideIndexer(mustache) : mustache;
                if (!this.Application.Parser.IsMustache(mustacheIndexer))
                    continue;
                const mustacheParts = this.Application.Parser.ParseMustache(mustacheIndexer);
                const mustacheValue = yield this.ResolveDataPath(context, executionContext, element, sector, mustacheParts, canBindReader, canBindWriter, modelEvents, modelEventsCancel, canNotify);
                const mustacheValueIndexer = isMustacheIndexer ? this.Application.Parser.CreateMustacheIndexer(mustacheValue) : mustacheValue;
                dataPath[i] = mustacheValueIndexer;
            }
            const dataKey = this.Application.Solver.ResolveDataKey(dataPath);
            const dataFields = this.Application.Solver.ResolveDataFields(dataPath);
            if ((!context.IsKey(dataKey)) && (!this.Application.Storage.IsDataKeyExecution(dataKey)) && (!(yield this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, dataPath)))) {
                if ((dataFields.length === 0))
                    return ('');
                if (this.Application.Storage.IsDataKeyDelay(dataKey, sector))
                    this.Application.Observer.SubscribeDelay(element, dataKey, dataFields);
                return (this.CreateMustache(dataPath));
            }
            const data = yield this.ResolveDataPathObject(sector, context, executionContext, dataPath);
            if (canBindWriter)
                this.Application.Binder.BindReaderWriter(yield this.ResolveDataPathObjectItem(context.Item, dataKey, sector), element, dataFields, modelEvents, modelEventsCancel, canNotify);
            else if (canBindReader)
                this.Application.Binder.BindReader(yield this.ResolveDataPathObjectItem(context.Item, dataKey, sector), element, dataFields);
            return (data);
        });
    }
    ResolveDataPathObject(sector, context, executionContext, dataPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.ResolveItemDataPathObject(sector, context.Item, dataPath, false, executionContext));
        });
    }
    ResolveItemDataPathObject(sector, contextItem, dataPath, canForceLoadDataDelay = false, executionContext = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const valueSystem = contextItem !== null ? this.GetSystemContextPathValue(sector, contextItem.Context, executionContext, dataPath) : null;
            if (valueSystem !== null)
                return (valueSystem);
            const valueExecutionContext = executionContext === null ? null : this.GetExecutionContextPathValue(sector, executionContext, dataPath);
            if (valueExecutionContext !== null)
                return (valueExecutionContext);
            const dataKey = dataPath[0];
            const item = yield this.ResolveDataPathObjectItem(contextItem, dataKey, sector, canForceLoadDataDelay, dataPath);
            if (item == null)
                return ('');
            return (this.ResolveDataObjectPathObject(item.Data, dataPath));
        });
    }
    ResolveItemStoragePathObject(item, dataPath) {
        const valueSystem = item !== null ? this.GetSystemPathValue(item, dataPath) : null;
        if (valueSystem !== null)
            return (valueSystem);
        return (this.ResolveDataObjectPathObject(item.Data, dataPath));
    }
    ResolveDataObjectPathObject(dataObject, dataPath, dataEnforce = null) {
        let data = dataObject;
        for (let i = 1; i < dataPath.length; i++) {
            const currentKey = dataPath[i];
            const index = this.GetDataObjectPathObjectPropertyIndex(data, currentKey);
            if (index === null) {
                if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                    if ((dataEnforce !== null) && (i === dataPath.length - 1)) {
                        data[currentKey] = dataEnforce;
                        return (dataEnforce);
                    }
                    return ('');
                }
                data = data[currentKey];
            }
            else {
                if (!data.length)
                    return ('');
                data = data[index];
            }
        }
        if ((data === null) || (data === undefined))
            return ('');
        return (data);
    }
    GetDataObjectPathObjectPropertyIndex(data, property) {
        if (property.length < 3)
            return (null);
        if (property[0] !== '[')
            return (null);
        if (property[property.length - 1] !== ']')
            return (null);
        const isHat = (property[1] === '^');
        const index = this.Application.Parser.ParseNumber(property.substring(isHat ? 2 : 1, property.length - 1));
        return (((isHat) && (data.length)) ? (data.length - index) : index);
    }
    ResolveDataObjectLookupHierarchy(data, searchField, searchValue, searchHierarchyField = null) {
        const dataList = data.length == null ? [data] : data;
        for (let i = 0; i < dataList.length; i++) {
            const dataCurrent = dataList[i];
            if (dataCurrent == null)
                continue;
            if ((searchHierarchyField != null) && (dataCurrent[searchHierarchyField] != null)) {
                const dataCurrentChild = this.ResolveDataObjectLookupHierarchy(dataCurrent[searchHierarchyField], searchField, searchValue, searchHierarchyField);
                if (dataCurrentChild != null)
                    return (dataCurrentChild);
            }
            const itemValue = searchField == '_Index' ? i : dataCurrent[searchField];
            if (itemValue == searchValue)
                return (dataCurrent);
        }
        return (null);
    }
    UpdateDataObjectLookupHierarchy(data, searchField, searchValue, value, searchHierarchyField = null) {
        const dataList = data.length == null ? [data] : data;
        for (let i = 0; i < dataList.length; i++) {
            const dataCurrent = dataList[i];
            if (dataCurrent == null)
                continue;
            if ((searchHierarchyField != null) && (dataCurrent[searchHierarchyField] != null)) {
                const updated = this.UpdateDataObjectLookupHierarchy(dataCurrent[searchHierarchyField], searchField, searchValue, value, searchHierarchyField);
                if (updated != null)
                    return (updated);
            }
            const itemValue = searchField == '_Index' ? i : dataCurrent[searchField];
            if ((itemValue != null) && (itemValue == searchValue)) {
                dataList[i] = value;
                return (true);
            }
        }
        return (null);
    }
    ContainsItemStoragePathObject(item, dataPath) {
        let data = item.Data;
        for (let i = 1; i < dataPath.length; i++) {
            const currentKey = dataPath[i];
            if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                return (false);
            }
            data = data[currentKey];
        }
        return (true);
    }
    ResolveDataPathObjectItem(contextItem, dataKey, sector, canForceLoadDataDelay = false, dataPath = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = contextItem;
            while (item != null) {
                if (item.Key == dataKey)
                    return (item);
                item = item.Parent;
            }
            const dataItem = yield this.Application.Storage.RetrieveDataItem(dataKey, sector, canForceLoadDataDelay, null);
            if (dataItem == null)
                return (null);
            if ((canForceLoadDataDelay) && (dataItem.IsDelay))
                yield this.Application.Storage.EnsureDataDelayLoaded(dataItem, dataPath);
            const context = new DrapoContext();
            return (context.Create(dataItem.Data, null, null, dataKey, null, null, null));
        });
    }
    ResolveSector(mustacheParts, sector) {
        if (mustacheParts.length == 0)
            return (sector);
        const mustacheSector = mustacheParts[0];
        if (mustacheSector === '@')
            return (null);
        if (mustacheSector.indexOf("@") === 0)
            return (mustacheSector.substring(1));
        return (sector);
    }
    HasMustachePartsSector(mustacheParts) {
        if (mustacheParts == null)
            return (false);
        const part = mustacheParts[0];
        if (part == null)
            return (false);
        if (part.length == 0)
            return (false);
        return (part[0] === '@');
    }
    ResolveDataKey(mustacheParts) {
        const index = this.HasMustachePartsSector(mustacheParts) ? 1 : 0;
        return (mustacheParts[index]);
    }
    ResolveDataFields(mustacheParts) {
        const dataFields = [];
        const start = this.HasMustachePartsSector(mustacheParts) ? 2 : 1;
        for (let i = start; i < mustacheParts.length; i++)
            dataFields.push(mustacheParts[i]);
        return (dataFields);
    }
    CreateDataPath(dataKey, dataFields) {
        const path = [];
        path.push(dataKey);
        if (dataFields != null) {
            for (let i = 0; i < dataFields.length; i++)
                path.push(dataFields[i]);
        }
        return (path);
    }
    CombineDataPath(dataPath1, dataPath2) {
        const path = [];
        if (dataPath1 != null)
            for (let i = 0; i < dataPath1.length; i++)
                path.push(dataPath1[i]);
        if (dataPath2 != null)
            for (let i = 0; i < dataPath2.length; i++)
                path.push(dataPath2[i]);
        return (path);
    }
    GetDataPathParent(dataPath) {
        const dataPathParent = [];
        for (let i = 0; i < dataPath.length - 1; i++)
            dataPathParent.push(dataPath[i]);
        return (dataPathParent);
    }
    UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, value, canNotify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = dataPath[0];
            if ((executionContext != null) && (this.Application.Storage.IsDataKeyExecution(key))) {
                const data = this.GetExecutionContextPathValueStack(sector, executionContext, dataPath);
                dataPath.splice(1, 1);
                if (this.UpdateDataPathObject(data, dataPath, value))
                    return (true);
                return (false);
            }
            if (contextItem === null) {
                const storageItem = yield this.Application.Storage.RetrieveDataItem(key, sector);
                if (storageItem === null)
                    return (false);
                if (dataPath.length === 1) {
                    if (storageItem.Data === value)
                        return (false);
                    storageItem.Data = value;
                }
                else {
                    if (!this.UpdateDataPathObject(storageItem.Data, dataPath, value))
                        return (false);
                }
                storageItem.HasChanges = true;
                if (canNotify)
                    yield this.Application.Observer.Notify(key, null, this.ResolveDataFields(dataPath));
                return (true);
            }
            const item = yield this.ResolveDataPathObjectItem(contextItem, key, sector);
            if (item == null)
                return (false);
            if (dataPath.length === 1) {
                if (item.Data === value)
                    return (false);
                item.Data = value;
            }
            else {
                const data = item.Data;
                if (!this.UpdateDataPathObject(item.Data, dataPath, value))
                    return (false);
            }
            if (canNotify)
                yield this.Application.Observer.Notify(item.DataKey, item.Index, this.ResolveDataFields(dataPath));
            return (true);
        });
    }
    UpdateDataPathObject(data, dataPath, value) {
        for (let i = 1; i < dataPath.length - 1; i++) {
            const currentKey = dataPath[i];
            const index = this.GetDataObjectPathObjectPropertyIndex(data, currentKey);
            if (index === null) {
                if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                    return (false);
                }
                data = data[currentKey];
            }
            else {
                if (!data.length)
                    return (false);
                data = data[index];
            }
        }
        if (data == null)
            return (false);
        const dataField = dataPath[dataPath.length - 1];
        const indexDataField = this.GetDataObjectPathObjectPropertyIndex(data, dataField);
        if (indexDataField === null) {
            if (data[dataField] === value)
                return (false);
            data[dataField] = value;
        }
        else {
            if (data[indexDataField] === value)
                return (false);
            data[indexDataField] = value;
        }
        return (true);
    }
    IsPrimitive(object) {
        if (object === null)
            return (true);
        if (typeof object === "string")
            return (true);
        if (typeof object === "number")
            return (true);
        if (typeof object === "boolean")
            return (true);
        if (typeof object === "bigint")
            return (true);
        if (typeof object === "undefined")
            return (true);
        if (typeof object === "symbol")
            return (true);
        return (false);
    }
    Clone(object, deepCopy = false) {
        if (this.IsPrimitive(object))
            return (object);
        if (object instanceof Date)
            return (new Date(object.getTime()));
        if (Array.isArray(object))
            return (this.CloneArray(object, deepCopy));
        return (this.CloneObject(object, deepCopy));
    }
    CloneObject(object, deepCopy) {
        const clone = {};
        for (const property in object) {
            if (!Object.prototype.hasOwnProperty.call(object, property))
                continue;
            if (deepCopy)
                clone[property] = this.Clone(object[property], true);
            else
                clone[property] = object[property];
        }
        return (clone);
    }
    CloneArray(object, deepCopy) {
        const clone = [];
        for (let i = 0; i < object.length; i++) {
            if (deepCopy)
                clone.push(this.Clone(object[i], deepCopy));
            else
                clone.push(object[i]);
        }
        return (clone);
    }
    CloneArrayString(list) {
        if (list == null)
            return (null);
        const clone = [];
        for (let i = 0; i < list.length; i++)
            clone.push(list[i]);
        return (clone);
    }
    CloneArrayElement(list) {
        if (list == null)
            return (null);
        const clone = [];
        for (let i = 0; i < list.length; i++)
            clone.push(list[i]);
        return (clone);
    }
    CloneArrayAny(list) {
        if (list == null)
            return (null);
        const clone = [];
        for (let i = 0; i < list.length; i++)
            clone.push(list[i]);
        return (clone);
    }
    GetSystemContextPathValue(sector, context, executionContext, dataPath) {
        if (this.Application.Storage.IsDataKeyExecution(dataPath[0]))
            return (this.GetExecutionContextPathValueSolved(sector, executionContext, dataPath));
        if (dataPath.length != 2)
            return (null);
        const property = dataPath[1];
        if (property.charAt(0) !== '_')
            return (null);
        if (context.Item === null)
            return (null);
        const propertyLower = property.toLowerCase();
        const key = dataPath[0];
        if (propertyLower === '_index')
            return (this.GetSystemContextPathValueIndex(context, key));
        if (propertyLower === '_indexrelative')
            return (this.GetSystemContextPathValueIndexRelative(context, key));
        if (context.Item.Key !== key)
            return (null);
        if (propertyLower === '_level')
            return (this.GetSystemContextPathValueLevel(context));
        if (propertyLower === '_haschanges')
            return (this.GetSystemContextPathValueHasChanges(sector, context.Item.DataKey));
        return (null);
    }
    GetExecutionContextPathValueSolved(sector, executionContext, dataPath) {
        const data = this.GetExecutionContextPathValueStack(sector, executionContext, dataPath);
        dataPath.splice(1, 1);
        return (this.ResolveDataObjectPathObject(data, dataPath));
    }
    GetExecutionContextPathValue(sector, executionContext, dataPath) {
        if (dataPath.length != 2)
            return (null);
        const obj = dataPath[0];
        if (obj.toLowerCase() === '_stack')
            return (this.GetExecutionContextPathValueStack(sector, executionContext, dataPath));
        return (null);
    }
    GetExecutionContextPathValueStack(sector, executionContext, dataPath) {
        const property = dataPath[1].toLowerCase();
        if (property === 'peek')
            return (executionContext.Stack.Peek());
        if (property === 'pop')
            return (executionContext.Stack.Pop());
        return (null);
    }
    GetSystemPathValue(item, dataPath) {
        if (dataPath.length != 2)
            return (null);
        const property = dataPath[1];
        if (property.charAt(0) !== '_')
            return (null);
        if (item === null)
            return (null);
        const propertyLower = dataPath[1].toLowerCase();
        if (propertyLower === '_haschanges')
            return (item.HasChanges.toString());
        return (null);
    }
    GetSystemContextPathValueIndex(context, key) {
        const index = context.GetIndex(key);
        if (index === null)
            return (null);
        return (index.toString());
    }
    GetSystemContextPathValueIndexRelative(context, key) {
        const indexRelative = context.GetIndexRelative(key);
        if (indexRelative === null)
            return (null);
        return (indexRelative.toString());
    }
    GetSystemContextPathValueLevel(context) {
        return (context.Level.toString());
    }
    GetSystemContextPathValueHasChanges(sector, dataKey) {
        return (this.Application.Storage.HasChanges(sector, dataKey).toString());
    }
    ResolveSystemContextPath(sector, context, expression) {
        if (expression.indexOf('._') < 0)
            return (expression);
        const mustaches = this.Application.Parser.ParseMustaches(expression);
        for (let i = 0; i < mustaches.length; i++) {
            const mustache = mustaches[i];
            const dataPath = this.Application.Parser.ParseMustache(mustache);
            const data = this.GetSystemContextPathValue(sector, context, null, dataPath);
            if (data === null)
                continue;
            expression = expression.replace(mustache, data);
        }
        return (expression);
    }
    TransformObjectIntoArray(object) {
        const array = [];
        for (const property in object) {
            const objectProperty = {};
            objectProperty.Key = property;
            objectProperty.Value = object[property];
            array.push(objectProperty);
        }
        return (array);
    }
    ResolveUrlToAbsolute(urlRelative) {
        if (urlRelative.search(/^\/\//) != -1)
            return (window.location.protocol + urlRelative);
        if (urlRelative.search(/:\/\//) != -1)
            return (urlRelative);
        if (urlRelative.search(/^\//) != -1)
            return window.location.origin + urlRelative;
        const base = window.location.href.match(/(.*\/)/)[0];
        return (base + urlRelative);
    }
    Contains(data, item) {
        for (let i = 0; i < data.length; i++)
            if (data[i] == item)
                return (true);
        return (false);
    }
    Join(list1, list2) {
        const list = [];
        for (let i = 0; i < list1.length; i++)
            list.push(list1[i]);
        for (let i = 0; i < list2.length; i++) {
            const value = list2[i];
            if (!this.Contains(list, value))
                list.push(value);
        }
        return (list);
    }
    Get(dictionary, key) {
        for (let i = 0; i < dictionary.length; i++) {
            const keyValue = dictionary[i];
            if (keyValue[0] === key)
                return (keyValue[1]);
        }
        return (null);
    }
    IsEqualAny(data1, data2) {
        const isData1Null = (data1 == null);
        const isData2Null = (data2 == null);
        if (isData1Null !== isData2Null)
            return (false);
        if (isData1Null)
            return (true);
        const isData1Array = Array.isArray(data1);
        const isData2Array = Array.isArray(data2);
        if (isData1Array !== isData2Array)
            return (false);
        if (isData1Array)
            return (this.IsEqualObjectArray(data1, data2));
        const isData1Object = (typeof data1 == 'object');
        const isData2Object = (typeof data2 == 'object');
        if (isData1Object !== isData2Object)
            return (false);
        if (isData1Object)
            return (this.IsEqualObject(data1, data2));
        return (false);
    }
    IsEqualObject(value1, value2) {
        const value1Properties = this.GetObjectProperties(value1);
        const value2Properties = this.GetObjectProperties(value2);
        if (value1Properties.length !== value2Properties.length)
            return (false);
        for (let i = 0; i < value1Properties.length; i++) {
            const value1Property = value1Properties[i];
            const value2Property = value2Properties[i];
            if (value1Property[0] !== value2Property[0])
                return (false);
            if (value1Property[1] !== value2Property[1])
                return (false);
        }
        return (true);
    }
    GetObjectProperties(value) {
        const valueAsAny = value;
        const properties = [];
        for (const propertyName in value) {
            properties.push([propertyName, valueAsAny[propertyName]]);
        }
        return (properties);
    }
    IsEqualObjectArray(value1, value2) {
        if (value1.length !== value2.length)
            return (false);
        for (let i = 0; i < value1.length; i++) {
            if (!this.IsEqualObject(value1[i], value2[i]))
                return (false);
        }
        return (true);
    }
    IsEqualStringArray(list1, list2) {
        if (list1.length !== list2.length)
            return (false);
        for (let i = 0; i < list1.length; i++)
            if (list1[i] !== list2[i])
                return (false);
        return (true);
    }
    IsEqualString(value1, value2) {
        const value1String = this.EnsureString(value1);
        const value2String = this.EnsureString(value2);
        return (value1String === value2String);
    }
    EnsureString(data) {
        if (data === null)
            return (data);
        if (typeof data === 'object')
            return ('object');
        if (typeof data === 'string')
            return (data);
        return (data.toString());
    }
    Replace(data, from, to) {
        if (from === '.')
            from = '\\.';
        const regex = new RegExp(from, 'g');
        const dataReplaced = data.replace(regex, to);
        return (dataReplaced);
    }
    ResolveMathematicalExpression(data) {
        const tokens = this.Application.Parser.ParseBlockMathematicalExpression(data);
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if ((token.length > 2) && (token[0] === '(') && (token[token.length - 1] === ')'))
                tokens[i] = this.ResolveMathematicalExpression(token.substring(1, token.length - 1));
        }
        for (let i = 0; i < tokens.length - 2; i++) {
            const token = tokens[i + 1];
            if (token !== '*')
                continue;
            const blockMultiFirstParameter = tokens[i];
            const blockMultiSecondParameter = tokens[i + 2];
            const blockMultiValue = (this.Application.Parser.ParseNumber(blockMultiFirstParameter) * this.Application.Parser.ParseNumber(blockMultiSecondParameter)).toString();
            tokens[i] = blockMultiValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        for (let i = 0; i < tokens.length - 2; i++) {
            const token = tokens[i + 1];
            if (token !== '/')
                continue;
            const blockDivisionFirstParameter = tokens[i];
            const blockDivisionSecondParameter = tokens[i + 2];
            const numberDividend = this.Application.Parser.ParseNumber(blockDivisionSecondParameter);
            const blockDivisionValue = numberDividend == 0 ? '0' : (this.Application.Parser.ParseNumber(blockDivisionFirstParameter) / numberDividend).toString();
            tokens[i] = blockDivisionValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        for (let i = 0; i < tokens.length - 2; i++) {
            const token = tokens[i + 1];
            if (token !== '+')
                continue;
            const blockPlusFirstParameter = tokens[i];
            const blockPlusSecondParameter = tokens[i + 2];
            const blockPlusValue = (this.Application.Parser.ParseNumber(blockPlusFirstParameter) + this.Application.Parser.ParseNumber(blockPlusSecondParameter)).toString();
            tokens[i] = blockPlusValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        for (let i = 0; i < tokens.length - 2; i++) {
            const token = tokens[i + 1];
            if (token !== '-')
                continue;
            const blockMinusFirstParameter = tokens[i];
            const blockMinusSecondParameter = tokens[i + 2];
            const blockMinusValue = (this.Application.Parser.ParseNumber(blockMinusFirstParameter) - this.Application.Parser.ParseNumber(blockMinusSecondParameter)).toString();
            tokens[i] = blockMinusValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        return (tokens[0]);
    }
}

"use strict";
class DrapoStack {
    constructor() {
        this._data = [];
    }
    Peek() {
        if (this._data.length == 0)
            return (null);
        return (this._data[this._data.length - 1]);
    }
    Push(item) {
        this._data.push(item);
    }
    Pop() {
        const item = this._data.pop();
        return (item !== null && item !== void 0 ? item : null);
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoStorage {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._cacheItems = [];
        this._isDelayTriggered = false;
        this.CONTENT_TYPE_JSON = 'application/json; charset=utf-8';
        this.CONTENT_TYPE_TEXT = 'text/plain';
        this._lock = false;
        this.CHUNK_SIZE = 3 * 1024 * 1024;
        this._application = application;
    }
    AdquireLock() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this._lock) {
                yield this.Application.Document.Sleep(50);
            }
            this._lock = true;
        });
    }
    ReleaseLock() {
        this._lock = false;
    }
    Retrieve(dataKey, sector, context, dataKeyParts = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dataKeyParts === null)
                dataKeyParts = this.Application.Parser.ParseForIterable(dataKey);
            if ((dataKeyParts.length == 1) || (this.IsDataKey(dataKeyParts[0], sector)))
                return (yield this.RetrieveDataItem(dataKey, sector));
            if ((dataKeyParts.length > 1) && (context.Item != null))
                return (this.RetrieveIterator(dataKey, dataKeyParts, context));
            if ((dataKeyParts.length > 1) && (context.Item === null)) {
                const item = yield this.RetrieveDataItem(dataKey, sector);
                if (item === null)
                    return (null);
                return (this.RetrieveIteratorChild(dataKey, dataKeyParts, item.Data));
            }
            return (null);
        });
    }
    RetrieveDataItemContext(dataKey, sector, executionContext = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((executionContext !== null) && (executionContext.HasSectorContainer(sector))) {
                const dataItemContext = yield this.Application.SectorContainerHandler.GetStorageItem(sector, executionContext.GetSectorContainer(sector), dataKey);
                if (dataItemContext !== null)
                    return (dataItemContext);
            }
            const dataItem = yield this.RetrieveDataItem(dataKey, sector);
            return (dataItem);
        });
    }
    RetrieveData(dataKey, sector, executionContext = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = ((executionContext !== null) && (executionContext.HasSectorContainer(sector))) ? yield this.Application.SectorContainerHandler.GetStorageItem(sector, executionContext.GetSectorContainer(sector), dataKey) : yield this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (null);
            return (dataItem.Data);
        });
    }
    RetrieveStorageItemsCached(sector, dataKeyOrDataGroup) {
        const isAllSectors = ((sector === null) || (sector === ''));
        const isAllData = ((dataKeyOrDataGroup === null) || (dataKeyOrDataGroup === ''));
        const list = [];
        for (let i = 0; i < this._cacheItems.length; i++) {
            const item = this._cacheItems[i];
            if (item == null)
                continue;
            if ((!isAllSectors) && (item.Sector !== sector))
                continue;
            const dataKey = item.DataKey;
            if ((!isAllData) && (dataKey !== dataKeyOrDataGroup) && (!item.ContainsGroup(dataKeyOrDataGroup)))
                continue;
            list.push(item);
        }
        return (list);
    }
    RetrieveDataValue(sector, mustache) {
        return __awaiter(this, void 0, void 0, function* () {
            const mustacheFullParts = this.Application.Parser.ParseMustache(mustache);
            const dataSector = this.Application.Solver.ResolveSector(mustacheFullParts, sector);
            const dataKey = this.Application.Solver.ResolveDataKey(mustacheFullParts);
            const mustacheDataFields = this.Application.Solver.ResolveDataFields(mustacheFullParts);
            const mustacheParts = this.Application.Solver.CreateDataPath(dataKey, mustacheDataFields);
            if (yield this.EnsureDataKeyFieldReady(dataKey, dataSector, mustacheParts))
                return (this.Application.Storage.GetDataKeyField(dataKey, dataSector, mustacheParts));
            const item = yield this.RetrieveDataItemInternal(dataKey, dataSector, true, mustacheDataFields);
            if ((item == null) || (item.Data == null))
                return ('');
            const cacheIndex = this.GetCacheKeyIndex(dataKey, dataSector);
            if (cacheIndex == null) {
                yield this.AddCacheData(dataKey, dataSector, item);
            }
            else {
                const cacheItem = this.GetCacheDataItem(cacheIndex);
                for (const dataFieldCurrent in item.Data)
                    cacheItem.Data[dataFieldCurrent] = item.Data[dataFieldCurrent];
            }
            const data = this.Application.Solver.ResolveItemStoragePathObject(item, mustacheParts);
            return (data);
        });
    }
    CanGrowData(dataKey, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            return ((dataItem.IsIncremental) && (!dataItem.IsFull));
        });
    }
    GrowData(dataKey, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
            if (cacheIndex == null)
                return (false);
            const dataItem = this.GetCacheDataItem(cacheIndex);
            if (dataItem == null)
                return (false);
            if (dataItem.IsFull)
                return (false);
            if (dataItem.IsGrowing)
                return (false);
            dataItem.IsGrowing = true;
            const dataNew = yield this.RetrieveDataKeyUrl(dataKey, sector, dataItem.UrlGet, dataItem.UrlParameters, dataItem.PostGet, (dataItem.Start + dataItem.Data.length).toString(), dataItem.Increment.toString(), dataItem.Type, dataItem.IsToken);
            if (dataNew == null)
                return (false);
            dataItem.IsGrowing = false;
            if (dataNew.length < dataItem.Increment)
                dataItem.IsFull = true;
            for (let i = 0; i < dataNew.length; i++)
                dataItem.Data.push(dataNew[i]);
            return (true);
        });
    }
    UpdateData(dataKey, sector, data, notify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheIndex = yield this.EnsureDataKeyReady(dataKey, sector);
            if (cacheIndex == null)
                return (false);
            const dataItem = this.GetCacheDataItem(cacheIndex);
            if (dataItem == null)
                return (false);
            if (dataItem.Data == data)
                return (false);
            dataItem.Data = data;
            yield this.NotifyChanges(dataItem, notify, dataKey, null, null, false);
            return (true);
        });
    }
    UpdateDataPath(sector, contextItem, dataPath, value, canNotify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKey = this.Application.Solver.ResolveDataKey(dataPath);
            const dataItem = yield this.Application.Storage.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            const context = new DrapoContext();
            const item = contextItem == null ? context.Create(dataItem.Data, null, null, dataKey, null, null, null) : contextItem;
            if (item == null)
                return (false);
            if ((dataPath == null) || (dataPath.length == 1)) {
                if (dataItem.Data == value)
                    return (false);
                dataItem.Data = value;
            }
            else {
                if (!this.Application.Solver.UpdateDataPathObject(item.Data, dataPath, value))
                    return (false);
            }
            if (canNotify)
                yield this.Application.Observer.Notify(item.DataKey, item.Index, this.Application.Solver.ResolveDataFields(dataPath));
            yield this.NotifyChanges(dataItem, false, dataKey, null, this.Application.Solver.ResolveDataFields(dataPath), false);
            return (true);
        });
    }
    ReloadData(dataKey, sector, notify = true, canUseDifference = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKeyIndex = this.GetCacheKeyIndex(dataKey, sector);
            if (dataKeyIndex == null)
                return (true);
            const storageItem = this._cacheItems[dataKeyIndex];
            if (storageItem.UrlGet !== null) {
                const storageItemLoaded = yield this.RetrieveDataItemInternal(dataKey, sector);
                if (storageItemLoaded !== null) {
                    yield this.AdquireLock();
                    this._cacheItems[dataKeyIndex] = storageItemLoaded;
                    this.ReleaseLock();
                }
            }
            else if (storageItem.Type === 'query') {
                const storageItemLoaded = yield this.RetrieveDataItemInternal(dataKey, sector);
                if (storageItemLoaded !== null) {
                    const isEqual = this.Application.Solver.IsEqualAny(storageItem.Data, storageItemLoaded.Data);
                    if (isEqual)
                        return (false);
                    yield this.AdquireLock();
                    this._cacheItems[dataKeyIndex] = storageItemLoaded;
                    this.ReleaseLock();
                }
            }
            else {
                yield this.RemoveCacheData(dataKeyIndex, false);
            }
            if (notify)
                yield this.Application.Observer.Notify(dataKey, null, null, canUseDifference);
            return (true);
        });
    }
    GetSectors(dataKey) {
        const sectors = [];
        for (let i = this._cacheItems.length - 1; i >= 0; i--) {
            const storageItem = this._cacheItems[i];
            if (storageItem == null)
                continue;
            if (storageItem.DataKey === dataKey)
                sectors.push(storageItem.Sector);
        }
        return (sectors);
    }
    GetSectorDataKeys(sector) {
        const dataKeys = [];
        for (let i = this._cacheItems.length - 1; i >= 0; i--) {
            const storageItem = this._cacheItems[i];
            if (storageItem == null)
                continue;
            if (storageItem.Sector === sector)
                dataKeys.push(storageItem.DataKey);
        }
        return (dataKeys);
    }
    ReloadPipe(dataPipe) {
        return __awaiter(this, void 0, void 0, function* () {
            let reloaded = false;
            for (let i = this._cacheItems.length - 1; i >= 0; i--) {
                if (i >= this._cacheItems.length)
                    continue;
                const storageItem = this._cacheItems[i];
                if (storageItem == null)
                    continue;
                if (storageItem.Pipes == null)
                    continue;
                if (!this.Application.Solver.Contains(storageItem.Pipes, dataPipe))
                    continue;
                if (yield this.ReloadData(storageItem.DataKey, null))
                    reloaded = true;
            }
            return (reloaded);
        });
    }
    IsMustachePartsDataKey(sector, mustacheParts) {
        const dataKey = mustacheParts[0];
        if (!this.IsDataKey(dataKey, sector))
            return (false);
        for (let i = 1; i < mustacheParts.length; i++) {
            const mustachePart = mustacheParts[i];
            if (!this.Application.Parser.IsMustache(mustachePart))
                continue;
            const mustachePartParts = this.Application.Parser.ParseMustache(mustachePart);
            if (!this.IsMustachePartsDataKey(sector, mustachePartParts))
                return (false);
        }
        return (true);
    }
    IsDataKey(dataKey, sector, renderContext = null) {
        if (this.Application.Document.IsSystemKey(dataKey))
            return (true);
        const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex != null)
            return (true);
        return (this.IsDataKeyElement(dataKey, renderContext));
    }
    IsDataKeyExecution(dataKey) {
        return (dataKey === '_stack');
    }
    IsDataKeyDelay(dataKey, sector) {
        const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex === null)
            return (false);
        const cacheItem = this.GetCacheDataItem(cacheIndex);
        if (cacheItem === null)
            return (false);
        return (cacheItem.IsDelay);
    }
    IsDataKeyElement(dataKey, renderContext) {
        if (renderContext === null)
            return (this.Application.Searcher.HasDataKeyElement(dataKey));
        const hasDataKeyElement = renderContext.HasDataKeyElement(dataKey);
        if (hasDataKeyElement !== null)
            return (hasDataKeyElement);
        const isDataKeyElement = this.Application.Searcher.HasDataKeyElement(dataKey);
        renderContext.AddDataKeyElement(dataKey, isDataKeyElement);
        return (isDataKeyElement);
    }
    EnsureDataKeyReady(dataKey, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            let cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
            if (cacheIndex == null) {
                const item = yield this.RetrieveDataItemInternal(dataKey, sector);
                if (item == null)
                    return (null);
                cacheIndex = yield this.AddCacheData(dataKey, sector, item);
            }
            return (cacheIndex);
        });
    }
    EnsureDataKeyFieldReady(dataKey, sector, dataPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
            if (cacheIndex == null) {
                const item = yield this.RetrieveDataItemInternal(dataKey, sector);
                if (item == null)
                    return (false);
                cacheIndex = yield this.AddCacheData(dataKey, sector, item);
            }
            const storageItem = this.GetCacheDataItem(cacheIndex);
            if (!storageItem.IsDelay)
                return (true);
            const hasData = this.Application.Solver.ContainsItemStoragePathObject(storageItem, dataPath);
            if (hasData)
                return (true);
            const isLoaded = this.Application.CacheHandler.EnsureLoaded(storageItem, sector, dataKey, dataPath);
            if (!isLoaded)
                return (false);
            return (this.Application.Solver.ContainsItemStoragePathObject(storageItem, dataPath));
        });
    }
    GetData(sector, dataPath) {
        if ((dataPath == null) || (dataPath.length == 0))
            return (null);
        const dataKey = this.Application.Solver.ResolveDataKey(dataPath);
        return (this.GetDataKeyField(dataKey, sector, dataPath));
    }
    GetDataKeyField(dataKey, sector, dataPath, executionContext = null) {
        const storageItem = this.GetCacheStorageItem(dataKey, sector, executionContext);
        if (storageItem === null)
            return (null);
        return (this.Application.Solver.ResolveItemStoragePathObject(storageItem, dataPath));
    }
    SetDataKeyField(dataKey, sector, dataFields, value, notify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheIndex = yield this.EnsureDataKeyReady(dataKey, sector);
            if (cacheIndex == null)
                return (false);
            const storageItem = this.GetCacheDataItem(cacheIndex);
            if ((dataFields !== null) && (storageItem.IsTypeArray)) {
                const length = storageItem.Data.length;
                let updated = false;
                for (let i = 0; i < length; i++) {
                    const data = storageItem.Data[i];
                    if (this.Application.Solver.UpdateDataPathObject(data, dataFields, value))
                        updated = true;
                }
                if (!updated)
                    return (false);
                yield this.NotifyChanges(storageItem, notify, dataKey, null, dataFields);
            }
            else {
                const path = this.Application.Solver.CreateDataPath(dataKey, dataFields);
                if (path.length === 1) {
                    if (storageItem.Data === value)
                        return (false);
                    storageItem.Data = value;
                    yield this.NotifyChanges(storageItem, notify, dataKey, null, null);
                }
                else {
                    if (!this.Application.Solver.UpdateDataPathObject(storageItem.Data, path, value))
                        return (false);
                    yield this.NotifyChanges(storageItem, notify, dataKey, null, dataFields);
                }
            }
            return (true);
        });
    }
    UpdateDataFieldLookup(dataKey, sector, dataFieldSeek, valueSeek, dataField, value, notify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheIndex = yield this.EnsureDataKeyReady(dataKey, sector);
            if (cacheIndex == null)
                return (false);
            const dataPath = (typeof dataField === "string") ? [dataField] : dataField;
            const storageItem = this.GetCacheDataItem(cacheIndex);
            if (storageItem.IsTypeArray) {
                const length = storageItem.Data.length;
                let updated = false;
                const context = new DrapoContext();
                for (let i = 0; i < length; i++) {
                    const data = storageItem.Data[i];
                    const dataPathSeek = this.CreateDataPath(dataKey, dataFieldSeek);
                    const contextItem = context.Create(data, null, null, dataKey, dataKey, null, i);
                    const dataPathSeekValue = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPathSeek);
                    if (!this.Application.Solver.IsEqualString(valueSeek, dataPathSeekValue))
                        continue;
                    if (!this.Application.Solver.UpdateDataPathObject(data, dataPath, value))
                        continue;
                    this.FlagAsUpdated(storageItem, i);
                    updated = true;
                }
                if (!updated)
                    return (false);
                yield this.NotifyChanges(storageItem, notify, dataKey, null, null);
            }
            else {
                return (false);
            }
            return (true);
        });
    }
    RemoveDataItemLookup(dataSource, sector, dataFieldSeek, valueSeek, notify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDataSourceMustache = this.Application.Parser.IsMustache(dataSource);
            if (isDataSourceMustache)
                return (yield this.RemoveDataItemLookupMustache(dataSource, sector, dataFieldSeek, valueSeek, notify));
            return (yield this.RemoveDataItemLookupDataKey(dataSource, sector, dataFieldSeek, valueSeek, notify));
        });
    }
    RemoveDataItemLookupDataKey(dataKey, sector, dataFieldSeek, valueSeek, notify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheIndex = yield this.EnsureDataKeyReady(dataKey, sector);
            if (cacheIndex == null)
                return (false);
            const dataPath = (typeof dataFieldSeek === "string") ? [dataFieldSeek] : dataFieldSeek;
            const storageItem = this.GetCacheDataItem(cacheIndex);
            if (storageItem.IsTypeArray) {
                const length = storageItem.Data.length;
                const removedArray = [];
                const context = new DrapoContext();
                for (let i = 0; i < length; i++) {
                    const data = storageItem.Data[i];
                    const dataPathSeek = this.Application.Solver.CreateDataPath(dataKey, dataPath);
                    const contextItem = context.Create(data, null, null, dataKey, dataKey, null, i);
                    const dataPathSeekValue = yield this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPathSeek);
                    if (!this.Application.Solver.IsEqualString(valueSeek, dataPathSeekValue))
                        continue;
                    removedArray.push(i);
                }
                for (let i = removedArray.length - 1; i >= 0; i--) {
                    const index = removedArray[i];
                    this.DeleteDataItemIndex(storageItem, index);
                }
                yield this.NotifyChanges(storageItem, ((notify) && (removedArray.length > 0)), dataKey, null, null);
            }
            else {
                return (false);
            }
            return (true);
        });
    }
    RemoveDataItemLookupMustache(dataSource, sector, dataFieldSeek, valueSeek, notify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataSourcePath = this.Application.Parser.ParseMustache(dataSource);
            const dataKey = this.Application.Solver.ResolveDataKey(dataSourcePath);
            const cacheIndex = yield this.EnsureDataKeyReady(dataKey, sector);
            if (cacheIndex == null)
                return (false);
            const storageItem = this.GetCacheStorageItem(dataKey, sector, null);
            if (storageItem === null)
                return (false);
            const dataBase = this.Application.Solver.ResolveItemStoragePathObject(storageItem, dataSourcePath);
            if ((dataBase == null) || (dataBase.length == 0))
                return (false);
            const dataPath = (typeof dataFieldSeek === "string") ? [dataKey, dataFieldSeek] : this.Application.Solver.CreateDataPath(dataKey, dataFieldSeek);
            const length = dataBase.length;
            const removedArray = [];
            const context = new DrapoContext();
            for (let i = 0; i < length; i++) {
                const data = dataBase[i];
                const dataPathSeekValue = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
                if (!this.Application.Solver.IsEqualString(valueSeek, dataPathSeekValue))
                    continue;
                removedArray.push(i);
            }
            for (let i = removedArray.length - 1; i >= 0; i--) {
                const index = removedArray[i];
                dataBase.splice(index, 1);
            }
            yield this.NotifyChanges(storageItem, ((notify) && (removedArray.length > 0)), dataKey, null, null);
            return (true);
        });
    }
    CreatePath(data) {
        return ([data]);
    }
    CreateDataPath(dataKey, dataField) {
        return ([dataKey, dataField]);
    }
    LoadDataDelayedAndNotify() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._isDelayTriggered)
                return;
            if (!this.Application.Observer.HasDelayKeys())
                return;
            this._isDelayTriggered = true;
            const dataKeys = this.Application.Observer.GetDelayKeys();
            for (let i = 0; i < dataKeys.length; i++) {
                const dataKey = dataKeys[i];
                const dataFields = this.Application.Observer.GetDelayFields(dataKey);
                if (dataFields.length == 0)
                    continue;
                const item = yield this.RetrieveDataItemInternal(dataKey, null, true, dataFields);
                if ((item == null) || (item.Data == null))
                    continue;
                const cacheIndex = this.GetCacheKeyIndex(dataKey, null);
                if (cacheIndex == null) {
                    yield this.AddCacheData(dataKey, null, item);
                }
                else {
                    const cacheItem = this.GetCacheDataItem(cacheIndex);
                    for (const dataField in item.Data)
                        cacheItem.Data[dataField] = item.Data[dataField];
                }
                for (const dataField in item.Data)
                    yield this.Application.Observer.NotifyDelay(dataKey, [dataField]);
            }
            this._isDelayTriggered = false;
        });
    }
    RetrieveDataItem(dataKey, sector, canLoadDelay = false, dataDelayFields = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
            if (cacheIndex != null)
                return (this.GetCacheDataItem(cacheIndex));
            const item = yield this.RetrieveDataItemInternal(dataKey, sector, canLoadDelay, dataDelayFields);
            if (item === null)
                return (null);
            if (item.OnLoad) {
                const executionContext = this.Application.FunctionHandler.CreateExecutionContext();
                executionContext.HasBreakpoint = yield this.Application.Debugger.HasBreakpoint(sector, dataKey);
                executionContext.Sector = sector;
                executionContext.DataKey = dataKey;
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, item.Element, item.OnLoad, executionContext);
            }
            if (item.CanCache) {
                yield this.AddCacheData(dataKey, item.Sector, item);
                if (item.OnAfterCached != null)
                    yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, item.Element, item.OnAfterCached);
            }
            if (item.OnAfterLoad) {
                const executionContext = this.Application.FunctionHandler.CreateExecutionContext();
                executionContext.HasBreakpoint = yield this.Application.Debugger.HasBreakpoint(sector, dataKey);
                executionContext.Sector = sector;
                executionContext.DataKey = dataKey;
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, item.Element, item.OnAfterLoad, executionContext);
            }
            yield this.Application.Debugger.NotifyStorage(dataKey);
            return (item);
        });
    }
    RetrieveDataItemInternal(dataKey, sector, canLoadDelay = false, dataDelayFields = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemSystem = yield this.RetrieveDataItemInternalSystem(dataKey);
            if (itemSystem !== null)
                return (itemSystem);
            const el = this.Application.Searcher.FindDataKey(dataKey, sector);
            if (el == null) {
                yield this.Application.ExceptionHandler.HandleError('Storage - RetrieveDataItemInternal - Invalid DataKey: {0}', dataKey);
                return (null);
            }
            const dataUrlGet = el.getAttribute('d-dataUrlGet');
            const isDelay = el.getAttribute('d-dataDelay') === 'true';
            if ((isDelay) && (!canLoadDelay))
                return (null);
            let dataUrlParameters = el.getAttribute('d-dataUrlParameters');
            if ((dataUrlParameters == null) || (dataUrlParameters == ''))
                dataUrlParameters = 'optional';
            const dataUrlSet = el.getAttribute('d-dataUrlSet');
            const dataUrlSetChunk = ((dataUrlSet == null) || (dataUrlSet == '')) ? null : el.getAttribute('d-dataUrlSetChunk');
            const chunk = ((dataUrlSetChunk == null) || (dataUrlSetChunk == '')) ? null : el.getAttribute('d-dataChunk');
            const dataPostGet = el.getAttribute('d-dataPostGet');
            const isLazy = el.getAttribute('d-dataLazy') === 'true';
            const dataStart = el.getAttribute('d-dataLazyStart');
            const dataIncrement = el.getAttribute('d-dataLazyIncrement');
            const isUnitOfWork = el.getAttribute('d-dataUnitOfWork') === 'true';
            const cookieName = el.getAttribute('d-dataCookieGet');
            const isCookieChange = el.getAttribute('d-dataCookieChange') === 'true';
            const userConfig = el.getAttribute('d-dataUserConfig');
            const isToken = el.getAttribute('d-dataToken') === 'true';
            let type = el.getAttribute('d-dataType');
            const access = el.getAttribute('d-dataAccess');
            const value = el.getAttribute('d-dataValue');
            const dataSector = this.Application.Document.GetSector(el);
            const groupsAttribute = el.getAttribute('d-dataGroups');
            const groups = ((groupsAttribute == null) || (groupsAttribute == '')) ? null : this.Application.Parser.ParsePipes(groupsAttribute);
            const pipes = this.Application.Parser.ParsePipes(el.getAttribute('d-dataPipes'));
            const channels = yield this.ParseChannels(sector, el.getAttribute('d-dataChannels'));
            const canCache = this.Application.Parser.ParseBoolean(el.getAttribute('d-dataCache'), true);
            const cacheKeys = this.Application.Parser.ParsePipes(el.getAttribute('d-dataCacheKeys'));
            const onLoad = type === 'function' ? value : null;
            const onAfterLoad = el.getAttribute('d-dataOnAfterLoad');
            const onAfterContainerLoad = el.getAttribute('d-dataOnAfterContainerLoad');
            const onBeforeContainerUnload = el.getAttribute('d-dataOnBeforeContainerUnLoad');
            const onAfterCached = el.getAttribute('d-dataOnAfterCached');
            const onNotify = el.getAttribute('d-dataOnNotify');
            const headersGet = this.ExtractDataHeaderGet(el);
            const headersSet = this.ExtractDataHeaderSet(el);
            const headersResponse = ((isCookieChange) || (type === 'file')) ? [] : null;
            const data = yield this.RetrieveDataKey(dataKey, sector, el, dataUrlGet, dataUrlParameters, dataPostGet, dataStart, dataIncrement, isDelay, dataDelayFields, cookieName, type, isToken, cacheKeys, channels, headersGet, headersResponse);
            if (data == null) {
                return (null);
            }
            if (type == null) {
                if (data.length)
                    type = 'array';
                else
                    type = 'object';
            }
            const increment = this.Application.Parser.GetStringAsNumber(dataIncrement);
            const isFull = ((isLazy) && (data.length < increment)) ? true : false;
            const pollingKey = yield this.ResolveValueMustaches(dataKey, sector, el.getAttribute('d-dataPollingKey'));
            const pollingTimespan = yield this.ResolveValueMustachesAsNumber(dataKey, sector, el.getAttribute('d-dataPollingTimespan'));
            const item = new DrapoStorageItem(dataKey, type, access, el, data, dataUrlGet, dataUrlSet, dataUrlSetChunk, chunk, dataUrlParameters, dataPostGet, this.Application.Parser.GetStringAsNumber(dataStart), increment, isLazy, isFull, isUnitOfWork, isDelay, cookieName, isCookieChange, userConfig, isToken, dataSector, groups, pipes, channels, canCache, cacheKeys, onLoad, onAfterLoad, onAfterContainerLoad, onBeforeContainerUnload, onAfterCached, onNotify, headersGet, headersSet, pollingKey, pollingTimespan);
            return (item);
        });
    }
    ResolveValueMustaches(dataKey, sector, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value == null)
                return (null);
            return (yield this.ResolveDataUrlMustaches(dataKey, sector, value, null, null));
        });
    }
    ResolveValueMustachesAsNumber(dataKey, sector, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value == null)
                return (null);
            const valueResolved = yield this.ResolveDataUrlMustaches(dataKey, sector, value, null, null);
            const valueAsNumber = this.Application.Parser.ParseNumber(valueResolved, null);
            return (valueAsNumber);
        });
    }
    RetrieveDataKey(dataKey, sector, el, dataUrlGet, dataUrlParameters, dataPostGet, dataStart, dataIncrement, isDelay, dataDelayFields, cookieName, type, isToken, cacheKeys, channels, headersGet, headersResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            if (channels !== null) {
                const dataChannels = this.RetrieveDataChannels(channels);
                if (dataChannels != null)
                    return (dataChannels);
            }
            if (dataUrlGet != null)
                return (yield this.RetrieveDataKeyUrl(dataKey, sector, dataUrlGet, dataUrlParameters, dataPostGet, dataStart, dataIncrement, type, isToken, cacheKeys, isDelay, dataDelayFields, headersGet, headersResponse));
            if (cookieName != null)
                return (this.RetrieveDataKeyCookie(cookieName));
            if (type != null)
                return (yield this.RetrieveDataKeyInitialize(dataKey, sector, type, el));
            const dataConfig = el.getAttribute('d-dataConfigGet');
            if (dataConfig != null)
                return (yield this.RetrieveDataKeyConfig(dataConfig));
            return (null);
        });
    }
    RetrieveDataKeyUrl(dataKey, sector, dataUrlGet, dataUrlParameters, dataPostGet, dataStart, dataIncrement, type, isToken, cacheKeys = null, isDelay = false, dataDelayFields = null, headersGet = null, headersResponse = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = dataUrlGet;
            if ((false) && (isToken) && (!this.Application.Server.HasToken())) {
                yield this.Application.Document.RequestAuthorization(dataKey, 'notify');
                return ([]);
            }
            if (!isDelay) {
                const cachedData = this.Application.CacheHandler.GetCachedData(cacheKeys, sector, dataKey);
                if (cachedData != null)
                    return (cachedData);
            }
            if ((isDelay) && (dataDelayFields != null) && (dataDelayFields.length === 1)) {
                const cachedData = this.Application.CacheHandler.GetCachedDataPath(cacheKeys, sector, dataKey, [dataKey, dataDelayFields[0]]);
                if (cachedData != null) {
                    const objectCachedData = {};
                    objectCachedData[dataDelayFields[0]] = cachedData;
                    return (objectCachedData);
                }
            }
            if (dataStart != null)
                url = url.replace('{{start}}', dataStart);
            if (dataIncrement != null)
                url = url.replace('{{increment}}', dataIncrement);
            const changes = [];
            url = yield this.ResolveDataUrlMustaches(dataKey, sector, url, null, changes);
            if ((dataUrlParameters === 'required') && (this.HasChangeNullOrEmpty(changes)))
                return ([]);
            let verb = "GET";
            let data = null;
            let contentType = null;
            let headers = [];
            if (isDelay) {
                if (dataDelayFields === null)
                    return ([]);
                verb = "POST";
                data = this.Application.Serializer.Serialize(dataDelayFields);
                contentType = this.CONTENT_TYPE_JSON;
            }
            else if (dataPostGet != null) {
                verb = "POST";
                const dataPostGetKey = this.Application.Parser.IsMustache(dataPostGet) ? yield this.ResolveMustaches(sector, dataPostGet) : dataPostGet;
                const item = yield this.RetrieveDataItem(dataPostGetKey, sector);
                if (item !== null)
                    data = this.Application.Serializer.Serialize(item.Data);
                contentType = this.CONTENT_TYPE_JSON;
                this.Application.Observer.SubscribeStorage(dataPostGetKey, null, dataKey);
            }
            else {
                headers = yield this.ResolveDataHeaders(dataKey, sector, headersGet, null);
            }
            let dataResponse = null;
            if (type === 'file')
                dataResponse = yield this.Application.Server.GetFile(url, verb, data, contentType, dataKey, headers, headersResponse);
            else
                dataResponse = yield this.Application.Server.GetJSON(url, verb, data, contentType, dataKey, headers, headersResponse);
            this.Application.CacheHandler.AppendCacheData(cacheKeys, sector, dataKey, dataResponse, isDelay);
            return (dataResponse);
        });
    }
    ParseChannels(sector, channels) {
        return __awaiter(this, void 0, void 0, function* () {
            if (channels == null)
                return (null);
            const channelsResolved = yield this.ResolveDataUrlMustaches(null, sector, channels, null);
            return (this.Application.Parser.ParsePipes(channelsResolved));
        });
    }
    RetrieveDataChannels(channels) {
        if (channels == null)
            return (null);
        for (let i = 0; i < channels.length; i++) {
            const dataChannel = this.RetrieveDataChannel(channels[i]);
            if (dataChannel !== null)
                return (dataChannel);
        }
        return (null);
    }
    ContainsDataChannel(dataItem, channel) {
        if (dataItem.Channels === null)
            return (false);
        for (let i = 0; i < dataItem.Channels.length; i++) {
            if (channel === dataItem.Channels[i])
                return (true);
        }
        return (false);
    }
    RetrieveDataChannel(channel) {
        for (let i = 0; i < this._cacheItems.length; i++) {
            const dataItem = this._cacheItems[i];
            if (dataItem == null)
                continue;
            if (this.ContainsDataChannel(dataItem, channel))
                return (this.Application.Solver.Clone(dataItem.Data, true));
        }
        return (null);
    }
    PropagateDataChannels(dataItem) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dataItem.Channels === null)
                return (false);
            for (let i = 0; i < dataItem.Channels.length; i++) {
                const channel = dataItem.Channels[i];
                for (let j = 0; j < this._cacheItems.length; j++) {
                    const dataItemCurrent = this._cacheItems[j];
                    if (dataItemCurrent == null)
                        continue;
                    if (!this.ContainsDataChannel(dataItemCurrent, channel))
                        continue;
                    if (dataItem.Data === dataItemCurrent.Data)
                        continue;
                    yield this.Application.Storage.UpdateData(dataItemCurrent.DataKey, dataItemCurrent.Sector, dataItem.Data, true);
                }
            }
            return (true);
        });
    }
    HasChangeNullOrEmpty(changes) {
        for (let i = 0; i < changes.length; i++) {
            const change = changes[i];
            const value = change[1];
            if ((value === null) || (value === ''))
                return (true);
        }
        return (false);
    }
    ExtractDataHeaderGet(el) {
        const attributes = [];
        for (let i = 0; i < el.attributes.length; i++) {
            const attribute = el.attributes[i];
            const attributeProperty = this.ExtractDataHeaderGetProperty(attribute.nodeName);
            if (attributeProperty != null)
                attributes.push([attributeProperty, attribute.nodeValue]);
        }
        return (attributes);
    }
    ExtractDataHeaderGetProperty(property) {
        const parse = this.Application.Parser.ParseProperty(property);
        if (parse.length != 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'dataheaderget')
            return (null);
        return (parse[2]);
    }
    ExtractDataHeaderSet(el) {
        const attributes = [];
        for (let i = 0; i < el.attributes.length; i++) {
            const attribute = el.attributes[i];
            const attributeProperty = this.ExtractDataHeaderSetProperty(attribute.nodeName);
            if (attributeProperty != null)
                attributes.push([attributeProperty, attribute.nodeValue]);
        }
        return (attributes);
    }
    ExtractDataHeaderSetProperty(property) {
        const parse = this.Application.Parser.ParseProperty(property);
        if (parse.length != 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'dataheaderset')
            return (null);
        return (parse[2]);
    }
    ResolveDataUrlMustaches(dataKey, sector, url, executionContext, changes = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const mustaches = this.Application.Parser.ParseMustaches(url);
            for (let i = 0; i < mustaches.length; i++) {
                const mustache = mustaches[i];
                const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                const mustacheDataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                const change = [mustache, null];
                if (changes != null)
                    changes.push(change);
                if (!this.IsDataKey(mustacheDataKey, sector))
                    continue;
                const isSameDataKey = dataKey === mustacheDataKey;
                if ((!isSameDataKey) && (!(yield this.Application.Storage.EnsureDataKeyFieldReady(mustacheDataKey, sector, mustacheParts))))
                    continue;
                const mustacheData = this.Application.Storage.GetDataKeyField(mustacheDataKey, sector, mustacheParts, executionContext);
                if ((!isSameDataKey) && (mustacheData == null))
                    continue;
                const mustacheDataEncoded = this.Application.Server.EnsureUrlComponentEncoded(mustacheData);
                url = url.replace(mustache, mustacheDataEncoded);
                change[1] = mustacheDataEncoded;
                if ((!isSameDataKey) && (dataKey !== null)) {
                    const mustacheDataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                    this.Application.Observer.SubscribeStorage(mustacheDataKey, mustacheDataFields, dataKey);
                }
            }
            return (url);
        });
    }
    ResolveDataHeaders(dataKey, sector, headers, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const headersData = [];
            if (headers === null)
                return (headersData);
            const isSectorActive = (executionContext === null) || (!executionContext.HasSectorContainer(sector));
            for (let i = 0; i < headers.length; i++) {
                const header = headers[i];
                const headerValue = header[1];
                let headerDataKey = null;
                let data = null;
                if (!this.Application.Parser.IsMustache(headerValue)) {
                    headerDataKey = headerValue;
                    data = yield this.RetrieveData(headerDataKey, sector, executionContext);
                    if (isSectorActive)
                        this.Application.Observer.SubscribeStorage(headerDataKey, null, dataKey);
                }
                else {
                    const headerMustacheParts = this.Application.Parser.ParseMustache(headerValue);
                    headerDataKey = this.Application.Solver.ResolveDataKey(headerMustacheParts);
                    const headerDataFields = this.Application.Solver.ResolveDataFields(headerMustacheParts);
                    const dataItem = yield this.RetrieveDataItem(headerDataKey, sector);
                    data = this.Application.Solver.ResolveItemStoragePathObject(dataItem, headerMustacheParts);
                    if (isSectorActive)
                        this.Application.Observer.SubscribeStorage(headerDataKey, headerDataFields, dataKey);
                }
                if (data == null)
                    continue;
                const dataSerialized = this.Application.Serializer.Serialize(data);
                const dataEncoded = this.Application.Serializer.EncodeHeaderFieldValue(dataSerialized);
                headersData.push([header[0], dataEncoded]);
            }
            return (headersData);
        });
    }
    ResolveMustachesRecursive(sector, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataResolved = yield this.ResolveMustaches(sector, data, true);
            if (dataResolved === data)
                return (dataResolved);
            return (yield this.ResolveMustachesRecursive(sector, dataResolved));
        });
    }
    ResolveMustaches(sector, data, canSubscribe = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const mustaches = this.Application.Parser.ParseMustaches(data);
            for (let i = 0; i < mustaches.length; i++) {
                const mustache = mustaches[i];
                const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                const dataSector = this.Application.Solver.ResolveSector(mustacheParts, sector);
                const mustacheDataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                if (!this.IsDataKey(mustacheDataKey, dataSector))
                    continue;
                const mustacheDataFields = this.Application.Solver.ResolveDataFields(mustacheParts);
                if (!(yield this.Application.Storage.EnsureDataKeyFieldReady(mustacheDataKey, dataSector, mustacheParts))) {
                    if (!canSubscribe)
                        continue;
                    this.Application.Observer.SubscribeDelay(null, mustacheDataKey, this.Application.Solver.ResolveDataFields(mustacheParts));
                    return (data);
                }
                const mustacheData = this.Application.Storage.GetDataKeyField(mustacheDataKey, dataSector, mustacheParts);
                if (mustacheData == null)
                    continue;
                data = data.replace(mustache, mustacheData);
            }
            return (data);
        });
    }
    ReactivateDataUrlMustache(dataKey, sector, item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (item.UrlGet == null)
                return;
            yield this.ResolveDataUrlMustaches(dataKey, sector, item.UrlGet, null);
        });
    }
    RetrieveDataKeyInitialize(dataKey, sector, type, el) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type == 'object')
                return (this.RetrieveDataKeyInitializeObject(el));
            if (type == 'array')
                return (yield this.RetrieveDataKeyInitializeArray(el, sector, dataKey));
            if (type == 'value')
                return (this.RetrieveDataKeyInitializeValue(el));
            if (type == 'mapping')
                return (yield this.RetrieveDataKeyInitializeMapping(el, sector, dataKey));
            if (type == 'pointer')
                return (yield this.RetrieveDataKeyInitializePointer(el, sector, dataKey));
            if (type == 'function')
                return (yield this.RetrieveDataKeyInitializeFunction(dataKey, el));
            if (type == 'querystring')
                return (this.RetrieveDataKeyInitializeQueryString(el, sector, dataKey));
            if (type == 'query')
                return (this.RetrieveDataKeyInitializeQuery(el, sector, dataKey));
            if (type == 'switch')
                return (this.RetrieveDataKeyInitializeSwitch(el, sector, dataKey));
            if (type == 'parent')
                return (this.RetrieveDataKeyInitializeParent(el, sector));
            return (null);
        });
    }
    RetrieveDataKeyInitializeValue(el) {
        const dataValue = el.getAttribute('d-dataValue');
        if (dataValue != null)
            return (dataValue);
        return ('');
    }
    RetrieveDataKeyInitializeArray(el, sector, dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataValue = el.getAttribute('d-dataValue');
            if (dataValue == null)
                return ([]);
            if (this.Application.Parser.IsMustache(dataValue)) {
                const mustacheParts = this.Application.Parser.ParseMustache(dataValue);
                const dataKeyReference = this.Application.Solver.ResolveDataKey(mustacheParts);
                this.Application.Observer.SubscribeStorage(dataKeyReference, null, dataKey, DrapoStorageLinkType.Pointer);
                this.Application.Observer.SubscribeStorage(dataKey, null, dataKeyReference, DrapoStorageLinkType.Pointer);
                const dataValueObject = yield this.RetrieveDataValue(sector, dataValue);
                const dataArray = [];
                dataArray.push(dataValueObject);
                return (dataArray);
            }
            const data = this.Application.Parser.ParseIterator(dataValue);
            if (data.length)
                return (data);
            return ([data]);
        });
    }
    RetrieveDataKeyInitializeMapping(el, sector, dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataValue = el.getAttribute('d-dataValue');
            if (dataValue == null)
                return ([]);
            const isReference = el.getAttribute('d-dataLoadType') === 'reference';
            let dataValueResolved = dataValue;
            if (this.Application.Parser.IsMustache(dataValue))
                dataValueResolved = yield this.ResolveMustaches(sector, dataValue);
            if (isReference) {
                el.setAttribute('d-dataValue', dataValueResolved);
                const dataReference = yield this.RetrieveDataValue(sector, dataValueResolved);
                return (this.Application.Solver.Clone(dataReference, true));
            }
            const isSubscribe = el.getAttribute('d-dataMappingSubscribe') === 'true';
            if (isSubscribe)
                this.Application.Observer.SubscribeStorage(dataValueResolved, null, dataKey, DrapoStorageLinkType.Reload);
            const storageItemMapped = yield this.RetrieveDataItem(dataValueResolved, sector);
            if (storageItemMapped === null)
                return (null);
            let data = storageItemMapped.Data;
            const dataMappingField = el.getAttribute('d-dataMappingField');
            if ((dataMappingField != null) && (dataMappingField != '')) {
                const dataMappingFieldResolved = yield this.ResolveMustaches(sector, dataMappingField);
                if ((dataMappingFieldResolved != null) && (dataMappingFieldResolved != '')) {
                    const dataPath = this.Application.Parser.ParsePath(dataMappingFieldResolved);
                    const dataPathFull = this.Application.Solver.CreateDataPath(dataValueResolved, dataPath);
                    data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPathFull);
                    if (data === null)
                        return (null);
                }
            }
            const dataMappingSearchField = el.getAttribute('d-dataMappingSearchField');
            let dataMappingSearchValue = el.getAttribute('d-dataMappingSearchValue');
            const dataMappingSearchHierarchyField = el.getAttribute('d-dataMappingSearchHierarchyField');
            if ((dataMappingSearchField != null) && (dataMappingSearchField != '') && (dataMappingSearchValue != null) && (dataMappingSearchValue != '')) {
                if (this.Application.Parser.IsMustache(dataMappingSearchValue)) {
                    const dataPath = this.Application.Parser.ParseMustache(dataMappingSearchValue);
                    dataMappingSearchValue = yield this.Application.Solver.ResolveItemDataPathObject(sector, null, dataPath);
                }
                data = this.Application.Solver.ResolveDataObjectLookupHierarchy(data, dataMappingSearchField, dataMappingSearchValue, dataMappingSearchHierarchyField);
            }
            return (this.Application.Solver.Clone(data, true));
        });
    }
    RetrieveDataKeyInitializePointer(el, sector, dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataValue = el.getAttribute('d-dataValue');
            if (dataValue == null) {
                yield this.Application.ExceptionHandler.HandleError('DrapoStorage - value of a pointer cant be null - {0}', dataKey);
                return ([]);
            }
            if (!this.Application.Parser.IsMustache(dataValue)) {
                yield this.Application.ExceptionHandler.HandleError('DrapoStorage - value of a pointer must be a mustache - {0}', dataKey);
                return ([]);
            }
            let dataMustache = dataValue;
            while (this.Application.Parser.IsMustache(dataMustache)) {
                const dataMustacheResolved = yield this.ResolveMustaches(sector, dataMustache);
                if ((dataMustacheResolved == null) || (dataMustacheResolved === ''))
                    break;
                if (!this.Application.Parser.IsMustache(dataMustacheResolved))
                    break;
                dataMustache = dataMustacheResolved;
            }
            const mustacheParts = this.Application.Parser.ParseMustache(dataMustache);
            const mustacheDataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
            this.Application.Observer.SubscribeStorage(mustacheDataKey, null, dataKey, DrapoStorageLinkType.Pointer);
            this.Application.Observer.SubscribeStorage(dataKey, null, mustacheDataKey, DrapoStorageLinkType.Pointer);
            const dataReference = yield this.RetrieveDataValue(sector, dataMustache);
            return (dataReference);
        });
    }
    UpdatePointerStorageItems(dataKey, dataReferenceKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const storageItems = this.Application.Storage.RetrieveStorageItemsCached(null, dataKey);
            if (storageItems.length == 0)
                return;
            const storageItem = storageItems[0];
            const storageReferenceItems = this.Application.Storage.RetrieveStorageItemsCached(null, dataReferenceKey);
            if (storageReferenceItems.length == 0)
                return;
            const storageReferenceItem = storageReferenceItems[0];
            if (storageItem.HasChanges)
                storageReferenceItem.HasChanges = true;
            if (storageReferenceItem.Type !== 'pointer')
                return;
            const storageItemLoaded = yield this.RetrieveDataItemInternal(dataReferenceKey, storageReferenceItem.Sector);
            if (storageItemLoaded === null)
                return;
            storageReferenceItem.Data = storageItemLoaded.Data;
        });
    }
    RetrieveDataKeyInitializeFunction(dataKey, el) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataValue = el.getAttribute('d-dataValue');
            if (dataValue == null)
                return ([]);
            const isToken = el.getAttribute('d-dataToken') === 'true';
            if (isToken) {
                if ((!this.Application.Server.HasToken()) && (this.Application.Observer.HasPendingAuthorization())) {
                    yield this.Application.Document.RequestAuthorization(dataKey, 'initialize');
                    return (null);
                }
            }
            return ([]);
        });
    }
    RetrieveDataKeyInitializeQueryString(el, sector, dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let object = yield this.RetrieveDataKeyInitializeMapping(el, sector, dataKey);
            if ((object !== null) && (((object.length) && (object.length > 0)) || (Object.keys(object).length > 0)))
                return (object);
            object = {};
            const canUseRouter = yield this.Application.Router.CanUseRouter();
            const dictionary = yield this.Application.Document.ExtractQueryString(canUseRouter);
            for (let i = 0; i < dictionary.length; i++) {
                const keyValuePair = dictionary[i];
                const key = keyValuePair[0];
                const value = keyValuePair[1];
                object[key] = value;
            }
            return (object);
        });
    }
    RetrieveDataKeyInitializeQuery(el, sector, dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataValue = el.getAttribute('d-dataValue');
            if (dataValue == null) {
                yield this.Application.ExceptionHandler.HandleError('There is no d-datavalue in: {0}', dataKey);
                return ([]);
            }
            const query = this.Application.Parser.ParseQuery(dataValue, el.getAttribute('d-data-query-options'));
            if (query === null) {
                yield this.Application.ExceptionHandler.HandleError('There is an error in query d-datavalue in: {0}', dataKey);
                return ([]);
            }
            if (query.Error !== null) {
                yield this.Application.ExceptionHandler.HandleError('Error parsing the query in: {0}. {1}', dataKey, query.Error);
                return ([]);
            }
            if (query.Sources.length > 2) {
                yield this.Application.ExceptionHandler.HandleError('Only support for 2 sources in query: {0}', dataKey);
                return ([]);
            }
            const dataQueryArray = el.getAttribute('d-dataQueryArray');
            if (dataQueryArray != null)
                query.OutputArray = dataQueryArray;
            return (yield this.ExecuteQuery(sector, dataKey, query));
        });
    }
    RetrieveDataKeyInitializeSwitch(el, sector, dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataValue = el.getAttribute('d-dataValue');
            if (dataValue == null) {
                yield this.Application.ExceptionHandler.HandleError('There is no d-datavalue in: {0}', dataKey);
                return ([]);
            }
            const switchItems = this.Application.Parser.ParseSwitch(dataValue);
            this.Application.Observer.UnsubscribeStorage(dataKey);
            for (let i = 0; i < switchItems.length; i++) {
                const switchItem = switchItems[i];
                const conditional = switchItem[1];
                if (conditional != null) {
                    const mustaches = this.Application.Parser.ParseMustaches(conditional);
                    for (let j = 0; j < mustaches.length; j++) {
                        const mustache = mustaches[j];
                        const mustacheParts = this.Application.Parser.ParseMustache(mustache);
                        const dataKeyConditional = this.Application.Solver.ResolveDataKey(mustacheParts);
                        this.Application.Observer.SubscribeStorage(dataKeyConditional, null, dataKey);
                    }
                    const conditionalResolved = yield this.Application.Solver.ResolveConditional(conditional, null, sector);
                    if (!conditionalResolved)
                        continue;
                }
                const dataKeySwitch = switchItem[0];
                const data = yield this.RetrieveData(dataKeySwitch, sector);
                return (data);
            }
            return ([]);
        });
    }
    RetrieveDataKeyInitializeParent(el, sector) {
        const dataValue = el.getAttribute('d-dataValue');
        const isReference = el.getAttribute('d-dataLoadType') === 'reference';
        let elParent = el.parentElement;
        let elParentAttributes = null;
        while ((elParent !== null) && ((elParentAttributes = this.Application.Document.GetElementAttributesFilteredPrefix(elParent, dataValue)).length == 0))
            elParent = elParent.parentElement;
        return (this.BuildObject(sector, isReference, elParentAttributes));
    }
    BuildObject(sector, isReference, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const object = {};
            let hasDelay = false;
            for (let i = 0; i < attributes.length; i++) {
                const keyValuePair = attributes[i];
                const key = keyValuePair[0];
                const value = keyValuePair[1];
                const valueResolved = isReference ? yield this.ResolveMustachesRecursive(sector, value) : value;
                if ((isReference) && (this.Application.Parser.IsMustache(valueResolved)))
                    hasDelay = true;
                object[key] = valueResolved;
            }
            if (hasDelay) {
                yield this.Application.Storage.LoadDataDelayedAndNotify();
                for (let i = 0; i < attributes.length; i++) {
                    const keyValuePair = attributes[i];
                    const key = keyValuePair[0];
                    const value = object[key];
                    if (!this.Application.Parser.IsMustache(value))
                        continue;
                    const valueResolved = yield this.ResolveMustachesRecursive(sector, value);
                    object[key] = valueResolved;
                }
            }
            return (object);
        });
    }
    RetrieveDataKeyInitializeObject(el) {
        const dataValue = el.getAttribute('d-dataValue');
        if ((dataValue != null) && (this.Application.Serializer.IsJson(dataValue))) {
            return (this.Application.Serializer.Deserialize(dataValue));
        }
        const object = {};
        const propertyKeys = [];
        const propertyNames = [];
        const propertyValues = [];
        for (let i = 0; i < el.attributes.length; i++) {
            const attribute = el.attributes[i];
            this.RetrieveDataProperty(object, attribute.nodeName, attribute.nodeValue, propertyKeys, propertyNames, propertyValues);
        }
        return (object);
    }
    RetrieveDataProperty(object, property, value, propertyKeys, propertyNames, propertyValues) {
        const parse = this.Application.Parser.ParseProperty(property);
        if (parse.length < 3)
            return (false);
        if (parse[0] != 'd')
            return (false);
        if (parse[1].toLowerCase() != 'dataproperty')
            return (false);
        if (parse.length == 3) {
            object[parse[2]] = value;
            return (true);
        }
        const key = parse[2];
        const nameOrValue = parse[3];
        let index = this.RetrieveDataPropertyKeyIndex(propertyKeys, key);
        if (nameOrValue == 'name') {
            if (index < 0) {
                index = propertyKeys.push(key);
                propertyNames.push(value);
                propertyValues.push(null);
                return (false);
            }
            else {
                propertyNames[index] = value;
                object[value] = propertyValues[index];
                return (true);
            }
        }
        if (nameOrValue == 'value') {
            if (index < 0) {
                index = propertyKeys.push(key);
                propertyNames.push(null);
                propertyValues.push(value);
                return (false);
            }
            else {
                propertyValues[index] = value;
                object[propertyNames[index]] = value;
                return (true);
            }
        }
        return (false);
    }
    RetrieveDataPropertyKeyIndex(propertyKeys, key) {
        for (let i = propertyKeys.length - 1; i >= 0; i--)
            if (propertyKeys[i] == key)
                return (i);
        return (-1);
    }
    RetrieveDataKeyConfig(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.Application.Config.GetSector(sector));
        });
    }
    RetrieveDataKeyCookie(name) {
        return (this.Application.CookieHandler.RetrieveData(name));
    }
    RetrieveIterator(dataKey, dataKeyParts, context) {
        if (dataKeyParts[0] == context.Item.Key)
            return (this.RetrieveIteratorChild(dataKey, dataKeyParts, context.Item.Data));
        return (null);
    }
    RetrieveIteratorChild(dataKey, dataKeyParts, contextData) {
        let current = contextData;
        for (let i = 1; i < dataKeyParts.length; i++) {
            const dataKeyCurrent = dataKeyParts[i];
            if (current[dataKeyCurrent] === 'undefined')
                return (null);
            current = current[dataKeyCurrent];
        }
        return (new DrapoStorageItem(dataKey, 'array', null, null, current, null, null, null, null, null, null, null, null, false, true, false, false, null, false, null, false, null, null, null, null, false, null, null, null, null, null, null, null, null, null, null, null));
    }
    AddDataItem(dataKey, dataPath, sector, item, notify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            let data = dataItem.Data;
            if (dataPath != null)
                data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath, []);
            data.push(item);
            if (dataItem.IsUnitOfWork)
                dataItem.DataInserted.push(item);
            yield this.NotifyChanges(dataItem, notify, dataKey, null, null);
        });
    }
    ToggleData(dataKey, dataPath, sector, item, notify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            let data = dataItem.Data;
            if (dataPath != null)
                data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
            let found = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i] != item)
                    continue;
                found = true;
                data.splice(i, 1);
            }
            if (!found)
                data.push(item);
            yield this.NotifyChanges(dataItem, notify, dataKey, null, null);
        });
    }
    GetDataItemLast(dataKey, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (null);
            if (dataItem.Data.length == 0)
                return (null);
            return (dataItem.Data[dataItem.Data.length - 1]);
        });
    }
    FlagDataItemAsUpdated(dataKey, sector, index, notify = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            this.FlagAsUpdated(dataItem, index);
            yield this.NotifyChanges(dataItem, notify, dataKey, null, null);
            return (true);
        });
    }
    NotifyChanges(dataItem, notify, dataKey, dataIndex, dataFields, canUseDifference = true) {
        return __awaiter(this, void 0, void 0, function* () {
            dataItem.HasChanges = true;
            if (notify)
                yield this.Application.Observer.Notify(dataKey, dataIndex, dataFields, canUseDifference);
            yield this.PropagateDataChannels(dataItem);
        });
    }
    NotifyNoChanges(dataItem, notify, dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            dataItem.HasChanges = false;
            if (notify)
                yield this.Application.Observer.Notify(dataKey, null, ['_HasChanges']);
        });
    }
    FlagAsUpdated(dataItem, index) {
        if (!dataItem.IsUnitOfWork)
            return (false);
        const dataArray = dataItem.Data;
        if (dataArray.length <= index)
            return (false);
        const data = dataArray[index];
        for (let i = dataItem.DataUpdated.length - 1; i >= 0; i--)
            if (dataItem.DataUpdated[i] === data)
                return (false);
        dataItem.DataUpdated.push(data);
        return (true);
    }
    GetCacheKeyIndex(dataKey, sector) {
        const sectors = this.Application.Document.GetSectorsAllowed(sector);
        for (let i = 0; i < this._cacheItems.length; i++) {
            const storageItem = this._cacheItems[i];
            if (storageItem == null)
                continue;
            const isAccessPublic = storageItem.IsAccessPublic;
            if ((storageItem.DataKey == dataKey) && ((this.Application.Document.IsSystemKey(dataKey)) || (storageItem.Sector === sector) || ((isAccessPublic) && (this.Application.Document.IsSectorAllowed(storageItem.Sector, sectors)))))
                return (i);
        }
        return (null);
    }
    IsDataReady(sector, dataKey) {
        const index = this.GetCacheKeyIndex(dataKey, sector);
        return (index !== null);
    }
    GetCacheStorageItem(dataKey, sector, executionContext) {
        if ((executionContext !== null) && (executionContext.HasSectorContainer(sector)))
            return (this.Application.SectorContainerHandler.GetStorageItem(sector, executionContext.GetSectorContainer(sector), dataKey));
        const index = this.GetCacheKeyIndex(dataKey, sector);
        if (index === null)
            return (null);
        return (this.GetCacheDataItem(index));
    }
    GetCacheDataItem(dataIndex) {
        return (this._cacheItems[dataIndex]);
    }
    AddCacheData(dataKey, sector, dataItem, canFireEventOnAfterCached = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.AdquireLock();
            const index = this._cacheItems.push(dataItem) - 1;
            this.ReleaseLock();
            if ((canFireEventOnAfterCached) && (dataItem.OnAfterCached != null))
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(sector, dataItem.Element, dataItem.OnAfterCached);
            this.Application.Worker.Check();
            return (index);
        });
    }
    FireEventOnNotify(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = this._cacheItems.length - 1; i >= 0; i--) {
                if (i >= this._cacheItems.length)
                    continue;
                const storageItem = this._cacheItems[i];
                if (storageItem == null)
                    continue;
                if (storageItem.DataKey != dataKey)
                    continue;
                if (storageItem.OnNotify == null)
                    continue;
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(storageItem.Sector, null, storageItem.OnNotify);
            }
        });
    }
    RemoveCacheData(index, canRemoveObservers = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (canRemoveObservers)
                this.Application.Observer.Unsubscribe(this._cacheItems[index].DataKey);
            yield this.AdquireLock();
            this._cacheItems.splice(index, 1);
            this.ReleaseLock();
            this.Application.Worker.Check();
        });
    }
    AppendCacheDataItemBySector(storageItems, sector) {
        for (let i = this._cacheItems.length - 1; i >= 0; i--) {
            const storageItem = this._cacheItems[i];
            if (storageItem == null)
                continue;
            if (storageItem.Sector !== sector)
                continue;
            storageItems.push(this._cacheItems[i]);
        }
    }
    AddCacheDataItems(storageItems) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.AdquireLock();
            for (let i = storageItems.length - 1; i >= 0; i--) {
                const storageItem = storageItems[i];
                this._cacheItems.push(storageItem);
            }
            this.ReleaseLock();
            this.Application.Worker.Check();
        });
    }
    GetCachedDataItemByDatePolling() {
        let item = null;
        for (let i = this._cacheItems.length - 1; i >= 0; i--) {
            const storageItem = this._cacheItems[i];
            if (storageItem == null)
                continue;
            if (storageItem.PollingDate == null)
                continue;
            if ((item == null) || (item.PollingDate > storageItem.PollingDate))
                item = storageItem;
        }
        return (item);
    }
    ExistCachedDataItem(item) {
        for (let i = this._cacheItems.length - 1; i >= 0; i--) {
            const storageItem = this._cacheItems[i];
            if (storageItem === item)
                return (true);
        }
        return (false);
    }
    ExecuteCachedDataItemPolling(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!item.IsTypeValue)
                return;
            yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(item.Sector, item.Element, item.Data);
        });
    }
    RemoveBySector(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.AdquireLock();
            for (let i = this._cacheItems.length - 1; i >= 0; i--) {
                const storageItem = this._cacheItems[i];
                if (storageItem == null)
                    continue;
                if (storageItem.Sector !== sector)
                    continue;
                this._cacheItems.splice(i, 1);
            }
            this.ReleaseLock();
            this.Application.Worker.Check();
        });
    }
    DiscardCacheData(dataKey, sector, canRemoveObservers = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataKeyIndex = this.GetCacheKeyIndex(dataKey, sector);
            if (dataKeyIndex == null)
                return (false);
            yield this.RemoveCacheData(dataKeyIndex, canRemoveObservers);
            return (true);
        });
    }
    DiscardCacheDataBySector(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            let removed = false;
            for (let i = this._cacheItems.length - 1; i >= 0; i--) {
                const item = this._cacheItems[i];
                if (item == null)
                    continue;
                if (item.Sector !== sector)
                    continue;
                const dataKey = item.DataKey;
                if (yield this.DiscardCacheData(dataKey, item.Sector))
                    removed = true;
            }
            return (removed);
        });
    }
    DeleteDataItem(dataKey, dataPath, sector, item, notify) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            let data = dataItem.Data;
            if (data == null)
                return (false);
            if (dataPath != null)
                data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPath);
            const index = this.GetDataItemIndex(data, item);
            if (index == null)
                return (false);
            if (dataItem.IsUnitOfWork)
                dataItem.DataDeleted.push(item);
            data.splice(index, 1);
            yield this.NotifyChanges(dataItem, notify, dataKey, index, dataPath);
            return (true);
        });
    }
    DeleteDataItemArray(dataKey, sector, item, notify) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            const value = this.Application.Parser.IsMustache(item) ? yield this.RetrieveDataValue(sector, item) : item;
            const length = dataItem.Data.length;
            for (let i = 0; i < length; i++) {
                const valueCurrent = dataItem.Data[i];
                if (value != valueCurrent)
                    continue;
                this.DeleteDataItemIndex(dataItem, i);
                yield this.NotifyChanges(dataItem, notify, dataKey, null, null);
                return (true);
            }
            return (false);
        });
    }
    DeleteDataItemIndex(dataItem, index) {
        const data = dataItem.Data;
        if (data == null)
            return (false);
        const item = data[index];
        if (item == null)
            return (false);
        if (dataItem.IsUnitOfWork)
            dataItem.DataDeleted.push(item);
        data.splice(index, 1);
        return (true);
    }
    GetDataItemIndex(data, item) {
        for (let i = 0; i < data.length; i++)
            if (data[i] == item)
                return (i);
        return (null);
    }
    PostData(dataKey, sector, dataKeyResponse, notify, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield this.RetrieveDataItemContext(dataKey, sector, executionContext);
            if (dataItem == null)
                return (false);
            if (dataItem.CookieName != null)
                return (this.Application.CookieHandler.SetCookieValue(dataItem));
            if (dataItem.Type === 'mapping')
                return (this.PostDataMapping(dataKey, sector, dataItem, notify, executionContext));
            const dataItemResponse = dataKeyResponse == '' ? null : (dataKey == dataKeyResponse ? dataItem : yield this.RetrieveDataItem(dataKeyResponse, sector));
            const headers = yield this.ResolveDataHeaders(dataKey, sector, dataItem.HeadersSet, executionContext);
            let url = dataItem.UrlSet;
            url = yield this.ResolveDataUrlMustaches(null, sector, url, executionContext);
            const object = {};
            if (dataItem.IsUnitOfWork) {
                if (dataItem.DataInserted.length > 0)
                    object.Inserted = dataItem.DataInserted;
                if (dataItem.DataUpdated.length > 0)
                    object.Updated = dataItem.DataUpdated;
                if (dataItem.DataDeleted.length > 0)
                    object.Deleted = dataItem.DataDeleted;
            }
            else {
                object.Entities = dataItem.Data;
            }
            const headersResponse = dataItem.IsCookieChange ? [] : null;
            const data = yield this.Application.Server.GetJSON(url, "POST", this.Application.Serializer.Serialize(object), this.CONTENT_TYPE_JSON, null, headers);
            if (this.Application.Server.HasBadRequest)
                return (false);
            if ((data != null) && (dataItemResponse != null))
                dataItemResponse.Data = data;
            dataItem.DataInserted = [];
            dataItem.DataUpdated = [];
            dataItem.DataDeleted = [];
            if (dataKey !== dataKeyResponse)
                yield this.NotifyNoChanges(dataItem, notify, dataKey);
            yield this.NotifyChanges(dataItem, ((notify) && (dataItemResponse != null)), dataKeyResponse, null, null);
            return (true);
        });
    }
    PostDataItem(dataKey, sector, dataKeyResponse, notify, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            if (dataItem.CookieName != null)
                return (this.Application.CookieHandler.SetCookieValue(dataItem));
            const dataItemResponse = dataKeyResponse == '' ? null : (dataKey == dataKeyResponse ? dataItem : yield this.RetrieveDataItem(dataKeyResponse, sector));
            const headers = yield this.ResolveDataHeaders(dataKey, sector, dataItem.HeadersSet, executionContext);
            let url = dataItem.UrlSet;
            url = yield this.ResolveDataUrlMustaches(null, sector, url, executionContext);
            const canChunk = dataItem.Chunk != null;
            const chunkMustache = canChunk ? this.Application.Parser.ParseMustache(dataItem.Chunk) : null;
            let dataChunk = canChunk ? this.Application.Solver.ResolveItemStoragePathObject(dataItem, chunkMustache) : "";
            const isChunk = dataChunk.length > this.CHUNK_SIZE;
            const object = isChunk ? this.Application.Solver.Clone(dataItem.Data, true) : dataItem.Data;
            if (isChunk)
                this.Application.Solver.UpdateDataPathObject(object, chunkMustache, dataChunk.substring(0, this.CHUNK_SIZE));
            const headersResponse = dataItem.IsCookieChange ? [] : null;
            const data = yield this.Application.Server.GetJSON(url, "POST", this.Application.Serializer.Serialize(object), this.CONTENT_TYPE_JSON, null, headers, headersResponse);
            if (this.Application.Server.HasBadRequest)
                return (false);
            if (dataItemResponse != null)
                dataItemResponse.Data = data;
            if (isChunk) {
                const urlChunk = yield this.ResolveDataUrlMustaches(null, sector, dataItem.UrlSetChunk, executionContext);
                while (dataChunk.length > this.CHUNK_SIZE) {
                    dataChunk = dataChunk.substring(this.CHUNK_SIZE);
                    const chunkCurrent = dataChunk.substring(0, this.CHUNK_SIZE);
                    yield this.Application.Server.GetJSON(urlChunk, "POST", chunkCurrent, this.CONTENT_TYPE_TEXT, null, headers, null);
                    if (this.Application.Server.HasBadRequest)
                        return (false);
                }
            }
            if (dataKey !== dataKeyResponse)
                yield this.NotifyNoChanges(dataItem, notify, dataKey);
            yield this.NotifyChanges(dataItem, ((notify) && (dataItemResponse != null)), dataKeyResponse, null, null);
            return (true);
        });
    }
    PostDataMapping(dataKey, sector, dataItem, notify, executionContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const el = this.Application.Searcher.FindDataKey(dataKey, sector);
            if (el === null)
                return (false);
            const dataValue = el.getAttribute('d-dataValue');
            if (dataValue == null)
                return (false);
            let updated = false;
            const isReference = el.getAttribute('d-dataLoadType') === 'reference';
            if (isReference) {
                const mustacheFullPartsReference = this.Application.Parser.ParseMustache(dataValue);
                const dataSectorReference = this.Application.Solver.ResolveSector(mustacheFullPartsReference, sector);
                const dataKeyReference = this.Application.Solver.ResolveDataKey(mustacheFullPartsReference);
                const mustacheDataFieldsReference = this.Application.Solver.ResolveDataFields(mustacheFullPartsReference);
                const mustachePartsReference = this.Application.Solver.CreateDataPath(dataKeyReference, mustacheDataFieldsReference);
                const dataClone = this.Application.Solver.Clone(dataItem.Data, true);
                updated = yield this.UpdateDataPath(dataSectorReference, null, mustachePartsReference, dataClone, notify);
                return (updated);
            }
            let dataValueResolved = dataValue;
            if (this.Application.Parser.IsMustache(dataValue))
                dataValueResolved = yield this.ResolveMustaches(sector, dataValue);
            const storageItemMapped = yield this.RetrieveDataItem(dataValueResolved, sector);
            if (storageItemMapped === null)
                return (null);
            const dataMappingField = el.getAttribute('d-dataMappingField');
            const dataMappingSearchField = el.getAttribute('d-dataMappingSearchField');
            let dataMappingSearchValue = el.getAttribute('d-dataMappingSearchValue');
            const dataMappingSearchHierarchyField = el.getAttribute('d-dataMappingSearchHierarchyField');
            if (((dataMappingField == null) || (dataMappingField == '')) && ((dataMappingSearchField == null) || (dataMappingSearchField == ''))) {
                if (storageItemMapped.Data === dataItem.Data)
                    return (false);
                updated = true;
                storageItemMapped.Data = dataItem.Data;
                storageItemMapped.HasChanges = true;
            }
            if (!updated) {
                let data = storageItemMapped.Data;
                let dataPath = null;
                if ((dataMappingField != null) && (dataMappingField != '')) {
                    const dataMappingFieldResolved = yield this.ResolveMustaches(sector, dataMappingField);
                    if ((dataMappingFieldResolved != null) && (dataMappingFieldResolved != '')) {
                        dataPath = this.Application.Parser.ParsePath(dataMappingFieldResolved);
                        const dataPathFull = this.Application.Solver.CreateDataPath(dataValueResolved, dataPath);
                        data = this.Application.Solver.ResolveDataObjectPathObject(data, dataPathFull);
                        if (data === null)
                            return (false);
                    }
                }
                if ((dataMappingSearchField != null) && (dataMappingSearchField != '') && (dataMappingSearchValue != null) && (dataMappingSearchValue != '')) {
                    if (this.Application.Parser.IsMustache(dataMappingSearchValue)) {
                        const dataPathCurrent = this.Application.Parser.ParseMustache(dataMappingSearchValue);
                        dataMappingSearchValue = yield this.Application.Solver.ResolveItemDataPathObject(sector, null, dataPathCurrent);
                    }
                    const updatedDataObject = this.Application.Solver.UpdateDataObjectLookupHierarchy(data, dataMappingSearchField, dataMappingSearchValue, dataItem.Data, dataMappingSearchHierarchyField);
                    if (updatedDataObject == null)
                        return (false);
                    updated = updatedDataObject;
                }
                else {
                    updated = yield this.SetDataKeyField(dataValueResolved, sector, dataPath, dataItem.Data, false);
                }
            }
            yield this.NotifyChanges(dataItem, ((updated) && (notify)), dataValueResolved, null, null);
            return (true);
        });
    }
    ClearData(dataText, sector, notify) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.Application.Parser.IsMustache(dataText)) {
                const mustacheParts = this.Application.Parser.ParseMustache(dataText);
                const dataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                const dataItem = yield this.RetrieveDataItem(dataKey, sector);
                if (dataItem == null)
                    return (false);
                const data = this.Application.Solver.ResolveItemStoragePathObject(dataItem, mustacheParts);
                if ((data == null) || (data == undefined) || (data.length == undefined))
                    return (false);
                for (let i = data.length - 1; i >= 0; i--) {
                    const item = data[i];
                    data.splice(i, 1);
                }
                yield this.NotifyChanges(dataItem, notify, dataKey, null, null);
            }
            else {
                const dataKey = dataText;
                const dataItem = yield this.RetrieveDataItem(dataKey, sector);
                if (dataItem == null)
                    return (false);
                for (let i = dataItem.Data.length - 1; i >= 0; i--) {
                    const item = dataItem.Data[i];
                    if (dataItem.IsUnitOfWork)
                        dataItem.DataDeleted.push(item);
                    dataItem.Data.splice(i, 1);
                }
                yield this.NotifyChanges(dataItem, notify, dataKey, null, null);
            }
            return (true);
        });
    }
    UnloadData(dataKey, sector) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.DiscardCacheData(dataKey, sector, true));
        });
    }
    ClearDataToken() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this._cacheItems.length; i++) {
                const item = this._cacheItems[i];
                if (item == null)
                    continue;
                if (!item.IsToken)
                    continue;
                item.Data = [];
                item.DataDeleted = [];
                item.DataInserted = [];
                item.DataUpdated = [];
                const dataKey = item.DataKey;
                this.Application.Observer.SubscribeAuthorization(dataKey, 'notify');
                yield this.NotifyChanges(item, true, dataKey, null, null);
            }
        });
    }
    FireEventOnBeforeContainerUnload(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = this._cacheItems.length - 1; i >= 0; i--) {
                if (i >= this._cacheItems.length)
                    continue;
                const item = this._cacheItems[i];
                if (item == null)
                    continue;
                if (item.Sector !== sector)
                    continue;
                if (item.OnBeforeContainerUnload === null)
                    continue;
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(item.Sector, item.Element, item.OnBeforeContainerUnload);
            }
        });
    }
    FireEventOnAfterContainerLoad(sector) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = this._cacheItems.length - 1; i >= 0; i--) {
                if (i >= this._cacheItems.length)
                    continue;
                const item = this._cacheItems[i];
                if (item == null)
                    continue;
                if (item.Sector !== sector)
                    continue;
                if (item.OnAfterContainerLoad === null)
                    continue;
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(item.Sector, item.Element, item.OnAfterContainerLoad);
            }
        });
    }
    MoveDataItem(dataKey, sector, dataMove, dataPosition, notify) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            let indexBefore = null;
            let indexAfter = null;
            for (let i = 0; i < dataItem.Data.length; i++) {
                const data = dataItem.Data[i];
                if (data === dataMove)
                    indexBefore = i;
                if (data === dataPosition)
                    indexAfter = i;
            }
            if ((indexBefore === null) || (indexAfter === null) || (indexBefore === indexAfter))
                return (false);
            yield this.FlagDataItemAsUpdated(dataKey, sector, indexBefore, false);
            yield this.FlagDataItemAsUpdated(dataKey, sector, indexAfter, false);
            dataItem.Data.splice(indexBefore, 1);
            dataItem.Data.splice(indexAfter, 0, dataMove);
            yield this.NotifyChanges(dataItem, notify, dataKey, null, null, true);
            return (true);
        });
    }
    MoveDataIndex(dataKey, sector, dataMove, index, notify) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataItem = yield this.RetrieveDataItem(dataKey, sector);
            if (dataItem == null)
                return (false);
            let indexBefore = null;
            for (let i = 0; i < dataItem.Data.length; i++) {
                const data = dataItem.Data[i];
                if (data === dataMove)
                    indexBefore = i;
            }
            if ((indexBefore === null) || (index === null) || (indexBefore === index))
                return (false);
            yield this.FlagDataItemAsUpdated(dataKey, sector, indexBefore, false);
            yield this.FlagDataItemAsUpdated(dataKey, sector, index, false);
            dataItem.Data.splice(indexBefore, 1);
            dataItem.Data.splice(index, 0, dataMove);
            yield this.NotifyChanges(dataItem, notify, dataKey, null, null, true);
            return (true);
        });
    }
    ResolveData(executeNoCache, el = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (el == null)
                el = document.documentElement;
            const children = [].slice.call(el.children);
            for (let i = 0; i < children.length; i++)
                yield this.ResolveDataElement(executeNoCache, children[i]);
        });
    }
    ResolveDataElement(executeNoCache, el) {
        return __awaiter(this, void 0, void 0, function* () {
            const sector = el.getAttribute ? el.getAttribute('d-sector') : null;
            if (sector != null)
                return;
            const children = [].slice.call(el.children);
            const hasChildren = children.length > 0;
            if (hasChildren) {
                for (let i = 0; i < children.length; i++) {
                    const child = children[i];
                    yield this.ResolveDataElement(executeNoCache, child);
                }
            }
            else {
                yield this.ResolveDataLoadInternal(executeNoCache, el);
            }
        });
    }
    ResolveDataLoadInternal(executeNoCache, el) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataLoadType = el.getAttribute('d-dataLoadType');
            if (dataLoadType == null)
                return;
            if (dataLoadType !== 'startup')
                return;
            const dataKey = el.getAttribute('d-dataKey');
            if (dataKey == null)
                return;
            const sector = this.Application.Document.GetSector(el);
            if (!this.Application.Document.IsSectorReady(sector))
                return;
            const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
            if (cacheIndex !== null)
                return;
            const canCache = this.Application.Parser.ParseBoolean(el.getAttribute('d-dataCache'), true);
            if ((!executeNoCache) && (!canCache))
                return;
            yield this.RetrieveDataItem(dataKey, sector, true, null);
        });
    }
    CreateErrorForStorage(type = null, message = null, content = null) {
        const object = {};
        object.Type = type;
        object.Message = message;
        object.Content = content;
        object.Date = new Date();
        return (object);
    }
    EnsureDataDelayLoaded(dataItem, dataPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.Application.Solver.ResolveDataObjectPathObject(dataItem.Data, dataPath);
            if (data !== '')
                return;
            const dataKey = dataPath[0];
            const dataField = dataPath[1];
            const item = yield this.RetrieveDataItemInternal(dataKey, null, true, [dataField]);
            for (const dataFieldCurrent in item.Data)
                dataItem.Data[dataFieldCurrent] = item.Data[dataFieldCurrent];
        });
    }
    HasChanges(sector, dataKey) {
        const cacheIndex = this.GetCacheKeyIndex(dataKey, sector);
        if (cacheIndex === null)
            return (false);
        const storageItem = this.GetCacheDataItem(cacheIndex);
        if (storageItem === null)
            return (false);
        return (storageItem.HasChanges);
    }
    RetrieveDataItemInternalSystem(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dataKey === '__debugger')
                return (this.RetrieveDataItemInternalSystemDebugger(dataKey));
            if (dataKey === '__sectors')
                return (this.RetrieveDataItemInternalSystemSectors(dataKey));
            if (dataKey === '__datakeysfunction')
                return (this.RetrieveDataItemInternalSystemDataKeysFunction(dataKey));
            if (dataKey === '__breakpoints')
                return (this.RetrieveDataItemInternalSystemBreakpoints(dataKey));
            if (dataKey === '__notifys')
                return (this.RetrieveDataItemInternalSystemNotifys(dataKey));
            if (dataKey === '__pipes')
                return (this.RetrieveDataItemInternalSystemPipes(dataKey));
            if (dataKey === '__errors')
                return (this.RetrieveDataItemInternalSystemErrors(dataKey));
            if (dataKey === '__functions')
                return (this.RetrieveDataItemInternalSystemFunctions(dataKey));
            if (dataKey === '__components')
                return (this.RetrieveDataItemInternalSystemComponents(dataKey));
            if (dataKey === '__requests')
                return (this.RetrieveDataItemInternalSystemRequests(dataKey));
            if (dataKey === '__sectorsupdate')
                return (this.RetrieveDataItemInternalSystemSectorsUpdate(dataKey));
            if (dataKey === '__runtime')
                return (this.RetrieveDataItemInternalSystemRuntime(dataKey));
            if (dataKey === '__objects')
                return (this.RetrieveDataItemInternalSystemObjects(dataKey));
            if (dataKey === '__objectsexpanded')
                return (this.RetrieveDataItemInternalSystemObjectsExpanded(dataKey));
            if (dataKey === '__objectproperties')
                return (this.RetrieveDataItemInternalSystemObjectProperties(dataKey));
            if (dataKey === '__objectdata')
                return (this.RetrieveDataItemInternalSystemObjectData(dataKey));
            if (dataKey === '__objectwatch')
                return (this.RetrieveDataItemInternalSystemObjectWatch(dataKey));
            if (dataKey === '__objectswatchs')
                return (this.RetrieveDataItemInternalSystemObjectsWatchs(dataKey));
            if (dataKey === '__objectswatchsvalues')
                return (this.RetrieveDataItemInternalSystemObjectsWatchsValues(dataKey));
            if (dataKey === '__browser')
                return (this.RetrieveDataItemInternalSystemBrowser(dataKey));
            if (dataKey === '__debuggerProperties')
                return (this.RetrieveDataItemInternalSystemDebuggerProperties(dataKey));
            return (null);
        });
    }
    CreateDataItemInternal(dataKey, data, canCache = true) {
        const item = new DrapoStorageItem(dataKey, data.length != null ? 'array' : 'object', null, null, data, null, null, null, null, null, null, null, null, false, true, false, false, null, false, null, false, '', null, null, null, canCache, null, null, null, null, null, null, null, null, null, null, null);
        return (item);
    }
    RetrieveDataItemInternalSystemDebugger(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {};
            data.sector = '';
            data.datakey = '';
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemSectors(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.Application.Document.GetSectors();
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemDataKeysFunction(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Application.Observer.SubscribeStorage('__debugger', ['sector'], dataKey);
            const sector = yield this.ResolveMustaches('', '{{__debugger.sector}}');
            const data = [];
            data.push('');
            for (let i = 0; i < this._cacheItems.length; i++) {
                const itemCache = this._cacheItems[i];
                if (itemCache == null)
                    continue;
                if (!this.Application.Document.IsEqualSector(itemCache.Sector, sector))
                    continue;
                const itemDataKey = itemCache.DataKey;
                if (this.Application.Document.IsSystemKey(itemDataKey))
                    continue;
                if ((!itemCache.IsTypeFunction) && ((!itemCache.IsTypeValue)))
                    continue;
                data.push(itemDataKey);
            }
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemBreakpoints(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemNotifys(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemPipes(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemErrors(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemFunctions(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemComponents(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.Application.Debugger.GetComponents();
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemRequests(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemSectorsUpdate(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemRuntime(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {};
            data.sector = '';
            data.datakey = '';
            data.label = '';
            data.expression = '';
            data.functionValue = '';
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemObjects(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Application.Observer.SubscribeStorage('__objectsexpanded', [], dataKey, DrapoStorageLinkType.Reload);
            const data = yield this.Application.Debugger.GetObjects();
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemObjectsExpanded(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            data.push('sector_null');
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemObjectProperties(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {};
            data.sector = '';
            data.datakey = '';
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemObjectData(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.Application.Debugger.GetObjectData();
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemObjectWatch(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {};
            data.Sector = '';
            data.Mustache = '';
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemObjectsWatchs(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [];
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemObjectsWatchsValues(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.Application.Debugger.GetWatchsValues();
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    RetrieveDataItemInternalSystemBrowser(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {};
            const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            data.Width = width;
            data.Height = height;
            const item = this.CreateDataItemInternal(dataKey, data);
            item.CanCache = false;
            return (item);
        });
    }
    RetrieveDataItemInternalSystemDebuggerProperties(dataKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {};
            data.left = false;
            data.showobjects = false;
            data.showbreakpoints = false;
            data.shownotifys = false;
            data.showerrors = true;
            data.showpipes = true;
            data.showfunctions = false;
            data.showcomponents = false;
            data.showserver = false;
            data.showsectorsupdate = false;
            data.persist = false;
            const item = this.CreateDataItemInternal(dataKey, data);
            return (item);
        });
    }
    ExecuteQuery(sector, dataKey, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = [];
            const objectsId = [];
            const objectsInformation = [];
            const filters = [];
            const hasFilters = query.Filter !== null;
            yield this.ResolveQueryConditionMustaches(sector, dataKey, query);
            for (let i = 0; i < query.Sources.length; i++) {
                const querySource = query.Sources[i];
                const querySourcePath = querySource.Source;
                const isQuerySourceMustache = this.Application.Parser.IsMustache(querySourcePath);
                let sourceDataKey = querySourcePath;
                let sourceMustache = sourceDataKey;
                if (isQuerySourceMustache) {
                    const mustacheParts = this.Application.Parser.ParseMustache(querySourcePath);
                    const mustacheDataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
                    sourceDataKey = mustacheDataKey;
                }
                else {
                    sourceMustache = this.Application.Solver.CreateMustache([sourceDataKey]);
                }
                this.Application.Observer.SubscribeStorage(sourceDataKey, null, dataKey);
                const querySourceData = yield this.RetrieveDataValue(sector, sourceMustache);
                const querySourceObjects = this.GetQuerySourceObjects(query, querySourceData);
                for (let j = 0; j < querySourceObjects.length; j++) {
                    const querySourceObject = querySourceObjects[j];
                    const objectIndexes = this.EnsureQueryObject(query, querySource, i, objects, objectsId, objectsInformation, querySourceObject);
                    if ((objectIndexes === null) || (objectIndexes.length === 0))
                        continue;
                    for (let k = 0; k < objectIndexes.length; k++) {
                        const objectIndex = objectIndexes[k];
                        const object = objects[objectIndex];
                        const objectInformation = objectsInformation[objectIndex];
                        this.InjectQueryObjectProjections(query, querySource, object, objectInformation, querySourceObject);
                        if (hasFilters) {
                            const isAdd = (i === 0);
                            const filter = isAdd ? query.Filter.Clone() : filters[objectIndex];
                            if (isAdd)
                                filters.push(filter);
                            this.ResolveQueryConditionSource(query, querySource, querySourceObject, filter);
                        }
                    }
                }
            }
            const count = query.Sources.length;
            if ((count > 1) && (query.Sources[1].JoinType == 'INNER')) {
                for (let i = objects.length - 1; i >= 0; i--) {
                    if (objectsId[i].length === count)
                        continue;
                    objects.splice(i, 1);
                    objectsInformation.splice(i, 1);
                    if (hasFilters)
                        filters.splice(i, 1);
                }
            }
            if (hasFilters) {
                for (let i = filters.length - 1; i >= 0; i--) {
                    const filter = filters[i];
                    if (this.IsValidQueryCondition(filter))
                        continue;
                    objects.splice(i, 1);
                    objectsInformation.splice(i, 1);
                }
            }
            const objectsAggregations = this.ResolveQueryAggregations(query, objects, objectsInformation);
            if (objectsAggregations !== null)
                return (objectsAggregations);
            this.ResolveQueryFunctions(query, objects, objectsInformation);
            if (query.OutputArray != null) {
                const outputArray = [];
                for (let i = 0; i < objects.length; i++) {
                    const object = objects[i];
                    outputArray.push(object[query.OutputArray]);
                }
                objects = outputArray;
            }
            if (query.Sorts != null)
                objects = this.ResolveQueryOrderBy(query, objects);
            return (objects);
        });
    }
    GetQuerySourceObjects(query, querySourceData) {
        const querySourceObjects = Array.isArray(querySourceData) ? querySourceData : [querySourceData];
        if (query.Options.List != null)
            return (this.GetQuerySourceObjectsList(query, querySourceObjects));
        return (querySourceObjects);
    }
    GetQuerySourceObjectsList(query, querySourceObjects) {
        const items = [];
        for (let i = 0; i < querySourceObjects.length; i++)
            items.push(querySourceObjects[i]);
        for (let i = 0; i < items.length; i++) {
            const querySourceObject = items[i];
            const querySourceObjectIterator = querySourceObject[query.Options.List];
            if (querySourceObjectIterator == null)
                continue;
            const querySourceObjectIteratorObjects = Array.isArray(querySourceObjectIterator) ? querySourceObjectIterator : [querySourceObjectIterator];
            for (let j = 0; j < querySourceObjectIteratorObjects.length; j++)
                items.push(querySourceObjectIteratorObjects[j]);
        }
        return (items);
    }
    EnsureQueryObject(query, querySource, indexSource, objects, objectsIds, objectsInformation, querySourceObject) {
        let object = null;
        if (query.Sources.length == 1) {
            object = {};
            objects.push(object);
            objectsInformation.push({});
            return ([objects.length - 1]);
        }
        const joinCondition = query.Sources[1].JoinConditions[0];
        const column = joinCondition.SourceLeft == querySource.Alias ? joinCondition.ColumnLeft : joinCondition.ColumnRight;
        const isObject = typeof querySourceObject === 'object';
        const id = isObject ? querySourceObject[column] : querySourceObject;
        if (indexSource === 0) {
            object = {};
            objects.push(object);
            const ids = [];
            ids.push(id);
            objectsIds.push(ids);
            objectsInformation.push({});
            return ([objects.length - 1]);
        }
        const indexes = [];
        for (let i = 0; i < objects.length; i++) {
            const objectsId = objectsIds[i];
            if (objectsId.length > 1)
                continue;
            const objectId = objectsId[0];
            if (objectId != id)
                continue;
            objectsId.push(objectId);
            indexes.push(i);
        }
        if ((indexes.length == 0) && (querySource.JoinType === 'OUTER')) {
            object = {};
            objects.push(object);
            const ids = [];
            ids.push(id);
            objectsIds.push(ids);
            objectsInformation.push({});
            return ([objects.length - 1]);
        }
        return (indexes);
    }
    InjectQueryObjectProjections(query, querySource, object, objectInformation, sourceObject) {
        var _a, _b, _c, _d;
        const isObject = typeof sourceObject === 'object';
        for (let i = 0; i < query.Projections.length; i++) {
            const projection = query.Projections[i];
            if (projection.FunctionName !== null) {
                for (let j = 0; j < projection.FunctionParameters.length; j++) {
                    const functionParameter = projection.FunctionParameters[j];
                    const functionParameterName = this.ResolveQueryFunctionParameterName(functionParameter);
                    if (objectInformation[functionParameterName] != null)
                        continue;
                    const functionParameterValues = this.Application.Parser.ParseQueryProjectionFunctionParameterValue(functionParameterName);
                    const sourceProperty = functionParameterValues[0].split('_');
                    let source;
                    let property;
                    if (sourceProperty.length > 1) {
                        source = sourceProperty[0];
                        property = sourceProperty[1];
                    }
                    else {
                        source = property = sourceProperty[0];
                    }
                    if ((query.Sources.length > 1) && (((_a = querySource.Alias) !== null && _a !== void 0 ? _a : querySource.Source) !== source))
                        continue;
                    const value = isObject ? sourceObject[(_b = projection.Column) !== null && _b !== void 0 ? _b : property] : sourceObject;
                    objectInformation[functionParameterName] = value;
                }
            }
            else {
                const source = projection.Source;
                if (source !== null) {
                    if ((querySource.Alias !== null) && (source !== querySource.Alias))
                        continue;
                    if ((querySource.Alias === null) && (source !== querySource.Source))
                        continue;
                }
                else {
                    if ((isObject) && (!sourceObject[projection.Column]))
                        continue;
                    if ((!isObject) && (((_c = querySource.Alias) !== null && _c !== void 0 ? _c : querySource.Source) !== projection.Column))
                        continue;
                }
                const value = isObject ? sourceObject[projection.Column] : sourceObject;
                object[(_d = projection.Alias) !== null && _d !== void 0 ? _d : projection.Column] = value;
            }
        }
    }
    ResolveQueryConditionSource(query, querySource, sourceObject, filter) {
        const valueLeft = this.ResolveQueryConditionSourceColumn(query, querySource, sourceObject, filter.SourceLeft, filter.ColumnLeft);
        if (valueLeft !== null)
            filter.ValueLeft = valueLeft;
        if (filter.IsNullRight)
            return;
        const valueRight = this.ResolveQueryConditionSourceColumn(query, querySource, sourceObject, filter.SourceRight, filter.ColumnRight);
        if (valueRight !== null)
            filter.ValueRight = valueRight;
    }
    ResolveQueryConditionSourceColumn(query, querySource, sourceObject, source, column) {
        var _a;
        const isObject = typeof sourceObject === 'object';
        if (source !== null) {
            if ((querySource.Alias !== null) && (source !== querySource.Alias))
                return (null);
            if ((querySource.Alias === null) && (source !== querySource.Source))
                return (null);
        }
        else {
            if ((isObject) && (!(column in sourceObject)))
                return (null);
            if ((!isObject) && (((_a = querySource.Alias) !== null && _a !== void 0 ? _a : querySource.Source) !== column))
                return (null);
        }
        const value = isObject ? sourceObject[column] : sourceObject;
        return (value == null ? null : this.Application.Solver.EnsureString(value));
    }
    ResolveQueryFunctionParameterName(value) {
        value = value.replace('.', '_');
        return (value);
    }
    ResolveQueryAggregations(query, objects, objectsInformation) {
        if (query.Projections[0].FunctionName === 'COUNT') {
            const objectAggregation = {};
            objectAggregation[query.Projections[0].Alias] = objects.length;
            return (objectAggregation);
        }
        if (query.Projections[0].FunctionName === 'MAX') {
            const objectAggregation = {};
            objectAggregation[query.Projections[0].Alias] = this.ResolveQueryAggregationsMax(query, query.Projections[0], objects, objectsInformation);
            return (objectAggregation);
        }
        if (query.Projections[0].FunctionName === 'MIN') {
            const objectAggregation = {};
            objectAggregation[query.Projections[0].Alias] = this.ResolveQueryAggregationsMin(query, query.Projections[0], objects, objectsInformation);
            return (objectAggregation);
        }
        return (null);
    }
    ResolveQueryAggregationsMax(query, projection, objects, objectsInformation) {
        let value = null;
        const functionParameter = projection.FunctionParameters[0];
        const functionParameterName = this.ResolveQueryFunctionParameterName(functionParameter);
        for (let i = 0; i < objectsInformation.length; i++) {
            const objectInformation = objectsInformation[i];
            const valueCurrent = objectInformation[functionParameterName];
            if ((value == null) || (value < valueCurrent))
                value = valueCurrent;
        }
        return (value);
    }
    ResolveQueryAggregationsMin(query, projection, objects, objectsInformation) {
        let value = null;
        const functionParameter = projection.FunctionParameters[0];
        const functionParameterName = this.ResolveQueryFunctionParameterName(functionParameter);
        for (let i = 0; i < objectsInformation.length; i++) {
            const objectInformation = objectsInformation[i];
            const valueCurrent = objectInformation[functionParameterName];
            if ((value == null) || (value > valueCurrent))
                value = valueCurrent;
        }
        return (value);
    }
    ResolveQueryFunctions(query, objects, objectsInformation) {
        for (let i = 0; i < query.Projections.length; i++) {
            const projection = query.Projections[i];
            if (projection.FunctionName !== null)
                this.ResolveQueryFunction(projection.Alias, projection.FunctionName, projection.FunctionParameters, objects, objectsInformation);
        }
    }
    ResolveQueryFunction(projectionAlias, functionName, functionParameters, objects, objectsInformation) {
        if (functionName === 'COALESCE')
            this.ResolveQueryFunctionCoalesce(projectionAlias, functionParameters, objects, objectsInformation);
    }
    ResolveQueryFunctionCoalesce(projectionAlias, functionParameters, objects, objectsInformation) {
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];
            const objectInformation = objectsInformation[i];
            for (let j = 0; j < functionParameters.length; j++) {
                const functionParameter = functionParameters[j];
                const functionParameterName = this.ResolveQueryFunctionParameterName(functionParameter);
                if (objectInformation[functionParameterName] == null)
                    continue;
                object[projectionAlias] = objectInformation[functionParameterName];
                break;
            }
        }
    }
    ResolveQueryConditionMustaches(sector, dataKey, query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query.Filter != null)
                yield this.ResolveQueryConditionMustachesFilter(sector, dataKey, query.Filter);
            for (let i = 0; i < query.Sources.length; i++) {
                const source = query.Sources[i];
                if (source.JoinConditions == null)
                    continue;
                for (let j = 0; j < source.JoinConditions.length; j++) {
                    const filter = source.JoinConditions[j];
                    yield this.ResolveQueryConditionMustachesFilter(sector, dataKey, filter);
                }
            }
            if (query.Sorts != null)
                yield this.ResolveQuerySortsMustaches(sector, dataKey, query.Sorts);
        });
    }
    ResolveQueryConditionMustachesFilter(sector, dataKey, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const valueLeft = yield this.ResolveQueryConditionMustachesFilterValue(sector, dataKey, filter.ValueLeft);
            if (valueLeft !== undefined) {
                filter.ColumnLeft = valueLeft;
                filter.ValueLeft = valueLeft;
            }
            const valueRight = yield this.ResolveQueryConditionMustachesFilterValue(sector, dataKey, filter.ValueRight);
            if (valueRight !== undefined) {
                filter.ColumnRight = valueRight;
                filter.ValueRight = valueRight;
            }
        });
    }
    ResolveQueryConditionMustachesFilterValue(sector, dataKey, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Application.Parser.IsMustache(value))
                return (undefined);
            const mustacheParts = this.Application.Parser.ParseMustache(value);
            const mustacheDataKey = this.Application.Solver.ResolveDataKey(mustacheParts);
            this.Application.Observer.SubscribeStorage(mustacheDataKey, null, dataKey);
            const valueResolved = yield this.RetrieveDataValue(sector, value);
            return (valueResolved);
        });
    }
    IsValidQueryCondition(filter) {
        if ((filter.Comparator === '=') && (filter.ValueLeft == filter.ValueRight))
            return (true);
        if ((filter.Comparator === 'IS') && (filter.IsNullRight) && (filter.ValueLeft == null))
            return (true);
        if ((filter.Comparator === 'IS NOT') && (filter.IsNullRight) && (filter.ValueLeft != null))
            return (true);
        if ((filter.Comparator === 'LIKE') && (this.IsValidQueryConditionLike(filter.ValueLeft, filter.ValueRight, filter.IsSearchStartRight, filter.IsSearchEndRight)))
            return (true);
        return (false);
    }
    IsValidQueryConditionLike(valueLeft, valueRight, isSearchStartRight, isSearchEndRight) {
        const valueLeftClean = this.CleanSingleQuote(valueLeft).toLowerCase();
        const valueRightClean = this.CleanSingleQuote(valueRight).toLowerCase();
        if (valueRightClean.length === 0)
            return (false);
        const isRightWildcardStart = (valueRightClean[0] === '%');
        const isRightWildcardEnd = (valueRightClean[valueRightClean.length - 1] === '%');
        const valueRightCleanWithoutWildcard = valueRightClean.substr(isRightWildcardStart ? 1 : 0, valueRightClean.length - (isRightWildcardEnd ? 1 : 0));
        const isEqual = valueLeftClean === valueRightCleanWithoutWildcard;
        if (isEqual)
            return (true);
        const isCheckStart = ((isSearchStartRight) || (isRightWildcardStart));
        const isCheckEnd = ((isSearchEndRight) || (isRightWildcardEnd));
        if ((isCheckStart) && (isCheckEnd) && (valueLeftClean.indexOf(valueRightCleanWithoutWildcard) >= 0))
            return (true);
        if ((isCheckStart) && (valueLeftClean.endsWith(valueRightCleanWithoutWildcard)))
            return (true);
        if ((isCheckEnd) && (valueLeftClean.startsWith(valueRightCleanWithoutWildcard)))
            return (true);
        return (false);
    }
    CleanSingleQuote(value) {
        if (value.length < 2)
            return (value);
        if ((value[0] !== "'") && ((value[value.length - 1] !== "'")))
            return (value);
        return (value.substr(1, value.length - 2));
    }
    ResolveQuerySortsMustaches(sector, dataKey, sorts) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < sorts.length; i++) {
                const sort = sorts[i];
                const column = yield this.ResolveQueryConditionMustachesFilterValue(sector, dataKey, sort.Column);
                if (column !== undefined)
                    sort.Column = column;
                const type = yield this.ResolveQueryConditionMustachesFilterValue(sector, dataKey, sort.Type);
                if (type !== undefined)
                    sort.Type = type;
            }
        });
    }
    ResolveQueryOrderBy(query, objects) {
        if ((query.Sorts == null) || (query.Sorts.length == 0))
            return (objects);
        const sorts = query.Sorts;
        let sorted = true;
        while (sorted) {
            sorted = false;
            for (let i = 0; i < (objects.length - 1); i++) {
                const objectCurrent = objects[i];
                const objectNext = objects[i + 1];
                if (!this.IsSwapQueryOrderBy(sorts, objectCurrent, objectNext))
                    continue;
                sorted = true;
                objects[i] = objectNext;
                objects[i + 1] = objectCurrent;
            }
        }
        return (objects);
    }
    IsSwapQueryOrderBy(sorts, objectCurrent, objectNext) {
        for (let i = 0; i < sorts.length; i++) {
            const sort = sorts[i];
            const value = this.GetSwapQueryOrderBy(sort, objectCurrent, objectNext);
            if (value == 0)
                continue;
            if (value < 0)
                return (true);
            return (false);
        }
        return (false);
    }
    GetSwapQueryOrderBy(sort, objectCurrent, objectNext) {
        const propertyCurrent = objectCurrent[sort.Column];
        const propertyNext = objectNext[sort.Column];
        if (propertyCurrent == propertyNext)
            return (0);
        let value = propertyNext > propertyCurrent ? 1 : -1;
        if (sort.Type == 'DESC')
            value = 0 - value;
        return (value);
    }
}

"use strict";
class DrapoStorageItem {
    get DataKey() {
        return (this._dataKey);
    }
    get Type() {
        return (this._type);
    }
    set Type(value) {
        this._type = value;
    }
    get Access() {
        return (this._access);
    }
    set Access(value) {
        this._access = value;
    }
    get Element() {
        return (this._element);
    }
    set Element(value) {
        this._element = value;
    }
    get Data() {
        return (this._data);
    }
    set Data(value) {
        this._data = value;
        this._isFull = false;
        this._isGrowing = false;
    }
    get DataInserted() {
        return (this._dataInserted);
    }
    set DataInserted(value) {
        this._dataInserted = value;
    }
    get DataUpdated() {
        return (this._dataUpdated);
    }
    set DataUpdated(value) {
        this._dataUpdated = value;
    }
    get DataDeleted() {
        return (this._dataDeleted);
    }
    set DataDeleted(value) {
        this._dataDeleted = value;
    }
    get UrlGet() {
        return (this._urlGet);
    }
    set UrlGet(value) {
        this._urlGet = value;
    }
    get UrlSet() {
        return (this._urlSet);
    }
    set UrlSet(value) {
        this._urlSet = value;
    }
    get UrlSetChunk() {
        return (this._urlSetChunk);
    }
    set UrlSetChunk(value) {
        this._urlSetChunk = value;
    }
    get Chunk() {
        return (this._chunk);
    }
    set Chunk(value) {
        this._chunk = value;
    }
    get UrlParameters() {
        return (this._urlParameters);
    }
    get IsUrlParametersRequired() {
        return (this._urlParameters === 'required');
    }
    get PostGet() {
        return (this._postGet);
    }
    set PostGet(value) {
        this._postGet = value;
    }
    get Start() {
        return (this._start);
    }
    set Start(value) {
        this._start = value;
    }
    get Increment() {
        return (this._increment);
    }
    set Increment(value) {
        this._increment = value;
    }
    get IsIncremental() {
        return (this._isIncremental);
    }
    set IsIncremental(value) {
        this._isIncremental = value;
    }
    get IsFull() {
        return (this._isFull);
    }
    set IsFull(value) {
        this._isFull = value;
    }
    get IsGrowing() {
        return (this._isGrowing);
    }
    set IsGrowing(value) {
        this._isGrowing = value;
    }
    get IsUnitOfWork() {
        return (this._isUnitOfWork);
    }
    set IsUnitOfWork(value) {
        this._isUnitOfWork = value;
    }
    get IsDelay() {
        return (this._isDelay);
    }
    set IsDelay(value) {
        this._isDelay = value;
    }
    get CookieName() {
        return (this._cookieName);
    }
    set CookieName(value) {
        this._cookieName = value;
    }
    get IsCookieChange() {
        return (this._isCookieChange);
    }
    set IsCookieChange(value) {
        this._isCookieChange = value;
    }
    get UserConfig() {
        return (this._userConfig);
    }
    set UserConfig(value) {
        this._userConfig = value;
    }
    get IsTypeValue() {
        return (this._type === 'value');
    }
    get IsTypeObject() {
        return (this._type === 'object');
    }
    get IsTypeParent() {
        return (this._type === 'parent');
    }
    get IsTypeArray() {
        return ((this._type === 'array') || (Array.isArray(this.Data)));
    }
    get IsTypeFunction() {
        return (this._type === 'function');
    }
    get IsAccessPublic() {
        return (this._access === 'public');
    }
    get IsAccessPrivate() {
        return (this._access === 'private');
    }
    get IsToken() {
        return (this._isToken);
    }
    set IsToken(value) {
        this._isToken = value;
    }
    get Sector() {
        return (this._sector);
    }
    set Sector(value) {
        this._sector = value;
    }
    get Pipes() {
        return (this._pipes);
    }
    set Pipes(value) {
        this._pipes = value;
    }
    get Channels() {
        return (this._channels);
    }
    set Channels(value) {
        this._channels = value;
    }
    get CanCache() {
        return (this._canCache);
    }
    set CanCache(value) {
        this._canCache = value;
    }
    get CacheKeys() {
        return (this._cacheKeys);
    }
    set CacheKeys(value) {
        this._cacheKeys = value;
    }
    get OnLoad() {
        return (this._onLoad);
    }
    set OnLoad(value) {
        this._onLoad = value;
    }
    get OnAfterLoad() {
        return (this._onAfterLoad);
    }
    set OnAfterLoad(value) {
        this._onAfterLoad = value;
    }
    get OnAfterContainerLoad() {
        return (this._onAfterContainerLoad);
    }
    set OnAfterContainerLoad(value) {
        this._onAfterContainerLoad = value;
    }
    get OnBeforeContainerUnload() {
        return (this._onBeforeContainerUnload);
    }
    set OnBeforeContainerUnload(value) {
        this._onBeforeContainerUnload = value;
    }
    get OnAfterCached() {
        return (this._onAfterCached);
    }
    set OnAfterCached(value) {
        this._onAfterCached = value;
    }
    get OnNotify() {
        return (this._onNotify);
    }
    set OnNotify(value) {
        this._onNotify = value;
    }
    get HeadersGet() {
        return (this._headersGet);
    }
    set HeadersGet(value) {
        this._headersGet = value;
    }
    get HeadersSet() {
        return (this._headersSet);
    }
    set HeadersSet(value) {
        this._headersSet = value;
    }
    get HasChanges() {
        return (this._hasChanges);
    }
    set HasChanges(value) {
        this._hasChanges = value;
    }
    get PollingKey() {
        return (this._pollingKey);
    }
    set PollingKey(value) {
        this._pollingKey = value;
    }
    get PollingTimespan() {
        return (this._pollingTimespan);
    }
    set PollingTimespan(value) {
        this._pollingTimespan = value;
    }
    get PollingDate() {
        return (this._pollingDate);
    }
    set PollingDate(value) {
        this._pollingDate = value;
    }
    get PollingHash() {
        return (this._pollingHash);
    }
    set PollingHash(value) {
        this._pollingHash = value;
    }
    constructor(dataKey, type, access, element, data, urlGet, urlSet, urlSetChunk, chunk, urlParameters, postGet, start, increment, isIncremental, isFull, isUnitOfWork, isDelay, cookieName, isCookieChange, userConfig, isToken, sector, groups, pipes, channels, canCache, cacheKeys, onLoad, onAfterLoad, onAfterContainerLoad, onBeforeContainerUnload, onAfterCached, onNotify, headersGet, headersSet, pollingKey, pollingTimespan) {
        this._dataKey = null;
        this._type = null;
        this._access = null;
        this._data = [];
        this._dataInserted = [];
        this._dataUpdated = [];
        this._dataDeleted = [];
        this._urlGet = null;
        this._urlSet = null;
        this._urlSetChunk = null;
        this._chunk = null;
        this._urlParameters = null;
        this._postGet = null;
        this._start = null;
        this._increment = null;
        this._isIncremental = false;
        this._isFull = false;
        this._isGrowing = false;
        this._isUnitOfWork = false;
        this._isDelay = false;
        this._cookieName = null;
        this._isCookieChange = false;
        this._userConfig = null;
        this._isToken = false;
        this._sector = null;
        this._groups = null;
        this._pipes = null;
        this._channels = null;
        this._canCache = true;
        this._cacheKeys = null;
        this._onLoad = null;
        this._onAfterLoad = null;
        this._onAfterContainerLoad = null;
        this._onBeforeContainerUnload = null;
        this._onAfterCached = null;
        this._onNotify = null;
        this._headersGet = [];
        this._headersSet = [];
        this._hasChanges = false;
        this._pollingKey = null;
        this._pollingTimespan = null;
        this._pollingDate = null;
        this._pollingHash = null;
        this._dataKey = dataKey;
        this._type = type;
        this._access = access;
        this._element = element;
        this._data = data;
        this._urlGet = urlGet;
        this._urlSet = urlSet;
        this._urlSetChunk = urlSetChunk;
        this._chunk = chunk;
        this._urlParameters = urlParameters;
        this._postGet = postGet;
        this._start = start;
        this._increment = increment;
        this._isIncremental = isIncremental;
        this._isFull = isFull;
        this._isUnitOfWork = isUnitOfWork;
        this._isDelay = isDelay;
        this._cookieName = cookieName;
        this._isCookieChange = isCookieChange;
        this._userConfig = userConfig;
        this._isToken = isToken;
        this._sector = sector;
        this._groups = groups;
        this._pipes = pipes;
        this._channels = channels;
        this._canCache = canCache;
        this._cacheKeys = cacheKeys;
        this._onLoad = onLoad;
        this._onAfterLoad = onAfterLoad == null ? null : onAfterLoad;
        this._onAfterContainerLoad = onAfterContainerLoad == null ? null : onAfterContainerLoad;
        this._onBeforeContainerUnload = onBeforeContainerUnload == null ? null : onBeforeContainerUnload;
        this._onAfterCached = onAfterCached == null ? null : onAfterCached;
        this._onNotify = onNotify == null ? null : onNotify;
        this._headersGet = headersGet;
        this._headersSet = headersSet;
        this._pollingKey = pollingKey;
        this._pollingTimespan = pollingTimespan;
        this.Initialize();
    }
    Initialize() {
        if (this._access == null)
            this._access = this.IsTypeParent ? 'private' : 'public';
        this.CheckpointPolling();
    }
    CheckpointPolling() {
        if (this._pollingTimespan === null)
            return;
        const currentDate = new Date();
        currentDate.setMilliseconds(currentDate.getMilliseconds() + this._pollingTimespan);
        this._pollingDate = currentDate;
    }
    ContainsGroup(group) {
        if (this._groups == null)
            return (false);
        for (let i = 0; i < this._groups.length; i++)
            if (this._groups[i] === group)
                return (true);
        return (false);
    }
}

"use strict";
var DrapoStorageLinkType;
(function (DrapoStorageLinkType) {
    DrapoStorageLinkType[DrapoStorageLinkType["Render"] = 0] = "Render";
    DrapoStorageLinkType[DrapoStorageLinkType["RenderClass"] = 1] = "RenderClass";
    DrapoStorageLinkType[DrapoStorageLinkType["Reload"] = 2] = "Reload";
    DrapoStorageLinkType[DrapoStorageLinkType["Pointer"] = 3] = "Pointer";
})(DrapoStorageLinkType || (DrapoStorageLinkType = {}));

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoStylist {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._application = application;
    }
    Create(values, name = null) {
        const styleName = ((name === null) || (name === '')) ? this.CreateStyleName() : name;
        const elStyle = document.createElement('style');
        elStyle.id = styleName;
        elStyle.type = 'text/css';
        const style = this.StringfyValues(values);
        elStyle.innerHTML = '.' + styleName + ' \n{\n ' + style + ' }';
        document.head.appendChild(elStyle);
        return (styleName);
    }
    CreateStyleName() {
        return ('s-' + this.Application.Document.CreateGuid());
    }
    StringfyValues(values) {
        let valueText = '';
        for (let i = 0; i < values.length; i++) {
            const entry = values[i];
            const valueEntry = entry[0] + ':' + entry[1] + ';\n';
            valueText += valueEntry;
        }
        return (valueText);
    }
    ReloadStyles() {
        return __awaiter(this, void 0, void 0, function* () {
            const reloaded = [];
            const length = document.head.childNodes.length;
            for (let i = 0; i < length; i++) {
                const childNode = document.head.childNodes[i];
                if (childNode.nodeName.toLowerCase() !== 'link')
                    continue;
                const link = childNode;
                const url = link.href;
                if (reloaded.indexOf(url) >= 0)
                    continue;
                reloaded.push(url);
                document.head.removeChild(childNode);
                yield this.AddStyleToDocument(url);
                if (i === length - 1)
                    break;
                i--;
            }
        });
    }
    AddStyleToDocument(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = document.createElement('link');
            link.href = url;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        });
    }
    GetElementStyleProperty(el, name) {
        const elStyle = window.getComputedStyle(el);
        const value = elStyle.getPropertyValue(name);
        return (value);
    }
    SetElementStyleProperty(el, name, value) {
        el.style.setProperty(name, value);
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoValidator {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._sectors = [];
        this._sectorsValidationRuleIDs = [];
        this._sectorsValidationRuleTypes = [];
        this._sectorsValidationRuleValues = [];
        this._sectorsValidationRuleTags = [];
        this._sectorsValidationRuleContexts = [];
        this._sectorsValidationGroupGroups = [];
        this._sectorsValidationGroupRules = [];
        this._sectorsValidationGroupContexts = [];
        this._sectorsValidationInterfaceIDs = [];
        this._sectorsValidationInterfaceElements = [];
        this._sectorsValidationInterfaceContexts = [];
        this._application = application;
    }
    HasContentValidation(content) {
        return (content.indexOf('d-validation') > -1);
    }
    UnloadSectorHierarchy(sector) {
        const sectorChildren = this.Application.Document.GetSectorAndChildren(sector);
        for (let i = 0; i < sectorChildren.length; i++)
            this.UnloadSector(sectorChildren[i]);
    }
    UnloadSector(sector) {
        const index = this.GetSectorIndex(sector);
        if (index === null)
            return;
        this._sectors.splice(index, 1);
        this._sectorsValidationRuleIDs.splice(index, 1);
        this._sectorsValidationRuleTypes.splice(index, 1);
        this._sectorsValidationRuleValues.splice(index, 1);
        this._sectorsValidationRuleTags.splice(index, 1);
        this._sectorsValidationRuleContexts.splice(index, 1);
        this._sectorsValidationGroupGroups.splice(index, 1);
        this._sectorsValidationGroupRules.splice(index, 1);
        this._sectorsValidationGroupContexts.splice(index, 1);
        this._sectorsValidationInterfaceIDs.splice(index, 1);
        this._sectorsValidationInterfaceElements.splice(index, 1);
        this._sectorsValidationInterfaceContexts.splice(index, 1);
    }
    RegisterValidation(el, sector, context = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const validations = this.ExtractValidations(el);
            if (validations.length === 0)
                return;
            if ((context == null) && (this.Application.Document.IsElementInsideControlFlowOrContext(el)))
                return;
            const contextItem = context != null ? context.Item : null;
            const validationID = this.Application.Solver.Get(validations, 'id');
            const validationIDResolved = yield this.ResolveValidationID(sector, validationID, contextItem);
            if (validationIDResolved != null) {
                const validationType = this.Application.Solver.Get(validations, 'type');
                const validationValue = this.Application.Solver.Get(validations, 'value');
                const validationGroup = this.Application.Solver.Get(validations, 'group');
                const validationGroups = this.Application.Parser.ParseValidationGroups(validationGroup);
                const validationTag = this.GetValidationTag(validations, validationType);
                this.AddValidationRule(sector, validationIDResolved, validationType, validationValue, validationTag, contextItem);
                this.AddValidationGroups(sector, validationIDResolved, validationGroups, contextItem);
            }
            const validation = this.Application.Solver.Get(validations, '');
            const validationResolved = yield this.ResolveValidationID(sector, validation, contextItem);
            if (validationResolved != null) {
                this.AddValidationInterface(sector, validationResolved, el, contextItem);
                const validatorUncheckedClass = yield this.Application.Config.GetValidatorUncheckedClass();
                if (validatorUncheckedClass != null) {
                    el.classList.add(validatorUncheckedClass);
                }
            }
        });
    }
    ResolveValidationID(sector, validationID, contextItem) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Application.Parser.HasMustache(validationID))
                return (validationID);
            if (contextItem == null)
                return (yield this.Application.Storage.ResolveMustachesRecursive(sector, validationID));
            const validationIDContext = yield this.Application.Barber.ResolveControlFlowMustacheString(contextItem.Context, null, null, validationID, null, sector, false);
            return (validationIDContext);
        });
    }
    GetValidationTag(validations, validationType) {
        if (validationType === 'regex')
            return (this.Application.Solver.Get(validations, 'expression'));
        if (validationType === 'compare')
            return (this.Application.Solver.Get(validations, 'valuetocompare'));
        if (validationType === 'outside')
            return (this.Application.Solver.Get(validations, 'sector'));
        return (null);
    }
    IsValidationEventValid(el, sector, eventType, location, event, contextItem) {
        return __awaiter(this, void 0, void 0, function* () {
            if (el.getAttribute == null)
                return (true);
            const attribute = location == null ? 'd-validation-on-' + eventType : 'd-validation-on-' + location + '-' + eventType;
            const validation = el.getAttribute(attribute);
            if (validation == null)
                return (true);
            const isValid = yield this.IsValidationExpressionValid(el, sector, validation, contextItem, event);
            return (isValid);
        });
    }
    IsValidationExpressionValid(el, sector, validation, contextItem, event = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const uncheckedClass = yield this.Application.Config.GetValidatorUncheckedClass();
            const validClass = yield this.Application.Config.GetValidatorValidClass();
            const invalidClass = yield this.Application.Config.GetValidatorInvalidClass();
            const validations = yield this.ResolveValidations(sector, validation, contextItem);
            let isValid = true;
            for (let i = 0; i < validations.length; i++)
                if (!(yield this.IsValidationValid(sector, validations[i], el, event, isValid, uncheckedClass, validClass, invalidClass)))
                    isValid = false;
            return (isValid);
        });
    }
    UncheckValidationExpression(el, sector, validation, contextItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const uncheckedClass = yield this.Application.Config.GetValidatorUncheckedClass();
            const validClass = yield this.Application.Config.GetValidatorValidClass();
            const invalidClass = yield this.Application.Config.GetValidatorInvalidClass();
            const validations = yield this.ResolveValidations(sector, validation, contextItem);
            for (let i = 0; i < validations.length; i++)
                this.UncheckValidation(sector, validations[i], uncheckedClass, validClass, invalidClass);
        });
    }
    GetSectorIndex(sector) {
        for (let i = 0; i < this._sectors.length; i++)
            if (this._sectors[i] === sector)
                return (i);
        return (null);
    }
    GetIndex(list, value) {
        for (let i = 0; i < list.length; i++)
            if (list[i] === value)
                return (i);
        return (null);
    }
    GetElement(elements, element) {
        for (let i = 0; i < elements.length; i++)
            if (elements[i] === element)
                return (i);
        return (null);
    }
    EnsureSector(sector) {
        const index = this.GetSectorIndex(sector);
        if (index !== null)
            return (index);
        this._sectors.push(sector);
        this._sectorsValidationRuleIDs.push([]);
        this._sectorsValidationRuleTypes.push([]);
        this._sectorsValidationRuleValues.push([]);
        this._sectorsValidationRuleTags.push([]);
        this._sectorsValidationRuleContexts.push([]);
        this._sectorsValidationGroupGroups.push([]);
        this._sectorsValidationGroupRules.push([]);
        this._sectorsValidationGroupContexts.push([]);
        this._sectorsValidationInterfaceIDs.push([]);
        this._sectorsValidationInterfaceElements.push([]);
        this._sectorsValidationInterfaceContexts.push([]);
        return (this._sectors.length - 1);
    }
    AddValidationRule(sector, validationID, validationType, validationValue, validationTag, contextItem) {
        const index = this.EnsureSector(sector);
        const ruleIDs = this._sectorsValidationRuleIDs[index];
        const ruleIDIndex = this.GetIndex(ruleIDs, validationID);
        if (ruleIDIndex !== null)
            return;
        const ruleTypes = this._sectorsValidationRuleTypes[index];
        const ruleValues = this._sectorsValidationRuleValues[index];
        const ruleTags = this._sectorsValidationRuleTags[index];
        const ruleContexts = this._sectorsValidationRuleContexts[index];
        ruleIDs.push(validationID);
        ruleTypes.push(validationType);
        ruleValues.push(validationValue);
        ruleTags.push(validationTag);
        ruleContexts.push(contextItem);
    }
    AddValidationGroups(sector, validationID, validationGroups, contextItem) {
        for (let i = 0; i < validationGroups.length; i++)
            this.AddValidationGroup(sector, validationID, validationGroups[i], contextItem);
    }
    AddValidationGroup(sector, validationID, validationGroup, contextItem) {
        const index = this.EnsureSector(sector);
        const groups = this._sectorsValidationGroupGroups[index];
        const groupsRules = this._sectorsValidationGroupRules[index];
        const groupsContext = this._sectorsValidationGroupContexts[index];
        const groupIndex = this.GetIndex(groups, validationGroup);
        if (groupIndex === null) {
            groups.push(validationGroup);
            groupsRules.push([validationID]);
            groupsContext.push([contextItem]);
        }
        else {
            const groupRules = groupsRules[groupIndex];
            const groupContext = groupsContext[groupIndex];
            const ruleIndex = this.GetIndex(groupRules, validationID);
            if (ruleIndex === null) {
                groupRules.push(validationID);
                groupContext.push(contextItem);
            }
        }
    }
    AddValidationInterface(sector, validationID, el, contextItem) {
        const index = this.EnsureSector(sector);
        const interfacesIDs = this._sectorsValidationInterfaceIDs[index];
        const interfacesElements = this._sectorsValidationInterfaceElements[index];
        const interfacesContexts = this._sectorsValidationInterfaceContexts[index];
        const idIndex = this.GetIndex(interfacesIDs, validationID);
        if (idIndex === null) {
            interfacesIDs.push(validationID);
            interfacesElements.push([el]);
            interfacesContexts.push([contextItem]);
        }
        else {
            const interfaceElements = interfacesElements[idIndex];
            const interfaceContexts = interfacesContexts[idIndex];
            const elementIndex = this.GetElement(interfaceElements, el);
            if (elementIndex === null) {
                interfaceElements.push(el);
                interfaceContexts.push(contextItem);
            }
        }
    }
    ExtractValidations(el) {
        const attributes = [];
        for (let i = 0; i < el.attributes.length; i++) {
            const attribute = el.attributes[i];
            const attributeProperty = this.ExtractValidationProperty(attribute.nodeName);
            if (attributeProperty != null)
                attributes.push([attributeProperty, attribute.nodeValue]);
        }
        return (attributes);
    }
    ExtractValidationProperty(property) {
        const parse = this.Application.Parser.ParseProperty(property);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'validation')
            return (null);
        if (parse.length === 2)
            return ('');
        return (parse[2]);
    }
    ResolveValidations(sector, validation, contextItem) {
        return __awaiter(this, void 0, void 0, function* () {
            let validationResolved = null;
            if (this.Application.Parser.IsMustacheOnly(validation)) {
                validationResolved = yield this.Application.Barber.ResolveControlFlowMustacheString(contextItem == null ? null : contextItem.Context, null, null, validation, null, sector, false);
            }
            else {
                validationResolved = validation;
            }
            const validations = [];
            if (this.Application.Parser.IsValidatorArray(validationResolved)) {
                const validatorsArray = this.ExtractValidators(validationResolved);
                for (let i = 0; i < validatorsArray.length; i++) {
                    const validator = validatorsArray[i];
                    const validatorConditional = validator[1];
                    if ((validatorConditional != null) && (!(yield this.IsValidConditional(sector, validatorConditional, contextItem))))
                        continue;
                    validations.push(validator[0]);
                }
            }
            else {
                validations.push(validationResolved);
            }
            return (validations);
        });
    }
    ExtractValidators(validation) {
        const validators = [];
        const parsedValidators = this.Application.Parser.ParseValidatorsArray(validation);
        for (let i = 0; i < parsedValidators.length; i++) {
            const parsedValidator = parsedValidators[i];
            const parseValidator = this.Application.Parser.ParseValidator(parsedValidator);
            if (parseValidator != null)
                validators.push(parseValidator);
        }
        return (validators);
    }
    IsValidationValid(sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.IsValidationGroup(sector, validation))
                return (yield this.IsValidationGroupValid(sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass));
            return (yield this.IsValidationRuleValid(sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass));
        });
    }
    IsValidationGroup(sector, validation) {
        const index = this.GetSectorIndex(sector);
        if (index === null)
            return (false);
        const groups = this._sectorsValidationGroupGroups[index];
        const groupIndex = this.GetIndex(groups, validation);
        return (groupIndex !== null);
    }
    IsValidationGroupValid(sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass) {
        return __awaiter(this, void 0, void 0, function* () {
            const rules = this.GetValidationGroupRules(sector, validation);
            let isValid = true;
            for (let i = 0; i < rules.length; i++)
                if (!(yield this.IsValidationRuleValid(sector, rules[i], el, event, (canFocus && isValid), uncheckedClass, validClass, invalidClass)))
                    isValid = false;
            return (isValid);
        });
    }
    GetValidationGroupRules(sector, validation) {
        const index = this.GetSectorIndex(sector);
        if (index === null)
            return ([]);
        const groups = this._sectorsValidationGroupGroups[index];
        const groupIndex = this.GetIndex(groups, validation);
        if (groupIndex === null)
            return ([]);
        const groupsRules = this._sectorsValidationGroupRules[index];
        const rules = groupsRules[groupIndex];
        return (rules);
    }
    IsValidationRuleValid(sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValid = yield this.IsRuleValid(sector, validation, canFocus, el, event);
            const addClass = isValid ? validClass : invalidClass;
            const removeClass = (!isValid) ? validClass : invalidClass;
            const elements = this.GetValidationRuleElements(sector, validation);
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                if (uncheckedClass != null)
                    element.classList.remove(uncheckedClass);
                element.classList.remove(removeClass);
                element.classList.add(addClass);
            }
            return (isValid);
        });
    }
    GetValidationRuleElements(sector, validation) {
        const index = this.GetSectorIndex(sector);
        if (index === null)
            return ([]);
        const interfacesIDs = this._sectorsValidationInterfaceIDs[index];
        const interfacesElements = this._sectorsValidationInterfaceElements[index];
        const idIndex = this.GetIndex(interfacesIDs, validation);
        if (idIndex === null)
            return ([]);
        const interfaceElements = interfacesElements[idIndex];
        return (interfaceElements);
    }
    IsRuleValid(sector, validation, canFocus, el, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.GetSectorIndex(sector);
            if (index === null)
                return (true);
            const ruleIDs = this._sectorsValidationRuleIDs[index];
            const ruleIDIndex = this.GetIndex(ruleIDs, validation);
            if (ruleIDIndex === null)
                return (true);
            const ruleTypes = this._sectorsValidationRuleTypes[index];
            const type = ruleTypes[ruleIDIndex];
            const ruleValues = this._sectorsValidationRuleValues[index];
            const value = ruleValues[ruleIDIndex];
            const ruleTags = this._sectorsValidationRuleTags[index];
            const tag = ruleTags[ruleIDIndex];
            const ruleContexts = this._sectorsValidationRuleContexts[index];
            const itemContext = ruleContexts[ruleIDIndex];
            const isValid = yield this.IsValid(sector, type, value, tag, itemContext, el, event);
            if ((!isValid) && (canFocus)) {
                const element = this.Application.Observer.GetElementByModel(sector, value);
                if (element != null)
                    element.focus();
            }
            return (isValid);
        });
    }
    IsValid(sector, type, value, tag, itemContext, el, event) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((type == null) || (type == 'conditional'))
                return (yield this.IsValidConditional(sector, value, itemContext));
            else if (type === 'regex')
                return (yield this.IsValidRegex(sector, value, tag, itemContext));
            else if (type === 'compare')
                return (yield this.IsValidCompare(sector, value, tag, itemContext));
            else if (type === 'outside')
                return (yield this.IsValidOutside(el, event, tag));
            yield this.Application.ExceptionHandler.HandleError('Drapo: There is no validation rule of type: {0}', type);
            return (false);
        });
    }
    IsValidConditional(sector, value, itemContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = this.CreateContext(itemContext);
            const valueResult = yield this.Application.Solver.ResolveConditional(value, null, sector, context);
            return (valueResult);
        });
    }
    IsValidRegex(sector, value, expression, itemContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = this.CreateContext(itemContext);
            const expressionsResolved = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, expression, null, false);
            const valueResolved = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, value, null, false);
            const regex = new RegExp(expressionsResolved);
            return (regex.test(valueResolved));
        });
    }
    IsValidCompare(sector, value, valueToCompare, itemContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = this.CreateContext(itemContext);
            const valueResolved = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, value, null, false);
            const valueToCompareResolved = yield this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, valueToCompare, null, false);
            return (valueResolved == valueToCompareResolved);
        });
    }
    CreateContext(itemContext) {
        const context = new DrapoContext(itemContext);
        return (context);
    }
    IsValidOutside(el, event, validSectors) {
        return __awaiter(this, void 0, void 0, function* () {
            let target = event.target;
            if (validSectors != null) {
                let sectorsAllowed = [];
                const sectorTarget = this.Application.Document.GetSector(target);
                const sectors = this.Application.Parser.ParseTags(validSectors);
                for (let i = 0; i < sectors.length; i++)
                    sectorsAllowed = this.Application.Solver.Join(sectorsAllowed, this.Application.Document.GetSectorAndChildren(sectors[i]));
                if (!this.Application.Solver.Contains(sectorsAllowed, sectorTarget))
                    return (false);
            }
            while (target != null) {
                if (el === target)
                    return (false);
                if (target.parentElement)
                    target = target.parentElement;
                else
                    target = null;
            }
            return (true);
        });
    }
    UncheckValidation(sector, validation, uncheckedClass, validClass, invalidClass) {
        if (this.IsValidationGroup(sector, validation))
            this.UncheckValidationGroup(sector, validation, uncheckedClass, validClass, invalidClass);
        else
            this.UncheckValidationRule(sector, validation, uncheckedClass, validClass, invalidClass);
    }
    UncheckValidationGroup(sector, validation, uncheckedClass, validClass, invalidClass) {
        const rules = this.GetValidationGroupRules(sector, validation);
        for (let i = 0; i < rules.length; i++)
            this.UncheckValidationRule(sector, rules[i], uncheckedClass, validClass, invalidClass);
    }
    UncheckValidationRule(sector, validation, uncheckedClass, validClass, invalidClass) {
        const elements = this.GetValidationRuleElements(sector, validation);
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.classList.remove(validClass);
            element.classList.remove(invalidClass);
            if (uncheckedClass != null)
                element.classList.add(uncheckedClass);
        }
    }
    IsValidatorInterface(el) {
        const attributeValidation = el.getAttribute('d-validation');
        return ((attributeValidation != null) && (attributeValidation != ''));
    }
}

"use strict";
class DrapoView {
    constructor() {
        this._name = null;
        this._tag = null;
        this._condition = null;
    }
    get Name() {
        return (this._name);
    }
    set Name(value) {
        this._name = value;
    }
    get Tag() {
        return (this._tag);
    }
    set Tag(value) {
        this._tag = value;
    }
    get Condition() {
        return (this._condition);
    }
    set Condition(value) {
        this._condition = value;
    }
}

"use strict";
class DrapoViewport {
    constructor() {
        this._busy = false;
        this._sector = null;
        this._dataKey = null;
        this._key = null;
        this._dataKeyIteratorRange = null;
        this._data = null;
        this._el = null;
        this._elScroll = null;
        this._elTemplate = null;
        this._elBallonBefore = null;
        this._elBallonAfter = null;
        this._heightScroll = null;
        this._heightScrollScroll = null;
        this._heightBefore = null;
        this._heightAfter = null;
        this._heightItem = null;
        this._heightBallonBefore = null;
        this._heightBallonAfter = null;
        this._dataStart = null;
        this._dataEnd = null;
        this._dataLength = null;
        this._factor = 4;
        this._eventScrollTimeout = null;
        this._scrollTop = null;
        this._isActive = false;
    }
    get Busy() {
        return (this._busy);
    }
    set Busy(value) {
        this._busy = value;
    }
    get Sector() {
        return (this._sector);
    }
    set Sector(value) {
        this._sector = value;
    }
    get DataKey() {
        return (this._dataKey);
    }
    set DataKey(value) {
        this._dataKey = value;
    }
    get Key() {
        return (this._key);
    }
    set Key(value) {
        this._key = value;
    }
    get DataKeyIteratorRange() {
        return (this._dataKeyIteratorRange);
    }
    set DataKeyIteratorRange(value) {
        this._dataKeyIteratorRange = value;
    }
    get Data() {
        return (this._data);
    }
    set Data(value) {
        this._data = value;
    }
    get Element() {
        return (this._el);
    }
    set Element(value) {
        this._el = value;
    }
    get ElementTemplate() {
        return (this._elTemplate);
    }
    set ElementTemplate(value) {
        this._elTemplate = value;
    }
    get ElementBallonBefore() {
        return (this._elBallonBefore);
    }
    set ElementBallonBefore(value) {
        this._elBallonBefore = value;
    }
    get ElementBallonAfter() {
        return (this._elBallonAfter);
    }
    set ElementBallonAfter(value) {
        this._elBallonAfter = value;
    }
    get ElementScroll() {
        return (this._elScroll);
    }
    set ElementScroll(value) {
        this._elScroll = value;
    }
    get HeightScroll() {
        return (this._heightScroll);
    }
    set HeightScroll(value) {
        this._heightScroll = value;
    }
    get HeightScrollScroll() {
        return (this._heightScrollScroll);
    }
    set HeightScrollScroll(value) {
        this._heightScrollScroll = value;
    }
    get HeightBefore() {
        return (this._heightBefore);
    }
    set HeightBefore(value) {
        this._heightBefore = value;
    }
    get HeightAfter() {
        return (this._heightAfter);
    }
    set HeightAfter(value) {
        this._heightAfter = value;
    }
    get HeightItem() {
        return (this._heightItem);
    }
    set HeightItem(value) {
        this._heightItem = value;
    }
    get HeightBallonBefore() {
        return (this._heightBallonBefore);
    }
    set HeightBallonBefore(value) {
        this._heightBallonBefore = value;
    }
    get HeightBallonAfter() {
        return (this._heightBallonAfter);
    }
    set HeightBallonAfter(value) {
        this._heightBallonAfter = value;
    }
    get DataStart() {
        return (this._dataStart);
    }
    set DataStart(value) {
        this._dataStart = value;
    }
    get DataEnd() {
        return (this._dataEnd);
    }
    set DataEnd(value) {
        this._dataEnd = value;
    }
    get DataLength() {
        return (this._dataLength);
    }
    set DataLength(value) {
        this._dataLength = value;
    }
    get Factor() {
        return (this._factor);
    }
    set Factor(value) {
        this._factor = value;
    }
    get EventScrollTimeout() {
        return (this._eventScrollTimeout);
    }
    set EventScrollTimeout(value) {
        this._eventScrollTimeout = value;
    }
    get ScrollTop() {
        return (this._scrollTop);
    }
    set ScrollTop(value) {
        this._scrollTop = value;
    }
    get IsActive() {
        return (this._isActive);
    }
    set IsActive(value) {
        this._isActive = value;
    }
}

"use strict";
class DrapoViewportHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._viewportPropertyName = 'viewport';
        this.MAX_SIZE = 10000;
        this._application = application;
    }
    CreateViewportControlFlow(sector, el, elTemplate, dataKey, key, dataKeyIteratorRange, data) {
        const scroll = this.GetScrollViewport(el);
        if (scroll == null)
            return (null);
        const viewportBefore = this.GetElementViewport(el);
        if (viewportBefore != null) {
            viewportBefore.IsActive = true;
            return (viewportBefore);
        }
        const elScroll = scroll[0];
        const height = this.GetElementHeight(elScroll);
        if (height == null)
            return (null);
        const viewport = new DrapoViewport();
        viewport.Sector = sector;
        viewport.Element = el;
        viewport.ElementTemplate = elTemplate;
        viewport.ElementScroll = elScroll;
        viewport.DataKey = dataKey;
        viewport.Key = key;
        viewport.DataKeyIteratorRange = dataKeyIteratorRange;
        viewport.Data = data;
        viewport.HeightScroll = height;
        viewport.HeightBefore = scroll[1];
        viewport.HeightAfter = scroll[2];
        viewport.HeightBallonBefore = 0;
        viewport.HeightBallonAfter = 0;
        viewport.DataStart = 0;
        viewport.DataEnd = data.length;
        viewport.DataLength = data.length;
        if ((elScroll.scrollTop) && elScroll.scrollTop > 0) {
            this.Application.Binder.UnbindControlFlowViewport(viewport);
            viewport.ScrollTop = viewport.ElementScroll.scrollTop;
            viewport.HeightItem = this.GetElementItemHeight(el);
            if (viewport.HeightItem != null) {
                const view = this.GetViewFactorCurrent(viewport);
                viewport.DataStart = view[0];
                viewport.DataEnd = view[1];
            }
        }
        return (viewport);
    }
    GetElementViewport(el) {
        const elAny = el;
        const viewportBefore = elAny[this._viewportPropertyName];
        if (viewportBefore != null) {
            return (viewportBefore);
        }
        return (null);
    }
    HasElementViewport(el) {
        return (this.GetElementViewport(el) != null);
    }
    CreateViewportControlFlowBallonBefore(viewport, lastInserted) {
        if (viewport === null)
            return (lastInserted);
        const elBallonBeforeInDOM = this.GetBallonBefore(lastInserted);
        if (elBallonBeforeInDOM == null) {
            const elBallonBefore = document.createElement('div');
            elBallonBefore.setAttribute('d-ballon', 'before');
            elBallonBefore.style.width = '100%';
            this.FillBallon(elBallonBefore, viewport.HeightBallonBefore);
            viewport.ElementBallonBefore = elBallonBefore;
            lastInserted.after(elBallonBefore);
            return (elBallonBefore);
        }
        else {
            if (viewport.IsActive)
                return (elBallonBeforeInDOM);
            this.FillBallon(elBallonBeforeInDOM, viewport.HeightBallonBefore);
            viewport.ElementBallonBefore = elBallonBeforeInDOM;
            const elParent = elBallonBeforeInDOM.parentElement;
            while (elParent.children.length > 2)
                elParent.lastElementChild.remove();
            return (elBallonBeforeInDOM);
        }
    }
    FillBallon(elBallon, height, isFull = true) {
        if (isFull) {
            elBallon.style.height = height + 'px';
        }
        else {
            while (elBallon.childNodes.length > 0)
                elBallon.childNodes[0].remove();
            if (height < this.MAX_SIZE) {
                elBallon.style.height = height + 'px';
            }
            else {
                elBallon.style.height = 'auto';
                while (height > 0) {
                    const elBallonItem = document.createElement('div');
                    elBallonItem.style.width = '100%';
                    elBallonItem.style.height = (height > this.MAX_SIZE ? this.MAX_SIZE : height) + 'px';
                    elBallon.appendChild(elBallonItem);
                    height = height - this.MAX_SIZE;
                    if (height <= 0)
                        height = 0;
                }
            }
        }
    }
    GetBallonBefore(elTemplate) {
        const elTemplateNext = elTemplate.nextElementSibling;
        if (elTemplateNext == null)
            return (null);
        const isBallonBefore = elTemplateNext.getAttribute('d-ballon') === 'before';
        if (!isBallonBefore)
            return (null);
        return (elTemplateNext);
    }
    GetElementItemHeight(elTemplate) {
        const elParent = elTemplate.parentElement;
        if (elParent == null)
            return (null);
        if (elParent.children.length < 4)
            return (null);
        const elBallonBefore = elTemplate.nextElementSibling;
        const elItem = elBallonBefore.nextElementSibling;
        const height = this.GetElementHeight(elItem);
        return (height);
    }
    AppendViewportControlFlowBallonAfter(viewport, fragment) {
        if ((viewport === null) || (viewport.IsActive))
            return;
        const elBallonAfter = document.createElement('div');
        elBallonAfter.style.width = '100%';
        this.FillBallon(elBallonAfter, viewport.HeightBallonAfter);
        viewport.ElementBallonAfter = elBallonAfter;
        fragment.appendChild(elBallonAfter);
    }
    ActivateViewportControlFlow(viewport, elItem) {
        if ((viewport === null) || (viewport.IsActive))
            return;
        if (viewport.ScrollTop != null) {
            this.UpdateValuesBallon(viewport);
            this.UpdateElementsBallon(viewport);
            viewport.ElementScroll.scrollTop = viewport.ScrollTop;
        }
        this.UpdateHeightItem(viewport, elItem, false);
        const viewportElementAny = viewport.Element;
        viewportElementAny[this._viewportPropertyName] = viewport;
        this.Application.Binder.BindControlFlowViewport(viewport);
    }
    DestroyViewportControlFlow(viewport) {
        this.Application.Binder.UnbindControlFlowViewport(viewport);
        const viewportElementAny = viewport.Element;
        viewportElementAny[this._viewportPropertyName] = null;
    }
    GetViewportControlFlowStart(viewport, start) {
        if (viewport === null)
            return (start);
        return (viewport.DataStart);
    }
    GetViewportControlFlowEnd(viewport, length) {
        if (viewport === null)
            return (length);
        return (viewport.DataEnd);
    }
    UpdateHeightItem(viewport, elItem, updateValues = true) {
        if (viewport === null)
            return (false);
        if (viewport.HeightItem !== null)
            return (false);
        if (elItem === null)
            return (false);
        const height = this.GetElementHeight(elItem);
        if (height === null)
            return (false);
        viewport.HeightItem = height;
        if (updateValues)
            this.UpdateValues(viewport);
        return (true);
    }
    HasHeightChanged(viewport) {
        if (viewport == null)
            return (false);
        const height = this.GetElementHeight(viewport.ElementScroll);
        if (height < 100) {
            const scrollHeight = viewport.ElementScroll.scrollHeight;
            if (viewport.HeightScrollScroll == scrollHeight)
                return (false);
            viewport.HeightScrollScroll = scrollHeight;
            return (true);
        }
        if (viewport.HeightScroll == height)
            return (false);
        viewport.HeightScroll = height;
        return (true);
    }
    UpdateValues(viewport) {
        const heightData = viewport.HeightScroll;
        if (heightData < 0)
            return;
        const heightDataFactor = heightData * viewport.Factor;
        const dataItems = Math.floor(heightDataFactor / viewport.HeightItem);
        viewport.DataEnd = dataItems < viewport.DataEnd ? dataItems : viewport.DataEnd;
        this.UpdateValuesBallon(viewport);
    }
    UpdateValuesBallon(viewport) {
        viewport.HeightBallonBefore = viewport.DataStart * viewport.HeightItem;
        viewport.HeightBallonAfter = (viewport.DataLength - viewport.DataEnd) * viewport.HeightItem;
    }
    UpdateElementsBallon(viewport) {
        this.FillBallon(viewport.ElementBallonBefore, viewport.HeightBallonBefore);
        this.FillBallon(viewport.ElementBallonAfter, viewport.HeightBallonAfter);
    }
    GetElementHeightRect(el) {
        const rect = el.getBoundingClientRect();
        return (rect.height);
    }
    GetElementStyleHeight(el) {
        const elStyle = window.getComputedStyle(el);
        const heightString = elStyle.getPropertyValue('height');
        if (heightString.indexOf('px') < 0)
            return (0);
        const height = this.Application.Parser.ParsePixels(heightString);
        return (height);
    }
    GetElementHeight(el) {
        let height = this.GetElementHeightRect(el);
        if (height != 0)
            return (height);
        height = this.GetElementStyleHeight(el);
        if (height != 0)
            return (height);
        return (0);
    }
    GetScrollViewport(el) {
        let elCurrent = el;
        let isFirst = true;
        let heightBefore = 0;
        let heightAfter = 0;
        while (elCurrent != null) {
            if (this.HasOverflowY(elCurrent))
                return ([elCurrent, heightBefore, heightAfter]);
            const elParent = elCurrent.parentElement;
            if (elParent != null) {
                if (isFirst) {
                    isFirst = false;
                }
                else {
                    let isBefore = true;
                    for (let i = 0; i < elParent.children.length; i++) {
                        const elChild = elParent.children[i];
                        if (elChild === elCurrent) {
                            isBefore = false;
                        }
                        else {
                            const height = this.GetElementHeight(elChild);
                            if (isBefore)
                                heightBefore = heightBefore + height;
                            else
                                heightAfter = heightAfter + height;
                        }
                    }
                }
            }
            elCurrent = elParent;
        }
        return (null);
    }
    HasOverflowY(el) {
        const style = window.getComputedStyle(el);
        const overflow = style.getPropertyValue('overflow');
        if (this.IsOverflowEnabled(overflow))
            return (true);
        const overflowY = style.getPropertyValue('overflow-y');
        if (this.IsOverflowEnabled(overflowY))
            return (true);
        return (false);
    }
    IsOverflowEnabled(value) {
        if (value === 'auto')
            return (true);
        if (value === 'scroll')
            return (true);
        if (value === 'hidden')
            return (true);
        return (false);
    }
    GetView(viewport) {
        let rowsBeforeRemove = null;
        let rowsBeforeInsertStart = null;
        let rowsBeforeInsertEnd = null;
        let rowsAfterRemove = null;
        let rowsAfterInsertStart = null;
        let rowsAfterInsertEnd = null;
        const view = this.GetViewFactorCurrent(viewport);
        const viewStart = view[0];
        const viewEnd = view[1];
        if ((viewStart >= viewport.DataStart) && (viewEnd <= viewport.DataEnd))
            return (null);
        if ((viewport.DataStart === viewStart) && (viewport.DataEnd === viewEnd))
            return (null);
        if ((viewStart > viewport.DataEnd) || (viewEnd < viewport.DataStart)) {
            rowsBeforeRemove = -1;
            rowsAfterInsertStart = viewStart;
            rowsAfterInsertEnd = viewEnd;
        }
        else {
            if (viewport.DataStart < viewStart) {
                rowsBeforeRemove = viewStart - viewport.DataStart;
            }
            else if (viewStart < viewport.DataStart) {
                rowsBeforeInsertStart = viewStart;
                rowsBeforeInsertEnd = viewport.DataStart;
            }
            if (viewport.DataEnd > viewEnd) {
                rowsAfterRemove = viewport.DataEnd - viewEnd;
            }
            else if (viewEnd > viewport.DataEnd) {
                rowsAfterInsertStart = viewport.DataEnd;
                rowsAfterInsertEnd = viewEnd;
            }
        }
        viewport.DataStart = viewStart;
        viewport.DataEnd = viewEnd;
        this.UpdateValuesBallon(viewport);
        return ([rowsBeforeRemove, rowsBeforeInsertStart, rowsBeforeInsertEnd, rowsAfterRemove, rowsAfterInsertStart, rowsAfterInsertEnd]);
    }
    GetViewFactorCurrent(viewport) {
        const viewHeight = viewport.HeightScroll;
        const viewItems = viewHeight / viewport.HeightItem;
        const scrollTop = viewport.ElementScroll.scrollTop + viewHeight;
        const scrollTopLessBefore = scrollTop - viewport.HeightBefore;
        const scrollTopLessBeforeValid = scrollTopLessBefore > 0 ? scrollTopLessBefore : 0;
        const views = scrollTopLessBeforeValid / viewHeight;
        let viewsStart = views - viewport.Factor;
        if (viewsStart < 0)
            viewsStart = 0;
        const viewsEnd = views + viewport.Factor;
        const rowStart = Math.round(viewsStart * viewItems);
        let rowEnd = Math.ceil(viewsEnd * viewItems);
        if (rowEnd > viewport.DataLength)
            rowEnd = viewport.DataLength;
        return ([rowStart, rowEnd]);
    }
}

"use strict";
class DrapoWindow {
    constructor() {
        this._did = null;
        this._uri = null;
        this._element = null;
        this._visible = true;
        this._code = null;
    }
    get Did() {
        return (this._did);
    }
    set Did(value) {
        this._did = value;
    }
    get Uri() {
        return (this._uri);
    }
    set Uri(value) {
        this._uri = value;
    }
    get Element() {
        return (this._element);
    }
    set Element(value) {
        this._element = value;
    }
    get Visible() {
        return (this._visible);
    }
    set Visible(value) {
        this._visible = value;
    }
    get Code() {
        return (this._code);
    }
    set Code(value) {
        this._code = value;
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoWindowHandler {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._windows = [];
        this._application = application;
    }
    CreateAndShowWindowDefinition(name, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const windowDefinition = yield this.GetWindowDefinition(name);
            if (windowDefinition === null)
                return;
            const uri = windowDefinition.Path;
            const did = windowDefinition.Did;
            const parametersDefault = windowDefinition.Parameters;
            yield this.CreateAndShowWindow(uri, did, parameters, parametersDefault);
        });
    }
    CreateAndShowWindow(uri, did, parameters, parametersDefault = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const elWindowsDid = this.Application.Searcher.FindByAttributeAndValue('d-id', did);
            if (elWindowsDid == null)
                return;
            const allowMultipleInstanceUrl = (!(elWindowsDid.getAttribute('d-window-allowMultipleInstanceUrl') === 'false'));
            if ((!allowMultipleInstanceUrl) && (this.IsWindowLoaded(uri, did)))
                return;
            const windowContent = yield this.Application.Server.GetViewHTML(uri);
            if (windowContent === null)
                return;
            const elContent = this.Application.Document.CreateHTMLElement(windowContent, true);
            let content = elContent.outerHTML;
            for (let i = 0; i < parameters.length; i++) {
                const parameter = parameters[i];
                content = content.replace(parameter[0], parameter[1]);
            }
            if (parametersDefault != null) {
                for (const parameterCode in parametersDefault) {
                    const parameterValue = parametersDefault[parameterCode];
                    content = content.replace(parameterCode, parameterValue);
                }
            }
            let windowElement = null;
            const attributes = this.Application.Parser.ParseElementAttributes(content);
            const templateUrl = this.Application.Solver.Get(attributes, 'd-templateurl');
            let template = templateUrl === null ? null : this.Application.Solver.Get(attributes, 'd-template');
            if (template === null)
                template = 'template';
            let onLoad = null;
            const templateUrlContent = templateUrl === null ? null : yield this.Application.Server.GetViewHTML(templateUrl);
            const templateContent = templateUrlContent === null ? null : this.Application.Parser.ParseDocumentContent(templateUrlContent);
            if (templateContent !== null) {
                elWindowsDid.append(this.Application.Document.CreateHTMLElement(templateContent));
                windowElement = elWindowsDid.children[elWindowsDid.children.length - 1];
                const windowElementTemplate = this.Application.Searcher.FindByAttributeAndValueFromParent('d-template', template, windowElement);
                if (windowElementTemplate === null) {
                    this.Application.Document.SetHTML(windowElement, content);
                }
                else {
                    this.Application.Document.SetHTML(windowElementTemplate, content);
                    const elTemplate = windowElementTemplate;
                    onLoad = elTemplate.getAttribute('d-on-load');
                }
            }
            else {
                elWindowsDid.append(this.Application.Document.CreateHTMLElement(content));
                windowElement = elWindowsDid.children[elWindowsDid.children.length - 1];
            }
            const elWindow = windowElement;
            const sector = this.Application.Document.GetSectorParent(elWindow);
            let elSector = elWindow.getAttribute('d-sector');
            if (elSector === "@") {
                elSector = this.Application.Document.CreateGuid();
                elWindow.setAttribute('d-sector', elSector);
                yield this.Application.Document.AddSectorHierarchy(elSector, sector);
            }
            const window = new DrapoWindow();
            window.Code = this.Application.Document.CreateGuid();
            window.Did = did;
            window.Uri = uri;
            window.Element = windowElement;
            this._windows.push(window);
            yield this.Application.Document.ResolveWindow(window.Element);
            if (onLoad != null)
                yield this.Application.FunctionHandler.ResolveFunctionWithoutContext(elSector, elWindow, onLoad);
        });
    }
    IsWindowLoaded(uri, did) {
        for (let i = this._windows.length - 1; i >= 0; i--) {
            const window = this._windows[i];
            if ((window.Did === did) && (window.Uri === uri))
                return (true);
        }
        return (false);
    }
    CloseWindow(did, all, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._windows.length == 0)
                return;
            const isTypeHidden = type === 'hidden';
            for (let i = this._windows.length - 1; i >= 0; i--) {
                const window = this._windows[i];
                if ((did !== null) && (did !== '') && (window.Did !== did) && (window.Code !== did))
                    continue;
                if ((isTypeHidden) && (window.Visible))
                    continue;
                yield this.DestroyWindowElement(window);
                this._windows.splice(i, 1);
                if (!all)
                    break;
            }
        });
    }
    TryClose(window) {
        return __awaiter(this, void 0, void 0, function* () {
            const parent = window.Element.parentElement;
            if (parent == null)
                return;
            yield this.DestroyWindowElement(window);
            for (let i = this._windows.length - 1; i >= 0; i--) {
                if (window !== this._windows[i])
                    continue;
                this._windows.splice(i, 1);
                break;
            }
        });
    }
    DestroyWindowElement(window) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Application.Document.RemoveElement(window.Element);
            yield this.Application.ComponentHandler.UnloadComponentInstancesDetachedFullCheck();
        });
    }
    HideWindow(did, all) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._windows.length == 0)
                return;
            let windowHidden = null;
            for (let i = this._windows.length - 1; i >= 0; i--) {
                const window = this._windows[i];
                if ((did !== null) && (did !== '') && (window.Did !== did))
                    continue;
                if (!window.Visible)
                    continue;
                window.Visible = false;
                windowHidden = window;
                this.Application.Document.Hide(window.Element);
                if (!all)
                    break;
            }
            return (windowHidden);
        });
    }
    GetWindowDefinition(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const windows = yield this.Application.Config.GetSector("Windows");
            if (windows === null)
                return (null);
            for (let i = 0; i < windows.length; i++) {
                const window = windows[i];
                if (window.Name === name)
                    return (window);
            }
            return (null);
        });
    }
    GetWindowByElement(el) {
        while (el !== null) {
            for (let i = this._windows.length - 1; i >= 0; i--) {
                const window = this._windows[i];
                if (window.Element === el)
                    return (window);
            }
            el = el.parentElement;
        }
        return (null);
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DrapoWorker {
    get Application() {
        return (this._application);
    }
    constructor(application) {
        this._pollingItem = null;
        this._pollingTimeout = null;
        this._application = application;
    }
    Check() {
        const item = this.Application.Storage.GetCachedDataItemByDatePolling();
        if (item == null) {
            this.Destroy(true);
            return;
        }
        if ((this._pollingItem != null) && (this._pollingItem === item))
            return;
        this._pollingItem = item;
        const application = this.Application;
        this._pollingTimeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            application.Worker.Destroy(false);
            yield application.Worker.Work(item);
        }), item.PollingTimespan);
    }
    Destroy(cleanItem) {
        if (this._pollingTimeout !== null) {
            clearTimeout(this._pollingTimeout);
            this._pollingTimeout = null;
        }
        if (cleanItem)
            this._pollingItem = null;
    }
    Work(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.Application.Storage.ExistCachedDataItem(item)) {
                this.Check();
                return;
            }
            const pollingHash = yield this.Application.Plumber.SendPolling(item.PollingKey);
            if (!this.Application.Storage.ExistCachedDataItem(item)) {
                this.Check();
                return;
            }
            if (item.PollingHash !== pollingHash) {
                item.PollingHash = pollingHash;
                yield this.Application.Storage.ExecuteCachedDataItemPolling(item);
            }
            item.CheckpointPolling();
            this._pollingItem = null;
            this.Check();
        });
    }
}
