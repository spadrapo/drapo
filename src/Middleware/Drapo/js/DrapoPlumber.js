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
var DrapoPlumber = (function () {
    function DrapoPlumber(application) {
        this._application = application;
    }
    Object.defineProperty(DrapoPlumber.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: true,
        configurable: true
    });
    DrapoPlumber.prototype.CanUsePipes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetUsePipes()];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    DrapoPlumber.prototype.ConnectPipe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usePipes, application, pipHubName, urlRelative, urlAbsolute, connection, actionNotify;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.CanUsePipes()];
                    case 1:
                        usePipes = _a.sent();
                        if (!usePipes)
                            return [2, (false)];
                        application = this.Application;
                        return [4, this.Application.Config.GetPipeHubName()];
                    case 2:
                        pipHubName = _a.sent();
                        urlRelative = '~/' + pipHubName;
                        urlAbsolute = this.Application.Server.ResolveUrl(urlRelative);
                        connection = new signalR.HubConnectionBuilder()
                            .withUrl(urlAbsolute)
                            .build();
                        return [4, connection.start()];
                    case 3:
                        _a.sent();
                        return [4, this.Application.Config.GetPipeActionNotify()];
                    case 4:
                        actionNotify = _a.sent();
                        connection.on(actionNotify, function (message) {
                            application.Plumber.NotifyPipe(message);
                        });
                        return [4, this.RequestPipeRegister(connection)];
                    case 5:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DrapoPlumber.prototype.RequestPipeRegister = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var actionRegister;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetPipeActionRegister()];
                    case 1:
                        actionRegister = _a.sent();
                        return [4, connection.send(actionRegister)];
                    case 2:
                        _a.sent();
                        return [4, this.WaitForRegister()];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoPlumber.prototype.WaitForRegister = function (retry, interval) {
        if (retry === void 0) { retry = 1000; }
        if (interval === void 0) { interval = 50; }
        return __awaiter(this, void 0, void 0, function () {
            var pipeHeaderConnectionId, i, register;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetPipeHeaderConnectionId()];
                    case 1:
                        pipeHeaderConnectionId = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < retry)) return [3, 5];
                        register = this.Application.Server.GetRequestHeader(pipeHeaderConnectionId);
                        if (register != null)
                            return [2, (register)];
                        return [4, this.Application.Document.Sleep(interval)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 2];
                    case 5: return [2, (null)];
                }
            });
        });
    };
    DrapoPlumber.prototype.NotifyPipe = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 9]);
                        if (!(message.Type == DrapoPipeMessageType.Storage)) return [3, 2];
                        return [4, this.NotifyPipeStorage(message)];
                    case 1:
                        _a.sent();
                        return [3, 6];
                    case 2:
                        if (!(message.Type == DrapoPipeMessageType.Register)) return [3, 4];
                        return [4, this.NofityPipeRegister(message)];
                    case 3:
                        _a.sent();
                        return [3, 6];
                    case 4:
                        if (!(message.Type == DrapoPipeMessageType.Execute)) return [3, 6];
                        return [4, this.NofityPipeExecute(message)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3, 9];
                    case 7:
                        e_1 = _a.sent();
                        return [4, this.Application.ExceptionHandler.Handle(e_1, 'DrapoPlumber - NotifyPipe')];
                    case 8:
                        _a.sent();
                        return [3, 9];
                    case 9: return [2];
                }
            });
        });
    };
    DrapoPlumber.prototype.NotifyPipeStorage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var dataPipes, i, dataPipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataPipes = this.Application.Parser.ParsePipes(message.Data);
                        if (dataPipes == null)
                            return [2];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < dataPipes.length)) return [3, 5];
                        dataPipe = dataPipes[i];
                        return [4, this.Application.Debugger.AddPipe(dataPipe)];
                    case 2:
                        _a.sent();
                        return [4, this.Application.Storage.ReloadPipe(dataPipe)];
                    case 3:
                        _a.sent();
                        this.Application.SectorContainerHandler.ReloadStorageItemByPipe(dataPipe);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 1];
                    case 5: return [2];
                }
            });
        });
    };
    DrapoPlumber.prototype.NofityPipeRegister = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var pipeHeaderConnectionId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetPipeHeaderConnectionId()];
                    case 1:
                        pipeHeaderConnectionId = _a.sent();
                        this.Application.Server.AddRequestHeader(pipeHeaderConnectionId, message.Data);
                        return [2];
                }
            });
        });
    };
    DrapoPlumber.prototype.NofityPipeExecute = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, message.Data)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return DrapoPlumber;
}());
