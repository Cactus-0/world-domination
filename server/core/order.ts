import { price } from '@shared/price';
import { arrayToString } from '@utils/array-to-string';
import { Country } from './country';
import { Game } from './game-loop/game';

interface OrderProcessingContext {
    country: Country;
    defaults: IDefaults;
    game: Game;
}

export class Order implements IOrder {
    public buyNuclearTechnology!: boolean;
    public buildNuke!: number;
    public cityDevelopments!: string[];
    public buildCityShields!: string[];
    public improveEcology!: boolean;
    public nuclearAttackTargets!: string[];
    public sanctions!: string[];

    public constructor(private readonly ctx: OrderProcessingContext) {
        this.reset();
    }

    public edit(form: IOrderEdit): void {
        if (form.type === 'primitive')
            // TODO: жопа, потом поменять
            // @ts-expect-error
            this[form.field] = form.newValue;
        else if (form.action === 'remove')
            this[form.field].splice(form.index as number, 1);
        else
            this[form.field].push(form.index as string);
    }

    public price(defaults: IDefaults): number {
        return price.order(defaults, this);
    }

    public reset(): void {
        this.improveEcology = false;
        this.buildCityShields = [];
        this.cityDevelopments = [];
        this.nuclearAttackTargets = [];
        this.buildNuke = 0;
        this.buyNuclearTechnology = false;
        this.sanctions ??= [];
    }
    
    public process(): void {
        if (this.ctx.country.private.hasNuclearTechnology)
            this.buyNuclearTechnology = false;
        else
            this.buildNuke = 0;

        if (this.buildNuke > 3)
            this.buildNuke = 3;
        
        const price = this.price(this.ctx.defaults);

        if (price > this.ctx.country.private.budget) return;

        this.ctx.country.private.budget -= price;

        if (this.buyNuclearTechnology)
            this.ctx.country.private.hasNuclearTechnology = true;

        if (this.buildNuke) {
            this.ctx.country.private.nuclearBombs += this.buildNuke;

            const ecologyAffect = this.ctx.defaults.nuclearBombCreationEcologyAffect * this.buildNuke;

            if (ecologyAffect >= this.ctx.country.private.ecology)
                this.ctx.country.private.ecology = 0;
            else
                this.ctx.country.private.ecology -= ecologyAffect;
        }

        if (this.improveEcology)
            this.ctx.country.private.ecology += this.ctx.defaults.perLevelEcologyImprovement;

        this.cityDevelopments.forEach(cityName => {
            const city = this.ctx.country.cities.find(({ name }) => name === cityName);

            if (!city) return;

            city.private!.developmentLevel += this.ctx.defaults.perLevelCityDevelopmentImprovement;
        });

        this.buildCityShields.forEach(cityName => {
            const city = this.ctx.country.cities.find(({ name }) => name === cityName);

            if (!city) return;

            city.private!.hasNukeShield = true;
        });
    }

    public processAttacks(): ICityAttackInfo[] {
        const result: ICityAttackInfo[] = [];

        this.nuclearAttackTargets.slice(0, this.ctx.country.private.nuclearBombs).forEach(name => {
            const city = this.ctx.game.getCityByName(name);
            result.push(this.ctx.country.attack(city));
        });

        return result;
    }

    public toLogStrings(): string[] {
        const result: string[] = [];

        if (this.buyNuclearTechnology)
            result.push('изучает /green/ядерную технологию//');
        if (this.buildNuke > 0)
            result.push(`создаёт /green/${this.buildNuke}// ядерных бомб`);
        if (this.improveEcology)
            result.push(`вкладывается в /green/экологию//`);
        if (this.buildCityShields.length > 0)
            result.push(`защищает города: ${this.buildCityShields.map(city => `/green/${city}//`).join(', ')}`);
        if (this.cityDevelopments.length > 0)
            result.push(`улучшает города: ${this.cityDevelopments.map(city => `/green/${city}//`).join(', ')}`);
        if (this.nuclearAttackTargets.length > 0)
            result.push(`атакует города: ${this.nuclearAttackTargets.map(city => `/green/${city}//`).join(', ')}`);

        return result;
    }
}
