import { Component, OnInit } from '@angular/core';
import { ProductCards } from '../../data/interfaces/product-cards.interfaces';
import { ActivatedRoute } from '@angular/router';
import { ProductCardsService } from '../../data/services/product-cards.service';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { AddProductBtnComponent } from "../../components/shop-components/add-product-btn/add-product-btn.component";
import { ProductSizesService } from '../../data/services/product-sizes.service';
import { ProductSizes } from '../../data/interfaces/product-sizes.interfaces';
import { SizeBtnComponent } from "../../components/shop-components/size-btn/size-btn.component";
import { DynamicTitleService } from '../../data/services/dynamic-title.service';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [ImgUrlPipe, AddProductBtnComponent, SizeBtnComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent implements OnInit {
  product: ProductCards | null = null;
  productSizes!: ProductSizes[];
  productNotFound: boolean = false;

  productSelectedSize: ProductSizes | null = null;
  
  constructor (
    private route: ActivatedRoute,
    private productCardService: ProductCardsService,
    private productSizesService: ProductSizesService,
    private dynamicTitleService: DynamicTitleService
  ) {
  }

  ngOnInit(): void {
    const id_product = this.route.snapshot.paramMap.get('id_product');
    

    if (id_product) {
      this.productCardService.getProductCards().subscribe({
        next: (data) => {
          const foundProduct = data.find(item => item.id_product === id_product);
          if (foundProduct) {
            this.product = foundProduct;
            this.productNotFound = false;

            this.dynamicTitleService.setTitle(this.product.name_product);
            // Сделать мета норм теги 

            this.productSizesService.getProductSizes().subscribe({
              next: (data) => {
                const foundProductSizes = data.filter(size => size.id_from_product === this.product?.id);
                if (foundProductSizes) {
                  this.productSizes = foundProductSizes;
                  // ВЫШЕ ПЕРЕДЕЛАТЬ ПРОСТО МУСОР
                }
              },
              error: () => {
                ///////////// ДОБАВИТЬ КОД ОТРАБОТКИ
              }
            })
          } else {
            this.productNotFound = true;
          }
        },
        error: () => {
          this.productNotFound = true;
        }
      });
    }
  }

  onSizeSelected(selectedSize: ProductSizes) {
    this.productSelectedSize = selectedSize;
  }
}