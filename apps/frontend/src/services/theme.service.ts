// theme.service.ts
import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly className = 'dark';
  private readonly storageKey = 'theme';
  private platformId = inject(PLATFORM_ID) as object;

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const stored = localStorage.getItem(this.storageKey);

    if (stored === 'dark') {
      document.documentElement.classList.add(this.className);
    } else if (stored === 'light') {
      document.documentElement.classList.remove(this.className);
    } else {
      // Si no hay valor guardado, usar el del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle(this.className, prefersDark);
      localStorage.setItem(this.storageKey, prefersDark ? 'dark' : 'light');
    }
  }

  isDarkMode(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return document.documentElement.classList.contains(this.className);
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const isDark = this.isDarkMode();
    if (isDark) {
      document.documentElement.classList.remove(this.className);
      localStorage.setItem(this.storageKey, 'light');
    } else {
      document.documentElement.classList.add(this.className);
      localStorage.setItem(this.storageKey, 'dark');
    }
  }
}
