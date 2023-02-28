class DrapoSolver {
    //Field
    private _application: DrapoApplication;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public async ResolveConditional(expression: string | boolean | number, elj: JQuery = null, sector: string = null, context: DrapoContext = null, renderContext: DrapoRenderContext = null, eljForTemplate: HTMLElement = null): Promise<boolean> {
        if (typeof expression === 'boolean')
            return (expression);
        if (typeof expression === 'number')
            return (expression > 0);
        //Parser
        const block: DrapoExpressionItem = this.Application.Parser.ParseExpression(expression);
        //Resolve
        const response: string = await this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, block);
        //Recursive
        if (this.Application.Parser.HasMustache(response))
            return (await this.ResolveConditional(response, elj, sector, context, renderContext, eljForTemplate));
        //Conditional
        const responseBoolean: boolean = await this.ResolveConditionalBoolean(response);
        return (responseBoolean);
    }

    private async ResolveConditionalExpressionBlock(sector: string, context: DrapoContext, renderContext: DrapoRenderContext, elj: JQuery, eljForTemplate: HTMLElement, block: DrapoExpressionItem): Promise<string> {
        //Resolve Mustaches
        await this.EnsureExpressionItemCurrentLevelResolved(sector, context, renderContext, elj, block, eljForTemplate);
        //Join Texts
        this.JoinTexts(block);
        //Operation
        return (await this.ResolveConditionalExpressionBlockOperation(sector, context, renderContext, elj, eljForTemplate, block));
    }

    private async ResolveConditionalExpressionBlockOperation(sector: string, context: DrapoContext, renderContext: DrapoRenderContext, elj: JQuery, eljForTemplate: HTMLElement, block: DrapoExpressionItem): Promise<string> {
        if (block.Items.length === 0)
            return ('');
        //First
        await this.EnsureExpressionItemResolved(sector, context, renderContext, elj, block, 0, eljForTemplate);
        const itemFirst: DrapoExpressionItem = block.Items[0];
        if ((itemFirst.Type == DrapoExpressionItemType.Logical) || (itemFirst.Type == DrapoExpressionItemType.Comparator)) {
            const itemEmpty: DrapoExpressionItem = new DrapoExpressionItem(DrapoExpressionItemType.Text, '');
            block.Items.unshift(itemEmpty);
            return (await this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, block));
        }
        const resultFirst: string = itemFirst.Value;
        if (block.Items.length < 2)
            return (resultFirst);
        //Second
        await this.EnsureExpressionItemResolved(sector, context, renderContext, elj, block, 1, eljForTemplate);
        const itemSecond: DrapoExpressionItem = block.Items[1];
        const resultSecond: string = itemSecond.Value;
        //Short Circuit
        if ((resultSecond === '&&') && (!this.ResolveConditionalBoolean(resultFirst)))
            return ('false');
        if (resultFirst === '!') {
            //Deny Second
            const resultDenySecond: string = (!this.ResolveConditionalBoolean(resultSecond)).toString();
            const resultDenyItemSecond: DrapoExpressionItem = new DrapoExpressionItem(DrapoExpressionItemType.Text, resultDenySecond);
            block.Items[0] = resultDenyItemSecond;
            block.Items.splice(1, 1);
            return (await this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, block));
        }
        //Third
        let resultThird: string = '';
        const hasMoreThanTwoTerms: boolean = block.Items.length > 2;
        if (hasMoreThanTwoTerms) {
            await this.EnsureExpressionItemResolved(sector, context, renderContext, elj, block, 2, eljForTemplate);
            resultThird = block.Items[2].Value;
        }
        if (resultThird === '!') {
            //Deny Fourth
            let resultFourth: string = 'false';
            if (block.Items.length > 3) {
                await this.EnsureExpressionItemResolved(sector, context, renderContext, elj, block, 3, eljForTemplate);
                resultFourth = block.Items[3].Value;
            }
            const resultDenyFourth = (!this.ResolveConditionalBoolean(resultFourth)).toString();
            const resultDenyItemFourth: DrapoExpressionItem = new DrapoExpressionItem(DrapoExpressionItemType.Text, resultDenyFourth);
            block.Items[2] = resultDenyItemFourth;
            if (block.Items.length > 3)
                block.Items.splice(3, 1);
            return (await this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, block));
        }
        //Result
        const result: string = this.ResolveConditionalOperator(resultFirst, resultSecond, resultThird);
        const resultItem: DrapoExpressionItem = new DrapoExpressionItem(DrapoExpressionItemType.Text);
        resultItem.Value = result;
        block.Items[0] = resultItem;
        block.Items.splice(1, hasMoreThanTwoTerms ? 2 : 1);
        return (await this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, block));
    }

    private async EnsureExpressionItemCurrentLevelResolved(sector: string, context: DrapoContext, renderContext: DrapoRenderContext, elj: JQuery, block: DrapoExpressionItem, eljForTemplate: HTMLElement): Promise<void> {
        for (let i: number = 0; i < block.Items.length; i++) {
            const item: DrapoExpressionItem = block.Items[i];
            if (item.Type === DrapoExpressionItemType.Function)
                block.Items[i] = new DrapoExpressionItem(DrapoExpressionItemType.Text, (await this.Application.FunctionHandler.ReplaceFunctionExpressions(sector, context, item.Value, true)));
            else if (item.Type === DrapoExpressionItemType.Mustache)
                block.Items[i] = new DrapoExpressionItem(DrapoExpressionItemType.Text, (await this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, item.Value, elj, sector, true, DrapoStorageLinkType.Render, eljForTemplate != null, eljForTemplate)));
        }
    }

    private JoinTexts(block: DrapoExpressionItem): void {
        for (let i: number = block.Items.length - 1; i > 0; i--) {
            const item: DrapoExpressionItem = block.Items[i];
            if (item.Type !== DrapoExpressionItemType.Text)
                continue;
            const itemPrevious: DrapoExpressionItem = block.Items[i - 1];
            if (itemPrevious.Type !== DrapoExpressionItemType.Text)
                continue;
            itemPrevious.Value = itemPrevious.Value + item.Value;
            block.Items.splice(i, 1);
        }
    }

    private async EnsureExpressionItemResolved(sector: string, context: DrapoContext, renderContext: DrapoRenderContext, elj: JQuery, block: DrapoExpressionItem, index: number, eljForTemplate: HTMLElement): Promise<void> {
        const item: DrapoExpressionItem = block.Items[index];
        if (item.Type === DrapoExpressionItemType.Block)
            block.Items[index] = new DrapoExpressionItem(DrapoExpressionItemType.Text, (await this.ResolveConditionalExpressionBlock(sector, context, renderContext, elj, eljForTemplate, item)).toString());
        else if (item.Type === DrapoExpressionItemType.Function)
            block.Items[index] = new DrapoExpressionItem(DrapoExpressionItemType.Text, (await this.Application.FunctionHandler.ReplaceFunctionExpressions(sector, context, item.Value, true)));
        else if (item.Type === DrapoExpressionItemType.Mustache)
            block.Items[index] = new DrapoExpressionItem(DrapoExpressionItemType.Text, (await this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, item.Value, elj, sector, true, DrapoStorageLinkType.Render, eljForTemplate != null, eljForTemplate)));
    }

    private ResolveConditionalBlock(block: string): boolean {
        const parts: string[] = this.Application.Parser.ParseConditionalLogicalOrComparator(block);
        while (parts.length > 2) {
            const result = this.ResolveConditionalOperator(parts[0], parts[1], parts[2]);
            parts[0] = result;
            parts.splice(1, 2);
        }
        if (parts.length == 0)
            return (false);
        return (this.ResolveConditionalBoolean(parts[0]));
    }

    private ResolveConditionalOperator(dataLeft: string, dataOperation: string, dataRight: string): string {
        if (dataOperation == "||")
            return (((this.ResolveConditionalBoolean(dataLeft)) || (this.ResolveConditionalBoolean(dataRight))).toString());
        if (dataOperation == "&&")
            return (((this.ResolveConditionalBoolean(dataLeft)) && (this.ResolveConditionalBoolean(dataRight))).toString());
        if (dataOperation == "!=")
            return ((dataLeft !== dataRight).toString());
        if (dataOperation == "=")
            return ((dataLeft === dataRight).toString());
        if (dataOperation == "<")
            return ((this.ResolveConditionalOperatorLessThan(dataLeft, dataRight)).toString());
        if (dataOperation == "<=")
            return ((this.ResolveConditionalOperatorLessOrEqualThan(dataLeft, dataRight)).toString());
        if (dataOperation == ">")
            return ((this.ResolveConditionalOperatorGreaterThan(dataLeft, dataRight)).toString());
        if (dataOperation == ">=")
            return ((this.ResolveConditionalOperatorGreaterOrEqualThan(dataLeft, dataRight)).toString());
        if (dataOperation == "LIKE")
            return ((this.ResolveConditionalOperatorLike(dataLeft, dataRight)).toString());
        if (dataOperation == "+")
            return (this.ResolveOperationArithmeticAddition(dataLeft, dataRight));
        if (dataOperation == "-")
            return (this.ResolveOperationArithmeticSubtraction(dataLeft, dataRight));
        if (dataOperation == "*")
            return (this.ResolveOperationArithmeticMultiplication(dataLeft, dataRight));
        if (dataOperation == "/")
            return (this.ResolveOperationArithmeticDivision(dataLeft, dataRight));
        // tslint:disable-next-line:no-floating-promises
        this.Application.ExceptionHandler.HandleError('Drapo: Conditional Operation {0} is not supported', dataOperation);
        return (dataLeft);
    }

    public ResolveConditionalBoolean(data: string): boolean {
        //Boolean
        if ((data != null) && (typeof data === 'string'))
            data = data.toLowerCase();
        if (data == 'true')
            return (true);
        if (data == 'false')
            return (false);
        if (data == '!false')
            return (true);
        if (data == '!true')
            return (false);
        if (data == '!null')
            return (true);
        if (data == 'null')
            return (false);
        if (data == '!')
            return (true);
        return ((data != null) && (data != '') && ((data.length == 1) || (data[0] !== '!')));
    }

    private ResolveConditionalOperatorLessThan(dataLeft: string, dataRight: string): boolean {
        const numberLeft: number = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        const numberRight: number = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft < numberRight);
        return (dataLeft < dataRight);
    }
    private ResolveConditionalOperatorLessOrEqualThan(dataLeft: string, dataRight: string): boolean {
        const numberLeft: number = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        const numberRight: number = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft <= numberRight);
        return (dataLeft <= dataRight);
    }

    private ResolveConditionalOperatorGreaterThan(dataLeft: string, dataRight: string): boolean {
        const numberLeft: number = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        const numberRight: number = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft > numberRight);
        return (dataLeft > dataRight);
    }

    private ResolveConditionalOperatorGreaterOrEqualThan(dataLeft: string, dataRight: string): boolean {
        const numberLeft: number = this.Application.Parser.ParseNumberBlock(dataLeft, null);
        const numberRight: number = this.Application.Parser.ParseNumberBlock(dataRight, null);
        if ((numberLeft !== null) && (numberRight !== null))
            return (numberLeft >= numberRight);
        return (dataLeft >= dataRight);
    }

    private ResolveConditionalOperatorLike(dataLeft: string, dataRight: string): boolean {
        if ((dataLeft == null) || (dataLeft == ''))
            return (false);
        if ((dataRight == null) || (dataRight == ''))
            return (false);
        const isAnyLeft: boolean = dataRight[0] === '%';
        const isAnyRight: boolean = dataRight[dataRight.length - 1] === '%';
        const dataRightClean: string = ((!isAnyLeft) && (!isAnyRight)) ? dataRight : dataRight.substring((isAnyLeft ? 1 : 0), dataRight.length - (isAnyRight ? 1 : 0));
        const index: number = dataLeft.toLowerCase().indexOf(dataRightClean.toLowerCase());
        if ((index == null) || (index < 0))
            return (false);
        if ((isAnyLeft) && (isAnyRight))
            return (true);
        if ((isAnyRight) && (index == 0))
            return (true);
        if ((isAnyLeft) && (index == (dataLeft.length - dataRight.length)))
            return (true);
        return (false);
    }

    private ResolveOperationArithmeticAddition(dataLeft: string, dataRight: string): string {
        const numberLeft: number = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        const numberRight: number = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        const numberResult: number = numberLeft + numberRight;
        return (numberResult.toString());
    }

    private ResolveOperationArithmeticSubtraction(dataLeft: string, dataRight: string): string {
        const numberLeft: number = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        const numberRight: number = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        const numberResult: number = numberLeft - numberRight;
        return (numberResult.toString());
    }

    private ResolveOperationArithmeticMultiplication(dataLeft: string, dataRight: string): string {
        const numberLeft: number = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        const numberRight: number = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        const numberResult: number = numberLeft * numberRight;
        return (numberResult.toString());
    }

    private ResolveOperationArithmeticDivision(dataLeft: string, dataRight: string): string {
        const numberLeft: number = this.Application.Parser.ParseNumberBlock(dataLeft, 0);
        const numberRight: number = this.Application.Parser.ParseNumberBlock(dataRight, 0);
        const numberResult: number = numberRight != 0 ? numberLeft / numberRight : 0;
        return (numberResult.toString());
    }

    public async CreateContextItemFromPath(sector: string, dataPath: string[]): Promise<DrapoContextItem> {
        const dataKey: string = dataPath[0];
        const context: DrapoContext = new DrapoContext();
        const data: any = await this.Application.Storage.RetrieveData(dataKey, sector);
        return (context.Create(data, null, null, dataKey, dataKey, null, null));
    }

    public CreateMustache(dataPath: string[]) {
        let mustache: string = '{{';
        for (let i: number = 0; i < dataPath.length; i++) {
            if (i > 0)
                mustache = mustache + '.';
            mustache = mustache + dataPath[i];
        }
        return (mustache + '}}');
    }

    public CreateMustacheContext(context: DrapoContext, mustacheParts: string[], canResolveKey: boolean = true): string {
        const mustacheContext: string[] = [];
        let updated: boolean = false;
        for (let i: number = 0; i < mustacheParts.length; i++) {
            const mustachePart: string = mustacheParts[i];
            const mustachePartNext: string = i < (mustacheParts.length - 1) ? mustacheParts[i + 1] : null;
            const mustacheSystem: string = mustachePartNext != null ? this.GetSystemContextPathValue(null, context, [mustachePart, mustachePartNext]) : null;
            if (mustacheSystem !== null) {
                return (mustacheSystem);
            } else {
                const mustacheRelative: string[] = this.CreateContextAbsoluteArray(context, mustachePart, canResolveKey);
                if (mustacheRelative === null) {
                    mustacheContext.push(mustachePart);
                } else {
                    for (let j: number = 0; j < mustacheRelative.length; j++)
                        mustacheContext.push(mustacheRelative[j]);
                    updated = true;
                }
            }
        }
        if (!updated)
            return (null);
        const mustacheRecursive: string = this.CreateMustache(mustacheContext);
        const mustacheRecursiveParts: string[] = this.Application.Parser.ParseMustache(mustacheRecursive);
        const mustacheRecursiveContext: string = this.CreateMustacheContext(context, mustacheRecursiveParts, false);
        if (mustacheRecursiveContext !== null)
            return (mustacheRecursiveContext);
        return (mustacheRecursive);
    }

    private CreateContextAbsoluteArray(context: DrapoContext, mustachePart: string, canResolveKey: boolean): string[] {
        if ((canResolveKey) && (context.Item.Key === mustachePart)) {
            const contextKey: string[] = [];
            let hasInsertedContext: boolean = false;
            for (let i: number = 0; i < context.IndexRelatives.length; i++)
                if (this.AppendContextAbsoluteArray(context.Item, context.ItemsCurrentStack[i], context.IndexRelatives[i], contextKey, i === 0))
                    hasInsertedContext = true;
            this.AppendContextAbsoluteArray(context.Item, context.Item, context.IndexRelative, contextKey, !hasInsertedContext);
            return (contextKey);
        }
        for (let i: number = 0; i < context.ItemsCurrentStack.length; i++) {
            const itemCurrent: DrapoContextItem = context.ItemsCurrentStack[i];
            if (itemCurrent.Key !== mustachePart)
                continue;
            return ([itemCurrent.Iterator, '[' + context.IndexRelatives[i] + ']']);
        }
        return (null);
    }

    private AppendContextAbsoluteArray(itemCurrent: DrapoContextItem, item: DrapoContextItem, index: number, context: string[], checkIndex: boolean): boolean {
        if (!this.IsContextItemSameDataKey(itemCurrent, item))
            return(false);
        const iterators: string[] = this.Application.Parser.ParseForIterable(item.Iterator);
        if (iterators.length == 1)
            context.push(item.Iterator);
        else
            this.AppendContextAbsoluteIterators(item, context, iterators, checkIndex);
        context.push('[' + index + ']');
        return (true);
    }

    private IsContextItemSameDataKey(itemCurrent: DrapoContextItem, item: DrapoContextItem): boolean {
        if (item.DataKey == itemCurrent.DataKey)
            return (true);
        if (item.Key == itemCurrent.DataKey)
            return (true);
        return (false);
    }

    private AppendContextAbsoluteIterators(item: DrapoContextItem, context: string[], iterators: string[], checkIndex: boolean): void {
        const start: number = ((checkIndex) && (item.DataKey === iterators[0])) ? 0 : 1;
        for (let i: number = start; i < iterators.length; i++)
            context.push(iterators[i]);
    }

    public async CreateMustacheReference(sector: string, contextItem: DrapoContextItem, mustache: string): Promise<string> {
        const mustacheContext: string[] = [];
        const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
        for (let i: number = 0; i < mustacheParts.length; i++) {
            const mustachePart: string = mustacheParts[i];
            if (contextItem != null) {
                const mustacheRelative: string[] = this.GetContextItemAbsolute(contextItem, mustachePart);
                for (let j: number = 0; j < mustacheRelative.length; j++)
                    mustacheContext.push(mustacheRelative[j]);
            } else {
                mustacheContext.push(mustachePart);
            }
        }
        const dataKey: string = mustacheContext[0];
        const storageItem: DrapoStorageItem = await this.Application.Storage.RetrieveDataItem(dataKey, sector);
        if (storageItem == null)
            return ('');
        const sectorStorage: string = storageItem.Sector != null ? storageItem.Sector : '';
        mustacheContext.splice(0, 0, '@' + sectorStorage);
        const mustacheReference: string = this.CreateMustache(mustacheContext);
        return (mustacheReference);
    }

    private GetContextItemAbsolute(contextItem: DrapoContextItem, mustachePart: string): string[] {
        if (contextItem.Key !== mustachePart)
            return ([mustachePart]);
        const iteratorParts: string[] = this.Application.Parser.ParseForIterable(contextItem.Iterator);
        const mustachePartsAbsolute: string[] = iteratorParts.concat('[' + contextItem.Index + ']');
        return (mustachePartsAbsolute);
    }

    public async ResolveDataPathMustache(context: DrapoContext, elementJQuery: JQuery, sector: string, mustacheParts: string[]): Promise<string> {
        let updated: boolean = false;
        for (let i: number = 1; i < mustacheParts.length; i++) {
            const mustachePart: string = mustacheParts[i];
            if (!this.Application.Parser.IsMustache(mustachePart))
                continue;
            const mustachePartParts: string[] = this.Application.Parser.ParseMustache(mustachePart);
            const dataValue = await this.ResolveDataPath(context, elementJQuery, sector, mustachePartParts);
            mustacheParts[i] = dataValue;
            updated = true;
        }
        if (!updated)
            return (null);
        return (this.CreateMustache(mustacheParts));
    }

    public async ExistDataPath(context: DrapoContext, sector: string, path: string[]): Promise<boolean> {
        const dataKey: string = this.Application.Solver.ResolveDataKey(path);
        const dataFields: string[] = this.Application.Solver.ResolveDataFields(path);
        const item: DrapoContextItem = await this.ResolveDataPathObjectItem(context.Item, dataKey, sector, true, path);
        if (item == null)
            return (false);
        return (this.ExistDataPathObject(item.Data, path));
    }

    private ExistDataPathObject(dataObject: any, dataPath: string[]): boolean {
        let data: any = dataObject;
        //Path
        for (let i = 1; i < dataPath.length; i++) {
            const currentKey: string = dataPath[i];
            const index: number = this.GetDataObjectPathObjectPropertyIndex(currentKey);
            if (index === null) {
                //Property
                if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                    return (false);
                }
                data = data[currentKey];
            } else {
                //Indexer
                if (!data.length)
                    return (false);
                data = data[index];
            }
        }
        if ((data === null) || (data === undefined))
            return (false);
        return (true);
    }

    public async ResolveDataPath(context: DrapoContext, elementJQuery: JQuery, sector: string, path: (string[] | string), canBindReader: boolean = false, canBindWriter: boolean = false, modelEvents: string[] = null, modelEventsCancel: string[] = null, canNotify: boolean = true): Promise<string> {
        //Path
        const dataPath: string[] = (typeof path === 'string') ? [path] : path;
        //Mustache
        for (let i: number = 1; i < dataPath.length; i++) {
            const mustache: string = dataPath[i];
            const isMustacheIndexer: boolean = this.Application.Parser.IsMustacheIndexer(mustache);
            const mustacheIndexer: string = isMustacheIndexer ? this.Application.Parser.GetMustacheInsideIndexer(mustache) : mustache;
            if (!this.Application.Parser.IsMustache(mustacheIndexer))
                continue;
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustacheIndexer);
            const mustacheValue = await this.ResolveDataPath(context, elementJQuery, sector, mustacheParts, canBindReader, canBindWriter, modelEvents, modelEventsCancel, canNotify);
            const mustacheValueIndexer = isMustacheIndexer ? this.Application.Parser.CreateMustacheIndexer(mustacheValue) : mustacheValue;
            dataPath[i] = mustacheValueIndexer;
        }
        const dataKey: string = this.Application.Solver.ResolveDataKey(dataPath);
        const dataFields: string[] = this.Application.Solver.ResolveDataFields(dataPath);
        //Delay
        if ((!context.IsKey(dataKey)) && (!await this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, dataPath))) {
            if ((dataFields.length === 0))
                return ('');
            if (this.Application.Storage.IsDataKeyDelay(dataKey, sector))
                this.Application.Observer.SubscribeDelay(elementJQuery != null ? elementJQuery[0] : null, dataKey, dataFields);
            return (this.CreateMustache(dataPath));
        }
        const data: string = await this.ResolveDataPathObject(sector, context, dataPath);
        //Bind
        if (canBindWriter)
            this.Application.Binder.BindReaderWriter(await this.ResolveDataPathObjectItem(context.Item, dataKey, sector), elementJQuery != null ? elementJQuery[0] : null, dataFields, modelEvents, modelEventsCancel, canNotify);
        else if (canBindReader)
            this.Application.Binder.BindReader(await this.ResolveDataPathObjectItem(context.Item, dataKey, sector), elementJQuery != null ? elementJQuery[0] : null, dataFields);
        return (data);
    }

    private async ResolveDataPathObject(sector: string, context: DrapoContext, dataPath: string[]): Promise<string> {
        return (await this.ResolveItemDataPathObject(sector, context.Item, dataPath));
    }

    public async ResolveItemDataPathObject(sector: string, contextItem: DrapoContextItem, dataPath: string[], canForceLoadDataDelay: boolean = false, executionContext: DrapoExecutionContext<any> = null): Promise<any> {
        //System. Like _Index or _Level
        const valueSystem = contextItem !== null ? this.GetSystemContextPathValue(sector, contextItem.Context, dataPath) : null;
        if (valueSystem !== null)
            return (valueSystem);
        //Execution Context
        const valueExecutionContext: any = executionContext === null ? null : this.GetExecutionContextPathValue(sector, executionContext, dataPath);
        if (valueExecutionContext !== null)
            return (valueExecutionContext);
        //Item
        const dataKey: string = dataPath[0];
        const item: DrapoContextItem = await this.ResolveDataPathObjectItem(contextItem, dataKey, sector, canForceLoadDataDelay, dataPath);
        if (item == null)
            return ('');
        return (this.ResolveDataObjectPathObject(item.Data, dataPath));
    }

    public ResolveItemStoragePathObject(item: DrapoStorageItem, dataPath: string[]): any {
        //System. Like _Index or _Level
        const valueSystem = item !== null ? this.GetSystemPathValue(item, dataPath) : null;
        if (valueSystem !== null)
            return (valueSystem);
        return (this.ResolveDataObjectPathObject(item.Data, dataPath));
    }

    public ResolveDataObjectPathObject(dataObject: any, dataPath: string[], dataEnforce: any = null): any {
        let data: any = dataObject;
        //Path
        for (let i = 1; i < dataPath.length; i++) {
            const currentKey: string = dataPath[i];
            const index: number = this.GetDataObjectPathObjectPropertyIndex(currentKey);
            if (index === null) {
                //Property
                if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                    if ((dataEnforce !== null) && (i === dataPath.length - 1)) { // Enforce Data
                        data[currentKey] = dataEnforce;
                        return (dataEnforce);
                    }
                    return ('');
                }
                data = data[currentKey];
            } else {
                //Indexer
                if (!data.length)
                    return ('');
                data = data[index];
            }
        }
        if ((data === null) || (data === undefined))
            return ('');
        return (data);
    }

    private GetDataObjectPathObjectPropertyIndex(property: string): number {
        if (property.length < 3)
            return (null);
        if (property[0] !== '[')
            return (null);
        if (property[property.length - 1] !== ']')
            return (null);
        return (this.Application.Parser.ParseNumber(property.substring(1, property.length - 1)));
    }

    public ResolveDataObjectLookupHierarchy(data: any, searchField: string, searchValue: any, searchHierarchyField: string = null): any {
        const dataList: any[] = data.length == null ? [data] : data;
        for (let i = 0; i < dataList.length; i++) {
            const dataCurrent: any = dataList[i];
            if (dataCurrent == null)
                continue;
            if ((searchHierarchyField != null) && (dataCurrent[searchHierarchyField] != null)) {
                const dataCurrentChild: any = this.ResolveDataObjectLookupHierarchy(dataCurrent[searchHierarchyField], searchField, searchValue, searchHierarchyField);
                if (dataCurrentChild != null)
                    return (dataCurrentChild);
            }
            const itemValue: any = searchField == '_Index' ? i : dataCurrent[searchField];
            if (itemValue == searchValue)
                return (dataCurrent);
        }
        return (null);
    }

    public UpdateDataObjectLookupHierarchy(data: any, searchField: string, searchValue: any, value: any, searchHierarchyField: string = null): boolean {
        const dataList: any[] = data.length == null ? [data] : data;
        for (let i = 0; i < dataList.length; i++) {
            const dataCurrent: any = dataList[i];
            if (dataCurrent == null)
                continue;
            if ((searchHierarchyField != null) && (dataCurrent[searchHierarchyField] != null)) {
                const updated: boolean = this.UpdateDataObjectLookupHierarchy(dataCurrent[searchHierarchyField], searchField, searchValue, value, searchHierarchyField);
                if (updated != null)
                    return (updated);
            }
            const itemValue: any = searchField == '_Index' ? i : dataCurrent[searchField];
            if ((itemValue != null) && (itemValue == searchValue)) {
                dataList[i] = value;
                return (true);
            }
        }
        return (null);
    }

    public ContainsItemStoragePathObject(item: DrapoStorageItem, dataPath: string[]): boolean {
        let data: any = item.Data;
        //Path
        for (let i = 1; i < dataPath.length; i++) {
            const currentKey: string = dataPath[i];
            if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                return (false);
            }
            data = data[currentKey];
        }
        return (true);
    }

    public async ResolveDataPathObjectItem(contextItem: DrapoContextItem, dataKey: string, sector: string, canForceLoadDataDelay: boolean = false, dataPath: string[] = null): Promise<DrapoContextItem> {
        //Hierarchy
        let item: DrapoContextItem = contextItem;
        while (item != null) {
            if (item.Key == dataKey)
                return (item);
            item = item.Parent;
        }
        //Storage
        const dataItem: DrapoStorageItem = await this.Application.Storage.RetrieveDataItem(dataKey, sector, canForceLoadDataDelay, null);
        if (dataItem == null)
            return (null);
        //Force Load Data Delay
        if ((canForceLoadDataDelay) && (dataItem.IsDelay))
            await this.Application.Storage.EnsureDataDelayLoaded(dataItem, dataPath);
        const context: DrapoContext = new DrapoContext();
        return (context.Create(dataItem.Data, null, null, dataKey, null, null, null));
    }

    public ResolveSector(mustacheParts: string[], sector: string): string {
        if (mustacheParts.length == 0)
            return (sector);
        const mustacheSector: string = mustacheParts[0];
        if (mustacheSector === '@')
            return (null);
        if (mustacheSector.indexOf("@") === 0)
            return (mustacheSector.substring(1));
        return (sector);
    }

    private HasMustachePartsSector(mustacheParts: string[]): boolean {
        if (mustacheParts == null)
            return (false);
        const part: string = mustacheParts[0];
        if (part == null)
            return (false);
        if (part.length == 0)
            return (false);
        return (part[0] === '@');
    }

    public ResolveDataKey(mustacheParts: string[]): string {
        const index: number = this.HasMustachePartsSector(mustacheParts) ? 1 : 0;
        return (mustacheParts[index]);
    }

    public ResolveDataFields(mustacheParts: string[]): string[] {
        const dataFields: string[] = [];
        const start: number = this.HasMustachePartsSector(mustacheParts) ? 2 : 1;
        for (let i: number = start; i < mustacheParts.length; i++)
            dataFields.push(mustacheParts[i]);
        return (dataFields);
    }

    public CreateDataPath(dataKey: string, dataFields: string[]): string[] {
        const path: string[] = [];
        path.push(dataKey);
        if (dataFields != null) {
            for (let i: number = 0; i < dataFields.length; i++)
                path.push(dataFields[i]);
        }
        return (path);
    }

    public CombineDataPath(dataPath1: string[], dataPath2: string[]): string[] {
        const path: string[] = [];
        if (dataPath1 != null)
            for (let i: number = 0; i < dataPath1.length; i++)
                path.push(dataPath1[i]);
        if (dataPath2 != null)
            for (let i: number = 0; i < dataPath2.length; i++)
                path.push(dataPath2[i]);
        return (path);
    }

    public GetDataPathParent(dataPath: string[]): string[] {
        const dataPathParent: string[] = [];
        for (let i = 0; i < dataPath.length - 1; i++)
            dataPathParent.push(dataPath[i]);
        return (dataPathParent);
    }

    public async UpdateItemDataPathObject(sector: string, contextItem: DrapoContextItem, dataPath: string[], value: any, canNotify: boolean = true): Promise<boolean> {
        //Item
        const key: string = dataPath[0];
        if (contextItem === null) {
            //No Context
            const storageItem: DrapoStorageItem = await this.Application.Storage.RetrieveDataItem(key, sector);
            if (storageItem === null)
                return (false);
            if (dataPath.length === 1) {
                if (storageItem.Data === value)
                    return (false);
                storageItem.Data = value;
            } else {
                if (!this.UpdateDataPathObject(storageItem.Data, dataPath, value))
                    return (false);
            }
            storageItem.HasChanges = true;
            if (canNotify)
                await this.Application.Observer.Notify(key, null, this.ResolveDataFields(dataPath));
            return (true);
        }
        const item: DrapoContextItem = await this.ResolveDataPathObjectItem(contextItem, key, sector);
        if (item == null)
            return (false);
        if (dataPath.length === 1) {
            if (item.Data === value)
                return (false);
            item.Data = value;
        } else {
            const data: any = item.Data;
            if (!this.UpdateDataPathObject(item.Data, dataPath, value))
                return (false);
        }
        if (canNotify)
            await this.Application.Observer.Notify(item.DataKey, item.Index, this.ResolveDataFields(dataPath));
        return (true);
    }

    public UpdateDataPathObject(data: any, dataPath: string[], value: any): boolean {
        //Path
        for (let i = 1; i < dataPath.length - 1; i++) {
            const currentKey: string = dataPath[i];
            const index: number = this.GetDataObjectPathObjectPropertyIndex(currentKey);
            if (index === null) {
                //Property
                if ((data === null) || (data === undefined) || (data[currentKey] === undefined)) {
                    return (false);
                }
                data = data[currentKey];
            } else {
                //Indexer
                if (!data.length)
                    return (false);
                data = data[index];
            }
        }
        if (data == null)
            return (false);
        const dataField: string = dataPath[dataPath.length - 1];
        //Mustache is ending in indexer
        const indexDataField: number = this.GetDataObjectPathObjectPropertyIndex(dataField);
        if (indexDataField === null) {
            if (data[dataField] === value)
                return (false);
            data[dataField] = value;
        } else {
            if (data[indexDataField] === value)
                return (false);
            data[indexDataField] = value;
        }
        return (true);
    }

    public Clone(object: any, deepCopy: boolean = false): any {
        if (typeof object === "string")
            return (object);
        if (typeof object === "number")
            return (object);
        if ($.isArray(object))
            return (this.CloneArray(object, deepCopy));
        if (deepCopy)
            return (jQuery.extend(true, {}, object));
        else
            return (jQuery.extend({}, object));
    }

    private CloneArray(object: any, deepCopy: boolean): any {
        if (deepCopy)
            return (jQuery.extend(true, [], object));
        else
            return (jQuery.extend([], object));
    }

    public CloneArrayString(list: string[]): string[] {
        if (list == null)
            return (null);
        const clone: string[] = [];
        for (let i: number = 0; i < list.length; i++)
            clone.push(list[i]);
        return (clone);
    }

    public CloneArrayElement(list: HTMLElement[]): HTMLElement[] {
        if (list == null)
            return (null);
        const clone: HTMLElement[] = [];
        for (let i: number = 0; i < list.length; i++)
            clone.push(list[i]);
        return (clone);
    }

    public CloneArrayAny(list: any[]): any[] {
        if (list == null)
            return (null);
        const clone: any[] = [];
        for (let i: number = 0; i < list.length; i++)
            clone.push(list[i]);
        return (clone);
    }

    public CloneElement(el: HTMLElement): HTMLElement {
        if (el == null)
            return (null);
        const elj: JQuery = $(el).clone();
        return (elj[0]);
    }

    private GetSystemContextPathValue(sector: string, context: DrapoContext, dataPath: string[]): string {
        if (dataPath.length != 2)
            return (null);
        const property: string = dataPath[1];
        if (property.charAt(0) !== '_')
            return (null);
        if (context.Item === null)
            return (null);
        const propertyLower: string = property.toLowerCase();
        const key: string = dataPath[0];
        if (propertyLower === '_index')
            return (this.GetSystemContextPathValueIndex(context, key));
        if (propertyLower === '_indexrelative')
            return (this.GetSystemContextPathValueIndexRelative(context, key));
        if (context.Item.Key !== key)
            return (null);
        if (propertyLower === '_level')
            return (this.GetSystemContextPathValueLevel(context));
        if (propertyLower === '_haschanges')
            return (this.GetSystemContextPathValueHasChanges(sector, context.Item.DataKey));
        return (null);
    }

    public GetExecutionContextPathValue(sector: string, executionContext: DrapoExecutionContext<any>, dataPath: string[]): any {
        if (dataPath.length != 2)
            return (null);
        const obj: string = dataPath[0];
        if (obj.toLowerCase() === '_stack')
            return (this.GetExecutionContextPathValueStack(sector, executionContext, dataPath));
        return (null);
    }

    private GetExecutionContextPathValueStack(sector: string, executionContext: DrapoExecutionContext<any>, dataPath: string[]): any {
        const property: string = dataPath[1].toLowerCase();
        if (property === 'peek')
            return (executionContext.Stack.Peek());
        if (property === 'pop')
            return (executionContext.Stack.Pop());
        return (null);
    }

    private GetSystemPathValue(item: DrapoStorageItem, dataPath: string[]): string {
        if (dataPath.length != 2)
            return (null);
        const property: string = dataPath[1];
        if (property.charAt(0) !== '_')
            return (null);
        if (item === null)
            return (null);
        const propertyLower: string = dataPath[1].toLowerCase();
        if (propertyLower === '_haschanges')
            return (item.HasChanges.toString());
        return (null);
    }

    private GetSystemContextPathValueIndex(context: DrapoContext, key: string): string {
        const index: number = context.GetIndex(key);
        if (index === null)
            return (null);
        return (index.toString());
    }

    private GetSystemContextPathValueIndexRelative(context: DrapoContext, key: string): string {
        const indexRelative: number = context.GetIndexRelative(key);
        if (indexRelative === null)
            return (null);
        return (indexRelative.toString());
    }

    private GetSystemContextPathValueLevel(context: DrapoContext): string {
        return (context.Level.toString());
    }

    private GetSystemContextPathValueHasChanges(sector: string, dataKey: string): string {
        return (this.Application.Storage.HasChanges(sector, dataKey).toString());
    }

    public ResolveSystemContextPath(sector: string, context: DrapoContext, expression: string): string {
        if (expression.indexOf('._') < 0)
            return (expression);
        const mustaches: string[] = this.Application.Parser.ParseMustaches(expression);
        for (let i: number = 0; i < mustaches.length; i++) {
            const mustache: string = mustaches[i];
            const dataPath: string[] = this.Application.Parser.ParseMustache(mustache);
            const data: string = this.GetSystemContextPathValue(sector, context, dataPath);
            if (data === null)
                continue;
            expression = expression.replace(mustache, data);
        }
        return (expression);
    }

    public TransformObjectIntoArray(object: any): any[] {
        const array: any[] = [];
        for (const property in object) {
            const objectProperty: any = {};
            objectProperty.Key = property;
            objectProperty.Value = object[property];
            array.push(objectProperty);
        }
        return (array);
    }

    public ResolveUrlToAbsolute(urlRelative: string): string {
        if (urlRelative.search(/^\/\//) != -1)
            return (window.location.protocol + urlRelative);
        if (urlRelative.search(/:\/\//) != -1)
            return (urlRelative);
        if (urlRelative.search(/^\//) != -1)
            return window.location.origin + urlRelative;
        const base = window.location.href.match(/(.*\/)/)[0];
        return (base + urlRelative);
    }

    public Contains(data: string[], item: string): boolean {
        for (let i: number = 0; i < data.length; i++)
            if (data[i] == item)
                return (true);
        return (false);
    }

    public Join(list1: string[], list2: string[]): string[] {
        const list: string[] = [];
        for (let i: number = 0; i < list1.length; i++)
            list.push(list1[i]);
        for (let i: number = 0; i < list2.length; i++) {
            const value: string = list2[i];
            if (!this.Contains(list, value))
                list.push(value);
        }
        return (list);
    }

    public Get(dictionary: [string, string][], key: string): string {
        for (let i: number = 0; i < dictionary.length; i++) {
            const keyValue: [string, string] = dictionary[i];
            if (keyValue[0] === key)
                return (keyValue[1]);
        }
        return (null);
    }

    public IsEqualAny(data1: any[] | any, data2: any[] | any): boolean {
        //Null
        const isData1Null: boolean = (data1 == null);
        const isData2Null: boolean = (data2 == null);
        if (isData1Null !== isData2Null)
            return (false);
        if (isData1Null)
            return (true);
        //Array
        const isData1Array: boolean = Array.isArray(data1);
        const isData2Array: boolean = Array.isArray(data2);
        if (isData1Array !== isData2Array)
            return (false);
        if (isData1Array)
            return (this.IsEqualObjectArray(data1, data2));
        //Object
        const isData1Object: boolean = (typeof data1 == 'object');
        const isData2Object: boolean = (typeof data2 == 'object');
        if (isData1Object !== isData2Object)
            return (false);
        if (isData1Object)
            return (this.IsEqualObject(data1, data2));
        return (false);
    }

    public IsEqualObject(value1: object, value2: object): boolean {
        const value1Properties: [string, any][] = this.GetObjectProperties(value1);
        const value2Properties: [string, any][] = this.GetObjectProperties(value2);
        if (value1Properties.length !== value2Properties.length)
            return (false);
        for (let i: number = 0; i < value1Properties.length; i++) {
            const value1Property: [string, any] = value1Properties[i];
            const value2Property: [string, any] = value2Properties[i];
            if (value1Property[0] !== value2Property[0])
                return (false);
            if (value1Property[1] !== value2Property[1])
                return (false);
        }
        return (true);
    }

    private GetObjectProperties(value: object): [string, any][] {
        const valueAsAny: any = value;
        const properties: [string, any][] = [];
        for (const propertyName in value) {
            properties.push([propertyName, valueAsAny[propertyName]]);
        }
        return (properties);
    }

    public IsEqualObjectArray(value1: object[], value2: object[]): boolean {
        if (value1.length !== value2.length)
            return (false);
        for (let i: number = 0; i < value1.length; i++) {
            if (!this.IsEqualObject(value1[i], value2[i]))
                return (false);
        }
        return (true);
    }

    public IsEqualStringArray(list1: string[], list2: string[]): boolean {
        if (list1.length !== list2.length)
            return (false);
        for (let i: number = 0; i < list1.length; i++)
            if (list1[i] !== list2[i])
                return (false);
        return (true);
    }

    public IsEqualString(value1: any, value2: any): boolean {
        const value1String = this.EnsureString(value1);
        const value2String = this.EnsureString(value2);
        return (value1String === value2String);
    }

    public EnsureString(data: any): string {
        if (data === null)
            return (data);
        if (typeof data === 'object')
            return ('object');
        if (typeof data === 'string')
            return (data);
        return (data.toString());
    }

    public Replace(data: string, from: string, to: string) {
        if (from === '.')
            from = '\\.';
        const regex: RegExp = new RegExp(from, 'g');
        const dataReplaced: string = data.replace(regex, to);
        return (dataReplaced);
    }

    public ResolveMathematicalExpression(data: string): string {
        const tokens: string[] = this.Application.Parser.ParseBlockMathematicalExpression(data);
        //Blocks
        for (let i: number = 0; i < tokens.length; i++) {
            const token: string = tokens[i];
            if ((token.length > 2) && (token[0] === '(') && (token[token.length - 1] === ')'))
                tokens[i] = this.ResolveMathematicalExpression(token.substring(1, token.length - 1));

        }
        //Multiplication
        for (let i: number = 0; i < tokens.length - 2; i++) {
            const token: string = tokens[i + 1];
            if (token !== '*')
                continue;
            const blockMultiFirstParameter: string = tokens[i];
            const blockMultiSecondParameter: string = tokens[i + 2];
            const blockMultiValue: string = (this.Application.Parser.ParseNumber(blockMultiFirstParameter) * this.Application.Parser.ParseNumber(blockMultiSecondParameter)).toString();
            tokens[i] = blockMultiValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        //Division
        for (let i: number = 0; i < tokens.length - 2; i++) {
            const token: string = tokens[i + 1];
            if (token !== '/')
                continue;
            const blockDivisionFirstParameter: string = tokens[i];
            const blockDivisionSecondParameter: string = tokens[i + 2];
            const numberDividend: number = this.Application.Parser.ParseNumber(blockDivisionSecondParameter);
            const blockDivisionValue: string = numberDividend == 0 ? '0' : (this.Application.Parser.ParseNumber(blockDivisionFirstParameter) / numberDividend).toString();
            tokens[i] = blockDivisionValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        //Plus
        for (let i: number = 0; i < tokens.length - 2; i++) {
            const token: string = tokens[i + 1];
            if (token !== '+')
                continue;
            const blockPlusFirstParameter: string = tokens[i];
            const blockPlusSecondParameter: string = tokens[i + 2];
            const blockPlusValue: string = (this.Application.Parser.ParseNumber(blockPlusFirstParameter) + this.Application.Parser.ParseNumber(blockPlusSecondParameter)).toString();
            tokens[i] = blockPlusValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        //Minus
        for (let i: number = 0; i < tokens.length - 2; i++) {
            const token: string = tokens[i + 1];
            if (token !== '-')
                continue;
            const blockMinusFirstParameter: string = tokens[i];
            const blockMinusSecondParameter: string = tokens[i + 2];
            const blockMinusValue: string = (this.Application.Parser.ParseNumber(blockMinusFirstParameter) - this.Application.Parser.ParseNumber(blockMinusSecondParameter)).toString();
            tokens[i] = blockMinusValue;
            tokens.splice(i + 1, 2);
            i--;
        }
        return (tokens[0]);
    }
}