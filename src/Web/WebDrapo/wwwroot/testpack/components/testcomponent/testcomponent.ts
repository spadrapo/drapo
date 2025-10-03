window.packJsLoaded = true;

// Simple test function
function testPackFunction() {
    return 'Pack JavaScript loaded successfully!';
}

// Component constructor for our test component
async function testComponentConstructor(el, app) {
    let instance = new TestComponent(el, app);
    await instance.Initialize();
    return instance;
}

class TestComponent {
    constructor(el, app) {
        this._el = el;
        this._app = app;
        this._sector = app._document.GetSector(el);
    }

    async Initialize() {
        console.log('TestComponent initialized from pack!');
        // Set initial counter value
        await this._app._functionHandler.ResolveFunctionWithoutContext(
            this._sector, 
            this._el, 
            'UpdateDataField(componentData,counter,0)'
        );
    }

    async Increment() {
        await this._app._functionHandler.ResolveFunctionWithoutContext(
            this._sector, 
            this._el, 
            'UpdateDataField(componentData,counter,{{componentData.counter}} + 1)'
        );
    }
}