import { Component, OnDestroy } from '@angular/core';

import { AdminControlsService } from '@/wd/game-services/admin-controls.service';
import { ClientControlsService } from '@/wd/game-services/client-controls.service';
import { GameService } from '@/wd/game-services/game.service';

@Component({
    selector: 'wd-pre-phase-page',
    templateUrl: './pre-phase.component.html',
    styleUrls: ['./pre-phase.component.scss']
})
export class PrePhasePageComponent implements OnDestroy {
    public trigger: number = 1;

    public readonly stateSyncListener = () => this.forceRerender();

    public constructor(
        public readonly gameService: GameService<'connected'>,
        public readonly clientControls: ClientControlsService<'connected'>,
        public readonly adminControls: AdminControlsService<'connected'>,
    ) {
        this.gameService.on('state-sync', this.stateSyncListener);
    }

    public ngOnDestroy(): void {
        this.gameService.off('state-sync', this.stateSyncListener);
    }

    public get username(): string {
        return this.gameService.username;
    }

    public get gameState(): IGameState | null {
        return this.gameService.gameState;
    }

    public forceRerender(): void { this.trigger++ };
}
