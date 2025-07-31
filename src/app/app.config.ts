import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authGigachatInterceptor } from './interceptors/auth-gigachat-interceptor';
import { authYandexInterceptor } from './interceptors/auth-yandex-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authGigachatInterceptor]),
      withInterceptors([authYandexInterceptor])
    )
  ]
};
