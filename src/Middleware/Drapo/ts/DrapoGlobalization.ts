class DrapoGlobalization {
    //Field
    private _application: DrapoApplication;
    private _culture: string = null;
    private _resourceDayOfWeekNameShort: [string, string[]][] = [];
    private _resourceDayOfWeekName: [string, string[]][] = [];
    private _resourceMonthNameShort: [string, string[]][] = [];
    private _resourceMonthName: [string, string[]][] = [];
    private _resourceDateFormat: [string, [string, string][]][] = [];
    private _resourceNumberSizeType: [string, string[]][] = [];

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
        this.Initialize();
    }

    private Initialize(): void {
        this.InitializeResource(this._resourceDayOfWeekNameShort, 'en', 'Sun_Mon_Tue_Wed_Thu_Fri_Sat');
        this.InitializeResource(this._resourceDayOfWeekName, 'en', 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday');
        this.InitializeResource(this._resourceMonthNameShort, 'en', 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec');
        this.InitializeResource(this._resourceMonthName, 'en', 'January_February_March_April_May_June_July_August_September_October_November_December');
        this.InitializeResource(this._resourceDayOfWeekNameShort, 'pt', 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb');
        this.InitializeResource(this._resourceDayOfWeekName, 'pt', 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado');
        this.InitializeResource(this._resourceMonthNameShort, 'pt', 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez');
        this.InitializeResource(this._resourceMonthName, 'pt', 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro');
        this.InitializeResource(this._resourceDayOfWeekNameShort, 'es', 'dom_lun_mar_mié_jue_vie_sáb');
        this.InitializeResource(this._resourceDayOfWeekName, 'es', 'domingo_lunes_martes_miércoles_jueves_viernes_sábado');
        this.InitializeResource(this._resourceMonthNameShort, 'es', 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic');
        this.InitializeResource(this._resourceMonthName, 'es', 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre');
        this.InitializeResourceDictionary(this._resourceDateFormat, 'en', [['d', 'MM/dd/yyyy'], ['D', 'dddd, dd MMMM yyyy'], ['t', 'HH:mm'], ['T', 'HH:mm:ss'], ['g', 'MM/dd/yyyy HH:mm'], ['G', 'MM/dd/yyyy HH:mm:ss'], ['r', 'ddd, dd MMM yyyy HH:mm:ss']]);
        this.InitializeResourceDictionary(this._resourceDateFormat, 'pt', [['d', 'dd/MM/yyyy'], ['D', 'dddd, dd MMMM yyyy'], ['t', 'HH:mm'], ['T', 'HH:mm:ss'], ['g', 'dd/MM/yyyy HH:mm'], ['G', 'dd/MM/yyyy HH:mm:ss'], ['r', 'ddd, dd MMM yyyy HH:mm:ss']]);
        this.InitializeResourceDictionary(this._resourceDateFormat, 'es', [['d', 'dd/MM/yyyy'], ['D', 'dddd, dd MMMM yyyy'], ['t', 'HH:mm'], ['T', 'HH:mm:ss'], ['g', 'dd/MM/yyyy HH:mm'], ['G', 'dd/MM/yyyy HH:mm:ss'], ['r', 'ddd, dd MMM yyyy HH:mm:ss']]);
        this.InitializeResource(this._resourceNumberSizeType, 'pt', '_mil_mi_bi_tri');
        this.InitializeResource(this._resourceNumberSizeType, 'en', '_K_M_B_T');
        this.InitializeResource(this._resourceNumberSizeType, 'es', '_K_M_B_T');
    }

    private InitializeResource(resource: [string, string[]][], culture: string, values: string): void {
        resource.push([culture, values.split('_')]);
    }

    private InitializeResourceDictionary(resource: [string, [string, string][]][], culture: string, values: [string, string][]): void {
        resource.push([culture, values]);
    }

    private GetLanguage(): string {
        if (navigator.language != null)
            return (navigator.language);
        return ((navigator as any).userLanguage);
    }

    private GetCultureNeutral(culture: string): string {
        const index: number = culture.indexOf('-');
        if (index < 0)
            return (culture);
        return (culture.substring(0, index));
    }

    private GetCultureCookie(): string {
        const cookieData: any = this.Application.CookieHandler.RetrieveData();
        if (cookieData == null)
            return ('');
        return (cookieData.culture);
    }

    private GetCultureLanguage(): string {
        const language: string = this.GetLanguage();
        if (language == null)
            return (null);
        const cultureNeutral = this.GetCultureNeutral(language);
        return (cultureNeutral);
    }

    public async ReloadCulture(): Promise<boolean> {
        const culture: string = this._culture;
        this._culture = null;
        if (culture === this.GetCulture())
            return (false);
        //TODO:Reload all the data that is sensible to culture here
        return (true);
    }

    public GetCulture(): string {
        if (this._culture !== null)
            return (this._culture);
        //Cookie
        const cultureCookie = this.GetCultureCookie();
        if ((cultureCookie != null) && (cultureCookie != ''))
            return (this._culture = cultureCookie);
        //Language
        const cultureLanguage = this.GetCultureLanguage();
        if ((cultureLanguage != null) && (cultureLanguage != ''))
            return (this._culture = cultureLanguage);
        //Default
        this._culture = 'en';
        return (this._culture);
    }

    public GetDelimiterDecimal(culture: string): string {
        if (culture == null)
            culture = this.GetCulture();
        if (culture === 'en')
            return ('.');
        return (',');
    }

    public GetDelimiterThousands(culture: string): string {
        if (culture == null)
            culture = this.GetCulture();
        if (culture === 'en')
            return (',');
        return ('.');
    }

    public GetDayOfWeekNameShort(day: number, culture: string): string {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceDayOfWeekNameShort, day, culture));
    }

    public GetDayOfWeekName(day: number, culture: string): string {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceDayOfWeekName, day, culture));
    }

    public GetMonthNameShort(day: number, culture: string): string {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceMonthNameShort, day, culture));
    }
    public GetMonthName(day: number, culture: string): string {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceMonthName, day, culture));
    }

    private GetResourceValue(resource: [string, string[]][], index: number, culture: string): string {
        const resourceCulture: string[] = this.GetResourceCulture(resource, culture);
        if (resourceCulture === null)
            return ('');
        if (resourceCulture.length < index)
            return ('');
        return (resourceCulture[index]);
    }

    private GetResourceCulture(resource: [string, string[]][], culture: string): string[] {
        if (culture == null)
            culture = this.GetCulture();
        for (let i: number = 0; i < resource.length; i++) {
            const resourceEntry: [string, string[]] = resource[i];
            if (resourceEntry[0] === culture)
                return (resourceEntry[1]);
        }
        return (null);
    }

    public GetDateFormat(dateFormatType: string, culture: string): string {
        const dateFormatDictionary: [string, string][] = this.GetResourceCultureDictionary(this._resourceDateFormat, culture);
        if (dateFormatDictionary == null)
            return ('');
        return (this.GetResourceValueDictionary(dateFormatDictionary, dateFormatType));
    }

    public GetDateFormatsRegex(culture: string = null): string {
        if (culture == null)
            culture = this.GetCulture();
        const formats: string[] = [this.GetDateFormat('d', culture)];
        let formatsRegex: string = '';
        for (let i: number = 0; i < formats.length; i++) {
            const format: string = formats[i];
            const formatRegex: string = this.GetDateFormatRegex(format);
            if (formatsRegex.length > 0)
                formatsRegex += '|';
            formatsRegex += '(' + formatRegex + ')';
        }
        return ('^' + formatsRegex + '$');
    }

    private GetDateFormatRegex(format: string): string {
        //Slash
        format = format.replace(/\//g, '\\/');
        //Year
        format = this.ReplaceDataFormatRegex(format, 'yyyy', 'year', '(\\d{4})');
        //Month
        format = this.ReplaceDataFormatRegex(format, 'MM', 'month', '(\\d{1,2})');
        //Day
        format = this.ReplaceDataFormatRegex(format, 'dd', 'day', '(\\d{1,2})');
        return (format);
    }

    public GetDateFormatsRegularExpressions(culture: string = null): DrapoRegularExpression[] {
        if (culture == null)
            culture = this.GetCulture();
        const regularExpressions: DrapoRegularExpression[] = [];
        //TODO: This need to be based in the d format in the future
        if ((culture === 'pt') || (culture === 'es')) {
            const regularExpression: DrapoRegularExpression = new DrapoRegularExpression();
            regularExpression.Expression = '^(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})$';
            regularExpression.CreateItem('(\\d{1,2})', 'day');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{1,2})', 'month');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{4})', 'year');
            regularExpressions.push(regularExpression);
        } else if (culture === 'en') {
            const regularExpression: DrapoRegularExpression = new DrapoRegularExpression();
            regularExpression.Expression = '^(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})$';
            regularExpression.CreateItem('(\\d{1,2})', 'month');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{1,2})', 'day');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{4})', 'year');
            regularExpressions.push(regularExpression);
        }
        return (regularExpressions);
    }
    private ReplaceDataFormatRegex(format: string, symbol: string, name: string, expression: string): string {
        const regex: string = '(?<' + name + '>' + expression + ')';
        format = format.replace(symbol, regex);
        return (format);
    }

    private GetResourceValueDictionary(dictonary: [string, string][], dateFormatType: string): string {
        for (let i: number = 0; i < dictonary.length; i++) {
            const resourceEntry: [string, string] = dictonary[i];
            if (resourceEntry[0] === dateFormatType)
                return (resourceEntry[1]);
        }
        return ('');
    }

    private GetResourceCultureDictionary(resource: [string, [string, string][]][], culture: string): [string, string][] {
        if (culture == null)
            culture = this.GetCulture();
        for (let i: number = 0; i < resource.length; i++) {
            const resourceEntry: [string, [string, string][]] = resource[i];
            if (resourceEntry[0] == culture)
                return (resourceEntry[1]);
        }
        return (null);
    }

    public GetNumberSizeTypeName(type: number, culture: string = null): string {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceNumberSizeType, type, culture));
    }
}