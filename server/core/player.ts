import { Country } from '@/core/country';
import { Game } from './game-loop/game';

export class Player<PrePhase extends boolean = true> {
    // @ts-expect-error
    public country: Switch<PrePhase, Country | null, Country> = null;

    public constructor(
        public readonly username: string,
        public readonly game: Game
    ) { }

    public selectCountry(countryName: string): void {
        if (this.country?.name === countryName) return;

        const old = this.country;
        const selection = this.game.getCountryByName(countryName);

        this.country = selection;

        if (old)
            old.players.delete(this as Player);

        this.country.addPlayer(this as Player);
    }

    public editForm(form: IOrderEdit): void {
        this.country?.editOrder(form);
    }

    public toJSON(): IPlayer {
        return {
            username: this.username,
            country: this.country?.name ?? null
        }
    }
}
