import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCards } from '../interfaces/product-cards.interfaces';
import { AllUrls } from '../enums/all-urls.enum';
import { ProductSizes } from '../interfaces/product-sizes.interfaces';


@Injectable({
  providedIn: 'root'
})

export class ProductCardsService {
  private productBaseApiUrl = AllUrls.ProductCardsApiUrl;
  private getProductBaseApiUrl = AllUrls.getProductApiUrl
  private productSizesApiUrl = AllUrls.ProductSizesApiUrl;
  private productCategoryBaseApiUrl = AllUrls.ProductCardsCategoryApiUrl;

  private http = inject(HttpClient)

  getProductCards(): Observable<ProductCards[]> {
    return this.http.get<ProductCards[]>(this.productBaseApiUrl);
  }

  getProduct(id_product: string): Observable<ProductCards> {
    return this.http.get<ProductCards>(`${this.getProductBaseApiUrl}/${id_product}`);
  }

  getProductSizes(id_product: string): Observable<ProductSizes[]> {
    return this.http.get<ProductSizes[]>(`${this.productSizesApiUrl}/${id_product}`);
  }

  getProductCardsCategory(category: string | null): Observable<ProductCards[]> {
    if (category) {
      return this.http.get<ProductCards[]>(`${this.productCategoryBaseApiUrl}/${category}`);
    } else {
      return this.getProductCards();
    }
  }
}