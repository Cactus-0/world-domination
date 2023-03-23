import { GameService } from '@/wd/game-services/game.service';
import { Component } from '@angular/core';

@Component({
    selector: 'wd-end-page',
    templateUrl: './end.component.html',
    styleUrls: [ './end.component.scss' ]
})
export class EndComponent {
    public constructor(
        public readonly gameService: GameService
    ) { }
}
