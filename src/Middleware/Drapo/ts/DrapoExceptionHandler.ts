class DrapoExceptionHandler {
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

    public async Handle(e: any, context: string = null): Promise<void> {
        const message: string = context != null ? context: 'DrapoExceptionHandler - Handle - Exception';
        await this.Application.Log.WriteError('Drapo - ' + message + ' - Stack: ' + e.stack.toString(), []);
    }

    public async HandleError(message: string, ...parameters: string[]) : Promise<void>
    {
        await this.Application.Log.WriteError('Drapo - ' + message, parameters);
    }
}