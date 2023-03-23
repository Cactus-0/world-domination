import { Component, Input } from '@angular/core';
import { GameService } from '../game-services/game.service';

@Component({
	selector: 'wd-country-card',
	templateUrl: './country-card.component.html',
	styleUrls: ['./country-card.component.scss']
})
export class CountryCardComponent {
	@Input('country-name') countryName!: string;
	@Input('country-flag-src') countryFlagUrl!: string;

	@Input('players-list')
	private _players: IPlayer[] | null = null;

	public get players(): IPlayer[] {
		return this._players ?? [];
	}

	public constructor(
		public readonly gameService: GameService,
	) { }

	public playersListFor(country: string) {
        return this.gameService.playersFor(country)!.map(pl => pl.username).join(', ');
    }
}
