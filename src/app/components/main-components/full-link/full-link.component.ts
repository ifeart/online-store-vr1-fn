import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-full-link',
  standalone: true,
  imports: [],
  templateUrl: './full-link.component.html',
  styleUrl: './full-link.component.scss'
})
export class FullLinkComponent {
  @Input() linkText: string = '';
}
