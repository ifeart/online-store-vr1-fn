import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer-components/footer/footer.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  constructor(private titleService: Title) {
    this.setPageTitle('FNDRS');
  }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
