import { Component } from '@angular/core';
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
  routes: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {
    this.routes = router.config.find(r => r.component === LayoutComponent)?.children || [];
  }
}
