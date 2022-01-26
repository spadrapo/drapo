"use strict";
var DrapoContext = (function () {
    function DrapoContext(item) {
        if (item === void 0) { item = null; }
        this._sector = null;
        this._itemsRoot = [];
        this._items = this._itemsRoot;
        this._itemParent = null;
        this._itemCurrent = null;
        this._itemCurrentStack = [];
        this._index = -1;
        this._level = 0;
        this._indexRelatives = [];
        this._indexRelative = -1;
        this._checkpoint = false;
        this._checkMustacheNodes = false;
        this._checkMustacheAttributes = false;
        this._checkModel = false;
        this._checkID = false;
        this._checkAttribute = false;
        this._checkClass = false;
        this._checkEvent = false;
        this._checkBehavior = false;
        this._checkComponent = false;
        this._checkValidation = false;
        this._canUpdateTemplate = false;
        this._templateKeys = [];
        this._templateDatas = [];
        if (item != null) {
            this._items.push(item);
            this._itemCurrent = item;
        }
    }
    Object.defineProperty(DrapoContext.prototype, "Sector", {
        get: function () {
            return (this._sector);
        },
        set: function (value) {
            this._sector = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "Item", {
        get: function () {
            return (this._itemCurrent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "Index", {
        get: function () {
            return (this._index);
        },
        set: function (value) {
            this._index = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "IsEmpty", {
        get: function () {
            return (this._index === -1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "IndexRelative", {
        get: function () {
            return (this._indexRelative);
        },
        set: function (value) {
            this._indexRelative = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "Level", {
        get: function () {
            return (this._level);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "IsInsideRecursion", {
        get: function () {
            return (this._level > 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "CheckMustacheNodes", {
        get: function () {
            return ((!this._checkpoint) || (this._checkMustacheNodes));
        },
        set: function (value) {
            this._checkMustacheNodes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "CheckMustacheAttributes", {
        get: function () {
            return ((!this._checkpoint) || (this._checkMustacheAttributes));
        },
        set: function (value) {
            this._checkMustacheAttributes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "CheckModel", {
        get: function () {
            return ((!this._checkpoint) || (this._checkModel));
        },
        set: function (value) {
            this._checkModel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "CheckID", {
        get: function () {
            return ((!this._checkpoint) || (this._checkID));
        },
        set: function (value) {
            this._checkID = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "CheckAttribute", {
        get: function () {
            return ((!this._checkpoint) || (this._checkAttribute));
        },
        set: function (value) {
            this._checkAttribute = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "CheckClass", {
        get: function () {
            return ((!this._checkpoint) || (this._checkClass));
        },
        set: function (value) {
            this._checkClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "CheckEvent", {
        get: function () {
            return (((!this._checkpoint) || (this._checkEvent)) && (!this.CanUpdateTemplate));
        },
        set: function (value) {
            this._checkEvent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "CheckBehavior", {
        get: function () {
            return (((!this._checkpoint) || (this._checkBehavior)) && (!this.CanUpdateTemplate));
        },
        set: function (value) {
            this._checkBehavior = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "CheckComponent", {
        get: function () {
            return (((!this._checkpoint) || (this._checkComponent)) && (!this.CanUpdateTemplate));
        },
        set: function (value) {
            this._checkComponent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "CheckValidation", {
        get: function () {
            return (((!this._checkpoint) || (this._checkValidation)) && (!this.CanUpdateTemplate));
        },
        set: function (value) {
            this._checkValidation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrapoContext.prototype, "CanUpdateTemplate", {
        get: function () {
            return (this._canUpdateTemplate);
        },
        set: function (value) {
            this._canUpdateTemplate = value;
        },
        enumerable: true,
        configurable: true
    });
    DrapoContext.prototype.Create = function (data, element, elementForTemplate, dataKey, key, iterator, index, elementOld) {
        if (elementOld === void 0) { elementOld = null; }
        var item = new DrapoContextItem(this, this._itemParent);
        item.Data = data;
        item.Element = element;
        item.ElementForTemplate = elementForTemplate;
        item.ElementOld = elementOld;
        item.DataKey = dataKey;
        item.Key = key;
        item.Iterator = iterator;
        item.Index = index;
        this._items.push(item);
        this._itemCurrent = item;
        this._index++;
        this._indexRelative++;
        return (item);
    };
    DrapoContext.prototype.Initialize = function (count) {
        if (count <= 0)
            return;
        for (var i = 0; i < count; i++)
            this._items.push(null);
        this._index = count;
        this._indexRelative = count;
    };
    DrapoContext.prototype.Pop = function () {
        if (this._itemCurrent == null)
            return (null);
        this._itemCurrent = this._items.length < 2 ? null : this._items[this._items.length - 2];
        return (this._items.pop());
    };
    DrapoContext.prototype.Down = function () {
        if (this._itemCurrent == null)
            return (false);
        this._items = this._itemCurrent.Children;
        this._itemParent = this._itemCurrent;
        this._itemCurrentStack.push(this._itemCurrent);
        this._level++;
        this._indexRelatives.push(this._indexRelative);
        this._indexRelative = -1;
        return (true);
    };
    DrapoContext.prototype.Up = function () {
        if (this._itemParent == null)
            return (false);
        this._itemParent = this._itemParent.Parent;
        this._items = this._itemParent == null ? this._itemsRoot : this._itemParent.Children;
        this._itemCurrent = this._itemCurrentStack.pop();
        this._level--;
        this._indexRelative = this._indexRelatives.pop();
        return (true);
    };
    DrapoContext.prototype.GetElementTemplate = function (key) {
        var item = this.Item;
        var template = null;
        while (item != null) {
            if (item.Key == key)
                template = item.ElementForTemplate;
            item = item.Parent;
        }
        return (template);
    };
    DrapoContext.prototype.IsElementTemplateRoot = function (key) {
        var item = this.Item;
        while (item != null) {
            if ((item.Parent === null) && (item.Key === key))
                return (true);
            item = item.Parent;
        }
        return (false);
    };
    DrapoContext.prototype.IsKey = function (key) {
        var item = this.Item;
        while (item != null) {
            if (item.Key === key)
                return (true);
            item = item.Parent;
        }
        return (false);
    };
    DrapoContext.prototype.GetDataKeyRoot = function () {
        if (this._itemsRoot.length === 0)
            return (null);
        return (this._itemsRoot[0].DataKey);
    };
    DrapoContext.prototype.Checkpoint = function () {
        if (this._checkpoint)
            return;
        if (this._level !== 0)
            return;
        this._checkpoint = true;
    };
    DrapoContext.prototype.GetTemplateIndex = function (templateKey) {
        for (var i = 0; i < this._templateKeys.length; i++)
            if (this._templateKeys[i] === templateKey)
                return (i);
        return (null);
    };
    DrapoContext.prototype.GetTemplate = function (templateKey) {
        var index = this.GetTemplateIndex(templateKey);
        if (index === null)
            return (null);
        return (this._templateDatas[index]);
    };
    DrapoContext.prototype.AddTemplate = function (templateKey, templateData) {
        var index = this.GetTemplateIndex(templateKey);
        if (index === null) {
            this._templateKeys.push(templateKey);
            this._templateDatas.push(templateData);
        }
        else {
            this._templateDatas[index] = templateData;
        }
    };
    DrapoContext.prototype.CanResolve = function (key) {
        if (!this._canUpdateTemplate)
            return (true);
        return (!this.IsElementTemplateRoot(key));
    };
    DrapoContext.prototype.HasContextItemBefore = function () {
        return ((this.Item != null) && (this.Item.ElementOld != null));
    };
    DrapoContext.prototype.GetContextRelativeArray = function (mustachePart) {
        if (this.Item.Key === mustachePart)
            return ([this.Item.Iterator, '[' + this.IndexRelative + ']']);
        for (var i = 0; i < this._itemCurrentStack.length; i++) {
            var itemCurrent = this._itemCurrentStack[i];
            if (itemCurrent.Key !== mustachePart)
                continue;
            return ([itemCurrent.Iterator, '[' + this._indexRelatives[i] + ']']);
        }
        return (null);
    };
    DrapoContext.prototype.GetIndex = function (key) {
        if (this.Item.Key === key)
            return (this.Index);
        for (var i = 0; i < this._itemCurrentStack.length; i++) {
            var itemCurrent = this._itemCurrentStack[i];
            if (itemCurrent.Key === key)
                return (itemCurrent.Index);
        }
        return (null);
    };
    DrapoContext.prototype.GetIndexRelative = function (key) {
        if (this.Item.Key === key)
            return (this.IndexRelative);
        for (var i = 0; i < this._itemCurrentStack.length; i++) {
            var itemCurrent = this._itemCurrentStack[i];
            if (itemCurrent.Key === key)
                return (this._indexRelatives[i]);
        }
        return (null);
    };
    return DrapoContext;
}());
