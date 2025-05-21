import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesProducts } from '../interfaces/categories-products.interfaces';
import { AllUrls } from '../enums/all-urls.enum';

@Injectable({
  providedIn: 'root'
})
export class CategoriesProductsService {
  private categoriesBaseApiUrl = AllUrls.CategoriesProducts;
 
  private http = inject(HttpClient)

  getCategoriesProducts(): Observable<CategoriesProducts[]> {
    return this.http.get<CategoriesProducts[]>(this.categoriesBaseApiUrl);
  }
}
