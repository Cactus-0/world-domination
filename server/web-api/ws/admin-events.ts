import { Admin } from '@/core/admin';
import { Game } from '@/core/game-loop';
import { Socket } from 'socket.io';

export function adminEvents(
    admin: Admin,
    socket: Socket<IAdminClientToServerEvents, IAdminServerToClientEvents>,
    game: Game
): void {
    const publicStateSync = (state: IGameState) => socket.emit('state-sync', state);

    socket.on('end-pre-phase', () => game.endPrePhase());
    socket.on('force-phase-skip', () => admin.emit('force-phase-skip'));

    game.on('public-state-sync', publicStateSync);

    socket.once('disconnect', () => {
        game.destroyAdmin();
        
        game.off('public-state-sync', publicStateSync);
    });
}
