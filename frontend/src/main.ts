import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Import your AppModule here

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));
