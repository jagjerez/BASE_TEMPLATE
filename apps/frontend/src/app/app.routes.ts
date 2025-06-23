import { Route } from '@angular/router';
import { LayoutComponent } from '../lib/layout/layout.component';
import { LoginComponent } from '../lib/auth/login.component';
import { authGuardTsGuard } from '../lib/auth/guard/auth.guard.ts-guard';
import { noauthGuardTsGuard } from '../lib/auth/guard/noauth.guard.ts-guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noauthGuardTsGuard]
  },
  {
    path: '',
    canActivate: [authGuardTsGuard],
    component: LayoutComponent,
    children: []
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
