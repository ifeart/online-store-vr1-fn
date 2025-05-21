import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/shop-components/product-card/product-card.component';
import { ProductCards } from '../../data/interfaces/product-cards.interfaces';
import { ProductCardsService } from '../../data/services/product-cards.service';
import { DynamicTitleService } from '../../data/services/dynamic-title.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesProductsService } from '../../data/services/categories-products.service';


@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss'
})
export class ShopPageComponent implements OnInit {
  productCards: ProductCards[] = [];
  private productCardsService = inject(ProductCardsService);
  private dynamicTitleService = inject(DynamicTitleService);
  private route = inject(ActivatedRoute);
  private categoriesProductsService = inject(CategoriesProductsService);
  headingMain: string = '';
  
  ngOnInit(): void {
    this.subscribeToRouteData();
  }

  subscribeToRouteData(): void {
    this.route.data.subscribe(data => {
      const mode = data['mode'] || 'all';
      this.handleRouteMode(mode);
    });
  }

  private handleRouteMode(mode: string): void {
    switch (mode) {
      case 'all':
        this.loadAllProducts();
        break;
      case 'category':
        const categorySlug = this.route.snapshot.paramMap.get('id_category');
        if (categorySlug) {
          this.loadProductsCategory(categorySlug);
        }
        break;
      case 'new':
        this.loadNewCollection();
        break;
      case 'sale':
        this.loadSaleProducts();
        break;
      default:
        this.loadAllProducts();
    }
  }

  private loadAllProducts(): void {
    this.productCardsService.getProductCards().subscribe(products => {
      this.productCards = products;
      this.dynamicTitleService.setTitle('SHOP');
      this.headingMain = 'SHOP';
    });
  }

  private loadSaleProducts(): void {
    this.productCardsService.getProductsSale().subscribe(products => {
      this.dynamicTitleService.setTitle('SALE');
      this.productCards = products;
      this.headingMain = 'SALE';
    });
  }

  private loadNewCollection(): void {
    this.productCardsService.getProductsNewCollection().subscribe(products => {
      this.dynamicTitleService.setTitle('Новая коллекция');
      this.productCards = products;
      this.headingMain = 'Новая коллекция';
    });
  }

  private loadProductsCategory(categorySlug: string): void {
    this.productCardsService.getProductCardsCategory(categorySlug).subscribe(products => {
      this.productCards = products;
      this.updateCategoryName(categorySlug);
    });
  }

  private updateCategoryName(categorySlug: string): void {
    this.categoriesProductsService.getCategoriesProducts().subscribe(categories => {
      const category = categories.find(c => c.slug_category === categorySlug);
      if (category) {
        this.dynamicTitleService.setTitle(category.name_category);
        this.headingMain = category.name_category;
      };
    });
  }

}
