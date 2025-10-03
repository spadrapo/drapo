class DrapoPack {
    //Properties
    public Name: string;
    public IncludePaths: string[];
    public ExcludePaths: string[];

    //Constructors
    constructor(name: string = null) {
        this.Name = name;
        this.IncludePaths = [];
        this.ExcludePaths = [];
    }

    public AddIncludePath(includePath: string): DrapoPack {
        if (includePath != null && includePath !== '')
            this.IncludePaths.push(includePath);
        return this;
    }

    public AddExcludePath(excludePath: string): DrapoPack {
        if (excludePath != null && excludePath !== '')
            this.ExcludePaths.push(excludePath);
        return this;
    }
}