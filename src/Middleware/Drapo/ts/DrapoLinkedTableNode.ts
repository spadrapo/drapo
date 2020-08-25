class DrapoLinkedTableNode<T> {
    public Value: T = null;
    public NextCell: DrapoLinkedTableNode<T> = null;
    public NextRow: DrapoLinkedTableNode<T> = null;
    public Row: number = null;
    public Column: number = null;
}