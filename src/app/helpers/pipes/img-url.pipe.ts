import { Pipe, PipeTransform } from '@angular/core';
import { AllUrls } from '../../data/enums/all-urls.enum';

@Pipe({
  name: 'imgUrl',
  standalone: true
})
export class ImgUrlPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) return null;
    return `${AllUrls.ImageProduct}${value}`;
  }
}