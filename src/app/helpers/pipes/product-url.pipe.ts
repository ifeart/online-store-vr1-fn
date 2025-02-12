import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productUrl',
  standalone: true
})
export class ProductUrlPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) return `/product/`;
    return `/product/${value}`;
  }
}
