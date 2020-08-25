declare class DrapoLinkedTable<T> {
    private _head;
    AddOrUpdate(row: number, column: number, value: T): void;
    Get(row: number, column: number): T;
    GetHead(): DrapoLinkedTableNode<T>;
    Delete(row: number, column: number): void;
}
