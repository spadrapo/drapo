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
        const stack: string = ((e != null) && (e.stack != null)) ? e.stack.toString() : ((e == null) ? '' : e.toString());
        this.Application.Diagnostics.CaptureDrapoError('Drapo - ' + message, [], stack);
        await this.Application.Log.WriteError('Drapo - ' + message + ' - Stack: ' + stack, []);
    }

    public async HandleError(message: string, ...parameters: string[]) : Promise<void>
    {
        this.Application.Diagnostics.CaptureDrapoError('Drapo - ' + message, parameters);
        await this.Application.Log.WriteError('Drapo - ' + message, parameters);
    }
}
