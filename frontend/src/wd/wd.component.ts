import { Component } from '@angular/core';
import { GameService } from './game-services/game.service';

@Component({
	selector: 'wd-root',
	templateUrl: './wd.component.html',
	styleUrls: ['./wd.component.scss']
})
export class WdComponent {
	public phase: Page = 'login';
	public title = 'Мировое господство';

	public constructor(
		public readonly gameService: GameService
	) {
		this.gameService.on('state-sync', ({ phase: newPhase }) => {
			if (newPhase === this.phase) return;
			console.log('new phase', newPhase);
			this.phase = newPhase;
		});
	}

	public startPrePhase() {
		this.phase = 'pre-phase';
		this.gameService.syncState();
	}
}
