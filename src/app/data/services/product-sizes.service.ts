import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSizes } from '../interfaces/product-sizes.interfaces';
import { AllUrls } from '../enums/all-urls.enum';


@Injectable({
  providedIn: 'root'
})

export class ProductSizesService {
  productSizesApiUrl = AllUrls.ProductSizesApiUrl;

  http = inject(HttpClient);

  getProductSizes(): Observable<ProductSizes[]> {
    return this.http.get<ProductSizes[]>(this.productSizesApiUrl);
  }
}