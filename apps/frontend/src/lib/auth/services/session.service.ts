import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.services";
import { User, UserService } from "./user.services";
import { catchError, map, mapTo, Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { APP_CUSTOM_CONFIG } from "../config/providerAuthConfiguration";

@Injectable({ providedIn: 'root' })
export class SessionService {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private http = inject(HttpClient);
  private config = inject(APP_CUSTOM_CONFIG);

  login(email: string, password: string): Observable<void> {
    return this.authService.login(email, password).pipe(
      tap(({ jwt, user }) => {
        this.authService.saveToken(jwt);
        this.userService.setUser(user);
      }),
      map(() => void 0)
    );
  }

  restoreSession(): Observable<boolean> {
    const token = this.authService.getToken();
    if (!token || !this.authService.isAuthenticated()) {
      return of(false);
    }

    return this.http.get<User>(`${this.config.apiUrl}/api/users/me`).pipe(
      tap(user => this.userService.setUser(user)),
      map(() => true),
      catchError(() => {
        this.authService.clearToken();
        return of(false);
      })
    );
  }

  logout() {
    this.authService.clearToken();
    this.userService.clearUser();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
