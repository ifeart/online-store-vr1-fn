import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DynamicTitleService {
  private titleService = inject(Title); 
  private metaService = inject(Meta);

  setTitle(title: string | null): void {
    if (title) {
      this.titleService.setTitle(`${title} • ife`);
    } else this.titleService.setTitle('ife');
  }

  setNewTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  setMetaTags(description: string, keywords: string): void {
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
  }

  setMetaData(title: string, description: string, keywords: string): void {
    this.setTitle(title);
    this.setMetaTags(description, keywords);
  }
}
