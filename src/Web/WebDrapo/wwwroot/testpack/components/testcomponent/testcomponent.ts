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
        this._counter = 0;
    }

    async Initialize() {
        console.log('TestComponent initialized from pack!');
        this.UpdateDisplay();
    }

    async Increment() {
        this._counter++;
        this.UpdateDisplay();
    }

    async Reset() {
        this._counter = 0;
        this.UpdateDisplay();
    }

    UpdateDisplay() {
        const counterElement = this._el.querySelector('.counter');
        if (counterElement) {
            counterElement.textContent = this._counter.toString();
        }
    }
}