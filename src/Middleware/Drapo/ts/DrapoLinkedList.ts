class DrapoLinkedList<T> {
    private _head: DrapoLinkedListNode<T> = null;

    public AddOrUpdate(index: number, value: T): void {
        //Head
        if (this._head === null) {
            this._head = new DrapoLinkedListNode<T>();
            this._head.Index = index;
        }
        //Next
        let node: DrapoLinkedListNode<T> = this._head;
        let isEnd: boolean = false;
        while (node.Index !== index) {
            if ((isEnd = (node.Next === null)) || (node.Next.Index > index)) {
                const nodeNew: DrapoLinkedListNode<T> = new DrapoLinkedListNode<T>();
                nodeNew.Index = index;
                if ((isEnd) && (node.Index < index)) {
                    node.Next = nodeNew;
                } else if (node === this._head) {
                    nodeNew.Next = node;
                    this._head = nodeNew;
                } else {
                    nodeNew.Next = node.Next;
                    node.Next = nodeNew;
                }
                node = nodeNew;
            } else {
                node = node.Next;
            }
        }
        node.Value = value;
    }

    public Get(index: number): T {
        let node: DrapoLinkedListNode<T> = this._head;
        while (node !== null) {
            //Index
            if (node.Index < index)
                node = node.Next;
            else if (node.Index === index)
                return (node.Value);
        }
        return (null);
    }

    public GetHead(): DrapoLinkedListNode<T> {
        return (this._head);
    }
}