import colors from 'colors/safe';

const regexp = /\/([a-z:]+)\/([^\/]+)\/\//gi;
type Method = FilterKeys<typeof colors, (a: string) => string>;

export function formatString(string: string): string {
    return string
        .replace(regexp, (_, formatRule: string, text: string) =>
            formatRule.split(':').reduce((prev, current) => colors[current as Method](prev), text.trim()))
        .replace(/\/\\{2}\//g, '//');
}
