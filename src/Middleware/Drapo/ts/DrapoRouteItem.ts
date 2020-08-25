class DrapoRouteItem
{
    private _url: string = null;
    private _sector: string = null;
    private _title: string = null;
    private _state: any = null;

    get Url(): string {
        return (this._url);
    }
    set Url(value: string) {
        this._url = value;
    }

    get Sector(): string {
        return (this._sector);
    }
    set Sector(value: string) {
        this._sector = value;
    }

    get Title(): string {
        return (this._title);
    }
    set Title(value: string) {
        this._title = value;
    }

    get State(): any {
        return (this._state);
    }
    set State(value: any) {
        this._state = value;
    }
}