import { Component } from '@angular/core';
import { FullLinkComponent } from "../../components/main-components/full-link/full-link.component";
import { EmailLinkComponent } from '../../components/main-components/email-link/email-link.component';
import { DynamicTitleService } from '../../data/services/dynamic-title.service';


@Component({
  selector: 'app-offer-page',
  standalone: true,
  imports: [FullLinkComponent, EmailLinkComponent],
  templateUrl: './offer-page.component.html',
  styleUrl: './offer-page.component.scss'
})
export class OfferPageComponent {
  constructor(private dynamicTitleService: DynamicTitleService) {
    this.dynamicTitleService.setTitle('Договор оферты');
  }
}
