import { Constants } from '@/constants';
import fs from 'node:fs/promises';
import { IConfig } from './type';

export async function readConfig(): Promise<IConfig> {
    return JSON.parse(await fs.readFile(Constants.ConfigFilePath, 'utf-8'));
}
