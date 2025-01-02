import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCards } from '../interfaces/product-cards.interfaces';
import { AllUrls } from '../enums/all-urls.enum';


@Injectable({
  providedIn: 'root'
})

export class ProductCardsService {
  productBaseApiUrl = AllUrls.ProductCardsApiUrl;
  productCategoryBaseApiUrl = AllUrls.ProductCardsCategoryApiUrl;

  http = inject(HttpClient)

  getProductCards(): Observable<ProductCards[]> {
    return this.http.get<ProductCards[]>(this.productBaseApiUrl);
  }

  getProductCardsCategory(category: string | null): Observable<ProductCards[]> {
    if (category) {
      return this.http.get<ProductCards[]>(`${this.productCategoryBaseApiUrl}/${category}`);
    } else {
      return this.getProductCards();
    }
  }
}