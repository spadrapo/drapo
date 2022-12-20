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
var DrapoWindowHandler = (function () {
    function DrapoWindowHandler(application) {
        this._windows = [];
        this._application = application;
    }
    Object.defineProperty(DrapoWindowHandler.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoWindowHandler.prototype.CreateAndShowWindowDefinition = function (name, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var windowDefinition, uri, did, parametersDefault;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetWindowDefinition(name)];
                    case 1:
                        windowDefinition = _a.sent();
                        if (windowDefinition === null)
                            return [2];
                        uri = windowDefinition.Path;
                        did = windowDefinition.Did;
                        parametersDefault = windowDefinition.Parameters;
                        return [4, this.CreateAndShowWindow(uri, did, parameters, parametersDefault)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoWindowHandler.prototype.CreateAndShowWindow = function (uri, did, parameters, parametersDefault) {
        if (parametersDefault === void 0) { parametersDefault = null; }
        return __awaiter(this, void 0, void 0, function () {
            var windowsDid, elWindowsDid, allowMultipleInstanceUrl, windowContent, content, i, parameter, parameterCode, parameterValue, windowElement, attributes, templateUrl, template, onLoad, templateUrlContent, _a, templateContent, windowElementTemplateJQuery, elTemplate, elWindow, sector, elSector, window;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        windowsDid = $("[d-id='" + did + "']");
                        if ((windowsDid === null) || (windowsDid.windowContainer === 0))
                            return [2];
                        elWindowsDid = windowsDid[0];
                        allowMultipleInstanceUrl = (!(elWindowsDid.getAttribute('d-window-allowMultipleInstanceUrl') === 'false'));
                        if ((!allowMultipleInstanceUrl) && (this.IsWindowLoaded(uri, did)))
                            return [2];
                        return [4, this.Application.Server.GetViewHTML(uri)];
                    case 1:
                        windowContent = _b.sent();
                        if (windowContent === null)
                            return [2];
                        content = $(windowContent).last()[0].outerHTML;
                        for (i = 0; i < parameters.length; i++) {
                            parameter = parameters[i];
                            content = content.replace(parameter[0], parameter[1]);
                        }
                        if (parametersDefault != null) {
                            for (parameterCode in parametersDefault) {
                                parameterValue = parametersDefault[parameterCode];
                                content = content.replace(parameterCode, parameterValue);
                            }
                        }
                        windowElement = null;
                        attributes = this.Application.Parser.ParseElementAttributes(content);
                        templateUrl = this.Application.Solver.Get(attributes, 'd-templateurl');
                        template = templateUrl === null ? null : this.Application.Solver.Get(attributes, 'd-template');
                        if (template === null)
                            template = 'template';
                        onLoad = null;
                        if (!(templateUrl === null)) return [3, 2];
                        _a = null;
                        return [3, 4];
                    case 2: return [4, this.Application.Server.GetViewHTML(templateUrl)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        templateUrlContent = _a;
                        templateContent = templateUrlContent === null ? null : this.Application.Parser.ParseDocumentContent(templateUrlContent);
                        if (templateContent !== null) {
                            windowsDid.append(templateContent);
                            windowElement = windowsDid.children().last();
                            windowElementTemplateJQuery = windowElement.find("div[d-template='" + template + "']");
                            if (windowElementTemplateJQuery.length === 0) {
                                windowElement.html(content);
                            }
                            else {
                                windowElementTemplateJQuery.html(content);
                                elTemplate = windowElementTemplateJQuery[0];
                                onLoad = elTemplate.getAttribute('d-on-load');
                            }
                        }
                        else {
                            windowsDid.append(content);
                            windowElement = windowsDid.children().last();
                        }
                        elWindow = windowElement[0];
                        sector = this.Application.Document.GetSectorParent(elWindow);
                        elSector = elWindow.getAttribute('d-sector');
                        if (!(elSector === "@")) return [3, 6];
                        elSector = this.Application.Document.CreateGuid();
                        elWindow.setAttribute('d-sector', elSector);
                        return [4, this.Application.Document.AddSectorHierarchy(elSector, sector)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        window = new DrapoWindow();
                        window.Code = this.Application.Document.CreateGuid();
                        window.Did = did;
                        window.Uri = uri;
                        window.Element = windowElement[0];
                        this._windows.push(window);
                        return [4, this.Application.Document.ResolveWindow($(window.Element))];
                    case 7:
                        _b.sent();
                        if (!(onLoad != null)) return [3, 9];
                        return [4, this.Application.FunctionHandler.ResolveFunctionWithoutContext(elSector, elWindow, onLoad)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2];
                }
            });
        });
    };
    DrapoWindowHandler.prototype.IsWindowLoaded = function (uri, did) {
        for (var i = this._windows.length - 1; i >= 0; i--) {
            var window_1 = this._windows[i];
            if ((window_1.Did === did) && (window_1.Uri === uri))
                return (true);
        }
        return (false);
    };
    DrapoWindowHandler.prototype.CloseWindow = function (did, all, type) {
        return __awaiter(this, void 0, void 0, function () {
            var isTypeHidden, i, window_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._windows.length == 0)
                            return [2];
                        isTypeHidden = type === 'hidden';
                        i = this._windows.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3, 4];
                        window_2 = this._windows[i];
                        if ((did !== null) && (did !== '') && (window_2.Did !== did) && (window_2.Code !== did))
                            return [3, 3];
                        if ((isTypeHidden) && (window_2.Visible))
                            return [3, 3];
                        return [4, this.DestroyWindowElement(window_2)];
                    case 2:
                        _a.sent();
                        this._windows.splice(i, 1);
                        if (!all)
                            return [3, 4];
                        _a.label = 3;
                    case 3:
                        i--;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    DrapoWindowHandler.prototype.TryClose = function (window) {
        return __awaiter(this, void 0, void 0, function () {
            var parent, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parent = $(window.Element).parent();
                        if ((parent == null) || (parent.length == 0))
                            return [2];
                        return [4, this.DestroyWindowElement(window)];
                    case 1:
                        _a.sent();
                        for (i = this._windows.length - 1; i >= 0; i--) {
                            if (window !== this._windows[i])
                                continue;
                            this._windows.splice(i, 1);
                            break;
                        }
                        return [2];
                }
            });
        });
    };
    DrapoWindowHandler.prototype.DestroyWindowElement = function (window) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Document.RemoveElement(window.Element)];
                    case 1:
                        _a.sent();
                        return [4, this.Application.ComponentHandler.UnloadComponentInstancesDetachedFullCheck()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoWindowHandler.prototype.HideWindow = function (did, all) {
        return __awaiter(this, void 0, void 0, function () {
            var windowHidden, i, window_3;
            return __generator(this, function (_a) {
                if (this._windows.length == 0)
                    return [2];
                windowHidden = null;
                for (i = this._windows.length - 1; i >= 0; i--) {
                    window_3 = this._windows[i];
                    if ((did !== null) && (did !== '') && (window_3.Did !== did))
                        continue;
                    if (!window_3.Visible)
                        continue;
                    window_3.Visible = false;
                    windowHidden = window_3;
                    this.Application.Document.Hide($(window_3.Element));
                    if (!all)
                        break;
                }
                return [2, (windowHidden)];
            });
        });
    };
    DrapoWindowHandler.prototype.GetWindowDefinition = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var windows, i, window_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Config.GetSector("Windows")];
                    case 1:
                        windows = _a.sent();
                        if (windows === null)
                            return [2, (null)];
                        for (i = 0; i < windows.length; i++) {
                            window_4 = windows[i];
                            if (window_4.Name === name)
                                return [2, (window_4)];
                        }
                        return [2, (null)];
                }
            });
        });
    };
    DrapoWindowHandler.prototype.GetWindowByElement = function (el) {
        while (el !== null) {
            for (var i = this._windows.length - 1; i >= 0; i--) {
                var window_5 = this._windows[i];
                if (window_5.Element === el)
                    return (window_5);
            }
            el = el.parentElement;
        }
        return (null);
    };
    return DrapoWindowHandler;
}());
