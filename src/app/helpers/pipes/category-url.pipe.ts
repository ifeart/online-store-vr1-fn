import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryUrl',
  standalone: true
})
export class CategoryUrlPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) return `/shop`;
    return `/category/${value}`;
  }

}
