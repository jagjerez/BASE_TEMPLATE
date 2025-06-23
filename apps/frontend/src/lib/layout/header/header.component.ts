import { Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../components/language-switcher';
import { ThemeService } from '../../../services/theme.service';
import { SessionService } from '../../auth/services/session.service';
import { User, UserService } from '../../auth/services/user.services';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslatePipe, LanguageSwitcher],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() title!: string;
  showDropdown = false;
  public themeService = inject(ThemeService);
  public sessionService = inject(SessionService);
  public userService = inject(UserService);
  public router = inject(Router);
  private elementRef = inject(ElementRef);

  user$: Observable<User | null> = this.userService.user$;

  get isDark(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  getInitials(user: User | null): string {
    if (!user) return '';
    if (user.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return '';
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (
      this.showDropdown &&
      this.elementRef.nativeElement &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.showDropdown = false;
    }
  }

  logout(): void {
    this.sessionService.logout();
    // Opcional: redirige al login si lo deseas
    this.router.navigate(['/login']);
  }
}
