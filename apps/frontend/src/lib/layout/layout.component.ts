import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-layout-component',
  imports: [CommonModule, HeaderComponent, TranslatePipe, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  routes: Route[] = [];
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.routes = this.router.config.find(r => r.component === LayoutComponent)?.children || [];
  }
}
