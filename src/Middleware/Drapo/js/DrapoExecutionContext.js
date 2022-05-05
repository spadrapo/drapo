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
var DrapoExecutionContext = (function () {
    function DrapoExecutionContext(application) {
        this._application = null;
        this._hasError = false;
        this._canReset = false;
        this._hasBreakpoint = false;
        this._sector = '';
        this._dataKey = '';
        this._data = null;
        this._sectorContainer = [];
        this._windowsAutoClose = [];
        this._application = application;
    }
    Object.defineProperty(DrapoExecutionContext.prototype, "HasError", {
        get: function () {
            return (this._hasError);
        },
        set: function (value) {
            this._hasError = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoExecutionContext.prototype, "CanReset", {
        get: function () {
            return (this._canReset);
        },
        set: function (value) {
            this._canReset = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoExecutionContext.prototype, "HasBreakpoint", {
        get: function () {
            return (this._hasBreakpoint);
        },
        set: function (value) {
            this._hasBreakpoint = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoExecutionContext.prototype, "Sector", {
        get: function () {
            return (this._sector);
        },
        set: function (value) {
            this._sector = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoExecutionContext.prototype, "DataKey", {
        get: function () {
            return (this._dataKey);
        },
        set: function (value) {
            this._dataKey = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoExecutionContext.prototype, "Data", {
        get: function () {
            return (this._data);
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: false,
        configurable: true
    });
    DrapoExecutionContext.prototype.Continue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, (!this._hasError)];
            });
        });
    };
    DrapoExecutionContext.prototype.AddSectorContainer = function (sector, containerCode) {
        for (var i = 0; i < this._sectorContainer.length; i++) {
            var tuple = this._sectorContainer[i];
            if (tuple[0] !== sector)
                continue;
            tuple[1] = containerCode;
            break;
        }
        this._sectorContainer.push([sector, containerCode]);
    };
    DrapoExecutionContext.prototype.HasSectorContainer = function (sector) {
        for (var i = 0; i < this._sectorContainer.length; i++) {
            var tuple = this._sectorContainer[i];
            if (tuple[0] === sector)
                return (true);
        }
        return (false);
    };
    DrapoExecutionContext.prototype.GetSectorContainer = function (sector) {
        for (var i = 0; i < this._sectorContainer.length; i++) {
            var tuple = this._sectorContainer[i];
            if (tuple[0] === sector)
                return (tuple[1]);
        }
        return (null);
    };
    DrapoExecutionContext.prototype.AddWindowAutoClose = function (window) {
        this._windowsAutoClose.push(window);
    };
    DrapoExecutionContext.prototype.GetWindowsAutoClose = function () {
        return (this._windowsAutoClose);
    };
    return DrapoExecutionContext;
}());
