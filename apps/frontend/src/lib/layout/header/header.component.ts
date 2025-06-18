import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../../components/language-switcher';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslatePipe, LanguageSwitcher],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    public themeService: ThemeService) {}

  get isDark(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
