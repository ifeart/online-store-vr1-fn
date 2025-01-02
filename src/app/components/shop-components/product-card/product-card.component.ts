import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCards } from '../../../data/interfaces/product-cards.interfaces';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';
import { ProductUrlPipe } from "../../../helpers/pipes/product-url.pipe";


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ImgUrlPipe, ProductUrlPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnChanges {
  pathImage: string = '/assets/images/product-card-image/';

  @Input() product!: ProductCards;

  // @Input() productLink: string = '';
  // @Input() NameProduct: string = 'Null-Name-Product';
  @Input() productPrice: string = '99999';
  @Input() frontProductImage: string = 'front-union-longsleeve.jpg';
  @Input() backProductImage?: string = 'back-union-longsleeve.jpg';

  fullFrontProductImage: string = '';
  fullBackProductImage: string = '';
  currentImage: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.fullFrontProductImage = this.pathImage + this.frontProductImage;
    this.fullBackProductImage = this.backProductImage ? this.pathImage + this.backProductImage : '';
    this.currentImage = this.fullFrontProductImage;
  }

  onMouseEnter(): void {
    if (this.fullBackProductImage) {
      this.currentImage = this.fullBackProductImage;
    }
  }

  onMouseLeave(): void {
    this.currentImage = this.fullFrontProductImage;
  }
}
