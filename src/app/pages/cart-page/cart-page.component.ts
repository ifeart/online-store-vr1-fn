import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  cartService = inject(CartService);

  ngOnInit(): void {
    
  }
}
