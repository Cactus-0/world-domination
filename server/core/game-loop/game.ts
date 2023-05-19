import { EventEmitter } from '@shared/typed-event-emitter';
import { Admin } from '@/core/admin';
import { City } from '@/core/city';
import { Country } from '@/core/country';
import { Player } from '@/core/player';
import { GameLoopEvents } from '.';
import { log } from '@/logger';
import { arrayToDict } from '@utils/array-to-dict';
import { mapDict } from '@utils/map-dict';

export class Game extends EventEmitter<GameLoopEvents>  {
    public readonly countries: Dict<Country>;
    public readonly players: Dict<Player> = {};
    public year: number = 0;

    private _phase: GamePhase = 'pre-phase';
    private admin: Admin | null = null;
    private winner?: string;

    public constructor(
        public readonly defaults: IDefaults
    ) {
        super();
        this.countries = arrayToDict(Country.list.map(raw => new Country(raw, this)));
    }

    public get phase(): GamePhase {
        return this._phase;
    }

    public get hasAdmin(): boolean {
        return !!this.admin;
    }

    public getCityByName(name: string): City {
        for (const country of Object.values(this.countries)) {
            if (country.cities[name])
                return country.cities[name];
        }

        throw new Error(`There is no city with name "${name}"`);
    }

    public getCountryByName(name: string): Country {
        if (!this.countries[name])
            throw new Error(`There is no city with name "${name}"`);

        return this.countries[name];
    }

    public registerPlayer(username: string): Player {
        if (username in this.players)
            throw new Error(`Имя ${username} уже занято.`);

        const player = new Player(username, this);
        
        this.players[username] = player;

        return player;
    }

    public setAdmin(username: string): Admin {
        if (this.admin !== null)
            throw new Error(`В этой игре уже есть координатор.`);

        if (username in this.players)
            throw new Error(`Имя ${username} уже занято.`);
        
        const admin = new Admin(username);
        this.admin = admin;
        
        return admin;
    }

    public destroyPlayer(player: Player<boolean>) {
        delete this.players[player.username];
        player.country?.players.delete(player);
    }

    public destroyAdmin(): void {
        if (!this.admin) return;

        this.admin = null;
        this.syncPublicState();
    }

    public deleteUselessCountries(): void {
        Object.values(this.countries).forEach(country => {
            if (country.players.size === 0)
                delete this.countries[country.name];
        });
    }

    public endPrePhase(): void {
        this.deleteUselessCountries();
        this.year++;
        this._phase = 'team-conversation';
        
        Object.values(this.countries).forEach(country => {
            this.emit('private-state-sync', country);
            this.emit('order-sync', country, country.private.order);
        });
        
        this.syncPublicState();
        process.nextTick(() => this.activeGameLoop());
    }

    public toJSON(): IGameState {
        return {
            admin: this.admin?.username,
            winner: this.winner,
            year: this.year,
            defaults: this.defaults,
            phase: this.phase,
            countries: mapDict(this.countries, country => country.toJSON()),
            players: mapDict(this.players, player => player.toJSON())
        }
    }

    public endGame(): void {
        this._phase = 'end';
        this.winner = Object.values(this.countries)
            .sort((a, b) => b.averageLifeLevel - a.averageLifeLevel)[0].name;
        this.emit('public-state-sync', this.toJSON());
        this.destroy();
    }

    public destroy(): void {
        Object.values(this.players).forEach(player => this.destroyPlayer(player));
        this.destroyAdmin();
    }

    private async activeGameLoop(): pvoid {
        while (true) {
            log(`New game iteration, year: /cyan/${this.year}//, phase: /cyan/${this.phase}//`);

            if (!this.admin)
                throw new Error(`There is no admin in active game phase`);

            await this.admin.waitFor('force-phase-skip');

            if (this._phase === 'global-conversation') {
                this.year++;
                this._phase = 'team-conversation';
            } else {
                this._phase = 'global-conversation';

                Object.values(this.countries).forEach(country => {
                    country.private.sanctionsFrom = [];
                });

                Object.values(this.countries).forEach(country => {
                    country.private.order.process();
                    
                    country.private.order.sanctions.forEach(name => {
                        this.getCountryByName(name).private.sanctionsFrom.push(country.name);
                    });

                    country.increaseBudget();

                    country.private.order.toLogStrings()
                        .map(log => `/green/${country.name}// ${log}`)
                        .forEach(log);
                });

                Object.values(this.countries).forEach(country => {
                    country.private.order.processAttacks();
                    country.private.order.reset();
                });

                Object.values(this.countries).forEach(country => {
                    this.emit('order-sync', country, country.private.order);
                    this.emit('private-state-sync', country);
                });
            }
            
            if (this.year === this.defaults.rounds + 1) {
                this.endGame();
                break;
            }

            this.syncPublicState();
        }
    }

    public syncPrivateState(country: Country) {
        this.emit('private-state-sync', country);
    }

    public syncPublicState(): void {
        this.emit('public-state-sync', this.toJSON());
    }
}
