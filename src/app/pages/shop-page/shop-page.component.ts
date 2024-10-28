import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductCardComponent } from '../../components/shop-components/product-card/product-card.component';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss'
})
export class ShopPageComponent {
  constructor(private titleService: Title) {
    this.setPageTitle('SHOP');
  }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
