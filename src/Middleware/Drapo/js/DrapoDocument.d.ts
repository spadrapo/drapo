/// <reference path="../typings/index.d.ts" />
declare class DrapoDocument {
    private _application;
    private _pendingAuthorizations;
    private _sectorsLoaded;
    private _message;
    private _sectorHierarchy;
    private _sectorFriends;
    private _lastGuid;
    get Application(): DrapoApplication;
    get Message(): DrapoMessage;
    set Message(value: DrapoMessage);
    constructor(application: DrapoApplication);
    ResetPendingAuthorizations(count?: number): void;
    StartUpdate(sector: string): void;
    Resolve(): Promise<void>;
    ResolveInternal(): Promise<void>;
    private ResolveParent;
    ResolveParentResponse(data: string, parent: string, parentSector: string, childHtml: string, sectors: [string, string, string][]): Promise<void>;
    private ExtractSectors;
    private ExtractSectorProperty;
    private ResolveChildren;
    private LoadChildSectorInternal;
    private ReplaceSectorData;
    ResolveWindow(elWindow: HTMLElement): Promise<void>;
    ResolveComponentDynamicSector(el: HTMLElement): Promise<void>;
    ResolveComponentUpdate(el: HTMLElement, context: DrapoContext): Promise<void>;
    RemoveElement(el: HTMLElement): Promise<void>;
    private RemoveElementIteration;
    private RemoveSectorData;
    LoadChildSector(sectorName: string, url: string, title?: string, canRoute?: boolean, canLoadDefaultSectors?: boolean, container?: string): Promise<boolean>;
    LoadChildSectorContent(sectorName: string, content: string): Promise<boolean>;
    LoadChildSectorDefault(sectorName: string): Promise<boolean>;
    private ReplaceDocument;
    ReplaceElement(el: Element, elNew: Element | string | JQuery): void;
    Show(el: HTMLElement): HTMLElement;
    private ShowInternal;
    Hide(el: HTMLElement): JQuery;
    GetWrapper(elj: JQuery): HTMLElement;
    private Wrap;
    GetElementAttributes(el: Element): [string, string][];
    GetElementAttributesFilteredPrefix(el: Element, prefix: string): [string, string][];
    SetElementAttributes(elj: JQuery, attributes: [string, string][]): void;
    private ExtractHeadInnerHtml;
    private RemoveFramework;
    private ExtractBodyInnerHtml;
    private GetOuterHtml;
    IsElementInserted(list: HTMLElement[], itemInsert: HTMLElement): boolean;
    IsElementAttached(el: HTMLElement): boolean;
    IsElementInsideControlFlow(el: HTMLElement): boolean;
    IsElementInsideControlFlowOrContext(el: HTMLElement): boolean;
    IsElementPreprocessed(el: HTMLElement): boolean;
    RequestAuthorization(dataKey: string, type: string): Promise<void>;
    private TryOnAuthorizationRequest;
    private OnAuthorizationRequest;
    private IsSectorAlreadyLoaded;
    MarkSectorAsLoaded(sector: string): void;
    private InitializeSectorsLoaded;
    GetSectorParent(el: HTMLElement): string;
    GetSector(el: HTMLElement): string;
    private GetElementByAttribute;
    private GetSectorElement;
    GetSectorElementInner(sector: string): HTMLElement;
    SetSectorElementInner(sector: string, el: HTMLElement, canDetach: boolean): void;
    SetElementHTML(el: HTMLElement, html: string): void;
    CreateHTMLElement(html: string, onlyLast?: boolean): HTMLElement;
    private InitializeSectorElementDetach;
    CanDetachElement(el: HTMLElement): boolean;
    IsElementDetached(el: HTMLElement): boolean;
    IsElementAlive(el: HTMLElement): boolean;
    IsElementInsideComponent(el: HTMLElement): boolean;
    private HasElementIframe;
    private HasElementCantDetach;
    GetSectorImpersonate(el: HTMLElement): string;
    IsSectorDynamic(el: HTMLElement): Promise<boolean>;
    GetSectorResolved(el: HTMLElement): Promise<string>;
    Clone(el: HTMLElement): HTMLElement;
    Select(el: HTMLElement): void;
    GetValue(el: HTMLElement): string;
    SetValue(el: HTMLElement, value: string): void;
    GetProperty(el: HTMLElement, propertyName: string): string;
    CreateGuid(isShort?: boolean): string;
    private CreateGuidShort;
    private CreateGuidShortInternal;
    EnsureElementHasID(el: HTMLElement): string;
    ApplyNodeDifferences(parent: HTMLElement, nodeOld: HTMLElement, nodeNew: HTMLElement, isHTML: boolean): void;
    ApplyNodeDifferencesRenderClass(nodeOld: HTMLElement, nodeNew: HTMLElement): void;
    private IsNodeDifferentType;
    private ApplyNodeEventsDifferences;
    private ApplyNodeSpecialDifferences;
    private ApplyNodeSpecialDifferencesInput;
    private ApplyNodeSpecialDifferencesSelect;
    private ApplyNodeSpecialDifferencesTextarea;
    private ApplyNodeAttributesDifferences;
    private ExtactNodeAttributes;
    private ExtractNodeAttributeValue;
    Contains(element: HTMLElement): boolean;
    ExtractQueryString(canUseRouter: boolean): [string, string][];
    Sleep(timeout: number): Promise<{}>;
    WaitForMessage(retry?: number, interval?: number): Promise<DrapoMessage>;
    AddSectorHierarchy(sector: string, sectorParent: string): Promise<void>;
    GetSectorAndChildren(sector: string): string[];
    GetSectorChildren(sector: string): string[];
    GetSectorHierarchyChildren(sector: string): string[];
    IsSectorReady(sector: string): boolean;
    private GetSectorHierarchyParents;
    AppendSectorHierarchyBySector(sectorHierarchy: [string, string][], sector: string): void;
    AddSectorHierarchys(sectorHierarchys: [string, string][]): void;
    AppendSectorFriendsBySector(sectorFriends: [string, string[]][], sector: string): void;
    AddSectorFriendsRange(sectorFriends: [string, string[]][]): void;
    IsSystemKey(key: string): boolean;
    IsHiddenKey(key: string): boolean;
    GetSectors(): string[];
    IsEqualSector(sector1: string, sector2: string): boolean;
    IsSectorRoot(sector: string): boolean;
    CleanSectorMetadata(sector: string): void;
    private CleanSectorMetadataInternal;
    GetSectorsAllowed(sector: string): string[];
    IsSectorAllowed(sector: string, sectors: string[]): boolean;
    AddSectorFriends(sector: string, sectorFriendsText: string): Promise<void>;
    private GetSectorFriends;
    CollectSector(sector: string): Promise<void>;
    IsFirstChild(elj: JQuery): boolean;
    IsLastChild(elj: JQuery): boolean;
    ReceiveMessage(message: DrapoMessage): Promise<void>;
    private ExecuteMessage;
    private UpdateMessage;
    GetClipboard(): Promise<string>;
    private GetClipboardValueAsync;
    private GetClipboardValueExecCommand;
    SetClipboard(value: string): Promise<boolean>;
    private SetClipboardEvent;
    private SetClipboardTextArea;
    StartUnitTest(): Promise<void>;
}
