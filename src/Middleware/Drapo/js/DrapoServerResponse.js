"use strict";
var DrapoServerResponse = (function () {
    function DrapoServerResponse(status, headers, body) {
        this._status = null;
        this._headers = [];
        this._body = null;
        this._cookies = null;
        this._status = status;
        this._headers = headers;
        this._body = body;
    }
    Object.defineProperty(DrapoServerResponse.prototype, "Status", {
        get: function () {
            return (this._status);
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoServerResponse.prototype, "Headers", {
        get: function () {
            return (this._headers);
        },
        set: function (value) {
            this._headers = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoServerResponse.prototype, "Body", {
        get: function () {
            return (this._body);
        },
        set: function (value) {
            this._body = value;
        },
        enumerable: false,
        configurable: true
    });
    DrapoServerResponse.prototype.IsCacheAllowed = function () {
        if (this._headers == null)
            return (true);
        for (var i = 0; i < this._headers.length; i++) {
            var entry = this._headers[i];
            var key = entry[0].toLowerCase();
            if (key != 'cache-control')
                continue;
            var value = entry[1].toLowerCase();
            if (value == 'no-store')
                return (false);
            if (value == 'no-cache')
                return (false);
        }
        return (true);
    };
    DrapoServerResponse.prototype.GetCookieValue = function (name) {
        var cookies = this.GetCookies();
        for (var i = 0; i < cookies.length; i++)
            if (cookies[i][0] === name)
                return (cookies[i][1]);
        return (null);
    };
    DrapoServerResponse.prototype.GetCookies = function () {
        if (this._cookies == null)
            this._cookies = this.GetCookiesInternal();
        return (this._cookies);
    };
    DrapoServerResponse.prototype.GetCookiesInternal = function () {
        var cookies = [];
        for (var i = 0; i < this._headers.length; i++) {
            var header = this._headers[i];
            if (header[0].toLowerCase() !== 'set-cookie')
                continue;
            var headerCookies = header[1];
            var cookiesList = headerCookies.split(';');
            for (var j = 0; j < cookiesList.length; j++) {
                var cookie = cookiesList[j];
                var cookieParts = cookie.split('=');
                cookies.push([cookieParts[0], cookieParts[1]]);
            }
        }
        return (cookies);
    };
    return DrapoServerResponse;
}());
