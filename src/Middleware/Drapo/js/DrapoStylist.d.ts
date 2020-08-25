declare class DrapoStylist {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    Create(values: [string, string][], name?: string): string;
    private CreateStyleName;
    private StringfyValues;
    ReloadStyles(): Promise<void>;
    private AddStyleToDocument;
}
