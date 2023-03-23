export function deepObjectAssign<T extends object>(target: T, object: DeepPartial<T>): T {
    Object.entries(object).forEach(([ key, value ]) => {
        if (typeof value === 'object') {
            // @ts-expect-error
            deepObjectAssign(target[key], value);
            return;
        }

        // @ts-expect-error
        target[key] = value;
    });
    
    return target as T;
}
