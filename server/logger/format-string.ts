import colors from 'colors/safe';

const regexp = /\/([a-z:]+)\/([^\/]+)\/\//gi;
type Method = FilterKeys<typeof colors, (a: string) => string>;

export const escapeSymbol = '%{__slash__}';

export function format(string: string): string {
    return string
        .replace(regexp, (_, formatRule: string, text: string) =>
            formatRule.split(':').reduce((prev, current) => colors[current as Method](prev), text.trim()))
        .replace(/\/\\{2}\//g, '//')
        .replaceAll(escapeSymbol, '/');
}

export namespace format {
    export const s = (raw: TemplateStringsArray, ...rest: any[]) =>
        String.raw({ raw }, rest).replaceAll('/', escapeSymbol);
}
