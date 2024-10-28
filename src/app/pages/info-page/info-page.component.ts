import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DefaultLinkComponent } from "../../components/main-components/default-link/default-link.component";
import { CopyTextFuncComponent } from '../../components/main-components/copy-text-func/copy-text-func.component';

@Component({
  selector: 'app-info-page',
  standalone: true,
  imports: [DefaultLinkComponent, CopyTextFuncComponent],
  templateUrl: './info-page.component.html',
  styleUrl: './info-page.component.scss'
})
export class InfoPageComponent {
  constructor(private titleService: Title) {
    this.setPageTitle('INFO');
  }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }

}
