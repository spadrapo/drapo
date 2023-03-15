class DrapoClassHandler {
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

    public HasContentClassContext(content : string) : boolean
    {
        return (content.indexOf('d-class') > -1);
    }

    public async ResolveClass(el: HTMLElement, sector: string, canBind: boolean = true, canSubscribeDelay: boolean = true, dataKeyFilter: string = null, dataFieldFilter: string = null, type: DrapoStorageLinkType = DrapoStorageLinkType.Render): Promise<void> {
        const dClassMustache: string = el.getAttribute('d-class');
        if (dClassMustache == null)
            return;
        if (this.Application.Barber.HasMustacheContext(dClassMustache, sector))
            return;
        const context: DrapoContext = new DrapoContext();
        const dClass: string = this.Application.Parser.IsMustacheOnly(dClassMustache) ? await this.Application.Barber.ResolveControlFlowMustacheString(context, null, null, dClassMustache, el, sector, canBind) : dClassMustache;
        if (this.Application.Barber.HasMustacheContext(dClass, sector))
            return;
        const classesExpressions: [string, string, string][] = this.ExtractClasses(dClass);
        for (let i = 0; i < classesExpressions.length; i++) {
            const classExpression: [string, string, string] = classesExpressions[i];
            const classMustachesTrue: string = classExpression[0];
            const classTrue: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, classMustachesTrue, el, canBind, type);
            const classFalse: string = classExpression[2] != null ? await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, classExpression[2], el, canBind, type) : null;
            const expressionMustaches: string = classExpression[1];
            const expressionCurrent: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, null, expressionMustaches, el, canBind, type);
            const addClass: boolean = await this.Application.Solver.ResolveConditional(expressionCurrent);
            if (addClass) {
                el.classList.add(classTrue);
                if (classFalse != null)
                    el.classList.remove(classFalse);
            } else {
                el.classList.remove(classTrue);
                if (classFalse != null)
                    el.classList.add(classFalse);
            }
        }
     }

    public async ResolveClassContext(context: DrapoContext, renderContext: DrapoRenderContext, el: HTMLElement, sector: string, canBind: boolean, type: DrapoStorageLinkType = DrapoStorageLinkType.Render): Promise<boolean> {
        const dClassMustache: string = el.getAttribute('d-class');
        if (dClassMustache == null)
            return;
        const dClass: string = this.Application.Parser.IsMustacheOnly(dClassMustache) ? await this.Application.Barber.ResolveControlFlowMustacheString(context, renderContext, null, dClassMustache, el, sector, canBind) : dClassMustache;
        const classesExpressions: [string, string, string][] = this.ExtractClasses(dClass);
        for (let i = 0; i < classesExpressions.length; i++)
        {
            const classExpression: [string, string, string] = classesExpressions[i];
            const classMustachesTrue: string = classExpression[0];
            const classTrue: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, renderContext, null, classMustachesTrue, el, canBind, type);
            const classFalse: string = classExpression[2] != null ? await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, renderContext, null, classExpression[2], el, canBind, type) : null;
            const expressionMustaches: string = classExpression[1];
            const expressionCurrent: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, renderContext, null, expressionMustaches, el, canBind, type);
            const addClass: boolean = await this.Application.Solver.ResolveConditional(expressionCurrent);
            if (addClass) {
                el.classList.add(classTrue);
                if (classFalse != null)
                    el.classList.remove(classFalse);
            } else {
                el.classList.remove(classTrue);
                if (classFalse != null)
                    el.classList.add(classFalse);
            }
        }
    }

    private ExtractClasses(dClass: string): [string, string, string][] {
        const classes: [string, string, string][] = [];
        if (!this.Application.Parser.IsClassArray(dClass))
            return (classes);
        const parsedClasses: string[] = this.Application.Parser.ParseClassArray(dClass);
        for (let i = 0; i < parsedClasses.length; i++)
        {
            const parsedClass: string = parsedClasses[i];
            const parseClass = this.Application.Parser.ParseClass(parsedClass);
            if (parseClass != null)
                classes.push(parseClass);
        }
        return (classes);
    }
}