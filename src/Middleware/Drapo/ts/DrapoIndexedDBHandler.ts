class DrapoIndexedDBHandler {
    private _dbName: string = 'drapo';
    private _tableName: string = 'cache';
    private _version: number = 1;
    private _db: IDBDatabase = null;

    public async Initialize(): Promise<boolean> {
        try {
            this._db = await this.OpenDatabase();
            return true;
        } catch (e) {
            return false;
        }
    }

    private OpenDatabase(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this._dbName, this._version);

            request.onerror = () => {
                reject(new Error('Failed to open IndexedDB'));
            };

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this._tableName)) {
                    const objectStore = db.createObjectStore(this._tableName, { keyPath: 'key' });
                    objectStore.createIndex('key', 'key', { unique: true });
                }
            };
        });
    }

    public async GetItem(key: string): Promise<string | null> {
        if (!this._db) {
            return null;
        }

        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction([this._tableName], 'readonly');
            const objectStore = transaction.objectStore(this._tableName);
            const request = objectStore.get(key);

            request.onerror = () => {
                reject(new Error('Failed to get item from IndexedDB'));
            };

            request.onsuccess = () => {
                const result = request.result;
                resolve(result ? result.value : null);
            };
        });
    }

    public async SetItem(key: string, value: string): Promise<void> {
        if (!this._db) {
            throw new Error('IndexedDB not initialized');
        }

        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction([this._tableName], 'readwrite');
            const objectStore = transaction.objectStore(this._tableName);
            const request = objectStore.put({ key, value });

            request.onerror = () => {
                reject(new Error('Failed to set item in IndexedDB'));
            };

            request.onsuccess = () => {
                resolve();
            };
        });
    }

    public async RemoveItem(key: string): Promise<void> {
        if (!this._db) {
            throw new Error('IndexedDB not initialized');
        }

        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction([this._tableName], 'readwrite');
            const objectStore = transaction.objectStore(this._tableName);
            const request = objectStore.delete(key);

            request.onerror = () => {
                reject(new Error('Failed to remove item from IndexedDB'));
            };

            request.onsuccess = () => {
                resolve();
            };
        });
    }

    public async GetAllKeys(): Promise<string[]> {
        if (!this._db) {
            return [];
        }

        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction([this._tableName], 'readonly');
            const objectStore = transaction.objectStore(this._tableName);
            const request = objectStore.getAllKeys();

            request.onerror = () => {
                reject(new Error('Failed to get all keys from IndexedDB'));
            };

            request.onsuccess = () => {
                resolve(request.result as string[]);
            };
        });
    }

    public async Clear(): Promise<void> {
        if (!this._db) {
            throw new Error('IndexedDB not initialized');
        }

        return new Promise((resolve, reject) => {
            const transaction = this._db.transaction([this._tableName], 'readwrite');
            const objectStore = transaction.objectStore(this._tableName);
            const request = objectStore.clear();

            request.onerror = () => {
                reject(new Error('Failed to clear IndexedDB'));
            };

            request.onsuccess = () => {
                resolve();
            };
        });
    }

    public IsAvailable(): boolean {
        return 'indexedDB' in window && window.indexedDB !== null;
    }
}