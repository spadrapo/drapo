declare class DrapoLinkedList<T> {
    private _head;
    AddOrUpdate(index: number, value: T): void;
    Get(index: number): T;
    GetHead(): DrapoLinkedListNode<T>;
}
