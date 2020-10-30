class DrapoServerResponse {
    //Fields
    private _status: number = null;
    private _headers: [string, string][] = [];
    private _body: any = null;

    //Properties
    get Status(): number {
        return (this._status);
    }
    set Status(value: number) {
        this._status = value;
    }
    get Headers(): [string, string][] {
        return (this._headers);
    }
    set Headers(value: [string, string][]) {
        this._headers = value;
    }
    get Body(): any {
        return (this._body);
    }
    set Body(value: any) {
        this._body = value;
    }
    //Constructor
    constructor(status: number, headers: [string, string][], body: any) {
        this._status = status;
        this._headers = headers;
        this._body = body;
    }

    public IsCacheAllowed() : boolean {
        if (this._headers == null)
            return (true);
        for (let i: number = 0; i < this._headers.length; i++) {
            const entry: [string, string] = this._headers[i];
            const key: string = entry[0].toLowerCase();
            if (key != 'cache-control')
                continue;
            const value: string = entry[1].toLowerCase();
            if (value == 'no-store')
                return (false);
        }
        return (true);
    }
}