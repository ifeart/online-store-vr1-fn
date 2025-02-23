import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-btn',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart-btn.component.html',
  styleUrl: './add-to-cart-btn.component.scss'
})
export class AddToCartBtnComponent {
  @Input() productQuantity: number = 0;

  btnPlusToCart(): void {
    this.productQuantity++;
  }

  btnMinusToCart(): void {
    if (this.productQuantity !== 0) {
      this.productQuantity--;
    }
  }
}
