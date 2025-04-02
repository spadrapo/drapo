class DrapoFunctionHandler {
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

    public async ResolveFunctionWithoutContext(sector: string, element: HTMLElement, functionsValue: string, executionContext: DrapoExecutionContext<any> = null): Promise<string> {
        return (await this.ResolveFunction(sector, null, element, null, functionsValue, executionContext, true));
    }

    public CreateExecutionContext(canReset: boolean = true): DrapoExecutionContext<any> {
        const executionContext: DrapoExecutionContext<any> = new DrapoExecutionContext<any>(this.Application);
        executionContext.CanReset = canReset;
        if (canReset)
            this.Application.Server.HasBadRequest = false;
        return (executionContext);
    }

    private async FinalizeExecutionContext(executionContext: DrapoExecutionContext<any>): Promise<void> {
        //Auto Close Windows
        const windowsAutoClose: DrapoWindow[] = executionContext.GetWindowsAutoClose();
        for (let i: number = windowsAutoClose.length - 1; i >= 0; i--) {
            const windowAutoClose: DrapoWindow = windowsAutoClose[i];
            await this.Application.WindowHandler.TryClose(windowAutoClose);
        }
    }

    private IsExecutionBroked(executionContext: DrapoExecutionContext<any>): boolean {
        if (executionContext.HasError)
            return (true);
        if (!executionContext.CanReset)
            return (false);
        if (this.Application.Server.HasBadRequest) {
            this.Application.Server.HasBadRequest = false;
            executionContext.HasError = true;
            return (true);
        }
        return (false);
    }

    public async ReplaceFunctionExpressions(sector: string, context: DrapoContext, expression: string, canBind: boolean): Promise<string> {
        return (await this.ReplaceFunctionExpressionsContext(sector, context, expression, canBind, this.CreateExecutionContext(false)));
    }

    public async ReplaceFunctionExpressionsContext(sector: string, context: DrapoContext, expression: string, canBind: boolean, executionContext: DrapoExecutionContext<any>): Promise<string> {
        //Parser
        const functionsParsed: string[] = this.Application.Parser.ParseFunctions(expression);
        for (let i = 0; i < functionsParsed.length; i++) {
            let functionParse: string = functionsParsed[i];
            let functionParsed: DrapoFunction = this.Application.Parser.ParseFunction(functionParse);
            if (functionParsed === null)
                continue;
            //Mustache
            if (this.Application.Parser.IsMustache(functionParse)) {
                const dataPath: string[] = this.Application.Parser.ParseMustache(functionParse);
                const data: string = await this.Application.Solver.ResolveItemDataPathObject(sector, context.Item, dataPath);
                if ((data == null) || (data == ''))
                    continue;
                functionParse = data;
                const functionInnerParsed = await this.ReplaceFunctionExpressionsContext(sector, context, functionParse, canBind, executionContext);
                if (functionInnerParsed === functionParse)
                    continue;
                functionParse = functionInnerParsed;
                expression = expression.replace(functionParse, functionInnerParsed);
            }
            //Function
            functionParsed = this.Application.Parser.ParseFunction(functionParse);
            if (functionParsed == null) {
                await this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - ResolveFunction - Invalid Parse - {0}', functionParse);
                continue;
            }
            expression = expression.replace(functionParse, await this.ExecuteFunctionContextSwitch(sector, context.Item, null, null, functionParsed, executionContext));
        }
        return (expression);
    }

    public async ResolveFunction(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionsValue: string, executionContext: DrapoExecutionContext<any> = null, forceFinalizeExecutionContext: boolean = false): Promise<string> {
        let created: boolean = false;
        if (created = executionContext === null) {
            executionContext = this.CreateExecutionContext();
        }
        const result: string = await this.ResolveFunctionContext(sector, contextItem, element, event, functionsValue, executionContext);
        if ((created) || (forceFinalizeExecutionContext))
            await this.FinalizeExecutionContext(executionContext);
        return (result);
    }

    private async ResolveFunctionContext(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionsValue: string, executionContext: DrapoExecutionContext<any>): Promise<string> {
        let result: string = '';
        //Execution Broked
        if (this.IsExecutionBroked(executionContext))
            return (result);
        //Parser
        const functionsParsed: string[] = this.Application.Parser.ParseFunctions(functionsValue);
        for (let i = 0; i < functionsParsed.length; i++) {
            const functionParse: string = functionsParsed[i];
            if (functionParse == '')
                continue;
            //Mustache
            if (this.Application.Parser.IsMustache(functionParse)) {
                const dataPath: string[] = this.Application.Parser.ParseMustache(functionParse);
                const data: string = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
                if ((data == null) || (data == ''))
                    continue;
                const dataKey: string = this.Application.Solver.ResolveDataKey(dataPath);
                executionContext.HasBreakpoint = await this.Application.Debugger.HasBreakpoint(sector, dataKey);
                executionContext.Sector = sector;
                executionContext.DataKey = dataKey;
                result = result + await this.ResolveFunctionContext(sector, contextItem, element, event, data, executionContext);
                if (this.IsExecutionBroked(executionContext))
                    return (result);
                continue;
            }
            //Function
            const functionParsed: DrapoFunction = this.Application.Parser.ParseFunction(functionParse);
            if (functionParsed == null) {
                await this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - ResolveFunction - Invalid Parse - {0}', functionParse);
                continue;
            }
            //Call breakpoint before any function
            if (executionContext.HasBreakpoint)
                await this.Application.Debugger.ActivateBreakpoint(executionContext.Sector, executionContext.DataKey, functionsValue, functionParse, 'before');
            //Execute function
            result = result + await this.ExecuteFunctionContextSwitch(sector, contextItem, element, event, functionParsed, executionContext);
            //Call breakpoint after the last function
            if ((executionContext.HasBreakpoint) && (i == (functionsParsed.length - 1)))
                await this.Application.Debugger.ActivateBreakpoint(executionContext.Sector, executionContext.DataKey, functionsValue, functionParse, 'after');
            //Execution Broked
            if (this.IsExecutionBroked(executionContext))
                return (result);
        }
        //Clean Runtime
        await this.Application.Debugger.CleanRuntime();
        return (result);
    }

    public async ResolveFunctionParameter(sector: string, contextItem: DrapoContextItem, element: HTMLElement, executionContext: DrapoExecutionContext<any>, parameter: string, canForceLoadDataDelay: boolean = false, canUseReturnFunction: boolean = false, isRecursive: boolean = false): Promise<any> {
        //Function
        if (canUseReturnFunction) {
            const functionParsed: DrapoFunction = this.Application.Parser.ParseFunction(parameter);
            if (functionParsed != null) {
                const valueFunction: any = await this.ExecuteFunctionContextSwitch(sector, contextItem, element, null, functionParsed, executionContext);
                if (isRecursive)
                    return (await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, valueFunction));
                return (valueFunction);
            }
        }
        //Mustache
        if (!this.Application.Parser.HasMustache(parameter))
            return (parameter);
        //Functions
        if (this.Application.Parser.HasFunction(parameter))
            return (parameter);
        const mustaches: string[] = this.Application.Parser.ParseMustaches(parameter);
        if (mustaches.length == 0)
            return (parameter);
        const mustache: string[] = this.Application.Parser.ParseMustache(mustaches[0]);
        const value: any = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, mustache, canForceLoadDataDelay, executionContext);
        if ((!isRecursive) && (parameter === mustaches[0]))
            return (value);
        const valueReplaceMustache: string = parameter.replace(mustaches[0], value);
        //Recursive
        return (await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, valueReplaceMustache));
    }

    public ResolveExecutionContextMustache(sector: string, executionContext: DrapoExecutionContext<any>, value: string): string {
        if (executionContext == null)
            return (value);
        if (!this.Application.Parser.HasMustache(value))
            return (value);
        const mustaches: string[] = this.Application.Parser.ParseMustaches(value);
        for (let i: number = 0; i < mustaches.length; i++) {
            const mustache: string = mustaches[i];
            const dataPath: string[] = this.Application.Parser.ParseMustache(mustache);
            const mustacheResolved: string = this.Application.Solver.GetExecutionContextPathValue(sector, executionContext, dataPath);
            if (mustacheResolved !== null)
                value = value.replace(mustache, mustacheResolved);
        }
        return (value);
    }

    public async ResolveFunctions(sector: string, contextItem: DrapoContextItem, element: HTMLElement, executionContext: DrapoExecutionContext<any>, value: string, checkInvalidFunction : boolean = true): Promise<any> {
        //Functions
        const functionsParsed: string[] = this.Application.Parser.ParseFunctionsPartial(value);
        for (let i: number = 0; i < functionsParsed.length; i++) {
            const functionText: string = functionsParsed[i];
            const functionParsed: DrapoFunction = this.Application.Parser.ParseFunction(functionText);
            if (functionParsed === null)
                continue;
            const valueFunction: any = await this.ExecuteFunctionContextSwitch(sector, contextItem, element, null, functionParsed, executionContext, checkInvalidFunction);
            if ((valueFunction === null) && (!checkInvalidFunction))
                continue;
            const valueReplaceFunction: string = value.replace(functionText, valueFunction);
            return (await this.ResolveFunctions(sector, contextItem, element, executionContext, valueReplaceFunction, checkInvalidFunction));
        }
        //Mustache
        if (!this.Application.Parser.HasMustache(value))
            return (value);
        const mustaches: string[] = this.Application.Parser.ParseMustaches(value);
        if (mustaches.length == 0)
            return (value);
        const mustache: string[] = this.Application.Parser.ParseMustache(mustaches[0]);
        const mustacheValue: any = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, mustache, true);
        const valueReplaceMustache: string = value.replace(mustaches[0], mustacheValue);
        //Recursive
        return (await this.ResolveFunctions(sector, contextItem, element, executionContext, valueReplaceMustache, checkInvalidFunction));
    }

    private async ResolveFunctionParameterDataFields(sector: string, contextItem: DrapoContextItem, element: HTMLElement, parameter: string, executionContext: DrapoExecutionContext<any>): Promise<string[]> {
        const value = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, parameter);
        if ((value == null) || (value == ''))
            return (null);
        const mustache: string = '{{' + value + '}}';
        const dataFields: string[] = this.Application.Parser.ParseMustache(mustache);
        return (dataFields);
    }

    private async ExecuteFunctionContextSwitch(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>, checkInvalidFunction: boolean = true): Promise<any> {
        await this.Application.Debugger.AddFunction(functionParsed);
        if (functionParsed.Name === 'external')
            return (this.ExecuteFunctionExternal(contextItem, element, event, functionParsed));
        if (functionParsed.Name === 'toggleitemfield')
            return (await this.ExecuteFunctionToggleItemField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'toggledata')
            return (await this.ExecuteFunctionToggleData(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'uncheckitemfield')
            return (await this.ExecuteFunctionUncheckItemField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'clearitemfield')
            return (await this.ExecuteFunctionClearItemField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'updateitemfield')
            return (await this.ExecuteFunctionUpdateItemField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'replaceitemfield')
            return (await this.ExecuteFunctionReplaceItemField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'replaceregexitemfield')
            return (await this.ExecuteFunctionReplaceRegexItemField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'replacecharsitemfield')
            return (await this.ExecuteFunctionReplaceCharsItemField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'checkdatafield')
            return (await this.ExecuteFunctionCheckDataField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'uncheckdatafield')
            return (await this.ExecuteFunctionUncheckDataField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'cleardatafield')
            return (await this.ExecuteFunctionClearDataField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'updatedatafield')
            return (await this.ExecuteFunctionUpdateDataField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'updatedatafieldlookup')
            return (await this.ExecuteFunctionUpdateDataFieldLookup(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'checkitemfield')
            return (await this.ExecuteFunctionCheckItemField(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'moveitem')
            return (await this.ExecuteFunctionMoveItem(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'updatedataurl')
            return (await this.ExecuteFunctionUpdateDataUrl(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'updatedataurlset')
            return (await this.ExecuteFunctionUpdateDataUrlSet(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'adddataitem')
            return (await this.ExecuteFunctionAddDataItem(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'removedataitem')
            return (await this.ExecuteFunctionRemoveDataItem(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'removedataitemlookup')
            return (await this.ExecuteFunctionRemoveDataItemLookup(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'containsdataitem')
            return (await this.ExecuteFunctionContainsDataItem(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'updatesector')
            return (await this.ExecuteFunctionUpdateSector(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'switchsector')
            return (await this.ExecuteFunctionSwitchSector(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'reloadsector')
            return (await this.ExecuteFunctionReloadSector(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'clearsector')
            return (await this.ExecuteFunctionClearSector(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'loadsectorcontent')
            return (await this.ExecuteFunctionLoadSectorContent(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'postdata')
            return (await this.ExecuteFunctionPostData(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'postdataitem')
            return (await this.ExecuteFunctionPostDataItem(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'cleardata')
            return (await this.ExecuteFunctionClearData(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'unloaddata')
            return (await this.ExecuteFunctionUnloadData(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'createdata')
            return (await this.ExecuteFunctionCreateData(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'updatedata')
            return (await this.ExecuteFunctionUpdateData(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'reloaddata')
            return (await this.ExecuteFunctionReloadData(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'filterdata')
            return (await this.ExecuteFunctionFilterData(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'hasdatachanges')
            return (await this.ExecuteFunctionHasDataChanges(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'acceptdatachanges')
            return (await this.ExecuteFunctionAcceptDataChanges(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'reloadpage')
            return (await this.ExecuteFunctionReloadPage(sector, contextItem, element, event, functionParsed));
        if (functionParsed.Name === 'closepage')
            return (await this.ExecuteFunctionClosePage(sector, contextItem, element, event, functionParsed));
        if (functionParsed.Name === 'redirectpage')
            return (await this.ExecuteFunctionRedirectPage(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'updateurl')
            return (await this.ExecuteFunctionUpdateURL(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'updatetoken')
            return (await this.ExecuteFunctionUpdateToken(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'cleartoken')
            return (await this.ExecuteFunctionClearToken(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'hastoken')
            return (this.ExecuteFunctionHasToken(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'updatetokenantiforgery')
            return (await this.ExecuteFunctionUpdateTokenAntiforgery(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'destroycontainer')
            return (await this.ExecuteFunctionDestroyContainer(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'if')
            return (await this.ExecuteFunctionIf(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'async')
            return (await this.ExecuteFunctionAsync(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'notify')
            return (await this.ExecuteFunctionNotify(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'focus')
            return (await this.ExecuteFunctionFocus(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'showwindow')
            return (await this.ExecuteFunctionShowWindow(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'closewindow')
            return (await this.ExecuteFunctionCloseWindow(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'hidewindow')
            return (await this.ExecuteFunctionHideWindow(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'getwindow')
            return (await this.ExecuteFunctionGetWindow(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'setexternal')
            return (await this.ExecuteFunctionSetExternal(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'getexternal')
            return (await this.ExecuteFunctionGetExternal(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'setexternalframe')
            return (await this.ExecuteFunctionSetExternalFrame(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'getexternalframe')
            return (await this.ExecuteFunctionGetExternalFrame(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'setexternalframemessage')
            return (await this.ExecuteFunctionSetExternalFrameMessage(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'getexternalframemessage')
            return (await this.ExecuteFunctionGetExternalFrameMessage(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'createguid')
            return (await this.ExecuteFunctionCreateGuid(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'createtick')
            return (await this.ExecuteFunctionCreateTick(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'getdate')
            return (await this.ExecuteFunctionGetDate(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'adddate')
            return (await this.ExecuteFunctionAddDate(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'pushstack')
            return (await this.ExecuteFunctionPushStack(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'popstack')
            return (await this.ExecuteFunctionPopStack(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'peekstack')
            return (await this.ExecuteFunctionPeekStack(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'execute')
            return (await this.ExecuteFunctionExecute(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'executedataitem')
            return (await this.ExecuteFunctionExecuteDataItem(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'executecomponentfunction')
            return (await this.ExecuteFunctionExecuteComponentFunction(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'executeinstancefunction')
            return (await this.ExecuteFunctionExecuteInstanceFunction(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'cast')
            return (await this.ExecuteFunctionCast(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'encodeurl')
            return (await this.ExecuteFunctionEncodeUrl(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'addrequestheader')
            return (await this.ExecuteFunctionAddRequestHeader(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'getsector')
            return (await this.ExecuteFunctionGetSector(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'getclipboard')
            return (await this.ExecuteFunctionGetClipboard(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'setclipboard')
            return (await this.ExecuteFunctionSetClipboard(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'createtimer')
            return (await this.ExecuteFunctionCreateTimer(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'createreference')
            return (await this.ExecuteFunctionCreateReference(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'wait')
            return (await this.ExecuteFunctionWait(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'executevalidation')
            return (await this.ExecuteFunctionExecuteValidation(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'clearvalidation')
            return (await this.ExecuteFunctionClearValidation(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'downloaddata')
            return (await this.ExecuteFunctionDownloadData(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'detectview')
            return (await this.ExecuteFunctionDetectView(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'setconfig')
            return (await this.ExecuteFunctionSetConfig(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'getconfig')
            return (await this.ExecuteFunctionGetConfig(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'lockplumber')
            return (await this.ExecuteFunctionLockPlumber(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'unlockplumber')
            return (await this.ExecuteFunctionUnlockPlumber(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'lockdata')
            return (await this.ExecuteFunctionLockData(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'unlockdata')
            return (await this.ExecuteFunctionUnlockData(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'clearplumber')
            return (await this.ExecuteFunctionClearPlumber(sector, contextItem, element, event, functionParsed, executionContext));
        if (functionParsed.Name === 'debugger')
            return (await this.ExecuteFunctionDebugger(sector, contextItem, element, event, functionParsed, executionContext));
        if (!checkInvalidFunction)
            return (null);
        await this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - ExecuteFunction - Invalid Function - {0}', functionParsed.Name);
        return ('');
    }

    private ExecuteFunctionExternal(contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction): string {
        return ('');
    }

    private async ExecuteFunctionSetExternal(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const externalFunction: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const isCloneText: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
        const isClone: boolean = ((isCloneText == null) || (isCloneText == '')) ? false : await this.Application.Solver.ResolveConditional(isCloneText);
        const data: any[] = await this.Application.Storage.RetrieveData(dataKey, sector);
        const windowFunction = (window as any)[externalFunction];
        if (typeof windowFunction !== 'function')
            return ('');
        windowFunction(isClone ? this.Application.Solver.Clone(data, true) : data);
    }

    private async ExecuteFunctionGetExternal(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const externalFunction: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const isCloneText: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
        const isClone: boolean = ((isCloneText == null) || (isCloneText == '')) ? false : await this.Application.Solver.ResolveConditional(isCloneText);
        const windowFunction = (window as any)[externalFunction];
        if (typeof windowFunction !== 'function')
            return ('');
        const data: any[] = windowFunction();
        await this.Application.Storage.UpdateData(dataKey, sector, isClone ? this.Application.Solver.Clone(data, true) : data);
        return ('');
    }

    private async ExecuteFunctionSetExternalFrame(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const frameID: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const externalFunction: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
        const isCloneText: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]);
        const isClone: boolean = ((isCloneText == null) || (isCloneText == '')) ? false : await this.Application.Solver.ResolveConditional(isCloneText);
        const data: any[] = await this.Application.Storage.RetrieveData(dataKey, sector);
        const frame: any = document.getElementById(frameID);
        if (frame == null)
            return ('');
        const frameContent = (frame.contentWindow || frame.contentDocument);
        const application: DrapoApplication = this.Application;
        let windowFunction = (frameContent as any)[externalFunction];
        if (typeof windowFunction !== 'function') {
            const eventType: string = 'load';
            const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventType);
            const elFrame: HTMLElement = frame as HTMLElement;
            this.Application.EventHandler.AttachEventListener(elFrame, eventType, eventNamespace, () => {
                windowFunction = (frameContent as any)[externalFunction];
                if (typeof windowFunction !== 'function')
                    return ('');
                application.EventHandler.DetachEventListener(elFrame, eventNamespace);
                windowFunction(isClone ? application.Solver.Clone(data, true) : data);
            });
        } else {
            windowFunction(isClone ? this.Application.Solver.Clone(data, true) : data);
        }
    }

    private async ExecuteFunctionGetExternalFrame(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const frameID: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const externalFunction: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
        const isCloneText: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]);
        const isClone: boolean = ((isCloneText == null) || (isCloneText == '')) ? false : await this.Application.Solver.ResolveConditional(isCloneText);
        const frame: any = document.getElementById(frameID);
        if (frame == null)
            return ('');
        const frameContent = (frame.contentWindow || frame.contentDocument);
        const windowFunction = (frameContent as any)[externalFunction];
        if (typeof windowFunction !== 'function')
            return ('');
        const data: any[] = windowFunction();
        await this.Application.Storage.UpdateData(dataKey, sector, isClone ? this.Application.Solver.Clone(data, true) : data);
        return ('');
    }

    private async ExecuteFunctionSetExternalFrameMessage(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const frameID: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const externalFunction: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
        const isCloneText: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]);
        const isClone: boolean = ((isCloneText == null) || (isCloneText == '')) ? false : await this.Application.Solver.ResolveConditional(isCloneText);
        const data: any[] = await this.Application.Storage.RetrieveData(dataKey, sector);
        const frame: any = document.getElementById(frameID);
        if (frame == null)
            return ('');
        const frameContent = (frame.contentWindow || frame.contentDocument);
        const message: DrapoMessage = new DrapoMessage();
        message.Action = 'set';
        message.DataKey = dataKey;
        message.Tag = externalFunction;
        message.Data = isClone ? this.Application.Solver.Clone(data, true) : data;
        const application: DrapoApplication = this.Application;
        const eventType: string = 'load';
        const eventNamespace: string = this.Application.EventHandler.CreateEventNamespace(null, null, eventType);
        const elFrame: HTMLElement = frame as HTMLElement;
        this.Application.EventHandler.AttachEventListener(elFrame, eventType, eventNamespace, () => {
            application.EventHandler.DetachEventListener(elFrame, eventNamespace);
            frameContent.postMessage(message, "*");
        });
    }

    private async ExecuteFunctionGetExternalFrameMessage(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const frameID: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const externalFunction: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
        const isCloneText: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]);
        const isClone: boolean = ((isCloneText == null) || (isCloneText == '')) ? false : await this.Application.Solver.ResolveConditional(isCloneText);
        const frame: any = document.getElementById(frameID);
        if (frame == null)
            return ('');
        const frameContent = (frame.contentWindow || frame.contentDocument);
        const message: DrapoMessage = new DrapoMessage();
        message.Action = 'get';
        message.DataKey = dataKey;
        message.Tag = externalFunction;
        message.Data = null;
        this.Application.Document.Message = null;
        frameContent.postMessage(message, "*");
        const messagePost: any = await this.Application.Document.WaitForMessage();
        const data: any[] = messagePost != null ? messagePost._data : [];
        await this.Application.Storage.UpdateData(dataKey, sector, isClone ? this.Application.Solver.Clone(data, true) : data);
        return ('');
    }

    private async ExecuteFunctionToggleItemField(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataPath: string[] = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
        const notifyText: string = functionParsed.Parameters[1];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        const stateAny: any = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
        const state: boolean = this.Application.Solver.ResolveConditionalBoolean(((stateAny == null) || ((typeof stateAny) === 'string')) ? stateAny : stateAny.toString());
        const stateUpdated: boolean = !state;
        await this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, stateUpdated, notify);
        return ('');
    }

    private async ExecuteFunctionToggleData(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const source: string = functionParsed.Parameters[0];
        const isSourceMustache: boolean = this.Application.Parser.IsMustache(source);
        const mustacheParts: string[] = isSourceMustache ? this.Application.Parser.ParseMustache(source) : null;
        const dataKey: string = mustacheParts != null ? this.Application.Solver.ResolveDataKey(mustacheParts) : source;
        const itemText: string = functionParsed.Parameters[1];
        let item: any = null;
        if (this.Application.Parser.IsMustache(itemText)) {
            const dataPath: string[] = this.Application.Parser.ParseMustache(itemText);
            item = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
        } else {
            if (this.Application.Storage.IsDataKey(itemText, sector)) {
                const dataItem: DrapoStorageItem = await this.Application.Storage.RetrieveDataItem(itemText, sector);
                if (dataItem != null)
                    item = dataItem.Data;
            } else if (contextItem == null) {
                item = itemText;
            } else {
                const itemPath: string[] = [];
                itemPath.push(itemText);
                item = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, itemPath);
            }
        }
        if (item == null)
            return (null);
        const notifyText: string = functionParsed.Parameters[2];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.ToggleData(dataKey, mustacheParts, sector, item, notify);
        return ('');
    }

    private async ExecuteFunctionUncheckItemField(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataPath: string[] = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
        await this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, false);
        return ('');
    }

    private async ExecuteFunctionClearItemField(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataPath: string[] = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
        const notifyText: string = functionParsed.Parameters[1];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, null, notify);
        return ('');
    }

    private async ExecuteFunctionUpdateItemField(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataPath: string[] = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
        for (let i: number = 0; i < dataPath.length; i++) {
            const dataPathValue: string = dataPath[i];
            if (!this.Application.Parser.HasMustache(dataPathValue))
                continue;
            const dataPathValueResolved: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, dataPathValue);
            if (dataPathValue !== dataPathValueResolved)
                dataPath[i] = dataPathValueResolved;
        }
        const recursiveText: string = functionParsed.Parameters.length > 3 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
        const recursive: boolean = ((recursiveText == null) || (recursiveText == '')) ? false : await this.Application.Solver.ResolveConditional(recursiveText);
        const resolveText: string = functionParsed.Parameters.length > 4 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4]) : null;
        const resolve: boolean = ((resolveText == null) || (resolveText == '')) ? true : await this.Application.Solver.ResolveConditional(resolveText);
        const item: any = resolve ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1], true, true, recursive) : functionParsed.Parameters[1];
        const notifyText: string = functionParsed.Parameters[2];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, item, notify);
        return ('');
    }

    private async ExecuteFunctionReplaceItemField(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataPath: string[] = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
        for (let i: number = 0; i < dataPath.length; i++) {
            const dataPathValue: string = dataPath[i];
            if (!this.Application.Parser.HasMustache(dataPathValue))
                continue;
            const dataPathValueResolved: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, dataPathValue);
            if (dataPathValue !== dataPathValueResolved)
                dataPath[i] = dataPathValueResolved;
        }
        const recursiveText: string = functionParsed.Parameters.length > 4 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4]) : null;
        const recursive: boolean = ((recursiveText == null) || (recursiveText == '')) ? false : await this.Application.Solver.ResolveConditional(recursiveText);
        const resolveText: string = functionParsed.Parameters.length > 5 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[5]) : null;
        const resolve: boolean = ((resolveText == null) || (resolveText == '')) ? true : await this.Application.Solver.ResolveConditional(resolveText);
        const substr: string = resolve ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1], true, true, recursive) : functionParsed.Parameters[1];
        const replacementStr: string = resolve ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2], true, true, recursive) : functionParsed.Parameters[2];
        const ignoreCaseText: string = functionParsed.Parameters.length < 4 ? null : (resolve ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3], true, true, recursive) : functionParsed.Parameters[3]);
        const ignoreCase: boolean = ((ignoreCaseText == null) || (ignoreCaseText == '')) ? false : await this.Application.Solver.ResolveConditional(ignoreCaseText);
        const originalValue: string = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath, true, executionContext);
        const regex: RegExp = new RegExp(substr, (ignoreCase ? 'gi' : 'g'));
        const finalValue = originalValue.replace(regex, replacementStr);
        return (finalValue);
    }

    private async ExecuteFunctionReplaceRegexItemField(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataPath: string[] = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
        for (let i: number = 0; i < dataPath.length; i++) {
            const dataPathValue: string = dataPath[i];
            if (!this.Application.Parser.HasMustache(dataPathValue))
                continue;
            const dataPathValueResolved: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, dataPathValue);
            if (dataPathValue !== dataPathValueResolved)
                dataPath[i] = dataPathValueResolved;
        }
        const recursiveText: string = functionParsed.Parameters.length > 4 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4]) : null;
        const recursive: boolean = ((recursiveText == null) || (recursiveText == '')) ? false : await this.Application.Solver.ResolveConditional(recursiveText);
        const resolveText: string = functionParsed.Parameters.length > 5 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[5]) : null;
        const resolve: boolean = ((resolveText == null) || (resolveText == '')) ? true : await this.Application.Solver.ResolveConditional(resolveText);
        const regexStr: string = resolve ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1], true, true, recursive) : functionParsed.Parameters[1];
        const replacementStr: string = resolve ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2], true, true, recursive) : functionParsed.Parameters[2];
        const ignoreCaseText: string = functionParsed.Parameters.length < 4 ? null : (resolve ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3], true, true, recursive) : functionParsed.Parameters[3]);
        const ignoreCase: boolean = ((ignoreCaseText == null) || (ignoreCaseText == '')) ? false : await this.Application.Solver.ResolveConditional(ignoreCaseText);
        const originalValue: string = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath, true, executionContext);
        const regex: RegExp = new RegExp(regexStr, (ignoreCase ? 'gi' : 'g'));
        const finalValue = originalValue.replace(regex, replacementStr);
        return (finalValue);
    }

    private async ExecuteFunctionReplaceCharsItemField(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataPath: string[] = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
        for (let i: number = 0; i < dataPath.length; i++) {
            const dataPathValue: string = dataPath[i];
            if (!this.Application.Parser.HasMustache(dataPathValue))
                continue;
            const dataPathValueResolved: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, dataPathValue);
            if (dataPathValue !== dataPathValueResolved)
                dataPath[i] = dataPathValueResolved;
        }
        const recursiveText: string = functionParsed.Parameters.length > 3 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
        const recursive: boolean = ((recursiveText == null) || (recursiveText == '')) ? false : await this.Application.Solver.ResolveConditional(recursiveText);
        const resolveText: string = functionParsed.Parameters.length > 4 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4]) : null;
        const resolve: boolean = ((resolveText == null) || (resolveText == '')) ? true : await this.Application.Solver.ResolveConditional(resolveText);
        const charToReplace: string = resolve ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1], true, true, recursive) : functionParsed.Parameters[1];
        const replacementChars: string = resolve ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2], true, true, recursive) : functionParsed.Parameters[2];
        const endIndex: number = Math.min(charToReplace.length, replacementChars.length);
        let finalValue: string = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath, true, executionContext);
        for (let i = 0; i < endIndex; i++) {
            const regex = new RegExp(charToReplace[i], 'g');
            finalValue = finalValue.replace(regex, replacementChars[i]);
        }
        return (finalValue);
    }

    private async ExecuteFunctionCheckDataField(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        const dataFields: string[] = await this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext);
        const notifyText: string = functionParsed.Parameters[2];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, true, notify);
        return ('');
    }

    private async ExecuteFunctionUncheckDataField(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        const dataFields: string[] = await this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext);
        const notifyText: string = functionParsed.Parameters[2];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, false, notify);
        return ('');
    }

    private async ExecuteFunctionClearDataField(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        const dataFields: string[] = await this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext);
        const notifyText: string = functionParsed.Parameters[2];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, null, notify);
        return ('');
    }

    private async ExecuteFunctionUpdateDataField(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const dataFields: string[] = await this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext);
        const recursiveText: string = functionParsed.Parameters.length > 4 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4]) : null;
        const recursive: boolean = ((recursiveText == null) || (recursiveText == '')) ? false : await this.Application.Solver.ResolveConditional(recursiveText);
        const resolveText: string = functionParsed.Parameters.length > 5 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[5]) : null;
        const resolve: boolean = ((resolveText == null) || (resolveText == '')) ? true : await this.Application.Solver.ResolveConditional(resolveText);
        const value: any = resolve ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2], true, true, recursive) : functionParsed.Parameters[2];
        const notifyText: string = functionParsed.Parameters.length > 3 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, notify);
        return ('');
    }

    private async ExecuteFunctionUpdateDataFieldLookup(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const dataFieldSeek: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const valueSeek: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
        const dataField: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]);
        const valueText: string = functionParsed.Parameters[4];
        let value: any = null;
        if (this.Application.Parser.IsMustache(valueText)) {
            const dataPath: string[] = this.Application.Parser.ParseMustache(valueText);
            value = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
        } else {
            value = valueText;
        }
        const notifyText: string = functionParsed.Parameters.length > 3 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[5]) : null;
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.UpdateDataFieldLookup(dataKey, sector, dataFieldSeek, valueSeek, dataField, value, notify);
        return ('');
    }

    private async ExecuteFunctionCheckItemField(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataPath: string[] = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
        const notifyText: string = functionParsed.Parameters[1];
        const nofity: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, true, nofity);
        return ('');
    }

    private async ExecuteFunctionMoveItem(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const key: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const rangeIndex: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const notifyText: string = functionParsed.Parameters[2];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        const dataItem: DrapoStorageItem = await this.Application.Storage.RetrieveDataItem(contextItem.DataKey, sector);
        if (dataItem == null)
            return ('');
        const index: number = this.Application.ControlFlow.GetRangeIndex(dataItem.Data, rangeIndex);
        await this.Application.Storage.MoveDataIndex(contextItem.DataKey, sector, contextItem.Data, index, notify);
        return ('');
    }

    private async ExecuteFunctionUpdateDataUrl(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        const dataUrl: string = functionParsed.Parameters[1];
        const elDataKey: HTMLElement = this.Application.Searcher.FindByAttributeAndValue('d-dataKey', dataKey);
        if (elDataKey == null)
            return ('');
        const dataUrlCurrent: string = elDataKey.getAttribute('d-dataUrlGet');
        if (dataUrl === dataUrlCurrent)
            return ('');
        elDataKey.setAttribute('d-dataUrlGet', dataUrl);
        await this.Application.Storage.DiscardCacheData(dataKey, sector);
        await this.Application.Observer.Notify(dataKey, null, null);
        return ('');
    }

    private async ExecuteFunctionUpdateDataUrlSet(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        const dataUrl: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const elDataKey: HTMLElement = this.Application.Searcher.FindByAttributeAndValue('d-dataKey', dataKey);
        if (elDataKey == null)
            return ('');
        const dataUrlCurrent: string = elDataKey.getAttribute('d-dataUrlSet');
        if (dataUrl === dataUrlCurrent)
            return ('');
        elDataKey.setAttribute('d-dataUrlSet', dataUrl);
        await this.Application.Storage.DiscardCacheData(dataKey, sector);
        return ('');
    }

    private async ExecuteFunctionAddDataItem(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const source: string = functionParsed.Parameters[0];
        const isSourceMustache: boolean = this.Application.Parser.IsMustache(source);
        const mustacheParts: string[] = isSourceMustache ? this.Application.Parser.ParseMustache(source) : null;
        const dataKey: string = mustacheParts != null ? this.Application.Solver.ResolveDataKey(mustacheParts) : source;
        const itemText: string = functionParsed.Parameters[1];
        let item: any = null;
        if (this.Application.Parser.IsMustache(itemText)) {
            const dataPath: string[] = this.Application.Parser.ParseMustache(itemText);
            item = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
        } else {
            if (this.Application.Storage.IsDataKey(itemText, sector)) {
                const dataItem: DrapoStorageItem = await this.Application.Storage.RetrieveDataItem(itemText, sector);
                if (dataItem != null)
                    item = dataItem.Data;
            } else if (contextItem == null) {
                item = itemText;
            } else {
                const itemPath: string[] = [];
                itemPath.push(itemText);
                item = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, itemPath);
            }
        }
        if (item == null)
            return (null);
        const notifyText: string = functionParsed.Parameters[2];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        const isCloneText: string = functionParsed.Parameters[3];
        const isClone: boolean = ((isCloneText == null) || (isCloneText == '')) ? true : await this.Application.Solver.ResolveConditional(isCloneText);
        await this.Application.Storage.AddDataItem(dataKey, mustacheParts, sector, isClone ? this.Application.Solver.Clone(item) : item, notify);
    }

    private async ExecuteFunctionRemoveDataItem(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const source: string = functionParsed.Parameters[0];
        const isSourceMustache: boolean = this.Application.Parser.IsMustache(source);
        const mustacheParts: string[] = isSourceMustache ? this.Application.Parser.ParseMustache(source) : null;
        const dataKey: string = mustacheParts != null ? this.Application.Solver.ResolveDataKey(mustacheParts) : source;
        const itemText: string = functionParsed.Parameters[1];
        let itemPath: string[] = [];
        if (this.Application.Parser.IsMustache(itemText)) {
            itemPath = this.Application.Parser.ParseMustache(itemText);
        } else {
            itemPath.push(itemText);
        }
        const item: any = contextItem === null ? itemText : await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, itemPath);
        if (item == null)
            return (null);
        const notifyText: string = functionParsed.Parameters[2];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        const deleted: boolean = contextItem === null ? await this.Application.Storage.DeleteDataItemArray(dataKey, sector, item, notify) : await this.Application.Storage.DeleteDataItem(dataKey, mustacheParts, sector, item, notify);
        if (!deleted)
            return (null);
    }

    private async ExecuteFunctionRemoveDataItemLookup(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataPath: string = functionParsed.Parameters[0];
        const dataFieldSeek: string[] = await this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[1], executionContext);
        const valueSeek: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
        const notifyText: string = functionParsed.Parameters.length > 3 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.RemoveDataItemLookup(dataPath, sector, dataFieldSeek, valueSeek, notify);
        return ('');
    }

    private async ExecuteFunctionContainsDataItem(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        //Item
        const dataItemText: string = functionParsed.Parameters[1];
        let dataItemPath: string[] = [];
        const isMustache: boolean = this.Application.Parser.IsMustache(dataItemText);
        if (isMustache) {
            dataItemPath = this.Application.Parser.ParseMustache(dataItemText);
        } else {
            dataItemPath.push(dataItemText);
        }
        const item: any = ((!isMustache) && (contextItem == null)) ? dataItemText : await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataItemPath);
        //Container
        const dataContainerText: string = functionParsed.Parameters[0];
        let dataContainerPath: string[] = [];
        if (this.Application.Parser.IsMustache(dataContainerText)) {
            dataContainerPath = this.Application.Parser.ParseMustache(dataContainerText);
        } else {
            dataContainerPath.push(dataContainerText);
        }
        //Iteration
        const dataKeyContainer: string = dataContainerPath[0];
        const storageItem: DrapoStorageItem = await this.Application.Storage.RetrieveDataItem(dataKeyContainer, sector);
        if (storageItem == null)
            return ('false');
        const contextContainer: DrapoContext = new DrapoContext();
        for (let i: number = 0; i < storageItem.Data.length; i++) {
            const dataContainer: any = storageItem.Data[i];
            const containerItem: DrapoContextItem = contextContainer.Create(dataContainer, null, null, dataKeyContainer, dataKeyContainer, null, i);
            const itemContainer = await this.Application.Solver.ResolveItemDataPathObject(sector, containerItem, dataContainerPath);
            if (item == itemContainer)
                return ('true');
        }
        return ('false');
    }

    private async ExecuteFunctionUpdateSector(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        let title: string = null;
        if (functionParsed.Parameters.length >= 3)
            title = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
        const canRouteText: string = functionParsed.Parameters[3];
        const canRoute: boolean = ((canRouteText == null) || (canRouteText == '')) ? true : await this.Application.Solver.ResolveConditional(canRouteText);
        const canLoadDefaultSectorsText: string = functionParsed.Parameters.length >= 4 ? functionParsed.Parameters[4] : null;
        const canLoadDefaultSectors: boolean = ((canLoadDefaultSectorsText == null) || (canLoadDefaultSectorsText == '')) ? false : await this.Application.Solver.ResolveConditional(canLoadDefaultSectorsText);
        const containerText: string = functionParsed.Parameters.length >= 5 ? functionParsed.Parameters[5] : null;
        let container: string = null;
        if (containerText !== null) {
            if (this.Application.Parser.IsMustache(containerText)) {
                const dataPath: string[] = this.Application.Parser.ParseMustache(containerText);
                let item: any = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
                if ((item === null) || (item === '')) {
                    item = this.Application.Document.CreateGuid();
                    await this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, item);
                }
                container = item.toString();
            } else {
                container = containerText;
            }
        }
        const sectorName: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const url: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        this.Application.Document.StartUpdate(sectorName);
        await this.Application.Document.LoadChildSector(sectorName, url, title, canRoute, canLoadDefaultSectors, container);
        return ('');
    }

    private async ExecuteFunctionSwitchSector(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const sectorName: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const container: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        await this.Application.SectorContainerHandler.Switch(sectorName, container);
        return ('');
    }

    private async ExecuteFunctionReloadSector(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const sectorName: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const url: string = this.Application.Router.GetLastRouteUrlBySector(sectorName);
        if (url == null)
            return ('');
        this.Application.Document.StartUpdate(sectorName);
        await this.Application.Document.LoadChildSector(sectorName, url);
        return ('');
    }

    private async ExecuteFunctionClearSector(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const sectorName: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        this.Application.Document.StartUpdate(sectorName);
        await this.Application.SectorContainerHandler.Switch(sectorName, null);
        return ('');
    }

    private async ExecuteFunctionLoadSectorContent(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const sectorName: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const content: any = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const contentText: string = this.Application.Serializer.SerializeObject(content);
        this.Application.Document.StartUpdate(sectorName);
        await this.Application.Document.LoadChildSectorContent(sectorName, contentText);
        return ('');
    }

    private async ExecuteFunctionClearData(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        const notifyText: string = functionParsed.Parameters[1];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.ClearData(dataKey, sector, notify);
        return ('');
    }

    private async ExecuteFunctionUnloadData(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        const notifyText: string = functionParsed.Parameters[1];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.UnloadData(dataKey, sector);
        return ('');
    }

    private async ExecuteFunctionCreateData(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        const notifyText: string = functionParsed.Parameters[1];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        const object: any = {};
        for (let i: number = 2; i < functionParsed.Parameters.length - 1; i = i + 2) {
            const windowParameter: [string, string] = [null, null];
            const key: string = contextItem != null ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i]) : functionParsed.Parameters[i];
            const value: string = contextItem != null ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i + 1]) : functionParsed.Parameters[i + 1];
            object[key] = value;
        }
        await this.Application.Storage.UpdateData(dataKey, sector, object, notify);
        return ('');
    }

    private async ExecuteFunctionUpdateData(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        const recursiveText: string = functionParsed.Parameters.length > 3 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
        const recursive: boolean = ((recursiveText == null) || (recursiveText == '')) ? true : await this.Application.Solver.ResolveConditional(recursiveText);
        const resolveText: string = functionParsed.Parameters.length > 4 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[4]) : null;
        const resolve: boolean = ((resolveText == null) || (resolveText == '')) ? true : await this.Application.Solver.ResolveConditional(resolveText);
        const value: string = functionParsed.Parameters[1];
        const dataSource: any = resolve ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, value, true, recursive) : value;
        const data: any = this.Application.Solver.Clone(dataSource, true);
        const notifyText: string = functionParsed.Parameters[2];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.UpdateData(dataKey, sector, data, notify);
        return ('');
    }

    private async ExecuteFunctionReloadData(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        const notifyText: string = functionParsed.Parameters[1];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.ReloadData(dataKey, sector, notify);
        return ('');
    }

    private async ExecuteFunctionFilterData(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        if (functionParsed.Parameters.length < 3)
            return ('');
        const forText: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const ifText: string = functionParsed.Parameters[1];
        const dataKeyDestination: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]);
        const notifyText: string = functionParsed.Parameters[3];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        const hasIfText: boolean = (ifText != null);
        const parsedFor: string[] = this.Application.Parser.ParseFor(forText);
        if (parsedFor == null)
            return ('');
        const context: DrapoContext = new DrapoContext();
        //data item
        const key: string = parsedFor[0];
        //Iterable
        const dataKeyIteratorRange = parsedFor[2];
        const range: DrapoRange = this.Application.ControlFlow.GetIteratorRange(dataKeyIteratorRange);
        const dataKeyIterator: string = range == null ? dataKeyIteratorRange : this.Application.ControlFlow.CleanIteratorRange(dataKeyIteratorRange);
        const dataKey: string = dataKeyIterator;
        const dataKeyIteratorParts: string[] = this.Application.Parser.ParseForIterable(dataKeyIterator);
        const dataItem: DrapoStorageItem = await this.Application.Storage.Retrieve(dataKey, sector, context, dataKeyIteratorParts);
        if (dataItem == null)
            return ('');
        const datasFiltered: any[] = [];
        let datas: any[] = dataItem.Data;
        if (datas == null)
            return ('');
        if (!datas.length)
            datas = this.Application.Solver.TransformObjectIntoArray(datas);
        //Apply Range
        if (range !== null)
            datas = this.Application.ControlFlow.ApplyRange(datas, range);
        if ((datas.length !== null) && (datas.length === 0))
            return ('');
        for (let j: number = 0; j < datas.length; j++) {
            const data: any = datas[j];
            const item: DrapoContextItem = context.Create(data, null, null, dataKey, key, null, j);
            if (hasIfText) {
                const conditional: boolean = await this.Application.Solver.ResolveConditional(ifText, null, sector, context);
                if (!conditional) {
                    context.Pop();
                    continue;
                }
            }
            datasFiltered.push(data);
        }
        await this.Application.Storage.UpdateData(dataKeyDestination, sector, datasFiltered, notify);
        return ('');
    }

    private async ExecuteFunctionHasDataChanges(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        let parameterSector: string = functionParsed.Parameters.length <= 0 ? null : await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        if (parameterSector === '=')
            parameterSector = sector;
        const parameterDataKeyOrDataGroup: string = functionParsed.Parameters.length <= 1 ? null : await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const storageItems: DrapoStorageItem[] = this.Application.Storage.RetrieveStorageItemsCached(parameterSector, parameterDataKeyOrDataGroup);
        for (let i: number = 0; i < storageItems.length; i++) {
            const storageItem: DrapoStorageItem = storageItems[i];
            if (storageItem.HasChanges)
                return ('true');
        }
        return ('false');
    }

    private async ExecuteFunctionAcceptDataChanges(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        let parameterSector: string = functionParsed.Parameters.length <= 0 ? null : await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        if (parameterSector === '=')
            parameterSector = sector;
        const parameterDataKeyOrDataGroup: string = functionParsed.Parameters.length <= 1 ? null : await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const storageItems: DrapoStorageItem[] = this.Application.Storage.RetrieveStorageItemsCached(parameterSector, parameterDataKeyOrDataGroup);
        for (let i: number = 0; i < storageItems.length; i++) {
            const storageItem: DrapoStorageItem = storageItems[i];
            if (storageItem.HasChanges)
                storageItem.HasChanges = false;
        }
        return ('');
    }

    private async ExecuteFunctionPostData(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        let dataKeyResponse: string = functionParsed.Parameters[1];
        if (dataKeyResponse == null)
            dataKeyResponse = dataKey;
        const notifyText: string = functionParsed.Parameters[2];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.PostData(dataKey, sector, dataKeyResponse, notify, executionContext);
        return ('');
    }

    private async ExecuteFunctionPostDataItem(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = functionParsed.Parameters[0];
        let dataKeyResponse: string = functionParsed.Parameters[1];
        if (dataKeyResponse == null)
            dataKeyResponse = dataKey;
        const notifyText: string = functionParsed.Parameters[2];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.PostDataItem(dataKey, sector, dataKeyResponse, notify, executionContext);
        return ('');
    }

    private ExecuteFunctionReloadPage(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction): string {
        window.location.reload();
        return ('');
    }

    private ExecuteFunctionClosePage(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction): string {
        window.location.href = "about:blank";
        return ('');
    }

    private async ExecuteFunctionRedirectPage(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const url: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const urlResolved: string = this.Application.Server.ResolveUrl(url);
        window.location.href = urlResolved;
        return ('');
    }

    private async ExecuteFunctionUpdateURL(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const url: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        await this.Application.Router.UpdateURL(url);
        return ('');
    }

    private async ExecuteFunctionUpdateToken(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const token: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        await this.Application.Server.SetToken(token);
        return ('');
    }

    private async ExecuteFunctionClearToken(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        await this.Application.Server.SetToken(null);
        return ('');
    }

    private ExecuteFunctionHasToken(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): string {
        return (this.Application.Server.HasToken().toString());
    }

    private async ExecuteFunctionUpdateTokenAntiforgery(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const token: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        await this.Application.Server.SetTokenAntiforgery(token);
        return ('');
    }

    private async ExecuteFunctionDestroyContainer(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const itemText: string = functionParsed.Parameters[0];
        let containerCode: string = null;
        if (this.Application.Parser.IsMustache(itemText)) {
            const dataPath: string[] = this.Application.Parser.ParseMustache(itemText);
            containerCode = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath);
        } else {
            containerCode = itemText;
        }
        this.Application.SectorContainerHandler.RemoveByContainer(containerCode);
        return ('');
    }

    private async ExecuteFunctionIf(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const conditional: string = functionParsed.Parameters[0];
        const context: DrapoContext = new DrapoContext(contextItem);
        const conditionalResult: boolean = await this.Application.Solver.ResolveConditional(conditional, element, sector, context, null, null, executionContext, false);
        if (conditionalResult) {
            const statementTrue: string = functionParsed.Parameters[1];
            await this.ResolveFunctionContext(sector, contextItem, element, event, statementTrue, executionContext);
        } else if (functionParsed.Parameters.length > 2) {
            const statementFalse: string = functionParsed.Parameters[2];
            await this.ResolveFunctionContext(sector, contextItem, element, event, statementFalse, executionContext);
        }
        return ('');
    }

    private async ExecuteFunctionAsync(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const content: string = functionParsed.Parameters[0];
        const executionContextContent: DrapoExecutionContext<any> = this.CreateExecutionContext(false);
        // tslint:disable-next-line:no-floating-promises
        this.ResolveFunctionContext(sector, contextItem, element, event, content, executionContextContent);
        return ('');
    }

    private async ExecuteFunctionNotify(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const dataIndex: number = this.Application.Parser.GetStringAsNumber(await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]));
        const dataFields: string[] = await this.ResolveFunctionParameterDataFields(sector, contextItem, element, functionParsed.Parameters[2], executionContext);
        const canUseDifferenceText: string = functionParsed.Parameters.length > 3 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
        const canUseDifference: boolean = ((canUseDifferenceText == null) || (canUseDifferenceText == '')) ? true : await this.Application.Solver.ResolveConditional(canUseDifferenceText);
        await this.Application.Observer.Notify(dataKey, dataIndex, dataFields, canUseDifference);
        return ('');
    }

    private async ExecuteFunctionFocus(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const did: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        if ((did === null) || (did === '') || (did === undefined)) {
            const elementFocused: HTMLElement = document.activeElement as HTMLElement;
            elementFocused.blur();
            return ('');
        }
        const elDid: HTMLElement = this.Application.Searcher.FindLastByAttributeAndValue('d-id', did);
        if (elDid === null)
            return ('');
        const isSelectText: string = functionParsed.Parameters[1];
        const isSelect: boolean = ((isSelectText == null) || (isSelectText == '')) ? true : await this.Application.Solver.ResolveConditional(isSelectText);
        elDid.focus();
        if (isSelect)
            this.Application.Document.Select(elDid);
        return ('');
    }

    private async ExecuteFunctionShowWindow(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const windowParameters: [string, string][] = [];
        let windowNameOrUri: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const isUri = this.Application.Parser.IsUri(windowNameOrUri);
        if (isUri)
            windowNameOrUri = await this.Application.Storage.ResolveDataUrlMustaches(null, sector, windowNameOrUri, executionContext);
        const did: string = isUri ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : null;
        for (let i: number = isUri ? 2 : 1; i < functionParsed.Parameters.length - 1; i = i + 2) {
            const windowParameter: [string, string] = [null, null];
            //We need to resolve the context only when needed here.
            windowParameter[0] = contextItem != null ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i]) : functionParsed.Parameters[i];
            windowParameter[1] = contextItem != null ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i + 1]) : functionParsed.Parameters[i + 1];
            windowParameters.push(windowParameter);
        }
        if (isUri)
            await this.Application.WindowHandler.CreateAndShowWindow(windowNameOrUri, did, windowParameters);
        else
            await this.Application.WindowHandler.CreateAndShowWindowDefinition(windowNameOrUri, windowParameters);
        return ('');
    }

    private async ExecuteFunctionCloseWindow(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const did: string = functionParsed.Parameters.length > 0 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0], false, true) : null;
        if ((did === '') && (functionParsed.Parameters.length > 0) && (this.Application.Parser.HasFunction(functionParsed.Parameters[0])))
            return ('');
        const allText: string = functionParsed.Parameters.length > 1 ? functionParsed.Parameters[1] : 'false';
        const all: boolean = await this.Application.Solver.ResolveConditional(allText);
        const type: string = functionParsed.Parameters.length > 2 ? functionParsed.Parameters[2] : null;
        await this.Application.WindowHandler.CloseWindow(did, all, type);
        return ('');
    }

    private async ExecuteFunctionHideWindow(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const did: string = functionParsed.Parameters.length > 0 ? functionParsed.Parameters[0] : null;
        const allText: string = functionParsed.Parameters.length > 1 ? functionParsed.Parameters[1] : 'false';
        const all: boolean = await this.Application.Solver.ResolveConditional(allText);
        const type: string = functionParsed.Parameters.length > 2 ? functionParsed.Parameters[2] : null;
        const window: DrapoWindow = await this.Application.WindowHandler.HideWindow(did, all);
        if (window !== null) {
            if (type !== 'noclose')
                executionContext.AddWindowAutoClose(window);
        }
        return ('');
    }

    private async ExecuteFunctionGetWindow(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const window: DrapoWindow = this.Application.WindowHandler.GetWindowByElement(element);
        if (window !== null)
            return (window.Code);
        return ('');
    }

    private async ExecuteFunctionCreateGuid(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const value: string = this.Application.Document.CreateGuid();
        if (functionParsed.Parameters.length == 0)
            return (value);
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const dataField: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const notifyText: string = functionParsed.Parameters.length > 2 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]) : null;
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.SetDataKeyField(dataKey, sector, [dataField], value, notify);
        return ('');
    }

    private async ExecuteFunctionCreateTick(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const ticks: number = new Date().getTime();
        const value: string = ticks.toString();
        if (functionParsed.Parameters.length == 0)
            return (value);
        const mustacheText: string = functionParsed.Parameters[0];
        const mustache: string[] = this.Application.Parser.ParseMustache(mustacheText);
        const dataKey: string = this.Application.Solver.ResolveDataKey(mustache);
        const dataFields: string[] = this.Application.Solver.ResolveDataFields(mustache);
        const notifyText: string = functionParsed.Parameters.length > 1 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : null;
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, notify);
        return (value);
    }

    private async ExecuteFunctionGetDate(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const date: Date = new Date();
        //Return Type
        const returnType: string = functionParsed.Parameters.length > 0 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]) : 'date';
        if (returnType.toUpperCase() == 'ISO')
            return (date.toISOString());
        return (date as any);
    }

    private async ExecuteFunctionAddDate(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        //Date
        const dateParameter: any = functionParsed.Parameters.length > 0 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]) : null;
        const dateParameterParsed: Date = this.Application.Parser.ParseDateCulture(dateParameter);
        const date: Date = (dateParameterParsed != null) ? dateParameterParsed : new Date();
        //Type
        const typeParameter: string = functionParsed.Parameters.length > 1 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : 'day';
        const type: string = typeParameter != null ? typeParameter : 'day';
        //Increment
        const incrementParameter: string = functionParsed.Parameters.length > 2 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[2]) : '1';
        const increment: number = this.Application.Parser.ParseNumber(incrementParameter, 1);
        if (type === 'day')
            date.setDate(date.getDate() + increment);
        else if (type === 'month')
            date.setMonth(date.getMonth() + increment);
        if (type === 'year')
            date.setFullYear(date.getFullYear() + increment);
        //Return Type
        const returnType: string = functionParsed.Parameters.length > 3 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : 'date';
        if (returnType.toUpperCase() == 'ISO')
            return (date.toISOString());
        return (date as any);
    }

    private async ExecuteFunctionPushStack(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const value: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        executionContext.Stack.Push(value);
        return ('');
    }

    private async ExecuteFunctionPopStack(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const value: any = executionContext.Stack.Pop();
        if (functionParsed.Parameters.length == 0)
            return (value);
        const mustacheText: string = functionParsed.Parameters[0];
        const mustache: string[] = this.Application.Parser.ParseMustache(mustacheText);
        const dataKey: string = this.Application.Solver.ResolveDataKey(mustache);
        const dataFields: string[] = this.Application.Solver.ResolveDataFields(mustache);
        const notifyText: string = functionParsed.Parameters.length > 1 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : null;
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, notify);
        return (value);
    }

    private async ExecuteFunctionPeekStack(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const value: any = executionContext.Stack.Peek();
        if (functionParsed.Parameters.length == 0)
            return (value);
        const mustacheText: string = functionParsed.Parameters[0];
        const mustache: string[] = this.Application.Parser.ParseMustache(mustacheText);
        const dataKey: string = this.Application.Solver.ResolveDataKey(mustache);
        const dataFields: string[] = this.Application.Solver.ResolveDataFields(mustache);
        const notifyText: string = functionParsed.Parameters.length > 1 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : null;
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Storage.SetDataKeyField(dataKey, sector, dataFields, value, notify);
        return (value);
    }

    private async ExecuteFunctionExecute(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const sectorFunction = functionParsed.Parameters.length > 1 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : sector;
        const valueFunction = await this.ResolveFunctionParameter(sectorFunction, contextItem, element, executionContext, functionParsed.Parameters[0]);
        await this.ResolveFunctionContext(sectorFunction, contextItem, element, event, valueFunction, executionContext);
        return ('');
    }

    private async ExecuteFunctionExecuteDataItem(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const expression: string = functionParsed.Parameters[0];
        const forText: string = await functionParsed.Parameters[1];
        const ifText: string = functionParsed.Parameters.length > 2 ? functionParsed.Parameters[2] : null;
        const hasIfText: boolean = (ifText != null);
        const allText: string = functionParsed.Parameters.length > 3 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[3]) : null;
        const all: boolean = ((allText == null) || (allText == '')) ? !hasIfText : await this.Application.Solver.ResolveConditional(allText);
        const parsedFor: string[] = this.Application.Parser.ParseFor(forText);
        if (parsedFor == null)
            return ('');
        const forHierarchyText: string = await functionParsed.Parameters[4];
        const context: DrapoContext = new DrapoContext();
        //data item
        const key: string = parsedFor[0];
        //Iterable
        const dataKeyIteratorRange = parsedFor[2];
        const range: DrapoRange = this.Application.ControlFlow.GetIteratorRange(dataKeyIteratorRange);
        const dataKeyIterator: string = range == null ? dataKeyIteratorRange : this.Application.ControlFlow.CleanIteratorRange(dataKeyIteratorRange);
        const dataKeyIteratorParts: string[] = this.Application.Parser.ParseForIterable(dataKeyIterator);
        const dataKey: string = dataKeyIteratorParts[0];
        const dataItem: DrapoStorageItem = await this.Application.Storage.Retrieve(dataKey, sector, context, dataKeyIteratorParts);
        if (dataItem == null)
            return ('');
        let datas: any[] = (dataKeyIteratorParts.length > 1) ? this.Application.Solver.ResolveDataObjectPathObject(dataItem.Data, dataKeyIteratorParts) : dataItem.Data;
        if (datas == null)
            return ('');
        if (!datas.length)
            datas = this.Application.Solver.TransformObjectIntoArray(datas);
        //Apply Range
        if (range !== null)
            datas = this.Application.ControlFlow.ApplyRange(datas, range);
        if ((datas.length !== null) && (datas.length === 0))
            return ('');
        const ifTextResolved: string = this.ResolveExecutionContextMustache(sector, executionContext, ifText);
        await this.Application.ControlFlow.ExecuteDataItem(sector, context, expression, dataKeyIterator, forHierarchyText, ifTextResolved, all, datas, dataKey, key, executionContext);
        return ('');
    }

    private async ExecuteFunctionExecuteComponentFunction(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const did: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        if (did == null)
            return ('');
        const instance: any = this.Application.ComponentHandler.GetComponentInstance(sector, did);
        if (instance == null)
            return ('');
        const functionName: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const instanceFunction = (instance as any)[functionName];
        if (instanceFunction == null)
            return ('');
        const parameters: any[] = [];
        for (let i: number = 2; i < functionParsed.Parameters.length; i++)
            parameters.push(await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i]));
        const result: any = instanceFunction.apply(instance, parameters);
        if (Promise.resolve(result) == result) {
            const resultPromise: Promise<any> = result;
            await resultPromise;
            return ('');
        }
        return ('');
    }

    private async ExecuteFunctionExecuteInstanceFunction(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const instanceSectorParameter: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const instanceSector: string = ((instanceSectorParameter == null) || (instanceSectorParameter == '')) ? sector : instanceSectorParameter;
        const instance: any = this.Application.ComponentHandler.GetComponentInstance(instanceSector);
        if (instance == null)
            return ('');
        const functionName: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const instanceFunction = (instance as any)[functionName];
        if (instanceFunction == null)
            return ('');
        const parameters: any[] = [];
        for (let i: number = 3; i < functionParsed.Parameters.length; i++)
            parameters.push(await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i]));
        const result: any = instanceFunction.apply(instance, parameters);
        let value: any = result;
        if (Promise.resolve(result) == result) {
            const resultPromise: Promise<any> = result;
            value = await resultPromise;
        }
        const mustacheReturn: string = functionParsed.Parameters[2];
        if ((mustacheReturn !== null) && (mustacheReturn !== ''))
        {
            const dataPath: string[] = this.Application.Parser.ParseMustache(mustacheReturn);
            if (dataPath.length === 1)
                await this.Application.Storage.UpdateData(dataPath[0], sector, value, true);
            else
                await this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, value, true);
        }
        return ('');
    }

    private async ExecuteFunctionCast(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<any> {
        const context: DrapoContext = contextItem != null ? contextItem.Context : new DrapoContext();
        const value: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, executionContext, functionParsed.Parameters[0], null, false);
        const type: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        if (type === 'number')
            return (this.Application.Parser.ParseNumberBlock(value));
        return (value);
    }

    private async ExecuteFunctionEncodeUrl(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<any> {
        const context: DrapoContext = contextItem != null ? contextItem.Context : new DrapoContext();
        const value: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, executionContext, functionParsed.Parameters[0], null, false);
        const valueEncoded: string = this.Application.Server.EnsureUrlComponentEncoded(value);
        return (valueEncoded);
    }

    private async ExecuteFunctionAddRequestHeader(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<any> {
        const context: DrapoContext = new DrapoContext();
        const name: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const value: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        this.Application.Server.AddNextRequestHeader(name, value);
        return ('');
    }

    private async ExecuteFunctionSetClipboard(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const value: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        await this.Application.Document.SetClipboard(value);
        return ('');
    }

    private async ExecuteFunctionCreateTimer(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const content: string = functionParsed.Parameters[0];
        const time: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const loopText: string = functionParsed.Parameters[2];
        const loop: boolean = ((loopText == null) || (loopText == '')) ? false : await this.Application.Solver.ResolveConditional(loopText);
        const timeAsNumber: number = this.Application.Parser.ParseNumber(time, 0);
        const executionContextContent: DrapoExecutionContext<any> = this.CreateExecutionContext(false);
        const timerFunction: Function = () => {
            // tslint:disable-next-line:no-floating-promises
            this.ResolveFunctionContext(sector, contextItem, element, event, content, executionContextContent);
            if (loop)
                setTimeout(timerFunction, timeAsNumber);
        };
        setTimeout(timerFunction, timeAsNumber);
        return ('');
    }

    private async ExecuteFunctionCreateReference(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const value: string = functionParsed.Parameters[0];
        const mustacheReference: string = await this.Application.Solver.CreateMustacheReference(sector, contextItem, value);
        return (mustacheReference);
    }

    private async ExecuteFunctionWait(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const time: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const timeAsNumber: number = this.Application.Parser.ParseNumber(time, 0);
        await this.Application.Document.Sleep(timeAsNumber);
        return ('');
    }

    private async ExecuteFunctionDownloadData(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKeyFile: string = functionParsed.Parameters[0];
        const storageItem: DrapoStorageItem = await this.Application.Storage.RetrieveDataItemContext(dataKeyFile, sector, executionContext);
        if (storageItem === null)
            return ('');
        const namePath: string[] = this.Application.Solver.CreateDataPath(dataKeyFile, ['filename']);
        const name: any = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, namePath, true);
        const dataPath: string[] = this.Application.Solver.CreateDataPath(dataKeyFile, ['body']);
        const data: any = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, dataPath, true);
        const contentTypePath: string[] = this.Application.Solver.CreateDataPath(dataKeyFile, ['contenttype']);
        const contentType: any = await this.Application.Solver.ResolveItemDataPathObject(sector, contextItem, contentTypePath, true);
        this.DownloadData(name, data, contentType);
        return ('');
    }

    private DownloadData(name: string, data: any, contentType: string): void {
        const blob = this.CreateBlob(data, contentType);
        const navigator: any = window.navigator as any;
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, name);
        } else {
            const elDownloader = document.createElement('a');
            elDownloader.href = window.URL.createObjectURL(blob);
            elDownloader.download = name;
            elDownloader.style.display = 'none';
            document.body.appendChild(elDownloader);
            elDownloader.click();
            document.body.removeChild(elDownloader);
        }
    }

    private CreateBlob(data: any, contentType: string) : Blob
    {
        if (data instanceof Blob)
            return (data);
        const dataCharacters = atob(data);
        const dataBytes = new Array(dataCharacters.length);
        for (let i = 0; i < dataCharacters.length; i++) {
            dataBytes[i] = dataCharacters.charCodeAt(i);
        }
        const bytes = new Uint8Array(dataBytes);
        const blob = new Blob([bytes], { type: contentType });
        return (blob);
    }

    private async ExecuteFunctionDetectView(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const views: DrapoView[] = await this.Application.Config.GetViews();
        if (views == null)
            return ('');
        const context: DrapoContext = new DrapoContext();
        for (let i: number = 0; i < views.length; i++) {
            const view: DrapoView = views[i];
            if (view.Condition == null)
                return (view.Tag);
            if (await this.Application.Solver.ResolveConditional(view.Condition, null, sector, context))
                return (view.Tag);
        }
        return ('');
    }

    private async ExecuteFunctionSetConfig(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const key: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const value: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]);
        const valueAsNumber: number = this.Application.Parser.ParseNumber(value, 0);
        const keyLower: string = key.toLowerCase();
        if (keyLower === 'timezone')
            this.Application.Config.SetTimezone(valueAsNumber);
        return ('');
    }

    private async ExecuteFunctionGetConfig(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const key: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const keyLower: string = key.toLowerCase();
        if (keyLower === 'timezone') {
            const timeZone: number = this.Application.Config.GetTimezone();
            if (timeZone != null)
                return (timeZone.toString());
        }
        return ('');
    }

    private async ExecuteFunctionLockPlumber(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        this.Application.Plumber.Lock();
        return ('');
    }

    private async ExecuteFunctionUnlockPlumber(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        await this.Application.Plumber.Unlock();
        return ('');
    }

    private async ExecuteFunctionLockData(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        this.Application.Observer.Lock(dataKey);
        return ('');
    }

    private async ExecuteFunctionUnlockData(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataKey: string = await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[0]);
        const notifyText: string = functionParsed.Parameters.length > 1 ? await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[1]) : null;
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        await this.Application.Observer.Unlock(dataKey, notify);
        return ('');
    }

    private async ExecuteFunctionClearPlumber(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        await this.Application.Plumber.Clear();
        return ('');
    }

    private async ExecuteFunctionDebugger(sector: string, contextItem: DrapoContextItem, element: HTMLElement, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const parameters: string[] = [];
        for (let i: number = 0; i < functionParsed.Parameters.length; i++)
            parameters.push(await this.ResolveFunctionParameter(sector, contextItem, element, executionContext, functionParsed.Parameters[i], true, true, true));
        await this.Application.Debugger.ExecuteFunctionDebugger(parameters);
        return ('');
    }

    private async ExecuteFunctionGetSector(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        return (this.Application.Document.GetSector(element as HTMLElement));
    }

    private async ExecuteFunctionGetClipboard(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const dataPath: string[] = this.Application.Parser.ParseMustache(functionParsed.Parameters[0]);
        const notifyText: string = functionParsed.Parameters[1];
        const notify: boolean = ((notifyText == null) || (notifyText == '')) ? true : await this.Application.Solver.ResolveConditional(notifyText);
        const value: string = await this.Application.Document.GetClipboard();
        await this.Application.Solver.UpdateItemDataPathObject(sector, contextItem, executionContext, dataPath, value, notify);
        return ('');
    }

    private async ExecuteFunctionExecuteValidation(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const validation: string = functionParsed.Parameters[0];
        const isValid : boolean = await this.Application.Validator.IsValidationExpressionValid(element as HTMLElement, sector, validation, contextItem);
        return (isValid ? 'true' : 'false');
    }

    private async ExecuteFunctionClearValidation(sector: string, contextItem: DrapoContextItem, element: Element, event: Event, functionParsed: DrapoFunction, executionContext: DrapoExecutionContext<any>): Promise<string> {
        const validation: string = functionParsed.Parameters[0];
        await this.Application.Validator.UncheckValidationExpression(element as HTMLElement, sector, validation, contextItem);
        return ('');
    }

    public async HasFunctionMustacheContext(functionsValue: string, sector: string, renderContext: DrapoRenderContext): Promise<boolean> {
        let hasContext: boolean = renderContext.HasExpressionContext(sector, functionsValue);
        if (hasContext !== null)
            return (hasContext);
        hasContext = await this.HasFunctionMustacheContextInternal(functionsValue, sector);
        renderContext.AddExpressionContext(sector, functionsValue, hasContext);
        return (hasContext);
    }

    private async HasFunctionMustacheContextInternal(functionsValue: string, sector: string): Promise<boolean> {
        if (this.HasFunctionsContext(functionsValue))
            return (true);
        if (!this.Application.Parser.IsMustache(functionsValue))
            return (this.Application.Barber.HasMustacheContext(functionsValue, sector));
        const mustaches = this.Application.Parser.ParseMustaches(functionsValue);
        for (let j = 0; j < mustaches.length; j++) {
            const mustache = mustaches[j];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
            const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            if (!this.Application.Storage.IsDataKey(dataKey, null))
                return (true);
            const value: string = this.Application.Storage.GetDataKeyField(dataKey, sector, mustacheParts);
            if (value == null) {
                await this.Application.ExceptionHandler.HandleError('DrapoFunctionHandler - HasFunctionMustacheContext - Null Mustache - {0}', mustache);
                return (false);
            }
            if (await this.HasFunctionMustacheContextInternal(value, sector))
                return (true);
        }
        return (false);
    }

    private HasFunctionsContext(functionsValue: string): boolean {
        //TODO: We need to make this method recursive. This way will check only the first level
        const functionsParsed: string[] = this.Application.Parser.ParseFunctions(functionsValue);
        for (let i = 0; i < functionsParsed.length; i++) {
            const functionParse: string = functionsParsed[i];
            const functionParsed: DrapoFunction = this.Application.Parser.ParseFunction(functionParse);
            if (functionParsed === null)
                continue;
            if (this.IsFunctionContext(functionParsed))
                return (true);
        }
        return (false);
    }

    private GetFunctionsContext(): string[] {
        const functions: string[] = [];
        functions.push('removedataitem');
        return (functions);
    }

    private IsFunctionContext(functionParsed: DrapoFunction): boolean {
        const functions: string[] = this.GetFunctionsContext();
        if (this.Application.Solver.Contains(functions, functionParsed.Name))
            return (true);
        return (false);
    }
}
