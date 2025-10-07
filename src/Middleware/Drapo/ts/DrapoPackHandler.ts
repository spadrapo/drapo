class DrapoPackHandler {
    //Field
    private _application: DrapoApplication;
    private _loadedPacks: string[] = [];

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public async LoadPack(packName: string): Promise<boolean> {
        if ((packName == null) || (packName == ''))
            return (false);
        // Check if pack is already loaded
        if (this.IsPackLoaded(packName))
            return (true);
        // Check cache first
        const cachedPack = this.Application.CacheHandler.GetCachedPack(packName);
        let etag: string = null;
        if (cachedPack != null) {
            etag = cachedPack.etag;
            // If we have cached data, process it immediately
            if (cachedPack.data != null) {
                await this.ProcessPackData(packName, cachedPack.data);
                this.MarkPackAsLoaded(packName);
                return (true);
            }
        }
        // Get the pack data from the server
        const packUrl: string = `~/packs/${packName}.pack`;
        const headers: [string, string][] = [];
        if (etag != null)
            headers.push(['If-None-Match', etag]);
        const response: any = await this.Application.Server.GetJSON(packUrl, 'GET', null, 'application/json; charset=utf-8', null, headers);
        if ((response == null) || (response.files == null))
            return (false);
        // Cache the response with ETag
        this.Application.CacheHandler.SetCachedPack(packName, response, null);
        // Process the pack data
        await this.ProcessPackData(packName, response);
        this.MarkPackAsLoaded(packName);
        return (true);
    }

    public IsPackLoaded(packName: string): boolean {
        return this._loadedPacks.indexOf(packName) !== -1;
    }

    private MarkPackAsLoaded(packName: string): void {
        if (!this.IsPackLoaded(packName))
            this._loadedPacks.push(packName);
    }

    private async ProcessPackData(packName: string, packData: any): Promise<void> {
        if ((packData == null) || (packData.files == null))
            return;
        const componentFiles: { [key: string]: any[] } = {};
        // Process each file in the pack
        for (const file of packData.files) {
            if ((file.path == null) || (file.content == null))
                continue;
            // Check if this file belongs to a component
            const componentName = this.ExtractComponentNameFromPath(file.path);
            if (componentName != null) {
                if (!componentFiles[componentName])
                    componentFiles[componentName] = [];
                componentFiles[componentName].push(file);
            }
            // Place the file content in the correct location
            await this.ProcessPackFile(file.path, file.content);
        }
        // Mark components as active if all their files were loaded
        await this.MarkComponentsAsActive(componentFiles);
    }

    private ExtractComponentNameFromPath(filePath: string): string {
        // Extract component name from paths like: "~/components/mycomponent/file.js"
        const pathParts = filePath.split('/');
        if (pathParts.length >= 3 && pathParts[1] === 'components') {
            return pathParts[2];
        }
        return null;
    }

    private async MarkComponentsAsActive(componentFiles: { [key: string]: any[] }): Promise<void> {
        for (const componentName in componentFiles) {
            const files = componentFiles[componentName];
            // Check if component exists and mark it as active
            if (await this.Application.Register.IsRegisteredComponent(`d-${componentName}`)) {
                if (!this.Application.Register.IsActiveComponent(`d-${componentName}`)) {
                    // Mark as active without loading files since we already loaded them from the pack
                    this.Application.Register.MarkComponentAsActive(`d-${componentName}`);
                }
            }
        }
    }

    private async ProcessPackFile(filePath: string, content: string): Promise<void> {
        // Determine the file type and handle accordingly
        const extension = this.GetFileExtension(filePath).toLowerCase();

        if (extension === '.js') {
            // Load as JavaScript
            await this.LoadPackScript(filePath, content);
        } else if (extension === '.css') {
            // Load as CSS
            await this.LoadPackStyle(filePath, content);
        } else if (extension === '.html') {
            // Load as HTML template - could be stored for later use
            await this.LoadPackTemplate(filePath, content);
        }
    }

    private async LoadPackScript(filePath: string, content: string): Promise<void> {
        // Check if script is already loaded
        const existingScript = document.querySelector(`script[data-pack-file="${filePath}"]`);
        if (existingScript)
            return;
        // Create and inject script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = content;
        script.setAttribute('data-pack-file', filePath);
        document.head.appendChild(script);
    }

    private async LoadPackStyle(filePath: string, content: string): Promise<void> {
        // Check if style is already loaded
        const existingStyle = document.querySelector(`style[data-pack-file="${filePath}"]`);
        if (existingStyle)
            return;
        // Create and inject style element
        const style = document.createElement('style');
        style.type = 'text/css';
        style.textContent = content;
        style.setAttribute('data-pack-file', filePath);
        document.head.appendChild(style);
    }

    private async LoadPackTemplate(filePath: string, content: string): Promise<void> {
        // Determine if this is a component view
        let isComponent = false;
        let componentName: string = null;
        if (filePath.startsWith('~/components/')) {
            const pathParts = filePath.split('/');
            if (pathParts.length >= 3) {
                isComponent = true;
                componentName = pathParts[2];
            }
        }
        // Cache the HTML content in CacheHandler so it can be reused without server requests
        // Ensure the URL format matches what UpdateSector expects
        const templateUrl = filePath.startsWith('~/') ? filePath : `~/${filePath}`;
        if (isComponent && componentName) {
            this.Application.CacheHandler.SetCachedComponentView(templateUrl, content);
        } else {
            this.Application.CacheHandler.SetCachedView(templateUrl, content);
        }
    }

    private GetFileExtension(filePath: string): string {
        // Remove query string if present
        const queryIndex = filePath.indexOf('?');
        if (queryIndex !== -1) {
            filePath = filePath.substring(0, queryIndex);
        }
        const lastDot = filePath.lastIndexOf('.');
        return lastDot !== -1 ? filePath.substring(lastDot) : '';
    }
}