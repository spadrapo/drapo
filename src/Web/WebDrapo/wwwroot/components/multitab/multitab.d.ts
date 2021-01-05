/// <reference types="drapo" />
declare function multitabConstructor(el: HTMLElement, app: DrapoApplication): Promise<any>;
declare class MultiTab {
    private _el;
    private _app;
    private _selectedTabIndex;
    constructor(el: HTMLElement, app: DrapoApplication);
    get Application(): DrapoApplication;
    Initialize(): Promise<any>;
    private GetInternalElementContent;
    private GetElementContainerTabs;
    private GetElementContentTab;
    private Fill;
    private HandleTabMouseUp;
    private LoadContent;
    private SetDefault;
    private SetSelected;
    private SetTabDefault;
    private SetTabSelected;
}
