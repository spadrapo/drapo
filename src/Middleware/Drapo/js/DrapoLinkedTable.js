"use strict";
var DrapoLinkedTable = (function () {
    function DrapoLinkedTable() {
        this._head = null;
    }
    DrapoLinkedTable.prototype.AddOrUpdate = function (row, column, value) {
        if (this._head === null) {
            this._head = new DrapoLinkedTableNode();
            this._head.Row = row;
            this._head.Column = column;
        }
        var node = this._head;
        var nodeRowPrevious = null;
        var isEnd = false;
        while (node.Row !== row) {
            nodeRowPrevious = node;
            if ((isEnd = (node.NextRow === null)) || (node.NextRow.Row > row)) {
                var nodeRow = new DrapoLinkedTableNode();
                nodeRow.Row = row;
                nodeRow.Column = column;
                if ((isEnd) && (node.Row < row)) {
                    node.NextRow = nodeRow;
                }
                else if (node === this._head) {
                    nodeRow.NextRow = node;
                    this._head = nodeRow;
                }
                else {
                    nodeRow.NextRow = node.NextRow;
                    node.NextRow = nodeRow;
                }
                node = nodeRow;
            }
            else {
                node = node.NextRow;
            }
        }
        var nodeRowHead = node;
        while (node.Column !== column) {
            if ((isEnd = (node.NextCell === null)) || (node.NextCell.Column > column)) {
                var nodeCell = new DrapoLinkedTableNode();
                nodeCell.Row = row;
                nodeCell.Column = column;
                if ((isEnd) && (node.Column < column)) {
                    node.NextCell = nodeCell;
                }
                else if (node === nodeRowHead) {
                    nodeCell.NextCell = node;
                    if (nodeRowHead.Row !== nodeRowPrevious.Row)
                        nodeRowPrevious.NextRow = nodeCell;
                }
                else {
                    nodeCell.NextCell = node.NextCell;
                    node.NextCell = nodeCell;
                }
                node = nodeCell;
            }
            else {
                node = node.NextCell;
            }
        }
        node.Value = value;
    };
    DrapoLinkedTable.prototype.Get = function (row, column) {
        var node = this._head;
        while (node !== null) {
            if (node.Row < row) {
                node = node.NextRow;
            }
            else if (node.Row > row) {
                return (null);
            }
            else if (node.Row === row) {
                if (node.Column < column)
                    node = node.NextCell;
                else if (node.Column > column)
                    return (null);
                else
                    return (node.Value);
            }
        }
        return (null);
    };
    DrapoLinkedTable.prototype.GetHead = function () {
        return (this._head);
    };
    DrapoLinkedTable.prototype.Delete = function (row, column) {
    };
    return DrapoLinkedTable;
}());
