declare class DrapoFormatter {
    private _application;
    get Application(): DrapoApplication;
    constructor(application: DrapoApplication);
    Format(value: string, format: string, culture?: string): string;
    private FormatDate;
    private ConvertDateFormat;
    private GetDateFormattedTokens;
    private GetDateFormattedToken;
    private EnsureLength;
    private EnsureLengthMax;
    private FormatNumber;
    private FormatNumberNumeric;
    private FormatNumberPercentage;
    private FormatNumberDecimal;
    private FormatNumberTimespan;
    private FormatNumberSize;
    private GetNumberFormattedWithCulture;
    private GetFormatTokenNumber;
}
