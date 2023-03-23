import { Game } from '@/core/game-loop/game';
import { Socket } from 'socket.io';
import { registerWS } from './register-ws';

type WebSocket = Socket<IClientToServerEvents, IServerToClientEvents, object, any>;

export const createWSController = (game: Game) => (socket: WebSocket) => {
    if (game.phase !== 'pre-phase') {
        socket.emit('error', 'Вы не можете присоединится к игре, которая уже идёт');
        socket.disconnect(true);
    }

    try {
        registerWS(game, socket);
    } catch (error: unknown) {
        socket.emit('error', error instanceof Error ? error.message : String(error));
        socket.disconnect(true);
        return;
    }
}
