"use strict";
var DrapoLinkedList = (function () {
    function DrapoLinkedList() {
        this._head = null;
    }
    DrapoLinkedList.prototype.AddOrUpdate = function (index, value) {
        if (this._head === null) {
            this._head = new DrapoLinkedListNode();
            this._head.Index = index;
        }
        var node = this._head;
        var isEnd = false;
        while (node.Index !== index) {
            if ((isEnd = (node.Next === null)) || (node.Next.Index > index)) {
                var nodeNew = new DrapoLinkedListNode();
                nodeNew.Index = index;
                if ((isEnd) && (node.Index < index)) {
                    node.Next = nodeNew;
                }
                else if (node === this._head) {
                    nodeNew.Next = node;
                    this._head = nodeNew;
                }
                else {
                    nodeNew.Next = node.Next;
                    node.Next = nodeNew;
                }
                node = nodeNew;
            }
            else {
                node = node.Next;
            }
        }
        node.Value = value;
    };
    DrapoLinkedList.prototype.Get = function (index) {
        var node = this._head;
        while (node !== null) {
            if (node.Index < index)
                node = node.Next;
            else if (node.Index === index)
                return (node.Value);
        }
        return (null);
    };
    DrapoLinkedList.prototype.GetHead = function () {
        return (this._head);
    };
    return DrapoLinkedList;
}());
