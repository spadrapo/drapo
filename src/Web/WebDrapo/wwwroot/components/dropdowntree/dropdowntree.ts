async function dropdowntreeConstructor(el: HTMLElement, app: DrapoApplication): Promise<any> {
    //Initialize
    const dropdowntree: DropDownTree = new DropDownTree(el, app);
    await dropdowntree.Initalize();
    return (dropdowntree);
}

class DropDownTree {
    private readonly TYPE_INLINE: string = 'inline';
    private readonly LEFT: number = 37;
    private readonly RIGHT: number = 39;
    private readonly UP: number = 38;
    private readonly DOWN: number = 40;
    private readonly ENTER: number = 13;
    private readonly TAB: number = 9;
    //Field
    private _el: HTMLElement = null;
    private _app: DrapoApplication;
    private _state: string = 'closed';
    private _classOpen: string = null;
    private _classClose: string = null;
    private _classExpand: string = null;
    private _classCollapse: string = null;
    private _classNode: string = null;
    private _classSelected: string = null;
    private _classSelection: string = null;
    private _dataKey: string = null;
    private _sector: string = null;
    private _prefix: string = null;
    private _key: string = null;
    private _value: string = null;
    private _model: string = null;
    private _onModelChange: string = null;
    private _hierarchy: string = null;
    private _expanded: string[] = [];
    private _data: any[] = null;
    private _keySelected: string = null;
    private _isSearching: boolean = false;
    private _isNullable: boolean = false;
    private _isFirstOrDefault: boolean = false;
    private _isEnsureValidSelection: boolean = false;
    private _isFixed: boolean = null;
    private _valueText: string = null;
    private _watchText: string = null;
    private _viewtype: string = null;
    private _allowMustache: boolean = false;
    private _selectionIndex: number = null;
    private _hasHierarchy: Boolean = true;
    private _modelNotify: boolean = true;
    private _multiselection: boolean = false;
    private _onClose: string = null;
    //Properties
    //Constructors
    constructor(el: HTMLElement, app: DrapoApplication) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
        this._classOpen = this._el.getAttribute('dc-classOpen');
        this._classClose = this._el.getAttribute('dc-classClose');
        this._classExpand = this._el.getAttribute('dc-classExpand');
        this._classCollapse = this._el.getAttribute('dc-classCollapse');
        this._classNode = this._el.getAttribute('dc-classNode');
        this._classSelected = this._el.getAttribute('dc-classSelected');
        this._classSelection = this._el.getAttribute('dc-classSelection');
        this._dataKey = this._el.getAttribute("dc-dataKey");
        this._prefix = this._el.getAttribute("dc-prefix");
        this._key = this._el.getAttribute("dc-key");
        this._value = this._el.getAttribute("dc-value");
        this._hierarchy = this._el.getAttribute("dc-hierarchy");
        this._model = this._el.getAttribute("dc-model");
        this._onModelChange = this._el.getAttribute("dc-on-model-change");
        this._isNullable = this._el.getAttribute("dc-nullable") === 'true';
        this._isFirstOrDefault = this._el.getAttribute("dc-firstOrDefault") === 'true';
        this._isEnsureValidSelection = this._el.getAttribute("dc-ensureValidSelection") === 'true';
        const sector = this._el.getAttribute("dc-sector");
        this._sector = sector == '' ? this._app.Document.GetSector(this._el) : sector;
        this._valueText = this._el.getAttribute("dc-valueText");
        this._watchText = this._el.getAttribute("dc-watchText");
        this._viewtype = this._el.getAttribute("dc-viewtype");
        this._allowMustache = this._el.getAttribute("dc-allowMustache") === 'true';
        this._modelNotify = this._el.getAttribute("dc-modelNotify") === 'true';
        this._multiselection = this._el.getAttribute("dc-multiselection") === 'true';
        this._onClose = this._el.getAttribute("dc-on-close");
        //UI
        const elButton: HTMLElement = this.GetElementButton(this._el);
        const elTextArea: HTMLTextAreaElement = this.GetElementText(this._el);
        const elList: HTMLElement = this.GetElementList(this._el);
        const eljButton: JQuery = $(elButton);
        eljButton.addClass(this._classOpen);
        const dropdowntree: DropDownTree = this;
        //Handlers
        document.addEventListener('mouseup', (evt) => { dropdowntree.HandleDocumentMouseUp(evt); }, false);
        window.addEventListener('scroll', (evt) => { dropdowntree.HandleDocumentScroll(evt); }, true);
        elButton.addEventListener('click', async (evt) => { await dropdowntree.HandleButtonClick(evt); }, false);
        elTextArea.addEventListener('click', async (evt) => { await dropdowntree.HandleTextClick(evt); }, false);
        elTextArea.addEventListener('focus', (evt) => { dropdowntree.HandleTextFocus(evt); }, false);
        elTextArea.addEventListener('blur', async (evt) => { await dropdowntree.HandleTextBlur(evt); }, false);
        if (!this._multiselection) {
            elTextArea.addEventListener('keyup', async (evt) => { await dropdowntree.HandleTextKeyUp(evt); }, false);
            elTextArea.addEventListener('keydown', async (evt) => { await dropdowntree.HandleTextKeyDown(evt); }, false);
        }
        elList.addEventListener('click', async (evt) => { await dropdowntree.HandleListClick(evt); }, false);
        if (this._multiselection)
            elTextArea.readOnly = true;
        if ((this._watchText != null) && (this._watchText != ''))
            this._app.Observer.SubscribeComponent(this._watchText, this._el, async () => { await dropdowntree.WatchText(); });
        if (this._viewtype === this.TYPE_INLINE) {
            this._el.addEventListener('keyup', async (evt) => { await dropdowntree.HandleListKeyUp(evt); }, false);
            elButton.style.display = 'none';
            elTextArea.style.display = 'none';
            await this.EnsureModelData();
            await this.ActionOpen();
        } else {
            await this.FillText();
        }
        //Subscribe
        this._app.Observer.SubscribeComponent(this._model, this._el, async () => { await dropdowntree.HandleDataSelectionChanged(); }, elTextArea);
        this._app.Observer.SubscribeComponent(this._dataKey, this._el, async () => { await dropdowntree.HandleDataSourceChanged(); });
    }

    private GetElementText(el: HTMLElement): HTMLTextAreaElement {
        return (el.children[0] as HTMLTextAreaElement);
    }

    private GetElementButton(el: HTMLElement): HTMLElement {
        return (el.children[1] as HTMLElement);
    }

    private GetElementList(el: HTMLElement): HTMLElement {
        return (el.children[2] as HTMLElement);
    }

    private async HandleButtonClick(evt: any) {
        const state: string = this._state;
        if (state === 'closed') {
            await this.ActionOpen();
            if (this._allowMustache)
                await this._app.Document.ResolveComponentUpdate(this._el, null);
        }
        else
            await this.ActionClose();
    }

    private async HandleDocumentMouseUp(evt: any) {
        const el = this._el;
        let elTarget: HTMLElement = evt.target as HTMLElement;
        while ((elTarget != null) && (elTarget != el))
            elTarget = elTarget.parentElement;
        if (elTarget == el)
            return;
        await this.ActionClose();
    }

    private async HandleDocumentScroll(evt: any) {
        const el = this._el;
        let elTarget: HTMLElement = evt.target as HTMLElement;
        while ((elTarget != null) && (elTarget != el))
            elTarget = elTarget.parentElement;
        if (elTarget == el)
            return;
        await this.ActionClose();
    }

    private async HandleTextClick(evt: any) {
        await this.ActionOpen();
    }

    private HandleTextFocus(evt: any) {
        const elText: HTMLTextAreaElement = this.GetElementText(this._el);
        if (!this._multiselection)
            elText.select();
    }

    private async HandleTextBlur(evt: any) {
        const el = this._el;
        let elTarget: HTMLElement = evt.relatedTarget as HTMLElement;
        while ((elTarget != null) && (elTarget != el))
            elTarget = elTarget.parentElement;
        if (elTarget == el)
            return;
        await this.ActionFinish();
    }

    private async HandleTextKeyUp(evt: any) {
        const keycode = evt.which;
        const elText: HTMLTextAreaElement = this.GetElementText(this._el);
        if (keycode == this.TAB || keycode == this.LEFT || keycode == this.RIGHT) {
            return;
        }
        if (keycode == this.ENTER) {
            await this.ActionFinish();
            event.preventDefault();
            event.stopPropagation();
            if (this._isSearching) {
                this._isSearching = false;
                const list = this.GetElementList(this._el);
                const key: string = list.firstElementChild.getAttribute('key');
                if (key != null) {
                    await this.ActionSelect(key);
                    return;
                }
            }
            elText.select();
            return;
        }
        const value: string = elText.value;
        if (value.length > 2) {
            await this.FillListSearch(value);
        }
        else if (value.length == 0) {
            await this.FillListTree(true);
        }
        if (this._allowMustache) {
            const list: HTMLElement = this.GetElementList(this._el);
            await this._app.Document.ResolveComponentUpdate(list, null);
        }
    }

    private async HandleListKeyUp(evt: KeyboardEvent): Promise<void> {
        const keyCode: number = evt.which;
        if (keyCode == this.DOWN) {
            this.ChangeSelectionDown();
        } else if (keyCode == this.UP) {
            this.ChangeSelectionUp();
        } else if (keyCode == this.ENTER) {
            await this.ApplySelection();
        } else if (keyCode == this.RIGHT) {
            await this.ChangeSelectionExpand();
        } else if (keyCode == this.LEFT) {
            await this.ChangeSelectionCollapse();
        }
    }

    private async HandleTextKeyDown(evt: any) {
        await this.ActionOpen();
        if (evt.which == 13) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    private async HandleListClick(evt: any) : Promise<void> {
        const elTarget = evt.target;
        const exp: string = elTarget.getAttribute('exp');
        if (exp != null) {
            await this.SwitchExpanded(exp);
        } else {
            const elcTarget = evt.currentTarget;
            let key: string = null;
            let el: HTMLElement = elTarget;
            while (el != null) {
                if (el == elcTarget)
                    break;
                key = el.getAttribute('key');
                if (key != null)
                    break;
                el = el.parentElement;
            }
            if (key != null)
                await this.ActionSelect(key);
        }
    }

    public async HandleDataSourceChanged(): Promise<void> {
        this._data = null;
        this._keySelected = null;
        await this.FillText();
        await this.ReloadList();
    }

    public async HandleDataSelectionChanged(): Promise<void> {
        this._keySelected = null;
        await this.FillText();
        await this.ReloadList();
    }

    private IsFixed(): boolean {
        if (this._isFixed === null) {
            const el: HTMLElement = this._el;
            const elList: HTMLElement = this.GetElementList(el);
            const style: CSSStyleDeclaration = window.getComputedStyle(elList);
            const position: string = style.getPropertyValue('position');
            this._isFixed = position === 'fixed';
        }
        return (this._isFixed);
    }

    private GetElementListTop(): number {
        const el: HTMLElement = this._el;
        const elRect: DOMRect = el.getBoundingClientRect();
        return (elRect.top + elRect.height);
    }

    private GetElementListWidth(): number {
        const el: HTMLElement = this._el;
        const elRect: DOMRect = el.getBoundingClientRect();
        return (elRect.width);
    }

    private async ActionOpen(): Promise<void> {
        const el: HTMLElement = this._el;
        if (this._state === 'opened')
            return;
        this._state = 'opened';
        await this.FillListTree();
        //ButtonFocus
        const elj: JQuery = $(this.GetElementText(el));
        elj.addClass('buttonFocus');
        //Button
        const elButton: HTMLElement = this.GetElementButton(el);
        const eljButton: JQuery = $(elButton);
        eljButton.removeClass(this._classOpen);
        eljButton.addClass(this._classClose);
        //List
        const elList: HTMLElement = this.GetElementList(el);
        if (this.IsFixed()) {
            elList.style.top = this.GetElementListTop() + 'px';
            elList.style.width = this.GetElementListWidth() + 'px';
        }
        elList.style.display = '';
    }

    private CanClose(): boolean {
        return (this._viewtype !== this.TYPE_INLINE);
    }

    private async ActionClose(): Promise<void> {
        if (!this.CanClose())
            return;
        const el: HTMLElement = this._el;
        if (this._state === 'closed')
            return;
        this._state = 'closed';
        //ButtonFocus
        const elj: JQuery = $(this.GetElementText(el));
        elj.removeClass('buttonFocus');
        //Button
        const elButton: HTMLElement = this.GetElementButton(el);
        const eljButton: JQuery = $(elButton);
        eljButton.removeClass(this._classClose);
        eljButton.addClass(this._classOpen);
        //List
        const elList: HTMLElement = this.GetElementList(el);
        elList.style.display = 'none';
        if (this._onClose !== null)
            await this._app.FunctionHandler.ResolveFunctionWithoutContext(this._sector, this._el, this._onClose);
    }

    private async NotifyModelData(): Promise<void> {
        const modelDataKey = this._app.Parser.ParseMustache(this._model)[0];
        await this._app.Observer.Notify(modelDataKey, null, []);
    }

    private async ActionFinish(): Promise<void> {
        const elText: HTMLTextAreaElement = this.GetElementText(this._el);
        const value: string = elText.value;
        const key: string = await this.GetKey(value);
        if (!this._multiselection) {
            if (key === null) {
                let valueKey: string = await this.GetValue(this._keySelected);
                if (this._allowMustache && this._app.Parser.IsMustache(valueKey)) {
                    valueKey = await this._app.Storage.RetrieveDataValue(this._sector, valueKey);
                }
                elText.value = valueKey != null ? valueKey : '';
            } else {
                await this.UpdateModelData(key);
            }
        }
        await this.ActionClose();
    }

    private async ActionSelect(key: string): Promise<void> {
        //Close List
        if (!this._multiselection)
            await this.ActionClose();
        //Data
        await this.UpdateModelData(key);
        //Update Text
        await this.FillText();
    }

    private async GetData(): Promise<any[]> {
        if (this._data === null) {
            const data: any[] = await this._app.Storage.RetrieveData(this._dataKey, this._sector);
            if (this._prefix != null) {
                const mustache: string = '{{' + this._dataKey + '.' + this._prefix + '}}';
                const dataPath: string[] = this._app.Parser.ParseMustache(mustache);
                this._data = this._app.Solver.ResolveDataObjectPathObject(data, dataPath);
            } else {
                this._data = data;
            }
            this._hasHierarchy = this.HasDataHierarchy(this._data);
        }
        return (this._data);
    }

    private async GetModelData(): Promise<string | string[]>{
        if (this._multiselection) {
            let selections: string[] = [];
            const selectionsAux: string[] | string = await this._app.Storage.RetrieveDataValue(this._sector, this._model);
            if (Array.isArray(selectionsAux))
                selections = selectionsAux;
            if (selections.length === 0 && this._isFirstOrDefault && this._state !== 'opened') {
                const datas: any[] = await this.GetData();
                const firstValue = await this.GetFirstOrDefaultValue(datas);
                selections.push(firstValue);
                this.NotifyModelData();
            }
            return selections;
        }
        if (this._keySelected === null) {
            this._keySelected = await this._app.Storage.RetrieveDataValue(this._sector, this._model);
            if (this._keySelected != null) {
                if ((this._keySelected != '') && (this._isEnsureValidSelection)) {
                    const isKeyValid: boolean = await this.IsKeyValid(this._keySelected);
                    if (!isKeyValid)
                        this._keySelected = '';
                } else {
                    await this.EnsureNodeVisible(this._keySelected);
                }
                if ((this._keySelected == '') && (this._isFirstOrDefault)) {
                    const datas: any[] = await this.GetData();
                    const firstValue = await this.GetFirstOrDefaultValue(datas);
                    await this.UpdateModelData(firstValue);
                }
            }
        }
        return (this._keySelected);
    }

    private async EnsureModelData(): Promise<void> {
        await this.GetModelData();
    }

    private GetDataKey(data: any): string {
        if (this._key == '')
            return (data);
        const key: string = data[this._key];
        if ((key == null))
            return ('');
        return (key);
    }

    private GetDataValue(data: any): string {
        if (this._value == '')
            return (data);
        const value: string = data[this._value];
        if ((value == null))
            return ('');
        return (value);
    }

    private GetDataHierarchy(data: any): any[] {
        const datas: any[] = data[this._hierarchy];
        if ((datas == null) || (datas.length == null) || (datas.length == 0))
            return (null);
        return (datas);
    }

    private async IsKeyValid(key: string): Promise<boolean> {
        const value: string = await this.GetValue(key);
        return (value !== null);
    }

    private async GetValue(key: string): Promise<string> {
        const data: any[] = await this.GetData();
        const value: string = this.GetValueInternal(key, data);
        return (value);
    }

    private GetValueInternal(key: string, datas: any[]): string {
        for (let i: number = 0; i < datas.length; i++) {
            const data: any = datas[i];
            const nodeKey: string = this.GetDataKey(data);
            if ((((nodeKey === "0") || (nodeKey === "")) && (nodeKey === key.toString())) || ((nodeKey !== "0") && (nodeKey !== "") && (nodeKey == key)))
                return (this.GetDataValue(data));
            const dataHierarchy: any[] = this.GetDataHierarchy(data);
            if (dataHierarchy == null)
                continue;
            const dataHierarchyKey: string = this.GetValueInternal(key, dataHierarchy);
            if (dataHierarchyKey != null)
                return (dataHierarchyKey);
        }
        return (null);
    }

    private async GetKey(value: string): Promise<string> {
        const data: any[] = await this.GetData();
        const key: string = this.GetKeyInternal(value, data);
        return (key);
    }

    private GetKeyInternal(value: string, datas: any[]): string {
        for (let i: number = 0; i < datas.length; i++) {
            const data: any = datas[i];
            const nodeValue: string = this.GetDataValue(data);
            if ((((nodeValue === "0") || (nodeValue === "")) && (nodeValue === value.toString())) || ((nodeValue !== "0") && (nodeValue !== "") && (nodeValue == value)))
                return (this.GetDataKey(data));
            const dataHierarchy: any[] = this.GetDataHierarchy(data);
            if (dataHierarchy == null)
                continue;
            const dataHierarchyValue: string = this.GetKeyInternal(value, dataHierarchy);
            if (dataHierarchyValue != null)
                return (dataHierarchyValue);
        }
        return (null);
    }

    private IsNodeExpanded(id: string): boolean {
        for (let i: number = 0; i < this._expanded.length; i++)
            if (this._expanded[i] == id)
                return (true);
        return (false);
    }

    private IsNodeMatch(search: string, value: string): boolean {
        if (search == null)
            return (true);
        return (value.toLowerCase().indexOf(search) >= 0);
    }

    private async SwitchExpanded(id: string): Promise<void> {
        let found: boolean = false;
        for (let i: number = this._expanded.length - 1; i >= 0; i--) {
            if (this._expanded[i] != id)
                continue;
            this._expanded.splice(i, 1);
            found = true;
            break;
        }
        if (!found)
            this._expanded.push(id);
        await this.FillListTree(true);
    }

    private GetFirstOrDefaultValue(datas: any[]): string {
        for (let i: number = 0; i < datas.length; i++) {
            const data: any = datas[i];
            const nodeKey: string = this.GetDataKey(data);
            if (nodeKey !== '')
                return nodeKey;
        }
        return '';
    }

    private async EnsureNodeVisible(key: string): Promise<void> {
        this._expanded = [];
        const data: any[] = await this.GetData();
        let parentKey: string = key;
        while (parentKey = this.GetKeyParent(parentKey, null, data))
            this._expanded.push(parentKey);
    }

    private GetKeyParent(key: string, parentKey: string, datas: any[]): string {
        for (let i: number = 0; i < datas.length; i++) {
            const data: any = datas[i];
            const nodeKey: string = this.GetDataKey(data);
            if ((((nodeKey === "0") || (nodeKey === "")) && (nodeKey === key.toString())) || ((nodeKey !== "0") && (nodeKey !== "") && (nodeKey == key))) {
                return (parentKey);
            }
            const dataHierarchy: any[] = this.GetDataHierarchy(data);
            if (dataHierarchy == null)
                continue;
            const parentKeyChild = this.GetKeyParent(key, nodeKey, dataHierarchy);
            if (parentKeyChild !== null)
                return (parentKeyChild);
        }
        return (null);
    }

    public async WatchText(): Promise<void> {
        const text: string = await this._app.Storage.RetrieveDataValue(this._sector, this._watchText);
        await this.FillListSearch(text);
    }

    private async FillText(key: string = null): Promise<void> {
        const el: HTMLElement = this._el;
        const elText: HTMLTextAreaElement = this.GetElementText(el);
        const keySelected: string | string[] = ((key == null) || (this._multiselection)) ? await this.GetModelData() : key;
        let value = null;
        if (Array.isArray(keySelected)) {
            value = '';
            for (let i: number = 0; i < keySelected.length; i++) {
                const valueSelected = await this.GetValue(keySelected[i]);
                if (valueSelected == null)
                    continue;
                if (value.length > 0)
                    value = value + ', ';
                value = value + valueSelected;
            }
        } else {
            if ((keySelected == null) || (keySelected === '')) {
                elText.value = '';
                elText.setAttribute('title', '');
                return;
            }
            value = await this.GetValue(keySelected);
            if (this._allowMustache && this._app.Parser.IsMustache(value)) {
                value = await this._app.Storage.RetrieveDataValue(this._sector, value);
            }
        }
        elText.value = value ?? '';
        elText.setAttribute('title', value ?? '');
        await this.SetValueText();
    }

    private ClearList(list: HTMLElement) {
        list.innerHTML = '';
        this._selectionIndex = null;
    }

    public async ReloadList(): Promise<void> {
        const el: HTMLElement = this._el;
        const list: HTMLElement = this.GetElementList(el);
        this.ClearList(list);
        this._data = null;
        await this.FillListTree(true);
    }

    private async FillListTree(forced: boolean = false): Promise<void> {
        this._isSearching = false;
        const el: HTMLElement = this._el;
        const list: HTMLElement = this.GetElementList(el);
        if ((!forced) && (list.childNodes.length > 0))
            return;
        const data: any[] = await this.GetData();
        const modelData: string[] | string = await this.GetModelData();
        const fragment: DocumentFragment = document.createDocumentFragment();
        if (this._isNullable)
            fragment.appendChild(this.CreateNode('', ''));
        this.AppendNodes(fragment, data, modelData, 0, true, null);
        this.ClearList(list);
        list.appendChild(fragment);
    }

    private async FillListSearch(search: string): Promise<void> {
        this._isSearching = true;
        const el: HTMLElement = this._el;
        const list: HTMLElement = this.GetElementList(el);
        const data: any[] = await this.GetData();
        const modelData: string[] | string = await this.GetModelData();
        const fragment: DocumentFragment = document.createDocumentFragment();
        if (search == '')
            this.AppendNodes(fragment, data, modelData, 0, true, null);
        else
            this.AppendNodes(fragment, data, modelData, 0, false, search.toLowerCase());
        this.ClearList(list);
        list.appendChild(fragment);
    }

    private AppendNodes(parent: Node, data: any[], modelData: string | string[], level: number, isTree: boolean, search: string): void {
        for (let i: number = 0; i < data.length; i++)
            this.AppendNode(parent, data[i], modelData, level, isTree, search);
    }

    private AppendNode(parent: Node, data: any, modelData: string[] | string = null, level: number, isTree: boolean, search: string): void {
        const nodeKey: string = this.GetDataKey(data);
        const nodeValue = this.GetDataValue(data);
        const dataHierarchy: any[] = this.GetDataHierarchy(data);
        const isExpanded: boolean = this.IsNodeExpanded(nodeKey);
        if (this.IsNodeMatch(search, nodeValue)) {
            const elNode: HTMLElement = this.CreateNode(nodeKey, nodeValue, isTree, dataHierarchy, level, isExpanded, modelData);
            parent.appendChild(elNode);
        }
        //Children
        if ((dataHierarchy == null) || ((!isExpanded) && (isTree)))
            return;
        this.AppendNodes(parent, dataHierarchy, modelData, level + (isTree ? 1 : 0), isTree, search);
    }

    private CreateNode(nodeKey: string, nodeValue: string, isTree: boolean = false, dataHierarchy: any[] = null, level: number = 0, isExpanded: boolean = false, modelData: string[] | string = null): HTMLElement {
        const elNode: HTMLElement = document.createElement('div');
        elNode.setAttribute('key', nodeKey);
        let classNode: string = '';
        if (this._classNode != null)
            classNode = this._classNode;
        if (nodeKey == this._keySelected)
            classNode = classNode + ' ' + this._classSelected;
        elNode.setAttribute('class', classNode);
        if (isTree) {
            const elLevel: HTMLElement = document.createElement('div');
            for (let i: number = 0; i < level; i++) {
                const elLevelNode: HTMLElement = document.createElement('div');
                elLevel.appendChild(elLevelNode);
            }
            elNode.appendChild(elLevel);
            //Expandable
            if (this._hasHierarchy) {
                const elExpandable: HTMLElement = document.createElement('div');
                if (dataHierarchy != null) {
                    const elImageExpandable = document.createElement('span');
                    const classExpandable: string = 'pp ' + (isExpanded ? this._classCollapse : this._classExpand);
                    elImageExpandable.setAttribute('class', classExpandable);
                    elImageExpandable.setAttribute('exp', nodeKey);
                    elExpandable.appendChild(elImageExpandable);
                }
                elLevel.appendChild(elExpandable);
            }
        }
        //Checkbox
        if (this._multiselection) {
            const elNodeCheckbox: HTMLSpanElement = document.createElement('span');
            const isSelected: boolean = ((modelData != null) && (Array.isArray(modelData)) && ((modelData.indexOf(nodeKey) >= 0)));
            if (isSelected)
                elNodeCheckbox.setAttribute('class', 'suMultiselectionCheckbox pp suMultiselectionCheckboxSelected');
            else
                elNodeCheckbox.setAttribute('class', 'suMultiselectionCheckbox');
            elNode.appendChild(elNodeCheckbox);
        }
        //Text
        const elNodeText = document.createElement('span');
        elNodeText.setAttribute('title', nodeValue);
        if (this._allowMustache && this._app.Parser.IsMustache(nodeValue)) {
            elNodeText.setAttribute('d-model', nodeValue);
        }
        else {
            elNodeText.textContent = nodeValue;
            elNodeText.innerText = nodeValue;
        }
        elNode.appendChild(elNodeText);
        return (elNode);
    }

    private GetNodeByKey(key: string): HTMLElement {
        const list: HTMLElement = this.GetElementList(this._el);
        for (let i: number = 0; i < list.children.length; i++) {
            const node: HTMLElement = list.children[i] as HTMLElement;
            const nodeKey: string = node.getAttribute('key');
            if (nodeKey === key)
                return (node);
        }
        return (null);
    }

    private HasDataHierarchy(data: any[]): boolean {
        for (let i = 0; i < data.length; i++) {
            const datum: any = data[i][this._hierarchy];
            if ((datum != null) && (datum.length > 0))
                return (true);
        }
        return (false);
    }

    private async UpdateModelData(key: string): Promise<void> {
        if (this._multiselection) {
            const node: HTMLElement = this.GetNodeByKey(key);
            const checkbox: HTMLSpanElement = node.children[1] as HTMLSpanElement;
            const selections: string[] | string = await this.GetModelData();
            const isSelected: boolean = (Array.isArray(selections) && (selections.indexOf(key) >= 0));
            if (!isSelected)
                checkbox.setAttribute('class', 'suMultiselectionCheckbox pp suMultiselectionCheckboxSelected');
            else
                checkbox.setAttribute('class', 'suMultiselectionCheckbox');
            await this._app.FunctionHandler.ResolveFunctionWithoutContext(this._sector, this._el, 'ToggleData(' + this._model + ',' + key + ',' + this._modelNotify + ')');
        } else {
            if (this._keySelected === key)
                return;
            this._keySelected = key;
            await this.SetValueText();
            await this._app.FunctionHandler.ResolveFunctionWithoutContext(this._sector, this._el, 'UpdateItemField(' + this._model + ',' + key + ',' + this._modelNotify + ')');
        }
        if (this._onModelChange == null)
            return;
        await this._app.FunctionHandler.ResolveFunctionWithoutContext(this._sector, this._el, this._onModelChange);
    }

    private async SetValueText(): Promise<void> {
        if (this._valueText) {
            const valueKey: string = await this.GetValue(this._keySelected);
            if (valueKey == null)
                return;
            await this._app.FunctionHandler.ResolveFunctionWithoutContext(this._sector, this._el, 'UpdateItemField(' + this._valueText + ',' + valueKey + ',true,false,false)');
        }
    }

    private async ApplySelection(): Promise<boolean> {
        if (this._selectionIndex == null)
            return (false);
        const list: HTMLElement = this.GetElementList(this._el);
        const elSelection: HTMLDivElement = list.children[this._selectionIndex] as HTMLDivElement;
        const key: string = elSelection.getAttribute('key');
        this._selectionIndex = null;
        await this.ActionSelect(key);
        return (true);
    }

    private ChangeSelectionDown(): void {
        const selectionPrevious: number = this._selectionIndex;
        const selectionNext: number = selectionPrevious == null ? 0 : selectionPrevious + 1;
        const list: HTMLElement = this.GetElementList(this._el);
        if (selectionNext >= list.children.length)
            return;
        const elPrevious: HTMLDivElement = selectionPrevious != null ? list.children[selectionPrevious] as HTMLDivElement : null;
        if (elPrevious != null)
            this.RemoveClassSelection(elPrevious);
        const elNext: HTMLDivElement = list.children[selectionNext] as HTMLDivElement;
        this.AddClassSelection(elNext);
        this._selectionIndex = selectionNext;
    }

    private ChangeSelectionUp(): void {
        const selectionPrevious: number = this._selectionIndex;
        if ((selectionPrevious == null) || (selectionPrevious == 0))
            return;
        const selectionNext: number = selectionPrevious - 1;
        const list: HTMLElement = this.GetElementList(this._el);
        const elPrevious: HTMLDivElement = selectionPrevious != null ? list.children[selectionPrevious] as HTMLDivElement : null;
        if (elPrevious != null)
            this.RemoveClassSelection(elPrevious);
        const elNext: HTMLDivElement = list.children[selectionNext] as HTMLDivElement;
        this.AddClassSelection(elNext);
        this._selectionIndex = selectionNext;
    }

    private async ChangeSelectionExpand(): Promise<void> {
        if (this._isSearching)
            return;
        const selectionIndex: number = this._selectionIndex;
        if (selectionIndex == null)
            return;
        const list: HTMLElement = this.GetElementList(this._el);
        let elSelection: HTMLDivElement = list.children[selectionIndex] as HTMLDivElement;
        const key: string = elSelection.getAttribute('key');
        if (this.IsNodeExpanded(key))
            return;
        await this.SwitchExpanded(key);
        elSelection = list.children[selectionIndex] as HTMLDivElement;
        this.AddClassSelection(elSelection);
        this._selectionIndex = selectionIndex;
    }

    private async ChangeSelectionCollapse(): Promise<void> {
        if (this._isSearching)
            return;
        const selectionIndex: number = this._selectionIndex;
        if (selectionIndex == null)
            return;
        const list: HTMLElement = this.GetElementList(this._el);
        let elSelection: HTMLDivElement = list.children[selectionIndex] as HTMLDivElement;
        const key: string = elSelection.getAttribute('key');
        if (!this.IsNodeExpanded(key))
            return;
        await this.SwitchExpanded(key);
        elSelection = list.children[selectionIndex] as HTMLDivElement;
        this.AddClassSelection(elSelection);
        this._selectionIndex = selectionIndex;
    }

    private AddClassSelection(el: HTMLElement) {
        const classCurrent: string = el.getAttribute('class');
        if (classCurrent.indexOf(this._classSelection) >= 0)
            return;
        el.setAttribute('class', classCurrent + ' ' + this._classSelection);
    }

    private RemoveClassSelection(el: HTMLElement) {
        const classCurrent: string = el.getAttribute('class');
        if (classCurrent.indexOf(this._classSelection) < 0)
            return;
        el.setAttribute('class', classCurrent.replace(this._classSelection, ''));
    }
}