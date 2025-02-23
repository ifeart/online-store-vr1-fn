import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { CartItem } from '../../cart/cart-item.interface';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddToCartBtnComponent } from "../../components/shop-components/add-to-cart-btn/add-to-cart-btn.component";
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { ProductUrlPipe } from "../../helpers/pipes/product-url.pipe";
import { ItemPrice } from '../../cart/item-price.interface';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AddToCartBtnComponent, ImgUrlPipe, ProductUrlPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  cartService = inject(CartService);
  cartItems: CartItem[] = [];
  itemsPrices: ItemPrice[] = [];
  cartCount: number = 0;
  cartFinalPrice: number = 0;
  promoCodeAdd: boolean = true;

  promoCodeForm: FormGroup = new FormGroup({
    promoCode: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
    this.cartService.getCart$().subscribe(items => {
      this.cartItems = items;
      this.getItemsPrices(items);
    });

    this.cartService.getCartCount$().subscribe(
      val => this.cartCount = val
    );
  }

  
  removeItem(item: CartItem): void {
    this.cartService.removeItem(item);
  }

  getItemsPrices(cartItems: CartItem[]): void {
    console.log(cartItems);
    this.cartService.getItemsPrices$(cartItems).subscribe(prices => {
      this.itemsPrices = prices;
      this.addPriceToCartItems();
    });
  }

  addPriceToCartItems(): void {
    this.cartItems.forEach(item => {
      const price = this.itemsPrices.find(p => Number(p.id) === item.id_from_product);
      if (price) {
        item.price = price.price;
      }
    });

    this.cartService.getFinalCartPrice$().subscribe(val => this.cartFinalPrice = val);
  }

  

  checkPromoCode(): void {
    if (this.promoCodeForm.valid) {
      this.promoCodeAdd = true;
    }
  }
}
