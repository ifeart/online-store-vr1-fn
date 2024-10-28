import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header-components/header/header.component";
import { BtnHeaderComponent } from './components/header-components/btn-header/btn-header.component';
import { FooterComponent } from './components/footer-components/footer/footer.component';
import { ProductCardsService } from './data/services/product-cards.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BtnHeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FNDRS';
  /*
    productCardsService = inject(ProductCardsService)
  productCards: any = []

  constructor() {
    this.productCardsService.getProductCards()
      .subscribe(val => {
        this.productCards = val
      })
  }
  */
}
