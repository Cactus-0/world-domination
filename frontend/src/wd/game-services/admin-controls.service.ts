import { Injectable } from '@angular/core';
import { GameService, GameServiceConnectionState } from './game.service';

@Injectable()
export class AdminControlsService<Connection extends GameServiceConnectionState = 'not-connected'> {
    public constructor(
        private readonly gameService: GameService<Connection>,
    ) { }

    public startGame(): void {
        this.gameService.socket?.emit('end-pre-phase');
    }
}
