async function parsenumberConstructor(el: HTMLElement, app: DrapoApplication): Promise<void> {
    const value: string = el.getAttribute("dc-value");
    const culture: string = el.getAttribute("dc-culture");
    const format: string = el.getAttribute("dc-format");
    const numberParsed: number = app.Parser.ParseNumberCulture(value, culture);
    if (format == null || format === '') {
        const valueFormat: string = app.Formatter.Format(numberParsed.toString(), "N2", "en");
        el.textContent = valueFormat;
    }
    else {
        const valueFormat: string = app.Formatter.Format(numberParsed.toString(), format, "en");
        el.textContent = valueFormat;
    }
}