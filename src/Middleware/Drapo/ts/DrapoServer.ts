class DrapoServer {
    //Field
    private _application: DrapoApplication;
    private _url: string;
    private _token: string = null;
    private _requestHeaders: [string, string][] = [];
    private _requestHeadersNext: [string, string][] = [];
    private _hasBadRequest: boolean = false;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    get HasBadRequest(): boolean {
        return (this._hasBadRequest);
    }
    set HasBadRequest(value: boolean) {
        this._hasBadRequest = value;
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
        this.InitializeServer();
    }

    private InitializeServer(): void {
        const scripts: any = document.getElementsByTagName('script');
        for (let i: number = 0; i < scripts.length; i++) {
            const script: HTMLScriptElement = scripts[i];
            const source: string = script.src;
            const index: number = source.indexOf('/drapo.js');
            if ((index == null) || (index < 0))
                continue;
            this._url = source.substr(0, index);
            return;
        }
        this._url = '';
    }

    public ResolveUrl(url: string): string {
        if (url.substr(0, 1) == '~')
            return (this._url + url.substr(1));
        return (url);
    }

    public async AppendUrlQueryStringCacheStatic(url: string): Promise<string> {
        const useCacheStatic: boolean = await this.Application.Config.GetUseCacheStatic();
        if (!useCacheStatic)
            return ('');
        const applicationBuild: string = await this.Application.Config.GetApplicationBuild();
        if (applicationBuild == '')
            return ('');
        if (url.indexOf('ab=') >= 0)
            return ('');
        return ((url.indexOf('?') >= 0 ? '&' : '?') + 'ab=' + applicationBuild);
    }

    private AppendUrlQueryStringTimestamp(url: string): string {
        const timestamp: number = new Date().getTime();
        return (url + (url.indexOf('?') >= 0 ? '&' : '?') + 'ts=' + timestamp);
    }

    public async GetViewHTML(url: string): Promise<string> {
        const htmlCached: string = this.Application.CacheHandler.GetCachedView(url);
        if (htmlCached != null)
            return (htmlCached);
        const response: [string, boolean] = await this.Application.Server.GetHTML(url);
        if (response == null)
            return (null);
        const html: string = response[0];
        const allowCache: boolean = response[1];
        if (allowCache)
            this.Application.CacheHandler.SetCachedView(url, html);
        return (html);
    }

    public async GetHTML(url: string): Promise<[string,boolean]> {
        const requestHeaders: [string, string][] = [];
        this.InsertHeader(requestHeaders, 'X-Requested-With', 'XMLHttpRequest');
        let urlResolved: string = this.ResolveUrl(url);
        urlResolved += await this.AppendUrlQueryStringCacheStatic(url);
        const request: DrapoServerRequest = new DrapoServerRequest('GET', urlResolved, requestHeaders, null, true);
        const response: DrapoServerResponse = await this.Request(request);
        const responseText: string = response.Body;
        const responseStatus: number = response.Status;
        if (responseStatus == 200) {
            return ([responseText, response.IsCacheAllowed()]);
        }
        return (null);
    }

    public async GetJSON(url: string, verb: string = "GET", data: string = null, contentType: string = null, dataKey: string = null, headers: [string, string][] = null, headersResponse: [string, string][] = null): Promise<any[]> {
        const requestHeaders: [string, string][] = [];
        this.InsertHeaders(requestHeaders, this.GetRequestHeaders());
        this.InsertHeaders(requestHeaders, headers);
        if (contentType != null)
            this.InsertHeader(requestHeaders, 'Content-Type', contentType);
        this.InsertHeader(requestHeaders, 'X-Requested-With', 'XMLHttpRequest');
        this.InsertHeader(requestHeaders, 'Cache-Control', 'no-cache, no-store, must-revalidate');
        const urlResolved: string = this.ResolveUrl(url);
        const urlResolvedTimestamp: string = this.AppendUrlQueryStringTimestamp(urlResolved);
        const cookieValues: [string, string][] = this.Application.CookieHandler.GetCookieValues();
        const request: DrapoServerRequest = new DrapoServerRequest(verb, urlResolvedTimestamp, requestHeaders, data, true);
        const response: DrapoServerResponse = await this.Request(request);
        //Redirect
        if ((200 <= response.Status) && (response.Status < 400)) {
            const location: string = this.GetHeaderValue(response.Headers, 'Location');
            if (location !== null)
                await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, 'RedirectPage(' + location + ')', this.Application.FunctionHandler.CreateExecutionContext(false));
        }
        if (response.Status == 200) {
            this.Application.CookieHandler.HandleCookieValuesChanges(cookieValues);
            if (response.Body == '')
                return (null);
            if (headersResponse !== null) {
                this.InsertHeaders(headersResponse, response.Headers);
                return (response.Body as any);
            }
            let dataResponse: any[];
            dataResponse = this.Application.Serializer.Deserialize(response.Body);
            return (dataResponse);
        } else if (response.Status == 204) {
            return (null);
        } else if (response.Status == 400) {
            //Event On BadRequest
            this.HasBadRequest = true;
            const onBadRequest: string = await this.Application.Config.GetOnBadRequest();
            if (onBadRequest !== null) {
                //Store the BadRequest
                const storageBadRequest: string = await this.Application.Config.GetStorageBadRequest();
                if (storageBadRequest !== null) {
                    const dataResponse: any[] = this.Application.Serializer.Deserialize(response.Body);
                    await this.Application.Storage.UpdateData(storageBadRequest, null, dataResponse);
                }
                await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onBadRequest, this.Application.FunctionHandler.CreateExecutionContext(false));
                return ([]);
            }
            return ([]);
        } else if (response.Status == 401) {
            if (dataKey !== null)
                await this.Application.Document.RequestAuthorization(dataKey, 'notify');
        } else if (response.Status == 500) {
            //Event On Error
            this.HasBadRequest = true;
            const onError: string = await this.Application.Config.GetOnError();
            if (onError !== null) {
                //Store the error
                const storageErrors: string = await this.Application.Config.GetStorageErrors();
                if (storageErrors !== null) {
                    const error: any = this.Application.Serializer.IsJson(response.Body) ? this.Application.Serializer.Deserialize(response.Body) : response.Body;
                    await this.Application.Storage.AddDataItem(storageErrors, null, null, this.Application.Storage.CreateErrorForStorage('DataRequest', 'Error requesting data for :' + url, error));
                }
                await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onError, this.Application.FunctionHandler.CreateExecutionContext(false));
                return ([]);
            }
            return ([]);
        }
        return ([]);
    }

    public async GetFile(url: string, dataKey: string = null, headers: [string, string][] = null, headersResponse: [string, string][] = null): Promise<any[]> {
        const requestHeaders: [string, string][] = [];
        this.InsertHeaders(requestHeaders, this.GetRequestHeaders());
        this.InsertHeaders(requestHeaders, headers);
        this.InsertHeader(requestHeaders, 'X-Requested-With', 'XMLHttpRequest');
        this.InsertHeader(requestHeaders, 'Cache-Control', 'no-cache, no-store, must-revalidate');
        const urlResolved: string = this.ResolveUrl(url);
        const urlResolvedTimestamp: string = this.AppendUrlQueryStringTimestamp(urlResolved);
        const request: DrapoServerRequest = new DrapoServerRequest('GET', urlResolvedTimestamp, requestHeaders, null, true, true);
        const response: DrapoServerResponse = await this.Request(request);
        //Redirect
        if ((200 <= response.Status) && (response.Status < 400)) {
            const location: string = this.GetHeaderValue(response.Headers, 'Location');
            if (location !== null)
                await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, 'RedirectPage(' + location + ')', this.Application.FunctionHandler.CreateExecutionContext(false));
        }
        if (response.Status == 200) {
            if (response.Body == '')
                return (null);
            if (headersResponse !== null) {
                this.InsertHeaders(headersResponse, response.Headers);
                return(this.CreateFileObject(headersResponse, response.Body));
            }
            let dataResponse: any[];
            dataResponse = this.Application.Serializer.Deserialize(response.Body);
            return (dataResponse);
        } else if (response.Status == 204) {
            return (null);
        } else if (response.Status == 400) {
            //Event On BadRequest
            this.HasBadRequest = true;
            const onBadRequest: string = await this.Application.Config.GetOnBadRequest();
            if (onBadRequest !== null) {
                //Store the BadRequest
                const storageBadRequest: string = await this.Application.Config.GetStorageBadRequest();
                if (storageBadRequest !== null) {
                    const dataResponse: any[] = this.Application.Serializer.Deserialize(response.Body);
                    await this.Application.Storage.UpdateData(storageBadRequest, null, dataResponse);
                }
                await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onBadRequest, this.Application.FunctionHandler.CreateExecutionContext(false));
                return ([]);
            }
            return ([]);
        } else if (response.Status == 401) {
            if (dataKey !== null)
                await this.Application.Document.RequestAuthorization(dataKey, 'notify');
        } else if (response.Status == 500) {
            //Event On Error
            this.HasBadRequest = true;
            const onError: string = await this.Application.Config.GetOnError();
            if (onError !== null) {
                //Store the error
                const storageErrors: string = await this.Application.Config.GetStorageErrors();
                if (storageErrors !== null) {
                    const error: any = this.Application.Serializer.IsJson(response.Body) ? this.Application.Serializer.Deserialize(response.Body) : response.Body;
                    await this.Application.Storage.AddDataItem(storageErrors, null, null, this.Application.Storage.CreateErrorForStorage('DataRequest', 'Error requesting data for :' + url, error));
                }
                await this.Application.FunctionHandler.ResolveFunctionWithoutContext(null, null, onError, this.Application.FunctionHandler.CreateExecutionContext(false));
                return ([]);
            }
            return ([]);
        }
        return ([]);
    }

    private CreateFileObject(headers: [string, string][], body: Blob): any {
        const object: any = {};
        object.body = body;
        object.length = body.size;
        for (let i: number = 0; i < headers.length; i++) {
            const header: [string, string] = headers[i];
            const key: string = header[0].toLowerCase();
            const keyClean: string = key.replace('-', '');
            const value: string = header[1];
            object[keyClean] = value;
            if (keyClean !== 'contentdisposition')
                continue;
            const contentDispositionValues: string[] = value.split(';');
            for (let j: number = 0; j < contentDispositionValues.length; j++) {
                const contentDispositionValue: string = contentDispositionValues[j];
                const contentDispositionValueClean: string = contentDispositionValue[0] === ' ' ? contentDispositionValue.substring(1) : contentDispositionValue;
                const index: number = contentDispositionValueClean.indexOf('=');
                if (index < 0)
                    continue;
                const contentDispositionValueCleanKey: string = contentDispositionValueClean.substring(0, index);
                if (contentDispositionValueCleanKey !== 'filename')
                    continue;
                let contentDispositionKeyValue: string = contentDispositionValueClean.substring(index + 1);
                if ((contentDispositionKeyValue.length > 2) && (contentDispositionKeyValue[0] === '"') && (contentDispositionKeyValue[contentDispositionKeyValue.length - 1] === '"'))
                    contentDispositionKeyValue = contentDispositionKeyValue.substring(1, contentDispositionKeyValue.length - 1);
                if ((contentDispositionKeyValue.length > 2) && (contentDispositionKeyValue[0] === "'") && (contentDispositionKeyValue[contentDispositionKeyValue.length - 1] === "'"))
                    contentDispositionKeyValue = contentDispositionKeyValue.substring(1, contentDispositionKeyValue.length - 1);
                object.filename = contentDispositionKeyValue;
                break;
            }
        }
        return (object);
    }

    private ConvertFileBody(body: string): string {
        //Delimiter
        if ((body.length > 2) && (body[0] === '"') && (body[body.length - 1] === '"'))
            return (body.substring(1, body.length - 1));
        if ((body.length > 2) && (body[0] === "'") && (body[body.length - 1] === "'"))
            return (body.substring(1, body.length - 1));
        return (btoa(body));
    }

    private async Request(request: DrapoServerRequest): Promise<DrapoServerResponse> {
        const requestDebbuger: any = await this.Application.Debugger.CreateRequest(request.Url);
        const response: DrapoServerResponse = await this.RequestInternal(request);
        await this.Application.Debugger.FinishRequest(requestDebbuger);
        return (response);
    }

    private async RequestInternal(request: DrapoServerRequest): Promise<DrapoServerResponse> {
        const application: DrapoApplication = this.Application;
        return new Promise<DrapoServerResponse>(
            (resolve, reject) => {
                const xhr: XMLHttpRequest = new XMLHttpRequest();
                xhr.withCredentials = true;
                xhr.onload = () => {
                    resolve(application.Server.CreateResponse(request, xhr));
                };
                xhr.open(request.Verb, request.Url, true);
                if (request.Headers != null) {
                    for (let i: number = 0; i < request.Headers.length; i++) {
                        const header: [string, string] = request.Headers[i];
                        xhr.setRequestHeader(header[0], application.Serializer.EnsureASCII(header[1]));
                    }
                }
                if (request.Binary)
                    xhr.responseType = 'blob';
                xhr.send(request.Body);
            });
    }

    public CreateResponse(request: DrapoServerRequest, xhr: XMLHttpRequest): DrapoServerResponse {
        const headers: [string, string][] = [];
        if (request.ExtractHeaders)
            this.ExtractHeaders(xhr, headers);
        let body: any = null;
        if (request.Binary)
            body = xhr.response;
        else
            body = xhr.responseText;
        return (new DrapoServerResponse(xhr.status, headers, body));
    }

    private ExtractHeaders(xhr: XMLHttpRequest, headers: [string, string][]): void {
        const responseHeaders: string = xhr.getAllResponseHeaders();
        const lines: string[] = this.Application.Parser.ParseLines(responseHeaders);
        for (let i: number = 0; i < lines.length; i++) {
            const line: string = lines[i];
            const header: [string, string] = this.Application.Parser.ParseHeader(line);
            if (header != null)
                headers.push(header);
        }
    }

    private InsertHeaders(headers: [string, string][], headersInsert: [string, string][]): void {
        if (headersInsert == null)
            return;
        for (let i: number = 0; i < headersInsert.length; i++) {
            const header: [string, string] = headersInsert[i];
            this.InsertHeader(headers, header[0], header[1]);
        }
    }

    private InsertHeader(headers: [string, string][], name: string, value: string): void {
        headers.push([name, value]);
    }

    private GetHeaderValue(headers: [string, string][], name: string): string {
        for (let i: number = 0; i < headers.length; i++) {
            const header: [string, string] = headers[i];
            if (header[0] === name)
                return (header[1]);
        }
        return (null);
    }

    public async SetToken(token: string): Promise<boolean> {
        if (this._token === token)
            return (false);
        this._token = token;
        if (this._token === null) {
            await this.Application.Storage.ClearDataToken();
        } else {
            await this.Application.Observer.NotifyAuthorization();
        }
        return (true);
    }

    public HasToken(): boolean {
        return (this._token != null);
    }

    private GetRequestHeaders(): [string, string][] {
        if (this._requestHeadersNext.length === 0)
            return (this._requestHeaders);
        const headers: [string, string][] = [];
        this.AddHeader(headers, this._requestHeaders);
        this.AddHeader(headers, this._requestHeadersNext);
        this._requestHeadersNext = [];
        return (headers);
    }

    private AddHeader(headers: [string, string][], headersInsert: [string, string][]): void {
        for (let i: number = 0; i < headersInsert.length; i++)
            headers.push(headersInsert[i]);
    }

    public AddRequestHeader(key: string, value: string): void {
        this._requestHeaders.push([key, value]);
    }

    public GetRequestHeader(key: string): string {
        for (let i: number = this._requestHeaders.length - 1; i >= 0; i--) {
            const header: [string, string] = this._requestHeaders[i];
            if (header[0] === key)
                return (header[1]);
        }
        return (null);
    }

    public AddNextRequestHeader(key: string, value: string): void {
        this._requestHeadersNext.push([key, value]);
    }

    public EnsureUrlEncoded(url: string): string {
        if ((url == null) || (url == ''))
            return (url);
        if (this.IsUrlEncoded(url))
            return (url);
        return (encodeURI(url));
    }

    public EnsureUrlComponentEncoded(url: string): string {
        if ((url == null) || (url == ''))
            return (url);
        if (this.IsUrlEncoded(url))
            return (url);
        return (encodeURIComponent(url));
    }

    private IsUrlEncoded(url: string): boolean {
        if ((url == null) || (url == '') || (url.indexOf == null))
            return (false);
        const hasPercentage: boolean = url.indexOf('%') >= 0;
        if (!hasPercentage)
            return (false);
        const hasPercentageEncoded: boolean = url.indexOf('%25') >= 0;
        return (hasPercentageEncoded);
    }
}
