export function mapDict<T, U>(dict: Dict<T>, fn: (obj: T) => U): Dict<U> {
	const res: Dict<U> = {};

	for (const key in dict)
        res[key] = fn(dict[key]);

	return res;
}
