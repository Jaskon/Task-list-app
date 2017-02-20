import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/add/operator/toPromise';

import { appModule } from './appComponent/app.module';

platformBrowserDynamic().bootstrapModule(appModule);