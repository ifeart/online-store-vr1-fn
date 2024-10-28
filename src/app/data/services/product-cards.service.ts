import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductCardsService {
  http = inject(HttpClient)

  baseApiUrl = 'http://localhost:5000/api/'

  getProductCards() {
    return this.http.get(`${this.baseApiUrl}products`)
  }
}
