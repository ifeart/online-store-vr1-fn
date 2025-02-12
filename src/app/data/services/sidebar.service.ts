import { Injectable } from '@angular/core';
import { CategoriesProducts } from '../interfaces/categories-products.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isVisible = new BehaviorSubject<boolean>(false);
  categoriesProducts: CategoriesProducts[] | null = null;
  
  isVisible$ = this.isVisible.asObservable();

  toggleSidebar(): void {
    this.isVisible.next(!this.isVisible.value);
    this.toggleBodySctoll();
  }

  closeSideBar(): void {
    this.isVisible.next(false);
  }

  toggleBodySctoll(): void {}

  getCategoriesProducts() {
    return this.categoriesProducts;
  }
}
