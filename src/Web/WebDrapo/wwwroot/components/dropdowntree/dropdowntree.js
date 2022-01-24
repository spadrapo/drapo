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
function dropdowntreeConstructor(el, app) {
    return __awaiter(this, void 0, void 0, function () {
        var dropdowntree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dropdowntree = new DropDownTree(el, app);
                    return [4, dropdowntree.Initalize()];
                case 1:
                    _a.sent();
                    return [2, (dropdowntree)];
            }
        });
    });
}
var DropDownTree = (function () {
    function DropDownTree(el, app) {
        this.TYPE_INLINE = 'inline';
        this.LEFT = 37;
        this.RIGHT = 39;
        this.UP = 38;
        this.DOWN = 40;
        this.ENTER = 13;
        this.TAB = 9;
        this._el = null;
        this._state = 'closed';
        this._classOpen = null;
        this._classClose = null;
        this._classExpand = null;
        this._classCollapse = null;
        this._classNode = null;
        this._classSelected = null;
        this._classSelection = null;
        this._dataKey = null;
        this._sector = null;
        this._prefix = null;
        this._key = null;
        this._value = null;
        this._model = null;
        this._onModelChange = null;
        this._hierarchy = null;
        this._expanded = [];
        this._data = null;
        this._keySelected = null;
        this._isSearching = false;
        this._isNullable = false;
        this._isFirstOrDefault = false;
        this._isEnsureValidSelection = false;
        this._isFixed = null;
        this._valueText = null;
        this._watchText = null;
        this._viewtype = null;
        this._allowMustache = false;
        this._selectionIndex = null;
        this._hasHierarchy = true;
        this._modelNotify = true;
        this._multiselection = false;
        this._el = el;
        this._app = app;
    }
    DropDownTree.prototype.Initalize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sector, elButton, elTextArea, elList, eljButton, dropdowntree;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._classOpen = this._el.getAttribute('dc-classOpen');
                        this._classClose = this._el.getAttribute('dc-classClose');
                        this._classExpand = this._el.getAttribute('dc-classExpand');
                        this._classCollapse = this._el.getAttribute('dc-classCollapse');
                        this._classNode = this._el.getAttribute('dc-classNode');
                        this._classSelected = this._el.getAttribute('dc-classSelected');
                        this._classSelection = this._el.getAttribute('dc-classSelection');
                        this._dataKey = this._el.getAttribute("dc-dataKey");
                        this._prefix = this._el.getAttribute("dc-prefix");
                        this._key = this._el.getAttribute("dc-key");
                        this._value = this._el.getAttribute("dc-value");
                        this._hierarchy = this._el.getAttribute("dc-hierarchy");
                        this._model = this._el.getAttribute("dc-model");
                        this._onModelChange = this._el.getAttribute("dc-on-model-change");
                        this._isNullable = this._el.getAttribute("dc-nullable") === 'true';
                        this._isFirstOrDefault = this._el.getAttribute("dc-firstOrDefault") === 'true';
                        this._isEnsureValidSelection = this._el.getAttribute("dc-ensureValidSelection") === 'true';
                        sector = this._el.getAttribute("dc-sector");
                        this._sector = sector == '' ? this._app.Document.GetSector(this._el) : sector;
                        this._valueText = this._el.getAttribute("dc-valueText");
                        this._watchText = this._el.getAttribute("dc-watchText");
                        this._viewtype = this._el.getAttribute("dc-viewtype");
                        this._allowMustache = this._el.getAttribute("dc-allowMustache") === 'true';
                        this._modelNotify = this._el.getAttribute("dc-modelNotify") === 'true';
                        this._multiselection = this._el.getAttribute("dc-multiselection") === 'true';
                        elButton = this.GetElementButton(this._el);
                        elTextArea = this.GetElementText(this._el);
                        elList = this.GetElementList(this._el);
                        eljButton = $(elButton);
                        eljButton.addClass(this._classOpen);
                        dropdowntree = this;
                        document.addEventListener('mouseup', function (evt) { dropdowntree.HandleDocumentMouseUp(evt); }, false);
                        window.addEventListener('scroll', function (evt) { dropdowntree.HandleDocumentScroll(evt); }, true);
                        elButton.addEventListener('click', function (evt) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, dropdowntree.HandleButtonClick(evt)];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        }); }); }, false);
                        elTextArea.addEventListener('click', function (evt) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, dropdowntree.HandleTextClick(evt)];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        }); }); }, false);
                        elTextArea.addEventListener('focus', function (evt) { dropdowntree.HandleTextFocus(evt); }, false);
                        elTextArea.addEventListener('blur', function (evt) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, dropdowntree.HandleTextBlur(evt)];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        }); }); }, false);
                        if (!this._multiselection) {
                            elTextArea.addEventListener('keyup', function (evt) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, dropdowntree.HandleTextKeyUp(evt)];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            }); }); }, false);
                            elTextArea.addEventListener('keydown', function (evt) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, dropdowntree.HandleTextKeyDown(evt)];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            }); }); }, false);
                        }
                        elList.addEventListener('click', function (evt) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, dropdowntree.HandleListClick(evt)];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        }); }); }, false);
                        if (this._multiselection)
                            elTextArea.readOnly = true;
                        if ((this._watchText != null) && (this._watchText != ''))
                            this._app.Observer.SubscribeComponent(this._watchText, this._el, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, dropdowntree.WatchText()];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            }); }); });
                        if (!(this._viewtype === this.TYPE_INLINE)) return [3, 3];
                        this._el.addEventListener('keyup', function (evt) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, dropdowntree.HandleListKeyUp(evt)];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        }); }); }, false);
                        elButton.style.display = 'none';
                        elTextArea.style.display = 'none';
                        return [4, this.EnsureModelData()];
                    case 1:
                        _a.sent();
                        return [4, this.ActionOpen()];
                    case 2:
                        _a.sent();
                        return [3, 5];
                    case 3: return [4, this.FillText()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this._app.Observer.SubscribeComponent(this._model, this._el, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, dropdowntree.HandleDataSelectionChanged()];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        }); }); }, elTextArea);
                        this._app.Observer.SubscribeComponent(this._dataKey, this._el, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, dropdowntree.HandleDataSourceChanged()];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        }); }); });
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.GetElementText = function (el) {
        return el.children[0];
    };
    DropDownTree.prototype.GetElementButton = function (el) {
        return el.children[1];
    };
    DropDownTree.prototype.GetElementList = function (el) {
        return el.children[2];
    };
    DropDownTree.prototype.HandleButtonClick = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        state = this._state;
                        if (!(state === 'closed')) return [3, 4];
                        return [4, this.ActionOpen()];
                    case 1:
                        _a.sent();
                        if (!this._allowMustache) return [3, 3];
                        return [4, this._app.Document.ResolveComponentUpdate(this._el, null)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3, 5];
                    case 4:
                        this.ActionClose();
                        _a.label = 5;
                    case 5: return [2];
                }
            });
        });
    };
    DropDownTree.prototype.HandleDocumentMouseUp = function (evt) {
        var el = this._el;
        var elTarget = evt.target;
        while ((elTarget != null) && (elTarget != el))
            elTarget = elTarget.parentElement;
        if (elTarget == el)
            return;
        this.ActionClose();
    };
    DropDownTree.prototype.HandleDocumentScroll = function (evt) {
        var el = this._el;
        var elTarget = evt.target;
        while ((elTarget != null) && (elTarget != el))
            elTarget = elTarget.parentElement;
        if (elTarget == el)
            return;
        this.ActionClose();
    };
    DropDownTree.prototype.HandleTextClick = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ActionOpen()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.HandleTextFocus = function (evt) {
        var elText = this.GetElementText(this._el);
        if (!this._multiselection)
            elText.select();
    };
    DropDownTree.prototype.HandleTextBlur = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var el, elTarget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        el = this._el;
                        elTarget = evt.relatedTarget;
                        while ((elTarget != null) && (elTarget != el))
                            elTarget = elTarget.parentElement;
                        if (elTarget == el)
                            return [2];
                        return [4, this.ActionFinish()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.HandleTextKeyUp = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var keycode, elText, list, key, value, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keycode = evt.which;
                        elText = this.GetElementText(this._el);
                        if (keycode == this.TAB || keycode == this.LEFT || keycode == this.RIGHT) {
                            return [2];
                        }
                        if (!(keycode == this.ENTER)) return [3, 4];
                        return [4, this.ActionFinish()];
                    case 1:
                        _a.sent();
                        event.preventDefault();
                        event.stopPropagation();
                        if (!this._isSearching) return [3, 3];
                        this._isSearching = false;
                        list = this.GetElementList(this._el);
                        key = list.firstElementChild.getAttribute('key');
                        if (!(key != null)) return [3, 3];
                        return [4, this.ActionSelect(key)];
                    case 2:
                        _a.sent();
                        return [2];
                    case 3:
                        elText.select();
                        return [2];
                    case 4:
                        value = elText.value;
                        if (!(value.length > 2)) return [3, 6];
                        return [4, this.FillListSearch(value)];
                    case 5:
                        _a.sent();
                        return [3, 8];
                    case 6:
                        if (!(value.length == 0)) return [3, 8];
                        return [4, this.FillListTree(true)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!this._allowMustache) return [3, 10];
                        list = this.GetElementList(this._el);
                        return [4, this._app.Document.ResolveComponentUpdate(list, null)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2];
                }
            });
        });
    };
    DropDownTree.prototype.HandleListKeyUp = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var keyCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keyCode = evt.which;
                        if (!(keyCode == this.DOWN)) return [3, 1];
                        this.ChangeSelectionDown();
                        return [3, 8];
                    case 1:
                        if (!(keyCode == this.UP)) return [3, 2];
                        this.ChangeSelectionUp();
                        return [3, 8];
                    case 2:
                        if (!(keyCode == this.ENTER)) return [3, 4];
                        return [4, this.ApplySelection()];
                    case 3:
                        _a.sent();
                        return [3, 8];
                    case 4:
                        if (!(keyCode == this.RIGHT)) return [3, 6];
                        return [4, this.ChangeSelectionExpand()];
                    case 5:
                        _a.sent();
                        return [3, 8];
                    case 6:
                        if (!(keyCode == this.LEFT)) return [3, 8];
                        return [4, this.ChangeSelectionCollapse()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2];
                }
            });
        });
    };
    DropDownTree.prototype.HandleTextKeyDown = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ActionOpen()];
                    case 1:
                        _a.sent();
                        if (evt.which == 13) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.HandleListClick = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var elTarget, exp, elcTarget, key, el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elTarget = evt.target;
                        exp = elTarget.getAttribute('exp');
                        if (!(exp != null)) return [3, 2];
                        return [4, this.SwitchExpanded(exp)];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        elcTarget = evt.currentTarget;
                        key = null;
                        el = elTarget;
                        while (el != null) {
                            if (el == elcTarget)
                                break;
                            key = el.getAttribute('key');
                            if (key != null)
                                break;
                            el = el.parentElement;
                        }
                        if (!(key != null)) return [3, 4];
                        return [4, this.ActionSelect(key)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DropDownTree.prototype.HandleDataSourceChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._data = null;
                        this._keySelected = null;
                        return [4, this.FillText()];
                    case 1:
                        _a.sent();
                        return [4, this.ReloadList()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.HandleDataSelectionChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._keySelected = null;
                        return [4, this.FillText()];
                    case 1:
                        _a.sent();
                        return [4, this.ReloadList()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.IsFixed = function () {
        if (this._isFixed === null) {
            var el = this._el;
            var elList = this.GetElementList(el);
            var style = window.getComputedStyle(elList);
            var position = style.getPropertyValue('position');
            this._isFixed = position === 'fixed';
        }
        return (this._isFixed);
    };
    DropDownTree.prototype.GetElementListTop = function () {
        var el = this._el;
        var elRect = el.getBoundingClientRect();
        return (elRect.top + elRect.height);
    };
    DropDownTree.prototype.GetElementListWidth = function () {
        var el = this._el;
        var elRect = el.getBoundingClientRect();
        return (elRect.width);
    };
    DropDownTree.prototype.ActionOpen = function () {
        return __awaiter(this, void 0, void 0, function () {
            var el, elj, elButton, eljButton, elList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        el = this._el;
                        if (this._state === 'opened')
                            return [2];
                        this._state = 'opened';
                        return [4, this.FillListTree()];
                    case 1:
                        _a.sent();
                        elj = $(this.GetElementText(el));
                        elj.addClass('buttonFocus');
                        elButton = this.GetElementButton(el);
                        eljButton = $(elButton);
                        eljButton.removeClass(this._classOpen);
                        eljButton.addClass(this._classClose);
                        elList = this.GetElementList(el);
                        if (this.IsFixed()) {
                            elList.style.top = this.GetElementListTop() + 'px';
                            elList.style.width = this.GetElementListWidth() + 'px';
                        }
                        elList.style.display = '';
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.CanClose = function () {
        return (this._viewtype !== this.TYPE_INLINE);
    };
    DropDownTree.prototype.ActionClose = function () {
        if (!this.CanClose())
            return;
        var el = this._el;
        if (this._state === 'closed')
            return;
        this._state = 'closed';
        var elj = $(this.GetElementText(el));
        elj.removeClass('buttonFocus');
        var elButton = this.GetElementButton(el);
        var eljButton = $(elButton);
        eljButton.removeClass(this._classClose);
        eljButton.addClass(this._classOpen);
        var elList = this.GetElementList(el);
        elList.style.display = 'none';
    };
    DropDownTree.prototype.ActionFinish = function () {
        return __awaiter(this, void 0, void 0, function () {
            var elText, value, key, valueKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        elText = this.GetElementText(this._el);
                        value = elText.value;
                        return [4, this.GetKey(value)];
                    case 1:
                        key = _a.sent();
                        if (!!this._multiselection) return [3, 7];
                        if (!(key === null)) return [3, 5];
                        return [4, this.GetValue(this._keySelected)];
                    case 2:
                        valueKey = _a.sent();
                        if (!(this._allowMustache && this._app.Parser.IsMustache(valueKey))) return [3, 4];
                        return [4, this._app.Storage.RetrieveDataValue(this._sector, valueKey)];
                    case 3:
                        valueKey = _a.sent();
                        _a.label = 4;
                    case 4:
                        elText.value = valueKey != null ? valueKey : '';
                        return [3, 7];
                    case 5: return [4, this.UpdateModelData(key)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        this.ActionClose();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.ActionSelect = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._multiselection)
                            this.ActionClose();
                        return [4, this.UpdateModelData(key)];
                    case 1:
                        _a.sent();
                        return [4, this.FillText()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.GetData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, mustache, dataPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._data === null)) return [3, 2];
                        return [4, this._app.Storage.RetrieveData(this._dataKey, this._sector)];
                    case 1:
                        data = _a.sent();
                        if (this._prefix != null) {
                            mustache = '{{' + this._dataKey + '.' + this._prefix + '}}';
                            dataPath = this._app.Parser.ParseMustache(mustache);
                            this._data = this._app.Solver.ResolveDataObjectPathObject(data, dataPath);
                        }
                        else {
                            this._data = data;
                        }
                        this._hasHierarchy = this.HasDataHierarchy(this._data);
                        _a.label = 2;
                    case 2: return [2, (this._data)];
                }
            });
        });
    };
    DropDownTree.prototype.GetModelData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selections, _a, isKeyValid, datas, firstValue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this._multiselection) return [3, 2];
                        return [4, this._app.Storage.RetrieveDataValue(this._sector, this._model)];
                    case 1:
                        selections = _b.sent();
                        if (Array.isArray(selections))
                            return [2, (selections)];
                        return [2, ([])];
                    case 2:
                        if (!(this._keySelected === null)) return [3, 11];
                        _a = this;
                        return [4, this._app.Storage.RetrieveDataValue(this._sector, this._model)];
                    case 3:
                        _a._keySelected = _b.sent();
                        if (!(this._keySelected != null)) return [3, 11];
                        if (!((this._keySelected != '') && (this._isEnsureValidSelection))) return [3, 5];
                        return [4, this.IsKeyValid(this._keySelected)];
                    case 4:
                        isKeyValid = _b.sent();
                        if (!isKeyValid)
                            this._keySelected = '';
                        return [3, 7];
                    case 5: return [4, this.EnsureNodeVisible(this._keySelected)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        if (!((this._keySelected == '') && (this._isFirstOrDefault))) return [3, 11];
                        return [4, this.GetData()];
                    case 8:
                        datas = _b.sent();
                        return [4, this.GetFirstOrDefaultValue(datas)];
                    case 9:
                        firstValue = _b.sent();
                        return [4, this.UpdateModelData(firstValue)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: return [2, (this._keySelected)];
                }
            });
        });
    };
    DropDownTree.prototype.EnsureModelData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetModelData()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.GetDataKey = function (data) {
        if (this._key == '')
            return (data);
        var key = data[this._key];
        if ((key == null))
            return ('');
        return (key);
    };
    DropDownTree.prototype.GetDataValue = function (data) {
        if (this._value == '')
            return (data);
        var value = data[this._value];
        if ((value == null))
            return ('');
        return (value);
    };
    DropDownTree.prototype.GetDataHierarchy = function (data) {
        var datas = data[this._hierarchy];
        if ((datas == null) || (datas.length == null) || (datas.length == 0))
            return (null);
        return (datas);
    };
    DropDownTree.prototype.IsKeyValid = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetValue(key)];
                    case 1:
                        value = _a.sent();
                        return [2, (value !== null)];
                }
            });
        });
    };
    DropDownTree.prototype.GetValue = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var data, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetData()];
                    case 1:
                        data = _a.sent();
                        value = this.GetValueInternal(key, data);
                        return [2, (value)];
                }
            });
        });
    };
    DropDownTree.prototype.GetValueInternal = function (key, datas) {
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var nodeKey = this.GetDataKey(data);
            if ((((nodeKey === "0") || (nodeKey === "")) && (nodeKey === key.toString())) || ((nodeKey !== "0") && (nodeKey !== "") && (nodeKey == key)))
                return (this.GetDataValue(data));
            var dataHierarchy = this.GetDataHierarchy(data);
            if (dataHierarchy == null)
                continue;
            var dataHierarchyKey = this.GetValueInternal(key, dataHierarchy);
            if (dataHierarchyKey != null)
                return (dataHierarchyKey);
        }
        return (null);
    };
    DropDownTree.prototype.GetKey = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var data, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetData()];
                    case 1:
                        data = _a.sent();
                        key = this.GetKeyInternal(value, data);
                        return [2, (key)];
                }
            });
        });
    };
    DropDownTree.prototype.GetKeyInternal = function (value, datas) {
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var nodeValue = this.GetDataValue(data);
            if ((((nodeValue === "0") || (nodeValue === "")) && (nodeValue === value.toString())) || ((nodeValue !== "0") && (nodeValue !== "") && (nodeValue == value)))
                return (this.GetDataKey(data));
            var dataHierarchy = this.GetDataHierarchy(data);
            if (dataHierarchy == null)
                continue;
            var dataHierarchyValue = this.GetKeyInternal(value, dataHierarchy);
            if (dataHierarchyValue != null)
                return (dataHierarchyValue);
        }
        return (null);
    };
    DropDownTree.prototype.IsNodeExpanded = function (id) {
        for (var i = 0; i < this._expanded.length; i++)
            if (this._expanded[i] == id)
                return (true);
        return (false);
    };
    DropDownTree.prototype.IsNodeMatch = function (search, value) {
        if (search == null)
            return (true);
        return (value.toLowerCase().indexOf(search) >= 0);
    };
    DropDownTree.prototype.SwitchExpanded = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var found, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        found = false;
                        for (i = this._expanded.length - 1; i >= 0; i--) {
                            if (this._expanded[i] != id)
                                continue;
                            this._expanded.splice(i, 1);
                            found = true;
                            break;
                        }
                        if (!found)
                            this._expanded.push(id);
                        return [4, this.FillListTree(true)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.GetFirstOrDefaultValue = function (datas) {
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var nodeKey = this.GetDataKey(data);
            if (nodeKey !== '')
                return nodeKey;
        }
        return '';
    };
    DropDownTree.prototype.EnsureNodeVisible = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var data, parentKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._expanded = [];
                        return [4, this.GetData()];
                    case 1:
                        data = _a.sent();
                        parentKey = key;
                        while (parentKey = this.GetKeyParent(parentKey, null, data))
                            this._expanded.push(parentKey);
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.GetKeyParent = function (key, parentKey, datas) {
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            var nodeKey = this.GetDataKey(data);
            if ((((nodeKey === "0") || (nodeKey === "")) && (nodeKey === key.toString())) || ((nodeKey !== "0") && (nodeKey !== "") && (nodeKey == key))) {
                return (parentKey);
            }
            var dataHierarchy = this.GetDataHierarchy(data);
            if (dataHierarchy == null)
                continue;
            var parentKeyChild = this.GetKeyParent(key, nodeKey, dataHierarchy);
            if (parentKeyChild !== null)
                return (parentKeyChild);
        }
        return (null);
    };
    DropDownTree.prototype.WatchText = function () {
        return __awaiter(this, void 0, void 0, function () {
            var text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._app.Storage.RetrieveDataValue(this._sector, this._watchText)];
                    case 1:
                        text = _a.sent();
                        return [4, this.FillListSearch(text)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.FillText = function (key) {
        if (key === void 0) { key = null; }
        return __awaiter(this, void 0, void 0, function () {
            var el, elText, keySelected, _a, value, i, valueSelected;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        el = this._el;
                        elText = this.GetElementText(el);
                        if (!((key == null) || (this._multiselection))) return [3, 2];
                        return [4, this.GetModelData()];
                    case 1:
                        _a = _b.sent();
                        return [3, 3];
                    case 2:
                        _a = key;
                        _b.label = 3;
                    case 3:
                        keySelected = _a;
                        value = null;
                        if (!Array.isArray(keySelected)) return [3, 8];
                        value = '';
                        i = 0;
                        _b.label = 4;
                    case 4:
                        if (!(i < keySelected.length)) return [3, 7];
                        return [4, this.GetValue(keySelected[i])];
                    case 5:
                        valueSelected = _b.sent();
                        if (valueSelected == null)
                            return [3, 6];
                        if (value.length > 0)
                            value = value + ', ';
                        value = value + valueSelected;
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3, 4];
                    case 7: return [3, 11];
                    case 8:
                        if ((keySelected == null) || (keySelected === '')) {
                            elText.value = '';
                            elText.setAttribute('title', '');
                            return [2];
                        }
                        return [4, this.GetValue(keySelected)];
                    case 9:
                        value = _b.sent();
                        if (!(this._allowMustache && this._app.Parser.IsMustache(value))) return [3, 11];
                        return [4, this._app.Storage.RetrieveDataValue(this._sector, value)];
                    case 10:
                        value = _b.sent();
                        _b.label = 11;
                    case 11:
                        elText.value = value !== null && value !== void 0 ? value : '';
                        elText.setAttribute('title', value !== null && value !== void 0 ? value : '');
                        return [4, this.SetValueText()];
                    case 12:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.ClearList = function (list) {
        list.innerHTML = '';
        this._selectionIndex = null;
    };
    DropDownTree.prototype.ReloadList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var el, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        el = this._el;
                        list = this.GetElementList(el);
                        this.ClearList(list);
                        this._data = null;
                        return [4, this.FillListTree(true)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.FillListTree = function (forced) {
        if (forced === void 0) { forced = false; }
        return __awaiter(this, void 0, void 0, function () {
            var el, list, data, modelData, fragment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._isSearching = false;
                        el = this._el;
                        list = this.GetElementList(el);
                        if ((!forced) && (list.childNodes.length > 0))
                            return [2];
                        return [4, this.GetData()];
                    case 1:
                        data = _a.sent();
                        return [4, this.GetModelData()];
                    case 2:
                        modelData = _a.sent();
                        fragment = document.createDocumentFragment();
                        if (this._isNullable)
                            fragment.appendChild(this.CreateNode('', ''));
                        this.AppendNodes(fragment, data, modelData, 0, true, null);
                        this.ClearList(list);
                        list.appendChild(fragment);
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.FillListSearch = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            var el, list, data, modelData, fragment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._isSearching = true;
                        el = this._el;
                        list = this.GetElementList(el);
                        return [4, this.GetData()];
                    case 1:
                        data = _a.sent();
                        return [4, this.GetModelData()];
                    case 2:
                        modelData = _a.sent();
                        fragment = document.createDocumentFragment();
                        if (search == '')
                            this.AppendNodes(fragment, data, modelData, 0, true, null);
                        else
                            this.AppendNodes(fragment, data, modelData, 0, false, search.toLowerCase());
                        this.ClearList(list);
                        list.appendChild(fragment);
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.AppendNodes = function (parent, data, modelData, level, isTree, search) {
        for (var i = 0; i < data.length; i++)
            this.AppendNode(parent, data[i], modelData, level, isTree, search);
    };
    DropDownTree.prototype.AppendNode = function (parent, data, modelData, level, isTree, search) {
        if (modelData === void 0) { modelData = null; }
        var nodeKey = this.GetDataKey(data);
        var nodeValue = this.GetDataValue(data);
        var dataHierarchy = this.GetDataHierarchy(data);
        var isExpanded = this.IsNodeExpanded(nodeKey);
        if (this.IsNodeMatch(search, nodeValue)) {
            var elNode = this.CreateNode(nodeKey, nodeValue, isTree, dataHierarchy, level, isExpanded, modelData);
            parent.appendChild(elNode);
        }
        if ((dataHierarchy == null) || ((!isExpanded) && (isTree)))
            return;
        this.AppendNodes(parent, dataHierarchy, modelData, level + (isTree ? 1 : 0), isTree, search);
    };
    DropDownTree.prototype.CreateNode = function (nodeKey, nodeValue, isTree, dataHierarchy, level, isExpanded, modelData) {
        if (isTree === void 0) { isTree = false; }
        if (dataHierarchy === void 0) { dataHierarchy = null; }
        if (level === void 0) { level = 0; }
        if (isExpanded === void 0) { isExpanded = false; }
        if (modelData === void 0) { modelData = null; }
        var elNode = document.createElement('div');
        elNode.setAttribute('key', nodeKey);
        var classNode = '';
        if (this._classNode != null)
            classNode = this._classNode;
        if (nodeKey == this._keySelected)
            classNode = classNode + ' ' + this._classSelected;
        elNode.setAttribute('class', classNode);
        if (isTree) {
            var elLevel = document.createElement('div');
            for (var i = 0; i < level; i++) {
                var elLevelNode = document.createElement('div');
                elLevel.appendChild(elLevelNode);
            }
            elNode.appendChild(elLevel);
            if (this._hasHierarchy) {
                var elExpandable = document.createElement('div');
                if (dataHierarchy != null) {
                    var elImageExpandable = document.createElement('span');
                    var classExpandable = 'pp ' + (isExpanded ? this._classCollapse : this._classExpand);
                    elImageExpandable.setAttribute('class', classExpandable);
                    elImageExpandable.setAttribute('exp', nodeKey);
                    elExpandable.appendChild(elImageExpandable);
                }
                elLevel.appendChild(elExpandable);
            }
        }
        if (this._multiselection) {
            var elNodeCheckbox = document.createElement('span');
            var isSelected = ((modelData != null) && (Array.isArray(modelData)) && ((modelData.indexOf(nodeKey) >= 0)));
            if (isSelected)
                elNodeCheckbox.setAttribute('class', 'suMultiselectionCheckbox pp suMultiselectionCheckboxSelected');
            else
                elNodeCheckbox.setAttribute('class', 'suMultiselectionCheckbox');
            elNode.appendChild(elNodeCheckbox);
        }
        var elNodeText = document.createElement('span');
        elNodeText.setAttribute('title', nodeValue);
        if (this._allowMustache && this._app.Parser.IsMustache(nodeValue)) {
            elNodeText.setAttribute('d-model', nodeValue);
        }
        else {
            elNodeText.textContent = nodeValue;
            elNodeText.innerText = nodeValue;
        }
        elNode.appendChild(elNodeText);
        return (elNode);
    };
    DropDownTree.prototype.GetNodeByKey = function (key) {
        var list = this.GetElementList(this._el);
        for (var i = 0; i < list.children.length; i++) {
            var node = list.children[i];
            var nodeKey = node.getAttribute('key');
            if (nodeKey === key)
                return (node);
        }
        return (null);
    };
    DropDownTree.prototype.HasDataHierarchy = function (data) {
        for (var i = 0; i < data.length; i++) {
            var datum = data[i][this._hierarchy];
            if ((datum != null) && (datum.length > 0))
                return (true);
        }
        return (false);
    };
    DropDownTree.prototype.UpdateModelData = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var node, checkbox, selections, isSelected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._multiselection) return [3, 3];
                        node = this.GetNodeByKey(key);
                        checkbox = node.children[1];
                        return [4, this.GetModelData()];
                    case 1:
                        selections = _a.sent();
                        isSelected = (Array.isArray(selections) && (selections.indexOf(key) >= 0));
                        if (!isSelected)
                            checkbox.setAttribute('class', 'suMultiselectionCheckbox pp suMultiselectionCheckboxSelected');
                        else
                            checkbox.setAttribute('class', 'suMultiselectionCheckbox');
                        return [4, this._app.FunctionHandler.ResolveFunctionWithoutContext(this._sector, this._el, 'ToggleData(' + this._model + ',' + key + ',' + this._modelNotify + ')')];
                    case 2:
                        _a.sent();
                        return [3, 6];
                    case 3:
                        if (this._keySelected === key)
                            return [2];
                        this._keySelected = key;
                        return [4, this.SetValueText()];
                    case 4:
                        _a.sent();
                        return [4, this._app.FunctionHandler.ResolveFunctionWithoutContext(this._sector, this._el, 'UpdateItemField(' + this._model + ',' + key + ',' + this._modelNotify + ')')];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (this._onModelChange == null)
                            return [2];
                        return [4, this._app.FunctionHandler.ResolveFunctionWithoutContext(this._sector, this._el, this._onModelChange)];
                    case 7:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.SetValueText = function () {
        return __awaiter(this, void 0, void 0, function () {
            var valueKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._valueText) return [3, 3];
                        return [4, this.GetValue(this._keySelected)];
                    case 1:
                        valueKey = _a.sent();
                        if (valueKey == null)
                            return [2];
                        return [4, this._app.FunctionHandler.ResolveFunctionWithoutContext(this._sector, this._el, 'UpdateItemField(' + this._valueText + ',' + valueKey + ',true,false,false)')];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    DropDownTree.prototype.ApplySelection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list, elSelection, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._selectionIndex == null)
                            return [2, (false)];
                        list = this.GetElementList(this._el);
                        elSelection = list.children[this._selectionIndex];
                        key = elSelection.getAttribute('key');
                        this._selectionIndex = null;
                        return [4, this.ActionSelect(key)];
                    case 1:
                        _a.sent();
                        return [2, (true)];
                }
            });
        });
    };
    DropDownTree.prototype.ChangeSelectionDown = function () {
        var selectionPrevious = this._selectionIndex;
        var selectionNext = selectionPrevious == null ? 0 : selectionPrevious + 1;
        var list = this.GetElementList(this._el);
        if (selectionNext >= list.children.length)
            return;
        var elPrevious = selectionPrevious != null ? list.children[selectionPrevious] : null;
        if (elPrevious != null)
            this.RemoveClassSelection(elPrevious);
        var elNext = list.children[selectionNext];
        this.AddClassSelection(elNext);
        this._selectionIndex = selectionNext;
    };
    DropDownTree.prototype.ChangeSelectionUp = function () {
        var selectionPrevious = this._selectionIndex;
        if ((selectionPrevious == null) || (selectionPrevious == 0))
            return;
        var selectionNext = selectionPrevious - 1;
        var list = this.GetElementList(this._el);
        var elPrevious = selectionPrevious != null ? list.children[selectionPrevious] : null;
        if (elPrevious != null)
            this.RemoveClassSelection(elPrevious);
        var elNext = list.children[selectionNext];
        this.AddClassSelection(elNext);
        this._selectionIndex = selectionNext;
    };
    DropDownTree.prototype.ChangeSelectionExpand = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectionIndex, list, elSelection, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._isSearching)
                            return [2];
                        selectionIndex = this._selectionIndex;
                        if (selectionIndex == null)
                            return [2];
                        list = this.GetElementList(this._el);
                        elSelection = list.children[selectionIndex];
                        key = elSelection.getAttribute('key');
                        if (this.IsNodeExpanded(key))
                            return [2];
                        return [4, this.SwitchExpanded(key)];
                    case 1:
                        _a.sent();
                        elSelection = list.children[selectionIndex];
                        this.AddClassSelection(elSelection);
                        this._selectionIndex = selectionIndex;
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.ChangeSelectionCollapse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectionIndex, list, elSelection, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._isSearching)
                            return [2];
                        selectionIndex = this._selectionIndex;
                        if (selectionIndex == null)
                            return [2];
                        list = this.GetElementList(this._el);
                        elSelection = list.children[selectionIndex];
                        key = elSelection.getAttribute('key');
                        if (!this.IsNodeExpanded(key))
                            return [2];
                        return [4, this.SwitchExpanded(key)];
                    case 1:
                        _a.sent();
                        elSelection = list.children[selectionIndex];
                        this.AddClassSelection(elSelection);
                        this._selectionIndex = selectionIndex;
                        return [2];
                }
            });
        });
    };
    DropDownTree.prototype.AddClassSelection = function (el) {
        var classCurrent = el.getAttribute('class');
        if (classCurrent.indexOf(this._classSelection) >= 0)
            return;
        el.setAttribute('class', classCurrent + ' ' + this._classSelection);
    };
    DropDownTree.prototype.RemoveClassSelection = function (el) {
        var classCurrent = el.getAttribute('class');
        if (classCurrent.indexOf(this._classSelection) < 0)
            return;
        el.setAttribute('class', classCurrent.replace(this._classSelection, ''));
    };
    return DropDownTree;
}());
