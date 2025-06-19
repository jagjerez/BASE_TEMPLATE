import { Route } from '@angular/router';
import { App } from './app';
import { LayoutComponent } from '../lib/layout/layout.component';
import { LoginComponent } from '../lib/auth/login.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: []
  }
];
