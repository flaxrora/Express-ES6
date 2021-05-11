class SingletonContainer {
    private static _container = new Map<string, any>();

    private static _has(key: string) {
        return this._container.has(key);
    }

    private static set(key: string, value: any) {
        !this._has(key) && this._container.set(key, value);
    }

    /**
     * Get created `{any}` instance from container with `{string}` key
     */
    public static get(key: string) {
        return this._container.get(key);
    }

    /**
     * Create `{any}` instance with `{string}` key
     */
    public static create(key: string, value: any) {
        this.set(key, value);
        return this.get(key);
    }

    /**
     * Delete instance with key
     */
    public static delete(key: string) {
        this._container.delete(key);
    }
}

export default SingletonContainer;
