import { Country } from '@/core/country';

export type GameLoopEvents = {
    'public-state-sync': (state: IGameState) => void;
    'private-state-sync': (country: Country) => void;
    'order-sync': (country: Country, state: IOrder) => void;
}
