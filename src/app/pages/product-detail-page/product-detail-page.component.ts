import { Component, inject, OnInit } from '@angular/core';
import { ProductCards } from '../../data/interfaces/product-cards.interfaces';
import { ActivatedRoute } from '@angular/router';
import { ProductCardsService } from '../../data/services/product-cards.service';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { ProductSizes } from '../../data/interfaces/product-sizes.interfaces';
import { SizeBtnComponent } from "../../components/shop-components/size-btn/size-btn.component";
import { DynamicTitleService } from '../../data/services/dynamic-title.service';
import { PriceDiscountPipe } from "../../helpers/pipes/price-discount.pipe";
import { CartService } from '../../cart/cart.service';
import { CartItem } from '../../cart/cart-item.interface';


@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [ImgUrlPipe, PriceDiscountPipe, SizeBtnComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent implements OnInit {
  product: ProductCards | null = null;
  productSizes!: ProductSizes[];
  productSelectedSize: ProductSizes | null = null;
  valueAddToCart: number = 0;
  
  route = inject(ActivatedRoute);
  productCardService = inject(ProductCardsService);
  dynamicTitleService = inject(DynamicTitleService);
  cartService = inject(CartService);


  ngOnInit(): void {
    const id_product = this.route.snapshot.paramMap.get('id_product');
    
    if (id_product) {
      this.productCardService.getProduct(id_product).subscribe({
        next: (data) => {
          if (data) {
            this.product = data;
            this.dynamicTitleService.setTitle(this.product.name_product);
            
            this.productCardService.getProductSizes(id_product).subscribe({
              next: (sizeData) => {
                if (sizeData) {
                  this.productSizes = sizeData;;
                }
              }
            })
          }
        }
      });
    }
  }

  onSizeSelected(selectedSize: ProductSizes) {
    this.valueAddToCart = this.cartService.getItemCount(selectedSize);
    this.productSelectedSize = selectedSize;
  }

  addToCart(productSizeInfo: ProductSizes, productDefaultInfo: ProductCards): void {
    const item: CartItem = {
      id: productSizeInfo.id,
      id_from_product: productSizeInfo.id_from_product,
      size: productSizeInfo.size,
      article: productSizeInfo.article,
      quantity: 1,
      id_product: productSizeInfo.id_product,
      image: productDefaultInfo.images_list_product[0],
      name: productDefaultInfo.name_product
    };

    this.cartService.addItem(item);
  }

  btnPlusToCart(): void {
    this.valueAddToCart++;
  }

  btnMinusToCart(): void {
    if (this.valueAddToCart !== 0) {
      this.valueAddToCart--;
    }
  }
}