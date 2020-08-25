class DrapoLinkedTable<T> {
    private _head: DrapoLinkedTableNode<T> = null;

    public AddOrUpdate(row: number, column: number, value: T): void {
        //Head
        if (this._head === null) {
            this._head = new DrapoLinkedTableNode<T>();
            this._head.Row = row;
            this._head.Column = column;
        }
        //Row
        let node: DrapoLinkedTableNode<T> = this._head;
        let nodeRowPrevious: DrapoLinkedTableNode<T> = null;
        let isEnd: boolean = false;
        while (node.Row !== row) {
            nodeRowPrevious = node;
            if ((isEnd = (node.NextRow === null)) || (node.NextRow.Row > row)) {
                const nodeRow: DrapoLinkedTableNode<T> = new DrapoLinkedTableNode<T>();
                nodeRow.Row = row;
                nodeRow.Column = column;
                if ((isEnd) && (node.Row < row)) {
                    node.NextRow = nodeRow;
                } else if (node === this._head) {
                    nodeRow.NextRow = node;
                    this._head = nodeRow;
                } else {
                    nodeRow.NextRow = node.NextRow;
                    node.NextRow = nodeRow;
                }
                node = nodeRow;
            } else {
                node = node.NextRow;
            }
        }
        //Column
        const nodeRowHead: DrapoLinkedTableNode<T> = node;
        while (node.Column !== column) {
            if ((isEnd = (node.NextCell === null)) || (node.NextCell.Column > column)) {
                const nodeCell: DrapoLinkedTableNode<T> = new DrapoLinkedTableNode<T>();
                nodeCell.Row = row;
                nodeCell.Column = column;
                if ((isEnd) && (node.Column < column)) {
                    node.NextCell = nodeCell;
                } else if (node === nodeRowHead) {
                    nodeCell.NextCell = node;
                    if (nodeRowHead.Row !== nodeRowPrevious.Row)
                        nodeRowPrevious.NextRow = nodeCell;
                } else {
                    nodeCell.NextCell = node.NextCell;
                    node.NextCell = nodeCell;
                }
                node = nodeCell;
            } else {
                node = node.NextCell;
            }
        }
        node.Value = value;
    }

    public Get(row: number, column: number): T {
        let node: DrapoLinkedTableNode<T> = this._head;
        while (node !== null) {
            //Row
            if (node.Row < row) {
                node = node.NextRow;
            } else if (node.Row > row) {
                return (null);
            } else if (node.Row === row) {
                //Column
                if (node.Column < column)
                    node = node.NextCell;
                else if (node.Column > column)
                    return (null);
                else
                    return (node.Value);
            }
        }
        return (null);
    }

    public GetHead() : DrapoLinkedTableNode<T>
    {
        return (this._head);
    }

    public Delete(row: number, column: number): void {
        //TODO: Work over here
    }
}