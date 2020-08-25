async function parsedateConstructor(el: HTMLElement, app: DrapoApplication): Promise<void> {
    const value: string = el.getAttribute("dc-value");
    const culture: string = el.getAttribute("dc-culture");
    const format: string = el.getAttribute("dc-format");
    const date : Date = app.Parser.ParseDateCulture(value, culture);
    const dateFormat: string = date != null ? app.Formatter.Format(date.toISOString(), format, culture) : 'invalid';
    el.textContent = dateFormat;
}