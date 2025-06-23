import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { HeaderComponent } from '../layout/header/header.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.services';
import { UserService } from './services/user.services';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-login.component',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TranslatePipe, FormsModule],
  providers: [ThemeService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  private themeService = inject(ThemeService);
  private sessionService = inject(SessionService);
  private router = inject(Router);

  get isDark(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  onSubmit() {
    this.sessionService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
        console.log('Login successful', response);
      },
      error: (error) => {
        this.error = 'Credenciales incorrectas';
        console.error('Login failed', error);
      }
    });
  }
}
