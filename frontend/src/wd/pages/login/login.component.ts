import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameService } from '../../game-services/game.service';

@Component({
    selector: 'wd-login-page',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent {
    @Output('on-logged-in')
    public onLoggedIn = new EventEmitter<void>()

    public submitting: boolean = false;

    public constructor(
        private readonly gameService: GameService
    ) { }

    public readonly form = new FormGroup({
        username: new FormControl('', {
            validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(32)
            ]
        })
    });

    public async submit(): pvoid {
        if (!this.form.valid || this.submitting && this.gameService.connectionState !== 'not-connected') return;

        try {
            await this.gameService.connect(this.form.value.username!);
            console.log('connected');
            this.onLoggedIn.emit();
        } catch (error: unknown) {
            this.submitting = false;
            console.log('error', error);
            this.form.controls.username.setErrors({ 'server-side': error });
        }
    }
}
