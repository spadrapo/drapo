class DrapoLinkedCube<T> {
    private _head: DrapoLinkedCubeNode<T> = null;
    //While every context has the same length and only strings, the nodes are found by their context and linked only when the structure is read
    private _isIndexed: boolean = true;
    private _contextLength: number = null;
    private _nodesByContext: Map<string, DrapoLinkedCubeNode<T>> = new Map<string, DrapoLinkedCubeNode<T>>();
    private _nodesToLink: Set<DrapoLinkedCubeNode<T>> = new Set<DrapoLinkedCubeNode<T>>();
    private _nodesToUnlink: DrapoLinkedCubeNode<T>[] = [];

    public AddOrUpdate(context: string[], value: T): DrapoLinkedCubeNode<T> {
        if ((!this._isIndexed) || (!this.IsContextIndexable(context))) {
            this.DisableIndex();
            return (this.AddOrUpdateLinked(context, value));
        }
        const key: string = this.CreateContextKey(context);
        const nodeExisting: DrapoLinkedCubeNode<T> = this._nodesByContext.get(key);
        if (nodeExisting != null) {
            nodeExisting.Value = value;
            return (nodeExisting);
        }
        if (this._nodesByContext.size === 0)
            this._contextLength = context.length;
        else if (this._contextLength !== context.length)
            throw new Error('Drapo: The context to insert in linked cube must be the same lenght of the context lenght of head');
        const node: DrapoLinkedCubeNode<T> = this.CreateNode(context, value);
        this._nodesByContext.set(key, node);
        this._nodesToLink.add(node);
        return (node);
    }

    public Get(context: string[]): T {
        if (this.IsContextIndexed(context)) {
            const node: DrapoLinkedCubeNode<T> = this._nodesByContext.get(this.CreateContextKey(context));
            return (node != null ? node.Value : null);
        }
        this.LinkNodes();
        return (this.GetLinked(context));
    }

    public GetNode(context: string[]): DrapoLinkedCubeNode<T> {
        if (this.IsContextIndexed(context))
            return (this._nodesByContext.get(this.CreateContextKey(context)) ?? null);
        this.LinkNodes();
        return (this.GetNodeLinked(context));
    }

    public Clear(): void {
        this._head = null;
        this._isIndexed = true;
        this._contextLength = null;
        this._nodesByContext.clear();
        this._nodesToLink.clear();
        this._nodesToUnlink = [];
    }

    public Remove(context: string[]): DrapoLinkedCubeNode<T> {
        if (!this.IsContextIndexed(context)) {
            this.LinkNodes();
            const nodeRemoved: DrapoLinkedCubeNode<T> = this.RemoveLinked(context);
            if ((nodeRemoved !== null) && (this._isIndexed))
                this.IndexNodesLinked();
            return (nodeRemoved);
        }
        const key: string = this.CreateContextKey(context);
        const node: DrapoLinkedCubeNode<T> = this._nodesByContext.get(key);
        if (node == null)
            return (null);
        this._nodesByContext.delete(key);
        if (this._nodesByContext.size === 0)
            this.Clear();
        else if (!this._nodesToLink.delete(node))
            this._nodesToUnlink.push(node);
        return (node);
    }

    public GetHead(): DrapoLinkedCubeNode<T> {
        this.LinkNodes();
        return (this._head);
    }

    private AddOrUpdateLinked(context: string[], value: T, nodeToLink: DrapoLinkedCubeNode<T> = null): DrapoLinkedCubeNode<T> {
        //Head
        if (this._head === null) {
            this._head = this.CreateNodeToLink(context, value, nodeToLink);
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
            while ((compare = this.Compare(contextValue,node.Context[i])) !== 0) {
                if (compare < 0) {
                    const nodeNew: DrapoLinkedCubeNode<T> = this.CreateNodeToLink(context, value, nodeToLink);
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
                        const nodeNew: DrapoLinkedCubeNode<T> = this.CreateNodeToLink(context, value, nodeToLink);
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

    private GetLinked(context: string[]): T {
        let entry: [DrapoLinkedCubeNode<T>, number] = null;
        let node: DrapoLinkedCubeNode<T> = this._head;
        let index: number = 0;
        while (node !== null) {
            if (this.IsEqualContext(node.Context, context))
                return (node.Value);
            entry = this.GetNextInContext(node, context, index);
            if (entry === null)
                break;
            node = entry[0];
            index = entry[1];
        }
        return (null);
    }

    private GetNodeLinked(context: string[]): DrapoLinkedCubeNode<T> {
        if (context == null)
            return (null);
        let entry: [DrapoLinkedCubeNode<T>,number] = null;
        let node: DrapoLinkedCubeNode<T> = this._head;
        let index: number = 0;
        while (node !== null) {
            if (this.IsEqualContext(context, node.Context, false))
                return (node);
            entry = this.GetNextInContext(node, context, index);
            if (entry === null)
                break;
            node = entry[0];
            index = entry[1];
        }
        return (null);
    }

    private RemoveLinked(context: string[]): DrapoLinkedCubeNode<T> {
        if (this._head === null)
            return (null);
        let node: DrapoLinkedCubeNode<T> = this._head;
        let nodePrevious: DrapoLinkedCubeNode<T> = null;
        let nodePreviousIndex: number = null;
        let compare: number = 0;
        //Context
        for (let i: number = 0; ((i < context.length) && (node !== null)); i++) {
            const contextValue: string = context[i];
            while ((compare = this.Compare(contextValue,node.Context[i])) !== 0) {
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

    private IsContextIndexable(context: string[]): boolean {
        if (context == null)
            return (false);
        for (let i: number = 0; i < context.length; i++)
            if (typeof context[i] !== 'string')
                return (false);
        return (true);
    }

    private IsContextIndexed(context: string[]): boolean {
        return ((this._isIndexed) && (context != null) && (context.length === this._contextLength) && (this.IsContextIndexable(context)));
    }

    private CreateContextKey(context: string[]): string {
        return (JSON.stringify(context));
    }

    private DisableIndex(): void {
        if (!this._isIndexed)
            return;
        this.LinkNodes();
        this._isIndexed = false;
        this._contextLength = null;
        this._nodesByContext.clear();
    }

    private IndexNodesLinked(): void {
        this._nodesByContext.clear();
        const nodes: DrapoLinkedCubeNode<T>[] = this.ToList();
        for (let i: number = 0; i < nodes.length; i++)
            this._nodesByContext.set(this.CreateContextKey(nodes[i].Context), nodes[i]);
        if (nodes.length === 0)
            this.Clear();
    }

    private LinkNodes(): void {
        const nodesChanged: number = this._nodesToLink.size + this._nodesToUnlink.length;
        if (nodesChanged === 0)
            return;
        //Each change walks the linked nodes, so many changes on many nodes relink every node instead
        const nodesCount: number = this._nodesByContext.size;
        const nodesLinkedCount: number = nodesCount - this._nodesToLink.size + this._nodesToUnlink.length;
        if (nodesChanged * nodesLinkedCount > 4 * nodesCount * Math.ceil(Math.log2(nodesCount + 2)))
            this.RelinkNodes();
        else
            this.LinkNodesChanged();
        this._nodesToLink.clear();
        this._nodesToUnlink = [];
    }

    private LinkNodesChanged(): void {
        for (let i: number = 0; i < this._nodesToUnlink.length; i++)
            this.RemoveLinked(this._nodesToUnlink[i].Context);
        const nodes: DrapoLinkedCubeNode<T>[] = [];
        this._nodesToLink.forEach((node: DrapoLinkedCubeNode<T>) => nodes.push(node));
        this.LinkNodesDescending(nodes);
    }

    private RelinkNodes(): void {
        const nodes: DrapoLinkedCubeNode<T>[] = [];
        this._nodesByContext.forEach((node: DrapoLinkedCubeNode<T>) => {
            node.Next = null;
            nodes.push(node);
        });
        this._head = null;
        this.LinkNodesDescending(nodes);
    }

    private LinkNodesDescending(nodes: DrapoLinkedCubeNode<T>[]): void {
        //A node linked before every other node only walks its own context
        nodes.sort((nodeA: DrapoLinkedCubeNode<T>, nodeB: DrapoLinkedCubeNode<T>) => this.CompareContext(nodeB.Context, nodeA.Context));
        for (let i: number = 0; i < nodes.length; i++)
            this.AddOrUpdateLinked(nodes[i].Context, nodes[i].Value, nodes[i]);
    }

    private CompareContext(context1: string[], context2: string[]): number {
        for (let i: number = 0; i < context1.length; i++) {
            const compare: number = this.Compare(context1[i], context2[i]);
            if (compare !== 0)
                return (compare);
        }
        return (0);
    }

    private CreateNode(context: string[], value: T): DrapoLinkedCubeNode<T> {
        const node: DrapoLinkedCubeNode<T> = new DrapoLinkedCubeNode<T>();
        node.Context = context;
        node.Value = value;
        return (node);
    }

    private CreateNodeToLink(context: string[], value: T, nodeToLink: DrapoLinkedCubeNode<T>): DrapoLinkedCubeNode<T> {
        if (nodeToLink !== null)
            return (nodeToLink);
        return (this.CreateNode(context, value));
    }

    private GetNextInContext(node: DrapoLinkedCubeNode<T>, context: string[], index : number): [DrapoLinkedCubeNode<T>,number] {
        for (let i: number = index; i < context.length; i++) {
            const compare: number = this.Compare(context[i],node.Context[i]);
            if (compare < 0)
                return (null);
            else if (compare === 0)
                continue;
            if ((node.Next === null) || (node.Next.length <= i))
                return (null);
            return ([node.Next[i], i]);
        }
        return (null);
    }

    private Compare(value1: string, value2: string): number {
        if (value1 < value2)
            return (-1);
        if (value1 > value2)
            return (1);
        return (0);
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
        this.LinkNodes();
        const list: DrapoLinkedCubeNode<T>[] = [];
        const stack: DrapoLinkedCubeNode<T>[] = [];
        if (node === null)
            node = this._head;
        while (node != null || stack.length > 0) {
            if (node != null) {
                list.push(node);
                if (node.Next != null) {
                    for (let i: number = node.Next.length - 1; i >= 0; i--) {
                        const nodeNext: DrapoLinkedCubeNode<T> = node.Next[i];
                        if (nodeNext !== null)
                            stack.push(nodeNext);
                    }
                }
            }
            node = stack.pop();
        }
        return list;
    }

    public ToListValues(node: DrapoLinkedCubeNode<T> = null): T[] {
        const listValues: T[] = [];
        const list: DrapoLinkedCubeNode<T>[] = this.ToList(node);
        for (let i: number = 0; i < list.length; i++)
            listValues.push(list[i].Value);
        return (listValues);
    }
}