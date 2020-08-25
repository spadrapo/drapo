async function parsepercentageConstructor(el: HTMLElement, app: DrapoApplication): Promise<void> {
    const value: string = el.getAttribute("dc-value");
    const culture: string = el.getAttribute("dc-culture");
    const numberParsed: number = app.Parser.ParseNumberPercentageCulture(value, culture);
    const numberParsedPercentage: number = numberParsed / 100;
    const valueFormat: string = app.Formatter.Format(numberParsedPercentage.toString(), "P", "en");
    el.textContent = valueFormat;
}