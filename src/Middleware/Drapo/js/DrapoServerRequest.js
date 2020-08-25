"use strict";
var DrapoServerRequest = (function () {
    function DrapoServerRequest(verb, url, headers, body, extractHeaders, binary) {
        if (binary === void 0) { binary = false; }
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
    Object.defineProperty(DrapoServerRequest.prototype, "Verb", {
        get: function () {
            return (this._verb);
        },
        set: function (value) {
            this._verb = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoServerRequest.prototype, "Url", {
        get: function () {
            return (this._url);
        },
        set: function (value) {
            this._url = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoServerRequest.prototype, "Headers", {
        get: function () {
            return (this._headers);
        },
        set: function (value) {
            this._headers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoServerRequest.prototype, "Body", {
        get: function () {
            return (this._body);
        },
        set: function (value) {
            this._body = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoServerRequest.prototype, "ExtractHeaders", {
        get: function () {
            return (this._extractHeaders);
        },
        set: function (value) {
            this._extractHeaders = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoServerRequest.prototype, "Binary", {
        get: function () {
            return (this._binary);
        },
        set: function (value) {
            this._binary = value;
        },
        enumerable: true,
        configurable: true
    });
    return DrapoServerRequest;
}());
