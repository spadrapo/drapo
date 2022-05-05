"use strict";
var DrapoServerResponse = (function () {
    function DrapoServerResponse(status, headers, body) {
        this._status = null;
        this._headers = [];
        this._body = null;
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
    return DrapoServerResponse;
}());
