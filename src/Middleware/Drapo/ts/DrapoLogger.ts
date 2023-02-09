class DrapoLogger {
    //Field
    private _application: DrapoApplication;
    private _showHtml: boolean = false;
    private _allowVerbose: boolean = false;
    private _allowError: boolean = true;
    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }
    set ShowHtml(value : boolean)
    {
        this._showHtml = value;
    }
    get ShowHTML(): boolean {
        return (this._showHtml);
    }

    set AllowVerbose(value: boolean) {
        this._allowVerbose = value;
    }
    get AllowVerbose(): boolean {
        return (this._allowVerbose);
    }

    set AllowError(value: boolean) {
        this._allowError = value;
    }
    get AllowError(): boolean {
        return (this._allowError);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public WriteVerbose(message: string, ...parameters: string[]): void {
        if (this.AllowVerbose)// tslint:disable-next-line:no-console
            console.log(this.CreateMessage(message, parameters));
    }

    public async WriteError(message: string, parameters: string[]): Promise<void> {
        const error: string = this.CreateMessage(message, parameters);
        await this.Application.Debugger.AddError(error);
    }

    private CreateMessage(message: string, parameters: string[]) : string
    {
        let messageReplaced: string = message;
        for (let i = 0; i < parameters.length; i++)
            messageReplaced = messageReplaced.replace("{" + i + "}", parameters[i]);
        return (messageReplaced);
    }
}
