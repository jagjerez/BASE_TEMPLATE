import { inject, InjectionToken } from "@angular/core";
import { UserService } from "../services/user.services";
import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";
import { TokenInterceptor } from "../interceptors/token.interceptor";
import { SessionService } from "../services/session.service";
import { firstValueFrom, take } from "rxjs";

export const APP_CUSTOM_CONFIG = new InjectionToken<AppCustomConfig>('AppCustomConfig');
export interface AppCustomConfig {
  apiUrl: string;
}

function initializeApp() {
    const sessionService = inject(SessionService);
    return firstValueFrom(sessionService.restoreSession().pipe(take(1)));
}

export function providerAuthConfiguration(config: AppCustomConfig) {
  return [
    {
      provide: APP_CUSTOM_CONFIG,
      useValue: config
    },
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: 'APP_INITIALIZER',
      useFactory: initializeApp,
      deps: [SessionService, provideHttpClient],
      multi: true
    }
  ];
}

