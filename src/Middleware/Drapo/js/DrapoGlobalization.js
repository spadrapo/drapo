"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DrapoGlobalization = (function () {
    function DrapoGlobalization(application) {
        this._culture = null;
        this._resourceDayOfWeekNameShort = [];
        this._resourceDayOfWeekName = [];
        this._resourceMonthNameShort = [];
        this._resourceMonthName = [];
        this._resourceDateFormat = [];
        this._resourceNumberSizeType = [];
        this._application = application;
        this.Initialize();
    }
    Object.defineProperty(DrapoGlobalization.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoGlobalization.prototype.Initialize = function () {
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
    };
    DrapoGlobalization.prototype.InitializeResource = function (resource, culture, values) {
        resource.push([culture, values.split('_')]);
    };
    DrapoGlobalization.prototype.InitializeResourceDictionary = function (resource, culture, values) {
        resource.push([culture, values]);
    };
    DrapoGlobalization.prototype.GetLanguage = function () {
        if (navigator.language != null)
            return (navigator.language);
        return (navigator.userLanguage);
    };
    DrapoGlobalization.prototype.GetCultureNeutral = function (culture) {
        var index = culture.indexOf('-');
        if (index < 0)
            return (culture);
        return (culture.substring(0, index));
    };
    DrapoGlobalization.prototype.GetCultureCookie = function () {
        var cookieData = this.Application.CookieHandler.RetrieveData();
        if (cookieData == null)
            return ('');
        return (cookieData.culture);
    };
    DrapoGlobalization.prototype.GetCultureLanguage = function () {
        var language = this.GetLanguage();
        if (language == null)
            return (null);
        var cultureNeutral = this.GetCultureNeutral(language);
        return (cultureNeutral);
    };
    DrapoGlobalization.prototype.ReloadCulture = function () {
        return __awaiter(this, void 0, void 0, function () {
            var culture;
            return __generator(this, function (_a) {
                culture = this._culture;
                this._culture = null;
                if (culture === this.GetCulture())
                    return [2, (false)];
                return [2, (true)];
            });
        });
    };
    DrapoGlobalization.prototype.GetCulture = function () {
        if (this._culture !== null)
            return (this._culture);
        var cultureCookie = this.GetCultureCookie();
        if ((cultureCookie != null) && (cultureCookie != ''))
            return (this._culture = cultureCookie);
        var cultureLanguage = this.GetCultureLanguage();
        if ((cultureLanguage != null) && (cultureLanguage != ''))
            return (this._culture = cultureLanguage);
        this._culture = 'en';
        return (this._culture);
    };
    DrapoGlobalization.prototype.GetDelimiterDecimal = function (culture) {
        if (culture == null)
            culture = this.GetCulture();
        if (culture === 'en')
            return ('.');
        return (',');
    };
    DrapoGlobalization.prototype.GetDelimiterThousands = function (culture) {
        if (culture == null)
            culture = this.GetCulture();
        if (culture === 'en')
            return (',');
        return ('.');
    };
    DrapoGlobalization.prototype.GetDayOfWeekNameShort = function (day, culture) {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceDayOfWeekNameShort, day, culture));
    };
    DrapoGlobalization.prototype.GetDayOfWeekName = function (day, culture) {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceDayOfWeekName, day, culture));
    };
    DrapoGlobalization.prototype.GetMonthNameShort = function (day, culture) {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceMonthNameShort, day, culture));
    };
    DrapoGlobalization.prototype.GetMonthName = function (day, culture) {
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceMonthName, day, culture));
    };
    DrapoGlobalization.prototype.GetResourceValue = function (resource, index, culture) {
        var resourceCulture = this.GetResourceCulture(resource, culture);
        if (resourceCulture === null)
            return ('');
        if (resourceCulture.length < index)
            return ('');
        return (resourceCulture[index]);
    };
    DrapoGlobalization.prototype.GetResourceCulture = function (resource, culture) {
        if (culture == null)
            culture = this.GetCulture();
        for (var i = 0; i < resource.length; i++) {
            var resourceEntry = resource[i];
            if (resourceEntry[0] === culture)
                return (resourceEntry[1]);
        }
        return (null);
    };
    DrapoGlobalization.prototype.GetDateFormat = function (dateFormatType, culture) {
        var dateFormatDictionary = this.GetResourceCultureDictionary(this._resourceDateFormat, culture);
        if (dateFormatDictionary == null)
            return ('');
        return (this.GetResourceValueDictionary(dateFormatDictionary, dateFormatType));
    };
    DrapoGlobalization.prototype.GetDateFormatsRegex = function (culture) {
        if (culture === void 0) { culture = null; }
        if (culture == null)
            culture = this.GetCulture();
        var formats = [this.GetDateFormat('d', culture)];
        var formatsRegex = '';
        for (var i = 0; i < formats.length; i++) {
            var format = formats[i];
            var formatRegex = this.GetDateFormatRegex(format);
            if (formatsRegex.length > 0)
                formatsRegex += '|';
            formatsRegex += '(' + formatRegex + ')';
        }
        return ('^' + formatsRegex + '$');
    };
    DrapoGlobalization.prototype.GetDateFormatRegex = function (format) {
        format = format.replace(/\//g, '\\/');
        format = this.ReplaceDataFormatRegex(format, 'yyyy', 'year', '(\\d{4})');
        format = this.ReplaceDataFormatRegex(format, 'MM', 'month', '(\\d{1,2})');
        format = this.ReplaceDataFormatRegex(format, 'dd', 'day', '(\\d{1,2})');
        return (format);
    };
    DrapoGlobalization.prototype.GetDateFormatsRegularExpressions = function (culture) {
        if (culture === void 0) { culture = null; }
        if (culture == null)
            culture = this.GetCulture();
        var regularExpressions = [];
        if ((culture === 'pt') || (culture === 'es')) {
            var regularExpression = new DrapoRegularExpression();
            regularExpression.Expression = '^(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})$';
            regularExpression.CreateItem('(\\d{1,2})', 'day');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{1,2})', 'month');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{4})', 'year');
            regularExpressions.push(regularExpression);
        }
        else if (culture === 'en') {
            var regularExpression = new DrapoRegularExpression();
            regularExpression.Expression = '^(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})$';
            regularExpression.CreateItem('(\\d{1,2})', 'month');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{1,2})', 'day');
            regularExpression.CreateItem('\\/');
            regularExpression.CreateItem('(\\d{4})', 'year');
            regularExpressions.push(regularExpression);
        }
        return (regularExpressions);
    };
    DrapoGlobalization.prototype.ReplaceDataFormatRegex = function (format, symbol, name, expression) {
        var regex = '(?<' + name + '>' + expression + ')';
        format = format.replace(symbol, regex);
        return (format);
    };
    DrapoGlobalization.prototype.GetResourceValueDictionary = function (dictonary, dateFormatType) {
        for (var i = 0; i < dictonary.length; i++) {
            var resourceEntry = dictonary[i];
            if (resourceEntry[0] === dateFormatType)
                return (resourceEntry[1]);
        }
        return ('');
    };
    DrapoGlobalization.prototype.GetResourceCultureDictionary = function (resource, culture) {
        if (culture == null)
            culture = this.GetCulture();
        for (var i = 0; i < resource.length; i++) {
            var resourceEntry = resource[i];
            if (resourceEntry[0] == culture)
                return (resourceEntry[1]);
        }
        return (null);
    };
    DrapoGlobalization.prototype.GetNumberSizeTypeName = function (type, culture) {
        if (culture === void 0) { culture = null; }
        if (culture == null)
            culture = this.GetCulture();
        return (this.GetResourceValue(this._resourceNumberSizeType, type, culture));
    };
    return DrapoGlobalization;
}());
