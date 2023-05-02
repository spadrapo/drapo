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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var DrapoApplication = (function () {
    function DrapoApplication() {
        this._isLoaded = false;
        this._logger = new DrapoLogger(this);
        this._router = new DrapoRouter(this);
        this._server = new DrapoServer(this);
        this._observer = new DrapoObserver(this);
        this._document = new DrapoDocument(this);
        this._controlFlow = new DrapoControlFlow(this);
        this._parser = new DrapoParser(this);
        this._storage = new DrapoStorage(this);
        this._solver = new DrapoSolver(this);
        this._binder = new DrapoBinder(this);
        this._config = new DrapoConfig(this);
        this._register = new DrapoRegister(this);
        this._serializer = new DrapoSerializer(this);
        this._barber = new DrapoBarber(this);
        this._searcher = new DrapoSearcher(this);
        this._modelHandler = new DrapoModelHandler(this);
        this._attributeHandler = new DrapoAttributeHandler(this);
        this._classHandler = new DrapoClassHandler(this);
        this._eventHandler = new DrapoEventHandler(this);
        this._functionHandler = new DrapoFunctionHandler(this);
        this._componentHandler = new DrapoComponentHandler(this);
        this._cookieHandler = new DrapoCookieHandler(this);
        this._sectorContainerHandler = new DrapoSectorContainerHandler(this);
        this._windowHandler = new DrapoWindowHandler(this);
        this._behaviorHandler = new DrapoBehaviorHandler(this);
        this._plumber = new DrapoPlumber(this);
        this._formatter = new DrapoFormatter(this);
        this._validator = new DrapoValidator(this);
        this._exceptionHandler = new DrapoExceptionHandler(this);
        this._globalization = new DrapoGlobalization(this);
        this._stylist = new DrapoStylist(this);
        this._viewportHandler = new DrapoViewportHandler(this);
        this._cacheHandler = new DrapoCacheHandler(this);
        this._worker = new DrapoWorker(this);
        this._debugger = new DrapoDebugger(this);
    }
    Object.defineProperty(DrapoApplication.prototype, "IsLoaded", {
        get: function () {
            return (this._isLoaded);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Log", {
        get: function () {
            return (this._logger);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Router", {
        get: function () {
            return (this._router);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Server", {
        get: function () {
            return (this._server);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Observer", {
        get: function () {
            return (this._observer);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Document", {
        get: function () {
            return (this._document);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "ControlFlow", {
        get: function () {
            return (this._controlFlow);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Parser", {
        get: function () {
            return (this._parser);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Storage", {
        get: function () {
            return (this._storage);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Solver", {
        get: function () {
            return (this._solver);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Binder", {
        get: function () {
            return (this._binder);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Config", {
        get: function () {
            return (this._config);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Register", {
        get: function () {
            return (this._register);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Serializer", {
        get: function () {
            return (this._serializer);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Barber", {
        get: function () {
            return (this._barber);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Searcher", {
        get: function () {
            return (this._searcher);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "ModelHandler", {
        get: function () {
            return (this._modelHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "AttributeHandler", {
        get: function () {
            return (this._attributeHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "ClassHandler", {
        get: function () {
            return (this._classHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "EventHandler", {
        get: function () {
            return (this._eventHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "FunctionHandler", {
        get: function () {
            return (this._functionHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "ComponentHandler", {
        get: function () {
            return (this._componentHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "CookieHandler", {
        get: function () {
            return (this._cookieHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "SectorContainerHandler", {
        get: function () {
            return (this._sectorContainerHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "WindowHandler", {
        get: function () {
            return (this._windowHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "BehaviorHandler", {
        get: function () {
            return (this._behaviorHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Plumber", {
        get: function () {
            return (this._plumber);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Formatter", {
        get: function () {
            return (this._formatter);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Validator", {
        get: function () {
            return (this._validator);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "ExceptionHandler", {
        get: function () {
            return (this._exceptionHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Globalization", {
        get: function () {
            return (this._globalization);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Stylist", {
        get: function () {
            return (this._stylist);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "ViewportHandler", {
        get: function () {
            return (this._viewportHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "CacheHandler", {
        get: function () {
            return (this._cacheHandler);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Worker", {
        get: function () {
            return (this._worker);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoApplication.prototype, "Debugger", {
        get: function () {
            return (this._debugger);
        },
        enumerable: false,
        configurable: true
    });
    DrapoApplication.prototype.OnLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 9]);
                        this.Log.WriteVerbose('Application - OnLoad - Started');
                        return [4, this.Debugger.Initialize()];
                    case 1:
                        _a.sent();
                        return [4, this.Plumber.ConnectPipe()];
                    case 2:
                        _a.sent();
                        return [4, this.CacheHandler.Initialize()];
                    case 3:
                        _a.sent();
                        return [4, this.Document.Resolve()];
                    case 4:
                        _a.sent();
                        return [4, this.Document.StartUnitTest()];
                    case 5:
                        _a.sent();
                        return [4, this.Debugger.ConnectDebugger()];
                    case 6:
                        _a.sent();
                        this._isLoaded = true;
                        this.Log.WriteVerbose('Application - OnLoad - Finished');
                        return [3, 9];
                    case 7:
                        e_1 = _a.sent();
                        return [4, this.ExceptionHandler.Handle(e_1, 'OnLoad')];
                    case 8:
                        _a.sent();
                        return [3, 9];
                    case 9: return [2];
                }
            });
        });
    };
    DrapoApplication.prototype.show = function () {
        this.Debugger.ShowDebugger();
        return ('');
    };
    DrapoApplication.prototype.close = function () {
        this.Debugger.CloseDebugger();
        return ('');
    };
    return DrapoApplication;
}());
window.onload = function () {
    var application = new DrapoApplication();
    var windowAny = window;
    windowAny.drapo = application;
    application.OnLoad();
};
window.onpopstate = function (e) {
    var windowAny = window;
    var application = windowAny.drapo;
    application.Router.OnPopState(e);
};
window.addEventListener('message', function (event) {
    var windowAny = window;
    var application = windowAny.drapo;
    application.Document.ReceiveMessage(event.data);
}, false);
