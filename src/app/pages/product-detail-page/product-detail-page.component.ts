import { Component, inject, OnInit } from '@angular/core';
import { ProductCards } from '../../data/interfaces/product-cards.interfaces';
import { ActivatedRoute } from '@angular/router';
import { ProductCardsService } from '../../data/services/product-cards.service';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { AddProductBtnComponent } from "../../components/shop-components/add-product-btn/add-product-btn.component";
import { ProductSizesService } from '../../data/services/product-sizes.service';
import { ProductSizes } from '../../data/interfaces/product-sizes.interfaces';
import { SizeBtnComponent } from "../../components/shop-components/size-btn/size-btn.component";
import { DynamicTitleService } from '../../data/services/dynamic-title.service';
import { PriceDiscountPipe } from "../../helpers/pipes/price-discount.pipe";


@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [ImgUrlPipe, PriceDiscountPipe, AddProductBtnComponent, SizeBtnComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent implements OnInit {
  product: ProductCards | null | undefined = null;
  productSizes!: ProductSizes[];
  productSelectedSize: ProductSizes | null = null;
  
  route = inject(ActivatedRoute);
  productCardService = inject(ProductCardsService);
  productSizesService = inject(ProductSizesService);
  dynamicTitleService = inject(DynamicTitleService);


  ngOnInit(): void {
    const id_product = this.route.snapshot.paramMap.get('id_product');
    
    if (id_product) {
      this.productCardService.getProductCards().subscribe({
        next: (data) => {
          this.product = data.find(item => item.id_product === id_product);
          if (this.product) {
            this.dynamicTitleService.setTitle(this.product.name_product);

            this.productSizesService.getProductSizes().subscribe({
              next: (data) => {
                const foundProductSizes = data.filter(size => size.id_from_product === this.product?.id);
                if (foundProductSizes) {
                  this.productSizes = foundProductSizes;
                }
              },
              error: () => {
              }
            })
          }
        },
        error: () => {
        }
      });
    }
  }

  onSizeSelected(selectedSize: ProductSizes) {
    this.productSelectedSize = selectedSize;
  }
}