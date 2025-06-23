import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { APP_CUSTOM_CONFIG } from '../config/providerAuthConfiguration';
import { User, UserService } from './user.services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface AuthResponseDto {
  jwt: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private config = inject(APP_CUSTOM_CONFIG);

  login(email: string, password: string): Observable<{ jwt: string, user: User }> {
    return this.http.post<{ jwt: string, user: User }>(`${this.config.apiUrl}/api/auth/local`, { identifier: email, password });
  }

  saveToken(token: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken() {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() / 1000 < payload.exp;
    } catch (_) {
      return false;
    }
  }
}
