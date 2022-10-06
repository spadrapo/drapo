class DrapoAttributeHandler {
    // Field
    private _application: DrapoApplication;

    // Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    // Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public HasContentIDContext(content: string): boolean {
        return (content.indexOf('d-id') > -1);
    }

    public HasContentAttributeContext(content: string): boolean {
        return (content.indexOf('d-attr') > -1);
    }

    public async ResolveAttr(el: HTMLElement, canBind: boolean = true, canSubscribeDelay: boolean = true, dataKeyFilter: string = null, dataFieldFilter: string = null): Promise<void> {
        const attributes: [string, string, string, string][] = this.ExtractAttr(el);
        if (attributes.length == 0)
            return;
        const sector: string = this.Application.Document.GetSector(el);
        const context: DrapoContext = new DrapoContext();
        for (let i = 0; i < attributes.length; i++) {
            const attribute: [string, string, string, string] = attributes[i];
            const attributeName: string = attribute[0];
            let attributeValue: string = attribute[1];
            if (this.Application.Barber.HasMustacheContext(attributeValue, sector))
                continue;
            const attributeType: string = attribute[2];
            const format: string = attribute[3];
            const formatResolved: string = format == null ? null : await this.Application.ModelHandler.ResolveValueExpression(context, el, sector, format, false);
            const attributeValueOriginal: string = attributeValue;
            attributeValue = await this.Application.ModelHandler.ResolveValueExpression(context, el, sector, attributeValue, canBind);
            attributeValue = this.ResolveConversionAttributeValue(attributeName, attributeValue, formatResolved);
            if (attributeValue === attributeValueOriginal)
                continue;
            if (attributeType == null) {
                //Normal
                el.setAttribute(attributeName, attributeValue);
            } else if (attributeType === 'min') {
                //Minimization
                const isValid: boolean = await this.Application.Solver.ResolveConditional(attributeValue);
                if (isValid)
                    el.setAttribute(attributeName, '');
                else
                    el.removeAttribute(attributeName);
            }
        }
    }

    public async ResolveAttrContext(context: DrapoContext, el: HTMLElement, elj: JQuery, canBind: boolean): Promise<void> {
        const attributes: [string, string, string, string][] = this.ExtractAttr(el);
        if (attributes.length == 0)
            return;
        const sector: string = this.Application.Document.GetSector(el);
        for (let i: number = 0; i < attributes.length; i++) {
            const attribute: [string, string, string, string] = attributes[i];
            const attributeName: string = attribute[0];
            let attributeValue: string = attribute[1];
            const attributeType: string = attribute[2];
            const format: string = attribute[3];
            const formatResolved: string = format == null ? null : await this.Application.ModelHandler.ResolveValueExpression(context, el, sector, format, false);
            const attributeValueOriginal: string = attributeValue;
            attributeValue = await this.Application.ModelHandler.ResolveValueExpression(context, el, sector, attributeValue, canBind);
            attributeValue = this.ResolveConversionAttributeValue(attributeName, attributeValue, formatResolved);
            if (context.CanUpdateTemplate) {
                const attributeNameFull: string = 'd-attr-' + attributeName + (attributeType != null ? ('-' + attributeType) : '');
                if (this.Application.Parser.HasMustache(attributeValue)) {
                    el.setAttribute(attributeNameFull, attributeValue);
                    continue;
                }
                elj.removeAttr(attributeNameFull);
            }
            if (attributeValue === attributeValueOriginal)
                continue;
            if (attributeType == null) {
                //Normal
                el.setAttribute(attributeName, attributeValue);
            } else if (attributeType === 'min') {
                //Minimization
                const isValid: boolean = await this.Application.Solver.ResolveConditional(attributeValue);
                if (isValid)
                    el.setAttribute(attributeName, '');
                else
                    el.removeAttribute(attributeName);
            }
        }
    }

    private async ResolveContextValue(context: DrapoContext, el: HTMLElement, elj: JQuery, sector: string, isContext: boolean, value: string, canBind: boolean, canSubscribeDelay: boolean = false, dataKeyFilter: string = null, dataFieldFilter: string = null): Promise<string> {
        const valueOriginal: string = value;
        const mustaches: string[] = this.Application.Parser.ParseMustaches(value);
        for (let j: number = 0; j < mustaches.length; j++) {
            const mustache: string = mustaches[j];
            const mustacheParts: string[] = this.Application.Parser.ParseMustache(mustache);
            const dataKey: string = this.Application.Solver.ResolveDataKey(mustacheParts);
            if ((dataKeyFilter != null) && (dataKey != dataKeyFilter))
                continue;
            const isDataKeyContext = !this.Application.Storage.IsDataKey(dataKey, sector);
            if (isDataKeyContext !== isContext)
                continue;
            if ((context !== null) && (!context.CanResolve(dataKey)))
                continue;
            const dataFields: string[] = this.Application.Solver.ResolveDataFields(mustacheParts);
            if ((dataFieldFilter != null) && (dataFields[0] != dataFieldFilter))
                continue;
            if ((isContext) || (await this.Application.Storage.EnsureDataKeyFieldReady(dataKey, sector, mustacheParts))) {
                let contextCurrent: DrapoContext = context;
                if (contextCurrent === null) {
                    contextCurrent = new DrapoContext();
                    const data: any = await this.Application.Storage.RetrieveData(dataKey, sector);
                    contextCurrent.Create(data, el, null, dataKey, dataKey, null, null);
                }
                const valueNew: string = await this.Application.Solver.ResolveDataPath(contextCurrent, elj, sector, mustacheParts, canBind);
                value = value.replace(mustache, valueNew);
            } else if (canSubscribeDelay) {
                this.Application.Observer.SubscribeDelay(el, dataKey, dataFields);
            }
        }
        if (valueOriginal !== value)
            return (await this.ResolveContextValue(context, el, elj, sector, isContext, value, canBind, canSubscribeDelay, null, null));
        return (value);
    }

    private ExtractAttr(el: HTMLElement): [string, string, string, string][] {
        const attributes: [string, string, string, string][] = [];
        for (let i: number = 0; i < el.attributes.length; i++) {
            const attribute: Attr = el.attributes[i];
            const attributeProperty : [string,string] = this.Application.AttributeHandler.ExtractAttrProperty(attribute.nodeName);
            if (attributeProperty == null)
                continue;
            const format: string = el.getAttribute('d-attr-' + attributeProperty[0] + "-format");
            attributes.push([attributeProperty[0], attribute.nodeValue, attributeProperty[1], format]);
        }
        return (attributes);
    }

    private ExtractAttrProperty(property: string): [string,string] {
        const parse: string[] = this.Application.Parser.ParseProperty(property);
        if (parse.length < 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'attr')
            return (null);
        const name: string = parse[2];
        const type: string = parse.length > 3 ? parse[3] : null;
        if (type === 'format')
            return (null);
        return ([name, type]);
    }

    public async ResolveID(el: HTMLElement, sector: string, canBind: boolean = true, canSubscribeDelay: boolean = true, dataKeyFilter: string = null, dataFieldFilter: string = null): Promise<void> {
        const elj: JQuery = $(el);
        const did: string = el.getAttribute('d-id');
        if (did == null)
            return;
        if (this.Application.Barber.HasMustacheContext(did, sector))
            return;
        const context: DrapoContext = new DrapoContext();
        const expressionCurrent: string = await this.Application.Barber.ResolveControlFlowMustacheString(context, null, did, elj, sector, canBind);
        if (did !== expressionCurrent)
            el.setAttribute('d-id', expressionCurrent);
    }

    public async ResolveIDContext(context: DrapoContext, el: HTMLElement, elj: JQuery, sector: string, canBind: boolean): Promise<boolean> {
        const did: string = el.getAttribute('d-id');
        if (did == null)
            return;
        const expressionCurrent: string = await this.Application.Barber.ResolveControlFlowMustacheString(context, null, did, elj, sector, canBind);
        if (did !== expressionCurrent)
            el.setAttribute('d-id', expressionCurrent);
    }

    private ResolveConversionAttributeValue(name : string, value: string, format: string) : string
    {
        if (name === 'src')
            return (this.ResolveConversionAttributeSourceValue(value));
        if (format != null)
            value = this.Application.Formatter.Format(value, format);
        return (value);
    }

    private ResolveConversionAttributeSourceValue(value: string): string {
        const url: string = this.Application.Server.ResolveUrl(value);
        const urlEncoded: string = this.Application.Server.EnsureUrlEncoded(url);
        return (urlEncoded);
    }
}
