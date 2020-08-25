class DrapoServerRequest {
    //Fields
    private _verb: string = 'GET';
    private _url: string = null;
    private _headers: [string, string][] = [];
    private _body: string = null;
    private _extractHeaders: boolean = false;
    private _binary: boolean = false;

    //Properties
    get Verb(): string {
        return (this._verb);
    }
    set Verb(value: string) {
        this._verb = value;
    }
    get Url(): string {
        return (this._url);
    }
    set Url(value: string) {
        this._url = value;
    }
    get Headers(): [string, string][] {
        return (this._headers);
    }
    set Headers(value: [string, string][]) {
        this._headers = value;
    }
    get Body(): string {
        return (this._body);
    }
    set Body(value: string) {
        this._body = value;
    }
    get ExtractHeaders(): boolean {
        return (this._extractHeaders);
    }
    set ExtractHeaders(value: boolean) {
        this._extractHeaders = value;
    }
    set Binary(value: boolean) {
        this._binary = value;
    }
    get Binary() : boolean {
        return(this._binary);
    }
    //Constructor
    constructor(verb: string, url: string, headers: [string, string][], body: string, extractHeaders : boolean, binary : boolean = false) {
        this._verb = verb;
        this._url = url;
        this._headers = headers;
        this._body = body;
        this._extractHeaders = extractHeaders;
        this._binary = binary;
    }
}