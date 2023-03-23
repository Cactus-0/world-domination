import { createGettersDict } from '@utils/create-getters-dict';

if (process.env.NODE_ENV !== 'production')
    process.env.NODE_ENV === 'development';

createGettersDict({
    isDev: () => process.env.NODE_ENV === 'development',
    isProd: () => process.env.NODE_ENV === 'production'
}, process);
