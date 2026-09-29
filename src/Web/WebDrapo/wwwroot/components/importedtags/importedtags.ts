async function importedtagsConstructor(el: HTMLElement, app: DrapoApplication): Promise<any> {
    //Initialize
    const instance: ImportedTags = new ImportedTags(el, app);
    await instance.Initalize();
    return instance;
}

class ImportedTags {
    constructor(el: HTMLElement, app: any) {
    }

    public async Initalize(): Promise<void> {
    }

}
