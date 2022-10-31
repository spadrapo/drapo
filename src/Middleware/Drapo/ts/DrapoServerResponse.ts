class DrapoServerResponse {
    //Fields
    private _status: number = null;
    private _headers: [string, string][] = [];
    private _body: any = null;
    private _cookies: [string, string][] = null;

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
            if (value == 'no-cache')
                return (false);
        }
        return (true);
    }

    public GetCookieValue(name: string): string {
        const cookies: [string, string][] = this.GetCookies();
        for (let i: number = 0; i < cookies.length; i++)
            if (cookies[i][0] === name)
                return (cookies[i][1]);
        return (null);
    }

    private GetCookies(): [string, string][]{
        if (this._cookies == null)
            this._cookies = this.GetCookiesInternal();
        return (this._cookies);
    }

    private GetCookiesInternal(): [string, string][] {
        const cookies: [string, string][] = [];
        for (let i: number = 0; i < this._headers.length; i++) {
            const header: [string, string] = this._headers[i];
            if (header[0].toLowerCase() !== 'set-cookie')
                continue;
            const headerCookies: string = header[1];
            const cookiesList: string[] = headerCookies.split(';');
            for (let j: number = 0; j < cookiesList.length; j++) {
                const cookie: string = cookiesList[j];
                const cookieParts: string[] = cookie.split('=');
                cookies.push([cookieParts[0],cookieParts[1]]);
            }
        }
        return (cookies);
    }
}