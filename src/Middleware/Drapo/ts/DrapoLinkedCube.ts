class DrapoLinkedCube<T> {
    private _head: DrapoLinkedCubeNode<T> = null;
    public AddOrUpdate(context: string[], value: T): DrapoLinkedCubeNode<T> {
        //Head
        if (this._head === null) {
            this._head = this.CreateNode(context, value);
            return (this._head);

        }
        if (context === null)
            throw new Error('Drapo: The context in DrapoLinkedcube cant be null');
        if (this._head.Context.length != context.length)
            throw new Error('Drapo: The context to insert in linked cube must be the same lenght of the context lenght of head');
        let node: DrapoLinkedCubeNode<T> = this._head;
        let nodePrevious: DrapoLinkedCubeNode<T> = null;
        let nodePreviousIndex: number = null;
        let compare: number = 0;
        //Context
        for (let i: number = 0; i < context.length; i++) {
            const contextValue: string = context[i];
            while ((compare = contextValue.localeCompare(node.Context[i])) !== 0) {
                if (compare < 0) {
                    const nodeNew: DrapoLinkedCubeNode<T> = this.CreateNode(context, value);
                    this.AddNodeNext(nodeNew, node, i);
                    if (node === this._head) //Replaces head
                        this._head = nodeNew;
                    else if (nodePrevious !== null) //Inserting between two nodes
                        this.AddNodeNext(nodePrevious, nodeNew, nodePreviousIndex);
                    return (nodeNew);
                } else {
                    nodePrevious = node;
                    nodePreviousIndex = i;
                    const nodeNext: DrapoLinkedCubeNode<T> = this.GetNodeNext(node, i);
                    if (nodeNext === null) {
                        //Inserting at the end of linked node
                        const nodeNew: DrapoLinkedCubeNode<T> = this.CreateNode(context, value);
                        this.AddNodeNext(node, nodeNew, i);
                        return (nodeNew);
                    } else {
                        node = nodeNext;
                    }
                }
            }
        }
        //Update
        node.Value = value;
        return (node);
    }

    public Get(context: string[]): T {
        let node: DrapoLinkedCubeNode<T> = this._head;
        while (node !== null) {
            if (this.IsEqualContext(node.Context, context))
                return (node.Value);
            node = this.GetNextInContext(node, context);
        }
        return (null);
    }

    public GetNode(context: string[]): DrapoLinkedCubeNode<T> {
        if (context == null)
            return (null);
        let node: DrapoLinkedCubeNode<T> = this._head;
        while (node !== null) {
            if (this.IsEqualContext(context, node.Context, false))
                return (node);
            node = this.GetNextInContext(node, context);
        }
        return (null);
    }

    public Clear(): void {
        this._head = null;
    }

    public Remove(context: string[]): DrapoLinkedCubeNode<T> {
        if (this._head === null)
            return (null);
        let node: DrapoLinkedCubeNode<T> = this._head;
        let nodePrevious: DrapoLinkedCubeNode<T> = null;
        let nodePreviousIndex: number = null;
        let compare: number = 0;
        //Context
        for (let i: number = 0; ((i < context.length) && (node !== null)); i++) {
            const contextValue: string = context[i];
            while ((compare = contextValue.localeCompare(node.Context[i])) !== 0) {
                if (compare < 0) {
                    return (null);
                } else {
                    nodePrevious = node;
                    nodePreviousIndex = i;
                    const nodeNext: DrapoLinkedCubeNode<T> = this.GetNodeNext(node, i);
                    node = nodeNext;
                    if (node === null)
                        return (null);
                }
            }
        }
        //Link
        if (node !== null) {
            const isContextToRemove: boolean = context.length < this._head.Context.length;
            const nodeNext: DrapoLinkedCubeNode<T> = this.GetNextReverse(node, isContextToRemove ? context.length - 1 : null);
            const nodeNextIndex: number = this.GetNextReverseIndex(node, isContextToRemove ? context.length - 1 : null);
            if (nodePrevious === null) {
                if (nodeNext !== null) {
                    this.MoveLinks(nodeNext, node, nodeNextIndex);
                }
                this._head = nodeNext;
            } else {
                this.MoveLinks(nodeNext, node, nodeNextIndex);
                this.AddNodeNext(nodePrevious, nodeNext, nodePreviousIndex);
            }
        }
        return (node);
    }

    public GetHead(): DrapoLinkedCubeNode<T> {
        return (this._head);
    }

    private CreateNode(context: string[], value: T): DrapoLinkedCubeNode<T> {
        const node: DrapoLinkedCubeNode<T> = new DrapoLinkedCubeNode<T>();
        node.Context = context;
        node.Value = value;
        return (node);
    }

    private GetNextInContext(node: DrapoLinkedCubeNode<T>, context: string[]): DrapoLinkedCubeNode<T> {
        for (let i: number = 0; i < context.length; i++) {
            const compare: number = context[i].localeCompare(node.Context[i]);
            if (compare < 0)
                return (null);
            else if (compare === 0)
                continue;
            if ((node.Next === null) || (node.Next.length <= i))
                return (null);
            return (node.Next[i]);
        }
        return (null);
    }

    private GetNextReverse(node: DrapoLinkedCubeNode<T>, index: number = null): DrapoLinkedCubeNode<T> {
        if (node.Next === null)
            return (null);
        let start: number = index !== null ? index : node.Next.length - 1;
        if (start >= node.Next.length)
            start = node.Next.length - 1;
        for (let i: number = start; i >= 0; i--) {
            const nodeNext = node.Next[i];
            if (nodeNext !== null)
                return (nodeNext);
        }
        return (null);
    }

    private GetNextReverseIndex(node: DrapoLinkedCubeNode<T>, index: number = null): number {
        if (node.Next === null)
            return (null);
        let start: number = index !== null ? index : node.Next.length - 1;
        if (start >= node.Next.length)
            start = node.Next.length - 1;
        for (let i: number = start; i >= 0; i--) {
            const nodeNext = node.Next[i];
            if (nodeNext !== null)
                return (i);
        }
        return (null);
    }

    private IsEqualContext(context1: string[], context2: string[], checkSize: boolean = true): boolean {
        if ((checkSize) && (context1.length != context2.length))
            return (false);
        for (let i: number = 0; i < context1.length; i++)
            if (context1[i] !== context2[i])
                return (false);
        return (true);
    }

    private EnsureNodeNext(node: DrapoLinkedCubeNode<T>, index: number) {
        if (node.Next === null)
            node.Next = [];
        while (node.Next.length <= index)
            node.Next.push(null);
    }

    private AddNodeNext(node: DrapoLinkedCubeNode<T>, nodeNext: DrapoLinkedCubeNode<T>, index: number): void {
        this.EnsureNodeNext(node, index);
        node.Next[index] = nodeNext;
        if (nodeNext === null)
            return;
        if (nodeNext.Next === null)
            return;
        this.MoveLinks(node, nodeNext, index);
    }

    private MoveLinks(node: DrapoLinkedCubeNode<T>, nodeNext: DrapoLinkedCubeNode<T>, index: number = null): void {
        if (node === null)
            return;
        if (nodeNext === null)
            return;
        if (nodeNext.Next === null)
            return;
        this.EnsureNodeNext(node, index);
        for (let i: number = 0; ((index === null) || (i < index)) && (i < nodeNext.Next.length); i++) {
            if (node.Context[i] !== nodeNext.Context[i])
                break;
            if (node.Next[i] === null)
                node.Next[i] = nodeNext.Next[i];
            nodeNext.Next[i] = null;
        }
    }

    private GetNodeNext(node: DrapoLinkedCubeNode<T>, index: number): DrapoLinkedCubeNode<T> {
        if (node.Next === null)
            return (null);
        if (node.Next.length <= index)
            return (null);
        return (node.Next[index]);
    }

    public ToList(node: DrapoLinkedCubeNode<T> = null): DrapoLinkedCubeNode<T>[] {
        const list: DrapoLinkedCubeNode<T>[] = [];
        if (node === null)
            node = this._head;
        if (node != null)
            this.AppendNodeToList(list, node);
        return (list);
    }

    private AppendNodeToList(list: DrapoLinkedCubeNode<T>[], node: DrapoLinkedCubeNode<T>) : void
    {
        list.push(node);
        if (node.Next == null)
            return;
        for (let i: number = 0; i < node.Next.length; i++) {
            const nodeNext: DrapoLinkedCubeNode<T> = node.Next[i];
            if (nodeNext !== null)
                this.AppendNodeToList(list, nodeNext);
        }
    }

    public ToListValues(node: DrapoLinkedCubeNode<T> = null): T[] {
        const listValues: T[] = [];
        const list: DrapoLinkedCubeNode<T>[] = this.ToList(node);
        for (let i: number = 0; i < list.length; i++)
            listValues.push(list[i].Value);
        return (listValues);
    }
}