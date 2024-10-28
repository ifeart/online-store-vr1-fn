import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-policy-page',
  standalone: true,
  imports: [],
  templateUrl: './policy-page.component.html',
  styleUrl: './policy-page.component.scss'
})
export class PolicyPageComponent {
  constructor(private titleService: Title) {
    this.setPageTitle('PRIVACY POLICY');
  }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }

}
