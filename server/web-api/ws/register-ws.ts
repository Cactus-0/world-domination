import { Socket } from 'socket.io';
import { getClientIp } from '@supercharge/request-ip';
import { Constants } from '@/constants';
import { Game } from '@/core/game-loop/game';
import { playerEvents } from './player-events';
import { adminEvents } from './admin-events';
import { log } from '@/logger';

export function registerWS(game: Game, socket: Socket<IClientToServerEvents, IServerToClientEvents>) {
    let username = socket.request.headers[Constants.UsernameWebSocketHeader];

    if (username === undefined)
        throw new Error('There is no username provided');

    if (Array.isArray(username))
        username = username[0];
    
    username = decodeURIComponent(username);

    const ip = getClientIp(socket.request);

    if (/^localhost:\d+$/.test(socket.request.headers.host ?? '') && !game.hasAdmin) {
        const admin = game.setAdmin(username);
        adminEvents(admin, socket, game);
        socket.emit('accept-login', true);
        log(`Admin connection: ${username}`);
    } else {
        const player = game.registerPlayer(username);
        playerEvents(player, socket, game);
        socket.emit('accept-login', false);
        log(`Connected: ${username} /grey/ (${ip}) //`);
    }
}
