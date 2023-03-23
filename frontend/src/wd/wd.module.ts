import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './game-services/game.service';
import { LoginComponent } from './pages/login/login.component';
import { PrePhasePageComponent } from './pages/pre-phase/pre-phase.component';

import { WdComponent } from './wd.component';
import { PublicApiService } from './public-api.service';
import { LoadingComponent } from './loading/loading.component';
import { ImageCardComponent } from './image-card/image-card.component';
import { NgxRerenderModule } from 'ngx-rerender';
import { ClientControlsService } from './game-services/client-controls.service';
import { AdminControlsService } from './game-services/admin-controls.service';
import { CountryCardComponent } from './country-card/country-card.component';
import { OrderComponent } from './order/order.component';
import { TeamConversationComponent } from './pages/team-conversation/team-conversation.component';
import { GlobalConversationComponent } from './pages/global-conversation/global-conversation.component';
import { EndComponent } from './pages/end/end.component';
import { CountryComponent } from './country/country.component';
import { GlobalStateComponent } from './global-state/global-state.component';

@NgModule({
	declarations: [
		WdComponent,
		LoginComponent,
		PrePhasePageComponent,
		TeamConversationComponent,
		LoadingComponent,
		ImageCardComponent,
		CountryCardComponent,
		OrderComponent,
		GlobalConversationComponent,
		EndComponent,
		CountryComponent,
		GlobalStateComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		NgxRerenderModule
	],
	providers: [
		GameService,
		PublicApiService,
		ClientControlsService,
		AdminControlsService
	],
	bootstrap: [WdComponent]
})
export class WdModule { }
