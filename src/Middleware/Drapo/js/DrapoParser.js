"use strict";
var DrapoParser = (function () {
    function DrapoParser(application) {
        this.MUSTACHE_START = '{{';
        this.MUSTACHE_START_OVERFLOW = '{{{';
        this.MUSTACHE_END = '}}';
        this.MUSTACHE_INDEXER_START = '[';
        this.MUSTACHE_INDEXER_END = ']';
        this.ITERATOR_START = '(';
        this.ITERATOR_END = ')';
        this.CLASS_START = '{';
        this.CLASS_END = '}';
        this._tokensStart = [' ', '{', '=', '!', '<', '>', '&', '|', '-', '+', '*', '/'];
        this._tokensBlock = [['&', '&'], ['|', '|'], ['!', '='], ['>', '='], ['<', '=']];
        this._tokensComparator = ['=', '!=', '>', '>=', '<', '<=', 'LIKE'];
        this._tokensLogical = ['&&', '||'];
        this._tokensArithmetic = ['+', '-', '*', '/'];
        this._canUseRegexGroups = false;
        this._application = application;
    }
    Object.defineProperty(DrapoParser.prototype, "Application", {
        get: function () {
            return (this._application);
        },
        enumerable: false,
        configurable: true
    });
    DrapoParser.prototype.Tokenize = function (data, splitter) {
        if (splitter === void 0) { splitter = " "; }
        if (data == null)
            return (null);
        return (data.split(splitter));
    };
    DrapoParser.prototype.ParseFor = function (data) {
        var parse = this.Tokenize(data);
        if (parse == null)
            return (null);
        if (parse.length != 3) {
            this.Application.ExceptionHandler.HandleError('The for syntax is wrong. Waiting 3 arguments in : {0} ', data);
            return (null);
        }
        if (parse[1] != 'in') {
            this.Application.ExceptionHandler.HandleError('The for syntax is wrong. Expecting "in" in the second argument: {0} ', data);
            return (null);
        }
        return (parse);
    };
    DrapoParser.prototype.ParseForIterable = function (data) {
        var parse = this.Tokenize(data, '.');
        return (parse);
    };
    DrapoParser.prototype.ParseMustaches = function (data, checkEmbedded) {
        if (checkEmbedded === void 0) { checkEmbedded = false; }
        var mustaches = this.ParseMustachesInternal(data);
        if (!checkEmbedded)
            return (mustaches);
        for (var i = 0; i < mustaches.length; i++) {
            var mustache = mustaches[i];
            var mustachesEmbedded = this.ParseMustachesInternal(mustache.substr(2, mustache.length - 4));
            for (var j = 0; j < mustachesEmbedded.length; j++)
                mustaches.push(mustachesEmbedded[j]);
        }
        return (mustaches);
    };
    DrapoParser.prototype.ParseMustachesInternal = function (data) {
        var mustaches = [];
        var opened = 0;
        var length = data.length - 1;
        var start = 0;
        for (var i = 0; i < length; i++) {
            var block = data.substr(i, 2);
            if (block === this.MUSTACHE_START) {
                if (opened === 0)
                    start = i;
                opened++;
                i++;
            }
            else if (block === this.MUSTACHE_END) {
                opened--;
                i++;
                if (opened !== 0)
                    continue;
                var mustache = data.substring(start, i + 1);
                while (mustache.indexOf(this.MUSTACHE_START_OVERFLOW) === 0)
                    mustache = mustache.substring(1);
                mustaches.push(mustache);
            }
        }
        return (mustaches);
    };
    DrapoParser.prototype.IsMustache = function (data) {
        if (data === null)
            return (false);
        if (!((typeof data === 'string') || (data instanceof String)))
            return (false);
        if (data.length < 4)
            return (false);
        return ((data.substr(0, 2) == this.MUSTACHE_START) && (data.substr(data.length - 2, 2) == this.MUSTACHE_END));
    };
    DrapoParser.prototype.IsMustacheContentValid = function (data) {
        if (!this.IsMustache(data))
            return (false);
        return ((this.GetMatchs(data, this.MUSTACHE_START)) === (this.GetMatchs(data, this.MUSTACHE_END)));
    };
    DrapoParser.prototype.IsMustacheIndexer = function (data) {
        if (data === null)
            return (false);
        if (data.length < 3)
            return (false);
        if (data[0] !== this.MUSTACHE_INDEXER_START)
            return (false);
        if (data[data.length - 1] !== this.MUSTACHE_INDEXER_END)
            return (false);
        return (this.IsMustache(data.substring(this.MUSTACHE_INDEXER_START.length, data.length - this.MUSTACHE_INDEXER_END.length)));
    };
    DrapoParser.prototype.GetMustacheInsideIndexer = function (data) {
        return (data.substring(this.MUSTACHE_INDEXER_START.length, data.length - this.MUSTACHE_INDEXER_END.length));
    };
    DrapoParser.prototype.CreateMustacheIndexer = function (data) {
        return (this.MUSTACHE_INDEXER_START + data + this.MUSTACHE_INDEXER_END);
    };
    DrapoParser.prototype.GetMatchs = function (data, search) {
        var hits = 0;
        var indexStart = 0;
        while ((indexStart = data.indexOf(search, indexStart)) >= 0) {
            hits++;
            indexStart = indexStart + search.length;
        }
        return (hits);
    };
    DrapoParser.prototype.HasMustache = function (data) {
        if (data === null)
            return (false);
        if (!((typeof data === 'string') || (data instanceof String)))
            return (false);
        return (data.indexOf(this.MUSTACHE_START) > -1);
    };
    DrapoParser.prototype.ParseMustache = function (data) {
        var mustache = data.substr(2, data.length - 4);
        var mustacheFields = [];
        var opened = 0;
        var length = data.length;
        var start = 0;
        for (var i = 0; i < length; i++) {
            var block = mustache.substr(i, 2);
            if (block === this.MUSTACHE_START) {
                opened++;
                i++;
            }
            else if (block === this.MUSTACHE_END) {
                opened--;
                i++;
            }
            else if ((opened === 0) && (mustache[i] === '.')) {
                mustacheFields.push(mustache.substring(start, i));
                start = i + 1;
            }
        }
        if (start !== length)
            mustacheFields.push(mustache.substring(start, length));
        return (mustacheFields);
    };
    DrapoParser.prototype.ParseProperty = function (data) {
        return (this.Tokenize(data, '-'));
    };
    DrapoParser.prototype.ParsePath = function (data) {
        return (this.Tokenize(data, '.'));
    };
    DrapoParser.prototype.HasFunction = function (data) {
        var functions = this.ParseFunctions(data);
        for (var i = 0; i < functions.length; i++)
            if (this.IsFunction(functions[i]))
                return (true);
        return (false);
    };
    DrapoParser.prototype.IsFunction = function (data) {
        var functionParsed = this.ParseFunction(data, false);
        return (functionParsed != null);
    };
    DrapoParser.prototype.ParseFunctionsPartial = function (data) {
        var functions = [];
        var buffer = '';
        var blockCount = 0;
        for (var i = 0; i < data.length; i++) {
            var chr = data[i];
            if (chr === '(') {
                blockCount++;
                buffer += chr;
            }
            else if (chr === ')') {
                blockCount--;
                buffer += chr;
                if (blockCount === 0) {
                    if (buffer[0] !== '(')
                        functions.push(buffer);
                    buffer = '';
                }
            }
            else if ((blockCount === 0) && (this.IsFunctionPartialDelimiter(chr))) {
                buffer = '';
            }
            else {
                buffer += chr;
            }
        }
        return (functions);
    };
    DrapoParser.prototype.IsFunctionPartialDelimiter = function (data) {
        if (data === ' ')
            return (true);
        if (data === ':')
            return (true);
        if (data === ';')
            return (true);
        if (data === '=')
            return (true);
        return (false);
    };
    DrapoParser.prototype.ParseFunctions = function (data) {
        var functions = this.ParseBlock(data, ';');
        for (var i = functions.length - 1; i >= 0; i--) {
            var functionText = functions[i];
            var functionStartIndex = this.GetFunctionStart(functionText);
            if (functionStartIndex === 0)
                continue;
            functions[i] = functionText.substring(functionStartIndex);
        }
        return (functions);
    };
    DrapoParser.prototype.GetFunctionStart = function (functionText) {
        for (var i = 0; i < functionText.length; i++)
            if (this.IsFunctionStartValid(functionText[i]))
                return (i);
        return (functionText.length);
    };
    DrapoParser.prototype.IsFunctionStartValid = function (character) {
        if (character === ' ')
            return (false);
        if (character === '!')
            return (false);
        return (true);
    };
    DrapoParser.prototype.ParseFunction = function (data, checkParameters) {
        if (checkParameters === void 0) { checkParameters = true; }
        var indexStart = data.indexOf('(');
        if (indexStart <= 0)
            return (null);
        if (data[data.length - 1] !== ')')
            return (null);
        var functionParsed = new DrapoFunction();
        functionParsed.Name = data.substr(0, indexStart).toLowerCase();
        functionParsed.Parameters = this.ParseParameters(data.substr(indexStart + 1, (data.length - (indexStart + 2))));
        if (!checkParameters)
            return (functionParsed);
        for (var i = functionParsed.Parameters.length - 1; i >= 0; i--)
            if (!this.IsValidFunctionParameter(functionParsed.Parameters[i]))
                return (null);
        return (functionParsed);
    };
    DrapoParser.prototype.ParseParameters = function (data) {
        return (this.ParseBlock(data, ','));
    };
    DrapoParser.prototype.ParseBlock = function (data, delimiter) {
        var items = [];
        var buffer = '';
        var blockCount = 0;
        for (var i = 0; i < data.length; i++) {
            var chr = data[i];
            if (chr === '(') {
                blockCount++;
                buffer += chr;
            }
            else if (chr === ')') {
                blockCount--;
                buffer += chr;
            }
            else if (chr === delimiter) {
                if (blockCount === 0) {
                    items.push(buffer);
                    buffer = '';
                }
                else {
                    buffer += chr;
                }
            }
            else {
                buffer += chr;
            }
        }
        if (data.length > 0)
            items.push(buffer);
        return (items);
    };
    DrapoParser.prototype.ParseBlockMathematicalExpression = function (data) {
        var items = [];
        var buffer = '';
        var blockCount = 0;
        for (var i = 0; i < data.length; i++) {
            var chr = data[i];
            if (chr === '(') {
                if (blockCount === 0) {
                    if (buffer.length > 0)
                        items.push(buffer);
                    buffer = '';
                }
                blockCount++;
                buffer += chr;
            }
            else if (chr === ')') {
                blockCount--;
                buffer += chr;
                if (blockCount === 0) {
                    items.push(buffer);
                    buffer = '';
                }
            }
            else if (!this.IsBlockNumber(buffer, chr)) {
                if (blockCount === 0) {
                    if (buffer.length > 0)
                        items.push(buffer);
                    buffer = chr;
                }
                else {
                    buffer += chr;
                }
            }
            else {
                buffer += chr;
            }
        }
        if (buffer.length > 0)
            items.push(buffer);
        return (this.ParseBlockMathematicalExpressionSignals(items));
    };
    DrapoParser.prototype.IsBlockNumber = function (buffer, chr) {
        return ((this.IsNumber(buffer + chr)) || ((chr === '.') && (this.IsNumber(buffer))));
    };
    DrapoParser.prototype.ParseBlockMathematicalExpressionSignals = function (items) {
        var itemsSignal = [];
        var isLastOperation = true;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (isLastOperation) {
                itemsSignal.push(item);
                isLastOperation = false;
            }
            else if (this.IsMathematicalOperator(item)) {
                itemsSignal.push(item);
                isLastOperation = true;
            }
            else if (item.length > 1) {
                if (this.IsMathematicalOperator(item[0], true)) {
                    itemsSignal.push(item[0]);
                    itemsSignal.push(item.substring(1));
                }
                else {
                    itemsSignal.push(item);
                }
                isLastOperation = false;
            }
        }
        return (itemsSignal);
    };
    DrapoParser.prototype.IsMathematicalOperator = function (chr, onlyItemOperator) {
        if (onlyItemOperator === void 0) { onlyItemOperator = false; }
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
    };
    DrapoParser.prototype.IsValidFunctionParameter = function (parameter) {
        var blockOpen = 0;
        var blockClose = 0;
        for (var i = parameter.length - 1; i >= 0; i--) {
            var chr = parameter[i];
            if (chr === '(')
                blockOpen++;
            else if (chr === ')')
                blockClose++;
        }
        return (blockOpen === blockClose);
    };
    DrapoParser.prototype.IsIterator = function (data) {
        if (this.Application.Serializer.IsJson(data))
            return (true);
        return (this.IsIteratorArray(data));
    };
    DrapoParser.prototype.IsIteratorArray = function (data) {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr != null) && (data.substr(0, 1) == this.ITERATOR_START) && (data.substr(data.length - 1, 1) == this.ITERATOR_END));
    };
    DrapoParser.prototype.ParseIterator = function (data) {
        if (this.Application.Serializer.IsJson(data))
            return (this.Application.Serializer.Deserialize(data));
        return (this.ParseIteratorArray(data));
    };
    DrapoParser.prototype.ParseIteratorArray = function (data) {
        var dataContent = data.substr(1, data.length - 2);
        var indexInterval = dataContent.indexOf('..');
        if (indexInterval !== -1) {
            var limits = this.Tokenize(dataContent, '..');
            if (limits.length != 2) {
                this.Application.ExceptionHandler.HandleError('Iterator in wrong format: {0}', data);
                return ([]);
            }
            var limitStart = this.ParseNumberBlock(limits[0]);
            var limitEnd = this.ParseNumberBlock(limits[1]);
            var dataIntervals = [];
            for (var i = limitStart; i < limitEnd; i++)
                dataIntervals.push(i.toString());
            return (dataIntervals);
        }
        else {
            return (this.Tokenize(dataContent, ','));
        }
    };
    DrapoParser.prototype.ParseNumberBlock = function (data, valueDefault) {
        if (valueDefault === void 0) { valueDefault = 0; }
        var dataClean = '';
        for (var i = 0; i < data.length; i++) {
            var character = data.charAt(i);
            if (character == ' ')
                continue;
            dataClean = dataClean + character;
        }
        var dataWithoutDate = this.ReplaceDateWithTimespan(dataClean);
        return (this.ParseNumber(this.Application.Solver.ResolveMathematicalExpression(dataWithoutDate), valueDefault));
    };
    DrapoParser.prototype.ReplaceDateWithTimespan = function (data) {
        var matchs = data.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?((\-|\+)\d{2}:\d{2})?/gi);
        if (matchs === null)
            return (data);
        var dataTimespan = data;
        for (var i = 0; i < matchs.length; i++) {
            var match = matchs[i];
            var date = new Date(match);
            var timespan = date.getTime();
            dataTimespan = dataTimespan.replace(match, timespan.toString());
        }
        return (dataTimespan);
    };
    DrapoParser.prototype.IsClassArray = function (data) {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr(0, 1) == this.CLASS_START) && (data.substr(data.length - 1, 1) == this.CLASS_END));
    };
    DrapoParser.prototype.IsMustacheOnly = function (data, allowInternal) {
        if (allowInternal === void 0) { allowInternal = false; }
        if (allowInternal)
            return (this.IsMutacheOnlyInternal(data));
        if (!this.IsMustache(data))
            return (false);
        return (data.indexOf(this.MUSTACHE_START, 2) === -1);
    };
    DrapoParser.prototype.IsMutacheOnlyInternal = function (data) {
        if (!this.IsMustache(data))
            return (false);
        var open = 0;
        for (var i = 0; i < data.length - 1; i++) {
            if (data[i] === ' ')
                return (false);
            var current = data.substr(i, 2);
            if (current === this.MUSTACHE_START) {
                open++;
                i++;
            }
            else if (current === this.MUSTACHE_END) {
                open--;
                i++;
            }
        }
        return (open === 0);
    };
    DrapoParser.prototype.ParseClassArray = function (data) {
        return (this.ParseBlock(data.substr(1, data.length - 2), ','));
    };
    DrapoParser.prototype.ParseTags = function (data) {
        return (this.ParseBlock(data, ','));
    };
    DrapoParser.prototype.ParseClass = function (data) {
        var parsed = this.Tokenize(data, ':');
        if (parsed.length == 1)
            return ([parsed[0], 'true', null]);
        return ([parsed[0], parsed[1], parsed.length > 2 ? parsed[2] : null]);
    };
    DrapoParser.prototype.ParseConditionalBlock = function (data) {
        if (data.indexOf == null)
            return (data.toString());
        var indexStart = data.indexOf('(');
        if (indexStart < 0)
            return (null);
        var indexStartNext = null;
        var indexEnd = null;
        indexStart++;
        while (((indexStartNext = data.indexOf('(', indexStart)) < (indexEnd = data.indexOf(')', indexStart))) && (indexStartNext != -1)) {
            indexStart = indexStartNext + 1;
        }
        return (data.substring(indexStart, indexEnd));
    };
    DrapoParser.prototype.ParseConditionalLogicalOrComparator = function (data) {
        var parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '||');
        if (parsed != null)
            return (parsed);
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '&&');
        if (parsed != null)
            return (parsed);
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '!=');
        if (parsed != null)
            return (parsed);
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '=');
        if (parsed != null)
            return (parsed);
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '>');
        if (parsed != null)
            return (parsed);
        parsed = this.ParseConditionalLogicalOrComparatorSeparator(data, '<');
        if (parsed != null)
            return (parsed);
        return ([data]);
    };
    DrapoParser.prototype.ParseConditionalLogicalOrComparatorSeparator = function (data, separator) {
        var index = data.indexOf(separator);
        if (index > 0)
            return ([data.substring(0, index), separator, data.substring(index + separator.length)]);
        else if (index == 0)
            return (['', separator, data.substring(index + separator.length)]);
        return (null);
    };
    DrapoParser.prototype.GetStringAsNumber = function (text) {
        if (text == null)
            return (null);
        return (Number(text));
    };
    DrapoParser.prototype.ParseEvents = function (data) {
        if ((data === null) || (data === undefined))
            return ([]);
        var parse = this.Tokenize(data, ',');
        return (parse);
    };
    DrapoParser.prototype.ParseEventProperty = function (el, event, value) {
        var parse = this.ParseProperty(event);
        if (parse.length < 3)
            return (null);
        if (parse[0] != 'd')
            return (null);
        if (parse[1].toLowerCase() != 'on')
            return (null);
        var location = this.ParseEventLocation(parse[2]);
        var index = location === null ? 2 : 3;
        var trigger = parse[index++];
        var eventFilter = parse.length > index ? parse[index] : null;
        var validation = el.getAttribute('d-validation-on-' + trigger);
        return ([event, location, trigger, value, eventFilter, validation]);
    };
    DrapoParser.prototype.ParseEventLocation = function (value) {
        if (value === 'body')
            return (value);
        return (null);
    };
    DrapoParser.prototype.ParseEvent = function (event) {
        var parse = this.ParseProperty(event);
        var eventFilter = parse.length > 1 ? parse[1] : null;
        return ([parse[0], eventFilter]);
    };
    DrapoParser.prototype.IsUri = function (data) {
        if (data === null)
            return (false);
        if ((data.length > 0) && (data.substr(0, 1) === '~'))
            return (true);
        if ((data.length > 0) && (data.substr(0, 1) === '/'))
            return (true);
        return (false);
    };
    DrapoParser.prototype.IsHTML = function (data) {
        if (data === null)
            return (false);
        if ((data.length > 0) && (data.substr(0, 1) === '<'))
            return (true);
        return (false);
    };
    DrapoParser.prototype.ParsePipes = function (data) {
        if (data == null)
            return (null);
        var parse = this.Tokenize(data, ',');
        return (parse);
    };
    DrapoParser.prototype.ParseDocumentContent = function (data) {
        var index = data.indexOf('<div');
        if (index >= 0)
            return (data.substr(index));
        return (data);
    };
    DrapoParser.prototype.ParseElementAttributes = function (data) {
        var element = this.ParseElement(data);
        return (this.ParseAttributes(element));
    };
    DrapoParser.prototype.ParseElement = function (data) {
        var index = data.indexOf('>');
        if (index >= 0)
            return (data.substr(0, index));
        return ('');
    };
    DrapoParser.prototype.ParseAttributes = function (data) {
        var attributes = [];
        var block = this.ParseBlockAttribute(data);
        for (var i = 0; i < block.length; i++) {
            var attribute = this.ParseAttribute(block[i]);
            if (attribute !== null)
                attributes.push(attribute);
        }
        return (attributes);
    };
    DrapoParser.prototype.ParseAttribute = function (data) {
        var block = this.ParseBlock(data, '=');
        if (block.length !== 2)
            return (null);
        var value = block[1];
        return ([block[0].toLowerCase(), value.substr(1, value.length - 2)]);
    };
    DrapoParser.prototype.ParseDate = function (data) {
        var date = new Date(data);
        if ((date == null) || (date.toString() == 'Invalid Date'))
            return (null);
        return (date);
    };
    DrapoParser.prototype.ParseDateCulture = function (data, culture) {
        if (culture === void 0) { culture = null; }
        if (data === null)
            return (null);
        if (culture === null)
            culture = this.Application.Globalization.GetCulture();
        if (this._canUseRegexGroups)
            return (this.ParseDateCultureRegex(data, culture));
        return (this.ParseDateCultureRegularExpression(data, culture));
    };
    DrapoParser.prototype.ParseDateCultureRegex = function (data, culture) {
        var dateFormatRegex = this.Application.Globalization.GetDateFormatsRegex(culture);
        var match = data.match(dateFormatRegex);
        if (match == null)
            return (null);
        var groups = match.groups;
        var year = this.ParseDateGroupNumber(groups.year);
        if (year == null)
            return (null);
        var month = this.ParseDateGroupNumber(groups.month, 12);
        if (month == null)
            return (null);
        var day = this.ParseDateGroupNumber(groups.day, 31);
        if (day == null)
            return (null);
        var hours = 12;
        var date = new Date(Date.UTC(year, month - 1, day, hours, 0, 0, 0));
        if (!this.IsDate(date))
            return (null);
        if (date.getUTCDate() !== day)
            return (null);
        return (date);
    };
    DrapoParser.prototype.ParseDateCultureRegularExpression = function (data, culture) {
        var regularExpressions = this.Application.Globalization.GetDateFormatsRegularExpressions(culture);
        for (var i = 0; i < regularExpressions.length; i++) {
            var regularExpression = regularExpressions[i];
            if (!regularExpression.IsValid(data))
                continue;
            var year = this.ParseDateGroupNumber(regularExpression.GetValue('year'));
            if (year == null)
                return (null);
            var month = this.ParseDateGroupNumber(regularExpression.GetValue('month'), 12);
            if (month == null)
                return (null);
            var day = this.ParseDateGroupNumber(regularExpression.GetValue('day'), 31);
            if (day == null)
                return (null);
            var hours = 12;
            var date = new Date(Date.UTC(year, month - 1, day, hours, 0, 0, 0));
            if (!this.IsDate(date))
                return (null);
            if (date.getUTCDate() !== day)
                return (null);
            return (date);
        }
        return (null);
    };
    DrapoParser.prototype.IsDate = function (date) {
        return (!((date == null) || (date.toString() == 'Invalid Date')));
    };
    DrapoParser.prototype.ParseDateGroupNumber = function (value, max) {
        if (max === void 0) { max = null; }
        if (value == null)
            return (null);
        var valueNumber = this.ParseNumber(value, null);
        if ((max != null) && (valueNumber > max))
            return (null);
        return (valueNumber);
    };
    DrapoParser.prototype.ParseNumber = function (data, valueDefault) {
        if (valueDefault === void 0) { valueDefault = 0; }
        if (data == null)
            return (valueDefault);
        var value = Number(data);
        if (Number.NaN === value)
            return (valueDefault);
        return (value);
    };
    DrapoParser.prototype.ParseNumberPercentageCulture = function (data, culture) {
        if (culture === void 0) { culture = null; }
        if (data == null)
            return (null);
        if (data.endsWith('%'))
            data = data.substr(0, data.length - 1);
        return (this.ParseNumberCulture(data, culture));
    };
    DrapoParser.prototype.ParseNumberCulture = function (data, culture) {
        if (culture === void 0) { culture = null; }
        if (data == null)
            return (null);
        var delimiterThousands = this.Application.Globalization.GetDelimiterThousands(culture);
        var delimiterDecimal = this.Application.Globalization.GetDelimiterDecimal(culture);
        var valueClean = this.Application.Solver.Replace(data, delimiterThousands, '');
        if (delimiterDecimal !== '.')
            valueClean = valueClean.replace(delimiterDecimal, '.');
        var value = Number(valueClean);
        if (Number.NaN === value)
            return (null);
        return (value);
    };
    DrapoParser.prototype.ParseBoolean = function (data, valueDefault) {
        if (valueDefault === void 0) { valueDefault = false; }
        if (data == null)
            return (valueDefault);
        return (data.toLowerCase() === 'true');
    };
    DrapoParser.prototype.ParseQueryString = function (url) {
        var values = [];
        var indexQueryString = url.indexOf('?');
        if ((indexQueryString == null) || (indexQueryString < 0))
            return (values);
        var queryString = url.substring(indexQueryString + 1);
        var keyValuePairs = this.ParseBlock(queryString, '&');
        for (var i = 0; i < keyValuePairs.length; i++) {
            var keyValuePair = this.ParseBlock(keyValuePairs[i], '=');
            if (keyValuePair.length !== 2)
                continue;
            var key = keyValuePair[0];
            var value = keyValuePair[1];
            values.push([key, value]);
        }
        return (values);
    };
    DrapoParser.prototype.ParseValidationGroups = function (data) {
        if (data == null)
            return ([]);
        return (this.ParseBlock(data, ','));
    };
    DrapoParser.prototype.IsValidatorArray = function (data) {
        if (data === null)
            return (false);
        if (data.length < 2)
            return (false);
        return ((data.substr(0, 1) == this.CLASS_START) && (data.substr(data.length - 1, 1) == this.CLASS_END));
    };
    DrapoParser.prototype.ParseValidatorsArray = function (data) {
        return (this.ParseBlock(data.substr(1, data.length - 2), ','));
    };
    DrapoParser.prototype.ParseValidator = function (data) {
        var parsed = this.Tokenize(data, ':');
        if (parsed.length == 1)
            return ([parsed[0], 'true']);
        return ([parsed[0], parsed[1]]);
    };
    DrapoParser.prototype.ParseHTMLAttributes = function (data) {
        var attributes = [];
        var indexStart = 0;
        while ((indexStart = data.indexOf('<', indexStart)) >= 0) {
            var indexEnd = data.indexOf('>', indexStart);
            if (indexEnd === -1)
                break;
            var dataElement = data.substring(indexStart, indexEnd);
            var elementAttributes = this.ParseAttributes(dataElement);
            attributes.push.apply(attributes, elementAttributes);
            indexStart = indexEnd;
        }
        return (attributes);
    };
    DrapoParser.prototype.ParseBlockAttribute = function (data) {
        var items = [];
        var buffer = '';
        var attributeDelimiter = null;
        var space = ' ';
        for (var i = 0; i < data.length; i++) {
            var chr = data[i];
            if ((attributeDelimiter !== null) && (chr === attributeDelimiter)) {
                attributeDelimiter = null;
                buffer += chr;
            }
            else if ((chr === "'") || (chr === '"')) {
                attributeDelimiter = chr;
                buffer += chr;
            }
            else if (chr === space) {
                if (attributeDelimiter === null) {
                    items.push(buffer);
                    buffer = '';
                }
                else {
                    buffer += chr;
                }
            }
            else {
                buffer += chr;
            }
        }
        if (data.length > 0)
            items.push(buffer);
        return (items);
    };
    DrapoParser.prototype.ParseExpression = function (expression) {
        var block = new DrapoExpressionItem(DrapoExpressionItemType.Block);
        this.ParseExpressionInsert(block, expression);
        block.Value = expression;
        return (block);
    };
    DrapoParser.prototype.ParseExpressionInsert = function (block, expression) {
        var tokens = this.ParseExpressionTokens(expression);
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            var item = this.ParseExpressionItem(token);
            block.Items.push(item);
        }
    };
    DrapoParser.prototype.ParseExpressionTokens = function (expression) {
        var tokens = [];
        var blockCount = 0;
        var textBlock = null;
        var buffer = '';
        for (var i = 0; i < expression.length; i++) {
            var chr = expression[i];
            if (chr === textBlock) {
                buffer = buffer + chr;
                tokens.push(buffer);
                buffer = '';
                textBlock = null;
                continue;
            }
            if ((chr === '"') || (chr === "'")) {
                this.AddTokenNonEmpty(tokens, buffer);
                buffer = chr;
                textBlock = chr;
                continue;
            }
            if (textBlock !== null) {
                buffer = buffer + chr;
                continue;
            }
            if (chr === '(') {
                if ((blockCount === 0) && (this.ParseExpressionItemType(buffer) !== DrapoExpressionItemType.Text)) {
                    this.AddTokenNonEmpty(tokens, buffer);
                    buffer = '';
                }
                blockCount++;
            }
            else if (chr === ')') {
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
    };
    DrapoParser.prototype.AddTokenNonEmpty = function (tokens, token) {
        if (token == null)
            return (false);
        if (this.IsTokenEmpty(token))
            return (false);
        tokens.push(token);
        return (true);
    };
    DrapoParser.prototype.Trim = function (token) {
        if (token == null)
            return (token);
        var indexStart = 0;
        for (var i = 0; i < token.length; i++) {
            if (token[i] === ' ')
                continue;
            indexStart = i;
            break;
        }
        var indexEnd = token.length - 1;
        for (var i = indexEnd; i >= 0; i--) {
            if (token[i] === ' ')
                continue;
            indexEnd = i;
            break;
        }
        var tokenTrim = token.substring(indexStart, indexEnd + 1);
        return (tokenTrim);
    };
    DrapoParser.prototype.IsTokenEmpty = function (token) {
        if (token == null)
            return (true);
        for (var i = 0; i < token.length; i++)
            if (token[i] != ' ')
                return (false);
        return (true);
    };
    DrapoParser.prototype.IsParseExpressionStartingToken = function (chr) {
        return (this.Application.Solver.Contains(this._tokensStart, chr));
    };
    DrapoParser.prototype.IsParseExpressionMiddleToken = function (buffer, chr) {
        if (buffer.length == 0)
            return (false);
        for (var i = 0; i < this._tokensBlock.length; i++) {
            var tokenBlock = this._tokensBlock[i];
            var tokenBlockBuffer = tokenBlock[0];
            if (buffer.substr(0, tokenBlockBuffer.length) !== tokenBlockBuffer)
                continue;
            for (var j = 1; j < tokenBlock.length; j++)
                if (tokenBlock[j] === chr)
                    return (true);
            return (false);
        }
        if (buffer[0] === '{')
            return (true);
        return (false);
    };
    DrapoParser.prototype.IsLetterOrNumber = function (chr) {
        return (chr.match(/^[a-zA-Z0-9_.-]+$/i) != null);
    };
    DrapoParser.prototype.IsNumber = function (chr) {
        if (chr == null)
            return (false);
        if (typeof chr !== 'string')
            chr = chr.toString();
        return (chr.match(/^(\-)?((\d)+)?(\.)?(\d)+$/i) != null);
    };
    DrapoParser.prototype.IsBoolean = function (data) {
        if (data == null)
            return (false);
        if (typeof data === 'boolean')
            return (true);
        if (typeof data !== 'string')
            data = data.toString();
        return ((data === 'true') || (data === 'false'));
    };
    DrapoParser.prototype.ParseExpressionItem = function (token) {
        var tokenTrim = this.Trim(token);
        var type = this.ParseExpressionItemType(tokenTrim);
        var item = new DrapoExpressionItem(type);
        if (item.Type == DrapoExpressionItemType.Block) {
            var content = tokenTrim.substring(1, tokenTrim.length - 1);
            this.ParseExpressionInsert(item, content);
        }
        item.Value = tokenTrim;
        return (item);
    };
    DrapoParser.prototype.ParseExpressionItemType = function (token) {
        var isBlockEnd = token.substr(token.length - 1, 1) == ')';
        if (isBlockEnd) {
            var isBlockStart = token.substr(0, 1) == '(';
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
    };
    DrapoParser.prototype.IsParseExpressionItemTypeComplete = function (token) {
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
    };
    DrapoParser.prototype.ParseLines = function (data) {
        var lines = [];
        var split = data.split('\r\n');
        for (var i = 0; i < split.length; i++) {
            var line = split[i];
            if (line.length === 0)
                continue;
            lines.push(line);
        }
        return (lines);
    };
    DrapoParser.prototype.ParseHeader = function (data) {
        var index = data.indexOf(':');
        if (index < 0)
            return (null);
        var key = data.substr(0, index);
        var value = data.substr(index + 2);
        return ([key, value]);
    };
    DrapoParser.prototype.ParseFormat = function (format) {
        var tokens = [];
        var buffer = '';
        for (var i = 0; i < format.length; i++) {
            var chr = format[i];
            if (this.IsFormatCharacterCompatible(buffer, chr)) {
                buffer = buffer + chr;
            }
            else {
                if (buffer.length > 0)
                    tokens.push(buffer);
                buffer = chr;
            }
        }
        if (buffer.length > 0)
            tokens.push(buffer);
        return (tokens);
    };
    DrapoParser.prototype.IsFormatCharacterCompatible = function (buffer, chr) {
        if (buffer.length == 0)
            return (true);
        if (buffer[buffer.length - 1] === chr)
            return (true);
        if (this.IsNumber(buffer) && (this.IsNumber(chr)))
            return (true);
        return (false);
    };
    DrapoParser.prototype.ParsePixels = function (value) {
        if ((value == null) || (value == '') || (value.length < 3))
            return (null);
        var valueNumber = this.ParseNumber(value.substr(0, value.length - 2));
        return (valueNumber);
    };
    DrapoParser.prototype.ParseQuery = function (value, options) {
        if ((value == null) || (value === ''))
            return (null);
        var query = new DrapoQuery();
        var projections = this.ParseQueryProjections(value);
        if (projections === null) {
            query.Error = "Can't parse the projections.";
            return (query);
        }
        query.Projections = projections;
        var sources = this.ParseQuerySources(value);
        if (sources === null) {
            query.Error = "Can't parse the sources.";
            return (query);
        }
        query.Sources = sources;
        query.Filter = this.ParseQueryFilter(value);
        var sorts = this.ParseQueryOrderBy(value);
        if (sorts === null) {
            query.Error = "Can't parse the order by.";
            return (query);
        }
        query.Sorts = sorts;
        query.Options = this.ParseQueryOptions(options);
        return (query);
    };
    DrapoParser.prototype.ParseQueryProjections = function (value) {
        var tokenProjections = this.ParseSubstring(value, "SELECT", "FROM");
        if (tokenProjections === null)
            return (null);
        var projections = [];
        var tokenProjectionsSplit = this.ParseBlock(tokenProjections, ',');
        for (var i = 0; i < tokenProjectionsSplit.length; i++) {
            var tokenProjection = tokenProjectionsSplit[i];
            var projection = this.ParseQueryProjection(tokenProjection);
            if (projection === null)
                return (null);
            projections.push(projection);
        }
        return (projections);
    };
    DrapoParser.prototype.ParseQueryProjection = function (value) {
        var projection = new DrapoQueryProjection();
        var valueTrim = this.Trim(value);
        var valueTrimSplit = this.ParseBlock(valueTrim, ' ');
        var alias = this.ParseQueryProjectionAlias(valueTrimSplit);
        projection.Alias = alias;
        var valueTrimFirst = valueTrimSplit[0];
        var functionName = this.ParseQueryProjectionFunctionName(valueTrimFirst);
        if (functionName !== null) {
            projection.FunctionName = functionName;
            var functionParameters = this.ParseQueryProjectionFunctionParameters(valueTrimFirst);
            projection.FunctionParameters = this.ParseQueryProjectionFunctionParametersBlock(functionParameters);
        }
        else {
            var valueDefinition = valueTrimFirst;
            var isMustache = this.IsMustache(valueDefinition);
            var valueTrimFirstSplit = isMustache ? [valueDefinition] : this.ParseBlock(valueDefinition, '.');
            var source = (valueTrimFirstSplit.length > 1) ? valueTrimFirstSplit[0] : null;
            var column = (valueTrimFirstSplit.length > 1) ? valueTrimFirstSplit[1] : valueTrimFirstSplit[0];
            projection.Source = source;
            projection.Column = column;
        }
        return (projection);
    };
    DrapoParser.prototype.ParseQueryProjectionFunctionName = function (value) {
        var index = value.indexOf('(');
        if (index < 0)
            return (null);
        var functionName = value.substr(0, index).toUpperCase();
        return (functionName);
    };
    DrapoParser.prototype.ParseQueryProjectionFunctionParameters = function (value) {
        var index = value.indexOf('(');
        if (index < 0)
            return (null);
        var parameters = value.substring(index + 1, value.length - 1);
        return (parameters);
    };
    DrapoParser.prototype.ParseQueryProjectionFunctionParametersBlock = function (value) {
        return (this.ParseBlock(value, ','));
    };
    DrapoParser.prototype.ParseQueryProjectionFunctionParameterValue = function (value) {
        return (this.ParseBlock(value, '.'));
    };
    DrapoParser.prototype.ParseQueryProjectionAlias = function (values) {
        if (values.length != 3)
            return (null);
        if (values[1].toUpperCase() !== 'AS')
            return (null);
        return (values[2]);
    };
    DrapoParser.prototype.ParseQuerySources = function (value) {
        var tokenSources = this.ParseSubstring(value, 'FROM', 'WHERE', true);
        var tokenSourcesSplit = this.ParseQuerySourcesSplit(tokenSources);
        var sources = [];
        for (var i = 0; i < tokenSourcesSplit.length; i++) {
            var source = this.ParseQuerySource(tokenSourcesSplit[i]);
            if (source === null)
                return (null);
            sources.push(source);
        }
        return (sources);
    };
    DrapoParser.prototype.ParseQuerySource = function (value) {
        var source = new DrapoQuerySource();
        var joinType = this.ParseQuerySourceHeadValue(value, 'JOIN');
        source.JoinType = this.Trim(joinType);
        var sourceToken = joinType === null ? value : this.ParseSubstring(value, 'JOIN', 'ON');
        var sourceProjection = this.ParseQueryProjection(sourceToken);
        source.Source = sourceProjection.Column;
        source.Alias = sourceProjection.Alias;
        if (joinType !== null) {
            var indexOn = value.indexOf('ON');
            if (indexOn < 0)
                return (null);
            var onToken = value.substring(indexOn + 2);
            var onConditional = this.ParseQueryConditional(onToken);
            if (onConditional === null)
                return (null);
            if (onConditional.Comparator !== '=')
                return (null);
            source.JoinConditions.push(onConditional);
        }
        return (source);
    };
    DrapoParser.prototype.ParseQueryConditional = function (value) {
        var conditional = new DrapoQueryCondition();
        var item = this.ParseExpression(value);
        var leftProjection = this.ParseQueryProjection(item.Items[0].Value);
        conditional.SourceLeft = leftProjection.Source;
        conditional.ColumnLeft = leftProjection.Column;
        if (conditional.SourceLeft == null)
            conditional.ValueLeft = conditional.ColumnLeft;
        conditional.Comparator = item.Items[1].Value.toUpperCase();
        var index = 2;
        if ((item.Items.length === 4) && (conditional.Comparator === 'IS') && (item.Items[index].Value === 'NOT')) {
            conditional.Comparator = 'IS NOT';
            index++;
        }
        var valueRight = item.Items[index].Value;
        if (valueRight.toUpperCase() === 'NULL') {
            conditional.IsNullRight = true;
        }
        else {
            var rightProjection = this.ParseQueryProjection(valueRight);
            conditional.SourceRight = rightProjection.Source;
            conditional.ColumnRight = rightProjection.Column;
            if (conditional.SourceRight == null)
                conditional.ValueRight = conditional.ColumnRight;
        }
        return (conditional);
    };
    DrapoParser.prototype.ParseSubstring = function (value, start, end, canMissEnd) {
        if (canMissEnd === void 0) { canMissEnd = false; }
        var indexStart = value.indexOf(start);
        if (indexStart < 0)
            return (null);
        var indexEnd = end === null ? -1 : value.indexOf(end);
        if (indexEnd < 0) {
            if (canMissEnd)
                indexEnd = value.length;
            else
                return (null);
        }
        var substring = value.substring(indexStart + start.length, indexEnd);
        return (substring);
    };
    DrapoParser.prototype.ParseQuerySourcesSplit = function (value) {
        value = this.Trim(value);
        var sources = [];
        while (value.length != 0) {
            var source = this.ParseQuerySourceHead(value);
            sources.push(source);
            if (value === source)
                break;
            value = value.substring(source.length, value.length);
            value = this.Trim(value);
        }
        return (sources);
    };
    DrapoParser.prototype.ParseQuerySourceHead = function (value) {
        var header = this.ParseQuerySourceHeadValue(value, 'INNER JOIN');
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
    };
    DrapoParser.prototype.ParseQuerySourceHeadValue = function (value, search) {
        var index = value.indexOf(search, 1);
        if (index < 0)
            return (null);
        var header = value.substring(0, index);
        return (header);
    };
    DrapoParser.prototype.ParseQueryFilter = function (value) {
        var whereToken = this.ParseSubstring(value, 'WHERE', 'ORDER BY', true);
        if (whereToken === null)
            return (null);
        var filter = this.ParseQueryConditional(whereToken);
        return (filter);
    };
    DrapoParser.prototype.ParseQueryOrderBy = function (value) {
        var sorts = [];
        var token = this.ParseSubstring(value, 'ORDER BY ', null, true);
        if (token === null)
            return (sorts);
        var blocks = this.ParseBlock(token, ',');
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            var parts = this.ParseBlock(block, ' ');
            if (parts.length > 2)
                return (null);
            var sort = new DrapoQuerySort();
            sort.Column = parts[0];
            if (parts.length > 1)
                sort.Type = parts[1];
            sorts.push(sort);
        }
        return (sorts);
    };
    DrapoParser.prototype.ParseQueryOptions = function (value) {
        var options = new DrapoQueryOptions();
        if (value == null)
            return (options);
        var optionsValues = this.ParseBlock(value, ';');
        for (var i = 0; i < optionsValues.length; i++) {
            var optionsValue = this.ParseBlock(optionsValues[i], '=');
            if (optionsValue[0] === 'list')
                options.List = optionsValue[1];
        }
        return (options);
    };
    DrapoParser.prototype.ParseSwitch = function (value) {
        var items = [];
        var switchItems = this.ParseBlock(value, ',');
        for (var i = 0; i < switchItems.length; i++) {
            var switchItem = this.ParseBlock(switchItems[i], ':');
            var item = [switchItem[0], switchItem.length > 1 ? switchItem[1] : null];
            items.push(item);
        }
        return (items);
    };
    return DrapoParser;
}());
