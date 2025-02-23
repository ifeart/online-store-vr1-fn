import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AllUrls } from '../enums/all-urls.enum';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http: HttpClient = inject(HttpClient);
  private baseApiUrl = AllUrls;

  getAccount(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl.AccountApiUrl}`);
  }

  updateAccount(payload: {
    phone_number: string,
    last_name: string,
    first_name: string,
    patronymic: string,
    country: string,
    full_address: string,
    email_subscription_news: boolean,
  }): Observable<any> {
    return this.http.put(`${this.baseApiUrl.AccountApiUrl}`, payload);
  }

  subscribeEmailToNews(email: string): void {
    this.http.post(`${this.baseApiUrl.EmailToSubscribeApiUrl}`, { email }).subscribe();
  }
}
