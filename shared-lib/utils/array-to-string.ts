export function arrayToString(arr: string[]): string {
    if (arr.length === 0)
        return 'none';
    else
        return arr.join(', ');
}
