class DrapoValidator {
    //Field
    private _application: DrapoApplication;
    private _sectors: string[] = [];
    private _sectorsValidationRuleIDs: string[][] = [];
    private _sectorsValidationRuleTypes: string[][] = [];
    private _sectorsValidationRuleValues: string[][] = [];
    private _sectorsValidationRuleTags: string[][] = [];
    private _sectorsValidationRuleContexts: DrapoContextItem[][] = [];
    private _sectorsValidationGroupGroups: string[][] = [];
    private _sectorsValidationGroupRules: string[][][] = [];
    private _sectorsValidationGroupContexts: DrapoContextItem[][][] = [];
    private _sectorsValidationInterfaceIDs: string[][] = [];
    private _sectorsValidationInterfaceElements: HTMLElement[][][] = [];
    private _sectorsValidationInterfaceContexts: DrapoContextItem[][][] = [];

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public HasContentValidation(content: string): boolean {
        return (content.indexOf('d-validation') > -1);
    }

    public UnloadSectorHierarchy(sector: string): void {
        const sectorChildren: string[] = this.Application.Document.GetSectorAndChildren(sector);
        for (let i: number = 0; i < sectorChildren.length; i++)
            this.UnloadSector(sectorChildren[i]);
    }

    public UnloadSector(sector: string): void {
        const index: number = this.GetSectorIndex(sector);
        if (index === null)
            return;
        this._sectors.splice(index, 1);
        this._sectorsValidationRuleIDs.splice(index, 1);
        this._sectorsValidationRuleTypes.splice(index, 1);
        this._sectorsValidationRuleValues.splice(index, 1);
        this._sectorsValidationRuleTags.splice(index, 1);
        this._sectorsValidationRuleContexts.splice(index, 1);
        this._sectorsValidationGroupGroups.splice(index, 1);
        this._sectorsValidationGroupRules.splice(index, 1);
        this._sectorsValidationGroupContexts.splice(index, 1);
        this._sectorsValidationInterfaceIDs.splice(index, 1);
        this._sectorsValidationInterfaceElements.splice(index, 1);
        this._sectorsValidationInterfaceContexts.splice(index, 1);
    }

    public async RegisterValidation(el: HTMLElement, sector: string, context: DrapoContext = null): Promise<void> {
        const validations: [string, string][] = this.ExtractValidations(el);
        if (validations.length === 0)
            return;
        if ((context == null) && (this.Application.Document.IsElementInsideControlFlowOrContext(el)))
            return;
        const contextItem: DrapoContextItem = context != null ? context.Item : null;
        //Register Rule
        const validationID: string = this.Application.Solver.Get(validations, 'id');
        const validationIDResolved: string = await this.ResolveValidationID(sector, validationID, contextItem);
        if (validationIDResolved != null) {
            //Type
            const validationType: string = this.Application.Solver.Get(validations, 'type');
            //Value
            const validationValue: string = this.Application.Solver.Get(validations, 'value');
            //Group
            const validationGroup: string = this.Application.Solver.Get(validations, 'group');
            //Groups
            const validationGroups: string[] = this.Application.Parser.ParseValidationGroups(validationGroup);
            //Tag
            const validationTag: string = this.GetValidationTag(validations, validationType);
            //Add Validation
            this.AddValidationRule(sector, validationIDResolved, validationType, validationValue, validationTag, contextItem);
            //Add Validation Groups
            this.AddValidationGroups(sector, validationIDResolved, validationGroups, contextItem);
        }
        //Interface
        const validation: string = this.Application.Solver.Get(validations, '');
        const validationResolved: string = await this.ResolveValidationID(sector, validation, contextItem);
        if (validationResolved != null) {
            const elj: JQuery = $(el);
            //Add Interface
            this.AddValidationInterface(sector, validationResolved, el, contextItem);
            //Add Class Unchecked
            const validatorUncheckedClass: string = await this.Application.Config.GetValidatorUncheckedClass();
            if (validatorUncheckedClass != null) {
                elj.addClass(validatorUncheckedClass);
            }
        }
    }

    private async ResolveValidationID(sector: string, validationID: string, contextItem: DrapoContextItem): Promise<string> {
        if (!this.Application.Parser.HasMustache(validationID))
            return (validationID);
        if (contextItem == null)
            return (await this.Application.Storage.ResolveMustachesRecursive(sector, validationID));
        const validationIDContext: string = await this.Application.Barber.ResolveControlFlowMustacheString(contextItem.Context, null, validationID, null, sector, false);
        return (validationIDContext);
    }

    private GetValidationTag(validations: [string, string][], validationType: string): string {
        if (validationType === 'regex')
            return (this.Application.Solver.Get(validations, 'expression'));
        if (validationType === 'compare')
            return (this.Application.Solver.Get(validations, 'valuetocompare'));
        if (validationType === 'outside')
            return (this.Application.Solver.Get(validations, 'sector'));
        return (null);
    }

    public async IsValidationEventValid(el: HTMLElement, sector: string, eventType: string, location: string, event: JQueryEventObject, contextItem: DrapoContextItem): Promise<boolean> {
        if (el.getAttribute == null)
            return (true);
        const attribute: string = location == null ? 'd-validation-on-' + eventType : 'd-validation-on-' + location + '-' + eventType;
        const validation: string = el.getAttribute(attribute);
        if (validation == null)
            return (true);
        const isValid: boolean = await this.IsValidationExpressionValid(el, sector, validation, contextItem, event);
        return (isValid);
    }

    public async IsValidationExpressionValid(el: HTMLElement, sector: string, validation: string, contextItem: DrapoContextItem, event: JQueryEventObject = null): Promise<boolean> {
        const uncheckedClass: string = await this.Application.Config.GetValidatorUncheckedClass();
        const validClass: string = await this.Application.Config.GetValidatorValidClass();
        const invalidClass: string = await this.Application.Config.GetValidatorInvalidClass();
        const validations: string[] = await this.ResolveValidations(sector, validation, contextItem);
        let isValid: boolean = true;
        for (let i: number = 0; i < validations.length; i++)
            if (!await this.IsValidationValid(sector, validations[i], el, event, isValid, uncheckedClass, validClass, invalidClass))
                isValid = false;
        return (isValid);
    }

    public async UncheckValidationExpression(el: HTMLElement, sector: string, validation: string, contextItem: DrapoContextItem): Promise<void> {
        const uncheckedClass: string = await this.Application.Config.GetValidatorUncheckedClass();
        const validClass: string = await this.Application.Config.GetValidatorValidClass();
        const invalidClass: string = await this.Application.Config.GetValidatorInvalidClass();
        const validations: string[] = await this.ResolveValidations(sector, validation, contextItem);
        for (let i: number = 0; i < validations.length; i++)
            this.UncheckValidation(sector, validations[i], uncheckedClass, validClass, invalidClass);
    }

    private GetSectorIndex(sector: string): number {
        for (let i: number = 0; i < this._sectors.length; i++)
            if (this._sectors[i] === sector)
                return (i);
        return (null);
    }

    private GetIndex(list: string[], value: string): number {
        for (let i: number = 0; i < list.length; i++)
            if (list[i] === value)
                return (i);
        return (null);
    }

    private GetElement(elements: HTMLElement[], element: HTMLElement): number {
        for (let i: number = 0; i < elements.length; i++)
            if (elements[i] === element)
                return (i);
        return (null);
    }

    private EnsureSector(sector: string): number {
        const index: number = this.GetSectorIndex(sector);
        if (index !== null)
            return (index);
        this._sectors.push(sector);
        this._sectorsValidationRuleIDs.push([]);
        this._sectorsValidationRuleTypes.push([]);
        this._sectorsValidationRuleValues.push([]);
        this._sectorsValidationRuleTags.push([]);
        this._sectorsValidationRuleContexts.push([]);
        this._sectorsValidationGroupGroups.push([]);
        this._sectorsValidationGroupRules.push([]);
        this._sectorsValidationGroupContexts.push([]);
        this._sectorsValidationInterfaceIDs.push([]);
        this._sectorsValidationInterfaceElements.push([]);
        this._sectorsValidationInterfaceContexts.push([]);
        return (this._sectors.length - 1);
    }

    private AddValidationRule(sector: string, validationID: string, validationType: string, validationValue: string, validationTag: string, contextItem: DrapoContextItem): void {
        const index: number = this.EnsureSector(sector);
        const ruleIDs: string[] = this._sectorsValidationRuleIDs[index];
        const ruleIDIndex = this.GetIndex(ruleIDs, validationID);
        if (ruleIDIndex !== null)
            return;
        const ruleTypes: string[] = this._sectorsValidationRuleTypes[index];
        const ruleValues: string[] = this._sectorsValidationRuleValues[index];
        const ruleTags: string[] = this._sectorsValidationRuleTags[index];
        const ruleContexts: DrapoContextItem[] = this._sectorsValidationRuleContexts[index];
        ruleIDs.push(validationID);
        ruleTypes.push(validationType);
        ruleValues.push(validationValue);
        ruleTags.push(validationTag);
        ruleContexts.push(contextItem);
    }

    private AddValidationGroups(sector: string, validationID: string, validationGroups: string[], contextItem: DrapoContextItem): void {
        for (let i: number = 0; i < validationGroups.length; i++)
            this.AddValidationGroup(sector, validationID, validationGroups[i], contextItem);
    }

    private AddValidationGroup(sector: string, validationID: string, validationGroup: string, contextItem: DrapoContextItem): void {
        const index: number = this.EnsureSector(sector);
        const groups: string[] = this._sectorsValidationGroupGroups[index];
        const groupsRules: string[][] = this._sectorsValidationGroupRules[index];
        const groupsContext: DrapoContextItem[][] = this._sectorsValidationGroupContexts[index];
        const groupIndex: number = this.GetIndex(groups, validationGroup);
        if (groupIndex === null) {
            groups.push(validationGroup);
            groupsRules.push([validationID]);
            groupsContext.push([contextItem]);
        } else {
            const groupRules: string[] = groupsRules[groupIndex];
            const groupContext: DrapoContextItem[] = groupsContext[groupIndex];
            const ruleIndex: number = this.GetIndex(groupRules, validationID);
            if (ruleIndex === null) {
                groupRules.push(validationID);
                groupContext.push(contextItem);
            }
        }
    }

    private AddValidationInterface(sector: string, validationID: string, el: HTMLElement, contextItem: DrapoContextItem) {
        const index: number = this.EnsureSector(sector);
        const interfacesIDs: string[] = this._sectorsValidationInterfaceIDs[index];
        const interfacesElements: HTMLElement[][] = this._sectorsValidationInterfaceElements[index];
        const interfacesContexts: DrapoContextItem[][] = this._sectorsValidationInterfaceContexts[index];
        const idIndex: number = this.GetIndex(interfacesIDs, validationID);
        if (idIndex === null) {
            interfacesIDs.push(validationID);
            interfacesElements.push([el]);
            interfacesContexts.push([contextItem]);
        } else {
            const interfaceElements: HTMLElement[] = interfacesElements[idIndex];
            const interfaceContexts: DrapoContextItem[] = interfacesContexts[idIndex];
            const elementIndex: number = this.GetElement(interfaceElements, el);
            if (elementIndex === null) {
                interfaceElements.push(el);
                interfaceContexts.push(contextItem);
            }
        }
    }

    private ExtractValidations(el: HTMLElement): [string, string][] {
        const attributes: [string, string][] = [];
        for (let i: number = 0; i < el.attributes.length; i++) {
            const attribute: Attr = el.attributes[i];
            const attributeProperty = this.ExtractValidationProperty(attribute.nodeName);
            if (attributeProperty != null)
                attributes.push([attributeProperty, attribute.nodeValue]);
        }
        return (attributes);
    }

    private ExtractValidationProperty(property: string): string {
        const parse: string[] = this.Application.Parser.ParseProperty(property);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'validation')
            return (null);
        if (parse.length === 2)
            return ('');
        return (parse[2]);
    }

    private async ResolveValidations(sector: string, validation: string, contextItem: DrapoContextItem): Promise<string[]> {
        //Mustache
        let validationResolved: string = null;
        if (this.Application.Parser.IsMustacheOnly(validation)) {
            validationResolved = await this.Application.Barber.ResolveControlFlowMustacheString(contextItem == null ? null : contextItem.Context, null, validation, null, sector, false);
        } else {
            validationResolved = validation;
        }
        //Groups
        const validations: string[] = [];
        if (this.Application.Parser.IsValidatorArray(validationResolved)) {
            const validatorsArray: [string, string][] = this.ExtractValidators(validationResolved);
            for (let i: number = 0; i < validatorsArray.length; i++) {
                const validator: [string, string] = validatorsArray[i];
                const validatorConditional: string = validator[1];
                if ((validatorConditional != null) && (!await this.IsValidConditional(sector, validatorConditional, contextItem)))
                    continue;
                validations.push(validator[0]);
            }
        } else {
            validations.push(validationResolved);
        }
        return (validations);
    }

    private ExtractValidators(validation: string): [string, string][] {
        const validators: [string, string][] = [];
        const parsedValidators: string[] = this.Application.Parser.ParseValidatorsArray(validation);
        for (let i = 0; i < parsedValidators.length; i++) {
            const parsedValidator: string = parsedValidators[i];
            const parseValidator = this.Application.Parser.ParseValidator(parsedValidator);
            if (parseValidator != null)
                validators.push(parseValidator);
        }
        return (validators);
    }

    private async IsValidationValid(sector: string, validation: string, el: HTMLElement, event: JQueryEventObject, canFocus: boolean, uncheckedClass: string, validClass: string, invalidClass: string): Promise<boolean> {
        //Group
        if (this.IsValidationGroup(sector, validation))
            return (await this.IsValidationGroupValid(sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass));
        //Rule
        return (await this.IsValidationRuleValid(sector, validation, el, event, canFocus, uncheckedClass, validClass, invalidClass));
    }

    private IsValidationGroup(sector: string, validation: string): boolean {
        const index: number = this.GetSectorIndex(sector);
        if (index === null)
            return (false);
        const groups: string[] = this._sectorsValidationGroupGroups[index];
        const groupIndex: number = this.GetIndex(groups, validation);
        return (groupIndex !== null);
    }

    private async IsValidationGroupValid(sector: string, validation: string, el: HTMLElement, event: JQueryEventObject, canFocus: boolean, uncheckedClass: string, validClass: string, invalidClass: string): Promise<boolean> {
        const rules: string[] = this.GetValidationGroupRules(sector, validation);
        let isValid: boolean = true;
        for (let i: number = 0; i < rules.length; i++)
            if (!await this.IsValidationRuleValid(sector, rules[i], el, event, (canFocus && isValid), uncheckedClass, validClass, invalidClass))
                isValid = false;
        return (isValid);
    }

    private GetValidationGroupRules(sector: string, validation: string): string[] {
        const index: number = this.GetSectorIndex(sector);
        if (index === null)
            return ([]);
        const groups: string[] = this._sectorsValidationGroupGroups[index];
        const groupIndex: number = this.GetIndex(groups, validation);
        if (groupIndex === null)
            return ([]);
        const groupsRules: string[][] = this._sectorsValidationGroupRules[index];
        const rules: string[] = groupsRules[groupIndex];
        return (rules);
    }

    private async IsValidationRuleValid(sector: string, validation: string, el: HTMLElement, event: JQueryEventObject, canFocus: boolean, uncheckedClass: string, validClass: string, invalidClass: string): Promise<boolean> {
        //Rule Expression
        const isValid: boolean = await this.IsRuleValid(sector, validation, canFocus, el, event);
        const addClass: string = isValid ? validClass : invalidClass;
        const removeClass: string = (!isValid) ? validClass : invalidClass;
        //Elements
        const elements: HTMLElement[] = this.GetValidationRuleElements(sector, validation);
        for (let i: number = 0; i < elements.length; i++) {
            const element: HTMLElement = elements[i];
            const elj: JQuery = $(element);
            if (uncheckedClass != null)
                elj.removeClass(uncheckedClass);
            elj.removeClass(removeClass);
            elj.addClass(addClass);
        }
        return (isValid);
    }

    private GetValidationRuleElements(sector: string, validation: string): HTMLElement[] {
        const index: number = this.GetSectorIndex(sector);
        if (index === null)
            return ([]);
        const interfacesIDs: string[] = this._sectorsValidationInterfaceIDs[index];
        const interfacesElements: HTMLElement[][] = this._sectorsValidationInterfaceElements[index];
        const idIndex: number = this.GetIndex(interfacesIDs, validation);
        if (idIndex === null)
            return ([]);
        const interfaceElements: HTMLElement[] = interfacesElements[idIndex];
        return (interfaceElements);
    }

    private async IsRuleValid(sector: string, validation: string, canFocus: boolean, el: HTMLElement, event: JQueryEventObject): Promise<boolean> {
        const index: number = this.GetSectorIndex(sector);
        if (index === null)
            return (true);
        const ruleIDs: string[] = this._sectorsValidationRuleIDs[index];
        const ruleIDIndex = this.GetIndex(ruleIDs, validation);
        if (ruleIDIndex === null)
            return (true);
        const ruleTypes: string[] = this._sectorsValidationRuleTypes[index];
        const type: string = ruleTypes[ruleIDIndex];
        const ruleValues: string[] = this._sectorsValidationRuleValues[index];
        const value: string = ruleValues[ruleIDIndex];
        const ruleTags: string[] = this._sectorsValidationRuleTags[index];
        const tag: string = ruleTags[ruleIDIndex];
        const ruleContexts: DrapoContextItem[] = this._sectorsValidationRuleContexts[index];
        const itemContext: DrapoContextItem = ruleContexts[ruleIDIndex];
        const isValid: boolean = await this.IsValid(sector, type, value, tag, itemContext, el, event);
        if ((!isValid) && (canFocus)) {
            const element: HTMLElement = this.Application.Observer.GetElementByModel(sector, value);
            if (element != null)
                $(element).focus();
        }
        return (isValid);
    }

    private async IsValid(sector: string, type: string, value: string, tag: string, itemContext: DrapoContextItem, el: HTMLElement, event: JQueryEventObject): Promise<boolean> {
        if ((type == null) || (type == 'conditional'))
            return (await this.IsValidConditional(sector, value, itemContext));
        else if (type === 'regex')
            return (await this.IsValidRegex(sector, value, tag, itemContext));
        else if (type === 'compare')
            return (await this.IsValidCompare(sector, value, tag, itemContext));
        else if (type === 'outside')
            return (await this.IsValidOutside(el, event, tag));
        await this.Application.ExceptionHandler.HandleError('Drapo: There is no validation rule of type: {0}', type);
        return (false);
    }

    private async IsValidConditional(sector: string, value: string, itemContext: DrapoContextItem): Promise<boolean> {
        const context: DrapoContext = this.CreateContext(itemContext);
        const valueResult: boolean = await this.Application.Solver.ResolveConditional(value, null, sector, context);
        return (valueResult);
    }

    private async IsValidRegex(sector: string, value: string, expression: string, itemContext: DrapoContextItem): Promise<boolean> {
        const context: DrapoContext = this.CreateContext(itemContext);
        const expressionsResolved: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, expression, null, false);
        const valueResolved: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, value, null, false);
        const regex: RegExp = new RegExp(expressionsResolved);
        return (regex.test(valueResolved));
    }

    private async IsValidCompare(sector: string, value: string, valueToCompare: string, itemContext: DrapoContextItem): Promise<boolean> {
        const context: DrapoContext = this.CreateContext(itemContext);
        const valueResolved: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, value, null, false);
        const valueToCompareResolved: string = await this.Application.Barber.ResolveControlFlowMustacheStringFunction(sector, context, null, valueToCompare, null, false);
        return (valueResolved == valueToCompareResolved);
    }

    private CreateContext(itemContext: DrapoContextItem): DrapoContext {
        const context: DrapoContext = new DrapoContext(itemContext);
        return (context);
    }

    private async IsValidOutside(el: HTMLElement, event: JQueryEventObject, validSectors: string): Promise<boolean> {
        let target: Element = event.target;
        if (validSectors != null) {
            let sectorsAllowed: string[] = [];
            const sectorTarget: string = this.Application.Document.GetSector(target as HTMLElement);
            const sectors: string[] = this.Application.Parser.ParseTags(validSectors);
            for (let i: number = 0; i < sectors.length; i++)
                sectorsAllowed = this.Application.Solver.Join(sectorsAllowed, this.Application.Document.GetSectorAndChildren(sectors[i]));
            if (!this.Application.Solver.Contains(sectorsAllowed, sectorTarget))
                return (false);
        }
        while (target != null) {
            if (el === target)
                return (false);
            if (target.parentElement)
                target = target.parentElement;
            else
                target = null;
        }
        return (true);
    }

    private UncheckValidation(sector: string, validation: string, uncheckedClass: string, validClass: string, invalidClass: string): void {
        if (this.IsValidationGroup(sector, validation)) //Group
            this.UncheckValidationGroup(sector, validation, uncheckedClass, validClass, invalidClass);
        else //Rule
            this.UncheckValidationRule(sector, validation, uncheckedClass, validClass, invalidClass);
    }

    private UncheckValidationGroup(sector: string, validation: string, uncheckedClass: string, validClass: string, invalidClass: string): void {
        const rules: string[] = this.GetValidationGroupRules(sector, validation);
        for (let i: number = 0; i < rules.length; i++)
            this.UncheckValidationRule(sector, rules[i], uncheckedClass, validClass, invalidClass);
    }

    private UncheckValidationRule(sector: string, validation: string, uncheckedClass: string, validClass: string, invalidClass: string): void {
        //Elements
        const elements: HTMLElement[] = this.GetValidationRuleElements(sector, validation);
        for (let i: number = 0; i < elements.length; i++) {
            const element: HTMLElement = elements[i];
            const elj: JQuery = $(element);
            elj.removeClass(validClass);
            elj.removeClass(invalidClass);
            if (uncheckedClass != null)
                elj.addClass(uncheckedClass);
        }
    }

    public IsValidatorInterface(el: HTMLElement): boolean {
        const attributeValidation: string = el.getAttribute('d-validation');
        return ((attributeValidation != null) && (attributeValidation != ''));
    }
}