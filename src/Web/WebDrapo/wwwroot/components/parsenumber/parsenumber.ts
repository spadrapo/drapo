async function parsenumberConstructor(el: HTMLElement, app: DrapoApplication): Promise<void> {
    const value: string = el.getAttribute("dc-value");
    const culture: string = el.getAttribute("dc-culture");
    const numberParsed: number = app.Parser.ParseNumberCulture(value, culture);
    const valueFormat : string = app.Formatter.Format(numberParsed.toString(), "N2", "en");
    el.textContent = valueFormat;
}