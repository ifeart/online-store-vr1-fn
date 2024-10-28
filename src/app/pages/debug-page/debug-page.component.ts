import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-debug-page',
  standalone: true,
  imports: [],
  templateUrl: './debug-page.component.html',
  styleUrl: './debug-page.component.scss'
})
export class DebugPageComponent {
  constructor(private titleService: Title) {
    this.setPageTitle('DEBUG');
  }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
