import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productTypeId',
  standalone: true
})
export class ProductTypeIdPipe implements PipeTransform {

  transform(value: number | null): string {
    if (!value) return 'prodType1';
    return `prodType${value}`;
  }

}
