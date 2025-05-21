import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AllUrls } from '../enums/all-urls.enum';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile.interfaces';
import { Country } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http: HttpClient = inject(HttpClient);
  private allUrlsApi = AllUrls;

  getAccount(): Observable<Profile> {
    return this.http.get<Profile>(`${this.allUrlsApi.Account}`);
  }

  getCountryList(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.allUrlsApi.Country}`);
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
    return this.http.put(`${this.allUrlsApi.Account}`, payload);
  }

  subscribeEmailToNews(email: string): void {
    this.http.post(`${this.allUrlsApi.EmailToSubscribe}`, { email }).subscribe();
  }
}
