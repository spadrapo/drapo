class DrapoFormatter {
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

    public Format(value: string, format: string, culture: string = null, applyTimezone: boolean = null): string {
        if ((value == null) || (value === ''))
            return ('');
        if (this.Application.Parser.IsBoolean(value))
            return (value);
        if (this.Application.Parser.IsNumber(value))
            return (this.FormatNumber(this.Application.Parser.ParseNumber(value), format, culture));
        return (this.FormatDate(value, format, culture, applyTimezone == null ? true : applyTimezone));
    }

    private FormatDate(value: string, format: string, culture: string, applyTimezone: boolean): string {
        const date: Date = this.Application.Parser.ParseDate(value);
        if (date === null)
            return (value);
        if (applyTimezone) {
            const timeZone: number = this.Application.Config.GetTimezone();
            if (timeZone != null)
                date.setHours(date.getHours() + timeZone);
        }
        const formatConverted: string = this.ConvertDateFormat(format, culture);
        const formatTokens: string[] = this.Application.Parser.ParseFormat(formatConverted);
        const dateFormatted: string = this.GetDateFormattedTokens(date, formatTokens, culture);
        return (dateFormatted);
    }

    private ConvertDateFormat(format: string, culture: string): string {
        let formatConverted: string = format;
        switch (format) {
            case "d":
            case "D":
            case "t":
            case "T":
            case "g":
            case "G":
            case "r":
                formatConverted = this.Application.Globalization.GetDateFormat(format, culture);
                break;
        }
        return (formatConverted);
    }

    private GetDateFormattedTokens(date: Date, formatTokens: string[], culture: string): string {
        let dateCulture: string = '';
        for (let i: number = 0; i < formatTokens.length; i++) {
            const formatToken: string = formatTokens[i];
            dateCulture = dateCulture + this.GetDateFormattedToken(date, formatToken, culture);
        }
        return (dateCulture);
    }

    private GetDateFormattedToken(date: Date, formatToken: string, culture: string): string {
        let dateFormat: string = formatToken;
        switch (formatToken) {
            case 'YYYY':
            case 'yyyy':
                dateFormat = date.getFullYear().toString();
                break;
            case 'YY':
            case 'yy':
                const yearFull: string = date.getFullYear().toString();
                dateFormat = yearFull.substring(2);
                break;
            case 'M':
                dateFormat = (date.getMonth() + 1).toString();
                break;
            case 'MM':
                dateFormat = this.EnsureLength((date.getMonth() + 1).toString());
                break;
            case 'MMM':
                dateFormat = this.Application.Globalization.GetMonthNameShort(date.getMonth(), culture);
                break;
            case 'MMMM':
                dateFormat = this.Application.Globalization.GetMonthName(date.getMonth(), culture);
                break;
            case 'D':
            case 'd':
                dateFormat = (date.getDate()).toString();
            case 'DD':
            case 'dd':
                dateFormat = this.EnsureLength((date.getDate()).toString());
                break;
            case 'DDD':
            case 'ddd':
                dateFormat = this.Application.Globalization.GetDayOfWeekNameShort(date.getDay(), culture);
                break;
            case 'DDDD':
            case 'dddd':
                dateFormat = this.Application.Globalization.GetDayOfWeekName(date.getDay(), culture);
                break;
            case 'h':
                let hours = date.getHours();
                if (hours === 0)
                    hours = 12; // midnight should be 12 AM
                else if (hours > 12)
                    hours = hours - 12; // afternoon hours
                dateFormat = hours.toString();
                break;
            case 'hh':
                let hoursDouble = date.getHours();
                if (hoursDouble === 0)
                    hoursDouble = 12; // midnight should be 12 AM
                else if (hoursDouble > 12)
                    hoursDouble = hoursDouble - 12; // afternoon hours
                dateFormat = this.EnsureLength(hoursDouble.toString());
                break;
            case 'H':
                dateFormat = date.getHours().toString();
                break;
            case 'HH':
                dateFormat = this.EnsureLength(date.getHours().toString());
                break;
            case 'm':
                dateFormat = date.getMinutes().toString();
                break;
            case 'mm':
                dateFormat = this.EnsureLength(date.getMinutes().toString());
                break;
            case 's':
                dateFormat = date.getSeconds().toString();
            case 'ss':
                dateFormat = this.EnsureLength(date.getSeconds().toString());
                break;
            case 'f':
            case 'F':
                dateFormat = this.EnsureLengthMax(date.getMilliseconds().toString(), 1);
                break;
            case 'ff':
            case 'FF':
                dateFormat = this.EnsureLengthMax(date.getMilliseconds().toString(), 2);
                break;
            case 'fff':
            case 'FFF':
                dateFormat = this.EnsureLengthMax(date.getMilliseconds().toString(), 3);
                break;
            case 'tt':
                dateFormat = this.Application.Globalization.GetAmPm(date.getHours() < 12, culture);
                break;
            case 't':
                const ampm = this.Application.Globalization.GetAmPm(date.getHours() < 12, culture);
                dateFormat = ampm.charAt(0);
                break;
        }
        return (dateFormat);
    }

    private EnsureLength(data: string, length: number = 2) {
        while (data.length < length)
            data = '0' + data;
        return (data);
    }

    private EnsureLengthMax(data: string, length: number) {
        if (data.length > length)
            return (data.substring(0, length));
        return (data);
    }

    private FormatNumber(value: number, format: string, culture: string): string {
        const formatTokens: string[] = this.Application.Parser.ParseFormat(format);
        if (formatTokens.length == 0)
            return (value.toString());
        const formatTokenType = formatTokens[0];
        //N
        if ((formatTokenType === 'N') || (formatTokenType === 'n'))
            return (this.FormatNumberNumeric(value, formatTokens, culture));
        //P
        if ((formatTokenType === 'P') || (formatTokenType === 'p'))
            return (this.FormatNumberPercentage(value, formatTokens, culture));
        //D
        if ((formatTokenType === 'D') || (formatTokenType === 'd'))
            return (this.FormatNumberDecimal(value, formatTokens, culture));
        //T
        if ((formatTokenType === 'T') || (formatTokenType === 't'))
            return (this.FormatNumberTimespan(value, formatTokens, culture));
        //S
        if ((formatTokenType === 'S') || (formatTokenType === 's'))
            return (this.FormatNumberSize(value, formatTokens, culture));
        return (value.toString());
    }

    private FormatNumberNumeric(value: number, formatTokens: string[], culture: string): string {
        const decimals: number = this.GetFormatTokenNumber(formatTokens, 1, 2);
        const isNegative: boolean = value < 0;
        const valueAbsolute: number = Math.abs(value);
        const valueDecimals = valueAbsolute.toFixed(decimals);
        const valueDecimalsWithCulture: string = this.GetNumberFormattedWithCulture(valueDecimals, culture);
        return ((isNegative ? '-' : '') + valueDecimalsWithCulture);
    }
    private FormatNumberPercentage(value: number, formatTokens: string[], culture: string): string {
        const decimals: number = this.GetFormatTokenNumber(formatTokens, 1, 2);
        const isNegative: boolean = value < 0;
        const valueAbsolute: number = Math.abs(value);
        const valueDecimals = (valueAbsolute * 100).toFixed(decimals);
        const valueDecimalsWithCulture: string = this.GetNumberFormattedWithCulture(valueDecimals, culture);
        return ((isNegative ? '-' : '') + valueDecimalsWithCulture + ' %');
    }

    private FormatNumberDecimal(value: number, formatTokens: string[], culture: string): string {
        const decimals: number = this.GetFormatTokenNumber(formatTokens, 1, 1);
        const isNegative: boolean = value < 0;
        const valueAbsolute: number = Math.abs(value);
        const valueDecimals = this.EnsureLength(valueAbsolute.toFixed(0), decimals);
        const valueDecimalsWithCulture: string = this.GetNumberFormattedWithCulture(valueDecimals, culture);
        return ((isNegative ? '-' : '') + valueDecimalsWithCulture);
    }

    private FormatNumberTimespan(value: number, formatTokens: string[], culture: string): string {
        if (value === 0)
            return ('');
        if (value < 0)
            return (((formatTokens != null) && (formatTokens.length > 1)) ? formatTokens[1] : '');
        if (value < 1000)
            return (value.toString() + 'ms');
        if (value < (1000 * 60)) {
            const seconds: number = Math.floor(value / 1000);
            return (seconds.toString() + 's');
        }
        if (value < (1000 * 60 * 60)) {
            const minutes: number = Math.floor(value / (1000 * 60));
            return (minutes.toString() + 'm' + this.FormatNumberTimespan(value - (minutes * 1000 * 60), null, culture));
        }
        if (value < (1000 * 60 * 60 * 24)) {
            const hours: number = Math.floor(value / (1000 * 60 * 60));
            return (hours.toString() + 'h' + this.FormatNumberTimespan(value - (hours * 1000 * 60 * 60), null, culture));
        }
        const days: number = Math.floor(value / (1000 * 60 * 60 * 24));
        return (days.toString() + 'd' + this.FormatNumberTimespan(value - (days * 1000 * 60 * 60 * 24), null, culture));    }

    private FormatNumberSize(value: number, formatTokens: string[], culture: string): string {
        let type: number = 0;
        let valueSize: number = value;
        while (valueSize > 1000)
        {
            valueSize = valueSize / 1000;
            type++;
        }
        return (valueSize.toString() + this.Application.Globalization.GetNumberSizeTypeName(type, culture));
    }

    private GetNumberFormattedWithCulture(value: string, culture: string): string {
        const delimiterDecimal: string = this.Application.Globalization.GetDelimiterDecimal(culture);
        const delimiterThousandes: string = this.Application.Globalization.GetDelimiterThousands(culture);
        if (delimiterDecimal !== '.')
            value = value.replace('.', delimiterDecimal);
        let index: number = value.indexOf(delimiterDecimal);
        if (index === -1)
            index = value.length;
        for (let i: number = index - 3; i > 0; i = i - 3)
            value = value.substring(0, i) + delimiterThousandes + value.substring(i);
        return (value);
    }

    private GetFormatTokenNumber(formatTokens: string[], index: number, valueDefault: number): number {
        if (index >= formatTokens.length)
            return (valueDefault);
        const token: string = formatTokens[index];
        return (this.Application.Parser.ParseNumber(token, valueDefault));
    }
}