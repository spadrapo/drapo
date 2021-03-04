/// <reference path="../typings/index.d.ts" />

class DrapoParser {
    //Field
    private readonly MUSTACHE_START = '{{';
    private readonly MUSTACHE_START_OVERFLOW = '{{{';
    private readonly MUSTACHE_END = '}}';
    private readonly MUSTACHE_INDEXER_START = '[';
    private readonly MUSTACHE_INDEXER_END = ']';
    private readonly ITERATOR_START = '(';
    private readonly ITERATOR_END = ')';
    private readonly CLASS_START = '{';
    private readonly CLASS_END = '}';
    private _application: DrapoApplication;
    private readonly _tokensStart: string[] = [' ', '{', '=', '!', '<', '>', '&', '|', '-', '+', '*', '/'];
    private readonly _tokensBlock: string[][] = [['&', '&'], ['|', '|'], ['!', '='], ['>', '='], ['<', '=']];
    private readonly _tokensComparator: string[] = ['=', '!=', '>', '>=', '<', '<=', 'LIKE'];
    private readonly _tokensLogical: string[] = ['&&', '||'];
    private readonly _tokensArithmetic: string[] = ['+', '-', '*', '/'];
    private readonly _canUseRegexGroups: boolean = false;

    //Properties
    get Application(): DrapoApplication {
        return (this._application);
    }

    //Constructors
    constructor(application: DrapoApplication) {
        this._application = application;
    }

    public Tokenize(data: string, splitter: string = " "): string[] {
        if (data == null)
            return (null);
        return (data.split(splitter));
    }

    public ParseFor(data: string): string[] {
        const parse: string[] = this.Tokenize(data);
        if (parse == null)
            return (null);
        if (parse.length != 3) {
            // tslint:disable-next-line:no-floating-promises
            this.Application.ExceptionHandler.HandleError('The for syntax is wrong. Waiting 3 arguments in : {0} ', data);
            return (null);
        }
        if (parse[1] != 'in') {
            // tslint:disable-next-line:no-floating-promises
            this.Application.ExceptionHandler.HandleError('The for syntax is wrong. Expecting "in" in the second argument: {0} ', data);
            return (null);
        }
        return (parse);
    }

    public ParseForIterable(data: string): string[] {
        const parse: string[] = this.Tokenize(data, '.');
        return (parse);
    }

    public ParseMustaches(data: string, checkEmbedded: boolean = false): string[] {
        const mustaches: string[] = this.ParseMustachesInternal(data);
        if (!checkEmbedded)
            return (mustaches);
        for (let i: number = 0; i < mustaches.length; i++) {
            const mustache: string = mustaches[i];
            const mustachesEmbedded: string[] = this.ParseMustachesInternal(mustache.substr(2, mustache.length - 4));
            for (let j: number = 0; j < mustachesEmbedded.length; j++)
                mustaches.push(mustachesEmbedded[j]);
        }
        return (mustaches);
    }

    private ParseMustachesInternal(data: string): string[] {
        const mustaches: string[] = [];
        let opened: number = 0;
        const length: number = data.length - 1;
        let start: number = 0;
        for (let i: number = 0; i < length; i++) {
            const block = data.substr(i, 2);
            if (block === this.MUSTACHE_START) {
                if (opened === 0)
                    start = i;
                opened++;
                i++;
            } else if (block === this.MUSTACHE_END) {
                opened--;
                i++;
                if (opened !== 0)
                    continue;
                let mustache = data.substring(start, i + 1);
                while (mustache.indexOf(this.MUSTACHE_START_OVERFLOW) === 0)
                    mustache = mustache.substring(1);
                mustaches.push(mustache);
            }
        }
        return (mustaches);
    }

    public IsMustache(data: string): boolean {
        if (data === null)
            return (false);
        if (!((typeof data === 'string') || (data as any instanceof String)))
            return (false);
        if (data.length < 4)
            return (false);
        return ((data.substr(0, 2) == this.MUSTACHE_START) && (data.substr(data.length - 2, 2) == this.MUSTACHE_END));
    }

    public IsMustacheContentValid(data: string): boolean {
        if (!this.IsMustache(data))
            return (false);
        return ((this.GetMatchs(data, this.MUSTACHE_START)) === (this.GetMatchs(data, this.MUSTACHE_END)));
    }

    public IsMustacheIndexer(data: string): boolean {
        if (data === null)
            return (false);
        if (data.length < 3)
            return (false);
        if (data[0] !== this.MUSTACHE_INDEXER_START)
            return (false);
        if (data[data.length - 1] !== this.MUSTACHE_INDEXER_END)
            return (false);
        return (this.IsMustache(data.substring(this.MUSTACHE_INDEXER_START.length, data.length - this.MUSTACHE_INDEXER_END.length)));
    }

    public GetMustacheInsideIndexer(data: string): string {
        return (data.substring(this.MUSTACHE_INDEXER_START.length, data.length - this.MUSTACHE_INDEXER_END.length));
    }

    public CreateMustacheIndexer(data: string): string {
        return (this.MUSTACHE_INDEXER_START + data + this.MUSTACHE_INDEXER_END);
    }

    private GetMatchs(data: string, search: string): number {
        let hits: number = 0;
        let indexStart: number = 0;
        while ((indexStart = data.indexOf(search, indexStart)) >= 0) {
            hits++;
            indexStart = indexStart + search.length;
        }
        return (hits);
    }

    public HasMustache(data: string): boolean {
        if (data === null)
            return (false);
        if (!((typeof data === 'string') || (data as any instanceof String)))
            return (false);
        return (data.indexOf(this.MUSTACHE_START) > -1);
    }

    public ParseMustache(data: string): string[] {
        const mustache: string = data.substr(2, data.length - 4);
        const mustacheFields: string[] = [];
        let opened: number = 0;
        const length: number = data.length;
        let start: number = 0;
        for (let i: number = 0; i < length; i++) {
            const block = mustache.substr(i, 2);
            if (block === this.MUSTACHE_START) {
                opened++;
                i++;
            } else if (block === this.MUSTACHE_END) {
                opened--;
                i++;
            } else if ((opened === 0) && (mustache[i] === '.')) {
                mustacheFields.push(mustache.substring(start, i));
                start = i + 1;
            }
        }
        if (start !== length)
            mustacheFields.push(mustache.substring(start, length));
        return (mustacheFields);
    }

    public ParseProperty(data: string): string[] {
        return (this.Tokenize(data, '-'));
    }

    public ParsePath(data: string): string[] {
        return (this.Tokenize(data, '.'));
    }

    public HasFunction(data: string): boolean {
        const functions: string[] = this.ParseFunctions(data);
        for (let i: number = 0; i < functions.length; i++)
            if (this.IsFunction(functions[i]))
                return (true);
        return (false);
    }

    public IsFunction(data: string): boolean {
        const functionParsed: DrapoFunction = this.ParseFunction(data, false);
        return (functionParsed != null);
    }

    public ParseFunctionsPartial(data: string): string[] {
        const functions: string[] = [];
        let buffer: string = '';
        let blockCount: number = 0;
        for (let i: number = 0; i < data.length; i++) {
            const chr: string = data[i];
            if (chr === '(') {
                blockCount++;
                buffer += chr;
            } else if (chr === ')') {
                blockCount--;
                buffer += chr;
                if (blockCount === 0) {
                    if (buffer[0] !== '(')
                        functions.push(buffer);
                    buffer = '';
                }
            } else if ((blockCount === 0) && (this.IsFunctionPartialDelimiter(chr))) {
                buffer = '';
            } else {
                buffer += chr;
            }
        }
        return (functions);
    }

    private IsFunctionPartialDelimiter(data: string): boolean {
        if (data === ' ')
            return (true);
        if (data === ':')
            return (true);
        if (data === ';')
            return (true);
        return (false);
    }

    public ParseFunctions(data: string): string[] {
        const functions: string[] = this.ParseBlock(data, ';');
        for (let i: number = functions.length - 1; i >= 0; i--) {
            const functionText: string = functions[i];
            const functionStartIndex: number = this.GetFunctionStart(functionText);
            if (functionStartIndex === 0)
                continue;
            functions[i] = functionText.substring(functionStartIndex);
        }
        return (functions);
    }

    private GetFunctionStart(functionText: string): number {
        for (let i: number = 0; i < functionText.length; i++)
            if (this.IsFunctionStartValid(functionText[i]))
                return (i);
        return (functionText.length);
    }

    private IsFunctionStartValid(character: string): boolean {
        if (character === ' ')
            return (false);
        if (character === '!')
            return (false);
        return (true);
    }

    public ParseFunction(data: string, checkParameters: boolean = true): DrapoFunction {
        const indexStart = data.indexOf('(');
        if (indexStart <= 0)
            return (null);
        if (data[data.length - 1] !== ')')
            return (null);
        const functionParsed: DrapoFunction = new DrapoFunction();
        functionParsed.Name = data.substr(0, indexStart).toLowerCase();
        functionParsed.Parameters = this.ParseParameters(data.substr(indexStart + 1, (data.length - (indexStart + 2))));
        if (!checkParameters)
            return (functionParsed);
        for (let i: number = functionParsed.Parameters.length - 1; i >= 0; i--)
            if (!this.IsValidFunctionParameter(functionParsed.Parameters[i]))
                return (null);
        return (functionParsed);
    }

    public ParseParameters(data: string): string[] {
        return (this.ParseBlock(data, ','));
    }

    public ParseBlock(data: string, delimiter: string): string[] {
        const items: string[] = [];
        let buffer: string = '';
        let blockCount: number = 0;
        for (let i: number = 0; i < data.length; i++) {
            const chr: string = data[i];
            if (chr === '(') {
                blockCount++;
                buffer += chr;
            } else if (chr === ')') {
                blockCount--;
                buffer += chr;
            } else if (chr === delimiter) {
                if (blockCount === 0) {
                    items.push(buffer);
                    buffer = '';
                } else {
                    buffer += chr;
                }
            } else {
                buffer += chr;
            }
        }
        if (data.length > 0)
            items.push(buffer);
        return (items);
    }

    public ParseBlockMathematicalExpression(data: string): string[] {
        const items: string[] = [];
        let buffer: string = '';
        let blockCount: number = 0;
        for (let i: number = 0; i < data.length; i++) {
            const chr: string = data[i];
            if (chr === '(') {
                if (blockCount === 0) {
                    if (buffer.length > 0)
                        items.push(buffer);
                    buffer = '';
                }
                blockCount++;
                buffer += chr;
            } else if (chr === ')') {
                blockCount--;
                buffer += chr;
                if (blockCount === 0) {
                    items.push(buffer);
                    buffer = '';
                }
            } else if (!this.IsBlockNumber(buffer, chr)) {
                if (blockCount === 0) {
                    if (buffer.length > 0)
                        items.push(buffer);
                    buffer = chr;
                } else {
                    buffer += chr;
                }
            } else {
                buffer += chr;
            }
        }
        if (buffer.length > 0)
            items.push(buffer);
        return (this.ParseBlockMathematicalExpressionSignals(items));
    }

    private IsBlockNumber(buffer: string, chr: string): boolean {
        return ((this.IsNumber(buffer + chr)) || ((chr === '.') && (this.IsNumber(buffer))));
    }

    private ParseBlockMathematicalExpressionSignals(items: string[]): string[] {
        const itemsSignal: string[] = [];
        let isLastOperation: boolean = true;
        for (let i: number = 0; i < items.length; i++) {
            const item: string = items[i];
            if (isLastOperation) {
                itemsSignal.push(item);
                isLastOperation = false;
            } else if (this.IsMathematicalOperator(item)) {
                itemsSignal.push(item);
                isLastOperation = true;
            } else if (item.length > 1) {
                if (this.IsMathematicalOperator(item[0], true)) {
                    itemsSignal.push(item[0]);
                    itemsSignal.push(item.substring(1));
                } else {
                    itemsSignal.push(item);
                }
                isLastOperation = false;
            }
        }
        return (itemsSignal);
    }

    private IsMathematicalOperator(chr: string, onlyItemOperator: boolean = false): boolean {
        if (chr === '+')
            return (true);
        if (chr === '-')
            return (true);
        if (onlyItemOperator)
            return (false);
        if (chr === '*')
            return (true);
        if (chr === '/')
            return (true);
        return (false);
    }

    private IsValidFunctionParameter(parameter: string): boolean {
        let blockOpen: number = 0;
        let blockClose: number = 0;
        for (let i: number = parameter.length - 1; i >= 0; i--) {
            const chr: string = parameter[i];
            if (chr === '(')
                blockOpen++;
            else if (chr === ')')
                blockClose++;
        }
        return (blockOpen === blockClose);
    }

    public IsIterator(data: string): boolean {
        if (this.Application.Serializer.IsJson(data))
            return (true);
        return (this.IsIteratorArray(data));
    }

    private IsIteratorArray(data: string): boolean {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr(0, 1) == this.ITERATOR_START) && (data.substr(data.length - 1, 1) == this.ITERATOR_END));
    }

    public ParseIterator(data: string): any[] {
        if (this.Application.Serializer.IsJson(data))
            return (this.Application.Serializer.Deserialize(data));
        return (this.ParseIteratorArray(data));
    }

    private ParseIteratorArray(data: string): string[] {
        const dataContent: string = data.substr(1, data.length - 2);
        const indexInterval: number = dataContent.indexOf('..');
        if (indexInterval !== -1) {
            //Interval
            const limits: string[] = this.Tokenize(dataContent, '..');
            if (limits.length != 2) {
                // tslint:disable-next-line:no-floating-promises
                this.Application.ExceptionHandler.HandleError('Iterator in wrong format: {0}', data);
                return ([]);
            }
            const limitStart: number = this.ParseNumberBlock(limits[0]);
            const limitEnd: number = this.ParseNumberBlock(limits[1]);
            const dataIntervals: string[] = [];
            for (let i = limitStart; i < limitEnd; i++)
                dataIntervals.push(i.toString());
            return (dataIntervals);
        } else {
            //Collection
            return (this.Tokenize(dataContent, ','));
        }
    }

    public ParseNumberBlock(data: string, valueDefault: number = 0): number {
        let dataClean: string = '';
        for (let i: number = 0; i < data.length; i++) {
            const character: string = data.charAt(i);
            if (character == ' ')
                continue;
            dataClean = dataClean + character;
        }
        const dataWithoutDate : string = this.ReplaceDateWithTimespan(dataClean);
        return (this.ParseNumber(this.Application.Solver.ResolveMathematicalExpression(dataWithoutDate), valueDefault));
    }

    private ReplaceDateWithTimespan(data : string) : string
    {
        const matchs: RegExpMatchArray = data.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?((\-|\+)\d{2}:\d{2})?/gi);
        if (matchs === null)
            return (data);
        let dataTimespan: string = data;
        for (let i: number = 0; i < matchs.length; i++)
        {
            const match: string = matchs[i];
            const date: Date = new Date(match);
            const timespan: number = date.getTime();
            dataTimespan = dataTimespan.replace(match, timespan.toString());
        }
        return (dataTimespan);
    }

    public IsClassArray(data: string): boolean {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr(0, 1) == this.CLASS_START) && (data.substr(data.length - 1, 1) == this.CLASS_END));
    }

    public IsMustacheOnly(data: string, allowInternal: boolean = false): boolean {
        if (allowInternal)
            return (this.IsMutacheOnlyInternal(data));
        if (!this.IsMustache(data))
            return (false);
        return (data.indexOf(this.MUSTACHE_START, 2) === -1);
    }

    private IsMutacheOnlyInternal(data: string): boolean {
        if (!this.IsMustache(data))
            return (false);
        let open: number = 0;
        for (let i: number = 0; i < data.length - 1; i++) {
            if (data[i] === ' ')
                return (false);
            const current = data.substr(i, 2);
            if (current === this.MUSTACHE_START) {
                open++;
                i++;
            } else if (current === this.MUSTACHE_END) {
                open--;
                i++;
            }
        }
        return (open === 0);
    }

    public ParseClassArray(data: string): string[] {
        return (this.ParseBlock(data.substr(1, data.length - 2), ','));
    }

    public ParseTags(data: string): string[] {
        return (this.ParseBlock(data, ','));
    }

    public ParseClass(data: string): [string, string, string] {
        const parsed: string[] = this.Tokenize(data, ':');
        if (parsed.length == 1)
            return ([parsed[0], 'true', null]);
        return ([parsed[0], parsed[1], parsed.length > 2 ? parsed[2] : null]);
    }

    public ParseConditionalBlock(data: string): string {
        if (data.indexOf == null)
            return (data.toString());
        let indexStart: number = data.indexOf('(');
        if (indexStart < 0)
            return (null);
        let indexStartNext: number = null;
        let indexEnd: number = null;
        indexStart++;
        while (((indexStartNext = data.indexOf('(', indexStart)) < (indexEnd = data.indexOf(')', indexStart))) && (indexStartNext != -1)) {
            indexStart = indexStartNext + 1;
        }
        return (data.substring(indexStart, indexEnd));
    }

    public ParseConditionalLogicalOrComparator(data: string): string[] {
        //Or
        let parsed: string[] = this.ParseConditionalLogicalOrComparatorSeparator(data, '||');
        if (parsed != null)
            return (parsed);
        //And
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '&&');
        if (parsed != null)
            return (parsed);
        //Different
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '!=');
        if (parsed != null)
            return (parsed);
        //Equal
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '=');
        if (parsed != null)
            return (parsed);
        //Greater Than
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '>');
        if (parsed != null)
            return (parsed);
        //Less Than
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '<');
        if (parsed != null)
            return (parsed);
        return ([data]);
    }

    private ParseConditionalLogicalOrComparatorSeparator(data: string, separator: string): string[] {
        const index: number = data.indexOf(separator);
        if (index > 0)
            return ([data.substring(0, index), separator, data.substring(index + separator.length)]);
        else if (index == 0)
            return (['', separator, data.substring(index + separator.length)]);
        return (null);
    }

    public GetStringAsNumber(text: string): number {
        if (text == null)
            return (null);
        return (Number(text));
    }

    public ParseEvents(data: string): string[] {
        if ((data === null) || (data === undefined))
            return ([]);
        const parse: string[] = this.Tokenize(data, ',');
        return (parse);
    }

    public ParseEventProperty(event: string, value: string): [string, string, string, string, string] {
        const parse: string[] = this.ParseProperty(event);
        if (parse.length < 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'on')
            return (null);
        const location: string = this.ParseEventLocation(parse[2]);
        let index: number = location === null ? 2 : 3;
        const trigger: string = parse[index++];
        const eventFilter: string = parse.length > index ? parse[index] : null;
        return ([event, location, trigger, value, eventFilter]);
    }

    private ParseEventLocation(value: string): string {
        if (value === 'body')
            return (value);
        return (null);
    }

    public ParseEvent(event: string): [string, string] {
        const parse: string[] = this.ParseProperty(event);
        const eventFilter: string = parse.length > 1 ? parse[1] : null;
        return ([parse[0], eventFilter]);
    }

    public IsUri(data: string): boolean {
        if (data === null)
            return (false);
        if ((data.length > 0) && (data.substr(0, 1) === '~'))
            return (true);
        if ((data.length > 0) && (data.substr(0, 1) === '/'))
            return (true);
        return (false);
    }

    public IsHTML(data: string): boolean {
        if (data === null)
            return (false);
        if ((data.length > 0) && (data.substr(0, 1) === '<'))
            return (true);
        return (false);
    }

    public ParsePipes(data: string): string[] {
        if (data == null)
            return (null);
        const parse: string[] = this.Tokenize(data, ',');
        return (parse);
    }

    public ParseDocumentContent(data: string): string {
        const index: number = data.indexOf('<div');
        if (index >= 0)
            return (data.substr(index));
        return (data);
    }

    public ParseElementAttributes(data: string): [string, string][] {
        const element: string = this.ParseElement(data);
        return (this.ParseAttributes(element));
    }

    private ParseElement(data: string): string {
        const index: number = data.indexOf('>');
        if (index >= 0)
            return (data.substr(0, index));
        return ('');
    }

    public ParseAttributes(data: string): [string, string][] {
        const attributes: [string, string][] = [];
        const block: string[] = this.ParseBlockAttribute(data);
        for (let i: number = 0; i < block.length; i++) {
            const attribute: [string, string] = this.ParseAttribute(block[i]);
            if (attribute !== null)
                attributes.push(attribute);
        }
        return (attributes);
    }

    private ParseAttribute(data: string): [string, string] {
        const block: string[] = this.ParseBlock(data, '=');
        if (block.length !== 2)
            return (null);
        const value: string = block[1];
        return ([block[0].toLowerCase(), value.substr(1, value.length - 2)]);
    }

    public ParseDate(data: string): Date {
        const date = new Date(data);
        if ((date == null) || (date.toString() == 'Invalid Date'))
            return (null);
        return (date);
    }

    public ParseDateCulture(data: string, culture: string = null): Date {
        if (data === null)
            return (null);
        if (culture === null)
            culture = this.Application.Globalization.GetCulture();
        //Regex macthing groups is not supported in IE11
        if (this._canUseRegexGroups)
            return (this.ParseDateCultureRegex(data, culture));
        return (this.ParseDateCultureRegularExpression(data, culture));
    }

    private ParseDateCultureRegex(data: string, culture: string): Date {
        const dateFormatRegex: string = this.Application.Globalization.GetDateFormatsRegex(culture);
        const match: any = data.match(dateFormatRegex) as any;
        if (match == null)
            return (null);
        const groups: any = match.groups;
        const year: number = this.ParseDateGroupNumber(groups.year);
        if (year == null)
            return (null);
        const month: number = this.ParseDateGroupNumber(groups.month, 12);
        if (month == null)
            return (null);
        const day: number = this.ParseDateGroupNumber(groups.day, 31);
        if (day == null)
            return (null);
        const hours: number = 12;
        const date = new Date(Date.UTC(year, month - 1, day, hours, 0, 0, 0));
        if (!this.IsDate(date))
            return (null);
        if (date.getUTCDate() !== day)
            return (null);
        return (date);
    }

    private ParseDateCultureRegularExpression(data: string, culture: string): Date {
        const regularExpressions: DrapoRegularExpression[] = this.Application.Globalization.GetDateFormatsRegularExpressions(culture);
        for (let i: number = 0; i < regularExpressions.length; i++) {
            const regularExpression: DrapoRegularExpression = regularExpressions[i];
            if (!regularExpression.IsValid(data))
                continue;
            const year: number = this.ParseDateGroupNumber(regularExpression.GetValue('year'));
            if (year == null)
                return (null);
            const month: number = this.ParseDateGroupNumber(regularExpression.GetValue('month'), 12);
            if (month == null)
                return (null);
            const day: number = this.ParseDateGroupNumber(regularExpression.GetValue('day'), 31);
            if (day == null)
                return (null);
            const hours: number = 12;
            const date = new Date(Date.UTC(year, month - 1, day, hours, 0, 0, 0));
            if (!this.IsDate(date))
                return (null);
            if (date.getUTCDate() !== day)
                return (null);
            return (date);
        }
        return (null);
    }

    private IsDate(date : any) : boolean
    {
        return (!((date == null) || (date.toString() == 'Invalid Date')));
    }

    private ParseDateGroupNumber(value: string, max: number = null): number {
        if (value == null)
            return (null);
        const valueNumber: number = this.ParseNumber(value, null);
        if ((max != null) && (valueNumber > max))
            return (null);
        return (valueNumber);
    }

    public ParseNumber(data: string, valueDefault: number = 0): number {
        if (data == null)
            return (valueDefault);
        const value: number = Number(data);
        if (Number.NaN === value)
            return (valueDefault);
        return (value);
    }

    public ParseNumberPercentageCulture(data: string, culture: string = null): number | null {
        if (data == null)
            return (null);
        if (data.endsWith('%'))
            data = data.substr(0, data.length - 1);
        return (this.ParseNumberCulture(data, culture));
    }

    public ParseNumberCulture(data: string, culture: string = null): number | null {
        if (data == null)
            return (null);
        const delimiterThousands: string = this.Application.Globalization.GetDelimiterThousands(culture);
        const delimiterDecimal: string = this.Application.Globalization.GetDelimiterDecimal(culture);
        let valueClean: string = this.Application.Solver.Replace(data, delimiterThousands, '');
        if (delimiterDecimal !== '.')
            valueClean = valueClean.replace(delimiterDecimal, '.');
        const value: number = Number(valueClean);
        if (Number.NaN === value)
            return (null);
        return (value);
    }

    public ParseBoolean(data: string, valueDefault: boolean = false): boolean {
        if (data == null)
            return (valueDefault);
        return (data.toLowerCase() === 'true');
    }

    public ParseQueryString(url: string): [string, string][] {
        const values: [string, string][] = [];
        const indexQueryString: number = url.indexOf('?');
        if ((indexQueryString == null) || (indexQueryString < 0))
            return (values);
        const queryString: string = url.substring(indexQueryString + 1);
        const keyValuePairs: string[] = this.ParseBlock(queryString, '&');
        for (let i: number = 0; i < keyValuePairs.length; i++) {
            const keyValuePair: string[] = this.ParseBlock(keyValuePairs[i], '=');
            if (keyValuePair.length !== 2)
                continue;
            const key: string = keyValuePair[0];
            const value: string = keyValuePair[1];
            values.push([key, value]);
        }
        return (values);
    }

    public ParseValidationGroups(data: string): string[] {
        if (data == null)
            return ([]);
        return (this.ParseBlock(data, ','));
    }

    public IsValidatorArray(data: string): boolean {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr(0, 1) == this.CLASS_START) && (data.substr(data.length - 1, 1) == this.CLASS_END));
    }

    public ParseValidatorsArray(data: string): string[] {
        return (this.ParseBlock(data.substr(1, data.length - 2), ','));
    }

    public ParseValidator(data: string): [string, string] {
        const parsed: string[] = this.Tokenize(data, ':');
        if (parsed.length == 1)
            return ([parsed[0], 'true']);
        return ([parsed[0], parsed[1]]);
    }

    public ParseHTMLAttributes(data: string): [string, string][] {
        const attributes: [string, string][] = [];
        let indexStart: number = 0;
        while ((indexStart = data.indexOf('<', indexStart)) >= 0) {
            const indexEnd: number = data.indexOf('>', indexStart);
            if (indexEnd === -1)
                break;
            const dataElement = data.substring(indexStart, indexEnd);
            const elementAttributes: [string, string][] = this.ParseAttributes(dataElement);
            attributes.push.apply(attributes, elementAttributes);
            indexStart = indexEnd;
        }
        return (attributes);
    }

    private ParseBlockAttribute(data: string): string[] {
        const items: string[] = [];
        let buffer: string = '';
        let attributeDelimiter: string = null;
        const space = ' ';
        for (let i: number = 0; i < data.length; i++) {
            const chr: string = data[i];
            if ((attributeDelimiter !== null) && (chr === attributeDelimiter)) {
                attributeDelimiter = null;
                buffer += chr;
            } else if ((chr === "'") || (chr === '"')) {
                attributeDelimiter = chr;
                buffer += chr;
            } else if (chr === space) {
                if (attributeDelimiter === null) {
                    items.push(buffer);
                    buffer = '';
                } else {
                    buffer += chr;
                }
            } else {
                buffer += chr;
            }
        }
        if (data.length > 0)
            items.push(buffer);
        return (items);
    }

    public ParseExpression(expression: string): DrapoExpressionItem {
        const block: DrapoExpressionItem = new DrapoExpressionItem(DrapoExpressionItemType.Block);
        this.ParseExpressionInsert(block, expression);
        block.Value = expression;
        return (block);
    }

    private ParseExpressionInsert(block: DrapoExpressionItem, expression: string): void {
        const tokens: string[] = this.ParseExpressionTokens(expression);
        for (let i: number = 0; i < tokens.length; i++) {
            const token: string = tokens[i];
            const item: DrapoExpressionItem = this.ParseExpressionItem(token);
            block.Items.push(item);
        }
    }

    private ParseExpressionTokens(expression: string): string[] {
        const tokens: string[] = [];
        let blockCount: number = 0;
        let textBlock: string = null;
        let buffer: string = '';
        for (let i: number = 0; i < expression.length; i++) {
            const chr: string = expression[i];
            //Finish TextBlock
            if (chr === textBlock) {
                buffer = buffer + chr;
                tokens.push(buffer);
                buffer = '';
                textBlock = null;
                continue;
            }
            //Start Text Block
            if ((chr === '"') || (chr === "'")) {
                this.AddTokenNonEmpty(tokens, buffer);
                buffer = chr;
                textBlock = chr;
                continue;
            }
            //Inside Text Block
            if (textBlock !== null) {
                buffer = buffer + chr;
                continue;
            }
            //Start Block
            if (chr === '(') {
                if ((blockCount === 0) && (this.ParseExpressionItemType(buffer) !== DrapoExpressionItemType.Text)) {
                    this.AddTokenNonEmpty(tokens, buffer);
                    buffer = '';
                }
                blockCount++;
            } else if (chr === ')') { // Finish Block
                blockCount--;
                if ((blockCount === 0) && (buffer !== '')) {
                    buffer = buffer + chr;
                    tokens.push(buffer);
                    buffer = '';
                    continue;
                }
            }
            if ((blockCount === 0) && (this.IsParseExpressionStartingToken(chr)) && (!this.IsParseExpressionMiddleToken(buffer, chr))) {
                this.AddTokenNonEmpty(tokens, buffer);
                buffer = '';
            }
            if ((blockCount === 0) && (buffer !== '') && (this.IsParseExpressionItemTypeComplete(buffer)) && (!this.IsParseExpressionItemTypeComplete(buffer + chr))) {
                this.AddTokenNonEmpty(tokens, buffer);
                buffer = '';
            }
            buffer = buffer + chr;
        }
        this.AddTokenNonEmpty(tokens, buffer);
        return (tokens);
    }

    private AddTokenNonEmpty(tokens: string[], token: string): boolean {
        if (token == null)
            return (false);
        if (this.IsTokenEmpty(token))
            return (false);
        tokens.push(token);
        return (true);
    }

    private Trim(token: string): string {
        if (token == null)
            return (token);
        let indexStart: number = 0;
        for (let i: number = 0; i < token.length; i++) {
            if (token[i] === ' ')
                continue;
            indexStart = i;
            break;
        }
        let indexEnd: number = token.length - 1;
        for (let i: number = indexEnd; i >= 0; i--) {
            if (token[i] === ' ')
                continue;
            indexEnd = i;
            break;
        }
        const tokenTrim: string = token.substring(indexStart, indexEnd + 1);
        return (tokenTrim);
    }

    private IsTokenEmpty(token: string): boolean {
        if (token == null)
            return (true);
        for (let i: number = 0; i < token.length; i++)
            if (token[i] != ' ')
                return (false);
        return (true);
    }

    private IsParseExpressionStartingToken(chr: string): boolean {
        return (this.Application.Solver.Contains(this._tokensStart, chr));
    }

    private IsParseExpressionMiddleToken(buffer: string, chr: string): boolean {
        if (buffer.length == 0)
            return (false);
        for (let i: number = 0; i < this._tokensBlock.length; i++) {
            const tokenBlock: string[] = this._tokensBlock[i];
            const tokenBlockBuffer = tokenBlock[0];
            if (buffer.substr(0, tokenBlockBuffer.length) !== tokenBlockBuffer)
                continue;
            for (let j: number = 1; j < tokenBlock.length; j++)
                if (tokenBlock[j] === chr)
                    return (true);
            return (false);
        }
        if (buffer[0] === '{')
            return (true);

        return (false);
    }

    private IsLetterOrNumber(chr: string): boolean {
        return (chr.match(/^[a-zA-Z0-9_.-]+$/i) != null);
    }

    public IsNumber(chr: any): boolean {
        if (chr == null)
            return (false);
        if (typeof chr !== 'string')
            chr = chr.toString();
        return (chr.match(/^(\-)?((\d)+)?(\.)?(\d)+$/i) != null);
    }

    public IsBoolean(data: any): boolean {
        if (data == null)
            return (false);
        if (typeof data === 'boolean')
            return (true);
        if (typeof data !== 'string')
            data = data.toString();
        return ((data === 'true') || (data === 'false'));
    }

    private ParseExpressionItem(token: string): DrapoExpressionItem {
        const tokenTrim: string = this.Trim(token);
        const type: DrapoExpressionItemType = this.ParseExpressionItemType(tokenTrim);
        const item: DrapoExpressionItem = new DrapoExpressionItem(type);
        if (item.Type == DrapoExpressionItemType.Block) {
            const content: string = tokenTrim.substring(1, tokenTrim.length - 1);
            this.ParseExpressionInsert(item, content);
        }
        item.Value = tokenTrim;
        return (item);
    }

    private ParseExpressionItemType(token: string): DrapoExpressionItemType {
        const isBlockEnd: boolean = token.substr(token.length - 1, 1) == ')';
        if (isBlockEnd) {
            const isBlockStart: boolean = token.substr(0, 1) == '(';
            if (isBlockStart)
                return (DrapoExpressionItemType.Block);
            else
                return (DrapoExpressionItemType.Function);
        }
        if (token === '!')
            return (DrapoExpressionItemType.Deny);
        if ((token.length > 1) && (token[0] === "'") && (token[token.length - 1] === "'"))
            return (DrapoExpressionItemType.Text);
        if ((token.length > 1) && (token[0] === '"') && (token[token.length - 1] === '"'))
            return (DrapoExpressionItemType.Text);
        if (this.IsMustache(token))
            return (DrapoExpressionItemType.Mustache);
        if (this.Application.Solver.Contains(this._tokensComparator, token))
            return (DrapoExpressionItemType.Comparator);
        if (this.Application.Solver.Contains(this._tokensLogical, token))
            return (DrapoExpressionItemType.Logical);
        if (this.Application.Solver.Contains(this._tokensArithmetic, token))
            return (DrapoExpressionItemType.Arithmetic);
        return (DrapoExpressionItemType.Text);
    }

    private IsParseExpressionItemTypeComplete(token: string): boolean {
        if (this.Application.Solver.Contains(this._tokensLogical, token))
            return (true);
        if (this.Application.Solver.Contains(this._tokensComparator, token))
            return (true);
        if (this.Application.Solver.Contains(this._tokensArithmetic, token))
            return (true);
        if (this.IsNumber(token))
            return (true);
        if (this.IsMustacheContentValid(token))
            return (true);
        if (this.IsLetterOrNumber(token))
            return (true);
        return (false);
    }

    public ParseLines(data: string): string[] {
        const lines: string[] = [];
        const split: string[] = data.split('\r\n');
        for (let i: number = 0; i < split.length; i++) {
            const line: string = split[i];
            if (line.length === 0)
                continue;
            lines.push(line);
        }
        return (lines);
    }

    public ParseHeader(data: string): [string, string] {
        const index: number = data.indexOf(':');
        if (index < 0)
            return (null);
        const key: string = data.substr(0, index);
        const value: string = data.substr(index + 2);
        return ([key, value]);
    }

    public ParseFormat(format: string): string[] {
        const tokens: string[] = [];
        let buffer: string = '';
        for (let i: number = 0; i < format.length; i++) {
            const chr: string = format[i];
            if (this.IsFormatCharacterCompatible(buffer, chr)) {
                buffer = buffer + chr;
            } else {
                if (buffer.length > 0)
                    tokens.push(buffer);
                buffer = chr;
            }
        }
        if (buffer.length > 0)
            tokens.push(buffer);
        return (tokens);
    }

    private IsFormatCharacterCompatible(buffer: string, chr: string): boolean {
        if (buffer.length == 0)
            return (true);
        if (buffer[buffer.length - 1] === chr)
            return (true);
        if (this.IsNumber(buffer) && (this.IsNumber(chr)))
            return (true);
        return (false);
    }

    public ParsePixels(value: string): number {
        if ((value == null) || (value == '') || (value.length < 3))
            return (null);
        const valueNumber: number = this.ParseNumber(value.substr(0, value.length - 2));
        return (valueNumber);
    }

    public ParseQuery(value: string): DrapoQuery {
        if ((value == null) || (value === ''))
            return (null);
        const query: DrapoQuery = new DrapoQuery();
        //Projections
        const projections: DrapoQueryProjection[] = this.ParseQueryProjections(value);
        if (projections === null) {
            query.Error = "Can't parse the projections.";
            return (query);
        }
        query.Projections = projections;
        //Sources
        const sources: DrapoQuerySource[] = this.ParseQuerySources(value);
        if (sources === null) {
            query.Error = "Can't parse the sources.";
            return (query);
        }
        query.Sources = sources;
        //Filters
        query.Filter = this.ParseQueryFilter(value);
        return (query);
    }

    public ParseQueryProjections(value: string): DrapoQueryProjection[] {
        const tokenProjections: string = this.ParseSubstring(value, "SELECT", "FROM");
        if (tokenProjections === null)
            return (null);
        const projections: DrapoQueryProjection[] = [];
        const tokenProjectionsSplit: string[] = this.ParseBlock(tokenProjections, ',');
        for (let i: number = 0; i < tokenProjectionsSplit.length; i++) {
            const tokenProjection: string = tokenProjectionsSplit[i];
            const projection: DrapoQueryProjection = this.ParseQueryProjection(tokenProjection);
            if (projection === null)
                return (null);
            projections.push(projection);
        }
        return (projections);
    }

    private ParseQueryProjection(value: string): DrapoQueryProjection {
        const projection: DrapoQueryProjection = new DrapoQueryProjection();
        const valueTrim: string = this.Trim(value);
        const valueTrimSplit: string[] = this.ParseBlock(valueTrim, ' ');
        const alias: string = this.ParseQueryProjectionAlias(valueTrimSplit);
        projection.Alias = alias;
        const valueTrimFirst: string = valueTrimSplit[0];
        const functionName: string = this.ParseQueryProjectionFunctionName(valueTrimFirst);
        if (functionName !== null) {
            projection.FunctionName = functionName;
            const functionParameters: string = this.ParseQueryProjectionFunctionParameters(valueTrimFirst);
            projection.FunctionParameters = this.ParseQueryProjectionFunctionParametersBlock(functionParameters);
        } else {
            const valueDefinition: string = valueTrimFirst;
            const isMustache: boolean = this.IsMustache(valueDefinition);
            const valueTrimFirstSplit: string[] = isMustache ? [valueDefinition] : this.ParseBlock(valueDefinition, '.');
            const source: string = (valueTrimFirstSplit.length > 1) ? valueTrimFirstSplit[0] : null;
            const column: string = (valueTrimFirstSplit.length > 1) ? valueTrimFirstSplit[1] : valueTrimFirstSplit[0];
            projection.Source = source;
            projection.Column = column;
        }
        return (projection);
    }

    private ParseQueryProjectionFunctionName(value: string): string {
        const index: number = value.indexOf('(');
        if (index < 0)
            return (null);
        const functionName : string = value.substr(0, index).toUpperCase();
        return (functionName);
    }

    private ParseQueryProjectionFunctionParameters(value: string): string {
        const index: number = value.indexOf('(');
        if (index < 0)
            return (null);
        const parameters: string = value.substring(index + 1,value.length - 1);
        return (parameters);
    }

    private ParseQueryProjectionFunctionParametersBlock(value: string): string[] {
        return (this.ParseBlock(value, ','));
    }

    public ParseQueryProjectionFunctionParameterValue(value: string): string[] {
        return (this.ParseBlock(value, '.'));
    }

    private ParseQueryProjectionAlias(values: string[]): string {
        if (values.length != 3)
            return (null);
        if (values[1].toUpperCase() !== 'AS')
            return (null);
        return (values[2]);
    }

    private ParseQuerySources(value: string): DrapoQuerySource[] {
        const tokenSources: string = this.ParseSubstring(value, 'FROM', 'WHERE', true);
        const tokenSourcesSplit: string[] = this.ParseQuerySourcesSplit(tokenSources);
        const sources: DrapoQuerySource[] = [];
        for (let i: number = 0; i < tokenSourcesSplit.length; i++)
        {
            const source : DrapoQuerySource = this.ParseQuerySource(tokenSourcesSplit[i]);
            if (source === null)
                return (null);
            sources.push(source);
        }
        return (sources);
    }

    private ParseQuerySource(value: string): DrapoQuerySource {
        const source: DrapoQuerySource = new DrapoQuerySource();
        //Join
        const joinType: string = this.ParseQuerySourceHeadValue(value, 'JOIN');
        source.JoinType = this.Trim(joinType);
        //Source
        const sourceToken: string = joinType === null ? value : this.ParseSubstring(value, 'JOIN', 'ON');
        const sourceProjection: DrapoQueryProjection = this.ParseQueryProjection(sourceToken);
        source.Source = sourceProjection.Column;
        source.Alias = sourceProjection.Alias;
        //On
        if (joinType !== null)
        {
            const indexOn: number = value.indexOf('ON');
            if (indexOn < 0)
                return (null);
            const onToken: string = value.substring(indexOn + 2);
            const onConditional: DrapoQueryCondition = this.ParseQueryConditional(onToken);
            if (onConditional === null)
                return (null);
            if (onConditional.Comparator !== '=')
                return (null);
            source.JoinConditions.push(onConditional);
        }
        return (source);
    }

    private ParseQueryConditional(value: string): DrapoQueryCondition {
        const conditional: DrapoQueryCondition = new DrapoQueryCondition();
        const item: DrapoExpressionItem = this.ParseExpression(value);
        //Left
        const leftProjection: DrapoQueryProjection = this.ParseQueryProjection(item.Items[0].Value);
        conditional.SourceLeft = leftProjection.Source;
        conditional.ColumnLeft = leftProjection.Column;
        //Comparator
        conditional.Comparator = item.Items[1].Value;
        //Right
        const rightProjection: DrapoQueryProjection = this.ParseQueryProjection(item.Items[2].Value);
        conditional.SourceRight = rightProjection.Source;
        conditional.ColumnRight = rightProjection.Column;
        return (conditional);
    }

    private ParseSubstring(value: string, start: string, end: string, canMissEnd : boolean = false): string {
        const indexStart: number = value.indexOf(start);
        if (indexStart < 0)
            return (null);
        let indexEnd: number = end === null ? -1 : value.indexOf(end);
        if (indexEnd < 0) {
            if (canMissEnd)
                indexEnd = value.length;
            else
                return (null);
        }
        const substring: string = value.substring(indexStart + start.length, indexEnd);
        return (substring);
    }

    private ParseQuerySourcesSplit(value: string): string[] {
        value = this.Trim(value);
        const sources: string[] = [];
        while (value.length != 0) {
            const source: string = this.ParseQuerySourceHead(value);
            sources.push(source);
            if (value === source)
                break;
            value = value.substring(source.length, value.length);
            value = this.Trim(value);
        }
        return (sources);
    }

    private ParseQuerySourceHead(value: string): string {
        let header: string = this.ParseQuerySourceHeadValue(value, 'INNER JOIN');
        if (header !== null)
            return (header);
        header = this.ParseQuerySourceHeadValue(value, 'LEFT JOIN');
        if (header !== null)
            return (header);
        header = this.ParseQuerySourceHeadValue(value, 'OUTER JOIN');
        if (header !== null)
            return (header);
        header = this.ParseQuerySourceHeadValue(value, 'RIGHT JOIN');
        if (header !== null)
            return (header);
        return (value);
    }

    private ParseQuerySourceHeadValue(value: string, search: string): string {
        const index: number = value.indexOf(search, 1);
        if (index < 0)
            return (null);
        const header: string = value.substring(0, index);
        return (header);
    }

    private ParseQueryFilter(value: string): DrapoQueryCondition {
        const whereToken: string = this.ParseSubstring(value, 'WHERE', null, true);
        if (whereToken === null)
            return (null);
        const filter: DrapoQueryCondition = this.ParseQueryConditional(whereToken);
        return (filter);
    }
}
