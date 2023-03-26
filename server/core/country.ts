import { average } from '@utils/average';
import { countries } from './countries';
import { Game } from './game-loop';
import { Order } from './order';
import { Player } from './player';
import { City } from './city';

export class Country implements ICountry {
    public readonly name: string;
    public readonly flagUrl: string;
    public readonly cities: City[];

    public private: ICountryPrivateState & { order: Order };

    public static readonly list: ICountryData[] = countries;

    public readonly players: Set<Player> = new Set;

    public constructor(
        countryData: ICountryData,
        private readonly game: Game
    ) {
        this.name = countryData.name;
        this.flagUrl = countryData.flagUrl;
        this.cities = countryData.cities.map(raw => new City(raw, game, this));

        this.private = {
            budget: game.defaults.startCountryBudget,
            ecology: game.defaults.startCountryEcologyLevel,
            hasNuclearTechnology: false,
            nuclearBombs: 0,
            order: new Order({ country: this, defaults: game.defaults, game })
        }
    }

    public get averageLifeLevel(): number {
        return average(...this.cities.map(city => city.lifeLevel));
    }

    public addPlayer(player: Player) {
        this.players.add(player);
        this.game.syncPublicState();
    }

    public giveMoneyTo(country: Country, amount: number) {
        if (this.private.budget < amount)
            throw new Error('Not enough money');

        this.private.budget -= amount;
        country.private.budget += amount;
    }

    public attack(target: City): ICityAttackInfo {
        if (this.private.nuclearBombs < 1)
            throw new Error(`${this.name} has not nuclear bombs for attack on ${target.name}`);

        this.private.nuclearBombs--;

        return target.nukeAttack(this.name);
    }

    public increaseBudget(): void {
        this.cities.forEach(city => this.private.budget += city.private.perYearIncome);
    }

    public editOrder(form: IOrderEdit): void {
        this.private.order.edit(form);
        this.game.emit('order-sync', this, this.private.order);
    }

    public toJSON(cityPrivateInfo: boolean = false): ICountry {
        return {
            name: this.name,
            flagUrl: this.flagUrl,
            cities: this.cities.map(city => cityPrivateInfo ? city.toPrivateJSON() : city.toJSON()),
            averageLifeLevel: this.averageLifeLevel,
        }
    }

    public toPrivateJSON(): ICountry & { private: ICountryPrivateState } {
        return {
            private: this.private!,
            ...this.toJSON(true),
        }
    }
}
