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
var DrapoDebugger = (function () {
    function DrapoDebugger(application) {
        this._visible = false;
        this._active = false;
        this._sector = '__debugger';
        this.SESSION_STORAGE_KEY = 'drapoDebugger';
        this._application = application;
    }
    Object.defineProperty(DrapoDebugger.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDebugger.prototype, "Visible", {
        get: function () {
            return (this._visible);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DrapoDebugger.prototype, "Active", {
        get: function () {
            return (this._active);
        },
        enumerable: false,
        configurable: true
    });
    DrapoDebugger.prototype.ConnectDebugger = function () {
        return __awaiter(this, void 0, void 0, function () {
            var binder, application;
            return __generator(this, function (_a) {
                binder = $(document);
                application = this.Application;
                binder.bind('keyup.debugger', function (e) {
                    if (!e.ctrlKey)
                        return;
                    if (e.key !== 'F2')
                        return;
                    application.Debugger.ToogleDebugger();
                });
                return [2];
            });
        });
    };
    DrapoDebugger.prototype.Initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var debuggerPropertiesText, debuggerProperties;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        debuggerPropertiesText = window.sessionStorage.getItem(this.SESSION_STORAGE_KEY);
                        if (debuggerPropertiesText == null)
                            return [2];
                        debuggerProperties = this.Application.Serializer.Deserialize(debuggerPropertiesText);
                        return [4, this.Application.Storage.UpdateData('__debuggerProperties', null, debuggerProperties)];
                    case 1:
                        _a.sent();
                        this._active = true;
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.ToogleDebugger = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._visible)
                    return [2, (this.CloseDebugger())];
                else
                    return [2, (this.ShowDebugger())];
                return [2];
            });
        });
    };
    DrapoDebugger.prototype.ShowDebugger = function () {
        return __awaiter(this, void 0, void 0, function () {
            var eljSector, fragment, elSector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._visible)
                            return [2, (false)];
                        return [4, this.Application.Storage.UnloadData('__objects', '')];
                    case 1:
                        _a.sent();
                        eljSector = $("div[d-sector='" + this._sector + "']");
                        if (eljSector.length === 0) {
                            fragment = document.createDocumentFragment();
                            elSector = document.createElement('div');
                            elSector.setAttribute('d-sector', this._sector);
                            elSector.setAttribute('style', 'position:relative;z-index:99999');
                            fragment.appendChild(elSector);
                            document.body.appendChild(fragment);
                            eljSector = $(elSector);
                        }
                        this.Application.Document.StartUpdate(this._sector);
                        return [4, this.Application.Document.LoadChildSectorContent(this._sector, '<d-debugger></d-debugger>')];
                    case 2:
                        _a.sent();
                        this._visible = true;
                        this._active = true;
                        return [2, (true)];
                }
            });
        });
    };
    DrapoDebugger.prototype.CloseDebugger = function () {
        return __awaiter(this, void 0, void 0, function () {
            var eljSector;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._visible)
                            return [2, (false)];
                        this.Application.Document.StartUpdate(this._sector);
                        return [4, this.Application.Document.LoadChildSectorContent(this._sector, '')];
                    case 1:
                        _a.sent();
                        eljSector = $("div[d-sector='" + this._sector + "']");
                        eljSector.remove();
                        this._visible = false;
                        this._active = false;
                        return [2, (true)];
                }
            });
        });
    };
    DrapoDebugger.prototype.HasBreakpoint = function (sector, dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            var breakpoints, i, breakpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2, (false)];
                        return [4, this.Application.Storage.RetrieveData('__breakpoints', '')];
                    case 1:
                        breakpoints = _a.sent();
                        for (i = 0; i < breakpoints.length; i++) {
                            breakpoint = breakpoints[i];
                            if ((this.Application.Document.IsEqualSector(breakpoint.sector, sector)) && (breakpoint.datakey === dataKey))
                                return [2, (true)];
                        }
                        return [2, (false)];
                }
            });
        });
    };
    DrapoDebugger.prototype.ActivateBreakpoint = function (sector, dataKey, functionsValue, functionValue, label) {
        return __awaiter(this, void 0, void 0, function () {
            var isRunning;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2];
                        return [4, this.Application.Storage.SetDataKeyField('__runtime', '', ['sector'], sector, false)];
                    case 1:
                        _a.sent();
                        return [4, this.Application.Storage.SetDataKeyField('__runtime', '', ['datakey'], dataKey, false)];
                    case 2:
                        _a.sent();
                        return [4, this.Application.Storage.SetDataKeyField('__runtime', '', ['expression'], functionsValue, false)];
                    case 3:
                        _a.sent();
                        return [4, this.Application.Storage.SetDataKeyField('__runtime', '', ['functionValue'], functionValue, false)];
                    case 4:
                        _a.sent();
                        return [4, this.Application.Storage.SetDataKeyField('__runtime', '', ['label'], label, false)];
                    case 5:
                        _a.sent();
                        return [4, this.Application.Storage.SetDataKeyField('__runtime', '', ['running'], false, false)];
                    case 6:
                        _a.sent();
                        return [4, this.Application.Observer.Notify('__runtime', null, null)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!true) return [3, 12];
                        return [4, this.Application.Storage.ResolveMustaches('', '{{__runtime.running}}')];
                    case 9:
                        isRunning = _a.sent();
                        return [4, this.Application.Solver.ResolveConditional(isRunning)];
                    case 10:
                        if (_a.sent())
                            return [3, 12];
                        return [4, this.Application.Document.Sleep(1000)];
                    case 11:
                        _a.sent();
                        return [3, 8];
                    case 12: return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.CleanRuntime = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2];
                        return [4, this.Application.Storage.SetDataKeyField('__runtime', '', ['sector'], '', false)];
                    case 1:
                        _a.sent();
                        return [4, this.Application.Storage.SetDataKeyField('__runtime', '', ['datakey'], '', false)];
                    case 2:
                        _a.sent();
                        return [4, this.Application.Storage.SetDataKeyField('__runtime', '', ['expression'], '', false)];
                    case 3:
                        _a.sent();
                        return [4, this.Application.Storage.SetDataKeyField('__runtime', '', ['functionValue'], '', false)];
                    case 4:
                        _a.sent();
                        return [4, this.Application.Storage.SetDataKeyField('__runtime', '', ['label'], '', false)];
                    case 5:
                        _a.sent();
                        return [4, this.Application.Observer.Notify('__runtime', null, null)];
                    case 6:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.NotifySectors = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2];
                        return [4, this.Application.Storage.ReloadData('__sectors', '')];
                    case 1:
                        _a.sent();
                        return [4, this.Application.Storage.ReloadData('__objects', '')];
                    case 2:
                        _a.sent();
                        return [4, this.Application.Storage.ReloadData('__objectswatchsvalues', '')];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.NotifyStorage = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2];
                        if (this.Application.Document.IsHiddenKey(dataKey))
                            return [2];
                        return [4, this.Application.Storage.ReloadData('__objects', '')];
                    case 1:
                        _a.sent();
                        return [4, this.Application.Storage.ReloadData('__objectswatchsvalues', '')];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.NotifyComponents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2];
                        return [4, this.Application.Storage.ReloadData('__components', '')];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.AddNotify = function (dataKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2];
                        if (this.Application.Document.IsHiddenKey(dataKey))
                            return [2];
                        return [4, this.Application.Storage.AddDataItem('__notifys', null, '', dataKey)];
                    case 1:
                        _a.sent();
                        return [4, this.Application.Storage.ReloadData('__objectswatchsvalues', '')];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.AddPipe = function (pipe) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2];
                        if (this.Application.Document.IsHiddenKey(pipe))
                            return [2];
                        return [4, this.Application.Storage.AddDataItem('__pipes', null, '', pipe)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.AddFunction = function (functionParsed) {
        return __awaiter(this, void 0, void 0, function () {
            var functionText, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2];
                        if (this.Application.Document.IsHiddenKey(functionParsed.Name))
                            return [2];
                        functionText = functionParsed.Name + '(';
                        for (i = 0; i < functionParsed.Parameters.length; i++) {
                            if (i != 0)
                                functionText += ',';
                            functionText += functionParsed.Parameters[i];
                        }
                        functionText += ')';
                        return [4, this.Application.Storage.AddDataItem('__functions', null, '', functionText)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.AddError = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var lastError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2];
                        return [4, this.Application.Storage.GetDataItemLast('__errors', '')];
                    case 1:
                        lastError = _a.sent();
                        if (lastError == error)
                            return [2];
                        return [4, this.Application.Storage.AddDataItem('__errors', null, '', error)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.GetObjects = function () {
        return __awaiter(this, void 0, void 0, function () {
            var objectsExpanded, objects;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Storage.RetrieveData('__objectsexpanded', null)];
                    case 1:
                        objectsExpanded = _a.sent();
                        objects = [];
                        return [4, this.CreateObjectSector(objectsExpanded, objects, null, 'root')];
                    case 2:
                        _a.sent();
                        return [2, (objects)];
                }
            });
        });
    };
    DrapoDebugger.prototype.CreateObject = function (type, key, name, sector, objectsExpanded) {
        return __awaiter(this, void 0, void 0, function () {
            var object, i;
            return __generator(this, function (_a) {
                object = {};
                object.Type = type;
                object.Key = key;
                object.Code = type + '_' + key;
                object.Name = name != null ? name : key;
                object.Children = [];
                object.Sector = sector;
                object.Action = this.CreateObjectAction(type, key, name, sector);
                object.IsExpanded = false;
                if (objectsExpanded != null) {
                    for (i = 0; i < objectsExpanded.length; i++) {
                        if (objectsExpanded[i] != object.Code)
                            continue;
                        object.IsExpanded = true;
                        break;
                    }
                }
                return [2, (object)];
            });
        });
    };
    DrapoDebugger.prototype.CreateObjectAction = function (type, key, name, sector) {
        if (type === 'sector')
            return ('UpdateDataField(__objectproperties,datakey,);UpdateDataField(__objectproperties,sector,' + sector + ');Debugger(highlight,sector,dbgDebuggerHighlight,' + sector + ')');
        if (type === 'data')
            return ('UpdateDataField(__objectproperties,sector,' + sector + ',false);UpdateDataField(__objectproperties,datakey,' + key + ');Debugger(highlight,sector,dbgDebuggerHighlight,);ReloadData(__objectdata)');
        return ('');
    };
    DrapoDebugger.prototype.CreateObjectSector = function (objectsExpanded, objects, sector, name) {
        if (name === void 0) { name = null; }
        return __awaiter(this, void 0, void 0, function () {
            var object;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ((sector != null) && (sector[0] == '_'))
                            return [2];
                        return [4, this.CreateObject('sector', sector, name != null ? name : sector, sector, objectsExpanded)];
                    case 1:
                        object = _a.sent();
                        objects.push(object);
                        return [4, this.InsertObjectSectorChildrenSectors(objectsExpanded, object.Children, sector)];
                    case 2:
                        _a.sent();
                        return [4, this.InsertObjectSectorChildrenData(object.Children, sector)];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.InsertObjectSectorChildrenSectors = function (objectsExpanded, objects, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var sectors, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sectors = this.Application.Document.GetSectorChildren(sector);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < sectors.length)) return [3, 4];
                        return [4, this.CreateObjectSector(objectsExpanded, objects, sectors[i])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.InsertObjectSectorChildrenData = function (objects, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var dataKeys, i, dataKey, object;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataKeys = this.Application.Storage.GetSectorDataKeys(sector);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < dataKeys.length)) return [3, 4];
                        dataKey = dataKeys[i];
                        if (dataKey[0] == '_')
                            return [2];
                        return [4, this.CreateObject('data', dataKey, dataKey, sector, null)];
                    case 2:
                        object = _a.sent();
                        objects.push(object);
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.CreateObjectData = function (sector, name, value, mustache) {
        var object = {};
        object.Name = name != null ? name : 'data';
        object.Value = value;
        object.Mustache = mustache;
        object.__objectdata = [];
        object.Action = 'UpdateDataField(__objectwatch,Sector,' + sector + ');UpdateDataField(__objectwatch,Mustache,' + object.Mustache + ');AddDataItem(__objectswatchs,__objectwatch);ReloadData(__objectswatchsvalues)';
        object.IsExpanded = name == null;
        return (object);
    };
    DrapoDebugger.prototype.GetObjectData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sector, dataKey, objects, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Storage.RetrieveDataValue(null, '{{__objectproperties.sector}}')];
                    case 1:
                        sector = _a.sent();
                        return [4, this.Application.Storage.RetrieveDataValue(null, '{{__objectproperties.datakey}}')];
                    case 2:
                        dataKey = _a.sent();
                        objects = [];
                        if (dataKey == '')
                            return [2, (objects)];
                        return [4, this.GetObjectDataItem(dataKey, sector)];
                    case 3:
                        data = _a.sent();
                        return [4, this.InsertObjectData(sector, objects, dataKey, null, data)];
                    case 4:
                        _a.sent();
                        return [2, (objects)];
                }
            });
        });
    };
    DrapoDebugger.prototype.GetObjectDataItem = function (dataKey, sector) {
        return __awaiter(this, void 0, void 0, function () {
            var storageItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Storage.RetrieveDataItem(dataKey, sector)];
                    case 1:
                        storageItem = _a.sent();
                        if (storageItem == null)
                            return [2, (null)];
                        if ((storageItem.Type == 'function') && (storageItem.OnLoad != null))
                            return [2, (storageItem.OnLoad)];
                        return [2, (storageItem.Data)];
                }
            });
        });
    };
    DrapoDebugger.prototype.InsertObjectData = function (sector, objects, mustachePrefix, name, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (data == null)
                            return [2];
                        if (name !== null)
                            mustachePrefix = mustachePrefix + '.' + name;
                        if (!Array.isArray(data)) return [3, 2];
                        return [4, this.InsertObjectDataArray(sector, objects, mustachePrefix, name, data)];
                    case 1:
                        _a.sent();
                        return [3, 8];
                    case 2:
                        if (!(data instanceof Object)) return [3, 4];
                        return [4, this.InsertObjectDataObject(sector, objects, mustachePrefix, name, data)];
                    case 3:
                        _a.sent();
                        return [3, 8];
                    case 4:
                        if (!((typeof data === 'string') || (data instanceof String))) return [3, 6];
                        return [4, this.InsertObjectDataString(sector, objects, mustachePrefix, name, data)];
                    case 5:
                        _a.sent();
                        return [3, 8];
                    case 6: return [4, this.InsertObjectDataString(sector, objects, mustachePrefix, name, data.toString())];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.InsertObjectDataObject = function (sector, objects, mustache, name, data) {
        return __awaiter(this, void 0, void 0, function () {
            var object, _a, _b, _c, _i, property, propertyName, propertyData;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        object = this.CreateObjectData(sector, name, '', mustache);
                        objects.push(object);
                        _a = data;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3, 4];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3, 3];
                        property = _c;
                        propertyName = property;
                        propertyData = data[property];
                        return [4, this.InsertObjectData(sector, object.__objectdata, mustache, propertyName, propertyData)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.InsertObjectDataArray = function (sector, objects, mustache, name, data) {
        return __awaiter(this, void 0, void 0, function () {
            var object, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        object = this.CreateObjectData(sector, name, '', mustache);
                        objects.push(object);
                        return [4, this.InsertObjectDataString(sector, object.__objectdata, mustache + '.length', 'length', data.length.toString())];
                    case 1:
                        _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < data.length)) return [3, 5];
                        return [4, this.InsertObjectData(sector, object.__objectdata, mustache, '[' + i + ']', data[i])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 2];
                    case 5: return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.InsertObjectDataString = function (sector, objects, mustache, name, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                objects.push(this.CreateObjectData(sector, name, data, mustache));
                return [2];
            });
        });
    };
    DrapoDebugger.prototype.CreateWatchValue = function (sector, mustache, value, index) {
        var object = {};
        object.Sector = sector == null ? 'root' : sector;
        object.Mustache = mustache;
        object.Value = value;
        object.ActionRemove = 'RemoveDataItemLookup(__objectswatchs,_Index,' + index + ');ReloadData(__objectswatchsvalues)';
        return (object);
    };
    DrapoDebugger.prototype.GetWatchsValues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var objects, watchs, i, watch, sector, mustache, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        objects = [];
                        return [4, this.Application.Storage.RetrieveData('__objectswatchs', null)];
                    case 1:
                        watchs = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < watchs.length)) return [3, 5];
                        watch = watchs[i];
                        sector = watch.Sector;
                        mustache = watch.Mustache;
                        return [4, this.Application.Storage.RetrieveDataValue(sector, '{{' + mustache + '}}')];
                    case 3:
                        value = _a.sent();
                        objects.push(this.CreateWatchValue(sector, mustache, value, i));
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 2];
                    case 5: return [2, (objects)];
                }
            });
        });
    };
    DrapoDebugger.prototype.ExecuteFunctionDebugger = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = parameters[0].toLowerCase();
                        if (!(command == 'highlight')) return [3, 2];
                        return [4, this.ExecuteFunctionDebuggerHighligh(parameters)];
                    case 1:
                        _a.sent();
                        return [3, 6];
                    case 2:
                        if (!(command == 'reload')) return [3, 4];
                        return [4, this.ExecuteFunctionDebuggerReload()];
                    case 3:
                        _a.sent();
                        return [3, 6];
                    case 4:
                        if (!(command == 'persist')) return [3, 6];
                        return [4, this.ExecuteFunctionDebuggerPersist()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.ExecuteFunctionDebuggerHighligh = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var location;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        location = parameters[1].toLowerCase();
                        if (!(location == 'sector')) return [3, 2];
                        return [4, this.ExecuteFunctionDebuggerHighlighSector(parameters)];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        if (!(location == 'component')) return [3, 4];
                        return [4, this.ExecuteFunctionDebuggerHighlighComponent(parameters)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.ExecuteFunctionDebuggerHighlighSector = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var classHighlight, sector, elBeforeList, elBefore, eljAfter, elAfter;
            return __generator(this, function (_a) {
                classHighlight = parameters[2];
                sector = parameters[3];
                elBeforeList = document.getElementsByClassName(classHighlight);
                elBefore = elBeforeList.length > 0 ? elBeforeList[0] : null;
                eljAfter = ((sector != '') && (sector != 'null')) ? $('[d-sector="' + sector + '"]') : null;
                elAfter = ((eljAfter != null) && (eljAfter.length > 0)) ? eljAfter[0] : null;
                if (elBefore != null)
                    $(elBefore).removeClass(classHighlight);
                if (elBefore != elAfter)
                    $(elAfter).addClass(classHighlight);
                return [2];
            });
        });
    };
    DrapoDebugger.prototype.ExecuteFunctionDebuggerHighlighComponent = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var classHighlight, index, elBeforeList, elBefore, components, elAfter;
            return __generator(this, function (_a) {
                classHighlight = parameters[2];
                index = Number(parameters[3]);
                elBeforeList = document.getElementsByClassName(classHighlight);
                elBefore = elBeforeList.length > 0 ? elBeforeList[0] : null;
                components = this.Application.ComponentHandler.Retrieve();
                elAfter = components[index][2];
                if (elBefore != null)
                    $(elBefore).removeClass(classHighlight);
                if (elBefore != elAfter)
                    $(elAfter).addClass(classHighlight);
                return [2];
            });
        });
    };
    DrapoDebugger.prototype.GetComponents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var objectsExpanded, objects, components, i, component;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.Application.Storage.RetrieveData('__objectsexpanded', null)];
                    case 1:
                        objectsExpanded = _a.sent();
                        objects = [];
                        components = this.Application.ComponentHandler.Retrieve();
                        for (i = 0; i < components.length; i++) {
                            component = components[i];
                            objects.push(this.CreateComponentData(component[1], i));
                        }
                        return [2, (objects)];
                }
            });
        });
    };
    DrapoDebugger.prototype.CreateRequest = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2, (null)];
                        request = {};
                        request.Url = url;
                        request.Start = new Date(Date.now()).toJSON();
                        return [4, this.Application.Storage.AddDataItem('__requests', null, '', request, false)];
                    case 1:
                        _a.sent();
                        return [2, (request)];
                }
            });
        });
    };
    DrapoDebugger.prototype.FinishRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var lastRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request == null)
                            return [2, (null)];
                        request.End = new Date(Date.now()).toJSON();
                        return [4, this.Application.Storage.GetDataItemLast('__requests', '')];
                    case 1:
                        lastRequest = _a.sent();
                        request.Last = request === request;
                        return [4, this.Application.Observer.Notify('__requests', null, null)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.CreateComponentData = function (tag, index) {
        var object = {};
        object.Tag = tag;
        object.Action = 'Debugger(highlight,component,dbgDebuggerHighlight, ' + index + ')';
        return (object);
    };
    DrapoDebugger.prototype.AddSectorUpdate = function (name, parent, url) {
        return __awaiter(this, void 0, void 0, function () {
            var sectorUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.Active)
                            return [2, (null)];
                        sectorUpdate = {};
                        sectorUpdate.Name = name;
                        sectorUpdate.Parent = parent;
                        sectorUpdate.Url = url;
                        return [4, this.Application.Storage.AddDataItem('__sectorsupdate', null, '', sectorUpdate)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.ExecuteFunctionDebuggerReload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var debuggerConfiguration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window.sessionStorage)
                            return [2];
                        return [4, this.Application.Storage.RetrieveData('__debuggerProperties', null)];
                    case 1:
                        debuggerConfiguration = _a.sent();
                        window.sessionStorage.setItem(this.SESSION_STORAGE_KEY, this.Application.Serializer.Serialize(debuggerConfiguration));
                        window.location.reload();
                        return [2];
                }
            });
        });
    };
    DrapoDebugger.prototype.ExecuteFunctionDebuggerPersist = function () {
        return __awaiter(this, void 0, void 0, function () {
            var debuggerConfiguration, persist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window.sessionStorage)
                            return [2];
                        return [4, this.Application.Storage.RetrieveData('__debuggerProperties', null)];
                    case 1:
                        debuggerConfiguration = _a.sent();
                        if (debuggerConfiguration == null)
                            return [2];
                        persist = this.Application.Solver.ResolveConditionalBoolean(debuggerConfiguration.persist);
                        if (persist)
                            window.sessionStorage.setItem(this.SESSION_STORAGE_KEY, this.Application.Serializer.Serialize(debuggerConfiguration));
                        else
                            window.sessionStorage.removeItem(this.SESSION_STORAGE_KEY);
                        return [2];
                }
            });
        });
    };
    return DrapoDebugger;
}());
