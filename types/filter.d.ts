declare type Filter<From extends object, Keep = any> = {
    [K in keyof From]: From[K] extends Keep ? From[K] : never;
}

declare type FilterKeys<From extends object, Keep = any> = {
    [K in keyof From]: From[K] extends Keep ? K : never;
}[keyof From];
