class DrapoQuerySource {
    private _joinType: string = null;
    private _source: string = null;
    private _alias: string = null;
    private _joinConditions: DrapoQueryCondition[] = [];

    get JoinType(): string {
        return (this._joinType);
    }
    set JoinType(value: string) {
        this._joinType = value;
    }
    get Source(): string {
        return (this._source);
    }
    set Source(value: string) {
        this._source = value;
    }
    get Alias(): string {
        return (this._alias);
    }
    set Alias(value: string) {
        this._alias = value;
    }
    get JoinConditions(): DrapoQueryCondition[] {
        return (this._joinConditions);
    }
    set JoinConditions(value: DrapoQueryCondition[]) {
        this._joinConditions = value;
    }
}