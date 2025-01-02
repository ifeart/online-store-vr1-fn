import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DynamicTitleService {
  constructor(private titleService: Title, private metaService: Meta) {}

  setTitle(title: string | null): void {
    if (title) {
      this.titleService.setTitle(`${title} • FNDRS`);
    } else this.titleService.setTitle('FNDRS');
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
