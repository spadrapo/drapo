class DrapoLinkedCubeNode<T> {
    public Value: T = null;
    public Context: string[] = null;
    public Next: DrapoLinkedCubeNode<T>[] = null;
}