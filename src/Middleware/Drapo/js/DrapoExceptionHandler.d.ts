declare class DrapoExceptionHandler {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    Handle(e: any, context?: string): Promise<void>;
    HandleError(message: string, ...parameters: string[]): Promise<void>;
}
