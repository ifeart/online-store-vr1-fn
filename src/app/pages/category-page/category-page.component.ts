import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../components/shop-components/product-card/product-card.component';
import { ProductCards } from '../../data/interfaces/product-cards.interfaces';
import { ProductCardsService } from '../../data/services/product-cards.service';
import { DynamicTitleService } from '../../data/services/dynamic-title.service';
import { CategoriesProductsService } from '../../data/services/categories-products.service';
import { CategoriesProducts } from '../../data/interfaces/categories-products.interfaces';

@Component({
selector: 'app-category-page',
standalone: true,
imports: [ProductCardComponent],
templateUrl: './category-page.component.html',
styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent implements OnInit {
  productCards: ProductCards[] = [];
  categoriesProducts: CategoriesProducts[] = [];
  categorySlug: string | null = '';
  categoryName: CategoriesProducts | undefined;

  constructor (
    private route: ActivatedRoute,
    private productCardsService: ProductCardsService,
    private dynamicTitleService: DynamicTitleService,
    private categoriesProductsService: CategoriesProductsService
  ) {
  }

  ngOnInit(): void {
    this.categorySlug = this.route.snapshot.paramMap.get('id_category');
    this.route.paramMap.subscribe(params => {
      this.categorySlug = params.get('id_category'); // Получаем новый slug
      if (this.categorySlug) {
        this.fetchCategoriesProducts(); // Обновляем данные категории
        this.fetchProductCards(); // Обновляем данные товаров
      }
    });
  }

  private fetchCategoriesProducts(): void {
    this.categoriesProductsService.getCategoriesProducts().subscribe({
      next: (data) => {
        this.categoryName = data.find(item => item.slug_category === this.categorySlug);
        if (this.categoryName) {
          this.dynamicTitleService.setTitle(this.categoryName.name_category);
        }
      },
      error: (err) => {
        // console.error('Error fetching categories products:', err);
      },
      complete: () => {
        // console.log('Categories products fetching completed');
      }
    });
  }

  private fetchProductCards(): void {
    this.productCardsService.getProductCardsCategory(this.categorySlug).subscribe({
      next: (val) => {
        this.productCards = val;
      },
      error: (err) => {
        // console.error('Error fetching product cards:', err);
      },
      complete: () => {
        // console.log('Product cards fetching completed'); 
      }
    });
  }
}
