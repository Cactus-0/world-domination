import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import path from 'node:path';
import { Constants } from '@/constants';
import { Game } from '@/core/game-loop/game';
import { stateRouter } from './routers/state';
import { createWSController } from './ws';

type GameSocketIOServer = SocketIOServer<IClientToServerEvents, IServerToClientEvents, object>;

export async function createGameServer(port: number, game: Game): Promise<GameSocketIOServer> {
    const wdGameServer = express();

    const webAppIndex = path.resolve(Constants.StaticRoot, 'index.html');

    wdGameServer.use('/', express.static(Constants.StaticRoot));
    wdGameServer.get('/', (_, res) => res.sendFile(webAppIndex));

    wdGameServer.use('/api/state', stateRouter(game))

    const wsServer = await new Promise<GameSocketIOServer>(resolve => {
        const server = new SocketIOServer(wdGameServer.listen(port, () => resolve(server)));
    });

    wsServer.on('connect', createWSController(game));

    return wsServer;
}
