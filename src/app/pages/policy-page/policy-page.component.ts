import { Component } from '@angular/core';
import { DynamicTitleService } from '../../data/services/dynamic-title.service';

@Component({
  selector: 'app-policy-page',
  standalone: true,
  imports: [],
  templateUrl: './policy-page.component.html',
  styleUrl: './policy-page.component.scss'
})
export class PolicyPageComponent {
  constructor(dynamicTitleService: DynamicTitleService) {
    dynamicTitleService.setTitle('Политика персональных данных');
  }
}
