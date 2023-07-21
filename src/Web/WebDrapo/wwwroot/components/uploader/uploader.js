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
function uploaderConstructor(el, app) {
    return __awaiter(this, void 0, void 0, function () {
        var uploader;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uploader = new Uploader(el, app);
                    return [4, uploader.Initalize()];
                case 1:
                    _a.sent();
                    return [2, (uploader)];
            }
        });
    });
}
var Uploader = (function () {
    function Uploader(el, app) {
        this._el = null;
        this._sector = null;
        this._dataKeySource = null;
        this._dataFieldName = null;
        this._dataFieldData = null;
        this._dataMessage = null;
        this._dataFileExtensionType = null;
        this._el = el;
        this._app = app;
    }
    Object.defineProperty(Uploader.prototype, "Application", {
        get: function () {
            return (this._app);
        },
        enumerable: false,
        configurable: true
    });
    Uploader.prototype.Initalize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataKeyFileExtensionsDefault, _a, _b, mustacheName, uploader, elDrop, elFile, elButton;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this._sector = this.Application.Document.GetSector(this._el);
                        this._dataKeySource = this._el.getAttribute("d-dataKeySource");
                        this._dataFieldName = this._el.getAttribute("d-dataFieldName");
                        this._dataFieldData = this._el.getAttribute("d-dataFieldData");
                        this._dataMessage = this._el.getAttribute("d-dataMessage");
                        this._dataFileExtensionType = this._el.getAttribute("d-dataFileExtensionType");
                        dataKeyFileExtensionsDefault = this._el.getAttribute('dc-fileextensionsdefault');
                        if (!this._app.Parser.IsMustache(this._dataFileExtensionType)) return [3, 2];
                        _a = this;
                        return [4, this._app.Storage.RetrieveDataValue(this._sector, this._dataFileExtensionType)];
                    case 1:
                        _a._dataFileExtensionType = _c.sent();
                        _c.label = 2;
                    case 2:
                        if (!((this._dataFileExtensionType == null) || (this._dataFileExtensionType == '') && (dataKeyFileExtensionsDefault != ''))) return [3, 4];
                        _b = this;
                        return [4, this._app.Storage.RetrieveDataValue(this._sector, dataKeyFileExtensionsDefault)];
                    case 3:
                        _b._dataFileExtensionType = _c.sent();
                        _c.label = 4;
                    case 4:
                        mustacheName = this.GetFileNameMustache();
                        uploader = this;
                        this._el.addEventListener('dragover', function (evt) { uploader.HandleDragOver(evt); }, false);
                        this._el.addEventListener('drop', function (evt) { uploader.HandleDrop(evt); }, false);
                        elDrop = this.GetElementDrop();
                        elDrop.addEventListener('click', function (evt) { uploader.HandleClick(evt); }, false);
                        elFile = this.GetElementInputFile();
                        elFile.addEventListener('change', function (evt) { uploader.HandleChange(evt); }, false);
                        elButton = this.GetElementButton();
                        elButton.addEventListener('click', function (evt) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, uploader.HandleDownload(evt)];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        }); }); }, false);
                        this.Application.Observer.SubscribeComponent(mustacheName, this._el, function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, uploader.Notify()];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        }); }); }, this._el);
                        return [4, this.DisableDownloadButton()];
                    case 5:
                        _c.sent();
                        return [2, (this.Notify())];
                }
            });
        });
    };
    Uploader.prototype.GetElementInputFile = function () {
        var elinput = this._el.children[2];
        if (this._dataFileExtensionType !== '.*')
            elinput.setAttribute('accept', this._dataFileExtensionType);
        return elinput;
    };
    Uploader.prototype.GetElementMessage = function () {
        return this._el.children[1].children[0];
    };
    Uploader.prototype.GetElementDrop = function () {
        return this._el.children[1];
    };
    Uploader.prototype.GetElementButton = function () {
        return this._el.children[0];
    };
    Uploader.prototype.GetFileNameMustache = function () {
        if (this._dataKeySource != null)
            return ('{{' + this._dataKeySource + '.' + this._dataFieldName + '}}');
        return (this._dataFieldName);
    };
    Uploader.prototype.GetName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nameMustache, nameMustachePath, nameKey, data, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nameMustache = this.GetFileNameMustache();
                        nameMustachePath = this.Application.Parser.ParseMustache(nameMustache);
                        nameKey = this.Application.Solver.ResolveDataKey(nameMustachePath);
                        return [4, this.Application.Storage.RetrieveData(nameKey, this._sector)];
                    case 1:
                        data = _a.sent();
                        name = this.Application.Solver.ResolveDataObjectPathObject(data, nameMustachePath);
                        if ((name == null) || (name == ''))
                            return [2, ('')];
                        return [2, (name)];
                }
            });
        });
    };
    Uploader.prototype.GetFileDataMustache = function () {
        if (this._dataKeySource != null)
            return ('{{' + this._dataKeySource + '.' + this._dataFieldData + '}}');
        return (this._dataFieldData);
    };
    Uploader.prototype.DisableDownloadButton = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataValue, downloadButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetValue()];
                    case 1:
                        dataValue = _a.sent();
                        return [4, this.GetElementButton()];
                    case 2:
                        downloadButton = _a.sent();
                        if (dataValue == null || dataValue == '') {
                            downloadButton.setAttribute("class", "suDownloadDisabled");
                        }
                        else {
                            downloadButton.setAttribute("class", "ppUploaderButton");
                        }
                        return [2];
                }
            });
        });
    };
    Uploader.prototype.HandleDragOver = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    };
    Uploader.prototype.HandleDrop = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files;
        if ((files == null) || (files.length == 0))
            return;
        var file = files[0];
        this.HandleFile(file);
    };
    Uploader.prototype.IsValidFileNameExtension = function (name) {
        if (this._dataFileExtensionType === '.*')
            return (true);
        var types = this._dataFileExtensionType.split(',');
        for (var i = 0; i < types.length; i++) {
            var type = types[i].trim();
            if (name.endsWith(type))
                return (true);
        }
        return (false);
    };
    Uploader.prototype.HandleClick = function (evt) {
        var elementInputFile = this.GetElementInputFile();
        elementInputFile.click();
    };
    Uploader.prototype.HandleChange = function (evt) {
        var files = evt.target.files;
        if ((files == null) || (files.length == 0))
            return;
        var file = files[0];
        this.HandleFile(file);
    };
    Uploader.prototype.HandleDownload = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var dataName, dataValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        evt.stopPropagation();
                        evt.preventDefault();
                        return [4, this.GetName()];
                    case 1:
                        dataName = _a.sent();
                        if ((dataName == null) || (dataName == ''))
                            return [2];
                        return [4, this.GetValue()];
                    case 2:
                        dataValue = _a.sent();
                        this.Download(dataName, dataValue);
                        return [2];
                }
            });
        });
    };
    Uploader.prototype.GetValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataMustache, dataMustachePath, dataKey, data, dataValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataMustache = this.GetFileDataMustache();
                        dataMustachePath = this.Application.Parser.ParseMustache(dataMustache);
                        dataKey = this.Application.Solver.ResolveDataKey(dataMustachePath);
                        return [4, this.Application.Storage.RetrieveData(dataKey, this._sector)];
                    case 1:
                        data = _a.sent();
                        dataValue = this.Application.Solver.ResolveDataObjectPathObject(data, dataMustachePath);
                        return [2, dataValue];
                }
            });
        });
    };
    Uploader.prototype.Download = function (name, dataBase64) {
        var dataCharacters = atob(dataBase64);
        var dataBytes = new Array(dataCharacters.length);
        for (var i = 0; i < dataCharacters.length; i++) {
            dataBytes[i] = dataCharacters.charCodeAt(i);
        }
        var data = new Uint8Array(dataBytes);
        var blob = new Blob([data], { type: 'application/octet-stream' });
        var navigator = window.navigator;
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, name);
        }
        else {
            var elDownloader = document.createElement('a');
            elDownloader.href = window.URL.createObjectURL(blob);
            elDownloader.download = name;
            elDownloader.style.display = 'none';
            document.body.appendChild(elDownloader);
            elDownloader.click();
            document.body.removeChild(elDownloader);
        }
    };
    Uploader.prototype.Notify = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name, elMessage, isMustache, dataMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.GetName()];
                    case 1:
                        name = _a.sent();
                        elMessage = this.GetElementMessage();
                        if (!((name == null) || (name == ''))) return [3, 5];
                        isMustache = this.Application.Parser.IsMustache(this._dataMessage);
                        if (!isMustache) return [3, 3];
                        return [4, this.Application.Storage.RetrieveDataValue(this._sector, this._dataMessage)];
                    case 2:
                        dataMessage = _a.sent();
                        elMessage.textContent = dataMessage;
                        elMessage.title = dataMessage;
                        return [3, 4];
                    case 3:
                        elMessage.textContent = this._dataMessage;
                        elMessage.title = this._dataMessage;
                        _a.label = 4;
                    case 4: return [3, 6];
                    case 5:
                        elMessage.textContent = name;
                        elMessage.title = name;
                        _a.label = 6;
                    case 6: return [2];
                }
            });
        });
    };
    Uploader.prototype.HandleFile = function (file) {
        var _this = this;
        var name = file.name;
        if (!this.IsValidFileNameExtension(name))
            return;
        var reader = new FileReader();
        var uploader = this;
        reader.addEventListener("load", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, uploader.UpdateData(file.name, uploader.ExtractBase64(reader.result))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); }, false);
        reader.readAsDataURL(file);
    };
    Uploader.prototype.ExtractBase64 = function (data) {
        var index = data.toString().indexOf('base64,');
        if (index == -1)
            return (data);
        return (data.toString().substr(index + 7));
    };
    Uploader.prototype.UpdateData = function (fileName, fileData) {
        return __awaiter(this, void 0, void 0, function () {
            var dataMustache, dataMustachePath, dataKey, dataPath, nameMustache, nameMustachePath, nameKey, namePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataMustache = this.GetFileDataMustache();
                        dataMustachePath = this.Application.Parser.ParseMustache(dataMustache);
                        dataKey = this.Application.Solver.ResolveDataKey(dataMustachePath);
                        dataPath = this.Application.Solver.ResolveDataFields(dataMustachePath);
                        return [4, this.Application.Storage.SetDataKeyField(dataKey, this._sector, dataPath, fileData, true)];
                    case 1:
                        _a.sent();
                        nameMustache = this.GetFileNameMustache();
                        nameMustachePath = this.Application.Parser.ParseMustache(nameMustache);
                        nameKey = this.Application.Solver.ResolveDataKey(nameMustachePath);
                        namePath = this.Application.Solver.ResolveDataFields(nameMustachePath);
                        return [4, this.Application.Storage.SetDataKeyField(nameKey, this._sector, namePath, fileName, true)];
                    case 2:
                        _a.sent();
                        return [4, this.DisableDownloadButton()];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return Uploader;
}());
