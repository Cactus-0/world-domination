import { Component } from '@angular/core';
import { price } from '@shared/price';
import { ClientControlsService } from '../game-services/client-controls.service';
import { GameService } from '../game-services/game.service';

@Component({
	selector: 'wd-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.scss']
})
export class OrderComponent {
	public showMoneyTransferForm: boolean = false;

	public dict = {
		buyNuclearTechnology: 'Открыть ядерную технологию',
		buildNuke: 'Создать ядерное оружие',
		improveEcology: 'Вложиться в экологию',
		buildCityShields: 'Построить щиты на городах',
		cityDevelopments: 'Развить города',
		cityShield: 'Построить щит',
		cityDevelop: 'Развить город',
		nuclearAttackTargets: 'Цели ядерных атак',
		sanctions: 'Наложить санкции'
	} satisfies Record<keyof IOrder, string> & any;

	public constructor(
		public readonly gameService: GameService<'connected'>,
		public readonly client: ClientControlsService<'connected'>
	) { }

	public get price(): number {
		return price.order(this.gameService.gameState?.defaults!, this.client.order!);
	}

	public typeOf(value: any) {
		return typeof value;
	}

	public locked: (keyof IOrder)[] = [
		this.client.country?.private.hasNuclearTechnology
			? 'buyNuclearTechnology' as const
			: 'buildNuke' as const
	].filter(Boolean);

	public createOrderEditForm(key: string, value: any): IOrderEdit {
		const order = {
			// @ts-expect-error
			type: Array.isArray(this.client.order![key]) ? 'array' : 'primitive',
			field: key as any,
		} as any;

		if (order.type === 'primitive') {
			order.newValue = value;
			return order;
		}

		order.index = value;

		if (typeof value === 'number') {
			order.action = 'remove';
		} else {
			order.action = 'add';
		}

		return order;
	}

	public getValue(element: EventTarget | null) {
		// @ts-ignore
		return element.value;
	}

	public sendEditForm(edit: IOrderEdit): void {
		console.log(this.gameService.username, edit);
		this.gameService.socket.emit('order-edit', edit);
	}

	public get usedBombs(): number {
		return this.client.order!.nuclearAttackTargets.length;
	}

	public get bombs(): number {
		return this.client.country!.private.nuclearBombs;
	}

	public arrayChangeHandle(
		field: 'buildCityShields' | 'cityDevelopments' | 'nuclearAttackTargets' | 'sanctions',
		element: string
	): void {
		let index: string | number;

		const arrayIndex = this.client.order![field].indexOf(element);

		if (arrayIndex === -1)
			index = element;
		else
			index = arrayIndex;

		this.sendEditForm(this.createOrderEditForm(field, index));
	}
}
