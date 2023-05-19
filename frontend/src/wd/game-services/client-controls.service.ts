import { Injectable } from '@angular/core';
import { EventEmitter } from '@shared/typed-event-emitter';
import { GameService, GameServiceConnectionState } from './game.service';

type Events = {
    'order-sync': (newOrder: IOrder) => void;
}

@Injectable({
    providedIn: 'root'
})
export class ClientControlsService<
    Connection extends GameServiceConnectionState = 'not-connected'
> extends EventEmitter<Events> {
    public country: ICountry & { private: ICountryPrivateState } | null = null;
    public order: IOrder | null = null;

    public constructor(
        private readonly gameService: GameService<Connection>,
    ) {
        super();

        this.gameService.socket?.on('order-sync', newOrder => {
            this.order = newOrder;

            if (this.country)
                this.country.private.order = newOrder;

            this.emit('order-sync', newOrder);
        });

        this.gameService.socket?.on('country-private-state-sync', state => {
            this.country = state;
        });
    }

    public changeCountry(name: string): void {
        this.gameService.socket?.emit('change-country', name);
    }

    public anotherCountries(): ICountry[] {
        if (!this.gameService.gameState?.countries) {
            return [];
        }

        const result = { ...this.gameService.gameState?.countries };

        if (this.country?.name)
            delete result[this.country?.name];

        return Object.values(result);
    }
}
