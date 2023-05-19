import { ClientControlsService } from '@/wd/game-services/client-controls.service';
import { GameService } from '@/wd/game-services/game.service';
import { Component } from '@angular/core';

@Component({
    selector: 'wd-team-conversation-page',
    templateUrl: './team-conversation.component.html',
    styleUrls: [ './team-conversation.component.scss' ]
})
export class TeamConversationComponent {
    public constructor(
        public readonly gameService: GameService<'connected'>,
        public readonly client: ClientControlsService<'connected'>,
    ) { }

    ngOnInit() {
        console.log(this.gameService.gameState?.countries);
    }

    public get perYearIncome(): number {
        return Object.values(this.client.country!.cities)
            .map(city => city.private?.perYearIncome!)
            .reduce((a, b) => a + b);
    }

    public forcePhaseSkip(): void {
        this.gameService.socket.emit('force-phase-skip');
    }
}
