import { format } from './date-format';
import { formatString } from './format-string';

const wrap = <R>(fn: (text: string) => R) =>
    (text: string) => fn(formatString(`/grey/ ${format(new Date)} - // ${text}`))

export const log = wrap(console.log);
export const error = wrap(console.error);
