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
  private productBase = AllUrls.ProductCards;
  private getProductBase = AllUrls.getProduct
  private productSizes = AllUrls.ProductSizes;
  private productCategoryBase = AllUrls.ProductCardsCategory;

  private http = inject(HttpClient)

  getProductCards(): Observable<ProductCards[]> {
    return this.http.get<ProductCards[]>(this.productBase);
  }

  getProduct(id_product: string): Observable<ProductCards> {
    return this.http.get<ProductCards>(`${this.getProductBase}/${id_product}`);
  }

  getProductSizes(id_product: string): Observable<ProductSizes[]> {
    return this.http.get<ProductSizes[]>(`${this.productSizes}/${id_product}`);
  }

  getProductsNewCollection(): Observable<ProductCards[]> {
    return this.http.get<ProductCards[]>(`${this.productBase}/new`);
    // ДОБАВИТЬ В API
  }

  getProductsSale(): Observable<ProductCards[]> {
    return this.http.get<ProductCards[]>(`${this.productBase}/sale`);
  }

  getProductCardsCategory(category: string | null): Observable<ProductCards[]> {
    if (category) {
      return this.http.get<ProductCards[]>(`${this.productCategoryBase}/${category}`);
    } else {
      return this.getProductCards();
    }
  }
}