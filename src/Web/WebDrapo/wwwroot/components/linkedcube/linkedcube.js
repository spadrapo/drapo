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
function linkedcubeConstructor(el, app) {
    return __awaiter(this, void 0, void 0, function () {
        var instance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    instance = new LinkedCube(el, app);
                    return [4, instance.Initalize()];
                case 1:
                    _a.sent();
                    return [2, (instance)];
            }
        });
    });
}
var LinkedCube = (function () {
    function LinkedCube(el, app) {
        this._el = null;
        this._cube = null;
        this._el = el;
        this._app = app;
    }
    LinkedCube.prototype.Initalize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._cube = new DrapoLinkedCube();
                        type = this._el.getAttribute('dc-type');
                        if (!(type === 'add')) return [3, 10];
                        return [4, this.Add('p1', 'r1', 'c1', 'v1')];
                    case 1:
                        _a.sent();
                        return [4, this.Add('p1', 'r2', 'c1', 'v2')];
                    case 2:
                        _a.sent();
                        return [4, this.Add('p1', 'r2', 'c2', 'v3')];
                    case 3:
                        _a.sent();
                        return [4, this.Add('p1', 'r1', 'c3', 'v4')];
                    case 4:
                        _a.sent();
                        return [4, this.Add('p2', 'r2', 'c1', 'v5')];
                    case 5:
                        _a.sent();
                        return [4, this.Add('p3', 'r1', 'c1', 'v6')];
                    case 6:
                        _a.sent();
                        return [4, this.Add('p2', 'r1', 'c1', 'v7')];
                    case 7:
                        _a.sent();
                        return [4, this.Add('p2', 'r1', 'c2', 'v8')];
                    case 8:
                        _a.sent();
                        return [4, this.Add('p0', 'r1', 'c1', 'v9')];
                    case 9:
                        _a.sent();
                        return [3, 23];
                    case 10:
                        if (!(type === 'remove')) return [3, 23];
                        return [4, this.Add('p1', 'r1', 'c1', 'v1')];
                    case 11:
                        _a.sent();
                        return [4, this.Add('p1', 'r2', 'c1', 'v2')];
                    case 12:
                        _a.sent();
                        return [4, this.Add('p1', 'r2', 'c2', 'v3')];
                    case 13:
                        _a.sent();
                        return [4, this.Add('p1', 'r1', 'c3', 'v4')];
                    case 14:
                        _a.sent();
                        return [4, this.Add('p2', 'r2', 'c1', 'v5')];
                    case 15:
                        _a.sent();
                        return [4, this.Add('p3', 'r1', 'c1', 'v6')];
                    case 16:
                        _a.sent();
                        return [4, this.Add('p2', 'r1', 'c1', 'v7')];
                    case 17:
                        _a.sent();
                        return [4, this.Add('p2', 'r1', 'c2', 'v8')];
                    case 18:
                        _a.sent();
                        return [4, this.Add('p0', 'r1', 'c1', 'v9')];
                    case 19:
                        _a.sent();
                        return [4, this.Remove('p2', '', '')];
                    case 20:
                        _a.sent();
                        return [4, this.Remove('p1', 'r2', 'c1')];
                    case 21:
                        _a.sent();
                        return [4, this.Remove('p0', 'r1', '')];
                    case 22:
                        _a.sent();
                        _a.label = 23;
                    case 23: return [2];
                }
            });
        });
    };
    LinkedCube.prototype.GetElementCube = function () {
        return this._el.children[2];
    };
    LinkedCube.prototype.Add = function (page, row, column, value) {
        return __awaiter(this, void 0, void 0, function () {
            var context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = [page, row, column];
                        this._cube.AddOrUpdate(context, value);
                        return [4, this.Render()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    LinkedCube.prototype.Clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._cube.Clear();
                this.Render();
                return [2];
            });
        });
    };
    LinkedCube.prototype.Remove = function (page, row, column) {
        return __awaiter(this, void 0, void 0, function () {
            var context;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = [];
                        if (page != '')
                            context.push(page);
                        if (row != '')
                            context.push(row);
                        if (column != '')
                            context.push(column);
                        this._cube.Remove(context);
                        return [4, this.Render()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    LinkedCube.prototype.Render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var elCube, fragment, node;
            return __generator(this, function (_a) {
                elCube = this.GetElementCube();
                while (elCube.children.length > 0)
                    elCube.removeChild(elCube.children[0]);
                fragment = document.createDocumentFragment();
                node = this._cube.GetHead();
                this.InsertNodeElement(fragment, node, null, 0, 0);
                elCube.appendChild(fragment);
                return [2];
            });
        });
    };
    LinkedCube.prototype.InsertNodeElement = function (fragment, node, nodePrevious, index, identation) {
        var elDiv = document.createElement('div');
        var elSpan = document.createElement('span');
        elSpan.style.left = (identation * 20) + 'px';
        elSpan.textContent = this.CreateNodeText(node, nodePrevious, index);
        if (this.HasError(node, nodePrevious, index))
            elSpan.style.color = 'red';
        else
            elSpan.style.color = 'green';
        elDiv.appendChild(elSpan);
        fragment.appendChild(elDiv);
        if (node.Next === null)
            return;
        for (var i = node.Next.length - 1; i >= 0; i--) {
            var nodeNext = node.Next[i];
            if (nodeNext === null)
                continue;
            this.InsertNodeElement(fragment, nodeNext, node, i, i);
        }
    };
    LinkedCube.prototype.CreateNodeText = function (node, nodePrevious, index) {
        var text = '[' + this.CreateContextText(node.Context) + '] ' + node.Value;
        if (nodePrevious !== null) {
            text = text + ' : ' + index + ' <= (' + this.CreateContextText(nodePrevious.Context) + ')';
        }
        return (text);
    };
    LinkedCube.prototype.CreateContextText = function (context) {
        var text = '';
        for (var i = 0; i < context.length; i++) {
            if (i > 0)
                text = text + ',';
            text = text + context[i];
        }
        return (text);
    };
    LinkedCube.prototype.HasError = function (node, nodePrevious, index) {
        if (nodePrevious === null)
            return (false);
        for (var i = 0; i < index; i++) {
            if (node.Context[i] !== nodePrevious.Context[i])
                return (true);
        }
        return (false);
    };
    return LinkedCube;
}());
