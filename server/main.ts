import './preload';

import fs from 'node:fs';
import { Constants } from '@/constants';
import { readConfig, writeDefaultConfig } from '@/config';
import { createGameServer } from '@/web-api';
import { Game } from '@/core/game-loop/game';
import { log } from '@/logger';

const noop = <T>(t: T) => t;
 
async function main() {
    try {
        if (!fs.existsSync(Constants.ConfigFilePath))
            writeDefaultConfig();
    } catch {
        writeDefaultConfig();
    }

    const config = await readConfig().then(
        noop,
        (error: Error) => {
            throw new Error('Невозможно прочитать конфигурационный файл', { cause: error });
        }
    );

    const game = new Game(config.defaults);

    await createGameServer(config.port, game);

    log(`Запущен сервер на порту ${config.port}.`);
    log('config.json - файл конфигурации.');
    log('После его изменения перезапустите программу, чтобы применить изменения.');
    log('Ссылка на игру: http:/\\\\/localhost:3000/');
}

main();
