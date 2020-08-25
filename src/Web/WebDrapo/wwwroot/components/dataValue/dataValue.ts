async function datavalueConstructor(el: HTMLElement, app: any): Promise<void> {
    let mustache = el.getAttribute("d-dataValue");
    let sector = app._document.GetSector(el);
    const data: any = await app._storage.RetrieveDataValue(sector, mustache);
    el.textContent = 'Data: ' + data;
}