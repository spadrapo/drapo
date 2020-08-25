class DrapoStylist {
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

    public Create(values: [string, string][], name: string = null) : string
    {
        const styleName: string = ((name === null) || (name === '')) ? this.CreateStyleName() : name;
        const elStyle: HTMLStyleElement = document.createElement('style');
        elStyle.id = styleName;
        elStyle.type = 'text/css';
        const style: string = this.StringfyValues(values);
        elStyle.innerHTML = '.' + styleName + ' \n{\n ' + style +' }';
        document.head.appendChild(elStyle);
        return (styleName);
    }

    private CreateStyleName() : string
    {
        return ('s-' + this.Application.Document.CreateGuid());
    }

    private StringfyValues(values: [string, string][]): string
    {
        let valueText: string = '';
        for (let i: number = 0; i < values.length; i++)
        {
            const entry: [string, string] = values[i];
            const valueEntry: string = entry[0] + ':' + entry[1] + ';\n';
            valueText += valueEntry;
        }
        return (valueText);
    }

    public async ReloadStyles(): Promise<void> {
        const reloaded: string[] = [];
        const length: number = document.head.childNodes.length;
        for (let i: number = 0; i < length; i++)
        {
            const childNode: ChildNode = document.head.childNodes[i];
            if (childNode.nodeName.toLowerCase() !== 'link')
                continue;
            const link: HTMLLinkElement = childNode as HTMLLinkElement;
            const url: string = link.href;
            if (reloaded.indexOf(url) >= 0)
                continue;
            reloaded.push(url);
            document.head.removeChild(childNode);
            await this.AddStyleToDocument(url);
            if (i === length - 1)
                break;
            i--;
        }
    }

    private async AddStyleToDocument(url : string): Promise<void> {
        const link: HTMLLinkElement = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
}