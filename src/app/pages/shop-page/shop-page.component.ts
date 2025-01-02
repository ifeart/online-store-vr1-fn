import { Component } from '@angular/core';
import { ProductCardComponent } from '../../components/shop-components/product-card/product-card.component';
import { ProductCards } from '../../data/interfaces/product-cards.interfaces';
import { ProductCardsService } from '../../data/services/product-cards.service';
import { DynamicTitleService } from '../../data/services/dynamic-title.service';


@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss'
})
export class ShopPageComponent {
  productCards: ProductCards[] = [];

  constructor(
    private productCardsService: ProductCardsService,
    private dynamicTitleService: DynamicTitleService
  ) {
    this.dynamicTitleService.setTitle('SHOP');
    this.productCardsService.getProductCards().subscribe(val => {
      this.productCards = val;
    });
  }
}
