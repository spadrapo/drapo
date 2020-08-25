class DrapoSerializer {
    //Field
    private readonly JSON_START = '{';
    private readonly JSON_END = '}';
    private readonly JSON_ARRAY_START = '[';
    private readonly JSON_ARRAY_END = ']';

    private _application: DrapoApplication;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public IsJson(data: string): boolean {
        return ((this.IsJsonInstance(data)) || (this.IsJsonArray(data)));
    }

    private IsJsonInstance(data: string): boolean {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr(0, 1) == this.JSON_START) && (data.substr(data.length - 1, 1) == this.JSON_END));
    }

    private IsJsonArray(data: string): boolean {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr(0, 1) == this.JSON_ARRAY_START) && (data.substr(data.length - 1, 1) == this.JSON_ARRAY_END));
    }

    public Deserialize(data: string): any {
        if (!this.IsJson(data))
            return (data);
        return (JSON.parse(data));
    }

    public Serialize(data: any | any[]): string {
        if (data == null)
            return (null);
        return (JSON.stringify(data));
    }

    public SerializeObject(data: any): string {
        if (typeof data === "string")
            return (data);
        return (this.Serialize(data));
    }

    public EncodeHeaderFieldValue(data: string): string {
        if (data == null)
            return (null);
        return (data.replace(/(\r\n\t|\n|\r\t)/gm, ""));
    }

    public EnsureASCII(data: string): string {
        if (this.HasUnicode(data))
            return (this.ConvertToASCII(data));
        return (data);
    }

    private HasUnicode(data: string): boolean {
        for (let i = 0; i < data.length; i++) {
            const char: string = data[i];
            const index: number = char.charCodeAt(0);
            if (index > 127)
                return (true);
        }
        return (false);
    }

    private ConvertToASCII(data: string): string {
        let encoded: string = '';
        for (let i = 0; i < data.length; i++) {
            const char: string = data[i];
            const index: number = char.charCodeAt(0);
            encoded += '\\u' + index.toString(16).toUpperCase();
        }
        return (encoded);
    }

    public EnsureUrlDecoded(value: string): string {
        if ((value == null) || (value == '') || (value.indexOf == null))
            return (value);
        const hasPercentage: boolean = value.indexOf('%') >= 0;
        if (!hasPercentage)
            return (value);
        return (decodeURIComponent(value));
    }
}