declare class DrapoQueryProjection {
    private _source;
    private _column;
    private _alias;
    private _functionName;
    private _functionParameters;
    get Source(): string;
    set Source(value: string);
    get Column(): string;
    set Column(value: string);
    get Alias(): string;
    set Alias(value: string);
    get FunctionName(): string;
    set FunctionName(value: string);
    get FunctionParameters(): string[];
    set FunctionParameters(value: string[]);
}
