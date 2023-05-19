import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';
import { EventEmitter } from '@shared/typed-event-emitter';
import { PublicApiService } from '../public-api.service';

export type GameServiceConnectionState = 'not-connected' | 'connecting' | 'connected';

export type WebSocket = Socket<
    IServerToClientEvents & IAdminClientToServerEvents,
    IClientToServerEvents & IAdminClientToServerEvents
>;

type Events = {
    'state-sync': (state: IGameState) => void;
}

@Injectable({
    providedIn: 'root'
})
export class GameService<Connection extends GameServiceConnectionState = 'not-connected'> extends EventEmitter<Events> {
    public static readonly url = '/';

    public constructor(
        private readonly publicApiService: PublicApiService
    ) {
        super();
    }

    public username: Connection extends 'connected' ? string : null = null as any;
    public isAdmin: Connection extends 'connected' ? boolean : null = null as any;
    public gameState: IGameState | null = null;
    public socket: Switch<Connection extends 'connected' ? true : false, WebSocket, null> = null as any;
    public connectionState: GameServiceConnectionState = 'not-connected';

    public connect(username: string): pvoid {
        return new Promise<void>((resolve, reject) => {
            this.connectionState = 'connecting';

            const ws: WebSocket = io(GameService.url, {
                extraHeaders: {
                    'x-world-domination-username': encodeURIComponent(username)
                }
            });
    
            const onError = (errorMessage: string): void => {
                this.connectionState = 'not-connected';
                ws.off('accept-login', onAccept);
                reject(new Error(errorMessage));
            };
    
            const onAccept = (isAdmin: boolean): void => {
                console.log('accept');
                ws.off('error', onError);
                this.connectionState = 'connected';
                (this as GameService<'connected'>).username = username;
                (this as GameService<'connected'>).socket = ws;
                (this as GameService<'connected'>).isAdmin = isAdmin

                ws.on('state-sync', state => {
                    console.log('new state', state)
                    if (!this.gameState) return;
                    
                    this.gameState = state;
                    this.emit('state-sync', state);
                });

                resolve();
            };
    
            ws.once('error', onError);
            ws.once('accept-login', onAccept);
        });
    }

    public async syncState(): pvoid {
        this.gameState = await this.publicApiService.currentState();
        this.emit('state-sync', this.gameState);
    }

    public playersFor(countryName: string): IPlayer[] | null {
        if (!this.gameState?.players) {
            return null;
        }

        return Object.values(this.gameState?.players)
            .filter(({ country }) => country === countryName) ?? null;
    }
}
