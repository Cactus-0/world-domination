type In = Record<string, () => any>;
type Out<T extends In> = { [K in keyof T]: ReturnType<T[K]> }

export function createGettersDict<T extends In, U extends object = {}>(o: T, target?: U): Out<T> & U {
    target ??= {} as U;

    Object.entries(o).forEach(([ key, get ]) => {
        Object.defineProperty(target, key, { get });
    });

    return target as Out<T> & U;
}
