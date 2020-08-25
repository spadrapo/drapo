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
var DrapoStylist = (function () {
    function DrapoStylist(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoStylist.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoStylist.prototype.Create = function (values, name) {
        if (name === void 0) { name = null; }
        var styleName = ((name === null) || (name === '')) ? this.CreateStyleName() : name;
        var elStyle = document.createElement('style');
        elStyle.id = styleName;
        elStyle.type = 'text/css';
        var style = this.StringfyValues(values);
        elStyle.innerHTML = '.' + styleName + ' \n{\n ' + style + ' }';
        document.head.appendChild(elStyle);
        return (styleName);
    };
    DrapoStylist.prototype.CreateStyleName = function () {
        return ('s-' + this.Application.Document.CreateGuid());
    };
    DrapoStylist.prototype.StringfyValues = function (values) {
        var valueText = '';
        for (var i = 0; i < values.length; i++) {
            var entry = values[i];
            var valueEntry = entry[0] + ':' + entry[1] + ';\n';
            valueText += valueEntry;
        }
        return (valueText);
    };
    DrapoStylist.prototype.ReloadStyles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reloaded, length, i, childNode, link, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reloaded = [];
                        length = document.head.childNodes.length;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < length)) return [3, 4];
                        childNode = document.head.childNodes[i];
                        if (childNode.nodeName.toLowerCase() !== 'link')
                            return [3, 3];
                        link = childNode;
                        url = link.href;
                        if (reloaded.indexOf(url) >= 0)
                            return [3, 3];
                        reloaded.push(url);
                        document.head.removeChild(childNode);
                        return [4, this.AddStyleToDocument(url)];
                    case 2:
                        _a.sent();
                        if (i === length - 1)
                            return [3, 4];
                        i--;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    DrapoStylist.prototype.AddStyleToDocument = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var link;
            return __generator(this, function (_a) {
                link = document.createElement('link');
                link.href = url;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
                return [2];
            });
        });
    };
    return DrapoStylist;
}());
