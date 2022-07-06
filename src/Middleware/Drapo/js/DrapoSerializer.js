"use strict";
var DrapoSerializer = (function () {
    function DrapoSerializer(application) {
        this.JSON_START = '{';
        this.JSON_END = '}';
        this.JSON_ARRAY_START = '[';
        this.JSON_ARRAY_END = ']';
        this._application = application;
    }
    Object.defineProperty(DrapoSerializer.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoSerializer.prototype.IsJson = function (data) {
        return ((this.IsJsonInstance(data)) || (this.IsJsonArray(data)));
    };
    DrapoSerializer.prototype.IsJsonInstance = function (data) {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr != null) && (data.substr(0, 1) == this.JSON_START) && (data.substr(data.length - 1, 1) == this.JSON_END));
    };
    DrapoSerializer.prototype.IsJsonArray = function (data) {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr != null) && (data.substr(0, 1) == this.JSON_ARRAY_START) && (data.substr(data.length - 1, 1) == this.JSON_ARRAY_END));
    };
    DrapoSerializer.prototype.Deserialize = function (data) {
        if (!this.IsJson(data))
            return (data);
        return (JSON.parse(data));
    };
    DrapoSerializer.prototype.Serialize = function (data) {
        if (data == null)
            return (null);
        return (JSON.stringify(data));
    };
    DrapoSerializer.prototype.SerializeObject = function (data) {
        if (typeof data === "string")
            return (data);
        return (this.Serialize(data));
    };
    DrapoSerializer.prototype.EncodeHeaderFieldValue = function (data) {
        if (data == null)
            return (null);
        return (data.replace(/(\r\n\t|\n|\r\t)/gm, ""));
    };
    DrapoSerializer.prototype.EnsureASCII = function (data) {
        if (this.HasUnicode(data))
            return (this.ConvertToASCII(data));
        return (data);
    };
    DrapoSerializer.prototype.HasUnicode = function (data) {
        for (var i = 0; i < data.length; i++) {
            var char = data[i];
            var index = char.charCodeAt(0);
            if (index > 127)
                return (true);
        }
        return (false);
    };
    DrapoSerializer.prototype.ConvertToASCII = function (data) {
        var encoded = '';
        for (var i = 0; i < data.length; i++) {
            var char = data[i];
            var index = char.charCodeAt(0);
            encoded += '\\u' + index.toString(16).toUpperCase();
        }
        return (encoded);
    };
    DrapoSerializer.prototype.EnsureUrlDecoded = function (value) {
        if ((value == null) || (value == '') || (value.indexOf == null))
            return (value);
        var hasPercentage = value.indexOf('%') >= 0;
        if (!hasPercentage)
            return (value);
        return (decodeURIComponent(value));
    };
    return DrapoSerializer;
}());
