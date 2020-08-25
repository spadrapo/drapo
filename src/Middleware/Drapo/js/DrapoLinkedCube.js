"use strict";
var DrapoLinkedCube = (function () {
    function DrapoLinkedCube() {
        this._head = null;
    }
    DrapoLinkedCube.prototype.AddOrUpdate = function (context, value) {
        if (this._head === null) {
            this._head = this.CreateNode(context, value);
            return (this._head);
        }
        if (context === null)
            throw new Error('Drapo: The context in DrapoLinkedcube cant be null');
        if (this._head.Context.length != context.length)
            throw new Error('Drapo: The context to insert in linked cube must be the same lenght of the context lenght of head');
        var node = this._head;
        var nodePrevious = null;
        var nodePreviousIndex = null;
        var compare = 0;
        for (var i = 0; i < context.length; i++) {
            var contextValue = context[i];
            while ((compare = contextValue.localeCompare(node.Context[i])) !== 0) {
                if (compare < 0) {
                    var nodeNew = this.CreateNode(context, value);
                    this.AddNodeNext(nodeNew, node, i);
                    if (node === this._head)
                        this._head = nodeNew;
                    else if (nodePrevious !== null)
                        this.AddNodeNext(nodePrevious, nodeNew, nodePreviousIndex);
                    return (nodeNew);
                }
                else {
                    nodePrevious = node;
                    nodePreviousIndex = i;
                    var nodeNext = this.GetNodeNext(node, i);
                    if (nodeNext === null) {
                        var nodeNew = this.CreateNode(context, value);
                        this.AddNodeNext(node, nodeNew, i);
                        return (nodeNew);
                    }
                    else {
                        node = nodeNext;
                    }
                }
            }
        }
        node.Value = value;
        return (node);
    };
    DrapoLinkedCube.prototype.Get = function (context) {
        var node = this._head;
        while (node !== null) {
            if (this.IsEqualContext(node.Context, context))
                return (node.Value);
            node = this.GetNextInContext(node, context);
        }
        return (null);
    };
    DrapoLinkedCube.prototype.GetNode = function (context) {
        var node = this._head;
        while (node !== null) {
            if (this.IsEqualContext(context, node.Context, false))
                return (node);
            node = this.GetNextInContext(node, context);
        }
        return (null);
    };
    DrapoLinkedCube.prototype.Clear = function () {
        this._head = null;
    };
    DrapoLinkedCube.prototype.Remove = function (context) {
        if (this._head === null)
            return (null);
        var node = this._head;
        var nodePrevious = null;
        var nodePreviousIndex = null;
        var compare = 0;
        for (var i = 0; ((i < context.length) && (node !== null)); i++) {
            var contextValue = context[i];
            while ((compare = contextValue.localeCompare(node.Context[i])) !== 0) {
                if (compare < 0) {
                    return (null);
                }
                else {
                    nodePrevious = node;
                    nodePreviousIndex = i;
                    var nodeNext = this.GetNodeNext(node, i);
                    node = nodeNext;
                    if (node === null)
                        return (null);
                }
            }
        }
        if (node !== null) {
            var isContextToRemove = context.length < this._head.Context.length;
            var nodeNext = this.GetNextReverse(node, isContextToRemove ? context.length - 1 : null);
            var nodeNextIndex = this.GetNextReverseIndex(node, isContextToRemove ? context.length - 1 : null);
            if (nodePrevious === null) {
                if (nodeNext !== null) {
                    this.MoveLinks(nodeNext, node, nodeNextIndex);
                }
                this._head = nodeNext;
            }
            else {
                this.MoveLinks(nodeNext, node, nodeNextIndex);
                this.AddNodeNext(nodePrevious, nodeNext, nodePreviousIndex);
            }
        }
        return (node);
    };
    DrapoLinkedCube.prototype.GetHead = function () {
        return (this._head);
    };
    DrapoLinkedCube.prototype.CreateNode = function (context, value) {
        var node = new DrapoLinkedCubeNode();
        node.Context = context;
        node.Value = value;
        return (node);
    };
    DrapoLinkedCube.prototype.GetNextInContext = function (node, context) {
        for (var i = 0; i < context.length; i++) {
            var compare = context[i].localeCompare(node.Context[i]);
            if (compare < 0)
                return (null);
            else if (compare === 0)
                continue;
            if ((node.Next === null) || (node.Next.length <= i))
                return (null);
            return (node.Next[i]);
        }
        return (null);
    };
    DrapoLinkedCube.prototype.GetNextReverse = function (node, index) {
        if (index === void 0) { index = null; }
        if (node.Next === null)
            return (null);
        var start = index !== null ? index : node.Next.length - 1;
        if (start >= node.Next.length)
            start = node.Next.length - 1;
        for (var i = start; i >= 0; i--) {
            var nodeNext = node.Next[i];
            if (nodeNext !== null)
                return (nodeNext);
        }
        return (null);
    };
    DrapoLinkedCube.prototype.GetNextReverseIndex = function (node, index) {
        if (index === void 0) { index = null; }
        if (node.Next === null)
            return (null);
        var start = index !== null ? index : node.Next.length - 1;
        if (start >= node.Next.length)
            start = node.Next.length - 1;
        for (var i = start; i >= 0; i--) {
            var nodeNext = node.Next[i];
            if (nodeNext !== null)
                return (i);
        }
        return (null);
    };
    DrapoLinkedCube.prototype.IsEqualContext = function (context1, context2, checkSize) {
        if (checkSize === void 0) { checkSize = true; }
        if ((checkSize) && (context1.length != context2.length))
            return (false);
        for (var i = 0; i < context1.length; i++)
            if (context1[i] !== context2[i])
                return (false);
        return (true);
    };
    DrapoLinkedCube.prototype.EnsureNodeNext = function (node, index) {
        if (node.Next === null)
            node.Next = [];
        while (node.Next.length <= index)
            node.Next.push(null);
    };
    DrapoLinkedCube.prototype.AddNodeNext = function (node, nodeNext, index) {
        this.EnsureNodeNext(node, index);
        node.Next[index] = nodeNext;
        if (nodeNext === null)
            return;
        if (nodeNext.Next === null)
            return;
        this.MoveLinks(node, nodeNext, index);
    };
    DrapoLinkedCube.prototype.MoveLinks = function (node, nodeNext, index) {
        if (index === void 0) { index = null; }
        if (node === null)
            return;
        if (nodeNext === null)
            return;
        if (nodeNext.Next === null)
            return;
        this.EnsureNodeNext(node, index);
        for (var i = 0; ((index === null) || (i < index)) && (i < nodeNext.Next.length); i++) {
            if (node.Context[i] !== nodeNext.Context[i])
                break;
            if (node.Next[i] === null)
                node.Next[i] = nodeNext.Next[i];
            nodeNext.Next[i] = null;
        }
    };
    DrapoLinkedCube.prototype.GetNodeNext = function (node, index) {
        if (node.Next === null)
            return (null);
        if (node.Next.length <= index)
            return (null);
        return (node.Next[index]);
    };
    DrapoLinkedCube.prototype.ToList = function (node) {
        if (node === void 0) { node = null; }
        var list = [];
        if (node === null)
            node = this._head;
        if (node != null)
            this.AppendNodeToList(list, node);
        return (list);
    };
    DrapoLinkedCube.prototype.AppendNodeToList = function (list, node) {
        list.push(node);
        if (node.Next == null)
            return;
        for (var i = 0; i < node.Next.length; i++) {
            var nodeNext = node.Next[i];
            if (nodeNext !== null)
                this.AppendNodeToList(list, nodeNext);
        }
    };
    DrapoLinkedCube.prototype.ToListValues = function (node) {
        if (node === void 0) { node = null; }
        var listValues = [];
        var list = this.ToList(node);
        for (var i = 0; i < list.length; i++)
            listValues.push(list[i].Value);
        return (listValues);
    };
    return DrapoLinkedCube;
}());
