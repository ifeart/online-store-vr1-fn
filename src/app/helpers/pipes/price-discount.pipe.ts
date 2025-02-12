import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceDiscount',
  standalone: true
})
export class PriceDiscountPipe implements PipeTransform {

  transform(value: number, discount: number): number {
    return value * (100 - discount) / 100;
  }

}
