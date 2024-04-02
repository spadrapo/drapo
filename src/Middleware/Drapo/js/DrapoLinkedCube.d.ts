declare class DrapoLinkedCube<T> {
    private _head;
    AddOrUpdate(context: string[], value: T): DrapoLinkedCubeNode<T>;
    Get(context: string[]): T;
    GetNode(context: string[]): DrapoLinkedCubeNode<T>;
    Clear(): void;
    Remove(context: string[]): DrapoLinkedCubeNode<T>;
    GetHead(): DrapoLinkedCubeNode<T>;
    private CreateNode;
    private GetNextInContext;
    private Compare;
    private GetNextReverse;
    private GetNextReverseIndex;
    private IsEqualContext;
    private EnsureNodeNext;
    private AddNodeNext;
    private MoveLinks;
    private GetNodeNext;
    ToList(node?: DrapoLinkedCubeNode<T>): DrapoLinkedCubeNode<T>[];
    ToListValues(node?: DrapoLinkedCubeNode<T>): T[];
}
