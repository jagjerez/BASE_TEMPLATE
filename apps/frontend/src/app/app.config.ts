import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { providerAuthConfiguration } from '../lib/auth/config/providerAuthConfiguration';
import { TokenInterceptor } from '../lib/auth/interceptors/token.interceptor';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    providerAuthConfiguration({
      apiUrl: 'http://localhost:1337',
    })
  ],
};
