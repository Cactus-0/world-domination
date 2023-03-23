import path from 'node:path';
import { register } from 'tsconfig-paths';
// @ts-ignore
import { compilerOptions } from '../../tsconfig.json';

register({
    baseUrl: path.resolve(compilerOptions.outDir, compilerOptions.baseUrl),
    paths: compilerOptions.paths
});
