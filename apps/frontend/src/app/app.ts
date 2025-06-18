import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageSwitcher } from '../lib/components/language-switcher';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  imports: [RouterModule, TranslatePipe, LanguageSwitcher, CommonModule],
  providers: [ThemeService],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private translate: TranslateService, public themeService: ThemeService) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  get isDark(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
