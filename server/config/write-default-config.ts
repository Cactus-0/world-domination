import { Constants } from '@/constants';
import fs from 'node:fs';
import { defaultConfig } from './default';

export const writeDefaultConfig = () =>
    fs.writeFileSync(Constants.ConfigFilePath, JSON.stringify(defaultConfig, null, '\t'), 'utf-8');
