import path from 'node:path';

export namespace Constants {
    export const ExecutablePath = process.isDev
        ? process.argv[1]
        : process.argv[0];

    export const ExecutableDir = process.isDev ? ExecutablePath : path.resolve(ExecutablePath, '..');
    
    export const ConfigFilePath = path.resolve(ExecutableDir, 'config.json');
    export const ProjectRoot = path.resolve(__dirname, '../..');
    export const StaticRoot = path.resolve(ProjectRoot, 'dist/static');
    export const UsernameWebSocketHeader = 'x-world-domination-username';
}
