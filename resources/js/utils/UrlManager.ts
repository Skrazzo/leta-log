// My made class for managing url queries

interface QueryParamsObject {
    [key: string]: string | string[];
}

export class UrlManager {
    private params: URLSearchParams;

    constructor() {
        this.params = new URLSearchParams(window.location.search);
    }

    // Update url
    private update(newParams: URLSearchParams, replaceHistory: boolean = false): void {
        const newSearch = newParams.toString();
        // Only add ? if theres parameters
        const newUrl = `${window.location.pathname}${newSearch ? "?" : ""}${newSearch}`;

        // Do we want it to show in history?
        if (replaceHistory) {
            window.history.replaceState({}, "", newUrl);
        } else {
            window.history.pushState({}, "", newUrl);
        }
        this.params = newParams; // Update internal state
    }

    // Get value from query
    public get(key: string): string | null {
        return this.params.get(key);
    }

    // Get all keys, and values from url, return object
    public getAllAsObject(): QueryParamsObject {
        const obj: QueryParamsObject = {};
        for (const key of this.params.keys()) {
            const values = this.params.getAll(key);
            obj[key] = values.length > 1 ? values : values[0];
        }
        return obj;
    }

    // Set single query param
    public set(key: string, value: string, replaceHistory: boolean = false): void {
        const newParams = new URLSearchParams(this.params.toString());
        newParams.set(key, value);
        this.update(newParams, replaceHistory);
    }

    // Set multiple query params with a single call
    public setMultiple(paramsToSet: Record<string, string | undefined | null>, replaceHistory: boolean = false): void {
        const newParams = new URLSearchParams(this.params.toString());
        for (const key in paramsToSet) {
            if (Object.prototype.hasOwnProperty.call(paramsToSet, key)) {
                const value = paramsToSet[key];
                if (value === undefined || value === null) {
                    newParams.delete(key);
                } else {
                    newParams.set(key, String(value));
                }
            }
        }
        this.update(newParams, replaceHistory);
    }

    // Remove query param from url
    public remove(key: string, replaceHistory: boolean = false): void {
        const newParams = new URLSearchParams(this.params.toString());
        newParams.delete(key);
        this.update(newParams, replaceHistory);
    }

    // Remove all query params from url
    public clear(replaceHistory: boolean = false): void {
        this.update(new URLSearchParams(), replaceHistory);
    }
}
