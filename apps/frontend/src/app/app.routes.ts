import { Route } from '@angular/router';
import { App } from './app';
import { LayoutComponent } from '../lib/layout/layout.component';

export const appRoutes: Route[] = [
    {
    path: '',
    component: LayoutComponent,
    children: []
  }
];
