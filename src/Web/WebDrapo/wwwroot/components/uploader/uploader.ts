﻿async function uploaderConstructor(el: HTMLElement, app: DrapoApplication): Promise<any> {
    //Initialize
    const uploader: Uploader = new Uploader(el, app);
    await uploader.Initalize();
    return (uploader);
}

class Uploader {
    //Field
    private _el: HTMLElement = null;
    private _app: DrapoApplication;
    private _sector: string = null;
    private _dataKeySource: string = null;
    private _dataFieldName: string = null;
    private _dataFieldData: string = null;
    private _dataMessage: string = null;
    private _dataFileExtensionType: string = null;
    //Properties
    get Application(): DrapoApplication {
        return (this._app);
    }
    //Constructors
    constructor(el: HTMLElement, app: DrapoApplication) {
        this._el = el;
        this._app = app;
    }

    public async Initalize(): Promise<void> {
        this._sector = this.Application.Document.GetSector(this._el);
        this._dataKeySource = this._el.getAttribute("d-dataKeySource");
        this._dataFieldName = this._el.getAttribute("d-dataFieldName");
        this._dataFieldData = this._el.getAttribute("d-dataFieldData");
        this._dataMessage = this._el.getAttribute("d-dataMessage");
        this._dataFileExtensionType = this._el.getAttribute("d-dataFileExtensionType");
        const dataKeyFileExtensionsDefault = this._el.getAttribute('dc-fileextensionsdefault');
        if (this._app.Parser.IsMustache(this._dataFileExtensionType))
            this._dataFileExtensionType = await this._app.Storage.RetrieveDataValue(this._sector, this._dataFileExtensionType);
        if ((this._dataFileExtensionType == null) || (this._dataFileExtensionType == '') && (dataKeyFileExtensionsDefault != ''))
            this._dataFileExtensionType = await this._app.Storage.RetrieveDataValue(this._sector, dataKeyFileExtensionsDefault);
        const mustacheName = this.GetFileNameMustache();
        //Handlers
        const uploader: Uploader = this;
        this._el.addEventListener('dragover', (evt) => { uploader.HandleDragOver(evt); }, false);
        this._el.addEventListener('drop', (evt) => { uploader.HandleDrop(evt); }, false);
        const elDrop = this.GetElementDrop();
        elDrop.addEventListener('click', (evt) => { uploader.HandleClick(evt); }, false);
        const elFile = this.GetElementInputFile();
        elFile.addEventListener('change', (evt) => { uploader.HandleChange(evt); }, false);
        const elButton = this.GetElementButton();
        elButton.addEventListener('click', async (evt) => { await uploader.HandleDownload(evt); }, false);
        //Subscribe
        this.Application.Observer.SubscribeComponent(mustacheName, this._el, async () => { await uploader.Notify(); }, this._el);
        await this.DisableDownloadButton();
        return (this.Notify());
    }

    private GetElementInputFile(): HTMLInputElement {
        const elinput: any = this._el.children[2];
        if (this._dataFileExtensionType !== '.*')
            elinput.setAttribute('accept', this._dataFileExtensionType);
        return (elinput as HTMLInputElement);
    }

    private GetElementMessage(): HTMLSpanElement {
        return (this._el.children[1].children[0] as HTMLSpanElement);
    }

    private GetElementDrop(): HTMLDivElement {
        return (this._el.children[1] as HTMLDivElement);
    }

    private GetElementButton(): HTMLButtonElement {
        return (this._el.children[0] as HTMLButtonElement);
    }

    private GetFileNameMustache(): string {
        if (this._dataKeySource != null)
            return ('{{' + this._dataKeySource + '.' + this._dataFieldName + '}}');
        return (this._dataFieldName);
    }

    private async GetName(): Promise<string> {
        const nameMustache: string = this.GetFileNameMustache();
        const nameMustachePath: string[] = this.Application.Parser.ParseMustache(nameMustache);
        const nameKey: string = this.Application.Solver.ResolveDataKey(nameMustachePath);
        const data: any = await this.Application.Storage.RetrieveData(nameKey, this._sector);
        const name = this.Application.Solver.ResolveDataObjectPathObject(data, nameMustachePath);
        if ((name == null) || (name == ''))
            return ('');
        return (name);
    }

    private GetFileDataMustache(): string {
        if (this._dataKeySource != null)
            return ('{{' + this._dataKeySource + '.' + this._dataFieldData + '}}');
        return (this._dataFieldData);
    }

    private async DisableDownloadButton(): Promise<void> {
        const dataValue = await this.GetValue();
        const downloadButton = await this.GetElementButton();
        if (dataValue == null || dataValue == '') {
            downloadButton.setAttribute("class", "suDownloadDisabled");
        }
        else {
            downloadButton.setAttribute("class", "ppUploaderButton");
        }
    }

    public HandleDragOver(evt: any): void {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }

    public HandleDrop(evt: any) {
        evt.stopPropagation();
        evt.preventDefault();
        const files = evt.dataTransfer.files;
        if ((files == null) || (files.length == 0))
            return;
        const file = files[0];
        this.HandleFile(file);
    }

    private IsValidFileNameExtension(name: string): boolean {
        if (this._dataFileExtensionType === '.*')
            return (true);
        const types: string[] = this._dataFileExtensionType.split(',');
        for (let i: number = 0; i < types.length; i++) {
            const type: string = types[i].trim();
            if (name.endsWith(type))
                return (true);
        }
        return (false);
    }

    public HandleClick(evt: Event) {
        const elementInputFile = this.GetElementInputFile();
        elementInputFile.click();
    }

    public HandleChange(evt: any) {
        const files = evt.target.files;
        if ((files == null) || (files.length == 0))
            return;
        const file = files[0];
        this.HandleFile(file);
    }

    public async HandleDownload(evt: any): Promise<void> {
        evt.stopPropagation();
        evt.preventDefault();
        //Name
        const dataName = await this.GetName();
        if ((dataName == null) || (dataName == ''))
            return;
        //Value
        const dataValue = await this.GetValue();
        this.Download(dataName, dataValue);
    }

    private async GetValue(): Promise<any> {
        const dataMustache: string = this.GetFileDataMustache();
        const dataMustachePath = this.Application.Parser.ParseMustache(dataMustache);
        const dataKey: string = this.Application.Solver.ResolveDataKey(dataMustachePath);
        const data: any = await this.Application.Storage.RetrieveData(dataKey, this._sector);
        const dataValue = this.Application.Solver.ResolveDataObjectPathObject(data, dataMustachePath);
        return dataValue;
    }

    private Download(name: string, dataBase64: string): void {
        const dataCharacters = atob(dataBase64);
        const dataBytes = new Array(dataCharacters.length);
        for (let i = 0; i < dataCharacters.length; i++) {
            dataBytes[i] = dataCharacters.charCodeAt(i);
        }
        const data = new Uint8Array(dataBytes);
        const blob = new Blob([data], { type: 'application/octet-stream' });
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

    public async Notify(): Promise<void> {
        const name: string = await this.GetName();
        const elMessage = this.GetElementMessage();
        if ((name == null) || (name == '')) {
            const isMustache = this.Application.Parser.IsMustache(this._dataMessage);
            if (isMustache) {
                const dataMessage = await this.Application.Storage.RetrieveDataValue(this._sector, this._dataMessage);
                elMessage.textContent = dataMessage;
                elMessage.title = dataMessage;
            } else {
                elMessage.textContent = this._dataMessage;
                elMessage.title = this._dataMessage;
            }
        } else {
            elMessage.textContent = name;
            elMessage.title = name;
        }
    }

    private HandleFile(file: any) {
        const name: string = file.name;
        if (!this.IsValidFileNameExtension(name))
            return;
        const reader = new FileReader();
        const uploader: Uploader = this;
        reader.addEventListener("load", async () => {
            await uploader.UpdateData(file.name, uploader.ExtractBase64(reader.result));
        }, false);
        reader.readAsDataURL(file);
    }

    private ExtractBase64(data: any) {
        const index = data.toString().indexOf('base64,');
        if (index == -1)
            return (data);
        return (data.toString().substr(index + 7));
    }

    public async UpdateData(fileName: string, fileData: any): Promise<void> {
        //Value
        const dataMustache: string = this.GetFileDataMustache();
        const dataMustachePath: string[] = this.Application.Parser.ParseMustache(dataMustache);
        const dataKey: string = this.Application.Solver.ResolveDataKey(dataMustachePath);
        const dataPath: string[] = this.Application.Solver.ResolveDataFields(dataMustachePath);
        await this.Application.Storage.SetDataKeyField(dataKey, this._sector, dataPath, fileData, true);
        //Name
        const nameMustache: string = this.GetFileNameMustache();
        const nameMustachePath: string[] = this.Application.Parser.ParseMustache(nameMustache);
        const nameKey: string = this.Application.Solver.ResolveDataKey(nameMustachePath);
        const namePath: string[] = this.Application.Solver.ResolveDataFields(nameMustachePath);
        await this.Application.Storage.SetDataKeyField(nameKey, this._sector, namePath, fileName, true);
        await this.DisableDownloadButton();
    }
}