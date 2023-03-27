import { format as dateFormat } from './date-format';
import { format } from './format-string';

const wrap = <R>(fn: (text: string) => R) =>
    (text: string) => fn(format(`/grey/ ${dateFormat(new Date)} - // ${text}`))

export const log = wrap(console.log);
export const error = wrap(console.error);

export * from './format-string';
