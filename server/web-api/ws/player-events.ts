import { Country } from '@/core/country';
import { Game } from '@/core/game-loop';
import { Player } from '@/core/player';
import { log } from '@/logger';
import { Socket } from 'socket.io';

export function playerEvents(
    player: Player<boolean>,
    socket: Socket<IClientToServerEvents, IServerToClientEvents>,
    game: Game
): void {
    const privateStateSync = (country: Country) => {
        if (player.country !== country) return;
        socket.emit('country-private-state-sync', country.toPrivateJSON());
    }

    const orderSync = (country: Country, order: IOrder) => {
        if (player.country !== country) return;
        socket.emit('order-sync', order);
    }

    const publicStateSync = (state: IGameState) => socket.emit('state-sync', state);

    socket.on('change-country', newCountryName => player.selectCountry(newCountryName));
    socket.on('order-edit', form => player.editForm(form));

    socket.on('send-money', (countryName, money) => {
        const target = game.getCountryByName(countryName);
        
        try {
            player.country!.giveMoneyTo(target, money);
            
            log(`/green/${player.country!.name}// (от лица /green/${player.username}//)` 
                + ` передаёт /green/${money}// грн стране "/green/${target.name}//"`);
        } catch {
            return;
        }

        game.syncPrivateState(target);
        game.syncPrivateState(player.country!);
    });

    game.on('order-sync', orderSync);
    game.on('private-state-sync', privateStateSync);
    game.on('public-state-sync', publicStateSync);

    socket.on('disconnect', () => {
        game.destroyPlayer(player);
        
        game.off('order-sync', orderSync);
        game.off('private-state-sync', privateStateSync);
        game.off('public-state-sync', publicStateSync);

        log(`Disconnected: /red/ ${player.username} //`);
    });
}
