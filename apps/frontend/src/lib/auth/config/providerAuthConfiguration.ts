import { inject, InjectionToken, provideAppInitializer } from "@angular/core";
import { UserService } from "../services/user.services";
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
    provideAppInitializer(() => initializeApp())
  ];
}

