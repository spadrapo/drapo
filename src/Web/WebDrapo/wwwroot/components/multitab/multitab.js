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
function multitabConstructor(el, app) {
    return __awaiter(this, void 0, void 0, function () {
        var multitab;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    multitab = new MultiTab(el, app);
                    return [4, multitab.Initialize()];
                case 1:
                    _a.sent();
                    return [2, multitab];
            }
        });
    });
}
var MultiTab = (function () {
    function MultiTab(el, app) {
        this._el = null;
        this._selectedTabIndex = null;
        this._el = el;
        this._app = app;
    }
    Object.defineProperty(MultiTab.prototype, "Application", {
        get: function () {
            return (this._app);
        },
        enumerable: true,
        configurable: true
    });
    MultiTab.prototype.Initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._selectedTabIndex = Number.parseInt(this._el.getAttribute('dc-selectedTabIndex'));
                        return [4, this.Fill()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    MultiTab.prototype.GetInternalElementContent = function () {
        return this._el.children[0].children[1];
    };
    MultiTab.prototype.GetElementContainerTabs = function () {
        return this._el.children[1];
    };
    MultiTab.prototype.GetElementContentTab = function () {
        return this._el.children[2];
    };
    MultiTab.prototype.Fill = function () {
        return __awaiter(this, void 0, void 0, function () {
            var multitab, elInternal, elContainerTabs, fragment, i, elTab, model, icon, url, div, spanIcon, spanLabel;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        multitab = this;
                        elInternal = this.GetInternalElementContent();
                        elContainerTabs = this.GetElementContainerTabs();
                        elContainerTabs.addEventListener('mouseup', function (evt) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, multitab.HandleTabMouseUp(evt)];
                                case 1: return [2, _a.sent()];
                            }
                        }); }); }, false);
                        fragment = document.createDocumentFragment();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < elInternal.children.length)) return [3, 6];
                        elTab = elInternal.children[i];
                        model = elTab.getAttribute("label");
                        icon = elTab.getAttribute("icon");
                        url = elTab.getAttribute("url");
                        div = document.createElement("div");
                        div.setAttribute("url", url);
                        if (!(i === this._selectedTabIndex)) return [3, 3];
                        this.SetSelected(div);
                        return [4, this.LoadContent(div)];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        this.SetDefault(div);
                        _a.label = 4;
                    case 4:
                        spanIcon = document.createElement("span");
                        spanIcon.setAttribute("class", icon);
                        div.appendChild(spanIcon);
                        spanLabel = document.createElement("span");
                        if (i === this._selectedTabIndex)
                            spanLabel.setAttribute("class", "suTabSectorTitle suTabSectorSelected");
                        else
                            spanLabel.setAttribute("class", "suTabSectorTitle");
                        if (model)
                            spanLabel.setAttribute("d-model", model);
                        div.appendChild(spanLabel);
                        fragment.appendChild(div);
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 1];
                    case 6:
                        elContainerTabs.appendChild(fragment);
                        return [2];
                }
            });
        });
    };
    MultiTab.prototype.HandleTabMouseUp = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var target, divs, i, div, spanLabel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = evt.target;
                        return [4, this.LoadContent(target.parentElement)];
                    case 1:
                        _a.sent();
                        divs = target.parentElement.parentElement.children;
                        for (i = 0; i < divs.length; i++) {
                            div = divs[i];
                            spanLabel = divs[i].children[1];
                            div.removeAttribute("class");
                            spanLabel.removeAttribute("class");
                            if (div == target.parentElement) {
                                this.SetSelected(div);
                                this.SetTabSelected(spanLabel);
                            }
                            else {
                                this.SetDefault(div);
                                this.SetTabDefault(spanLabel);
                            }
                        }
                        return [2];
                }
            });
        });
    };
    MultiTab.prototype.LoadContent = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var url, html, content, div;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = target.getAttribute("url");
                        return [4, this.Application.Server.GetViewHTML(url)];
                    case 1:
                        html = _a.sent();
                        content = this.Application.Parser.ParseDocumentContent(html);
                        div = this.GetElementContentTab();
                        div.innerHTML = content;
                        this.Application.Document.ResolveComponentUpdate(div, null);
                        return [2];
                }
            });
        });
    };
    MultiTab.prototype.SetDefault = function (div) {
        div.setAttribute("class", "suMultitabTab");
    };
    MultiTab.prototype.SetSelected = function (div) {
        div.setAttribute("class", "suMultitabTab suMultitabTabActive");
    };
    MultiTab.prototype.SetTabDefault = function (spanLabel) {
        spanLabel.setAttribute("class", "suTabSectorTitle");
    };
    MultiTab.prototype.SetTabSelected = function (spanLabel) {
        spanLabel.setAttribute("class", "suTabSectorTitle suTabSectorSelected");
    };
    return MultiTab;
}());
