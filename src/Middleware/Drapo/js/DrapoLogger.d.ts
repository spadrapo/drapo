declare class DrapoLogger {
    private _application;
    private _showHtml;
    private _allowVerbose;
    private _allowError;
    get Application(): DrapoApplication;
    set ShowHtml(value: boolean);
    get ShowHTML(): boolean;
    set AllowVerbose(value: boolean);
    get AllowVerbose(): boolean;
    set AllowError(value: boolean);
    get AllowError(): boolean;
    constructor(application: DrapoApplication);
    WriteVerbose(message: string, ...parameters: string[]): void;
    WriteError(message: string, parameters: string[]): Promise<void>;
    private CreateMessage;
}
