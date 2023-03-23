import { Component } from '@angular/core';
import { GameService } from '../game-services/game.service';

@Component({
    selector: 'wd-global-state',
    templateUrl: './global-state.component.html',
    styleUrls: [ './global-state.component.scss' ]
})
export class GlobalStateComponent {
    public constructor(
        private readonly gameService: GameService,
    ) { }

    public get username(): string {
        return this.gameService.username!;
    }

    public get state(): IGameState {
        return this.gameService.gameState!;
    }

    public get phase(): string {
        switch (this.state.phase) {
            case 'global-conversation':
                return 'Глобальное обсуждение';
            case 'team-conversation':
                return 'Обсуждение в командах';
            default:
                return 'Другая херня';
        }
    }
}
