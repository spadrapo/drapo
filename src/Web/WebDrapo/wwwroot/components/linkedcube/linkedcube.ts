async function linkedcubeConstructor(el: HTMLElement, app: DrapoApplication): Promise<any> {
    //Initialize
    let instance: LinkedCube = new LinkedCube(el, app);
    await instance.Initalize();
    return (instance);
}

class LinkedCube {
    //Field
    private _el: HTMLElement = null;
    private _app: DrapoApplication;
    private _cube: DrapoLinkedCube<string> = null;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: DrapoApplication) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
        this._cube = new DrapoLinkedCube<string>();
        const type = this._el.getAttribute('dc-type');
        if (type === 'add') {
            await this.Add('p1', 'r1', 'c1', 'v1');
            await this.Add('p1', 'r2', 'c1', 'v2');
            await this.Add('p1', 'r2', 'c2', 'v3');
            await this.Add('p1', 'r1', 'c3', 'v4');
            await this.Add('p2', 'r2', 'c1', 'v5');
            await this.Add('p3', 'r1', 'c1', 'v6');
            await this.Add('p2', 'r1', 'c1', 'v7');
            await this.Add('p2', 'r1', 'c2', 'v8');
            await this.Add('p0', 'r1', 'c1', 'v9');
        } else if (type === 'remove') {
            await this.Add('p1', 'r1', 'c1', 'v1');
            await this.Add('p1', 'r2', 'c1', 'v2');
            await this.Add('p1', 'r2', 'c2', 'v3');
            await this.Add('p1', 'r1', 'c3', 'v4');
            await this.Add('p2', 'r2', 'c1', 'v5');
            await this.Add('p3', 'r1', 'c1', 'v6');
            await this.Add('p2', 'r1', 'c1', 'v7');
            await this.Add('p2', 'r1', 'c2', 'v8');
            await this.Add('p0', 'r1', 'c1', 'v9');
            await this.Remove('p2','','');
            await this.Remove('p1', 'r2', 'c1');
            await this.Remove('p0', 'r1', '');
        }
    }

    private GetElementCube(): HTMLDivElement {
        return (<HTMLDivElement>this._el.children[2]);
    }

    public async Add(page: string, row: string, column: string, value: string): Promise<void> {
        const context: string[] = [page, row, column];
        this._cube.AddOrUpdate(context, value);
        await this.Render();
    }

    public async Clear(): Promise<void> {
        this._cube.Clear();
        this.Render();
    }

    public async Remove(page: string, row: string, column: string): Promise<void> {
        const context: string[] = [];
        if (page != '')
            context.push(page);
        if (row != '')
            context.push(row);
        if (column != '')
            context.push(column);
        this._cube.Remove(context);
        await this.Render();
    }

    public async Render(): Promise<void> {
        const elCube: HTMLDivElement = this.GetElementCube();
        while (elCube.children.length > 0)
            elCube.removeChild(elCube.children[0]);
        const fragment: DocumentFragment = document.createDocumentFragment();
        const node: DrapoLinkedCubeNode<string> = this._cube.GetHead();
        this.InsertNodeElement(fragment, node, null, 0, 0);
        elCube.appendChild(fragment);
    }

    private InsertNodeElement(fragment: DocumentFragment, node: DrapoLinkedCubeNode<string>, nodePrevious: DrapoLinkedCubeNode<string>, index: number, identation: number): void {
        const elDiv: HTMLDivElement = document.createElement('div');
        const elSpan: HTMLSpanElement = document.createElement('span');
        elSpan.style.left = (identation * 20) + 'px';
        elSpan.textContent = this.CreateNodeText(node, nodePrevious, index);
        if (this.HasError(node, nodePrevious, index))
            elSpan.style.color = 'red';
        else
            elSpan.style.color = 'green';
        elDiv.appendChild(elSpan);
        fragment.appendChild(elDiv);
        if (node.Next === null)
            return;
        for (let i: number = node.Next.length - 1; i >= 0; i--) {
            const nodeNext: DrapoLinkedCubeNode<string> = node.Next[i];
            if (nodeNext === null)
                continue;
            this.InsertNodeElement(fragment, nodeNext, node, i, i);
        }
    }

    private CreateNodeText(node: DrapoLinkedCubeNode<string>, nodePrevious: DrapoLinkedCubeNode<string>, index: number): string {
        let text: string = '[' + this.CreateContextText(node.Context) + '] ' + node.Value;
        if (nodePrevious !== null) {
            text = text + ' : ' + index + ' <= (' + this.CreateContextText(nodePrevious.Context) + ')';
        }
        return (text);
    }

    private CreateContextText(context: string[]): string {
        let text: string = '';
        for (let i = 0; i < context.length; i++) {
            if (i > 0)
                text = text + ',';
            text = text + context[i];
        }
        return (text);
    }

    private HasError(node: DrapoLinkedCubeNode<string>, nodePrevious: DrapoLinkedCubeNode<string>, index: number): boolean {
        if (nodePrevious === null)
            return (false)
        for (let i: number = 0; i < index; i++) {
            if (node.Context[i] !== nodePrevious.Context[i])
                return (true);
        }
        return (false);
    }
}