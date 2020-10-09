class DrapoCookieHandler {
    //Field
    private _application: DrapoApplication;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public RetrieveData(name: string = 'drapo'): any {
        //Create
        const data = this.CreateStructure(name);
        //Values
        const values: [string, string][] = this.GetCookieValues(name);
        //Assign
        for (let i = 0; i < values.length; i++) {
            const value: [string, string] = values[i];
            data[value[0]] = value[1];
        }
        return (data);
    }

    private CreateStructure(name: string): any {
        const object: any = {};
        //Drapo Cookie
        if (name.toLowerCase() == 'drapo') {
            object.theme = '';
            object.view = '';
            object.culture = '';
        }
        return (object);
    }

    public GetCookieValues(name: string = 'drapo'): [string, string][] {
        const values: [string, string][] = [];
        const cookieValue: string = this.GetCookieValue(name);
        if (cookieValue == null)
            return (values);
        return (this.CreateCookieValues(cookieValue));
    }

    private GetCookieValue(name: string): string {
        const nameEqual: string = name + "=";
        const cookies: string[] = document.cookie.split(';');
        for (let i: number = 0; i < cookies.length; i++) {
            let cookie: string = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(nameEqual) == 0) {
                return (cookie.substring(nameEqual.length, cookie.length));
            }
        }
        return (null);
    }

    private CreateCookieValues(value: string): [string, string][] {
        const valueDecoded: string = this.Application.Serializer.EnsureUrlDecoded(value);
        const values: [string, string][] = [];
        const keyValues: string[] = valueDecoded.split('&');
        for (let i: number = 0; i < keyValues.length; i++) {
            const keyValue = keyValues[i];
            const index: number = keyValue.indexOf('=');
            if (index < 0)
                continue;
            values.push([keyValue.substring(0, index), keyValue.substring(index + 1)]);
        }
        return (values);
    }

    public SetCookieValue(dataItem: DrapoStorageItem): boolean {
        if (dataItem.Data == null)
            return (false);
        const data: string = this.CreateCookieValue(dataItem.Data);
        return (this.SetDocumentCookie(dataItem.CookieName, data));
    }

    private CreateCookieValue(object: any): string {
        let data: string = '';
        for (const name in object) {
            const value = object[name];
            if (value == null)
                continue;
            if (data.length > 0)
                data = data + '&';
            data = data + name + '=' + value;
        }
        return (data);
    }

    private SetDocumentCookie(name: string, value: string): boolean {
        document.cookie = name + "=" + value + ";expires=Thu, 03 Jun 2980 00:00:00 UTC;path=/";
        return (true);
    }

    public async HandleCookieValuesChanges(cookieValuesBefore: [string, string][]): Promise<boolean> {
        const cookieValues: [string, string][] = this.GetCookieValues();
        const namesChanged: string[] = this.GetCookieValuesNamedChanged(cookieValuesBefore, cookieValues);
        for (let i: number = 0; i < namesChanged.length; i++)
            await this.HandleCookieValueChange(namesChanged[i]);
        return (namesChanged.length > 0);
    }

    private async HandleCookieValueChange(name: string): Promise<void> {
        if (name === 'culture')
            await this.Application.Globalization.ReloadCulture();
        else if (name === 'theme')
            await this.Application.Stylist.ReloadStyles();
    }

    private GetCookieValuesNamedChanged(cookieValuesBefore: [string, string][], cookieValues: [string, string][]): string[] {
        const changesNames: string[] = [];
        for (let i: number = 0; i < cookieValues.length; i++) {
            const cookieValue: [string, string] = cookieValues[i];
            const name: string = cookieValue[0];
            const value: string = cookieValue[1];
            if (this.HasCookieValueChanged(cookieValuesBefore, name, value))
                changesNames.push(name);
        }
        return (changesNames);
    }

    private HasCookieValueChanged(cookieValues: [string, string][], name: string, value: string): boolean {
        for (let i: number = 0; i < cookieValues.length; i++) {
            const cookieValue: [string, string] = cookieValues[i];
            const nameCurrent: string = cookieValue[0];
            if (name !== nameCurrent)
                continue;
            const valueCurrent: string = cookieValue[1];
            return (value !== valueCurrent);
        }
        return (true);
    }

    public GetTheme(): string {
        const cookieData: any = this.Application.CookieHandler.RetrieveData();
        if (cookieData == null)
            return ('');
        return (cookieData.theme);
    }

    public GetView(): string {
        const cookieData: any = this.Application.CookieHandler.RetrieveData();
        if (cookieData == null)
            return ('');
        return (cookieData.view);
    }
}