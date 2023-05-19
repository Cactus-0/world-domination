type In<K extends string> = {
	[key in K]: string;
};

const defaultKey = 'name' as const;

export function arrayToDict<
	T extends In<K>,
	K extends string = typeof defaultKey
>(
	array: T[],
	// @ts-expect-error
	key: K = defaultKey
): Dict<T> {
	const res: Dict<T> = {};

	array.forEach((item) => (res[item[key]] = item));

	return res;
}
