import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { WdModule } from './wd/wd.module';


platformBrowserDynamic().bootstrapModule(WdModule)
	.catch(err => console.error(err));
