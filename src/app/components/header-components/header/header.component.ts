import { Component } from '@angular/core';
import { BtnHeaderComponent } from "../btn-header/btn-header.component";
import { CategoriesProductsService } from '../../../data/services/categories-products.service';
import { CategoriesProducts } from '../../../data/interfaces/categories-products.interfaces';
import { CategoryUrlPipe } from "../../../helpers/pipes/category-url.pipe";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BtnHeaderComponent, CategoryUrlPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  categoriesProducts: CategoriesProducts[] = [];

  constructor (
    private categoriesProductsService: CategoriesProductsService,
  ) {
    this.categoriesProductsService.getCategoriesProducts().subscribe(val => {
      this.categoriesProducts = val;
    });
  }

}
