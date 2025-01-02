import { Component } from '@angular/core';
import { DynamicTitleService } from '../../data/services/dynamic-title.service';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [],
  templateUrl: './contacts-page.component.html',
  styleUrl: './contacts-page.component.scss'
})
export class ContactsPageComponent {
  constructor(private dynamicTitleService: DynamicTitleService) {
    this.dynamicTitleService.setTitle('Реквизиты');
  }
}
