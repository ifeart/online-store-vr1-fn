import { Component } from '@angular/core';
import { DynamicTitleService } from '../../data/services/dynamic-title.service';

@Component({
  selector: 'app-debug-page',
  standalone: true,
  imports: [],
  templateUrl: './debug-page.component.html',
  styleUrl: './debug-page.component.scss'
})
export class DebugPageComponent {
  constructor(dynamicTitleService: DynamicTitleService) {
    dynamicTitleService.setNewTitle('Страница отладки');
  }
}
