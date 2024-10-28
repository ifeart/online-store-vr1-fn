import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnChanges {
  pathImage: string = '/assets/images/product-card-image/';

  @Input() productLink: string = '';
  @Input() NameProduct: string = 'Null-Name-Product';
  @Input() productPrice: string = '9999';
  @Input() frontProductImage: string = 'default-front-image-product-card.jpg';
  @Input() backProductImage?: string; // теперь это необязательный параметр

  fullFrontProductImage: string = '';
  fullBackProductImage: string = '';
  currentImage: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    // Устанавливаем полные пути изображений
    this.fullFrontProductImage = this.pathImage + this.frontProductImage;
    this.fullBackProductImage = this.backProductImage ? this.pathImage + this.backProductImage : '';

    // Устанавливаем начальное изображение как переднее изображение
    this.currentImage = this.fullFrontProductImage;
  }

  onMouseEnter(): void {
    // Меняем изображение только если backProductImage передан
    if (this.fullBackProductImage) {
      this.currentImage = this.fullBackProductImage;
    }
  }

  onMouseLeave(): void {
    // Возвращаем переднее изображение
    this.currentImage = this.fullFrontProductImage;
  }
}
