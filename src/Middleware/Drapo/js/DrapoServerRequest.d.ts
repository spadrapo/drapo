declare class DrapoServerRequest {
    private _verb;
    private _url;
    private _headers;
    private _body;
    private _extractHeaders;
    private _binary;
    get Verb(): string;
    set Verb(value: string);
    get Url(): string;
    set Url(value: string);
    get Headers(): [string, string][];
    set Headers(value: [string, string][]);
    get Body(): string;
    set Body(value: string);
    get ExtractHeaders(): boolean;
    set ExtractHeaders(value: boolean);
    set Binary(value: boolean);
    get Binary(): boolean;
    constructor(verb: string, url: string, headers: [string, string][], body: string, extractHeaders: boolean, binary?: boolean);
}
