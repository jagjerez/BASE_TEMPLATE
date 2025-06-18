import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  currentLang: string;
  availableLangs = ['en', 'es'];

  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.currentLang = this.getLanguage();
  }

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
    this.currentLang = lang;
    this.setLanguage(lang);
  }
  private getLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('selectedLanguage') || this.translate.getDefaultLang();
    }
    return this.translate.currentLang || this.translate.getDefaultLang(); // valor por defecto
  }

  private setLanguage(language: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("selectedLanguage", language);
    }

  }
}