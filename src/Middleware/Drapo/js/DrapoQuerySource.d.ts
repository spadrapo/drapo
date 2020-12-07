declare class DrapoQuerySource {
    private _joinType;
    private _source;
    private _alias;
    private _joinConditions;
    get JoinType(): string;
    set JoinType(value: string);
    get Source(): string;
    set Source(value: string);
    get Alias(): string;
    set Alias(value: string);
    get JoinConditions(): DrapoQueryCondition[];
    set JoinConditions(value: DrapoQueryCondition[]);
}
