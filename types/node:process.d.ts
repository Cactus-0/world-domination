declare namespace NodeJS {
    export interface Process {
        readonly isDev: boolean;
        readonly isProd: boolean;
    }
}
