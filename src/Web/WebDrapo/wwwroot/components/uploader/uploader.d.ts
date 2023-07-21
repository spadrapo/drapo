/// <reference types="drapo" />
declare function uploaderConstructor(el: HTMLElement, app: DrapoApplication): Promise<any>;
declare class Uploader {
    private _el;
    private _app;
    private _sector;
    private _dataKeySource;
    private _dataFieldName;
    private _dataFieldData;
    private _dataMessage;
    private _dataFileExtensionType;
    get Application(): DrapoApplication;
    constructor(el: HTMLElement, app: DrapoApplication);
    Initalize(): Promise<void>;
    private GetElementInputFile;
    private GetElementMessage;
    private GetElementDrop;
    private GetElementButton;
    private GetFileNameMustache;
    private GetName;
    private GetFileDataMustache;
    private DisableDownloadButton;
    HandleDragOver(evt: any): void;
    HandleDrop(evt: any): void;
    private IsValidFileNameExtension;
    HandleClick(evt: Event): void;
    HandleChange(evt: any): void;
    HandleDownload(evt: any): Promise<void>;
    private GetValue;
    private Download;
    Notify(): Promise<void>;
    private HandleFile;
    private ExtractBase64;
    UpdateData(fileName: string, fileData: any): Promise<void>;
}
