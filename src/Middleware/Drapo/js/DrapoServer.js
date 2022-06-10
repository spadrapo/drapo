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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DrapoServer = (function () {
    function DrapoServer(application) {
        this._token = null;
        this._requestHeaders = [];
        this._requestHeadersNext = [];
        this._hasBadRequest = false;
        this._headerContainerIdKey = null;
        this._headerContainerIdValue = null;
        this._application = application;
        this.InitializeServer();
    }
    Object.defineProperty(DrapoServer.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoServer.prototype, "HasBadRequest", {
        get: function () {
            return (this._hasBadRequest);
        },
        set: function (value) {
            this._hasBadRequest = value;
        },
        enumerable: false,
        configurable: true
    });
    DrapoServer.prototype.InitializeServer = function () {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            var source = script.src;
            var index = source.indexOf('/drapo.js');
            if ((index == null) || (index < 0))
                continue;
            this._url = source.substr(0, index);
            return;
        }
        this._url = '';
    };
    DrapoServer.prototype.ResolveUrl = function (url) {
        if (url.substr(0, 1) == '~')
            return (this._url + url.substr(1));
        return (url);
    };
    DrapoServer.prototype.AppendUrlQueryStringCacheStatic = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var useCacheStatic, applicationBuild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetUseCacheStatic()];
                    case 1:
                        useCacheStatic = _a.sent();
                        if (!useCacheStatic)
                            return [2, ('')];
                        return [4, this.Application.Config.GetApplicationBuild()];
                    case 2:
                        applicationBuild = _a.sent();
                        if (applicationBuild == '')
                            return [2, ('')];
                        if (url.indexOf('ab=') >= 0)
                            return [2, ('')];
                        return [2, ((url.indexOf('?') >= 0 ? '&' : '?') + 'ab=' + applicationBuild)];
                }
            });
        });
    };
    DrapoServer.prototype.AppendUrlQueryStringTimestamp = function (url) {
        var timestamp = new Date().getTime();
        return (url + (url.indexOf('?') >= 0 ? '&' : '?') + 'ts=' + timestamp);
    };
    DrapoServer.prototype.GetViewHTML = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var htmlCached, response, html, allowCache;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        htmlCached = this.Application.CacheHandler.GetCachedView(url);
                        if (htmlCached != null)
                            return [2, (htmlCached)];
                        return [4, this.Application.Server.GetHTML(url)];
                    case 1:
                        response = _a.sent();
                        if (response == null)
                            return [2, (null)];
                        html = response[0];
                        allowCache = response[1];
                        if (allowCache)
                            this.Application.CacheHandler.SetCachedView(url, html);
                        return [2, (html)];
                }
            });
        });
    };
    DrapoServer.prototype.GetHTML = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var requestHeaders, urlResolved, _a, request, response, responseText, responseStatus;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestHeaders = [];
                        this.InsertHeader(requestHeaders, 'X-Requested-With', 'XMLHttpRequest');
                        if (this._headerContainerIdValue !== null)
                            requestHeaders.push([this._headerContainerIdKey, this._headerContainerIdValue]);
                        urlResolved = this.ResolveUrl(url);
                        _a = urlResolved;
                        return [4, this.AppendUrlQueryStringCacheStatic(url)];
                    case 1:
                        urlResolved = _a + _b.sent();
                        request = new DrapoServerRequest('GET', urlResolved, requestHeaders, null, true);
                        return [4, this.Request(request)];
                    case 2:
                        response = _b.sent();
                        responseText = response.Body;
                        responseStatus = response.Status;
                        if (responseStatus == 200) {
                            return [2, ([responseText, response.IsCacheAllowed()])];
                        }
                        return [2, (null)];
                }
            });
        });
    };
    DrapoServer.prototype.GetJSON = function (url, verb, data, contentType, dataKey, headers, headersResponse) {
        if (verb === void 0) { verb = "GET"; }
        if (data === void 0) { data = null; }
        if (contentType === void 0) { contentType = null; }
        if (dataKey === void 0) { dataKey = null; }
        if (headers === void 0) { headers = null; }
        if (headersResponse === void 0) { headersResponse = null; }
        return __awaiter(this, void 0, void 0, function () {
            var requestHeaders, urlResolved, urlResolvedTimestamp, cookieValues, request, response, location_1, dataResponse, onBadRequest, storageBadRequest, dataResponse, onError, storageErrors, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestHeaders = [];
                        this.InsertHeaders(requestHeaders, this.GetRequestHeaders());
                        this.InsertHeaders(requestHeaders, headers);
                        if (contentType != null)
                            this.InsertHeader(requestHeaders, 'Content-Type', contentType);
                        this.InsertHeader(requestHeaders, 'X-Requested-With', 'XMLHttpRequest');
                        this.InsertHeader(requestHeaders, 'Cache-Control', 'no-cache, no-store, must-revalidate');
                        if (this._headerContainerIdValue !== null)
                            requestHeaders.push([this._headerContainerIdKey, this._headerContainerIdValue]);
                        urlResolved = this.ResolveUrl(url);
                        urlResolvedTimestamp = this.AppendUrlQueryStringTimestamp(urlResolved);
                        cookieValues = this.Application.CookieHandler.GetCookieValues();
                        request = new DrapoServerRequest(verb, urlResolvedTimestamp, requestHeaders, data, true);
                        return [4, this.Request(request)];
                    case 1:
                        response = _a.sent();
                        if (!((200 <= response.Status) && (response.Status < 400))) return [3, 3];
                        location_1 = this.GetHeaderValue(response.Headers, 'Location');
                        if (!(location_1 !== null)) return [3, 3];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, 'RedirectPage(' + location_1 + ')', this.Application.FunctionHandler.CreateExecutionContext(false))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(response.Status == 200)) return [3, 4];
                        this.Application.CookieHandler.HandleCookieValuesChanges(cookieValues);
                        if (response.Body == '')
                            return [2, (null)];
                        if (headersResponse !== null) {
                            this.InsertHeaders(headersResponse, response.Headers);
                            return [2, response.Body];
                        }
                        dataResponse = void 0;
                        dataResponse = this.Application.Serializer.Deserialize(response.Body);
                        return [2, (dataResponse)];
                    case 4:
                        if (!(response.Status == 204)) return [3, 5];
                        return [2, (null)];
                    case 5:
                        if (!(response.Status == 400)) return [3, 12];
                        this.HasBadRequest = true;
                        return [4, this.Application.Config.GetOnBadRequest()];
                    case 6:
                        onBadRequest = _a.sent();
                        if (!(onBadRequest !== null)) return [3, 11];
                        return [4, this.Application.Config.GetStorageBadRequest()];
                    case 7:
                        storageBadRequest = _a.sent();
                        if (!(storageBadRequest !== null)) return [3, 9];
                        dataResponse = this.Application.Serializer.Deserialize(response.Body);
                        return [4, this.Application.Storage.UpdateData(storageBadRequest, null, dataResponse)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onBadRequest, this.Application.FunctionHandler.CreateExecutionContext(false))];
                    case 10:
                        _a.sent();
                        return [2, ([])];
                    case 11: return [2, ([])];
                    case 12:
                        if (!(response.Status == 401)) return [3, 15];
                        if (!(dataKey !== null)) return [3, 14];
                        return [4, this.Application.Document.RequestAuthorization(dataKey, 'notify')];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14: return [3, 22];
                    case 15:
                        if (!(response.Status == 500)) return [3, 22];
                        this.HasBadRequest = true;
                        return [4, this.Application.Config.GetOnError()];
                    case 16:
                        onError = _a.sent();
                        if (!(onError !== null)) return [3, 21];
                        return [4, this.Application.Config.GetStorageErrors()];
                    case 17:
                        storageErrors = _a.sent();
                        if (!(storageErrors !== null)) return [3, 19];
                        error = this.Application.Serializer.IsJson(response.Body) ? this.Application.Serializer.Deserialize(response.Body) : response.Body;
                        return [4, this.Application.Storage.AddDataItem(storageErrors, null, null, this.Application.Storage.CreateErrorForStorage('DataRequest', 'Error requesting data for :' + url, error))];
                    case 18:
                        _a.sent();
                        _a.label = 19;
                    case 19: return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onError, this.Application.FunctionHandler.CreateExecutionContext(false))];
                    case 20:
                        _a.sent();
                        return [2, ([])];
                    case 21: return [2, ([])];
                    case 22: return [2, ([])];
                }
            });
        });
    };
    DrapoServer.prototype.GetFile = function (url, verb, data, contentType, dataKey, headers, headersResponse) {
        if (contentType === void 0) { contentType = null; }
        if (dataKey === void 0) { dataKey = null; }
        if (headers === void 0) { headers = null; }
        if (headersResponse === void 0) { headersResponse = null; }
        return __awaiter(this, void 0, void 0, function () {
            var requestHeaders, urlResolved, urlResolvedTimestamp, request, response, location_2, dataResponse, onBadRequest, storageBadRequest, dataResponse, onError, storageErrors, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestHeaders = [];
                        this.InsertHeaders(requestHeaders, this.GetRequestHeaders());
                        this.InsertHeaders(requestHeaders, headers);
                        this.InsertHeader(requestHeaders, 'X-Requested-With', 'XMLHttpRequest');
                        this.InsertHeader(requestHeaders, 'Cache-Control', 'no-cache, no-store, must-revalidate');
                        if (this._headerContainerIdValue !== null)
                            requestHeaders.push([this._headerContainerIdKey, this._headerContainerIdValue]);
                        if (contentType != null)
                            this.InsertHeader(requestHeaders, 'Content-Type', contentType);
                        urlResolved = this.ResolveUrl(url);
                        urlResolvedTimestamp = this.AppendUrlQueryStringTimestamp(urlResolved);
                        request = new DrapoServerRequest(verb, urlResolvedTimestamp, requestHeaders, data, true, true);
                        return [4, this.Request(request)];
                    case 1:
                        response = _a.sent();
                        if (!((200 <= response.Status) && (response.Status < 400))) return [3, 3];
                        location_2 = this.GetHeaderValue(response.Headers, 'Location');
                        if (!(location_2 !== null)) return [3, 3];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, 'RedirectPage(' + location_2 + ')', this.Application.FunctionHandler.CreateExecutionContext(false))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(response.Status == 200)) return [3, 4];
                        if (response.Body == '')
                            return [2, (null)];
                        if (headersResponse !== null) {
                            this.InsertHeaders(headersResponse, response.Headers);
                            return [2, (this.CreateFileObject(headersResponse, response.Body))];
                        }
                        dataResponse = void 0;
                        dataResponse = this.Application.Serializer.Deserialize(response.Body);
                        return [2, (dataResponse)];
                    case 4:
                        if (!(response.Status == 204)) return [3, 5];
                        return [2, (null)];
                    case 5:
                        if (!(response.Status == 400)) return [3, 12];
                        this.HasBadRequest = true;
                        return [4, this.Application.Config.GetOnBadRequest()];
                    case 6:
                        onBadRequest = _a.sent();
                        if (!(onBadRequest !== null)) return [3, 11];
                        return [4, this.Application.Config.GetStorageBadRequest()];
                    case 7:
                        storageBadRequest = _a.sent();
                        if (!(storageBadRequest !== null)) return [3, 9];
                        dataResponse = this.Application.Serializer.Deserialize(response.Body);
                        return [4, this.Application.Storage.UpdateData(storageBadRequest, null, dataResponse)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onBadRequest, this.Application.FunctionHandler.CreateExecutionContext(false))];
                    case 10:
                        _a.sent();
                        return [2, ([])];
                    case 11: return [2, ([])];
                    case 12:
                        if (!(response.Status == 401)) return [3, 15];
                        if (!(dataKey !== null)) return [3, 14];
                        return [4, this.Application.Document.RequestAuthorization(dataKey, 'notify')];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14: return [3, 22];
                    case 15:
                        if (!(response.Status == 500)) return [3, 22];
                        this.HasBadRequest = true;
                        return [4, this.Application.Config.GetOnError()];
                    case 16:
                        onError = _a.sent();
                        if (!(onError !== null)) return [3, 21];
                        return [4, this.Application.Config.GetStorageErrors()];
                    case 17:
                        storageErrors = _a.sent();
                        if (!(storageErrors !== null)) return [3, 19];
                        error = this.Application.Serializer.IsJson(response.Body) ? this.Application.Serializer.Deserialize(response.Body) : response.Body;
                        return [4, this.Application.Storage.AddDataItem(storageErrors, null, null, this.Application.Storage.CreateErrorForStorage('DataRequest', 'Error requesting data for :' + url, error))];
                    case 18:
                        _a.sent();
                        _a.label = 19;
                    case 19: return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onError, this.Application.FunctionHandler.CreateExecutionContext(false))];
                    case 20:
                        _a.sent();
                        return [2, ([])];
                    case 21: return [2, ([])];
                    case 22: return [2, ([])];
                }
            });
        });
    };
    DrapoServer.prototype.CreateFileObject = function (headers, body) {
        var object = {};
        object.body = body;
        object.length = body.size;
        for (var i = 0; i < headers.length; i++) {
            var header = headers[i];
            var key = header[0].toLowerCase();
            var keyClean = key.replace('-', '');
            var value = header[1];
            object[keyClean] = value;
            if (keyClean !== 'contentdisposition')
                continue;
            var contentDispositionValues = value.split(';');
            for (var j = 0; j < contentDispositionValues.length; j++) {
                var contentDispositionValue = contentDispositionValues[j];
                var contentDispositionValueClean = contentDispositionValue[0] === ' ' ? contentDispositionValue.substring(1) : contentDispositionValue;
                var index = contentDispositionValueClean.indexOf('=');
                if (index < 0)
                    continue;
                var contentDispositionValueCleanKey = contentDispositionValueClean.substring(0, index);
                if (contentDispositionValueCleanKey !== 'filename')
                    continue;
                var contentDispositionKeyValue = contentDispositionValueClean.substring(index + 1);
                if ((contentDispositionKeyValue.length > 2) && (contentDispositionKeyValue[0] === '"') && (contentDispositionKeyValue[contentDispositionKeyValue.length - 1] === '"'))
                    contentDispositionKeyValue = contentDispositionKeyValue.substring(1, contentDispositionKeyValue.length - 1);
                if ((contentDispositionKeyValue.length > 2) && (contentDispositionKeyValue[0] === "'") && (contentDispositionKeyValue[contentDispositionKeyValue.length - 1] === "'"))
                    contentDispositionKeyValue = contentDispositionKeyValue.substring(1, contentDispositionKeyValue.length - 1);
                object.filename = contentDispositionKeyValue;
                break;
            }
        }
        return (object);
    };
    DrapoServer.prototype.ConvertFileBody = function (body) {
        if ((body.length > 2) && (body[0] === '"') && (body[body.length - 1] === '"'))
            return (body.substring(1, body.length - 1));
        if ((body.length > 2) && (body[0] === "'") && (body[body.length - 1] === "'"))
            return (body.substring(1, body.length - 1));
        return (btoa(body));
    };
    DrapoServer.prototype.Request = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var requestDebbuger, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Debugger.CreateRequest(request.Url)];
                    case 1:
                        requestDebbuger = _a.sent();
                        return [4, this.RequestInternal(request)];
                    case 2:
                        response = _a.sent();
                        this.SetContainerId(response);
                        return [4, this.Application.Debugger.FinishRequest(requestDebbuger)];
                    case 3:
                        _a.sent();
                        return [2, (response)];
                }
            });
        });
    };
    DrapoServer.prototype.RequestInternal = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var application;
            return __generator(this, function (_a) {
                application = this.Application;
                return [2, new Promise(function (resolve, reject) {
                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = true;
                        xhr.onload = function () {
                            resolve(application.Server.CreateResponse(request, xhr));
                        };
                        xhr.open(request.Verb, request.Url, true);
                        if (request.Headers != null) {
                            for (var i = 0; i < request.Headers.length; i++) {
                                var header = request.Headers[i];
                                xhr.setRequestHeader(header[0], application.Serializer.EnsureASCII(header[1]));
                            }
                        }
                        if (request.Binary)
                            xhr.responseType = 'blob';
                        xhr.send(request.Body);
                    })];
            });
        });
    };
    DrapoServer.prototype.CreateResponse = function (request, xhr) {
        var headers = [];
        if (request.ExtractHeaders)
            this.ExtractHeaders(xhr, headers);
        var body = null;
        if (request.Binary)
            body = xhr.response;
        else
            body = xhr.responseText;
        return (new DrapoServerResponse(xhr.status, headers, body));
    };
    DrapoServer.prototype.ExtractHeaders = function (xhr, headers) {
        var responseHeaders = xhr.getAllResponseHeaders();
        var lines = this.Application.Parser.ParseLines(responseHeaders);
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var header = this.Application.Parser.ParseHeader(line);
            if (header != null)
                headers.push(header);
        }
    };
    DrapoServer.prototype.InsertHeaders = function (headers, headersInsert) {
        if (headersInsert == null)
            return;
        for (var i = 0; i < headersInsert.length; i++) {
            var header = headersInsert[i];
            this.InsertHeader(headers, header[0], header[1]);
        }
    };
    DrapoServer.prototype.InsertHeader = function (headers, name, value) {
        headers.push([name, value]);
    };
    DrapoServer.prototype.GetHeaderValue = function (headers, name) {
        for (var i = 0; i < headers.length; i++) {
            var header = headers[i];
            if (header[0].toLowerCase() === name.toLowerCase())
                return (header[1]);
        }
        return (null);
    };
    DrapoServer.prototype.SetToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._token === token)
                            return [2, (false)];
                        this._token = token;
                        if (!(this._token === null)) return [3, 2];
                        return [4, this.Application.Storage.ClearDataToken()];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2: return [4, this.Application.Observer.NotifyAuthorization()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2, (true)];
                }
            });
        });
    };
    DrapoServer.prototype.HasToken = function () {
        return (this._token != null);
    };
    DrapoServer.prototype.GetRequestHeaders = function () {
        if (this._requestHeadersNext.length === 0)
            return (this._requestHeaders);
        var headers = [];
        this.AddHeader(headers, this._requestHeaders);
        this.AddHeader(headers, this._requestHeadersNext);
        this._requestHeadersNext = [];
        return (headers);
    };
    DrapoServer.prototype.AddHeader = function (headers, headersInsert) {
        for (var i = 0; i < headersInsert.length; i++)
            headers.push(headersInsert[i]);
    };
    DrapoServer.prototype.AddRequestHeader = function (key, value) {
        for (var i = this._requestHeaders.length - 1; i >= 0; i--) {
            var requestHeader = this._requestHeaders[i];
            if (requestHeader[0] !== key)
                continue;
            requestHeader[1] = value;
            return;
        }
        this._requestHeaders.push([key, value]);
    };
    DrapoServer.prototype.GetRequestHeader = function (key) {
        for (var i = this._requestHeaders.length - 1; i >= 0; i--) {
            var header = this._requestHeaders[i];
            if (header[0] === key)
                return (header[1]);
        }
        return (null);
    };
    DrapoServer.prototype.AddNextRequestHeader = function (key, value) {
        this._requestHeadersNext.push([key, value]);
    };
    DrapoServer.prototype.EnsureUrlEncoded = function (url) {
        if ((url == null) || (url == ''))
            return (url);
        if (this.IsUrlEncoded(url))
            return (url);
        var urlEncoded = encodeURI(url);
        urlEncoded = urlEncoded.replace(/[+]/g, '%2B');
        urlEncoded = urlEncoded.replace(/[$]/g, '%24');
        urlEncoded = urlEncoded.replace(/[#]/g, '%23');
        urlEncoded = urlEncoded.replace(/[,]/g, '%2C');
        urlEncoded = urlEncoded.replace(/[;]/g, '%3B');
        return (urlEncoded);
    };
    DrapoServer.prototype.EnsureUrlComponentEncoded = function (url) {
        if ((url == null) || (url == ''))
            return (url);
        if (this.IsUrlEncoded(url))
            return (url);
        return (encodeURIComponent(url));
    };
    DrapoServer.prototype.IsUrlEncoded = function (url) {
        if ((url == null) || (url == '') || (url.indexOf == null))
            return (false);
        var hasPercentage = url.indexOf('%') >= 0;
        if (!hasPercentage)
            return (false);
        var hasPercentageEncoded = url.indexOf('%25') >= 0;
        if (hasPercentageEncoded)
            return (true);
        var hasAndEncoded = url.indexOf('%26') >= 0;
        if (hasAndEncoded)
            return (true);
        return (false);
    };
    DrapoServer.prototype.SetContainerId = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, i, header;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this._headerContainerIdKey == null)) return [3, 2];
                        _a = this;
                        return [4, this.Application.Config.GetHeaderContainerId()];
                    case 1:
                        _a._headerContainerIdKey = _b.sent();
                        _b.label = 2;
                    case 2:
                        if ((this._headerContainerIdKey == null) || (this._headerContainerIdKey == ''))
                            return [2];
                        for (i = 0; i < response.Headers.length; i++) {
                            header = response.Headers[i];
                            if (header[0].toLowerCase() !== this._headerContainerIdKey.toLowerCase())
                                continue;
                            this._headerContainerIdValue = header[1];
                            break;
                        }
                        return [2];
                }
            });
        });
    };
    return DrapoServer;
}());
