declare class DrapoSerializer {
    private readonly JSON_START;
    private readonly JSON_END;
    private readonly JSON_ARRAY_START;
    private readonly JSON_ARRAY_END;
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    IsJson(data: string): boolean;
    private IsJsonInstance;
    private IsJsonArray;
    Deserialize(data: string): any;
    Serialize(data: any | any[]): string;
    SerializeObject(data: any): string;
    EncodeHeaderFieldValue(data: string): string;
    EnsureASCII(data: string): string;
    private HasUnicode;
    private ConvertToASCII;
    EnsureUrlDecoded(value: string): string;
}
