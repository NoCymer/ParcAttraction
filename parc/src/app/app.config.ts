import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Interceptor/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideZoneChangeDetection} from "@angular/core";
import {provideTranslateService} from "@ngx-translate/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideTranslateService({
     defaultLanguage: 'en'
    })
  ],
};