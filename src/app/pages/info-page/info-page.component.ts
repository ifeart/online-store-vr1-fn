import { Component } from '@angular/core';
import { DefaultLinkComponent } from "../../components/main-components/default-link/default-link.component";
import { CopyTextFuncComponent } from '../../components/main-components/copy-text-func/copy-text-func.component';
import { DynamicTitleService } from '../../data/services/dynamic-title.service';

@Component({
  selector: 'app-info-page',
  standalone: true,
  imports: [DefaultLinkComponent, CopyTextFuncComponent],
  templateUrl: './info-page.component.html',
  styleUrl: './info-page.component.scss'
})
export class InfoPageComponent {
  constructor(private dynamicTitleService: DynamicTitleService) {
    this.dynamicTitleService.setMetaData('INFO',
      'Контактная информация магагазина FNDRS', 
      'FNDRS почта телеграмм доставка политика конфиденциальности контактная информация'
    );
  }
}
