export function random(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export namespace random {
    export const array = <T>(array: T[]): T => array[random(array.length)];
}
