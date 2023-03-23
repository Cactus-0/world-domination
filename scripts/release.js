const { execSync: exec } = require('node:child_process');
const { version, pkg: { outputPath } } = require('../package.json');

const run = command => exec(command, { stdio: 'inherit' });

const tag = `v${version}`;

run('npm run build');
run(`gh release create ${tag} --title=${tag} --notes=${tag}`);
run(`gh release upload ${tag} ${outputPath}/*`);
