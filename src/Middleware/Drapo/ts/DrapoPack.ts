class DrapoPack {
    //Properties
    public Name: string;
    public FilesPath: string;
    public ExcludePaths: string[];

    //Constructors
    constructor(name: string = null, filesPath: string = null) {
        this.Name = name;
        this.FilesPath = filesPath;
        this.ExcludePaths = [];
    }

    public AddExcludePath(excludePath: string): DrapoPack {
        if (excludePath != null && excludePath !== '')
            this.ExcludePaths.push(excludePath);
        return this;
    }
}