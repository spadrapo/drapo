declare class DrapoSolver {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    ResolveConditional(expression: string | boolean | number, elj?: JQuery, sector?: string, context?: DrapoContext, renderContext?: DrapoRenderContext, eljForTemplate?: HTMLElement): Promise<boolean>;
    private ResolveConditionalExpressionBlock;
    private ResolveConditionalExpressionBlockOperation;
    private EnsureExpressionItemCurrentLevelResolved;
    private JoinTexts;
    private EnsureExpressionItemResolved;
    private ResolveConditionalBlock;
    private ResolveConditionalOperator;
    ResolveConditionalBoolean(data: string): boolean;
    private ResolveConditionalOperatorLessThan;
    private ResolveConditionalOperatorLessOrEqualThan;
    private ResolveConditionalOperatorGreaterThan;
    private ResolveConditionalOperatorGreaterOrEqualThan;
    private ResolveConditionalOperatorLike;
    private ResolveOperationArithmeticAddition;
    private ResolveOperationArithmeticSubtraction;
    private ResolveOperationArithmeticMultiplication;
    private ResolveOperationArithmeticDivision;
    CreateContextItemFromPath(sector: string, dataPath: string[]): Promise<DrapoContextItem>;
    CreateMustache(dataPath: string[]): string;
    CreateMustacheContext(context: DrapoContext, mustacheParts: string[]): string;
    CreateMustacheReference(sector: string, contextItem: DrapoContextItem, mustache: string): Promise<string>;
    private GetContextItemAbsolute;
    ResolveDataPathMustache(context: DrapoContext, elementJQuery: JQuery, sector: string, mustacheParts: string[]): Promise<string>;
    ExistDataPath(context: DrapoContext, sector: string, path: string[]): Promise<boolean>;
    private ExistDataPathObject;
    ResolveDataPath(context: DrapoContext, elementJQuery: JQuery, sector: string, path: (string[] | string), canBindReader?: boolean, canBindWriter?: boolean, modelEvents?: string[], modelEventsCancel?: string[]): Promise<string>;
    private ResolveDataPathObject;
    ResolveItemDataPathObject(sector: string, contextItem: DrapoContextItem, dataPath: string[], canForceLoadDataDelay?: boolean): Promise<any>;
    ResolveItemStoragePathObject(item: DrapoStorageItem, dataPath: string[]): any;
    ResolveDataObjectPathObject(dataObject: any, dataPath: string[]): any;
    private GetDataObjectPathObjectPropertyIndex;
    ResolveDataObjectLookupHierarchy(data: any, searchField: string, searchValue: any, searchHierarchyField?: string): any;
    UpdateDataObjectLookupHierarchy(data: any, searchField: string, searchValue: any, value: any, searchHierarchyField?: string): boolean;
    ContainsItemStoragePathObject(item: DrapoStorageItem, dataPath: string[]): boolean;
    ResolveDataPathObjectItem(contextItem: DrapoContextItem, dataKey: string, sector: string, canForceLoadDataDelay?: boolean, dataPath?: string[]): Promise<DrapoContextItem>;
    ResolveSector(mustacheParts: string[], sector: string): string;
    private HasMustachePartsSector;
    ResolveDataKey(mustacheParts: string[]): string;
    ResolveDataFields(mustacheParts: string[]): string[];
    CreateDataPath(dataKey: string, dataFields: string[]): string[];
    CombineDataPath(dataPath1: string[], dataPath2: string[]): string[];
    GetDataPathParent(dataPath: string[]): string[];
    UpdateItemDataPathObject(sector: string, contextItem: DrapoContextItem, dataPath: string[], value: any, canNotify?: boolean): Promise<boolean>;
    UpdateDataPathObject(data: any, dataPath: string[], value: any): boolean;
    Clone(object: any, deepCopy?: boolean): any;
    private CloneArray;
    CloneArrayString(list: string[]): string[];
    CloneArrayElement(list: HTMLElement[]): HTMLElement[];
    CloneArrayAny(list: any[]): any[];
    CloneElement(el: HTMLElement): HTMLElement;
    private GetSystemContextPathValue;
    private GetSystemPathValue;
    private GetSystemContextPathValueIndex;
    private GetSystemContextPathValueIndexRelative;
    private GetSystemContextPathValueLevel;
    private GetSystemContextPathValueHasChanges;
    ResolveSystemContextPath(sector: string, context: DrapoContext, expression: string): string;
    TransformObjectIntoArray(object: any): any[];
    ResolveUrlToAbsolute(urlRelative: string): string;
    Contains(data: string[], item: string): boolean;
    Join(list1: string[], list2: string[]): string[];
    Get(dictionary: [string, string][], key: string): string;
    IsEqualStringArray(list1: string[], list2: string[]): boolean;
    IsEqualString(value1: any, value2: any): boolean;
    EnsureString(data: any): string;
    Replace(data: string, from: string, to: string): string;
    ResolveMathematicalExpression(data: string): string;
}
