declare class DrapoLinkedTableNode<T> {
    Value: T;
    NextCell: DrapoLinkedTableNode<T>;
    NextRow: DrapoLinkedTableNode<T>;
    Row: number;
    Column: number;
}
