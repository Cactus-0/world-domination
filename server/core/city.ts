import { Country } from './country';
import { Game } from './game-loop/game';

type TCity = ICity & { private: ICityPrivateState };

const getZero = () => 0;

export class City implements TCity {
    public readonly name!: string;
    public readonly previewUrl!: string;

    public ruined: boolean = false;
    public private: ICityPrivateState;

    public get lifeLevel(): number {
        return Math.floor(this.private.developmentLevel * this.country.private!.ecology * 100) * 0.01;
    }

    public constructor(
        data: ICityData,
        game: Game,
        private readonly country: Country,
    ) {
        Object.assign(this, data);

        const city = this;

        this.private = {
            developmentLevel: game.defaults.startCityDevelopmentLevel,
            hasNukeShield: false,
            
            get perYearIncome(): number {
                if (city.ruined) return 0;

                const sanctions = country.private.sanctionsFrom.length;

                return Math.floor(
                    city.lifeLevel * game.defaults.maxPerYearIncome *
                    (1 - sanctions * game.defaults.sanctionsAffect / (game.countries.size - 1))
                );
            }
        }
    }

    public nukeAttack(source: string): ICityAttackInfo {
        const info: ICityAttackInfo = {
            source,
            targetCountry: this.country.name,
            targetCity: this.name,
            success: true
        };

        if (this.private.hasNukeShield) {
            this.private.hasNukeShield = false;
            info.success = false;
            return info;
        }

        this.private.developmentLevel = 0;
        this.ruined = true;

        return info;
    }

    public ruin(): void {
        const descriptor: PropertyDescriptor = { get: getZero, set: () => undefined };

        Object.defineProperties(this.private, {
            developmentLevel: descriptor,
            perYearIncome: descriptor
        });

        this.ruined = true;
    }

    public toJSON(): ICity {
        return {
            name: this.name,
            lifeLevel: this.lifeLevel,
            previewUrl: this.previewUrl,
            ruined: this.ruined
        }
    }

    public toPrivateJSON(): TCity {
        const city = this.toJSON();
        city.private = this.private;
        return city as TCity;
    }
}
