import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AllUrls } from '../data/enums/all-urls.enum';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private router = inject(Router);
  private loginBase = AllUrls.Login;
  private sugnupBase = AllUrls.Register;
  private refreshBaseApuUrl = AllUrls.RefreshToken;
  cookieService = inject(CookieService);

  accessToken: string | null = null;
  refreshToken: string | null = null;

  get isAuth(): boolean {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken');
      this.refreshToken = this.cookieService.get('refreshToken');
    }

    return !!this.accessToken;
  }

  private authSubject = new BehaviorSubject<boolean>(this.isAuth);

  setAuthStatus(status: boolean): void {
    this.authSubject.next(status);
  }

  getAuthStatus(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  login(payload: {email: string, password: string}) {
    return this.http.post<TokenResponse>(
      this.loginBase,
      payload)
        .pipe(
          tap(val => {
            this.saveTokens(val);
            this.setAuthStatus(true);
          })
        )
  }
    
  signup(payload: {email: string, password: string}) {
    return this.http.post<TokenResponse>(
      this.sugnupBase,
      payload)
        .pipe(
          tap(val => {
            this.saveTokens(val);
            this.setAuthStatus(true);
          })
        )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      this.refreshBaseApuUrl,
      {refresh_token: this.refreshToken})
      .pipe(
        tap(val => {
          this.saveTokens(val);
          this.setAuthStatus(true);
        }),
        catchError(err => {
        this.logout();
        return throwError(err);
      }))
  }

  logout() {
    this.cookieService.deleteAll();
    this.accessToken = null;
    this.refreshToken = null;
    this.setAuthStatus(false);
    this.router.navigate(['/login']);
  }

  saveTokens(res: TokenResponse) {
    // console.log(res.access_token, res.refresh_token);

    if (res.access_token) {
      this.accessToken = res.access_token;
      this.cookieService.set('accessToken', res.access_token);
    }
    if (res.refresh_token) {
      this.refreshToken = res.refresh_token;
      this.cookieService.set('refreshToken', res.refresh_token);
    }
  }
}
