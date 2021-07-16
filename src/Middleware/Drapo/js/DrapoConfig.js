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
var DrapoConfig = (function () {
    function DrapoConfig(application) {
        this._url = null;
        this._cacheKeys = null;
        this._cacheDatas = null;
        this._application = application;
    }
    Object.defineProperty(DrapoConfig.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoConfig.prototype.GetUrl = function () {
        if (this._url == null)
            this._url = this.GetUrlInternal();
        return (this._url);
    };
    DrapoConfig.prototype.GetUrlInternal = function () {
        return ('~/drapo.json');
    };
    DrapoConfig.prototype.Load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, property;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._cacheKeys = [];
                        this._cacheDatas = [];
                        return [4, this.Application.Server.GetJSON(this.GetUrl())];
                    case 1:
                        data = _a.sent();
                        for (property in data) {
                            this._cacheKeys.push(property);
                            this._cacheDatas.push(data[property]);
                        }
                        return [2];
                }
            });
        });
    };
    DrapoConfig.prototype.IsLoaded = function () {
        return (this._cacheKeys != null);
    };
    DrapoConfig.prototype.EnsureLoaded = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.IsLoaded())
                            return [2];
                        return [4, this.Load()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoConfig.prototype.GetSector = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.EnsureLoaded()];
                    case 1:
                        _a.sent();
                        index = this.GetCacheKeyIndex(name);
                        if (index == null)
                            return [2, (null)];
                        return [2, (this.GetCacheData(index))];
                }
            });
        });
    };
    DrapoConfig.prototype.GetCacheKeyIndex = function (dataKey) {
        for (var i = 0; i < this._cacheKeys.length; i++) {
            if (this._cacheKeys[i] == dataKey)
                return (i);
        }
        return (null);
    };
    DrapoConfig.prototype.GetCacheData = function (dataIndex) {
        return (this._cacheDatas[dataIndex]);
    };
    DrapoConfig.prototype.AddCacheData = function (dataKey, data) {
        this._cacheKeys.push(dataKey);
        this._cacheDatas.push(data);
    };
    DrapoConfig.prototype.GetProperty = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetSector(name)];
                    case 1:
                        config = _a.sent();
                        if ((config === undefined) || (config === null))
                            return [2, (null)];
                        return [2, (config)];
                }
            });
        });
    };
    DrapoConfig.prototype.GetPropertyBoolean = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty(name)];
                    case 1:
                        value = _a.sent();
                        if (value == null)
                            return [2, (false)];
                        return [2, (value.toString() == 'true')];
                }
            });
        });
    };
    DrapoConfig.prototype.GetPropertyArray = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetSector(name)];
                    case 1:
                        value = _a.sent();
                        if ((value === undefined) || (value === null))
                            return [2, (null)];
                        return [2, (value)];
                }
            });
        });
    };
    DrapoConfig.prototype.GetUsePipes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetPropertyBoolean('UsePipes')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetUseRouter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetPropertyBoolean('UseRouter')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetUseCacheLocalStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetPropertyBoolean('UseCacheLocalStorage')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetUseCacheStatic = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetPropertyBoolean('UseCacheStatic')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetPipeHubName = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('PipeHubName')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetPipeActionRegister = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('PipeActionRegister')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetPipeActionNotify = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('PipeActionNotify')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetPipeHeaderConnectionId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('PipeHeaderConnectionId')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetOnAuthorizationRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('OnAuthorizationRequest')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetOnError = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('OnError')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetOnReconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('OnReconnect')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetStorageErrors = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('StorageErrors')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetOnBadRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('OnBadRequest')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetStorageBadRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('StorageBadRequest')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetValidatorUncheckedClass = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('ValidatorUncheckedClass')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetValidatorValidClass = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('ValidatorValidClass')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetValidatorInvalidClass = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('ValidatorInvalidClass')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetApplicationBuild = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('ApplicationBuild')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetHeaderContainerId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetProperty('HeaderContainerId')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoConfig.prototype.GetViews = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetPropertyArray('Views')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    return DrapoConfig;
}());
