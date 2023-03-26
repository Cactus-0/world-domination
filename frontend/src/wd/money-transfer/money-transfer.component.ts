import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientControlsService } from '../game-services/client-controls.service';
import { GameService } from '../game-services/game.service';

@Component({
    selector: 'wd-money-transfer',
    templateUrl: './money-transfer.component.html',
    styleUrls: [ './money-transfer.component.scss' ]
})
export class MoneyTransferComponent {
    @Output('cancel') cancel = new EventEmitter;
    @Output('after-submit') afterSubmit = new EventEmitter;

    public readonly form = new FormGroup({
        country: new FormControl(this.countries[0], Validators.required),
        sum: new FormControl(100, {
            validators: [
                Validators.required,
                Validators.min(1),
                Validators.max(this.client.country!.private.budget)
            ]
        })
    });

    public constructor(
        private readonly gameService: GameService<'connected'>,
        private readonly client: ClientControlsService
    ) { }

    public get countries(): string[] {
        return this.client.anotherCountries().map(({ name }) => name);
    }

    public submit(): void {
        console.log('submit, form:', this.form);

        if (!this.form.valid) return;

        const { country, sum } = this.form.getRawValue();

        this.gameService.socket.emit('send-money', country!, sum!);

        this.afterSubmit.emit();
    }
}
