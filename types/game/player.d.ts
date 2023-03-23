interface IPlayer<PrePhase extends boolean = true> {
    readonly username: string;
    country: Switch<PrePhase, string | null, string>;
}
