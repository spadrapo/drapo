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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoServerResponse.prototype, "Headers", {
        get: function () {
            return (this._headers);
        },
        set: function (value) {
            this._headers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoServerResponse.prototype, "Body", {
        get: function () {
            return (this._body);
        },
        set: function (value) {
            this._body = value;
        },
        enumerable: true,
        configurable: true
    });
    return DrapoServerResponse;
}());
