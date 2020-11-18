declare class DrapoServerResponse {
    private _status;
    private _headers;
    private _body;
    get Status(): number;
    set Status(value: number);
    get Headers(): [string, string][];
    set Headers(value: [string, string][]);
    get Body(): any;
    set Body(value: any);
    constructor(status: number, headers: [string, string][], body: any);
    IsCacheAllowed(): boolean;
}
