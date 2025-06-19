import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { HeaderComponent } from '../layout/header/header.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login.component',
  imports: [CommonModule, HeaderComponent, TranslatePipe],
  providers: [ThemeService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    public themeService: ThemeService) { }

  get isDark(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onSubmit() {
    // Handle login
  }
}
